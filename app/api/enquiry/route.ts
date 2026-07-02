import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { appendEnquiry, uploadPolicyFile, type EnquiryRow } from "@/lib/sharepoint";
import { appendToExcel } from "@/lib/excel";
import { formatTimestamp } from "@/lib/formatTimestamp";
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

// Maps lowercase-kebab formTypes to STANDARD_CATEGORIES keys (Title-case)
const STANDARD_TYPE_KEY: Record<string, StandardInsuranceType> = {
  "life":              "Life",
  "agriculture":       "Agriculture",
  "fire":              "Fire",
  "credit":            "Credit",
  "engineering":       "Engineering",
  "liability":         "Liability",
  "marine":            "Marine",
  "miscellaneous":     "Miscellaneous",
  "personal-accident": "Personal Accident",
  "surety":            "Surety",
};

function getSchema(formType: string): z.ZodTypeAny | null {
  switch (formType) {
    case "motor":             return motorSchema;
    case "health-individual": return healthIndividualSchema;
    case "health-floater":    return healthFloaterSchema;
    case "health-group":      return healthGroupSchema;
    case "travel":            return travelSchema;
    default: {
      // Accept both new lowercase ("life") and legacy Title-case ("Life")
      const standardKey = STANDARD_TYPE_KEY[formType] ?? (formType as StandardInsuranceType);
      const cats = STANDARD_CATEGORIES[standardKey];
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

// ─── formType → human-readable insurance type label ──────────────────────────

const INSURANCE_TYPE_LABELS: Record<string, string> = {
  // lowercase kebab-case (canonical)
  "motor":             "Motor Insurance",
  "health-individual": "Health Individual",
  "health-floater":    "Health Floater",
  "health-group":      "Group Health",
  "travel":            "Travel Insurance",
  "life":              "Life Insurance",
  "agriculture":       "Agriculture Insurance",
  "fire":              "Fire Insurance",
  "credit":            "Credit Insurance",
  "engineering":       "Engineering Insurance",
  "liability":         "Liability Insurance",
  "marine":            "Marine Insurance",
  "miscellaneous":     "Miscellaneous Insurance",
  "personal-accident": "Personal Accident Insurance",
  "surety":            "Surety Insurance",
  // legacy Title-case — kept during transition
  "Life":              "Life Insurance",
  "Agriculture":       "Agriculture Insurance",
  "Fire":              "Fire Insurance",
  "Credit":            "Credit Insurance",
  "Engineering":       "Engineering Insurance",
  "Liability":         "Liability Insurance",
  "Marine":            "Marine Insurance",
  "Miscellaneous":     "Miscellaneous Insurance",
  "Personal Accident": "Personal Accident Insurance",
  "Surety":            "Surety Insurance",
};

// ─── Payload → EnquiryRow ────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toEnquiryRow(formType: string, payload: any, refId: string, motorPolicyFileName?: string): EnquiryRow {
  const extraFields: Record<string, string> = {};
  let name: string = payload.name ?? "";
  const subcategory: string = payload.category ?? "";

  // Remarks — captured for all form types
  if (payload.remarks) {
    extraFields["Remarks"] = String(payload.remarks);
  }

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
      if (payload.preExistingDisease === "yes" && payload.diseaseType) {
        extraFields["Disease Type"] = String(payload.diseaseType);
      }
      break;

    case "health-floater":
      extraFields["Number of Adults"]   = payload.numberOfAdults   ?? "";
      extraFields["Number of Children"] = payload.numberOfChildren ?? "0";
      break;

    case "health-group":
      name = payload.companyName ?? "";
      extraFields["Company Name"]        = payload.companyName      ?? "";
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
    timestamp: formatTimestamp(),
    insuranceType: INSURANCE_TYPE_LABELS[formType] ?? formType,
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

  console.log("[enquiry] Policy file present:", !!policyAttachment);
  if (policyAttachment) {
    console.log("[enquiry] File name:", policyAttachment.filename);
    console.log("[enquiry] File size (base64 chars):", policyAttachment.content.length);
  }

  // ── Step 8b: Upload policy file to drive before creating the list item ─
  // The webUrl is included in the initial POST so no PATCH is needed.
  let policyDocumentUrl: string | undefined;
  if (policyAttachment) {
    const uploadResult = await uploadPolicyFile(
      refId,
      policyAttachment.filename,
      policyAttachment.content,
      policyAttachment.mimeType
    );
    if (uploadResult.success) {
      policyDocumentUrl = uploadResult.webUrl;
    }
  }

  const row = toEnquiryRow(formType, zodResult.data, refId, policyAttachment?.filename);
  if (policyDocumentUrl) row.policyDocumentUrl = policyDocumentUrl;

  // ── Step 9: SharePoint + Excel + email in parallel ───────────────────────

  const [sharepointResult, excelResult, emailResult] = await Promise.allSettled([
    appendEnquiry(row),
    appendToExcel(row),
    sendEnquiryEmail(row, policyAttachment),
  ]);

  // ── Step 10: Handle integration failures ──────────────────────────────────

  const sharepointOk =
    sharepointResult.status === "fulfilled" && sharepointResult.value?.success;

  if (!sharepointOk) {
    console.error("[enquiry] SharePoint failed, queuing for retry");
    addToQueue(row);
  }

  if (excelResult.status === "rejected" || !excelResult.value?.success) {
    console.error("[enquiry] Excel append failed — logged but non-blocking");
  }

  // Email failure is non-critical — log only, still return success to the user
  if (emailResult.status === "rejected") {
    console.error("[enquiry] Email send rejected:", emailResult.reason);
  }

  const finalStatus = sharepointOk ? "success" : "queued";

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
