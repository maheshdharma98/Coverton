// ─── String sanitiser ─────────────────────────────────────────────────────────

export function sanitiseString(input: string): string {
  return (
    input
      // 1. Null bytes
      .replace(/\x00/g, "")
      // 2. Control characters (keep tab \x09, LF \x0A, CR \x0D)
      .replace(/[\x01-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "")
      // 3. Script blocks (content + tags)
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      // 4. All remaining HTML tags
      .replace(/<[^>]+>/g, "")
      // 5. Common SQL injection sequences (multi-word patterns first)
      .replace(
        /\b(UNION\s+SELECT|DROP\s+TABLE|INSERT\s+INTO|DELETE\s+FROM|UPDATE\s+\w+\s+SET|CREATE\s+(?:TABLE|DATABASE)|ALTER\s+TABLE|EXEC(?:UTE)?\s+(?:XP_)?|TRUNCATE\s+TABLE|DECLARE\s+@)\b/gi,
        ""
      )
      // 6. Standalone injection punctuation sequences
      .replace(/(['"`])\s*(?:;|--|\/\*)/g, "")
      // 7. xp_ prefix (SQL Server extended procs)
      .replace(/\bxp_\w+/gi, "")
      // 8. Trim outer whitespace
      .trim()
      // 9. Collapse multiple spaces / tabs to a single space
      .replace(/[ \t]+/g, " ")
  );
}

// ─── Recursive payload sanitiser ─────────────────────────────────────────────
// Walks the full nested structure. The spec signature says Record<string,string>
// but real payloads contain arrays and nested objects (health-floater members).
// We return Record<string,unknown> to carry those through intact while sanitising
// every string leaf. Callers that need the flat signature can cast safely.

export function sanitisePayload(
  payload: Record<string, unknown>
): Record<string, unknown> {
  return sanitiseDeep(payload) as Record<string, unknown>;
}

function sanitiseDeep(value: unknown): unknown {
  if (typeof value === "string") return sanitiseString(value);
  if (Array.isArray(value)) return value.map(sanitiseDeep);
  if (value !== null && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([k, v]) => [
        k,
        sanitiseDeep(v),
      ])
    );
  }
  return value; // numbers, booleans, null — pass through unchanged
}

// ─── Indian field validators ──────────────────────────────────────────────────

/**
 * Validates an Indian mobile number.
 * Rules: exactly 10 digits, first digit 6–9 (current TRAI allocation).
 */
export function validateMobileIN(mobile: string): boolean {
  return /^[6-9]\d{9}$/.test(mobile);
}

/**
 * Validates an Indian PIN code.
 * Rules: exactly 6 digits, first digit 1–9 (no PIN code starts with 0).
 */
export function validatePincodeIN(pincode: string): boolean {
  return /^[1-9]\d{5}$/.test(pincode);
}

/**
 * Validates an Indian vehicle registration number (flexible).
 * Format: 2 letters (state) + 2 digits (district) + 1–3 letters (series) + 1–4 digits
 * Allows optional spaces between groups.
 * Examples: MH12AB1234  DL12ABC1234  KA51MR1234  HR26A1234
 */
export function validateVehicleNumber(reg: string): boolean {
  return /^[A-Z]{2}\s?\d{2}\s?[A-Z]{1,3}\s?\d{1,4}$/i.test(reg.trim());
}
