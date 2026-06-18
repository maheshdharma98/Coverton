import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { appendEnquiry, type EnquiryRow } from "@/lib/sheets";
import { sendEnquiryEmail } from "@/lib/mailer";
import { checkRateLimit } from "@/lib/middleware/rateLimit";
import { validateEnquiryRequest } from "@/lib/middleware/validateRequest";
import { logEnquiry } from "@/lib/middleware/logger";
import { addToQueue } from "@/lib/failureQueue";
import { checkHoneypot } from "@/lib/security/honeypot";
import {
  sanitisePayload,
  validateMobileIN,
  validatePincodeIN,
  validateVehicleNumber,
} from "@/lib/security/sanitise";
import {
  motorSchema,
  healthIndividualSchema,
  healthFloaterSchema,
  healthGroupSchema,
  travelSchema,
  createStandardSchema,
  STANDARD_CATEGORIES,
  type StandardInsuranceType,
} from "@/lib/validations";

// ─── Security headers on every response ──────────────────────────────────────

const SEC_HEADERS = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
};

function secureJson(
  body: unknown,
  init: { status?: number; headers?: Record<string, string> } = {}
): NextResponse {
  return NextResponse.json(body, {
    ...init,
    headers: { ...SEC_HEADERS, ...(init.headers ?? {}) },
  });
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    request.headers.get("x-real-ip") ??
    "unknown"
  );
}

function generateRefId(): string {
  const ts = String(Date.now()).slice(-5);
  const rand = String(Math.floor(Math.random() * 1000)).padStart(3, "0");
  return `CVT-${ts}${rand}`;
}

// ─── Schema selector ─────────────────────────────────────────────────────────

function getSchema(formType: string): z.ZodTypeAny | null {
  switch (formType) {
    case "motor":             return motorSchema;
    case "health-individual": return healthIndividualSchema;
    case "health-floater":    return healthFloaterSchema;
    case "health-group":      return healthGroupSchema;
    case "travel":            return travelSchema;
    default: {
      const cats = STANDARD_CATEGORIES[formType as StandardInsuranceType];
      return cats ? createStandardSchema([...cats]) : null;
    }
  }
}

// ─── Indian field validators ──────────────────────────────────────────────────

interface FieldErrors {
  errors: string[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function runIndianValidators(formType: string, data: any): FieldErrors {
  const errors: string[] = [];

  // Mobile and pincode apply to all forms (except health-group which has companyName)
  const mobile  = String(data.mobile ?? "");
  const pincode = String(data.pincode ?? "");

  if (mobile && !validateMobileIN(mobile)) {
    errors.push("mobile: Must be a valid Indian mobile number (starts with 6–9)");
  }
  if (pincode && !validatePincodeIN(pincode)) {
    errors.push("pincode: Must be a valid Indian PIN code (cannot start with 0)");
  }

  if (formType === "motor") {
    const reg = String(data.vehicleNumber ?? "");
    if (reg && !validateVehicleNumber(reg)) {
      errors.push(
        "vehicleNumber: Must be a valid Indian registration number (e.g. MH12AB1234)"
      );
    }
  }

  return { errors };
}

// ─── Payload → EnquiryRow ────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toEnquiryRow(formType: string, payload: any, refId: string, motorPolicyFileName?: string): EnquiryRow {
  const extraFields: Record<string, string> = {};
  let name: string = payload.name ?? "";
  const subcategory: string = payload.category ?? "";

  switch (formType) {
    case "motor":
      extraFields["Vehicle Number"] = payload.vehicleNumber ?? "";
      extraFields["Policy Upload"] = motorPolicyFileName
        ? `Attached (${motorPolicyFileName})`
        : "Not uploaded";
      break;

    case "health-individual":
      extraFields["Date of Birth"] = payload.dob ?? "";
      extraFields["Pre-existing Disease"] =
        payload.preExistingDisease === "yes" ? "Yes" : "No";
      break;

    case "health-floater": {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const included = (payload.members ?? []).filter(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (m: any) => m.key === "self" || m.included
      );
      extraFields["Members JSON"] = JSON.stringify(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        included.map((m: any) => ({
          label: m.label,
          ageDob: m.ageDob,
          ped: m.ped,
        }))
      );
      extraFields["Member Count"] = String(included.length);
      break;
    }

    case "health-group":
      name = payload.companyName ?? "";
      extraFields["Company Name"] = payload.companyName ?? "";
      extraFields["Number of Employees"] = payload.numberOfEmployees ?? "";
      break;

    case "travel":
      extraFields["Travel Type"] =
        payload.travelType === "including-usa-canada"
          ? "Including USA & Canada"
          : "Excluding USA & Canada";
      break;

    // Standard forms: subcategory carries the category; no extra fields
  }

  return {
    refId,
    timestamp: new Date().toISOString(),
    insuranceType: formType,
    subcategory,
    name,
    mobile:  payload.mobile  ?? "",
    email:   payload.email   ?? "",
    pincode: payload.pincode ?? "",
    extraFields,
  };
}

// ─── Route handler ────────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  const startMs = Date.now();
  const ip = getIp(request);

  // ── Step 1: Parse body (required before honeypot check) ───────────────────

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return secureJson({ success: false, message: "Invalid JSON body" }, { status: 400 });
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return secureJson({ success: false, message: "Request body must be a JSON object" }, { status: 400 });
  }

  const rawBody = body as Record<string, unknown>;

  // ── Step 2: Honeypot check — silently discard bot submissions ─────────────
  // Return 200 so bots believe the submission succeeded and don't retry.

  if (checkHoneypot(rawBody)) {
    return secureJson({ success: true, message: "Enquiry received." });
  }

  // ── Step 3: Rate limit ────────────────────────────────────────────────────

  const rl = checkRateLimit(ip, "enquiry");
  if (!rl.allowed) {
    logEnquiry({
      timestamp: new Date().toISOString(),
      ip,
      formType: "unknown",
      status: "failed",
      error: "rate_limited",
      durationMs: Date.now() - startMs,
    });
    return secureJson(
      { success: false, message: "Too many requests. Please try again later." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfter ?? 60) } }
    );
  }

  // ── Step 4: Sanitise all string values in the full body ───────────────────

  const sanitisedBody = sanitisePayload(rawBody) as {
    formType?: unknown;
    payload?: unknown;
    [key: string]: unknown;
  };

  // ── Step 5: Validate request structure (formType + payload shape) ─────────

  const validation = validateEnquiryRequest(sanitisedBody);
  if (!validation.valid) {
    return secureJson(
      { success: false, message: validation.errors?.join("; ") ?? "Invalid request" },
      { status: 400 }
    );
  }

  const { formType, payload } = sanitisedBody as {
    formType: string;
    payload: Record<string, unknown>;
  };

  // Extract motor policyFile now — Zod will strip it since it's not in motorSchema
  const rawPolicyFile =
    formType === "motor" &&
    payload.policyFile !== null &&
    typeof payload.policyFile === "object"
      ? (payload.policyFile as Record<string, unknown>)
      : null;

  // ── Step 6: Zod schema validation for the specific formType ───────────────

  const schema = getSchema(formType);
  if (!schema) {
    return secureJson(
      { success: false, message: `Unknown formType: ${formType}` },
      { status: 400 }
    );
  }

  const zodResult = schema.safeParse(payload);
  if (!zodResult.success) {
    const errors = zodResult.error.issues.map(
      (i: z.ZodIssue) => `${i.path.join(".")}: ${i.message}`
    );
    logEnquiry({
      timestamp: new Date().toISOString(),
      ip,
      formType,
      status: "failed",
      error: errors.join(" | "),
      durationMs: Date.now() - startMs,
    });
    return secureJson(
      { success: false, message: "Validation failed", errors },
      { status: 422 }
    );
  }

  // ── Step 7: Indian-specific field validators (defence in depth) ───────────

  const { errors: indiaErrors } = runIndianValidators(formType, zodResult.data);
  if (indiaErrors.length > 0) {
    logEnquiry({
      timestamp: new Date().toISOString(),
      ip,
      formType,
      status: "failed",
      error: indiaErrors.join(" | "),
      durationMs: Date.now() - startMs,
    });
    return secureJson(
      { success: false, message: "Validation failed", errors: indiaErrors },
      { status: 422 }
    );
  }

  // ── Step 8: Generate refId and build canonical row ────────────────────────

  const refId = generateRefId();

  // Build policy attachment for email (only motor; validated after Zod succeeds)
  const policyAttachment =
    rawPolicyFile &&
    typeof rawPolicyFile.fileData === "string" &&
    typeof rawPolicyFile.fileName === "string" &&
    typeof rawPolicyFile.mimeType === "string"
      ? {
          filename: rawPolicyFile.fileName as string,
          content:  rawPolicyFile.fileData as string,
          mimeType: rawPolicyFile.mimeType as string,
        }
      : undefined;

  const row = toEnquiryRow(formType, zodResult.data, refId, policyAttachment?.filename);

  // ── Step 9: Sheets + email in parallel ────────────────────────────────────

  const [sheetsResult, emailResult] = await Promise.allSettled([
    appendEnquiry(row),
    sendEnquiryEmail(row, policyAttachment),
  ]);

  // ── Step 10: Handle integration failures ──────────────────────────────────

  // appendEnquiry throws on permanent failure → "rejected" means failure
  const sheetsOk = sheetsResult.status === "fulfilled";
  if (!sheetsOk) {
    addToQueue(row); // retry queue handles re-submission to Sheets
  }

  // Email failure is non-critical — log only, still return success to the user
  if (emailResult.status === "rejected") {
    console.error("[enquiry] Email send rejected:", emailResult.reason);
  }

  const finalStatus = sheetsOk ? "success" : "queued";

  // ── Step 11: Log event ────────────────────────────────────────────────────

  logEnquiry({
    timestamp: row.timestamp,
    ip,
    formType,
    status: finalStatus,
    durationMs: Date.now() - startMs,
    refId,
  });

  // ── Return response ───────────────────────────────────────────────────────

  return secureJson({
    success: true,
    message: "Your enquiry has been received. Our team will contact you shortly.",
    refId,
  });
}
