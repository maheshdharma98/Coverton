// The honeypot field is a hidden text input named "website".
// It is invisible to humans (display:none, tabIndex=-1, no autocomplete).
// Bots that fill all form fields will populate it; legitimate users won't.

const HONEYPOT_FIELD = "website" as const;

export { HONEYPOT_FIELD };

/**
 * Returns true when a bot is detected (honeypot field contains any non-empty value).
 * Returns false for legitimate submissions.
 */
export function checkHoneypot(body: Record<string, unknown>): boolean {
  const value = body[HONEYPOT_FIELD];
  return typeof value === "string" && value.trim().length > 0;
}
