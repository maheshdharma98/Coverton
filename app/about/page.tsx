'use client';

import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

// ── Data ──────────────────────────────────────────────────────────────────────

const WHO_WE_ARE = [
  {
    icon: 'ti-heart-handshake',
    title: 'Making insurance simple for everyone',
    desc: 'We believe insurance should be straightforward, transparent, and focused on protecting what matters most.',
  },
  {
    icon: 'ti-certificate',
    title: 'IRDAI-licensed & unbiased',
    desc: 'As a licensed insurance broker, we provide impartial advice, tailored risk assessments, and dedicated claims support.',
  },
  {
    icon: 'ti-users',
    title: 'Relationships over policies',
    desc: 'Our goal is not just to sell policies but to build long-term trust, service, and accountability with every client.',
  },
  {
    icon: 'ti-award',
    title: 'Decades of collective expertise',
    desc: "Our team works with leading insurers to identify solutions that match each client's unique needs.",
  },
  {
    icon: 'ti-shield-check',
    title: 'Your interests first',
    desc: "Every recommendation is made with your best interests in mind — not the insurer's.",
  },
  {
    icon: 'ti-map-pin',
    title: 'Local presence in Chennai',
    desc: 'We are proudly rooted in Chennai, offering personalized, face-to-face service you can rely on.',
  },
  {
    icon: 'ti-headset',
    title: 'Our service begins where others end',
    desc: 'We assist you through renewals, policy changes, and claims guidance — standing by you when you need us most.',
  },
  {
    icon: 'ti-device-laptop',
    title: 'Digital-first, human-centered',
    desc: 'With strong IT expertise, we deliver seamless service both offline and online through digital platforms.',
  },
];

const WHY_CHOOSE = [
  {
    icon: 'ti-certificate',
    title: 'IRDAI Licensed',
    desc: "Fully registered and regulated by India's Insurance Regulatory Authority.",
  },
  {
    icon: 'ti-scale',
    title: 'Unbiased Advice',
    desc: "Impartial insurance advice tailored to your specific needs — not the insurer's commission.",
  },
  {
    icon: 'ti-building-bank',
    title: '30+ Insurers',
    desc: 'Access to policies from all leading insurance companies across health, motor, life and more.',
  },
  {
    icon: 'ti-headset',
    title: 'Claims Assistance',
    desc: 'Dedicated claims support from first notification to final settlement — we fight for you.',
  },
  {
    icon: 'ti-eye',
    title: 'Full Transparency',
    desc: 'Transparent communication with no hidden surprises, fine print tricks, or undisclosed fees.',
  },
  {
    icon: 'ti-heart',
    title: 'Customer First',
    desc: 'A customer-first approach built on trust, integrity, and long-term relationships.',
  },
];

const ADDRESS_ROWS = [
  {
    icon: 'ti-map-pin',
    label: 'Address',
    value: 'No 190-192, Hameed Complex, Anna Salai,\nExpress Estate, Royapettah,\nChennai, Tamil Nadu 600006',
  },
  {
    icon: 'ti-clock',
    label: 'Working Hours',
    value: 'Monday – Friday: 9 AM – 6 PM\nSaturday: 10 AM – 4 PM',
  },
  {
    icon: 'ti-phone',
    label: 'Phone',
    value: '+91 95660 85116',
  },
  {
    icon: 'ti-mail',
    label: 'Email',
    value: 'wecare@coverton.in',
  },
];

// ── Page ──────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  const router = useRouter();
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
            paddingBottom: 60,
          }}
          className="px-5 lg:px-20"
        >
          {/* Blobs */}
          <div style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', right: -80, top: -80, background: 'rgba(18,71,214,0.15)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', width: 200, height: 200, borderRadius: '50%', left: '10%', bottom: -80, background: 'rgba(245,184,0,0.07)', pointerEvents: 'none' }} />

          <div style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto' }}>

            {/* Gold tag pill */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: '#F5B800', borderRadius: 20, padding: '4px 12px', marginBottom: 16 }}>
              <i className="ti ti-shield-check" style={{ fontSize: 12, color: '#0A0F1E' }} />
              <span style={{ fontSize: 10, fontWeight: 700, color: '#0A0F1E', letterSpacing: '0.06em' }}>IRDAI LICENSED BROKER</span>
            </div>

            {/* Headline */}
            <h1 style={{ fontSize: 'clamp(30px, 4vw, 40px)', fontWeight: 800, color: 'white', letterSpacing: '-1.2px', lineHeight: 1.1, margin: '0 0 14px' }}>
              Protecting Today.<br />
              <span style={{ color: '#F5B800' }}>Securing Tomorrow.</span>
            </h1>

            {/* Sub */}
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, maxWidth: 540, margin: '0 0 28px' }}>
              Coverton Insurance Broking Private Limited — making insurance simple, transparent, and customer-centric through ethical practices and technical expertise.
            </p>

            {/* Stats row */}
            <div
              className="grid grid-cols-2 md:grid-cols-4 gap-5"
              style={{ paddingTop: 28, borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: 8 }}
            >
              {[
                { num: 'IRDAI',   label: 'Licensed Broker' },
                { num: 'Chennai', label: 'Heart of the city' },
                { num: '30+',     label: 'Insurance partners' },
                { num: '100%',    label: 'Client-first approach' },
              ].map(({ num, label }) => (
                <div key={label}>
                  <p style={{ fontSize: 20, fontWeight: 700, color: 'white', margin: 0 }}>{num}</p>
                  <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', marginTop: 2 }}>{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── SECTION 2: MISSION & VISION ─────────────────────────────────── */}
        <section style={{ background: 'white' }} className="px-5 lg:px-20 py-16">
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

              {/* Mission */}
              <div style={{ background: '#0f1f3d', borderRadius: 20, padding: 32, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', right: -30, bottom: -30, width: 150, height: 150, borderRadius: '50%', background: 'rgba(18,71,214,0.3)', pointerEvents: 'none' }} />
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(245,184,0,0.15)', display: 'grid', placeItems: 'center' }}>
                      <i className="ti ti-target" style={{ fontSize: 22, color: '#F5B800' }} />
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#F5B800', letterSpacing: '1.5px', textTransform: 'uppercase' as const }}>Mission</span>
                  </div>
                  <h2 style={{ fontSize: 22, fontWeight: 800, color: 'white', letterSpacing: '-0.5px', margin: '0 0 16px' }}>Our Mission</h2>
                  <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, margin: 0 }}>
                    To equip individuals and businesses with reliable insurance counsel and risk management solutions that deliver financial security and confidence — achieved through transparent disclosure, technical expertise, and responsive service at every stage of the policy lifecycle.
                  </p>
                </div>
              </div>

              {/* Vision */}
              <div style={{ background: '#F5B800', borderRadius: 20, padding: 32, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', right: -30, bottom: -30, width: 150, height: 150, borderRadius: '50%', background: 'rgba(0,0,0,0.08)', pointerEvents: 'none' }} />
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(10,15,30,0.1)', display: 'grid', placeItems: 'center' }}>
                      <i className="ti ti-eye" style={{ fontSize: 22, color: '#0A0F1E' }} />
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(10,15,30,0.6)', letterSpacing: '1.5px', textTransform: 'uppercase' as const }}>Vision</span>
                  </div>
                  <h2 style={{ fontSize: 22, fontWeight: 800, color: '#0A0F1E', letterSpacing: '-0.5px', margin: '0 0 16px' }}>Our Vision</h2>
                  <p style={{ fontSize: 13.5, color: 'rgba(10,15,30,0.7)', lineHeight: 1.8, margin: 0 }}>
                    To lead with trust in every policy we place — making insurance accessible, understandable, and customer-centric through innovation and ethical practices.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ─── SECTION 3: WHO WE ARE ────────────────────────────────────────── */}
        <section style={{ background: '#F0F4FA' }} className="px-5 lg:px-20 py-16">
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: '#1247D6', letterSpacing: '1.5px', textTransform: 'uppercase' as const, display: 'block', marginBottom: 10 }}>
                WHO WE ARE
              </span>
              <h2 style={{ fontSize: 26, fontWeight: 800, color: '#0A0F1E', letterSpacing: '-0.6px', margin: 0 }}>
                Built on trust. Driven by expertise.
              </h2>
            </div>

            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              style={{ maxWidth: 900, margin: '0 auto' }}
            >
              {WHO_WE_ARE.map(({ icon, title, desc }) => (
                <div
                  key={title}
                  style={{
                    background: 'white',
                    border: '1px solid #E8EBF5',
                    borderRadius: 14,
                    padding: '20px 22px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 14,
                  }}
                >
                  <div style={{
                    width: 40, height: 40, minWidth: 40,
                    borderRadius: 10,
                    background: '#EEF3FF',
                    display: 'grid', placeItems: 'center',
                    fontSize: 20, color: '#1247D6',
                  }}>
                    <i className={`ti ${icon}`} />
                  </div>
                  <div>
                    <p style={{ fontSize: 13.5, fontWeight: 700, color: '#0A0F1E', margin: '0 0 5px' }}>{title}</p>
                    <p style={{ fontSize: 12.5, color: '#8892A4', lineHeight: 1.6, margin: 0 }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── SECTION 4: WHY CHOOSE COVERTON ──────────────────────────────── */}
        <section style={{ background: 'white' }} className="px-5 lg:px-20 py-16">
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 36 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: '#1247D6', letterSpacing: '1.5px', textTransform: 'uppercase' as const, display: 'block', marginBottom: 10 }}>
                WHY CHOOSE US
              </span>
              <h2 style={{ fontSize: 26, fontWeight: 800, color: '#0A0F1E', letterSpacing: '-0.6px', margin: 0 }}>
                The Coverton difference
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {WHY_CHOOSE.map(({ icon, title, desc }) => (
                <div
                  key={title}
                  style={{
                    background: '#FAFBFF',
                    border: '1px solid #E8EBF5',
                    borderRadius: 14,
                    padding: 22,
                    textAlign: 'center',
                  }}
                >
                  <div style={{
                    width: 48, height: 48, borderRadius: '50%',
                    background: '#EEF3FF',
                    display: 'grid', placeItems: 'center',
                    margin: '0 auto 14px',
                    fontSize: 22, color: '#1247D6',
                  }}>
                    <i className={`ti ${icon}`} />
                  </div>
                  <p style={{ fontSize: 14, fontWeight: 700, color: '#0A0F1E', margin: '0 0 6px' }}>{title}</p>
                  <p style={{ fontSize: 12, color: '#8892A4', lineHeight: 1.6, margin: 0 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── SECTION 5: LOCATION WITH MAP ────────────────────────────────── */}
        <section style={{ background: '#0f1f3d' }} className="px-5 lg:px-20 py-16">
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            style={{ maxWidth: 1200, margin: '0 auto' }}
          >
            {/* Left */}
            <div>
              <span style={{ fontSize: 11, fontWeight: 600, color: '#F5B800', letterSpacing: '1.5px', textTransform: 'uppercase' as const, display: 'block', marginBottom: 12 }}>
                FIND US
              </span>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: 'white', letterSpacing: '-0.6px', margin: '0 0 20px' }}>
                Visit us in Chennai
              </h2>

              <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 14, padding: 22, marginBottom: 20 }}>
                {ADDRESS_ROWS.map(({ icon, label, value }, i) => (
                  <div
                    key={label}
                    style={{
                      display: 'flex', alignItems: 'flex-start', gap: 12,
                      marginBottom: i < ADDRESS_ROWS.length - 1 ? 16 : 0,
                    }}
                  >
                    <div style={{
                      width: 36, height: 36, minWidth: 36,
                      borderRadius: 8,
                      background: 'rgba(245,184,0,0.15)',
                      display: 'grid', placeItems: 'center',
                      fontSize: 17, color: '#F5B800',
                    }}>
                      <i className={`ti ${icon}`} />
                    </div>
                    <div>
                      <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' as const, letterSpacing: '0.5px', margin: 0 }}>{label}</p>
                      <p style={{ fontSize: 13.5, color: 'white', marginTop: 2, lineHeight: 1.5, whiteSpace: 'pre-line' }}>{value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <a
                href="https://maps.app.goo.gl/udvrrtFGoUTDKQad9"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: '#F5B800', color: '#0A0F1E',
                  fontSize: 13, fontWeight: 700,
                  padding: '13px 24px', borderRadius: 50,
                  textDecoration: 'none',
                }}
              >
                <i className="ti ti-map-pin" style={{ fontSize: 16 }} />
                Get directions on Google Maps
              </a>
            </div>

            {/* Right — Map (mobile: below address) */}
            <div
              style={{ borderRadius: 16, overflow: 'hidden', border: '2px solid rgba(255,255,255,0.1)' }}
              className="h-[280px] md:h-[400px]"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.9!2d80.2707!3d13.0524!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x117aeae0c8527304!2sCoverton%20Insurance%20Broking%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0, display: 'block' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Coverton Insurance office location"
              />
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
                Ready to work with Coverton?
              </h2>
              <p style={{ fontSize: 13, color: 'rgba(10,15,30,0.65)', margin: 0 }}>
                Get unbiased insurance advice from our team today.
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
                Chat on WhatsApp
              </a>
              <button
                onClick={() => router.push('/products')}
                style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  background: '#0f1f3d', color: 'white',
                  padding: '13px 24px', borderRadius: 50,
                  fontWeight: 600, fontSize: 13, border: 'none', cursor: 'pointer', whiteSpace: 'nowrap',
                }}
              >
                <i className="ti ti-category" style={{ fontSize: 16 }} />
                Explore Insurance products
              </button>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
