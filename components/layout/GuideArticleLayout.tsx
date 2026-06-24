import Navbar from "./Navbar";
import Footer from "./Footer";
import Link from "next/link";

const WA = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";

const ALL_GUIDES = [
  { slug: "health-policy-red-flags", title: "Health policy red flags to watch for",            icon: "ti-shield-exclamation", accent: "#1247D6", meta: "7 min read", tag: "Before You Buy" },
  { slug: "claim-day-kit",           title: "Your claim-day kit — what to do in 24 hours",     icon: "ti-checklist",          accent: "#0F8060", meta: "6 min read", tag: "Step-by-Step"  },
  { slug: "employer-cover-enough",   title: "Is your employer's group cover actually enough?", icon: "ti-building",           accent: "#B58A00", meta: "6 min read", tag: "Group Cover"   },
];

const TRUST_POINTS = [
  { icon: "ti-certificate",   text: "IRDAI licensed direct broker" },
  { icon: "ti-users",         text: "30+ insurer network" },
  { icon: "ti-message-circle",text: "Free, no-pressure advice" },
  { icon: "ti-shield-check",  text: "Claim support included" },
];

interface Props {
  currentSlug: string;
  category: string;
  title: string;
  readTime: string;
  date: string;
  author: string;
  heroGradient: string;
  heroIcon: string;
  heroAccent: string;
  children: React.ReactNode;
}

export default function GuideArticleLayout({
  currentSlug, category, title, readTime, date, author,
  heroGradient, heroIcon, heroAccent, children,
}: Props) {
  const related = ALL_GUIDES.filter((g) => g.slug !== currentSlug);

  return (
    <>
      <Navbar />
      <main>

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section style={{ background: heroGradient, paddingTop: 112, paddingBottom: 64, position: "relative", overflow: "hidden" }}>
          {/* Ghost icon */}
          <div style={{ position: "absolute", right: -60, top: "50%", transform: "translateY(-50%)", opacity: 0.055, fontSize: 340, color: "white", lineHeight: 1, pointerEvents: "none", userSelect: "none" }} aria-hidden="true">
            <i className={`ti ${heroIcon}`} />
          </div>
          {/* Dot grid */}
          <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)", backgroundSize: "28px 28px", pointerEvents: "none" }} aria-hidden="true" />

          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>
            {/* Breadcrumb */}
            <nav style={{ marginBottom: 18, display: "flex", alignItems: "center", gap: 8, fontSize: 12.5, color: "rgba(255,255,255,0.4)", flexWrap: "wrap" }}>
              <Link href="/"         style={{ color: "inherit", textDecoration: "none" }}>Home</Link>
              <span>›</span>
              <Link href="/#guides"  style={{ color: "inherit", textDecoration: "none" }}>Guides</Link>
              <span>›</span>
              <span style={{ color: "rgba(255,255,255,0.65)" }}>{category}</span>
            </nav>

            {/* Badge */}
            <span style={{ display: "inline-block", fontSize: 10.5, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: heroAccent, background: `${heroAccent}22`, border: `1px solid ${heroAccent}44`, borderRadius: 50, padding: "3px 14px", marginBottom: 16 }}>
              {category}
            </span>

            {/* Title */}
            <h1 style={{ fontSize: "clamp(28px, 4vw, 46px)", fontWeight: 800, color: "white", letterSpacing: "-1px", lineHeight: 1.15, margin: "0 0 18px", maxWidth: 700 }}>
              {title}
            </h1>

            {/* Meta */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 20px", fontSize: 13, color: "rgba(255,255,255,0.48)" }}>
              <span>⏱ {readTime}</span>
              <span>📅 {date}</span>
              <span>✍ {author}</span>
              <span style={{ color: "rgba(255,255,255,0.22)" }}>🔒 Nothing stored or sent</span>
            </div>
          </div>
        </section>

        {/* ── Article + Sidebar ────────────────────────────────────────────── */}
        <div style={{ background: "white" }}>
          <style>{`
            .ga-grid {
              display: grid;
              grid-template-columns: 1fr 320px;
              gap: 56px;
              align-items: start;
              max-width: 1200px;
              margin: 0 auto;
              padding: 56px 24px 88px;
            }
            .ga-sidebar { position: sticky; top: 96px; display: flex; flex-direction: column; gap: 16px; }
            .ga-mob-cta { display: none; }
            @media (max-width: 1080px) {
              .ga-grid { grid-template-columns: 1fr; gap: 0; padding: 48px 20px 72px; }
              .ga-sidebar-col { display: none; }
              .ga-mob-cta { display: flex !important; }
            }
            @media (max-width: 600px) {
              .ga-grid { padding: 36px 16px 56px; }
            }
            /* ── Article typography ── */
            article > p { font-size: 15.5px; line-height: 1.82; color: #374151; margin-bottom: 18px; }
            article > p:first-child { font-size: 17px; line-height: 1.75; color: #1f2937; }
            article hr { border: none; border-top: 1px solid #E5E7EB; margin: 36px 0; }
          `}</style>

          <div className="ga-grid">

            {/* ── Main article ──────────────────────────────────────────── */}
            <article style={{ minWidth: 0 }}>
              {children}

              {/* Mobile CTA (hidden on desktop via CSS) */}
              <div
                className="ga-mob-cta"
                style={{ flexDirection: "column", gap: 12, marginTop: 40, background: "#0f1f3d", borderRadius: 18, padding: "24px 22px", display: "none" }}
              >
                <p style={{ fontSize: 15, fontWeight: 700, color: "white", margin: 0 }}>Need help right now?</p>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", margin: 0, lineHeight: 1.6 }}>
                  Talk to a Coverton advisor — free, no pressure, no sign-up.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 4 }}>
                  <a href={`https://wa.me/${WA}`} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: "#25D366", color: "white", borderRadius: 50, padding: "12px 20px", fontSize: 14, fontWeight: 700, textDecoration: "none" }}>
                    <i className="ti ti-brand-whatsapp" style={{ fontSize: 18 }} aria-hidden="true" />
                    WhatsApp an advisor
                  </a>
                  <a href="tel:+919566085116" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.8)", borderRadius: 50, padding: "12px 20px", fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
                    <i className="ti ti-phone" style={{ fontSize: 16 }} aria-hidden="true" />
                    Call us
                  </a>
                </div>
              </div>
            </article>

            {/* ── Sidebar ───────────────────────────────────────────────── */}
            <aside className="ga-sidebar-col">
              <div className="ga-sidebar">

                {/* Quick help card */}
                <div style={{ background: "#0f1f3d", borderRadius: 20, padding: "24px 22px" }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "#F5B800", letterSpacing: "0.5px", margin: "0 0 6px" }}>
                    NEED HELP RIGHT NOW?
                  </p>
                  <p style={{ fontSize: 15, fontWeight: 800, color: "white", margin: "0 0 8px", lineHeight: 1.3, letterSpacing: "-0.3px" }}>
                    Talk to a Coverton advisor
                  </p>
                  <p style={{ fontSize: 12.5, color: "rgba(255,255,255,0.5)", margin: "0 0 18px", lineHeight: 1.65 }}>
                    Free, no pressure, no sign-up. We compare across 30+ insurers.
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <a
                      href={`https://wa.me/${WA}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: "#25D366", color: "white", borderRadius: 50, padding: "11px 18px", fontSize: 13.5, fontWeight: 700, textDecoration: "none" }}
                    >
                      <i className="ti ti-brand-whatsapp" style={{ fontSize: 17 }} aria-hidden="true" />
                      WhatsApp an advisor
                    </a>
                    <a
                      href="tel:+919566085116"
                      style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.75)", borderRadius: 50, padding: "11px 18px", fontSize: 13.5, fontWeight: 600, textDecoration: "none" }}
                    >
                      <i className="ti ti-phone" style={{ fontSize: 15 }} aria-hidden="true" />
                      Call us
                    </a>
                  </div>
                </div>

                {/* Why Coverton */}
                <div style={{ background: "#FAFBFF", border: "1px solid #E8EBF5", borderRadius: 20, padding: "22px 22px" }}>
                  <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase", color: "#8892A4", margin: "0 0 14px" }}>
                    Why Coverton
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {TRUST_POINTS.map((pt) => (
                      <div key={pt.text} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#EEF3FF", display: "grid", placeItems: "center", flexShrink: 0 }}>
                          <i className={`ti ${pt.icon}`} style={{ fontSize: 15, color: "#1247D6" }} aria-hidden="true" />
                        </div>
                        <span style={{ fontSize: 13, color: "#374151", fontWeight: 500 }}>{pt.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* More guides */}
                <div style={{ background: "#FAFBFF", border: "1px solid #E8EBF5", borderRadius: 20, padding: "22px 22px" }}>
                  <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase", color: "#8892A4", margin: "0 0 14px" }}>
                    More Guides
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {related.map((g) => (
                      <Link key={g.slug} href={`/guides/${g.slug}`} style={{ textDecoration: "none" }}>
                        <div style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 12px", borderRadius: 12, background: "white", border: "1px solid #E8EBF5", transition: "box-shadow 0.2s" }} className="ga-rel-card">
                          <div style={{ width: 30, height: 30, borderRadius: 8, background: `${g.accent}18`, display: "grid", placeItems: "center", flexShrink: 0 }}>
                            <i className={`ti ${g.icon}`} style={{ fontSize: 15, color: g.accent }} aria-hidden="true" />
                          </div>
                          <div style={{ minWidth: 0 }}>
                            <p style={{ fontSize: 12.5, fontWeight: 600, color: "#0A0F1E", margin: "0 0 2px", lineHeight: 1.35 }}>{g.title}</p>
                            <p style={{ fontSize: 11, color: "#8892A4", margin: 0 }}>{g.meta} · {g.tag}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

              </div>
            </aside>

          </div>
        </div>

        {/* ── Footer guides strip (mobile & desktop) ───────────────────────── */}
        <section style={{ background: "#0f1f3d" }} className="px-5 sm:px-10 lg:px-16 py-10">
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1.8px", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 16 }}>
              More Guides
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 }}>
              {related.map((g) => (
                <Link key={g.slug} href={`/guides/${g.slug}`} style={{ textDecoration: "none" }}>
                  <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderLeft: `3px solid ${g.accent}`, borderRadius: 12, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12, transition: "background 0.2s" }} className="ga-footer-card">
                    <div style={{ width: 34, height: 34, borderRadius: 9, background: `${g.accent}20`, display: "grid", placeItems: "center", flexShrink: 0 }}>
                      <i className={`ti ${g.icon}`} style={{ fontSize: 17, color: g.accent }} aria-hidden="true" />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: 13.5, fontWeight: 600, color: "rgba(255,255,255,0.85)", margin: "0 0 2px", lineHeight: 1.3 }}>{g.title}</p>
                      <p style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", margin: 0 }}>{g.meta} · {g.tag}</p>
                    </div>
                    <i className="ti ti-arrow-right" style={{ fontSize: 16, color: "rgba(255,255,255,0.2)", flexShrink: 0 }} aria-hidden="true" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <style>{`
            .ga-rel-card:hover { box-shadow: 0 4px 14px rgba(0,0,0,0.08); }
            .ga-footer-card:hover { background: rgba(255,255,255,0.07) !important; }
          `}</style>
        </section>

      </main>
      <Footer />
    </>
  );
}
