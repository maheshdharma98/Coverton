'use client';

import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BubbleBackground from '@/components/ui/BubbleBackground';

const ADDRESS_ROWS = [
  { icon: 'ti-map-pin',  label: 'Address',       value: 'No 190-192, Hameed Complex, Anna Salai,\nExpress Estate, Royapettah, Chennai 600006' },
  { icon: 'ti-clock',    label: 'Working Hours',  value: 'Mon – Fri: 9 AM – 6 PM · Sat: 10 AM – 4 PM' },
  { icon: 'ti-phone',    label: 'Phone',          value: '+91 95660 85116' },
  { icon: 'ti-mail',     label: 'Email',          value: 'wecare@coverton.in' },
];

const WHY_CHOOSE = [
  { icon: 'ti-certificate',    title: 'IRDAI Licensed',     desc: "Fully registered and regulated by India's insurance authority." },
  { icon: 'ti-scale',          title: 'Unbiased Advice',    desc: 'Impartial advice across 30+ insurers — not driven by commission.' },
  { icon: 'ti-shield-check',   title: 'Claims Assistance',  desc: 'We handle your claim from first call to final settlement.' },
  { icon: 'ti-eye',            title: 'Full Transparency',  desc: 'No hidden fees, no fine print surprises. Ever.' },
  { icon: 'ti-users',          title: 'Long-term Partner',  desc: 'We stay with you through renewals, changes, and claims.' },
  { icon: 'ti-device-laptop',  title: 'Digital-first',      desc: 'Seamless service online and in-person from our Chennai office.' },
];

export default function AboutPage() {
  const router = useRouter();
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '';

  return (
    <>
      <Navbar />
      <main>
        <BubbleBackground>

          {/* ── HERO ──────────────────────────────────────────────────────── */}
          <section style={{ background: 'transparent', paddingTop: 120, paddingBottom: 32 }} className="px-5 lg:px-20">
            <div style={{ maxWidth: 1200, margin: '0 auto' }}>

              {/* Badge + headline in one column */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: '#EEF3FF', borderRadius: 20, padding: '4px 12px', marginBottom: 14 }}>
                <i className="ti ti-shield-check" style={{ fontSize: 12, color: '#1247D6' }} />
                <span style={{ fontSize: 10, fontWeight: 700, color: '#1247D6', letterSpacing: '0.06em' }}>IRDAI LICENSED BROKER · CHENNAI</span>
              </div>

              <div>
                <h1 style={{ fontSize: 'clamp(28px, 3.8vw, 44px)', fontWeight: 900, color: '#0A0F1E', letterSpacing: '-1.5px', lineHeight: 1.08, margin: '0 0 16px' }}>
                  Protecting Today.<br />
                  <span style={{ color: '#F5B800' }}>Securing Tomorrow.</span>
                </h1>
                <p style={{ fontSize: 14, color: '#6B7280', lineHeight: 1.7, maxWidth: 580, margin: 0 }}>
                  Coverton Insurance Broking — making insurance simple, transparent, and customer-centric through ethical practices and technical expertise.
                </p>
              </div>
            </div>
          </section>

          {/* ── WHY CHOOSE ────────────────────────────────────────────────── */}
          <section style={{ background: 'transparent' }} className="px-5 lg:px-20 py-8 lg:py-10">
            <div style={{ maxWidth: 1200, margin: '0 auto' }}>
              <div style={{ marginBottom: 22 }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: '#1247D6', letterSpacing: '1.5px', textTransform: 'uppercase', margin: '0 0 6px' }}>Why Coverton</p>
                <h2 style={{ fontSize: 24, fontWeight: 800, color: '#0A0F1E', letterSpacing: '-0.5px', margin: 0 }}>The difference you'll feel.</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {WHY_CHOOSE.map(({ icon, title, desc }) => (
                  <div key={title} style={{ background: 'white', border: '1px solid #E8EBF5', borderRadius: 14, padding: '16px 18px', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <div style={{ width: 36, height: 36, minWidth: 36, borderRadius: 9, background: '#EEF3FF', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                      <i className={`ti ${icon}`} style={{ fontSize: 17, color: '#1247D6' }} />
                    </div>
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 700, color: '#0A0F1E', margin: '0 0 4px' }}>{title}</p>
                      <p style={{ fontSize: 12, color: '#64748B', lineHeight: 1.55, margin: 0 }}>{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── LOCATION ──────────────────────────────────────────────────── */}
          <section style={{ background: 'transparent' }} className="px-5 lg:px-20 py-8 lg:py-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start" style={{ maxWidth: 1200, margin: '0 auto' }}>
              <div>
                <p style={{ fontSize: 11, fontWeight: 700, color: '#1247D6', letterSpacing: '1.5px', textTransform: 'uppercase', margin: '0 0 6px' }}>Find Us</p>
                <h2 style={{ fontSize: 24, fontWeight: 800, color: '#0A0F1E', letterSpacing: '-0.5px', margin: '0 0 16px' }}>Visit us in Chennai</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
                  {ADDRESS_ROWS.map(({ icon, label, value }) => (
                    <div key={label} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                      <div style={{ width: 34, height: 34, minWidth: 34, borderRadius: 8, background: '#EEF3FF', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                        <i className={`ti ${icon}`} style={{ fontSize: 16, color: '#1247D6' }} />
                      </div>
                      <div>
                        <p style={{ fontSize: 10.5, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 1px' }}>{label}</p>
                        <p style={{ fontSize: 13, color: '#0A0F1E', lineHeight: 1.5, margin: 0, whiteSpace: 'pre-line' }}>{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <a
                  href="https://maps.app.goo.gl/udvrrtFGoUTDKQad9"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#F5B800', color: '#0A0F1E', fontSize: 13, fontWeight: 700, padding: '11px 22px', borderRadius: 50, textDecoration: 'none' }}
                >
                  <i className="ti ti-map-pin" style={{ fontSize: 15 }} />
                  Get directions
                </a>
              </div>
              <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid #E8EBF5' }} className="h-[260px] md:h-[380px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.9!2d80.2707!3d13.0524!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x117aeae0c8527304!2sCoverton%20Insurance%20Broking%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%" height="100%" style={{ border: 0, display: 'block' }}
                  allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                  title="Coverton Insurance office location"
                />
              </div>
            </div>
          </section>

          {/* ── CTA BAND ──────────────────────────────────────────────────── */}
          <section style={{ background: '#F5B800' }} className="px-5 lg:px-20 py-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5" style={{ maxWidth: 1200, margin: '0 auto' }}>
              <div>
                <h2 style={{ fontSize: 20, fontWeight: 800, color: '#0A0F1E', margin: '0 0 4px' }}>Ready to work with Coverton?</h2>
                <p style={{ fontSize: 13, color: 'rgba(10,15,30,0.75)', margin: 0 }}>Get unbiased insurance advice from our team today.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href={`https://wa.me/${waNumber}`} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: '#25D366', color: 'white', padding: '12px 22px', borderRadius: 50, fontWeight: 600, fontSize: 13, textDecoration: 'none', whiteSpace: 'nowrap' }}>
                  <i className="ti ti-brand-whatsapp" style={{ fontSize: 16 }} /> Chat on WhatsApp
                </a>
                <button onClick={() => router.push('/products')}
                  style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: 'transparent', color: '#374151', padding: '12px 22px', borderRadius: 50, fontWeight: 600, fontSize: 13, border: '1px solid rgba(10,15,30,0.2)', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                  <i className="ti ti-category" style={{ fontSize: 16 }} /> Explore Insurance
                </button>
              </div>
            </div>
          </section>

        </BubbleBackground>
      </main>
      <Footer />
    </>
  );
}
