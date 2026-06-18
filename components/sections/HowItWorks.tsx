const STEPS = [
  {
    number: "01",
    title: "Pick your plan",
    description: "Browse 13 insurance categories and select the coverage that fits your needs.",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
        <rect x="9" y="3" width="6" height="4" rx="1" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Fill the form",
    description: "A short 2-minute form — we only ask what's essential to get you a quote.",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Advisor calls you",
    description: "A dedicated advisor reaches out within 60 minutes during business hours.",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.68a16 16 0 006.29 6.29l1.04-1.04a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "You're covered",
    description: "Policy issued swiftly. Documents delivered to your inbox — simple as that.",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      <div className="flex flex-col items-center text-center gap-3 mb-14">
        <span
          className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
          style={{ background: "var(--blue-tint)", color: "var(--blue)" }}
        >
          How it works
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: "var(--ink)" }}>
          Simple. Fast. Reliable.
        </h2>
        <p className="text-base max-w-lg" style={{ color: "var(--ink2)" }}>
          Getting insured with Coverton takes minutes, not days.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 relative">
        {/* Connecting line desktop */}
        <div
          className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px"
          style={{ background: "var(--line)" }}
          aria-hidden="true"
        />

        {STEPS.map(({ number, title, description, icon }) => (
          <div
            key={number}
            className="relative flex flex-col gap-4 rounded-[14px] border bg-white p-6"
            style={{ borderColor: "var(--line)" }}
          >
            <div className="flex items-center justify-between">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: "var(--blue-tint)", color: "var(--blue)" }}
              >
                {icon}
              </div>
              <span className="text-3xl font-black" style={{ color: "var(--line)" }}>
                {number}
              </span>
            </div>

            <div className="flex flex-col gap-1.5">
              <h3 className="text-base font-bold" style={{ color: "var(--ink)" }}>
                {title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--ink3)" }}>
                {description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
