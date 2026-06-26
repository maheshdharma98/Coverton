import Link from "next/link";
import Navbar from "./Navbar";
import Footer from "./Footer";
import BubbleBackground from "@/components/ui/BubbleBackground";
import CtaBand from "@/components/sections/CtaBand";


interface TocItem {
  id: string;
  label: string;
}

interface Props {
  currentSlug?: string;
  category: string;
  title: string;
  readTime: string;
  date: string;
  author: string;
  heroGradient: string;
  heroIcon: string;
  heroAccent: string;
  toc?: TocItem[];
  children: React.ReactNode;
}

export default function GuideArticleLayout({
  category, title, readTime, date, author,
  heroGradient, heroIcon, heroAccent, toc, children,
}: Props) {

  return (
    <>
      <Navbar />
      <main>

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section style={{ background: 'linear-gradient(135deg, #EEF3FF 0%, #F8FAFF 100%)', paddingTop: 96, paddingBottom: 48, position: "relative", overflow: "hidden" }}>
          {/* Ghost icon */}
          <div style={{ position: "absolute", right: -60, top: "50%", transform: "translateY(-50%)", opacity: 0.055, fontSize: 340, color: heroAccent, lineHeight: 1, pointerEvents: "none", userSelect: "none" }} aria-hidden="true">
            <i className={`ti ${heroIcon}`} />
          </div>
          {/* Dot grid */}
          <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(18,71,214,0.07) 1px, transparent 1px)", backgroundSize: "28px 28px", pointerEvents: "none" }} aria-hidden="true" />

          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 48px", position: "relative", zIndex: 1 }}>
            {/* Breadcrumb */}
            <nav style={{ marginBottom: 18, display: "flex", alignItems: "center", gap: 8, fontSize: 12.5, color: "#64748B", flexWrap: "wrap" }}>
              <Link href="/"         style={{ color: "inherit", textDecoration: "none" }}>Home</Link>
              <span>›</span>
              <Link href="/#guides"  style={{ color: "inherit", textDecoration: "none" }}>Guides</Link>
              <span>›</span>
              <span style={{ color: "#64748B" }}>{category}</span>
            </nav>

            {/* Badge */}
            <span style={{ display: "inline-block", fontSize: 10.5, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: heroAccent, background: `${heroAccent}22`, border: `1px solid ${heroAccent}44`, borderRadius: 50, padding: "3px 14px", marginBottom: 16 }}>
              {category}
            </span>

            {/* Title */}
            <h1 style={{ fontSize: "clamp(28px, 4vw, 46px)", fontWeight: 800, color: "#0A0F1E", letterSpacing: "-1px", lineHeight: 1.15, margin: "0 0 18px", maxWidth: 700 }}>
              {title}
            </h1>

            {/* Meta */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 20px", fontSize: 13, color: "#64748B" }}>
              <span>⏱ {readTime}</span>
              <span>📅 {date}</span>
              <span>✍ {author}</span>
              <span style={{ color: "#64748B" }}>🔒 Nothing stored or sent</span>
            </div>
          </div>
        </section>

        {/* ── Article with bubble background ───────────────────────────────── */}
        <BubbleBackground>
          <style>{`
            .ga-grid {
              max-width: 1100px;
              margin: 0 auto;
              padding: 56px 48px 88px;
            }
            @media (max-width: 900px) { .ga-grid { padding: 48px 24px 72px; } }
            @media (max-width: 600px) { .ga-grid { padding: 36px 16px 56px; } }
            article > p { font-size: 15.5px; line-height: 1.82; color: #374151; margin-bottom: 18px; }
            article > p:first-child { font-size: 17px; line-height: 1.75; color: #1f2937; }
            article hr { border: none; border-top: 1px solid #E5E7EB; margin: 36px 0; }
          `}</style>

          <div className="ga-grid">
            <article>
              {toc && toc.length > 0 && (
                <div style={{ background: "white", border: "1px solid #E0E7FF", borderRadius: 14, padding: "20px 24px", marginBottom: 36 }}>
                  <p style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "1.6px", textTransform: "uppercase", color: "#64748B", margin: "0 0 14px" }}>
                    In this guide
                  </p>
                  <ol style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 9 }}>
                    {toc.map((item, i) => (
                      <li key={item.id} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ flexShrink: 0, width: 22, height: 22, borderRadius: "50%", background: "#EEF3FF", color: "#1247D6", display: "grid", placeItems: "center", fontSize: 11, fontWeight: 700 }}>
                          {i + 1}
                        </span>
                        <a href={`#${item.id}`} style={{ fontSize: 14, color: "#1247D6", textDecoration: "none", fontWeight: 500, lineHeight: 1.4 }}>
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
              {children}
            </article>
          </div>
        </BubbleBackground>

        {/* ── CTA Band ─────────────────────────────────────────────────────── */}
        <CtaBand />

      </main>
      <Footer />
    </>
  );
}
