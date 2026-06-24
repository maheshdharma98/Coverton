"use client";

import { useState, useMemo } from "react";

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";

function fmt(lakhs: number): string {
  if (lakhs >= 100)
    return "₹" + (lakhs / 100).toFixed(2).replace(/\.?0+$/, "") + " Cr";
  return "₹" + lakhs + " L";
}

function fmtRupees(n: number): string {
  return "₹" + Math.round(n).toLocaleString("en-IN");
}

// ── Slider + label row ────────────────────────────────────────────────────────
function SliderInput({
  label,
  hint,
  value,
  min,
  max,
  step = 1,
  onChange,
  display,
}: {
  label: string;
  hint?: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
  display: (v: number) => string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div style={{ marginBottom: 22 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <label style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.85)" }}>
          {label}
        </label>
        <span style={{ fontSize: 13, fontWeight: 700, color: "#F5B800" }}>
          {display(value)}
        </span>
      </div>
      <input
        type="range"
        className="tc-slider"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ "--pct": `${pct}%` } as React.CSSProperties}
        aria-label={label}
      />
      {hint && (
        <p style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", margin: "5px 0 0", lineHeight: 1.5 }}>
          {hint}
        </p>
      )}
    </div>
  );
}

// ── Breakdown row ─────────────────────────────────────────────────────────────
function BdRow({
  label,
  value,
  deduct,
  total,
}: {
  label: string;
  value: string;
  deduct?: boolean;
  total?: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "9px 0",
        borderBottom: total ? "none" : "1px solid rgba(255,255,255,0.07)",
        fontSize: total ? 15 : 13,
        fontWeight: total ? 700 : 400,
        color: total ? "white" : "rgba(255,255,255,0.65)",
      }}
    >
      <span>{label}</span>
      <span style={{ fontWeight: 600, color: deduct ? "#F5B800" : total ? "white" : "rgba(255,255,255,0.9)" }}>
        {value}
      </span>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function TermCalculator() {
  const [age, setAge] = useState(30);
  const [income, setIncome] = useState(10);
  const [deps, setDeps] = useState(2);
  const [homeLoan, setHomeLoan] = useState(30);
  const [otherLoans, setOtherLoans] = useState(5);
  const [existing, setExisting] = useState(0);

  const calc = useMemo(() => {
    const base = income * 10;
    const depBuf = deps * 10;
    const loans = homeLoan + otherLoans;
    let rec = base + depBuf + loans - existing;
    rec = Math.max(25, Math.min(500, Math.round(rec)));

    let lo: number, hi: number;
    if (age < 30)       { lo = 0.030; hi = 0.050; }
    else if (age < 40)  { lo = 0.045; hi = 0.075; }
    else if (age < 50)  { lo = 0.080; hi = 0.130; }
    else                { lo = 0.140; hi = 0.220; }

    const recRupees = rec * 100_000;
    return {
      base,
      depBuf,
      loans,
      rec,
      premLow:  recRupees * lo / 100,
      premHigh: recRupees * hi / 100,
    };
  }, [age, income, deps, homeLoan, otherLoans, existing]);

  const waText = encodeURIComponent(
    `Hi, I used the Coverton term cover calculator. My recommended cover is ${fmt(calc.rec)} ` +
    `(Income ₹${income}L/yr, ${deps} dependents, loans ₹${calc.loans}L). Can you help me find the right plan?`
  );

  return (
    <section
      style={{ background: "linear-gradient(160deg,#0f1f3d 0%,#1a3460 50%,#0d2a55 100%)", overflow: "hidden" }}
      className="px-5 sm:px-10 lg:px-16 py-14 lg:py-20"
    >
      {/* ── Styles ─────────────────────────────────────────────────────────── */}
      <style>{`
        .tc-slider {
          width: 100%;
          -webkit-appearance: none;
          appearance: none;
          height: 5px;
          border-radius: 99px;
          background: linear-gradient(
            to right,
            #F5B800 var(--pct, 0%),
            rgba(255,255,255,0.12) var(--pct, 0%)
          );
          cursor: pointer;
          outline: none;
        }
        .tc-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #F5B800;
          border: 3px solid #0f1f3d;
          box-shadow: 0 2px 10px rgba(245,184,0,0.5);
          cursor: pointer;
          transition: transform 0.15s ease;
        }
        .tc-slider::-webkit-slider-thumb:hover { transform: scale(1.2); }
        .tc-slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #F5B800;
          border: 3px solid #0f1f3d;
          box-shadow: 0 2px 10px rgba(245,184,0,0.5);
          cursor: pointer;
        }
        .tc-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 28px;
          align-items: start;
        }
        @media (max-width: 900px) {
          .tc-grid { grid-template-columns: 1fr; }
          .tc-sticky { position: static !important; }
        }
      `}</style>

      <div style={{ maxWidth: 1160, margin: "0 auto" }}>

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div style={{ textAlign: "center", marginBottom: 44 }}>
          <span
            style={{
              display: "inline-block",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "1.8px",
              textTransform: "uppercase",
              color: "#F5B800",
              background: "rgba(245,184,0,0.1)",
              border: "1px solid rgba(245,184,0,0.2)",
              borderRadius: 50,
              padding: "4px 14px",
              marginBottom: 16,
            }}
          >
            Free Tool · No sign-up · Nothing stored
          </span>
          <h2
            style={{
              fontSize: "clamp(24px, 4vw, 40px)",
              fontWeight: 800,
              color: "white",
              letterSpacing: "-0.8px",
              lineHeight: 1.15,
              margin: "0 auto 12px",
              maxWidth: 600,
            }}
          >
            How much term cover do you actually need?
          </h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>
            Income replacement + liabilities, minus what you already have — the same method our advisors use.
          </p>
        </div>

        {/* ── Two-column grid ─────────────────────────────────────────────── */}
        <div className="tc-grid">

          {/* LEFT — inputs ──────────────────────────────────────────────── */}
          <div
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.09)",
              borderRadius: 20,
              padding: "28px 28px 8px",
            }}
          >
            <h3 style={{ fontSize: 14, fontWeight: 700, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 28 }}>
              Tell us about yourself
            </h3>

            <SliderInput
              label="Current age"
              value={age} min={18} max={55}
              onChange={setAge}
              display={(v) => `${v} yrs`}
              hint="Term plans are generally available up to age 55 for new policies"
            />
            <SliderInput
              label="Annual income"
              value={income} min={1} max={200}
              onChange={setIncome}
              display={(v) => `₹${v} L/yr`}
              hint="Gross annual income in lakhs (₹10 = ₹10,00,000)"
            />
            <SliderInput
              label="Financial dependents"
              value={deps} min={0} max={8}
              onChange={setDeps}
              display={(v) => `${v}`}
              hint="Spouse, children, parents — anyone whose finances rest on you"
            />
            <SliderInput
              label="Outstanding home loan"
              value={homeLoan} min={0} max={300}
              onChange={setHomeLoan}
              display={(v) => `₹${v} L`}
            />
            <SliderInput
              label="Other loans (car, personal, business)"
              value={otherLoans} min={0} max={100}
              onChange={setOtherLoans}
              display={(v) => `₹${v} L`}
            />
            <SliderInput
              label="Existing term cover"
              value={existing} min={0} max={300}
              onChange={setExisting}
              display={(v) => `₹${v} L`}
              hint="Don't include LIC endowment / ULIP plans here"
            />
          </div>

          {/* RIGHT — result ─────────────────────────────────────────────── */}
          <div className="tc-sticky" style={{ position: "sticky", top: 96 }}>

            {/* Cover card */}
            <div
              style={{
                background: "linear-gradient(140deg,#1247D6 0%,#0b33a8 100%)",
                borderRadius: 20,
                padding: "28px 28px 24px",
                marginBottom: 16,
                boxShadow: "0 20px 60px rgba(18,71,214,0.35)",
              }}
            >
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1.4px", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", marginBottom: 8 }}>
                Recommended cover
              </p>
              <p
                style={{
                  fontSize: "clamp(40px, 7vw, 58px)",
                  fontWeight: 900,
                  color: "white",
                  letterSpacing: "-2px",
                  lineHeight: 1,
                  margin: "0 0 6px",
                }}
              >
                {fmt(calc.rec)}
              </p>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", marginBottom: 20 }}>
                This is the gap your family needs protected
              </p>

              {/* No-cover warning */}
              {existing < 25 && (
                <div
                  style={{
                    background: "rgba(245,184,0,0.12)",
                    border: "1px solid rgba(245,184,0,0.25)",
                    borderRadius: 10,
                    padding: "10px 14px",
                    fontSize: 12.5,
                    color: "#F5B800",
                    marginBottom: 20,
                    lineHeight: 1.55,
                  }}
                >
                  ⚠ You currently have little or no term cover. If something happened to you today, your family would face a serious financial gap.
                </div>
              )}

              {/* Premium */}
              <div
                style={{
                  background: "rgba(255,255,255,0.09)",
                  borderRadius: 12,
                  padding: "12px 16px",
                  marginBottom: 20,
                }}
              >
                <p style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginBottom: 4 }}>
                  Ballpark annual premium
                </p>
                <p style={{ fontSize: 18, fontWeight: 800, color: "white", letterSpacing: "-0.5px" }}>
                  {fmtRupees(calc.premLow)} – {fmtRupees(calc.premHigh)}{" "}
                  <span style={{ fontSize: 13, fontWeight: 400, color: "rgba(255,255,255,0.5)" }}>/ yr</span>
                </p>
              </div>

              {/* WhatsApp CTA */}
              <a
                href={`https://wa.me/${WA_NUMBER}?text=${waText}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  background: "#25D366",
                  color: "white",
                  borderRadius: 50,
                  padding: "13px 24px",
                  fontSize: 14,
                  fontWeight: 700,
                  textDecoration: "none",
                  width: "100%",
                  boxSizing: "border-box",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "#20BA5A")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "#25D366")}
              >
                <i className="ti ti-brand-whatsapp" style={{ fontSize: 19 }} aria-hidden="true" />
                Discuss my result on WhatsApp
              </a>
            </div>

            {/* Breakdown */}
            <div
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 20,
                padding: "20px 24px",
                marginBottom: 16,
              }}
            >
              <h3 style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "1.2px", marginBottom: 4 }}>
                How we got here
              </h3>
              <BdRow label="Income replacement (10×)" value={fmt(calc.base)} />
              <BdRow label="Dependent buffer" value={fmt(calc.depBuf)} />
              <BdRow label="Loans to clear" value={fmt(calc.loans)} />
              <BdRow label="Less: existing cover" value={`− ${fmt(existing)}`} deduct />
              <BdRow label="Cover you need" value={fmt(calc.rec)} total />
            </div>

            {/* Disclaimer */}
            <p style={{ fontSize: 10.5, color: "rgba(255,255,255,0.28)", lineHeight: 1.65, textAlign: "center" }}>
              Estimate for guidance only — not a policy recommendation. Actual premium depends on age, health, smoker status, insurer, and policy term. Consult a licensed advisor before purchasing.
            </p>
          </div>
        </div>

        {/* ── Info callout ─────────────────────────────────────────────────── */}
        <div
          style={{
            marginTop: 32,
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 14,
            padding: "16px 22px",
            fontSize: 13,
            color: "rgba(255,255,255,0.45)",
            lineHeight: 1.75,
            maxWidth: 700,
          }}
        >
          <strong style={{ color: "rgba(255,255,255,0.75)" }}>Why 10× income?</strong>{" "}
          The income replacement multiplier (10×) is a conservative baseline used by most financial planners in India. It assumes your family needs to replace your income for roughly 10 years, with the invested corpus generating a modest 6–7% return. If you have young children or a longer earning horizon, consider going higher.
        </div>
      </div>
    </section>
  );
}
