const TESTIMONIALS = [
  {
    accent: "var(--blue)",
    quote:
      "Filed my motor claim on a Monday morning. By Wednesday afternoon it was settled. I've never experienced anything like it with an insurer before.",
    stars: 5,
    name: "Arjun Mehta",
    role: "Car owner, Mumbai",
    initials: "AM",
    avatarBg: "var(--blue-tint)",
    avatarColor: "var(--blue)",
  },
  {
    accent: "var(--gold)",
    quote:
      "Our company needed group health cover for 80 employees. Coverton's advisor sorted the entire thing in three days. Paperwork was minimal — highly recommend.",
    stars: 5,
    name: "Deepa Krishnan",
    role: "HR Manager, Bengaluru",
    initials: "DK",
    avatarBg: "var(--gold-tint)",
    avatarColor: "var(--gold-dark)",
  },
  {
    accent: "#7C3AED",
    quote:
      "The website was so easy to navigate. I enquired about travel insurance at 11 PM and got a call first thing the next morning. Genuinely impressed.",
    stars: 5,
    name: "Sneha Patel",
    role: "Frequent traveller, Ahmedabad",
    initials: "SP",
    avatarBg: "#F3EEFF",
    avatarColor: "#7C3AED",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4" viewBox="0 0 24 24" fill="var(--gold)" aria-hidden="true">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-16">
      <div className="flex flex-col items-center text-center gap-3 mb-14">
        <span
          className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
          style={{ background: "var(--blue-tint)", color: "var(--blue)" }}
        >
          Testimonials
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: "var(--ink)" }}>
          Clients who chose to stay.
        </h2>
        <p className="text-base max-w-lg" style={{ color: "var(--ink2)" }}>
          Don't take our word for it — hear from people we've actually helped.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {TESTIMONIALS.map(({ accent, quote, stars, name, role, initials, avatarBg, avatarColor }) => (
          <div
            key={name}
            className="flex flex-col gap-5 rounded-[14px] border bg-white p-6"
            style={{ borderColor: "var(--line)", borderLeftWidth: 4, borderLeftColor: accent }}
          >
            {/* Quote icon */}
            <svg className="w-7 h-7" viewBox="0 0 24 24" fill={accent} opacity={0.25} aria-hidden="true">
              <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
              <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
            </svg>

            <Stars count={stars} />

            <p className="text-sm leading-relaxed flex-1" style={{ color: "var(--ink2)" }}>
              "{quote}"
            </p>

            {/* Avatar + name */}
            <div className="flex items-center gap-3 pt-2" style={{ borderTop: "1px solid var(--line)" }}>
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                style={{ background: avatarBg, color: avatarColor }}
              >
                {initials}
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: "var(--ink)" }}>
                  {name}
                </p>
                <p className="text-sm" style={{ color: "var(--ink3)" }}>
                  {role}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
