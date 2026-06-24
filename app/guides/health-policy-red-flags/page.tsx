import type { Metadata } from "next";
import Link from "next/link";
import GuideArticleLayout from "@/components/layout/GuideArticleLayout";

export const metadata: Metadata = {
  title: "7 Health Policy Red Flags to Watch For — Coverton Guides",
  description:
    "A policy that looks great on the premium comparison screen can quietly rob you on claim day. Here's what to check before you sign anything.",
};

const WA = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";

function RedFlag({ num, title, children }: { num: string; title: string; children: React.ReactNode }) {
  return (
    <div style={{ borderLeft: "3px solid #E53E3E", paddingLeft: 20, marginBottom: 32 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
        <span style={{ fontSize: 22 }}>{num}</span>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: "#0A0F1E", margin: 0, letterSpacing: "-0.4px" }}>
          {title}
        </h2>
      </div>
      <div>{children}</div>
    </div>
  );
}

function Callout({ type, children }: { type: "warning" | "tip"; children: React.ReactNode }) {
  const isWarning = type === "warning";
  return (
    <div
      style={{
        background: isWarning ? "#FEF2F2" : "#EFF6FF",
        border: `1px solid ${isWarning ? "#FECACA" : "#BFDBFE"}`,
        borderRadius: 12,
        padding: "14px 18px",
        margin: "16px 0",
        fontSize: 14,
        color: isWarning ? "#7F1D1D" : "#1E3A8A",
        lineHeight: 1.65,
      }}
    >
      {children}
    </div>
  );
}

function WaCta({ label, preText }: { label: string; preText?: string }) {
  return (
    <div
      style={{
        background: "#F0FDF4",
        border: "1px solid #BBF7D0",
        borderRadius: 14,
        padding: "20px 22px",
        margin: "28px 0",
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      {preText && <p style={{ fontSize: 14, color: "#166534", margin: 0, lineHeight: 1.6 }}>{preText}</p>}
      <a
        href={`https://wa.me/${WA}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          background: "#25D366",
          color: "white",
          borderRadius: 50,
          padding: "11px 22px",
          fontSize: 13.5,
          fontWeight: 700,
          textDecoration: "none",
          alignSelf: "flex-start",
        }}
      >
        <i className="ti ti-brand-whatsapp" style={{ fontSize: 17 }} aria-hidden="true" />
        {label}
      </a>
    </div>
  );
}

export default function HealthRedFlagsGuide() {
  return (
    <GuideArticleLayout
      currentSlug="health-policy-red-flags"
      category="Health Insurance"
      title="7 health policy red flags to watch for before you buy"
      readTime="7 min read"
      date="Updated June 2026"
      author="Coverton Advisory Team"
      heroGradient="linear-gradient(135deg, #0f1f3d 0%, #1a3460 50%, #2d1b2e 100%)"
      heroIcon="ti-shield-exclamation"
      heroAccent="#F87171"
    >
      {/* ── Visual stat bar ────────────────────────────────────────────── */}
      <div
        style={{
          background: "linear-gradient(135deg, #0f1f3d, #1247D6)",
          borderRadius: 16,
          padding: "24px 28px",
          marginBottom: 36,
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 20,
        }}
      >
        {[
          { stat: "₹5L", sub: "avg. claim on cardiac events in private hospitals" },
          { stat: "2–4yr", sub: "typical PED waiting period most buyers miss" },
          { stat: "10–30%", sub: "co-pay that can silently cut your settlement" },
        ].map((s) => (
          <div key={s.stat} style={{ textAlign: "center" }}>
            <p style={{ fontSize: 28, fontWeight: 900, color: "#F5B800", margin: "0 0 4px", letterSpacing: "-1px" }}>{s.stat}</p>
            <p style={{ fontSize: 11.5, color: "rgba(255,255,255,0.55)", margin: 0, lineHeight: 1.5 }}>{s.sub}</p>
          </div>
        ))}
      </div>

      {/* ── Opening ───────────────────────────────────────────────────── */}
      <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.8, marginBottom: 20 }}>
        A policy that looks great on the premium comparison screen can quietly rob you on claim day.
        Most people choose health insurance the same way they choose a hotel on a booking app — filter
        by price, pick the highest-rated option, click buy. The problem is that health insurance isn't
        a hotel room. The fine print determines whether a ₹5 lakh claim actually gets paid — or whether
        you're left paying half of it out of pocket at 2 AM in a hospital.
      </p>
      <p style={{ fontSize: 15.5, color: "#374151", lineHeight: 1.8, marginBottom: 36 }}>
        These are the seven things Coverton checks in every policy before recommending it to a client.
      </p>

      <hr style={{ border: "none", borderTop: "1px solid #E5E7EB", marginBottom: 36 }} />

      {/* ── Red Flags ─────────────────────────────────────────────────── */}
      <RedFlag num="🚩" title="Red Flag 1: Room rent sub-limits">
        <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.75, marginBottom: 12 }}>
          Many policies cap the room rent they'll cover at 1% of the sum insured per day. On a ₹5 lakh
          policy, that's ₹5,000 per night. In most private hospitals in Bengaluru or Mumbai, a standard
          single private room costs ₹6,000–₹12,000 per night.
        </p>
        <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.75, marginBottom: 12 }}>
          Here's what most policyholders don't realise: the room rent cap doesn't just affect the room
          charge. Insurers apply the same proportional reduction to <em>all other charges</em> in the
          bill — doctor fees, ICU costs, surgery fees — if your actual room exceeds the cap. A ₹2,000
          excess on room rent can translate into a ₹40,000 reduction in your settlement.
        </p>
        <Callout type="warning">
          <strong>Red flag:</strong> Any policy with a room rent cap below ₹5,000/day on a ₹5L policy,
          or below ₹10,000/day on a ₹10L policy.
        </Callout>
        <Callout type="tip">
          <strong>What to look for instead:</strong> Policies that say "No room rent sub-limit" or "Any
          room category" in the key features. These exist at a slightly higher premium — and are worth
          the difference.
        </Callout>
      </RedFlag>

      <RedFlag num="🚩" title="Red Flag 2: Co-payment clauses">
        <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.75, marginBottom: 12 }}>
          A co-payment clause means you pay a fixed percentage of every claim — typically 10–30% —
          regardless of the sum insured. It applies every single time you claim, for as long as you hold
          the policy.
        </p>
        <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.75, marginBottom: 12 }}>
          Co-payment is common in senior citizen plans (where it can be 20–30%) and in some policies for
          people who move from employer group cover. On a ₹4 lakh surgery bill with a 20% co-pay, you're
          personally paying ₹80,000 — every time.
        </p>
        <Callout type="warning">
          <strong>Red flag:</strong> Co-payment above 10% on a standard individual or family floater
          policy, or any co-payment clause you weren't told about explicitly before purchasing.
        </Callout>
        <Callout type="tip">
          <strong>What to look for instead:</strong> Many strong plans from HDFC Ergo, Care Health, and
          Niva Bupa have zero co-payment for policyholders under 60. Always confirm in the policy
          wordings, not just the brochure.
        </Callout>
      </RedFlag>

      <RedFlag num="🚩" title="Red Flag 3: Waiting periods">
        <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.75, marginBottom: 12 }}>
          Every health policy has waiting periods. The question is how long, and for what.
        </p>
        <ul style={{ paddingLeft: 20, margin: "0 0 12px", display: "flex", flexDirection: "column", gap: 8 }}>
          {[
            { b: "Initial waiting period:", t: "30 days for any illness (accidents are usually covered from day 1)" },
            { b: "Pre-existing disease (PED) waiting:", t: "2–4 years before any condition you had before the policy is covered. Some plans offer 1-year PED waiting at a higher premium." },
            { b: "Specific disease waiting:", t: "Certain conditions — hernias, joint replacements, cataracts, stones — often have an additional 1–2 year wait even if you have no PED." },
          ].map((li) => (
            <li key={li.b} style={{ fontSize: 15, color: "#374151", lineHeight: 1.7 }}>
              <strong>{li.b}</strong> {li.t}
            </li>
          ))}
        </ul>
        <Callout type="warning">
          <strong>Red flag:</strong> A 4-year PED waiting period, or disease-specific waits that aren't
          disclosed clearly upfront. Some policies bury these in Schedule 3 of the policy document.
        </Callout>
      </RedFlag>

      <WaCta
        preText="Not sure what your current policy actually covers? WhatsApp us the policy document. We'll review it free of charge and flag any hidden limitations."
        label="Share my policy for a free review"
      />

      <RedFlag num="🚩" title="Red Flag 4: Disease-specific sub-limits">
        <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.75, marginBottom: 12 }}>
          Even after the waiting period is over, many policies cap what they'll pay for specific
          treatments. Common examples:
        </p>
        <ul style={{ paddingLeft: 20, margin: "0 0 12px", display: "flex", flexDirection: "column", gap: 8 }}>
          {[
            "Cataract surgery: capped at ₹25,000–₹40,000 per eye, while actual costs can exceed ₹60,000",
            "Knee/hip replacement: capped at ₹1–1.5L per knee on ₹5L policies, actual costs: ₹1.5–3L",
            "Bariatric surgery: excluded entirely in most standard plans",
            "Mental health treatment: capped at 10–20% of sum insured, though IRDAI now mandates inclusion",
          ].map((t) => (
            <li key={t} style={{ fontSize: 15, color: "#374151", lineHeight: 1.7 }}>{t}</li>
          ))}
        </ul>
        <Callout type="warning">
          <strong>Red flag:</strong> A long list of "sub-limits" or "specified disease limits" in the
          policy schedule. Each one is a ceiling on your actual reimbursement.
        </Callout>
      </RedFlag>

      <RedFlag num="🚩" title="Red Flag 5: Network hospital quality">
        <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.75, marginBottom: 12 }}>
          Insurers advertise network sizes prominently — "10,000+ hospitals!" — but the number is largely
          meaningless if the hospitals in your city or neighbourhood aren't on the list, or are lower-tier
          facilities you wouldn't actually want to be treated in.
        </p>
        <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.75, marginBottom: 12 }}>
          Cashless treatment is only available at network hospitals. If your nearest quality hospital
          isn't in-network, you pay upfront and claim reimbursement — a slower, more paperwork-heavy
          process that can take 30–45 days.
        </p>
        <Callout type="tip">
          <strong>What to check:</strong> Before buying, search the insurer's network hospital list for
          the 2–3 hospitals you'd actually want to go to. Quality of network matters more than quantity.
        </Callout>
      </RedFlag>

      <RedFlag num="🚩" title="Red Flag 6: Claim settlement ratio vs. claim amount settlement ratio">
        <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.75, marginBottom: 12 }}>
          IRDAI publishes annual claim settlement ratios for all insurers. A 97% claim settlement ratio
          sounds excellent. But this ratio measures the <em>number</em> of claims settled — not the
          amount.
        </p>
        <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.75, marginBottom: 12 }}>
          An insurer can settle 97 small claims fully and reject or partially pay 3 large claims worth
          ₹20 lakh each, and still report a 97% settlement ratio. The metric that matters is the{" "}
          <strong>claim amount settlement ratio</strong> — what percentage of the total money claimed was
          actually paid out.
        </p>
        <Callout type="tip">
          <strong>Ask Coverton:</strong> We track insurer claims data beyond the standard IRDAI
          disclosures. WhatsApp us and we'll share what we've seen in practice for the insurers you're
          considering.
        </Callout>
      </RedFlag>

      <RedFlag num="🚩" title="Red Flag 7: Restoration benefit fine print">
        <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.75, marginBottom: 12 }}>
          Restoration benefit is widely advertised as a major advantage — "your sum insured gets restored
          if exhausted!" What many policyholders discover only at claim time: most restoration clauses
          apply only for <strong>unrelated illnesses</strong>, not for subsequent claims related to the
          same condition.
        </p>
        <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.75, marginBottom: 12 }}>
          If your spouse is hospitalised for a heart procedure and the sum insured is exhausted, a
          restored sum insured will generally not cover a second hospitalisation for the same heart
          condition in the same policy year — regardless of what the sales pitch implied.
        </p>
        <Callout type="warning">
          <strong>Red flag:</strong> Restoration benefit marketed without the "unrelated illness" caveat
          clearly stated. Always read the restoration clause in the policy document, not the brochure.
        </Callout>
      </RedFlag>

      <hr style={{ border: "none", borderTop: "1px solid #E5E7EB", margin: "8px 0 36px" }} />

      {/* ── 10 Questions ──────────────────────────────────────────────── */}
      <div
        style={{
          background: "#F8FAFF",
          border: "1px solid #DBEAFE",
          borderRadius: 16,
          padding: "28px 28px",
          marginBottom: 32,
        }}
      >
        <h2 style={{ fontSize: 19, fontWeight: 800, color: "#0A0F1E", marginBottom: 18, letterSpacing: "-0.3px" }}>
          ✅ Before you buy: 10 questions to ask
        </h2>
        <ol style={{ paddingLeft: 20, display: "flex", flexDirection: "column", gap: 10, margin: 0 }}>
          {[
            "Is there a room rent sub-limit? What is it in rupees per day?",
            "Is there a co-payment clause? What percentage, and does it apply to all claims?",
            "What is the PED waiting period? Can it be reduced to 1 year at a higher premium?",
            "Are there disease-specific sub-limits? List the top 5 most common procedures.",
            "Are [specific hospitals in my area] in the cashless network?",
            "What is the insurer's claim amount settlement ratio (not just claim count ratio)?",
            "Does the restoration benefit cover the same illness in the same year?",
            "What are the most common reasons claims are rejected by this insurer?",
            "Are maternity benefits included? What is the waiting period?",
            "Are there any limits on day-care procedures (procedures that don't require 24-hour admission)?",
          ].map((q) => (
            <li key={q} style={{ fontSize: 14.5, color: "#1E3A8A", lineHeight: 1.65 }}>{q}</li>
          ))}
        </ol>
      </div>

      <WaCta
        preText="Want us to find a plan that passes all 7 checks? We compare policies across 10+ insurers and only recommend what we'd buy for our own families. Free, no sign-up, no spam."
        label="Find me a plan that passes all 7 checks"
      />
    </GuideArticleLayout>
  );
}
