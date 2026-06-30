'use client';
import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BubbleBackground from '@/components/ui/BubbleBackground';

// ─── Types ────────────────────────────────────────────────────────────────────

interface ProductConfig {
  name: string;
  accentColour: string;
  heroBg: string;
  heroOverlay: string;
  bgKeyword: string;
  icon: string;
  tagText: string;
  description: string;
  subcategories: string[];
  benefits: string[];
  formType: 'motor' | 'health-individual' | 'health-floater' | 'health-group' | 'travel' | 'standard';
  categories?: string[];
}

// ─── Product Config ───────────────────────────────────────────────────────────

const PRODUCT_CONFIG: Record<string, ProductConfig> = {
  motor: {
    name: 'Motor Insurance',
    accentColour: '#1247D6',
    heroBg: '#0f1f3d',
    heroOverlay: 'linear-gradient(135deg, rgba(18,71,214,0.92) 0%, rgba(15,31,61,0.88) 100%)',
    bgKeyword: 'car,highway',
    icon: 'ti-car',
    tagText: 'Motor',
    description: 'Comprehensive protection for your vehicles and fleet. From two-wheelers to commercial vehicles, we cover accidents, theft, and third-party liability.',
    subcategories: ['Auto', 'Bike', 'Car', 'CPA', 'Commercial Vehicle', 'Private Car'],
    benefits: ['Own damage cover', 'Theft protection', 'Third-party liability', 'Natural calamity cover', 'Personal accident cover', 'Cashless garage network'],
    formType: 'motor',
    categories: ['Auto', 'Bike', 'Car', 'CPA', 'Commercial Vehicle', 'Private Car'],
  },
  'health-individual': {
    name: 'Health Insurance',
    accentColour: '#3B6D11',
    heroBg: '#0A2A0F',
    heroOverlay: 'linear-gradient(135deg, rgba(59,109,17,0.92) 0%, rgba(15,31,61,0.88) 100%)',
    bgKeyword: 'doctor,healthcare',
    icon: 'ti-heart',
    tagText: 'Health',
    description: 'Comprehensive health coverage for individuals, families, and corporate groups. Access to 5,000+ cashless network hospitals across India.',
    subcategories: ['Individual', 'Floater', 'Group Health'],
    benefits: ['Hospitalisation expenses', 'Pre & post hospitalisation', 'Day care treatments', 'Ambulance charges', '5,000+ cashless hospitals', 'Annual health check-up'],
    formType: 'health-individual',
  },
  'health-floater': {
    name: 'Health Insurance',
    accentColour: '#3B6D11',
    heroBg: '#0A2A0F',
    heroOverlay: 'linear-gradient(135deg, rgba(15,110,86,0.92) 0%, rgba(15,31,61,0.88) 100%)',
    bgKeyword: 'family,happy',
    icon: 'ti-heart',
    tagText: 'Health',
    description: 'Comprehensive health coverage for individuals, families, and corporate groups. Access to 5,000+ cashless network hospitals across India.',
    subcategories: ['Individual', 'Floater', 'Group Health'],
    benefits: ['Hospitalisation expenses', 'Pre & post hospitalisation', 'Day care treatments', 'Ambulance charges', '5,000+ cashless hospitals', 'Annual health check-up'],
    formType: 'health-floater',
  },
  'health-group': {
    name: 'Health Insurance',
    accentColour: '#3B6D11',
    heroBg: '#0A2A0F',
    heroOverlay: 'linear-gradient(135deg, rgba(24,95,165,0.92) 0%, rgba(15,31,61,0.88) 100%)',
    bgKeyword: 'office,corporate,team',
    icon: 'ti-heart',
    tagText: 'Health',
    description: 'Comprehensive health coverage for individuals, families, and corporate groups. Access to 5,000+ cashless network hospitals across India.',
    subcategories: ['Individual', 'Floater', 'Group Health'],
    benefits: ['Hospitalisation expenses', 'Pre & post hospitalisation', 'Day care treatments', 'Ambulance charges', '5,000+ cashless hospitals', 'Annual health check-up'],
    formType: 'health-group',
  },
  life: {
    name: 'Life Insurance',
    accentColour: '#9A7000',
    heroBg: '#2A1F00',
    heroOverlay: 'linear-gradient(135deg, rgba(154,112,0,0.92) 0%, rgba(15,31,61,0.88) 100%)',
    bgKeyword: 'family,protection',
    icon: 'ti-file-text',
    tagText: 'Life',
    description: "Secure your family's financial future with the right life cover. From term plans to ULIPs and endowment plans — we find what works for you.",
    subcategories: ['Term Insurance', 'ULIP', 'Endowment Plans', 'Money-Back Plans', 'Whole Life'],
    benefits: ['Death benefit cover', 'Maturity benefit', 'Tax benefits under 80C', 'Critical illness rider', 'Premium waiver option', 'Flexible premium terms'],
    formType: 'standard',
    categories: ['Term Insurance', 'ULIP', 'Endowment Plans', 'Money-Back Plans', 'Whole Life'],
  },
  travel: {
    name: 'Travel Insurance',
    accentColour: '#534AB7',
    heroBg: '#1A0D3D',
    heroOverlay: 'linear-gradient(135deg, rgba(83,74,183,0.92) 0%, rgba(15,31,61,0.88) 100%)',
    bgKeyword: 'travel,airport,airplane',
    icon: 'ti-plane',
    tagText: 'Travel',
    description: 'Travel worry-free with coverage for medical emergencies, trip cancellations, baggage loss, and passport issues — domestically and internationally.',
    subcategories: ['Business/Leisure', 'Corporate', 'Including USA & Canada', 'Excluding USA & Canada'],
    benefits: ['Medical emergency abroad', 'Trip cancellation cover', 'Baggage loss & delay', 'Passport loss cover', 'Flight delay compensation', 'Emergency evacuation'],
    formType: 'travel',
    categories: ['Business/Leisure', 'Corporate'],
  },
  agriculture: {
    name: 'Agriculture Insurance',
    accentColour: '#993C1D',
    heroBg: '#2A0F00',
    heroOverlay: 'linear-gradient(135deg, rgba(153,60,29,0.92) 0%, rgba(15,31,61,0.88) 100%)',
    bgKeyword: 'farm,agriculture,crop',
    icon: 'ti-leaf',
    tagText: 'Agriculture',
    description: 'Protect your farming investments against crop failure, natural disasters, and livestock loss with our comprehensive agriculture insurance plans.',
    subcategories: ['Crop Insurance', 'Cattle Insurance'],
    benefits: ['Crop failure protection', 'Natural disaster cover', 'Livestock protection', 'Weather-based coverage', 'Post-harvest loss cover', 'Government scheme support'],
    formType: 'standard',
    categories: ['Cattle', 'Crop'],
  },
  fire: {
    name: 'Fire Insurance',
    accentColour: '#cc2200',
    heroBg: '#2A0500',
    heroOverlay: 'linear-gradient(135deg, rgba(204,34,0,0.92) 0%, rgba(15,31,61,0.88) 100%)',
    bgKeyword: 'building,property,architecture',
    icon: 'ti-flame',
    tagText: 'Fire',
    description: 'Protect your property, premises, and assets against fire, explosion, and allied perils. Covers commercial establishments, godowns, offices, and residences.',
    subcategories: ['Commercial Property', 'Godown', 'Office Premises', 'Residence'],
    benefits: ['Fire & explosion cover', 'Lightning damage', 'Earthquake cover', 'Flood & inundation', 'Riot & strike damage', 'Impact damage cover'],
    formType: 'standard',
    categories: ['Commercial Property', 'Godown', 'Office Premises (Contents)', 'Residence'],
  },
  credit: {
    name: 'Credit Insurance',
    accentColour: '#185FA5',
    heroBg: '#001F3D',
    heroOverlay: 'linear-gradient(135deg, rgba(24,95,165,0.92) 0%, rgba(15,31,61,0.88) 100%)',
    bgKeyword: 'finance,banking,business',
    icon: 'ti-credit-card',
    tagText: 'Credit',
    description: 'Protect your business against the risk of non-payment by buyers and loan defaults. Secure your receivables and maintain healthy cash flow.',
    subcategories: ['Trade Credit', 'Loan Default'],
    benefits: ['Buyer insolvency cover', 'Protracted default cover', 'Political risk protection', 'Export credit protection', 'Domestic trade cover', 'Debt recovery support'],
    formType: 'standard',
    categories: ['Loan Default', 'Trade Credit'],
  },
  engineering: {
    name: 'Engineering Insurance',
    accentColour: '#854F0B',
    heroBg: '#2A1500',
    heroOverlay: 'linear-gradient(135deg, rgba(133,79,11,0.92) 0%, rgba(15,31,61,0.88) 100%)',
    bgKeyword: 'construction,engineering,machinery',
    icon: 'ti-tool',
    tagText: 'Engineering',
    description: "Comprehensive cover for construction projects, industrial machinery, and plants. From contractor's all-risk to erection all-risk and boiler insurance.",
    subcategories: ['Boiler & Pressure Plant', 'Contractor All Risk', 'Contractor Plant & Machinery', 'Erection All Risk'],
    benefits: ["Contractor's all-risk (CAR)", 'Erection all-risk (EAR)', 'Boiler & pressure vessel', 'Plant & machinery cover', 'Third-party liability', 'Project lifecycle protection'],
    formType: 'standard',
    categories: ['Boiler and Pressure Plant', 'Contractor All Risk', 'Contractor Plant and Machinery', 'Erection All Risk'],
  },
  liability: {
    name: 'Liability Insurance',
    accentColour: '#993556',
    heroBg: '#2A0015',
    heroOverlay: 'linear-gradient(135deg, rgba(153,53,86,0.92) 0%, rgba(15,31,61,0.88) 100%)',
    bgKeyword: 'legal,business,handshake',
    icon: 'ti-shield',
    tagText: 'Liability',
    description: 'Protect your business against third-party legal claims and financial liabilities. Covering cyber risks, directors & officers, and public liability.',
    subcategories: ['Cyber Liability', 'Directors & Officers', 'Employers Liability', 'Product Liability', 'Professional Indemnity', 'Public Liability', 'Workmen Compensation'],
    benefits: ['Third-party bodily injury', 'Property damage liability', 'Legal defence costs', 'Cyber breach cover', 'D&O protection', 'Employers liability'],
    formType: 'standard',
    categories: ['Cyber Liability', 'Directors and Officers', 'Employers Liability', 'Product Liability', 'Professional Indemnity', 'Public Liability', 'Workmen Compensation'],
  },
  marine: {
    name: 'Marine Insurance',
    accentColour: '#0F6E56',
    heroBg: '#002A1F',
    heroOverlay: 'linear-gradient(135deg, rgba(15,110,86,0.92) 0%, rgba(15,31,61,0.88) 100%)',
    bgKeyword: 'ship,ocean,cargo',
    icon: 'ti-anchor',
    tagText: 'Marine',
    description: 'Comprehensive coverage for cargo in transit, hull damage, and marine liability. Protecting your goods and vessels across domestic and international routes.',
    subcategories: ['Cargo', 'Hull', 'Marine Liability'],
    benefits: ['Cargo in transit cover', 'Hull & machinery damage', 'Marine liability', 'Piracy cover', 'General average', 'Survey & salvage costs'],
    formType: 'standard',
    categories: ['Cargo', 'Hull', 'Marine Liability'],
  },
  miscellaneous: {
    name: 'Miscellaneous Insurance',
    accentColour: '#636366',
    heroBg: '#1A1A1A',
    heroOverlay: 'linear-gradient(135deg, rgba(99,99,102,0.92) 0%, rgba(15,31,61,0.88) 100%)',
    bgKeyword: 'insurance,security',
    icon: 'ti-package',
    tagText: 'Miscellaneous',
    description: 'Niche insurance covers for unique needs — from pet insurance and wedding cover to burglary and fidelity guarantee. If it matters to you, we can cover it.',
    subcategories: ['Commercial', 'Burglary', 'Event', 'Fidelity Guarantee', 'Money Insurance', 'Other', 'Pet', 'Private Burglary', 'Wedding'],
    benefits: ['Burglary & theft cover', 'Event cancellation', 'Pet medical cover', 'Wedding cover', 'Fidelity guarantee', 'Money in transit'],
    formType: 'standard',
    categories: ['Commercial', 'Burglary', 'Event', 'Fidelity Guarantee', 'Money Insurance', 'Other', 'Pet', 'Private Burglary', 'Wedding'],
  },
  'personal-accident': {
    name: 'Personal Accident Insurance',
    accentColour: '#1247D6',
    heroBg: '#001040',
    heroOverlay: 'linear-gradient(135deg, rgba(18,71,214,0.92) 0%, rgba(15,31,61,0.88) 100%)',
    bgKeyword: 'safety,protection,person',
    icon: 'ti-user-check',
    tagText: 'Personal Accident',
    description: 'Financial protection against accidental death, disability, and injury. Available for individuals and groups — ensuring your family is protected no matter what.',
    subcategories: ['Individual', 'Group'],
    benefits: ['Accidental death benefit', 'Permanent disability cover', 'Temporary disability', 'Medical expense cover', 'Education benefit', 'Hospitalisation allowance'],
    formType: 'standard',
    categories: ['Individual', 'Group'],
  },
  surety: {
    name: 'Surety Insurance',
    accentColour: '#993C1D',
    heroBg: '#2A0F00',
    heroOverlay: 'linear-gradient(135deg, rgba(153,60,29,0.92) 0%, rgba(15,31,61,0.88) 100%)',
    bgKeyword: 'construction,contract,bond',
    icon: 'ti-lock',
    tagText: 'Surety',
    description: 'Guarantee bonds for contractors and businesses. Bid bonds and performance bonds that give your clients confidence in your ability to deliver.',
    subcategories: ['Bid Bond', 'Performance Bond'],
    benefits: ['Bid bond cover', 'Performance guarantee', 'Payment bond cover', 'Advance payment bond', 'Maintenance bond', 'Customs bond'],
    formType: 'standard',
    categories: ['Bid Bond', 'Performance Bond'],
  },
};

// ─── Form Field Helpers ───────────────────────────────────────────────────────

function FormField({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <label style={{ fontSize: 11, fontWeight: 600, color: '#3D4460', marginBottom: 5, display: 'block' }}>
        {label}{required && <span style={{ color: '#E53E3E', marginLeft: 2 }}>*</span>}
      </label>
      {children}
    </div>
  );
}

function FormInput({
  label,
  type = 'text',
  placeholder,
  required,
  accent,
  value,
  onChange,
  error,
  maxLength,
  inputMode,
}: {
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  accent: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  maxLength?: number;
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode'];
}) {
  const [focused, setFocused] = useState(false);
  return (
    <FormField label={label} required={required}>
      <input
        type={type}
        placeholder={placeholder}
        required={required}
        value={value}
        maxLength={maxLength}
        inputMode={inputMode}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          border: `1px solid ${error ? '#E53E3E' : focused ? accent : '#E2E8F0'}`,
          borderRadius: 8,
          padding: '9px 12px',
          fontSize: 13,
          width: '100%',
          color: '#0A0F1E',
          outline: 'none',
          background: 'white',
          boxSizing: 'border-box',
          transition: 'border-color 0.15s',
        }}
      />
      {error && <span style={{ fontSize: 10.5, color: '#E53E3E', marginTop: 3, display: 'block' }}>{error}</span>}
    </FormField>
  );
}

function FormSelect({
  label,
  required,
  accent,
  options,
  value,
  onChange,
  error,
}: {
  label: string;
  required?: boolean;
  accent: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <FormField label={label} required={required}>
      <select
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          border: `1px solid ${error ? '#E53E3E' : focused ? accent : '#E2E8F0'}`,
          borderRadius: 8,
          padding: '9px 12px',
          fontSize: 13,
          width: '100%',
          color: value ? '#0A0F1E' : '#64748B',
          outline: 'none',
          background: 'white',
          boxSizing: 'border-box',
          appearance: 'none',
          cursor: 'pointer',
          transition: 'border-color 0.15s',
        }}
      >
        <option value="">Select category</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      {error && <span style={{ fontSize: 10.5, color: '#E53E3E', marginTop: 3, display: 'block' }}>{error}</span>}
    </FormField>
  );
}

// ─── Calendar Date Picker ─────────────────────────────────────────────────────

const CAL_MONTHS_LONG  = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const CAL_MONTHS_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const CAL_DAYS         = ['Su','Mo','Tu','We','Th','Fr','Sa'];

// Cell size constants — every view uses the same grid math
const CAL_CELL = 34; // px — square cell size for day grid
const CAL_GAP  = 2;  // px — gap between cells
// Panel width = 7 cells + 6 gaps + 16px padding×2
const CAL_WIDTH = CAL_CELL * 7 + CAL_GAP * 6 + 32; // ≈ 286px

function DobPicker({
  value,
  onChange,
  error,
}: {
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  const today   = new Date();
  const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

  const parseValue = (v: string): Date | null => {
    if (!v) return null;
    const d = new Date(v + 'T00:00:00');
    return isNaN(d.getTime()) ? null : d;
  };

  const selected = parseValue(value);

  const [open, setOpen]         = useState(false);
  const [mode, setMode]         = useState<'day' | 'month' | 'year'>('day');
  const [viewYear, setViewYear]   = useState(() => selected?.getFullYear() ?? maxDate.getFullYear());
  const [viewMonth, setViewMonth] = useState(() => selected?.getMonth()    ?? maxDate.getMonth());

  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false); setMode('day');
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const selectDate = (date: Date) => {
    if (date > maxDate) return;
    onChange(`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`);
    setOpen(false); setMode('day');
  };

  const isSel = (d: Date) =>
    !!selected &&
    d.getFullYear() === selected.getFullYear() &&
    d.getMonth()    === selected.getMonth()    &&
    d.getDate()     === selected.getDate();

  // Build day-grid cells
  const firstWd    = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMo   = new Date(viewYear, viewMonth + 1, 0).getDate();
  const dayCells: (number | null)[] = [
    ...Array(firstWd).fill(null),
    ...Array.from({ length: daysInMo }, (_, i) => i + 1),
  ];

  // Year grid — 12 years aligned to nearest dozen
  const yearBase  = viewYear - (viewYear % 12);
  const yearCells = Array.from({ length: 12 }, (_, i) => yearBase + i);

  const goBack = () => {
    if (mode === 'day')   { if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); } else setViewMonth(m => m - 1); }
    if (mode === 'month') setViewYear(y => y - 1);
    if (mode === 'year')  setViewYear(y => y - 12);
  };
  const goFwd = () => {
    if (mode === 'day')   { if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); } else setViewMonth(m => m + 1); }
    if (mode === 'month') setViewYear(y => y + 1);
    if (mode === 'year')  setViewYear(y => y + 12);
  };

  const displayLabel = selected
    ? selected.toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })
    : 'Select date of birth';

  // Shared hover helpers (avoid re-creating on every render)
  const hoverOn  = (e: React.MouseEvent<HTMLButtonElement>) => { (e.currentTarget.style.background = '#EEF2FF'); };
  const hoverOff = (e: React.MouseEvent<HTMLButtonElement>) => { (e.currentTarget.style.background = 'transparent'); };
  const navHoverOn  = (e: React.MouseEvent<HTMLButtonElement>) => { (e.currentTarget.style.background = '#F0F4FF'); };
  const navHoverOff = (e: React.MouseEvent<HTMLButtonElement>) => { (e.currentTarget.style.background = 'none'); };

  return (
    <FormField label="Date of Birth" required>
      <div ref={wrapRef} style={{ position: 'relative' }}>

        {/* Trigger */}
        <button
          type="button"
          onClick={() => setOpen(p => !p)}
          style={{
            width: '100%', display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', gap: 8,
            padding: '9px 12px', fontSize: 13, textAlign: 'left',
            color: selected ? '#0A0F1E' : '#64748B',
            background: 'white',
            border: `1px solid ${error ? '#E53E3E' : open ? '#1247D6' : '#E2E8F0'}`,
            borderRadius: 8, outline: 'none', cursor: 'pointer',
            boxSizing: 'border-box', transition: 'border-color 0.15s',
          }}
        >
          <span>{displayLabel}</span>
          <i className="ti ti-calendar-event" style={{ fontSize: 15, color: '#64748B', flexShrink: 0 }} />
        </button>

        {/* Dropdown */}
        {open && (
          <div style={{
            position: 'absolute', top: 'calc(100% + 6px)', left: 0,
            width: CAL_WIDTH, zIndex: 300,
            background: 'white', borderRadius: 12,
            border: '1px solid #E8EBF5',
            boxShadow: '0 8px 28px rgba(10,15,30,0.13)',
            padding: 16,
            boxSizing: 'border-box',
          }}>

            {/* ── Header ── */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <button type="button" onClick={goBack}
                style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 600, color: '#3D4460', background: 'none', border: 'none', borderRadius: 6, cursor: 'pointer', transition: 'background 0.12s' }}
                onMouseEnter={navHoverOn} onMouseLeave={navHoverOff}
              >‹</button>

              <button type="button"
                onClick={() => setMode(m => m === 'day' ? 'month' : m === 'month' ? 'year' : 'day')}
                style={{ fontSize: 13, fontWeight: 700, color: '#0A0F1E', background: 'none', border: 'none', cursor: 'pointer', padding: '3px 10px', borderRadius: 6, transition: 'background 0.12s' }}
                onMouseEnter={navHoverOn} onMouseLeave={navHoverOff}
              >
                {mode === 'day'   ? `${CAL_MONTHS_LONG[viewMonth]} ${viewYear}` :
                 mode === 'month' ? String(viewYear) :
                 `${yearBase} – ${yearBase + 11}`}
              </button>

              <button type="button" onClick={goFwd}
                style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 600, color: '#3D4460', background: 'none', border: 'none', borderRadius: 6, cursor: 'pointer', transition: 'background 0.12s' }}
                onMouseEnter={navHoverOn} onMouseLeave={navHoverOff}
              >›</button>
            </div>

            {/* ── Day view ── */}
            {mode === 'day' && (
              <>
                {/* Weekday headers */}
                <div style={{ display: 'grid', gridTemplateColumns: `repeat(7, ${CAL_CELL}px)`, gap: CAL_GAP, marginBottom: 4 }}>
                  {CAL_DAYS.map(d => (
                    <div key={d} style={{ width: CAL_CELL, textAlign: 'center', fontSize: 10, fontWeight: 700, color: '#64748B', padding: '3px 0', letterSpacing: '0.05em' }}>{d}</div>
                  ))}
                </div>
                {/* Date cells */}
                <div style={{ display: 'grid', gridTemplateColumns: `repeat(7, ${CAL_CELL}px)`, gap: CAL_GAP }}>
                  {dayCells.map((day, i) => {
                    if (!day) return <div key={`e${i}`} style={{ width: CAL_CELL, height: CAL_CELL }} />;
                    const date = new Date(viewYear, viewMonth, day);
                    const sel  = isSel(date);
                    const dis  = date > maxDate;
                    return (
                      <button key={i} type="button" disabled={dis} onClick={() => selectDate(date)}
                        style={{
                          width: CAL_CELL, height: CAL_CELL, fontSize: 12, fontWeight: sel ? 700 : 400,
                          borderRadius: '50%', border: 'none',
                          background: sel ? '#1247D6' : 'transparent',
                          color: dis ? '#CBD5E0' : sel ? 'white' : '#0A0F1E',
                          cursor: dis ? 'default' : 'pointer', transition: 'background 0.1s',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}
                        onMouseEnter={e => { if (!dis && !sel) hoverOn(e); }}
                        onMouseLeave={e => { if (!dis && !sel) hoverOff(e); }}
                      >{day}</button>
                    );
                  })}
                </div>
              </>
            )}

            {/* ── Month view ── */}
            {mode === 'month' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6, marginTop: 4 }}>
                {CAL_MONTHS_SHORT.map((m, i) => {
                  const active = selected?.getFullYear() === viewYear && selected?.getMonth() === i;
                  return (
                    <button key={m} type="button"
                      onClick={() => { setViewMonth(i); setMode('day'); }}
                      style={{
                        height: 40, fontSize: 12, fontWeight: active ? 700 : 400,
                        borderRadius: 8, border: 'none',
                        background: active ? '#1247D6' : 'transparent',
                        color: active ? 'white' : '#0A0F1E',
                        cursor: 'pointer', transition: 'background 0.1s',
                      }}
                      onMouseEnter={e => { if (!active) hoverOn(e); }}
                      onMouseLeave={e => { if (!active) hoverOff(e); }}
                    >{m}</button>
                  );
                })}
              </div>
            )}

            {/* ── Year view ── */}
            {mode === 'year' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6, marginTop: 4 }}>
                {yearCells.map(y => {
                  const active = selected?.getFullYear() === y;
                  const dis    = y > maxDate.getFullYear();
                  return (
                    <button key={y} type="button" disabled={dis}
                      onClick={() => { if (!dis) { setViewYear(y); setMode('month'); } }}
                      style={{
                        height: 40, fontSize: 12, fontWeight: active ? 700 : 400,
                        borderRadius: 8, border: 'none',
                        background: active ? '#1247D6' : 'transparent',
                        color: dis ? '#CBD5E0' : active ? 'white' : '#0A0F1E',
                        cursor: dis ? 'default' : 'pointer', transition: 'background 0.1s',
                      }}
                      onMouseEnter={e => { if (!dis && !active) hoverOn(e); }}
                      onMouseLeave={e => { if (!dis && !active) hoverOff(e); }}
                    >{y}</button>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {error && <span style={{ fontSize: 10.5, color: '#E53E3E', marginTop: 3, display: 'block' }}>{error}</span>}
    </FormField>
  );
}

// ─── Quote Form ───────────────────────────────────────────────────────────────

const STANDARD_SLUG_TO_API_TYPE: Record<string, string> = {
  life: "Life",
  agriculture: "Agriculture",
  fire: "Fire",
  credit: "Credit",
  engineering: "Engineering",
  liability: "Liability",
  marine: "Marine",
  miscellaneous: "Miscellaneous",
  "personal-accident": "Personal Accident",
  surety: "Surety",
};

function QuoteForm({ config, slug }: { config: ProductConfig; slug: string }) {
  const router = useRouter();
  const accent = config.accentColour;

  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [pincode, setPincode] = useState('');
  const [category, setCategory] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [policyFile, setPolicyFile] = useState<File | null>(null);
  const [uploadedFileData, setUploadedFileData] = useState<{
    fileData: string; fileName: string; mimeType: string;
  } | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [dob, setDob] = useState('');
  const [ped, setPed] = useState<'yes' | 'no' | ''>('');
  const [companyName, setCompanyName] = useState('');
  const [numEmployees, setNumEmployees] = useState('');
  const [travelType, setTravelType] = useState('');
  const [numAdults, setNumAdults] = useState('');
  const [numChildren, setNumChildren] = useState('');
  const [diseaseType, setDiseaseType] = useState('');
  const [remarks, setRemarks] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const fileInputRef = useRef<HTMLInputElement>(null);

  const clearErr = (key: string) =>
    setFieldErrors((prev) => { const next = { ...prev }; delete next[key]; return next; });

  const resetForm = () => {
    setName(''); setMobile(''); setEmail(''); setPincode('');
    setCategory(''); setVehicleNumber('');
    setPolicyFile(null); setUploadedFileData(null); setFileError(null);
    setDob(''); setPed('');
    setCompanyName(''); setNumEmployees('');
    setTravelType('');
    setNumAdults(''); setNumChildren('');
    setDiseaseType(''); setRemarks('');
    setFieldErrors({}); setError(null);
    setSubmitted(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const isHealthSlug = slug === 'health-individual' || slug === 'health-floater' || slug === 'health-group';

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (config.formType === 'health-group') {
      if (companyName.trim().length < 2) errs.companyName = 'Company name must be at least 2 characters';
    } else {
      const n = name.trim();
      if (n.length < 2) errs.name = 'Minimum 2 characters required';
      else if (!/^[a-zA-Z\s]+$/.test(n)) errs.name = 'Only letters and spaces allowed';
    }

    if (!/^[6-9]\d{9}$/.test(mobile.trim())) errs.mobile = 'Enter a valid 10-digit mobile number (starts with 6–9)';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) errs.email = 'Enter a valid email address';
    if (!/^[1-9]\d{5}$/.test(pincode.trim())) errs.pincode = 'Enter a valid 6-digit pincode';

    if (config.formType === 'motor') {
      if (!category) errs.category = 'Please select a vehicle category';
      const vn = vehicleNumber.trim();
      if (!vn) errs.vehicleNumber = 'Vehicle number is required';
      else if (!/^[A-Za-z0-9\s]+$/.test(vn)) errs.vehicleNumber = 'Only alphanumeric characters allowed';
    } else if (config.formType === 'health-individual') {
      if (!dob) {
        errs.dob = 'Date of birth is required';
      } else {
        const dobDate = new Date(dob);
        if (isNaN(dobDate.getTime())) {
          errs.dob = 'Enter a valid date';
        } else {
          const today = new Date();
          let age = today.getFullYear() - dobDate.getFullYear();
          const m = today.getMonth() - dobDate.getMonth();
          if (m < 0 || (m === 0 && today.getDate() < dobDate.getDate())) age--;
          if (age < 18) errs.dob = 'Must be at least 18 years old';
        }
      }
      if (!ped) errs.ped = 'Please select Yes or No';
      if (ped === 'yes' && !diseaseType.trim()) errs.diseaseType = 'Please describe your pre-existing condition';
    } else if (config.formType === 'health-floater') {
      const a = Number(numAdults);
      if (!numAdults || !Number.isInteger(a) || a < 1 || a > 10) errs.numAdults = 'Enter a valid number of adults (1–10)';
    } else if (config.formType === 'health-group') {
      const n = Number(numEmployees);
      if (!numEmployees || !Number.isInteger(n) || n <= 0) errs.numEmployees = 'Enter a valid number of employees';
    } else if (config.formType === 'travel') {
      if (!category) errs.category = 'Please select a travel category';
      if (!travelType) errs.travelType = 'Please select a travel type';
    } else if (config.formType === 'standard') {
      if (!category) errs.category = 'Please select a category';
    }

    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setError(null);
    try {
      const apiFormType =
        config.formType === 'standard'
          ? (STANDARD_SLUG_TO_API_TYPE[slug] ?? slug)
          : config.formType;

      const payload: Record<string, unknown> = { mobile, email, pincode };
      if (remarks.trim()) payload.remarks = remarks.trim();

      if (config.formType === 'health-group') {
        payload.companyName = companyName;
        payload.numberOfEmployees = numEmployees;
      } else {
        payload.name = name;
        if (config.formType === 'motor') {
          payload.category = category;
          payload.vehicleNumber = vehicleNumber;
          payload.policyFile = uploadedFileData ?? null;
        } else if (config.formType === 'health-individual') {
          payload.dob = dob;
          payload.preExistingDisease = ped;
          if (ped === 'yes') payload.diseaseType = diseaseType;
        } else if (config.formType === 'health-floater') {
          payload.numberOfAdults = numAdults;
          payload.numberOfChildren = numChildren || '0';
        } else if (config.formType === 'travel') {
          payload.category = category;
          payload.travelType =
            travelType === 'Including USA & Canada'
              ? 'including-usa-canada'
              : 'excluding-usa-canada';
        } else {
          payload.category = category;
        }
      }

      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formType: apiFormType, payload, website: '' }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        if (res.status === 422 && Array.isArray(data?.errors) && data.errors.length > 0) {
          const mapped: Record<string, string> = {};
          for (const e of data.errors as string[]) {
            const colon = e.indexOf(':');
            if (colon > -1) mapped[e.slice(0, colon).trim()] = e.slice(colon + 1).trim();
          }
          if (Object.keys(mapped).length > 0) {
            setFieldErrors(mapped);
            return;
          }
        }
        throw new Error(data?.message || 'Submission failed. Please try again.');
      }
      setSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div style={{ textAlign: 'center', padding: '32px 16px' }}>
        <i className="ti ti-circle-check" style={{ fontSize: 40, color: '#38A169', display: 'block', marginBottom: 12 }} />
        <div style={{ fontSize: 16, fontWeight: 700, color: '#0A0F1E', marginBottom: 6 }}>Enquiry Submitted!</div>
        <div style={{ fontSize: 13, color: '#64748B', marginBottom: 20 }}>We'll call you back within 60 minutes.</div>
        <button
          onClick={resetForm}
          style={{ fontSize: 12, color: accent, background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
        >
          Submit another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* Health tab switcher */}
      {isHealthSlug && (
        <div style={{ display: 'flex', background: '#f1f3f6', borderRadius: 10, padding: 4, marginBottom: 16 }}>
          {[
            { label: 'Individual', href: '/products/health-individual' },
            { label: 'Floater', href: '/products/health-floater' },
            { label: 'Group', href: '/products/health-group' },
          ].map((tab) => {
            const isActive =
              (tab.label === 'Individual' && slug === 'health-individual') ||
              (tab.label === 'Floater' && slug === 'health-floater') ||
              (tab.label === 'Group' && slug === 'health-group');
            return (
              <button
                key={tab.label}
                type="button"
                onClick={() => router.push(tab.href)}
                style={{
                  flex: 1,
                  padding: '8px 0',
                  textAlign: 'center',
                  fontSize: 12,
                  borderRadius: 7,
                  cursor: 'pointer',
                  border: isActive ? '1px solid #E8EBF5' : '1px solid transparent',
                  background: isActive ? 'white' : 'transparent',
                  color: isActive ? '#1247D6' : '#64748B',
                  fontWeight: isActive ? 600 : 400,
                  transition: 'all 0.15s',
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      )}

      {/* Form heading */}
      <div style={{ marginBottom: 4 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#0A0F1E' }}>Get a free quote</div>
        <div style={{ fontSize: 11.5, color: '#64748B', marginTop: 2 }}>Our advisor calls within 60 min.</div>
      </div>

      {/* Base fields — 2-col grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-[10px]">
        {config.formType === 'health-group' ? (
          <FormInput label="Company Name" required accent={accent} value={companyName}
            onChange={(v) => { setCompanyName(v); clearErr('companyName'); }}
            placeholder="Company name" error={fieldErrors.companyName} />
        ) : (
          <FormInput label="Full Name" required accent={accent} value={name}
            onChange={(v) => { setName(v); clearErr('name'); }}
            placeholder="Your full name" error={fieldErrors.name} />
        )}
        <FormInput label="Mobile" type="tel" required accent={accent} value={mobile}
          onChange={(v) => { setMobile(v.replace(/\D/g, '').slice(0, 10)); clearErr('mobile'); }}
          placeholder="10-digit number" error={fieldErrors.mobile}
          maxLength={10} inputMode="numeric" />
        <FormInput label="Email" type="email" required accent={accent} value={email}
          onChange={(v) => { setEmail(v); clearErr('email'); }}
          placeholder="you@email.com" error={fieldErrors.email}
          maxLength={100} />
        <FormInput label="Pincode" required accent={accent} value={pincode}
          onChange={(v) => { setPincode(v.replace(/\D/g, '').slice(0, 6)); clearErr('pincode'); }}
          placeholder="6-digit pincode" error={fieldErrors.pincode}
          maxLength={6} inputMode="numeric" />
      </div>

      {/* Motor extra fields */}
      {config.formType === 'motor' && (
        <>
          <FormSelect label="Vehicle Category" required accent={accent} options={config.categories || []} value={category}
            onChange={(v) => { setCategory(v); clearErr('category'); }}
            error={fieldErrors.category} />
          <FormInput label="Vehicle Number" required accent={accent} value={vehicleNumber}
            onChange={(v) => { setVehicleNumber(v); clearErr('vehicleNumber'); }}
            placeholder="e.g. MH12AB1234" error={fieldErrors.vehicleNumber} />
          <FormField label="Previous Insurance Policy (Optional)">
            <div
              onClick={() => fileInputRef.current?.click()}
              style={{
                border: '1px dashed #CBD5E0',
                borderRadius: 8,
                padding: 12,
                textAlign: 'center',
                fontSize: 11.5,
                color: '#64748B',
                cursor: 'pointer',
                background: 'white',
              }}
            >
              {policyFile ? (
                <span style={{ color: '#0A0F1E' }}>{policyFile.name}</span>
              ) : (
                <>
                  <i className="ti ti-upload" style={{ marginRight: 6 }} />
                  Click to upload PDF or image (max 5MB)
                </>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,.webp"
              style={{ display: 'none' }}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                setFileError(null);
                const allowed = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'];
                if (!allowed.includes(file.type)) {
                  setFileError('Only PDF, JPG, PNG, or WEBP files are accepted.');
                  if (fileInputRef.current) fileInputRef.current.value = '';
                  return;
                }
                if (file.size > 5 * 1024 * 1024) {
                  setFileError('File must be under 5 MB.');
                  if (fileInputRef.current) fileInputRef.current.value = '';
                  return;
                }
                setPolicyFile(file);
                const reader = new FileReader();
                reader.onload = (ev) => {
                  const base64 = (ev.target?.result as string).split(',')[1] ?? '';
                  setUploadedFileData({ fileData: base64, fileName: file.name, mimeType: file.type });
                };
                reader.readAsDataURL(file);
              }}
            />
            {fileError && (
              <span style={{ fontSize: 10.5, color: '#E53E3E', marginTop: 3, display: 'block' }}>{fileError}</span>
            )}
          </FormField>
        </>
      )}

      {/* Health Individual extra fields */}
      {config.formType === 'health-individual' && (
        <>
          <DobPicker
            value={dob}
            onChange={(v) => { setDob(v); clearErr('dob'); }}
            error={fieldErrors.dob}
          />
          <FormField label="Pre-existing Disease" required>
            <div style={{ display: 'flex', gap: 8 }}>
              {(['Yes', 'No'] as const).map((opt) => {
                const val = opt.toLowerCase() as 'yes' | 'no';
                const active = ped === val;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => { setPed(val); clearErr('ped'); }}
                    style={{
                      flex: 1,
                      padding: '8px 0',
                      fontSize: 12,
                      fontWeight: active ? 600 : 400,
                      borderRadius: 8,
                      border: `1px solid ${fieldErrors.ped ? '#E53E3E' : active ? accent : '#E2E8F0'}`,
                      background: active ? accent : 'white',
                      color: active ? 'white' : '#3D4460',
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                    }}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
            {fieldErrors.ped && <span style={{ fontSize: 10.5, color: '#E53E3E', marginTop: 3, display: 'block' }}>{fieldErrors.ped}</span>}
          </FormField>
          {ped === 'yes' && (
            <FormInput
              label="Type of Pre-existing Disease"
              required
              accent={accent}
              value={diseaseType}
              onChange={(v) => { setDiseaseType(v); clearErr('diseaseType'); }}
              placeholder="e.g. Diabetes, Hypertension, Asthma"
              error={fieldErrors.diseaseType}
              maxLength={200}
            />
          )}
        </>
      )}

      {/* Health Floater extra fields */}
      {config.formType === 'health-floater' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[10px]">
          <FormInput
            label="Number of Adults"
            required
            accent={accent}
            value={numAdults}
            onChange={(v) => { setNumAdults(v.replace(/\D/g, '').slice(0, 2)); clearErr('numAdults'); }}
            placeholder="e.g. 2"
            error={fieldErrors.numAdults}
            inputMode="numeric"
            maxLength={2}
          />
          <FormInput
            label="Number of Children"
            accent={accent}
            value={numChildren}
            onChange={(v) => setNumChildren(v.replace(/\D/g, '').slice(0, 2))}
            placeholder="e.g. 1 (optional)"
            inputMode="numeric"
            maxLength={2}
          />
        </div>
      )}

      {/* Health Group extra fields */}
      {config.formType === 'health-group' && (
        <FormInput label="Number of Employees" required accent={accent} value={numEmployees}
          onChange={(v) => { setNumEmployees(v); clearErr('numEmployees'); }}
          placeholder="e.g. 50" error={fieldErrors.numEmployees} />
      )}

      {/* Travel extra fields */}
      {config.formType === 'travel' && (
        <>
          <FormSelect label="Category" required accent={accent} options={config.categories || []} value={category}
            onChange={(v) => { setCategory(v); clearErr('category'); }}
            error={fieldErrors.category} />
          <FormField label="Travel Type" required>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {['Including USA & Canada', 'Excluding USA & Canada'].map((opt) => {
                const active = travelType === opt;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => { setTravelType(opt); clearErr('travelType'); }}
                    style={{
                      border: `1px solid ${fieldErrors.travelType ? '#E53E3E' : active ? accent : '#E2E8F0'}`,
                      borderRadius: 8,
                      padding: '10px 12px',
                      fontSize: 11.5,
                      textAlign: 'center',
                      cursor: 'pointer',
                      background: active ? `${accent}0F` : 'white',
                      color: active ? accent : '#3D4460',
                      fontWeight: active ? 600 : 400,
                      transition: 'all 0.15s',
                    }}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
            {fieldErrors.travelType && <span style={{ fontSize: 10.5, color: '#E53E3E', marginTop: 3, display: 'block' }}>{fieldErrors.travelType}</span>}
          </FormField>
        </>
      )}

      {/* Standard extra fields */}
      {config.formType === 'standard' && (
        <FormSelect label="Category" required accent={accent} options={config.categories || []} value={category}
          onChange={(v) => { setCategory(v); clearErr('category'); }}
          error={fieldErrors.category} />
      )}

      {/* Remarks — optional for all forms */}
      <FormField label="Remarks (Optional)">
        <textarea
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          placeholder="Any specific requirements or additional information..."
          maxLength={500}
          rows={3}
          style={{
            border: '1px solid #E2E8F0',
            borderRadius: 8,
            padding: '9px 12px',
            fontSize: 13,
            width: '100%',
            color: '#0A0F1E',
            outline: 'none',
            background: 'white',
            boxSizing: 'border-box',
            resize: 'vertical',
            fontFamily: 'inherit',
            transition: 'border-color 0.15s',
          }}
          onFocus={(e) => (e.target.style.borderColor = accent)}
          onBlur={(e) => (e.target.style.borderColor = '#E2E8F0')}
        />
      </FormField>

      {/* Error */}
      {error && (
        <div style={{ fontSize: 12, color: '#E53E3E', background: '#FFF5F5', border: '1px solid #FED7D7', borderRadius: 8, padding: '8px 12px' }}>
          {error}
        </div>
      )}

      {/* Submit button */}
      <button
        type="submit"
        disabled={submitting}
        style={{
          background: accent,
          color: 'white',
          border: 'none',
          borderRadius: 10,
          padding: '12px 0',
          fontSize: 13.5,
          fontWeight: 700,
          cursor: submitting ? 'not-allowed' : 'pointer',
          opacity: submitting ? 0.75 : 1,
          transition: 'opacity 0.15s',
          marginTop: 4,
        }}
      >
        {submitting ? 'Submitting…' : 'Get Free Quote →'}
      </button>

      <p style={{ fontSize: 10.5, color: '#64748B', textAlign: 'center', marginTop: 2 }}>
        No spam. Our advisor calls once. No hidden charges.
      </p>
    </form>
  );
}

// ─── Page Sections ─────────────────────────────────────────────────────────────

function HeroSection({ config, slug }: { config: ProductConfig; slug: string }) {
  const accent = config.accentColour;
  return (
    <section style={{
      background: 'transparent',
      position: 'relative',
      overflow: 'hidden',
      minHeight: 420,
      paddingTop: 96,
      paddingBottom: 48,
    }}>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 items-center max-w-[1200px] mx-auto px-5 lg:px-20 py-12" style={{ position: 'relative', zIndex: 2 }}>
        {/* LEFT */}
        <div>
          {/* Breadcrumb */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 20 }}>
            <a href="/products" style={{ fontSize: 12, color: '#64748B', textDecoration: 'none', fontWeight: 500 }}>Products</a>
            <span style={{ color: '#64748B', fontSize: 12 }}>/</span>
            <span style={{ fontSize: 12, color: '#64748B', fontWeight: 500 }}>{config.name}</span>
          </nav>

          {/* Tag/badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#EEF3FF', border: '1px solid #C7D7FA', borderRadius: 50, padding: '4px 12px', marginBottom: 16 }}>
            <i className={`ti ${config.icon}`} style={{ fontSize: 13, color: '#1247D6' }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: '#1247D6', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{config.tagText}</span>
          </div>

          {/* Headline */}
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 900, color: '#0A0F1E', lineHeight: 1.1, marginBottom: 16, margin: '0 0 16px' }}>
            {config.name}
          </h1>

          {/* Description */}
          <p style={{ fontSize: 15, color: '#6B7280', lineHeight: 1.65, marginBottom: 24, maxWidth: 480 }}>
            {config.description}
          </p>

          {/* Subcategory pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {config.subcategories.map((sub) => (
              <span
                key={sub}
                style={{
                  fontSize: 11.5,
                  color: '#3D4460',
                  background: '#F3F4F6',
                  border: '1px solid #E5E7EB',
                  borderRadius: 50,
                  padding: '4px 12px',
                  fontWeight: 500,
                }}
              >
                {sub}
              </span>
            ))}
          </div>
        </div>

        {/* RIGHT — form card (glassmorphism) */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.82)',
          backdropFilter: 'blur(24px) saturate(160%)',
          WebkitBackdropFilter: 'blur(24px) saturate(160%)',
          borderRadius: 20,
          padding: 24,
          border: '1px solid rgba(255, 255, 255, 0.60)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.22), 0 2px 8px rgba(0, 0, 0, 0.10), inset 0 1px 0 rgba(255, 255, 255, 0.95)',
        }}>
          <QuoteForm key={slug} config={config} slug={slug} />
        </div>
      </div>
    </section>
  );
}

function InfoCardsRow({ config }: { config: ProductConfig }) {
  const accent = config.accentColour;

  const cardBase: React.CSSProperties = {
    background: '#FAFBFF',
    border: '1px solid #E8EBF5',
    borderRadius: 14,
    padding: 20,
  };

  return (
    <section style={{ background: 'transparent' }} className="px-5 lg:px-20 py-7">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-[1200px] mx-auto">
        {/* Card 1 — What's covered */}
        <div style={cardBase}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 14 }}>
            <i className="ti ti-list-check" style={{ fontSize: 16, color: accent }} />
            <span style={{ fontSize: 13, fontWeight: 700, color: '#0A0F1E' }}>What's covered</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {config.benefits.map((b) => (
              <div key={b} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                <i className="ti ti-check" style={{ fontSize: 13, color: accent, marginTop: 1, flexShrink: 0 }} />
                <span style={{ fontSize: 12.5, color: '#3D4460', lineHeight: 1.5 }}>{b}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Card 2 — How it works */}
        <div style={cardBase}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 14 }}>
            <i className="ti ti-route" style={{ fontSize: 16, color: accent }} />
            <span style={{ fontSize: 13, fontWeight: 700, color: '#0A0F1E' }}>How it works</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              'Fill the short enquiry form above',
              'Our advisor calls you within 60 minutes',
              'Get a tailored quote — no obligations',
              'Policy issued and documents emailed',
            ].map((step, i) => (
              <div key={step} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <div style={{
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  background: accent,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 11,
                  fontWeight: 700,
                  color: 'white',
                  flexShrink: 0,
                }}>
                  {i + 1}
                </div>
                <span style={{ fontSize: 12.5, color: '#3D4460', lineHeight: 1.5, paddingTop: 3 }}>{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Card 3 — Need help choosing? */}
        <div style={cardBase}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 14 }}>
            <i className="ti ti-brand-whatsapp" style={{ fontSize: 16, color: accent }} />
            <span style={{ fontSize: 13, fontWeight: 700, color: '#0A0F1E' }}>Need help choosing?</span>
          </div>
          <p style={{ fontSize: 12, color: '#64748B', lineHeight: 1.6, marginBottom: 16 }}>
            Not sure which plan covers you best? Our advisors compare all options and recommend the right fit — no pressure, no scripts.
          </p>
          <button
            onClick={() => window.open(`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`)}
            style={{
              background: '#25D366',
              color: 'white',
              border: 'none',
              borderRadius: 10,
              padding: 11,
              fontSize: 12.5,
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 7,
              cursor: 'pointer',
              width: '100%',
            }}
          >
            <i className="ti ti-brand-whatsapp" style={{ fontSize: 16 }} />
            Chat on WhatsApp
          </button>
        </div>
      </div>
    </section>
  );
}

function TrustBar({ accent }: { accent: string }) {
  const items = [
    { icon: 'ti-shield-check', label: 'IRDAI Registered' },
    { icon: 'ti-lock', label: '256-bit Encrypted' },
    { icon: 'ti-clock', label: '24/7 Support' },
    { icon: 'ti-receipt', label: 'No Hidden Fees' },
  ];
  return (
    <div
      style={{
        background: 'transparent',
        borderTop: '1px solid #E8EBF5',
        padding: '16px 80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 48,
        flexWrap: 'wrap',
      }}
    >
      {items.map(({ icon, label }) => (
        <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <i className={`ti ${icon}`} style={{ fontSize: 15, color: accent }} />
          <span style={{ fontSize: 12, color: '#3D4460', fontWeight: 500 }}>{label}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Default Export ───────────────────────────────────────────────────────────

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  const config = PRODUCT_CONFIG[slug];

  useEffect(() => {
    if (slug && !PRODUCT_CONFIG[slug]) {
      router.push('/products');
    }
  }, [slug, router]);

  if (!config) return null;

  return (
    <>
      <Navbar />
      <main>
        <BubbleBackground>
          <HeroSection config={config} slug={slug} />
          <InfoCardsRow config={config} />
          <TrustBar accent={config.accentColour} />
        </BubbleBackground>
      </main>
      <Footer />
    </>
  );
}
