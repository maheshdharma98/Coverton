import type { Metadata } from "next";
import GuideArticleLayout from "@/components/layout/GuideArticleLayout";

export const metadata: Metadata = {
  title: "Your Claim-Day Kit: What to Do in the First 24 Hours — Coverton Guides",
  description:
    "The actions you take in the hours after an incident determine whether your claim is smooth or a three-month battle. Here's exactly what to do.",
};

const WA = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";

function StepCard({ step, title, children }: { step: string; title: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", gap: 14, marginBottom: 10, background: "#FAFBFF", border: "1px solid #E8EBF5", borderRadius: 12, padding: "14px 16px" }}>
      <div style={{ flexShrink: 0, width: 28, height: 28, borderRadius: "50%", background: "#1247D6", color: "white", display: "grid", placeItems: "center", fontWeight: 800, fontSize: 12, marginTop: 1 }}>
        {step}
      </div>
      <div>
        <strong style={{ fontSize: 14.5, color: "#0A0F1E", display: "block", marginBottom: 5 }}>{title}</strong>
        <div style={{ fontSize: 14, color: "#374151", lineHeight: 1.72 }}>{children}</div>
      </div>
    </div>
  );
}

function CategoryHeader({ id, emoji, title, color }: { id: string; emoji: string; title: string; color: string }) {
  return (
    <div id={id} style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16, marginTop: 36, background: `${color}0D`, border: `1.5px solid ${color}28`, borderRadius: 12, padding: "13px 18px", scrollMarginTop: 100 }}>
      <div style={{ flexShrink: 0, width: 40, height: 40, borderRadius: 10, background: `${color}1A`, display: "grid", placeItems: "center", fontSize: 22 }}>
        {emoji}
      </div>
      <h2 style={{ fontSize: 19, fontWeight: 800, color, margin: 0, letterSpacing: "-0.4px" }}>{title}</h2>
    </div>
  );
}

function Callout({ bg, border, color, children }: { bg: string; border: string; color: string; children: React.ReactNode }) {
  return (
    <div style={{ background: bg, border: `1px solid ${border}`, borderRadius: 12, padding: "14px 18px", margin: "16px 0", fontSize: 14, color, lineHeight: 1.65 }}>
      {children}
    </div>
  );
}

function ClaimBuddyCta() {
  return (
    <div style={{ background: "#0f1f3d", borderRadius: 16, padding: "24px 26px", margin: "32px 0" }}>
      <p style={{ fontSize: 14, fontWeight: 700, color: "#F5B800", marginBottom: 8, letterSpacing: "0.5px" }}>
        How Coverton's Claim Buddy helps
      </p>
      <p style={{ fontSize: 14, color: "rgba(255,255,255,0.82)", lineHeight: 1.7, marginBottom: 16 }}>
        If you're a Coverton client, you don't have to handle any of this alone. On claim day,
        WhatsApp Claim Buddy with the incident details. We will:
      </p>
      <ul style={{ paddingLeft: 20, margin: "0 0 20px", display: "flex", flexDirection: "column", gap: 7 }}>
        {[
          "Intimate the insurer on your behalf within the required window",
          "Assign a dedicated case manager to your claim",
          "Collect and organise all required documents",
          "Follow up directly with the TPA or insurer's claims team",
          "Contest any rejection or low assessment with documented grounds",
        ].map((t) => (
          <li key={t} style={{ fontSize: 13.5, color: "rgba(255,255,255,0.85)", lineHeight: 1.6 }}>{t}</li>
        ))}
      </ul>
      <p style={{ fontSize: 13, color: "rgba(255,255,255,0.82)", marginBottom: 16 }}>
        There is no additional charge for this service. It's what we do.
      </p>
      <a
        href={`https://wa.me/${WA}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#25D366", color: "white", borderRadius: 50, padding: "10px 20px", fontSize: 13.5, fontWeight: 700, textDecoration: "none" }}
      >
        <i className="ti ti-brand-whatsapp" style={{ fontSize: 17 }} aria-hidden="true" />
        Start a claim with Claim Buddy
      </a>
    </div>
  );
}

export default function ClaimDayKitGuide() {
  return (
    <GuideArticleLayout
      currentSlug="claim-day-kit"
      category="Claims"
      title="Your claim-day kit: what to do in the first 24 hours"
      readTime="6 min read"
      date="Updated June 2026"
      author="Coverton Advisory Team"
      heroGradient="linear-gradient(135deg, #0a2010 0%, #0f3a20 50%, #0f1f3d 100%)"
      heroIcon="ti-checklist"
      heroAccent="#4ADE80"
      toc={[
        { id: "motor-claims",    label: "Motor claims: accident or theft" },
        { id: "health-claims",   label: "Health claims: hospitalisation" },
        { id: "property-claims", label: "Property & fire claims: damage or theft" },
        { id: "document-kit",    label: "Your claim-day document kit" },
        { id: "three-mistakes",  label: "3 mistakes that turn a simple claim into a dispute" },
      ]}
    >
      {/* ── 3 category nav cards ───────────────────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 36 }}>
        {[
          { icon: "ti-car",                label: "Motor",    color: "#1247D6", bg: "#EEF3FF", href: "#motor-claims" },
          { icon: "ti-heart-rate-monitor", label: "Health",   color: "#0F8060", bg: "#F0FDF4", href: "#health-claims" },
          { icon: "ti-home",               label: "Property", color: "#9A3412", bg: "#FFF7ED", href: "#property-claims" },
        ].map((c) => (
          <a
            key={c.label}
            href={c.href}
            style={{ textDecoration: "none", display: "block" }}
          >
            <div
              style={{ background: c.bg, borderRadius: 12, padding: "16px 12px", textAlign: "center", cursor: "pointer", transition: "box-shadow 0.2s, transform 0.2s" }}
              className="cat-nav-card"
            >
              <i className={`ti ${c.icon}`} style={{ fontSize: 28, color: c.color, display: "block", marginBottom: 6 }} aria-hidden="true" />
              <p style={{ fontSize: 13, fontWeight: 700, color: c.color, margin: "0 0 4px" }}>{c.label}</p>
              <p style={{ fontSize: 11, color: "#6B7280", margin: 0 }}>Jump to section ↓</p>
            </div>
          </a>
        ))}
      </div>
      <style>{`.cat-nav-card:hover { box-shadow: 0 6px 20px rgba(0,0,0,0.1); transform: translateY(-3px); }`}</style>

      {/* ── Opening ───────────────────────────────────────────────────── */}
      <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.8, marginBottom: 20 }}>
        The actions you take in the hours immediately after an incident — a crash, a hospitalisation,
        a burglary — determine whether your claim is smooth or a three-month battle.
      </p>
      <p style={{ fontSize: 15.5, color: "#374151", lineHeight: 1.8, marginBottom: 16 }}>
        Most claim disputes don't start with the insurer. They start with something the policyholder did
        — or didn't do — in the first few hours after an incident. A missed intimation window, a missing
        photograph, a document signed under pressure from the other party.
      </p>
      <p style={{ fontSize: 15.5, color: "#374151", lineHeight: 1.8, marginBottom: 24 }}>
        This guide covers the three most common claim scenarios: motor, health, and property.{" "}
        <strong>Bookmark this page before you ever need it.</strong>
      </p>

      {/* ── MOTOR ─────────────────────────────────────────────────────── */}
      <CategoryHeader id="motor-claims" emoji="🚗" title="Motor claims: accident or theft" color="#1247D6" />

      <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0A0F1E", marginBottom: 10, marginTop: 4 }}>If there's been an accident</h3>

      <StepCard step="1" title="Don't move the vehicle.">
        This sounds counterintuitive if you're blocking traffic, but moving the vehicle before
        photographs are taken weakens your case. Take photos and a short video first — the position
        of both vehicles, all visible damage, road conditions, traffic signals, skid marks.
      </StepCard>
      <StepCard step="2" title="If there are injuries, call 108 first.">
        Your responsibility as a driver includes ensuring medical attention for anyone injured. Call
        the ambulance before you call anyone else. Then call the police (100) — an FIR or police
        panchanama is required for any accident involving injury, third-party damage, or a stationary vehicle.
      </StepCard>
      <StepCard step="3" title="Intimate the insurer within 24 hours.">
        Not 48, not "when I get to it." Most policies require intimation within 24 hours of an
        accident. Call the helpline or WhatsApp the details. You don't need to file the full claim
        yet — a brief intimation call is enough to protect your timeline.
      </StepCard>
      <StepCard step="4" title="Don't sign anything from the other party's insurer or representative until you've read it carefully.">
        The surveyor (appointed by your insurer) is different from a representative of the at-fault
        party — they have different interests.
      </StepCard>
      <StepCard step="5" title="For cashless repairs, take your vehicle to a network garage.">
        For non-network garages, get a written estimate before repairs begin — and save all bills and
        photographs of damage before the repair.
      </StepCard>

      <Callout bg="#FEF2F2" border="#FECACA" color="#7F1D1D">
        <strong>Common mistake:</strong> Getting the vehicle repaired quickly (at a local garage, out of
        pocket) before a surveyor inspection. Without a pre-repair survey, the insurer can reject the
        claim citing lack of evidence.
      </Callout>

      <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0A0F1E", margin: "16px 0 8px" }}>If it's a theft</h3>
      <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.75 }}>
        File an FIR at the nearest police station immediately. Then intimate the insurer. For theft
        claims, both the police complaint number and the FIR copy are mandatory. If the vehicle is
        found within 90 days, the claim process changes — keep your insurer updated.
      </p>

      <ClaimBuddyCta />

      {/* ── HEALTH ────────────────────────────────────────────────────── */}
      <CategoryHeader id="health-claims" emoji="🏥" title="Health claims: hospitalisation" color="#0F8060" />

      <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0A0F1E", marginBottom: 10, marginTop: 4 }}>Cashless claims</h3>

      <StepCard step="1" title="Confirm the hospital is in the network before admission if the situation is non-emergency.">
        Call the TPA (Third Party Administrator) helpline on the back of your health card.
      </StepCard>
      <StepCard step="2" title="At the hospital's insurance desk, fill the pre-authorisation form at the time of admission — not after.">
        The hospital sends this to the TPA, who approves a credit limit. If the actual bill exceeds
        the pre-approved amount, a supplementary pre-authorisation request is needed.
      </StepCard>
      <StepCard step="3" title="Collect all original documents before discharge.">
        Discharge summary, all bills, prescription trail (from OPD visit through medications),
        investigation reports. Once you've left the hospital, getting duplicate originals is a long process.
      </StepCard>
      <StepCard step="4" title="At discharge, don't leave until the cashless settlement is confirmed in writing.">
        If the insurer is taking time, ask the hospital's billing desk for the timeline — they follow
        up with the TPA regularly.
      </StepCard>

      <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0A0F1E", margin: "16px 0 8px" }}>Reimbursement claims (non-network hospital)</h3>
      <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.75, marginBottom: 12 }}>
        You pay the bills upfront and claim later. The intimation window still applies — call the
        insurer within 24 hours of admission. Submit all documents within 15–30 days of discharge
        (check your policy for the exact window).
      </p>
      <Callout bg="#F0FDF4" border="#BBF7D0" color="#14532D">
        <strong>Document tip:</strong> Keep a dedicated folder (physical or on Google Drive) with all
        hospital documents from each admission. Scan everything before the original gets lost or faded.
      </Callout>

      <ClaimBuddyCta />

      {/* ── PROPERTY ──────────────────────────────────────────────────── */}
      <CategoryHeader id="property-claims" emoji="🏠" title="Property & fire claims: damage or theft" color="#9A3412" />

      <StepCard step="1" title="Ensure safety first.">
        If there's been a fire, flood, or structural damage, ensure the property is safe to re-enter
        before you document anything. Do not enter a structurally compromised building.
      </StepCard>
      <StepCard step="2" title="Do not repair or clear damage before the surveyor visits.">
        This is the single most common mistake in property claims. Take extensive photographs and video
        before touching anything. If perishable goods or urgent safety repairs can't wait, photograph
        everything first and keep all replacement receipts.
      </StepCard>
      <StepCard step="3" title="Get an FIR for theft or arson.">
        No FIR, no claim for these categories. Go to the nearest police station the same day.
      </StepCard>
      <StepCard step="4" title="Intimate the insurer within 24–48 hours (check your policy).">
        For commercial properties, also notify your landlord and building management if applicable.
      </StepCard>
      <StepCard step="5" title="Cooperate with the surveyor, but you are not obligated to accept their assessment on the spot.">
        If the surveyor's estimate seems low, you can commission an independent valuation and present
        it to the insurer. You have the right to contest the loss assessment.
      </StepCard>

      <Callout bg="#FFF7ED" border="#FED7AA" color="#7C2D12">
        <strong>Know your rights:</strong> Under IRDAI regulations, insurers must appoint a surveyor
        within 48 hours of receiving a loss intimation for claims above ₹1 lakh. If this doesn't
        happen, follow up in writing.
      </Callout>

      <hr style={{ border: "none", borderTop: "1px solid #E5E7EB", margin: "28px 0 24px" }} />

      {/* ── Document Kit ──────────────────────────────────────────────── */}
      <div id="document-kit" style={{ background: "#F8FAFF", border: "1px solid #DBEAFE", borderRadius: 16, padding: "28px 28px", marginBottom: 32, scrollMarginTop: 100 }}>
        <h2 style={{ fontSize: 19, fontWeight: 800, color: "#0A0F1E", marginBottom: 18, letterSpacing: "-0.3px" }}>
          📋 Your claim-day document kit
        </h2>
        <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.65, marginBottom: 16 }}>
          Keep a digital copy of each of these accessible on your phone — not just in a physical folder at home:
        </p>
        <ul style={{ paddingLeft: 20, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "7px 24px", margin: 0 }}>
          {[
            "Policy document (all pages, including endorsements)",
            "TPA card / insurer helpline number (health policies)",
            "Government-issued ID (Aadhaar, PAN, or passport)",
            "Photographs and video of damage — taken immediately",
            "FIR copy or police complaint acknowledgement",
            "All bills, invoices, and receipts for loss or treatment",
            "Original claim form (download from insurer's website)",
            "Bank account details and a cancelled cheque",
            "Any previous correspondence with the insurer",
          ].map((t) => (
            <li key={t} style={{ fontSize: 13.5, color: "#1E3A8A", lineHeight: 1.6 }}>{t}</li>
          ))}
        </ul>
      </div>

      {/* ── 3 Mistakes ────────────────────────────────────────────────── */}
      <h2 id="three-mistakes" style={{ fontSize: 21, fontWeight: 800, color: "#0A0F1E", marginBottom: 20, letterSpacing: "-0.4px", scrollMarginTop: 100 }}>
        ⚠️ 3 mistakes that turn a simple claim into a dispute
      </h2>

      {[
        {
          n: "1",
          t: "Accepting a partial settlement without checking",
          p: "Once you sign the discharge voucher you typically cannot claim the remainder. Never sign without verifying the amount covers your full eligible loss.",
        },
        {
          n: "2",
          t: "Missing the intimation window",
          p: "Most policies require intimation within 24–48 hours. Missing it gives the insurer grounds to reduce or reject the claim — even if the loss is fully covered otherwise.",
        },
        {
          n: "3",
          t: "Disposing of damaged items before the surveyor visits",
          p: "Without a pre-repair or pre-disposal survey, the insurer can reject citing lack of evidence. Photograph everything first.",
        },
      ].map((m) => (
        <div key={m.n} style={{ border: "1px solid #FECACA", borderRadius: 12, overflow: "hidden", marginBottom: 10 }}>
          <div style={{ background: "#FEF2F2", borderBottom: "1px solid #FECACA", padding: "10px 16px", display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ flexShrink: 0, width: 22, height: 22, borderRadius: "50%", background: "#DC2626", color: "white", display: "grid", placeItems: "center", fontSize: 11, fontWeight: 800 }}>{m.n}</span>
            <p style={{ fontSize: 14, fontWeight: 700, color: "#991B1B", margin: 0 }}>{m.t}</p>
          </div>
          <p style={{ fontSize: 13.5, color: "#374151", lineHeight: 1.68, margin: 0, padding: "12px 16px" }}>{m.p}</p>
        </div>
      ))}

      <ClaimBuddyCta />
    </GuideArticleLayout>
  );
}
