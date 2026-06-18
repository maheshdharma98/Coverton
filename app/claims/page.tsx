'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

// ── Data ──────────────────────────────────────────────────────────────────────

const STEPS = [
  {
    num: 1,
    icon: 'ti-phone-call',
    title: 'Notify us immediately',
    desc: 'Call us or send a WhatsApp message as soon as the incident occurs. The sooner you report, the faster we act.',
  },
  {
    num: 2,
    icon: 'ti-clipboard-list',
    title: 'Submit your documents',
    desc: "Our team guides you on exactly which documents are needed. We keep it minimal — only what's truly required.",
  },
  {
    num: 3,
    icon: 'ti-search',
    title: 'Claim is assessed',
    desc: 'A dedicated claims officer is assigned to your case. We coordinate with the insurer on your behalf.',
  },
  {
    num: 4,
    icon: 'ti-circle-check',
    title: 'Settlement processed',
    desc: 'Once approved, your claim is settled directly. We follow up until the amount reaches you.',
  },
];

const TABS = [
  { key: 'motor',    label: 'Motor' },
  { key: 'health',   label: 'Health' },
  { key: 'life',     label: 'Life' },
  { key: 'travel',   label: 'Travel' },
  { key: 'property', label: 'Property' },
  { key: 'marine',   label: 'Marine' },
];

const DOCS: Record<string, { name: string; note: string }[]> = {
  motor: [
    { name: 'Duly filled claim form',   note: 'Signed by the insured' },
    { name: 'Copy of RC book',          note: 'Registration certificate of vehicle' },
    { name: 'Copy of driving licence',  note: 'Valid at time of accident' },
    { name: 'Copy of insurance policy', note: 'Current policy document' },
    { name: 'FIR copy',                 note: 'Required for theft or third-party cases' },
    { name: 'Original repair bills',    note: 'From authorised garage' },
    { name: 'Survey report',            note: 'Arranged by us' },
    { name: 'Cancelled cheque',         note: 'For direct bank transfer' },
  ],
  health: [
    { name: 'Duly filled claim form',      note: 'Hospital or reimbursement form' },
    { name: 'Original hospital bills',     note: 'Itemised discharge summary' },
    { name: "Doctor's prescription",       note: 'With diagnosis details' },
    { name: 'Lab/investigation reports',   note: 'All test reports' },
    { name: 'Discharge summary',           note: 'From treating hospital' },
    { name: 'Photo ID proof',              note: 'Aadhar or passport' },
    { name: 'Insurance policy copy',       note: 'Current health policy' },
    { name: 'Cancelled cheque',            note: 'For reimbursement transfer' },
  ],
  life: [
    { name: 'Original policy document', note: 'Physical or digital copy' },
    { name: 'Death certificate',         note: 'Issued by municipal authority' },
    { name: "Nominee's ID proof",        note: 'Aadhar, PAN, or passport' },
    { name: "Nominee's bank details",    note: 'For settlement transfer' },
    { name: 'Medical records',           note: 'If death was due to illness' },
    { name: 'FIR / post-mortem report',  note: 'For accidental death claims' },
    { name: 'Claimant statement',        note: 'Signed declaration form' },
    { name: 'Cancelled cheque',          note: "Nominee's bank account" },
  ],
  travel: [
    { name: 'Duly filled claim form',  note: 'Trip details and incident summary' },
    { name: 'Original boarding passes',note: 'Outward and return journey' },
    { name: 'Passport copy',           note: 'With travel stamps' },
    { name: 'Medical bills',           note: 'For medical emergency claims' },
    { name: 'Police report',           note: 'For theft or loss of baggage' },
    { name: 'Airline confirmation',    note: 'For trip cancellation claims' },
    { name: 'Insurance policy copy',   note: 'Travel policy document' },
    { name: 'Bank statement',          note: 'For expense verification' },
  ],
  property: [
    { name: 'Duly filled claim form',  note: 'Signed by property owner' },
    { name: 'Original policy document',note: 'Fire insurance policy' },
    { name: 'Fire brigade report',     note: 'Official incident report' },
    { name: 'Photos of damage',        note: 'Taken immediately after incident' },
    { name: 'Repair estimates',        note: 'From authorised contractors' },
    { name: 'Purchase invoices',       note: 'For damaged assets/stock' },
    { name: 'FIR copy',                note: 'If arson or criminal damage' },
    { name: 'Cancelled cheque',        note: 'For settlement transfer' },
  ],
  marine: [
    { name: 'Duly filled claim form',   note: 'Cargo details and incident' },
    { name: 'Original bill of lading',  note: 'Shipping document' },
    { name: 'Commercial invoice',       note: 'Value of cargo' },
    { name: 'Packing list',             note: 'Itemised cargo list' },
    { name: 'Survey report',            note: 'Independent surveyor assessment' },
    { name: 'Damage photos',            note: 'Taken at port or delivery' },
    { name: 'Police report',            note: 'For theft during transit' },
    { name: 'Insurance policy copy',    note: 'Marine cargo policy' },
  ],
};

const PROMISES = [
  {
    icon: 'ti-clock',
    title: 'Fast settlement',
    desc: "98% of claims settled within 7 working days. We don't let paperwork slow you down.",
  },
  {
    icon: 'ti-user-check',
    title: 'Dedicated officer',
    desc: 'One dedicated claims officer handles your entire case from start to finish — no passing around.',
  },
  {
    icon: 'ti-eye',
    title: 'Full transparency',
    desc: 'We keep you updated at every stage. No surprises, no hidden deductions, no fine print tricks.',
  },
  {
    icon: 'ti-shield-check',
    title: 'We fight for you',
    desc: 'If an insurer underpays or delays without cause, we escalate and advocate on your behalf.',
  },
];

const FAQS = [
  {
    q: 'How soon should I report a claim?',
    a: 'You should report a claim as soon as possible — ideally within 24–48 hours of the incident. Early reporting allows us to assign a claims officer quickly and helps avoid delays in the process.',
  },
  {
    q: 'Will filing a claim affect my premium?',
    a: 'It depends on the insurance type and the number of claims filed. For motor insurance, claims may impact your No Claim Bonus (NCB). Our advisors will explain the impact before you proceed, so you can make an informed decision.',
  },
  {
    q: 'What if my claim is rejected?',
    a: 'If your claim is rejected, we review the rejection reason and help you file a formal grievance with the insurer. If needed, we escalate to the Insurance Ombudsman on your behalf.',
  },
  {
    q: 'How long does a typical claim take?',
    a: 'Most straightforward claims are settled within 7 working days. Complex claims involving investigations or large sums may take 2–4 weeks. We provide regular updates throughout.',
  },
  {
    q: 'Do I need to go to the insurer directly?',
    a: 'No. As your insurance broker, we coordinate with the insurer on your behalf. You deal only with us — we handle all communication, documentation follow-ups, and escalations.',
  },
  {
    q: 'Can I file a claim over WhatsApp?',
    a: 'Yes. Send us a WhatsApp message with details of the incident and we will guide you through the next steps immediately. This is often the fastest way to start the process.',
  },
];

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ClaimsPage() {
  const [activeTab, setActiveTab] = useState('motor');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '';

  return (
    <>
      <Navbar />
      <main>

        {/* ─── SECTION 1: HERO ──────────────────────────────────────────────── */}
        <section
          style={{
            background: '#0f1f3d',
            position: 'relative',
            overflow: 'hidden',
            paddingTop: 120,
            paddingBottom: 64,
          }}
          className="px-5 lg:px-20"
        >
          {/* Blobs */}
          <div style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', right: -80, top: -80, background: 'rgba(18,71,214,0.15)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', width: 200, height: 200, borderRadius: '50%', left: '10%', bottom: -80, background: 'rgba(245,184,0,0.07)', pointerEvents: 'none' }} />

          <div style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto' }}>
            {/* Breadcrumb */}
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', marginBottom: 20 }}>
              <a href="/" style={{ color: 'rgba(255,255,255,0.45)', textDecoration: 'none' }}>Home</a>
              {' '}›{' '}Claims
            </p>

            {/* Tag */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#F5B800', borderRadius: 20, padding: '4px 12px', marginBottom: 16 }}>
              <i className="ti ti-file-check" style={{ fontSize: 12, color: '#0A0F1E' }} />
              <span style={{ fontSize: 10, fontWeight: 700, color: '#0A0F1E', letterSpacing: '0.06em' }}>CLAIMS SUPPORT</span>
            </div>

            {/* Headline */}
            <h1 style={{ fontSize: 'clamp(30px, 4vw, 42px)', fontWeight: 800, color: 'white', letterSpacing: '-1.2px', lineHeight: 1.1, margin: '0 0 14px' }}>
              We're with you when<br className="hidden sm:block" /> it matters most.
            </h1>

            {/* Sub */}
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, maxWidth: 520, margin: '0 0 28px' }}>
              Filing a claim can feel overwhelming. Our dedicated claims team handles everything — from first notification to final settlement. Fast, transparent, and stress-free.
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a
                href={`https://wa.me/${waNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: '#25D366', color: 'white',
                  padding: '13px 24px', borderRadius: 50,
                  fontSize: 13, fontWeight: 600, textDecoration: 'none',
                }}
              >
                <i className="ti ti-brand-whatsapp" style={{ fontSize: 16 }} />
                Report a claim on WhatsApp
              </a>
              <a
                href="tel:+919566085116"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.25)',
                  color: 'rgba(255,255,255,0.8)',
                  padding: '13px 24px', borderRadius: 50,
                  fontSize: 13, textDecoration: 'none',
                }}
              >
                <i className="ti ti-phone" style={{ fontSize: 15 }} />
                Call our claims team
              </a>
            </div>

            {/* Stats row */}
            <div
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
              style={{ marginTop: 28, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.1)' }}
            >
              {[
                { num: '98%',    label: 'Claims settled successfully' },
                { num: '7 days', label: 'Average settlement time' },
                { num: '24/7',   label: 'Claims support available' },
                { num: 'Zero',   label: 'Hidden charges ever' },
              ].map(({ num, label }) => (
                <div key={label}>
                  <p style={{ fontSize: 22, fontWeight: 700, color: 'white', margin: 0 }}>{num}</p>
                  <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', marginTop: 2 }}>{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── SECTION 2: HOW TO FILE ───────────────────────────────────────── */}
        <section style={{ background: 'white' }} className="px-5 lg:px-20 py-16">
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: '#1247D6', display: 'block', marginBottom: 10 }}>
                HOW IT WORKS
              </span>
              <h2 style={{ fontSize: 26, fontWeight: 800, color: '#0A0F1E', margin: '0 0 8px' }}>
                Filing a claim is simple
              </h2>
              <p style={{ fontSize: 14, color: '#8892A4', margin: 0 }}>4 steps. No jargon. No runaround.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {STEPS.map((step, i) => (
                <div
                  key={step.num}
                  style={{
                    background: '#FAFBFF',
                    border: '1px solid #E8EBF5',
                    borderRadius: 16,
                    padding: 24,
                    position: 'relative',
                  }}
                >
                  {/* Connector arrow — desktop only */}
                  {i < STEPS.length - 1 && (
                    <i
                      className="ti ti-chevron-right hidden lg:block"
                      style={{ position: 'absolute', right: -14, top: 32, fontSize: 20, color: '#E8EBF5', zIndex: 2 }}
                    />
                  )}

                  {/* Step number */}
                  <div style={{
                    width: 32, height: 32, borderRadius: '50%',
                    background: '#0f1f3d', color: 'white',
                    fontSize: 13, fontWeight: 700,
                    display: 'grid', placeItems: 'center',
                    marginBottom: 16,
                  }}>
                    {step.num}
                  </div>

                  <i className={`ti ${step.icon}`} style={{ fontSize: 28, color: '#1247D6', display: 'block', marginBottom: 12 }} />
                  <p style={{ fontSize: 14, fontWeight: 700, color: '#0A0F1E', margin: '0 0 6px' }}>{step.title}</p>
                  <p style={{ fontSize: 12.5, color: '#8892A4', lineHeight: 1.6, margin: 0 }}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: CLAIMS BY TYPE ────────────────────────────────────── */}
        <section style={{ background: '#FAFBFF' }} className="px-5 lg:px-20 py-16">
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: '#1247D6', display: 'block', marginBottom: 10 }}>
                WHAT TO SUBMIT
              </span>
              <h2 style={{ fontSize: 26, fontWeight: 800, color: '#0A0F1E', margin: '0 0 8px' }}>
                Documents needed by claim type
              </h2>
              <p style={{ fontSize: 14, color: '#8892A4', margin: 0 }}>
                Select your insurance type to see the required documents
              </p>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', marginTop: 24, marginBottom: 32 }}>
              {TABS.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  style={{
                    padding: '8px 18px', borderRadius: 50,
                    fontSize: 12.5, fontWeight: 500,
                    border: `1px solid ${activeTab === key ? '#0f1f3d' : '#E8EBF5'}`,
                    background: activeTab === key ? '#0f1f3d' : 'white',
                    color: activeTab === key ? 'white' : '#3D4460',
                    cursor: 'pointer', transition: 'all 0.15s',
                  }}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Document grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {(DOCS[activeTab] ?? []).map(({ name, note }) => (
                <div
                  key={name}
                  style={{
                    background: 'white', border: '1px solid #E8EBF5',
                    borderRadius: 12, padding: '16px 18px',
                    display: 'flex', alignItems: 'flex-start', gap: 12,
                  }}
                >
                  <div style={{
                    width: 36, height: 36, borderRadius: '50%',
                    background: '#EEF3FF', display: 'grid', placeItems: 'center', flexShrink: 0,
                  }}>
                    <i className="ti ti-file-text" style={{ fontSize: 17, color: '#1247D6' }} />
                  </div>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 600, color: '#0A0F1E', margin: 0 }}>{name}</p>
                    <p style={{ fontSize: 11.5, color: '#8892A4', margin: '2px 0 0' }}>{note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── SECTION 4: CLAIMS PROMISE ────────────────────────────────────── */}
        <section style={{ background: '#0f1f3d' }} className="px-5 lg:px-20 py-12">
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 32 }}>
              <h2 style={{ fontSize: 22, fontWeight: 700, color: 'white', margin: '0 0 8px' }}>
                Our claims promise to you
              </h2>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', margin: 0 }}>
                We don't just sell policies. We stand by you when you need to use them.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {PROMISES.map(({ icon, title, desc }) => (
                <div
                  key={title}
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 14, padding: 22,
                  }}
                >
                  <i className={`ti ${icon}`} style={{ fontSize: 28, color: '#F5B800', display: 'block', marginBottom: 14 }} />
                  <p style={{ fontSize: 14, fontWeight: 700, color: 'white', margin: '0 0 8px' }}>{title}</p>
                  <p style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, margin: 0 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── SECTION 5: FAQ ───────────────────────────────────────────────── */}
        <section style={{ background: 'white' }} className="px-5 lg:px-20 py-16">
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: '#1247D6', display: 'block', marginBottom: 10 }}>
                FAQ
              </span>
              <h2 style={{ fontSize: 26, fontWeight: 800, color: '#0A0F1E', margin: 0 }}>
                Common claims questions
              </h2>
            </div>

            <div style={{ maxWidth: 760, margin: '0 auto' }}>
              {FAQS.map((faq, i) => (
                <div
                  key={i}
                  style={{ borderBottom: '1px solid #E8EBF5', padding: '18px 0', cursor: 'pointer' }}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
                    <p style={{ fontSize: 14, fontWeight: 600, color: '#0A0F1E', margin: 0 }}>{faq.q}</p>
                    <i
                      className="ti ti-chevron-down"
                      style={{
                        fontSize: 16, color: '#8892A4', flexShrink: 0,
                        transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s ease',
                      }}
                    />
                  </div>
                  {openFaq === i && (
                    <p style={{ fontSize: 13, color: '#8892A4', lineHeight: 1.7, margin: '10px 0 4px' }}>
                      {faq.a}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── SECTION 6: CTA BAND ──────────────────────────────────────────── */}
        <section style={{ background: '#F5B800' }} className="px-5 lg:px-20 py-10">
          <div
            className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            style={{ maxWidth: 1200, margin: '0 auto' }}
          >
            <div>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: '#0A0F1E', letterSpacing: '-0.5px', margin: '0 0 4px' }}>
                Need to file a claim right now?
              </h2>
              <p style={{ fontSize: 13, color: 'rgba(10,15,30,0.65)', margin: 0 }}>
                Don't wait. Contact us immediately and we'll take it from here.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <a
                href={`https://wa.me/${waNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  background: '#25D366', color: 'white',
                  padding: '13px 24px', borderRadius: 50,
                  fontWeight: 600, fontSize: 13, textDecoration: 'none', whiteSpace: 'nowrap',
                }}
              >
                <i className="ti ti-brand-whatsapp" style={{ fontSize: 16 }} />
                WhatsApp us now
              </a>
              <a
                href="tel:+919566085116"
                style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  background: '#0f1f3d', color: 'white',
                  padding: '13px 24px', borderRadius: 50,
                  fontWeight: 600, fontSize: 13, textDecoration: 'none', whiteSpace: 'nowrap',
                }}
              >
                <i className="ti ti-phone" style={{ fontSize: 15 }} />
                Call claims team
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
