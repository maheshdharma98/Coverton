"use client";

/**
 * Invisible honeypot field. Include in every public form.
 * Register it with React Hook Form so its value (always "") is sent with the payload.
 * Bots that fill all fields will populate it; the API silently discards those submissions.
 */
export function HoneypotField({
  register,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: (...args: any[]) => any;
}) {
  const props = register ? register("website") : { name: "website" };
  return (
    <input
      {...props}
      type="text"
      style={{ display: "none" }}
      tabIndex={-1}
      autoComplete="off"
      aria-hidden="true"
    />
  );
}
