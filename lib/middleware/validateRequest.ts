// All 15 valid insurance form types — lowercase kebab-case canonical;
// legacy Title-case entries kept during transition
const VALID_FORM_TYPES = new Set([
  "motor",
  "health-individual",
  "health-floater",
  "health-group",
  "travel",
  // canonical lowercase kebab-case
  "life",
  "agriculture",
  "fire",
  "credit",
  "engineering",
  "liability",
  "marine",
  "miscellaneous",
  "personal-accident",
  "surety",
  // legacy Title-case — accepted during transition
  "Life",
  "Agriculture",
  "Fire",
  "Credit",
  "Engineering",
  "Liability",
  "Marine",
  "Miscellaneous",
  "Personal Accident",
  "Surety",
]);

// ─── String sanitisation ──────────────────────────────────────────────────────

function stripHtml(input: string): string {
  return input
    .replace(/<script[\s\S]*?<\/script>/gi, "")  // script blocks first
    .replace(/<[^>]+>/g, "")                      // remaining tags
    .trim();
}

// Recursively sanitise all string values in any nested structure
export function deepSanitise(value: unknown): unknown {
  if (typeof value === "string") return stripHtml(value.trim());
  if (Array.isArray(value)) return value.map(deepSanitise);
  if (value !== null && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([k, v]) => [
        k,
        deepSanitise(v),
      ])
    );
  }
  return value;
}

// Sanitise top-level string fields only — matches the specified signature.
// Use deepSanitise() when nested objects / arrays also need cleaning.
export function sanitisePayload(
  payload: Record<string, unknown>
): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [key, val] of Object.entries(payload)) {
    if (typeof val === "string") {
      out[key] = stripHtml(val.trim());
    } else if (typeof val === "number" || typeof val === "boolean") {
      out[key] = String(val);
    }
    // Arrays and nested objects are omitted here; use deepSanitise for those.
  }
  return out;
}

// ─── Request validation ───────────────────────────────────────────────────────

export function validateEnquiryRequest(
  body: unknown
): { valid: boolean; errors?: string[] } {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return { valid: false, errors: ["Request body must be a JSON object"] };
  }

  const b = body as Record<string, unknown>;

  if (!b.formType || typeof b.formType !== "string" || !b.formType.trim()) {
    return { valid: false, errors: ["formType is required"] };
  }

  if (!VALID_FORM_TYPES.has(b.formType)) {
    return {
      valid: false,
      errors: [`Invalid formType "${b.formType}". Must be one of the 13 supported insurance types.`],
    };
  }

  if (
    !b.payload ||
    typeof b.payload !== "object" ||
    Array.isArray(b.payload)
  ) {
    return { valid: false, errors: ["payload must be a non-array JSON object"] };
  }

  return { valid: true };
}
