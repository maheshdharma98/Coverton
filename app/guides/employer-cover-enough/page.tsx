import type { Metadata } from "next";
import GuideArticleLayout from "@/components/layout/GuideArticleLayout";

export const metadata: Metadata = {
  title: "Is Your Employer's Group Cover Actually Enough? — Coverton Guides",
  description:
    "Group health insurance is one of the most misunderstood employee benefits. Here are the five gaps most employees don't discover until it's too late.",
};

const WA = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";

function Gap({ num, title, children }: { num: number; title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 36 }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 12 }}>
        <div style={{ flexShrink: 0, width: 36, height: 36, borderRadius: "50%", background: "#F5B800", color: "#0f1f3d", display: "grid", placeItems: "center", fontWeight: 900, fontSize: 15 }}>
          {num}
        </div>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: "#0A0F1E", margin: 0, letterSpacing: "-0.4px", lineHeight: 1.25 }}>
          Gap {num}: {title}
        </h2>
      </div>
      <div style={{ paddingLeft: 50 }}>{children}</div>
    </div>
  );
}

function Callout({ type, children }: { type: "warning" | "tip" | "critical" }) {
  const styles = {
    warning: { bg: "#FEF2F2", border: "#FECACA", color: "#7F1D1D" },
    tip: { bg: "#EFF6FF", border: "#BFDBFE", color: "#1E3A8A" },
    critical: { bg: "#FFFBEB", border: "#FDE68A", color: "#78350F" },
  }[type];
  return (
    <div style={{ background: styles.bg, border: `1px solid ${styles.border}`, borderRadius: 12, padding: "14px 18px", margin: "14px 0", fontSize: 14, color: styles.color, lineHeight: 1.65 }}>
      {children}
    </div>
  );
}

function WaCta({ preText, label }: { preText?: string; label: string }) {
  return (
    <div style={{ background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 14, padding: "20px 22px", margin: "28px 0", display: "flex", flexDirection: "column", gap: 12 }}>
      {preText && <p style={{ fontSize: 14, color: "#166534", margin: 0, lineHeight: 1.6 }}>{preText}</p>}
      <a
        href={`https://wa.me/${WA}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#25D366", color: "white", borderRadius: 50, padding: "11px 22px", fontSize: 13.5, fontWeight: 700, textDecoration: "none", alignSelf: "flex-start" }}
      >
        <i className="ti ti-brand-whatsapp" style={{ fontSize: 17 }} aria-hidden="true" />
        {label}
      </a>
    </div>
  );
}

export default function EmployerCoverGuide() {
  return (
    <GuideArticleLayout
      currentSlug="employer-cover-enough"
      category="Group Health"
      title="Is your employer's group cover actually enough?"
      readTime="6 min read"
      date="Updated June 2026"
      author="Coverton Advisory Team"
      heroGradient="linear-gradient(135deg, #1a1400 0%, #3d2e00 40%, #0f1f3d 100%)"
      heroIcon="ti-building"
      heroAccent="#F5B800"
    >
      {/* ── Cover vs real costs visual ─────────────────────────────────── */}
      <div style={{ background: "#0f1f3d", borderRadius: 16, padding: "22px 24px", marginBottom: 36 }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 14 }}>
          Typical employer cover vs. real costs
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { label: "Typical group policy sum insured", value: "₹3–5L", bar: 40, color: "#1247D6" },
            { label: "Cardiac event in a private metro hospital", value: "₹5.5–7L", bar: 65, color: "#E53E3E" },
            { label: "Week in ICU (before treatment)", value: "₹1–2L", bar: 20, color: "#F5B800" },
            { label: "Cancer surgery (typical)", value: "₹10L+", bar: 100, color: "#E53E3E" },
          ].map((r) => (
            <div key={r.label}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 12.5, color: "rgba(255,255,255,0.6)" }}>{r.label}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: "white" }}>{r.value}</span>
              </div>
              <div style={{ height: 6, background: "rgba(255,255,255,0.08)", borderRadius: 99, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${r.bar}%`, background: r.color, borderRadius: 99, transition: "width 0.4s" }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Opening ───────────────────────────────────────────────────── */}
      <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.8, marginBottom: 20 }}>
        Group health insurance is one of the most valued employee benefits — and one of the most
        misunderstood. Here are the five gaps most employees don't discover until it's too late.
      </p>
      <p style={{ fontSize: 15.5, color: "#374151", lineHeight: 1.8, marginBottom: 16 }}>
        Let's start with something that's true but rarely said directly: your employer's group health
        insurance is not designed to be your primary health cover. It's designed to be a competitive
        benefit that costs your employer as little as possible while appearing as valuable as possible
        in a hiring conversation.
      </p>
      <p style={{ fontSize: 15.5, color: "#374151", lineHeight: 1.8, marginBottom: 36 }}>
        That's not cynical — it's just the economics of group insurance. The result is a policy that
        works well for minor hospitalisations, but often falls short the moment something serious happens.
      </p>

      {/* ── What group cover gives you ────────────────────────────────── */}
      <div style={{ background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 16, padding: "24px 26px", marginBottom: 40 }}>
        <h3 style={{ fontSize: 17, fontWeight: 700, color: "#14532D", marginBottom: 14 }}>What group cover typically gives you</h3>
        <ul style={{ paddingLeft: 20, display: "flex", flexDirection: "column", gap: 9, margin: 0 }}>
          {[
            "Pre-existing disease coverage from day one — no waiting period for PED. This is genuinely valuable.",
            "Cashless hospitalisation at a reasonably wide network",
            "No medical examination required to join",
            "Maternity cover (No waiting period, ₹50,000–₹1L limit)",
            "Sum insured: ₹3–5 lakhs per person (family floater or individual, depending on policy)",
          ].map((t) => (
            <li key={t} style={{ fontSize: 14.5, color: "#166534", lineHeight: 1.65 }}>{t}</li>
          ))}
        </ul>
        <p style={{ fontSize: 13.5, color: "#374151", margin: "14px 0 0", lineHeight: 1.6 }}>
          That's a useful foundation. The trouble starts when you stress-test it.
        </p>
      </div>

      <hr style={{ border: "none", borderTop: "1px solid #E5E7EB", marginBottom: 8 }} />

      {/* ── 5 Gaps ────────────────────────────────────────────────────── */}
      <Gap num={1} title="The cover disappears the moment you leave">
        <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.75, marginBottom: 12 }}>
          This is the most important and least understood gap. Your group cover is tied to your
          employment. The day you resign, are laid off, or retire, your health cover ends. If you've
          relied on group cover for years and developed a health condition in that time, you now need
          individual cover — but the condition is now a pre-existing disease with a 2–4 year waiting period.
        </p>
        <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.75, marginBottom: 12 }}>
          In theory, IRDAI regulations allow portability from group to individual cover. In practice, the
          portability window is tight (30–45 days after leaving employment), and many insurers charge
          significantly higher premiums for people porting out in their 40s or 50s.
        </p>
        <Callout type="warning">
          <strong>The career-transition trap:</strong> The highest-risk moment is a career break —
          freelancing, starting a business, taking a sabbatical. No employer means no group cover, and
          if you're over 40, getting affordable individual cover without exclusions becomes significantly harder.
        </Callout>
      </Gap>

      <Gap num={2} title="₹5 lakhs isn't what it used to be">
        <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.75, marginBottom: 12 }}>
          A ₹5 lakh sum insured sounds like a lot until you're actually in a hospital. A cardiac event
          — stenting, bypass, or even a complex angioplasty — in a private hospital in any metro city
          costs ₹4–8 lakhs. A week in the ICU is ₹1–2 lakhs before treatment costs are factored in.
          Cancer treatment with a surgical procedure easily crosses ₹10 lakhs.
        </p>
        <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.75, marginBottom: 12 }}>
          Medical inflation in India runs at 12–15% annually. A ₹5L policy your company bought three
          years ago has the effective purchasing power of roughly ₹3.5L today.
        </p>
        <Callout type="critical">
          <strong>Reality check:</strong> A 7-day ICU stay + cardiac procedure at a mid-tier private
          hospital in Bengaluru: ₹5.5–7L. A typical employer group policy: ₹3–5L. The gap is real.
        </Callout>
      </Gap>

      <Gap num={3} title="Sub-limits and restrictions you probably don't know about">
        <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.75, marginBottom: 12 }}>
          Group policies are purchased at bulk rates and often include restrictions that the HR
          department doesn't highlight in the benefits overview. Common ones:
        </p>
        <ul style={{ paddingLeft: 20, margin: "0 0 12px", display: "flex", flexDirection: "column", gap: 9 }}>
          {[
            "Room rent cap: 1% of sum insured per day, or a fixed ₹3,000–5,000 cap — below the cost of most private hospital rooms in tier-1 cities",
            "Co-payment for certain conditions, or for employees above 60 years of age",
            "Maternity sublimit: ₹50,000–₹1L for normal delivery, ₹75,000–₹1.5L for caesarean. Actual costs: ₹80,000–₹2.5L in private hospitals",
            "Specific disease caps on procedures like cataract surgery, joint replacements, hernia",
          ].map((t) => (
            <li key={t} style={{ fontSize: 14.5, color: "#374151", lineHeight: 1.7 }}>{t}</li>
          ))}
        </ul>
        <Callout type="tip">
          Ask your HR for the <strong>policy wordings document</strong> — not just the benefits summary
          — and check these specifically.
        </Callout>
      </Gap>

      <WaCta
        preText="Want us to review your employer policy document? WhatsApp us the PDF. We'll flag the gaps and tell you exactly what individual cover you need to fill them."
        label="Send us my employer policy PDF"
      />

      <Gap num={4} title="Parents are often excluded — or very expensive to add">
        <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.75, marginBottom: 12 }}>
          Most group policies cover the employee, spouse, and two children as standard. Parents (or
          in-laws) are either excluded entirely or available as an optional paid rider — typically at
          a significantly higher premium because of their age profile.
        </p>
        <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.75, marginBottom: 12 }}>
          If your parents don't have independent health cover, this is a serious gap. They are
          statistically the people in your household most likely to need hospitalisation, and buying
          individual health cover for someone above 60 with pre-existing conditions is both expensive
          and subject to significant exclusions.
        </p>
        <Callout type="tip">
          <strong>If your parents are currently uninsured:</strong> IRDAI mandates that all insurers
          offer cover to senior citizens. Some plans (Star Health Senior Citizen Red Carpet, Niva Bupa
          Senior First) are specifically designed for this age group. Buy it while they're healthy —
          waiting makes it more expensive and restrictive.
        </Callout>
      </Gap>

      <Gap num={5} title="Waiting periods restart if you port to an individual policy">
        <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.75, marginBottom: 12 }}>
          Suppose you've been on your employer's group cover for 5 years. You developed a mild thyroid
          condition in year 2, which was covered from day one (no PED wait in group policies). You now
          leave the company and try to port to an individual policy.
        </p>
        <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.75, marginBottom: 12 }}>
          Under IRDAI's portability rules, the insurer must credit your years of continuous coverage —
          meaning the PED waiting period is waived for conditions that would have been covered. In
          practice, this works reasonably well for a 30-day group-to-individual port, but only if you
          port within the allowed window and to a standard product. Any gap in coverage can restart
          waiting periods entirely.
        </p>
        <Callout type="warning">
          <strong>Critical window:</strong> If you leave a job, you have 30–45 days to port your health
          cover before the continuity benefit is lost. Don't let the transition slip past this window,
          especially if you have pre-existing conditions.
        </Callout>
      </Gap>

      <hr style={{ border: "none", borderTop: "1px solid #E5E7EB", margin: "8px 0 36px" }} />

      {/* ── Base + Top-up strategy ─────────────────────────────────────── */}
      <div style={{ background: "#0f1f3d", borderRadius: 16, padding: "28px 28px", marginBottom: 36 }}>
        <h2 style={{ fontSize: 19, fontWeight: 800, color: "white", marginBottom: 18, letterSpacing: "-0.3px" }}>
          The right approach: base + top-up
        </h2>
        <p style={{ fontSize: 14.5, color: "rgba(255,255,255,0.65)", lineHeight: 1.75, marginBottom: 16 }}>
          You don't have to choose between employer cover and individual cover. The optimal structure
          for most salaried employees:
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            { icon: "ti-building", color: "#1247D6", title: "Use employer cover as your first layer", desc: "Let it absorb everyday hospitalisations, minor procedures, and cashless treatments within its network." },
            { icon: "ti-trending-up", color: "#F5B800", title: "Buy a high-deductible super top-up policy", desc: "Kicks in once the base sum insured is exhausted. A ₹20L super top-up with a ₹5L deductible costs a fraction of a standalone ₹20L policy." },
            { icon: "ti-user-check", color: "#4ADE80", title: "Or buy a standalone individual / family floater policy", desc: "Continuity builds year over year, is completely portable when you change jobs, and isn't affected by what your employer decides to do at renewal." },
          ].map((s) => (
            <div key={s.title} style={{ display: "flex", gap: 14, background: "rgba(255,255,255,0.05)", borderRadius: 12, padding: "14px 16px" }}>
              <div style={{ flexShrink: 0, width: 36, height: 36, borderRadius: 9, background: `${s.color}22`, display: "grid", placeItems: "center" }}>
                <i className={`ti ${s.icon}`} style={{ fontSize: 18, color: s.color }} aria-hidden="true" />
              </div>
              <div>
                <p style={{ fontSize: 14, fontWeight: 700, color: "white", margin: "0 0 4px" }}>{s.title}</p>
                <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.55)", margin: 0, lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 6 Audit questions ─────────────────────────────────────────── */}
      <div style={{ background: "#F8FAFF", border: "1px solid #DBEAFE", borderRadius: 16, padding: "28px 28px", marginBottom: 32 }}>
        <h2 style={{ fontSize: 19, fontWeight: 800, color: "#0A0F1E", marginBottom: 18, letterSpacing: "-0.3px" }}>
          ✅ 6 questions to audit your own employer cover
        </h2>
        <ol style={{ paddingLeft: 20, display: "flex", flexDirection: "column", gap: 10, margin: 0 }}>
          {[
            "What is the sum insured per person / family? Is it a floater or individual?",
            "Are there room rent sub-limits? What is the cap per night in rupees?",
            "Are parents included, or do I need to add them separately at my own cost?",
            "What happens to my cover if I take a career break or switch jobs?",
            "What are the most common reasons claims have been rejected under this policy?",
            "Am I building any long-term continuity benefit, or is my coverage reset every year?",
          ].map((q) => (
            <li key={q} style={{ fontSize: 14.5, color: "#1E3A8A", lineHeight: 1.65 }}>{q}</li>
          ))}
        </ol>
      </div>

      <WaCta
        preText="Not sure how to fill the gaps in your employer cover? Tell us your employer policy details and your family situation. We'll recommend the most cost-effective way to top up your cover."
        label="Help me fill the gaps in my employer cover"
      />
    </GuideArticleLayout>
  );
}
