const TILES = [
  {
    bg: "var(--blue)",
    textColor: "#fff",
    subColor: "rgba(255,255,255,0.65)",
    iconBg: "rgba(255,255,255,0.15)",
    iconColor: "#fff",
    stat: "7 days",
    label: "avg. claim settlement",
    title: "Lightning-fast claims",
    description: "We process and settle claims faster than the industry average — because your time matters.",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    bg: "var(--gold-tint)",
    textColor: "var(--ink)",
    subColor: "var(--ink3)",
    iconBg: "rgba(245,184,0,0.18)",
    iconColor: "var(--gold-dark)",
    stat: "1:1 support",
    label: "dedicated advisor",
    title: "Personal advisors",
    description: "Every client gets a named advisor — one point of contact from enquiry to renewal.",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    bg: "var(--blue-tint)",
    textColor: "var(--ink)",
    subColor: "var(--ink3)",
    iconBg: "var(--blue-mid)",
    iconColor: "var(--blue)",
    stat: "15+ years",
    label: "in the industry",
    title: "IRDAI regulated",
    description: "Fully regulated by IRDAI — your policies and premiums are protected at every step.",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
];

export default function WhyCoverton() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-16">
      <div className="flex flex-col items-center text-center gap-3 mb-14">
        <span
          className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
          style={{ background: "var(--blue-tint)", color: "var(--blue)" }}
        >
          Why Coverton
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: "var(--ink)" }}>
          Built around you, not paperwork.
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {TILES.map(({ bg, textColor, subColor, iconBg, iconColor, stat, label, title, description, icon }) => (
          <div
            key={title}
            className="rounded-[20px] p-7 flex flex-col gap-5"
            style={{ background: bg }}
          >
            <div
              className="w-11 h-11 rounded-[10px] flex items-center justify-center flex-shrink-0"
              style={{ background: iconBg, color: iconColor }}
            >
              {icon}
            </div>

            <div>
              <p className="text-3xl font-black" style={{ color: textColor }}>
                {stat}
              </p>
              <p className="text-sm font-medium mt-0.5" style={{ color: subColor }}>
                {label}
              </p>
            </div>

            <div className="flex flex-col gap-1.5 mt-auto">
              <h3 className="text-lg font-bold" style={{ color: textColor }}>
                {title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: subColor }}>
                {description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
