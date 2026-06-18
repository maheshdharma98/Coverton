import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/middleware/rateLimit";
import { logUpload } from "@/lib/middleware/logger";

const MAX_SIZE = 5 * 1024 * 1024; // 5 MB

// ─── Magic-byte detection ─────────────────────────────────────────────────────
// Validates actual file content, not the client-supplied MIME type or extension.

function detectMimeType(bytes: Uint8Array): string | null {
  // PDF: %PDF
  if (bytes[0] === 0x25 && bytes[1] === 0x50 && bytes[2] === 0x44 && bytes[3] === 0x46) {
    return "application/pdf";
  }
  // JPEG: FF D8 FF
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return "image/jpeg";
  }
  // PNG: 89 50 4E 47 0D 0A 1A 0A
  if (
    bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47 &&
    bytes[4] === 0x0d && bytes[5] === 0x0a && bytes[6] === 0x1a && bytes[7] === 0x0a
  ) {
    return "image/png";
  }
  // WebP: RIFF....WEBP
  if (
    bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46 &&
    bytes[8] === 0x57 && bytes[9] === 0x45 && bytes[10] === 0x42 && bytes[11] === 0x50
  ) {
    return "image/webp";
  }
  return null;
}

function getIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    request.headers.get("x-real-ip") ??
    "unknown"
  );
}

// ─── Route handler ────────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  const ip = getIp(request);
  const timestamp = new Date().toISOString();

  // Rate limit: 3 uploads per IP per 10 minutes
  const rl = checkRateLimit(ip, "upload");
  if (!rl.allowed) {
    return NextResponse.json(
      { success: false, error: "Too many upload attempts. Please try again later." },
      {
        status: 429,
        headers: { "Retry-After": String(rl.retryAfter ?? 60) },
      }
    );
  }

  // Parse multipart form data entirely in memory — no disk writes
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to parse form data" },
      { status: 400 }
    );
  }

  const file = formData.get("policy") as File | null;

  if (!file || file.size === 0) {
    return NextResponse.json(
      { success: false, error: "No file provided" },
      { status: 400 }
    );
  }

  // Size check before reading the full buffer
  if (file.size > MAX_SIZE) {
    logUpload({
      timestamp,
      ip,
      fileName: file.name,
      fileSize: file.size,
      mimeType: file.type,
      status: "failed",
      error: "file_too_large",
    });
    return NextResponse.json(
      { success: false, error: "File must be under 5 MB" },
      { status: 413 }
    );
  }

  // Read file into buffer (in memory only — never touches disk)
  const arrayBuf = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuf);
  const bytes = new Uint8Array(buffer);

  // Magic-byte validation (ignores client-supplied type / extension)
  const detectedMime = detectMimeType(bytes);
  if (!detectedMime) {
    logUpload({
      timestamp,
      ip,
      fileName: file.name,
      fileSize: file.size,
      mimeType: file.type,
      status: "failed",
      error: "invalid_file_type",
    });
    return NextResponse.json(
      { success: false, error: "Only PDF, JPEG, PNG, and WebP files are accepted" },
      { status: 415 }
    );
  }

  const base64 = buffer.toString("base64");

  logUpload({
    timestamp,
    ip,
    fileName: file.name,
    fileSize: file.size,
    mimeType: detectedMime,
    status: "success",
  });

  return NextResponse.json({
    success: true,
    fileData: base64,
    fileName: file.name,
    mimeType: detectedMime,
  });
}
