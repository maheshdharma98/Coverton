import { STANDARD_CATEGORIES } from "@/lib/validations/standard";

export interface ProductInfo {
  slug: string;
  name: string;
  tagline: string;
  color: string;
  shortDesc: string;
  description: string;
  benefits: readonly string[];
  formType: "motor" | "health" | "travel" | "standard";
}

export const PRODUCTS_DATA: Record<string, ProductInfo> = {
  motor: {
    slug: "motor",
    name: "Motor Insurance",
    tagline: "Drive with total confidence",
    color: "#1247D6",
    shortDesc: "Comprehensive cover for cars, bikes, and commercial vehicles.",
    description:
      "Whether it's your car, bike, or commercial fleet, our motor insurance protects you against damage, theft, natural calamities, and third-party liability. We make claims simple — no endless paperwork, no surprise deductions.",
    benefits: [
      "Own damage & third-party liability covered",
      "24/7 roadside assistance across India",
      "Cashless repairs at 5,000+ network garages",
      "Zero depreciation add-on available",
      "NCB (no-claim bonus) protection",
    ],
    formType: "motor",
  },
  health: {
    slug: "health",
    name: "Health Insurance",
    tagline: "Because your health is everything",
    color: "#0D9488",
    shortDesc: "Individual, family floater, and group health cover under one roof.",
    description:
      "Comprehensive health cover for individuals, families, and corporate teams. Get protected against hospitalisation costs, surgeries, pre-existing conditions (after waiting period), and OPD expenses — all at one place.",
    benefits: [
      "Cashless treatment at 7,000+ hospitals",
      "No co-payment for in-network hospitals",
      "Pre-existing disease cover after waiting period",
      "Annual health check-up included",
      "Day-care & OPD procedures covered",
    ],
    formType: "health",
  },
  travel: {
    slug: "travel",
    name: "Travel Insurance",
    tagline: "Explore the world without worry",
    color: "#0284C7",
    shortDesc: "Medical, trip cancellation, and baggage cover for every journey.",
    description:
      "From business trips to family holidays, our travel insurance covers medical emergencies abroad, trip cancellations, lost baggage, flight delays, and passport loss — with worldwide 24/7 assistance.",
    benefits: [
      "Medical cover up to ₹50 lakhs overseas",
      "Trip cancellation & curtailment cover",
      "Lost passport & baggage protection",
      "24/7 emergency assistance helpline",
      "Available for USA & Canada travel",
    ],
    formType: "travel",
  },
  life: {
    slug: "life",
    name: "Life Insurance",
    tagline: "Secure your family's financial future",
    color: "#7C3AED",
    shortDesc: "Term, ULIP, Endowment, and Whole Life plans for every stage.",
    description:
      "Life insurance ensures your loved ones are financially protected no matter what. Choose from Term Insurance, ULIP, Endowment, Money-Back, or Whole Life plans — all designed to give you peace of mind and tax benefits.",
    benefits: [
      "High sum assured at affordable premiums",
      "Tax benefits under Sec 80C & 10(10D)",
      "Critical illness rider available",
      "Guaranteed death benefit payout",
      "Flexible premium payment options",
    ],
    formType: "standard",
  },
  agriculture: {
    slug: "agriculture",
    name: "Agriculture Insurance",
    tagline: "Protect your harvest and livestock",
    color: "#15803D",
    shortDesc: "Crop and cattle insurance for India's farming community.",
    description:
      "Designed for Indian farmers, our agriculture insurance covers crop damage from natural calamities — floods, droughts, hail — and livestock loss. We help you recover and replant without financial stress.",
    benefits: [
      "Crop damage from flood, drought & hail",
      "Cattle & livestock mortality coverage",
      "Aligned with government schemes",
      "Quick field survey and settlement",
      "Covers small and marginal farmers",
    ],
    formType: "standard",
  },
  fire: {
    slug: "fire",
    name: "Fire Insurance",
    tagline: "Protect your property and assets",
    color: "#DC2626",
    shortDesc: "Cover for commercial premises, godowns, and residences.",
    description:
      "Covers your property against fire, lightning, explosion, and allied perils. Available for commercial establishments, godowns, office premises, and residences — with add-ons for earthquake and flood damage.",
    benefits: [
      "Covers fire, lightning & explosion",
      "Earthquake & flood add-ons available",
      "Machinery breakdown cover option",
      "Loss of rent protection",
      "Reinstatement value settlement",
    ],
    formType: "standard",
  },
  credit: {
    slug: "credit",
    name: "Credit Insurance",
    tagline: "Protect against payment defaults",
    color: "#B45309",
    shortDesc: "Trade credit and loan default protection for businesses.",
    description:
      "Credit insurance protects your business from the financial impact of non-payment by buyers. Whether it's domestic trade credit or loan defaults, we keep your cash flow intact and your balance sheet healthy.",
    benefits: [
      "Protection from buyer insolvency & default",
      "Covers domestic & export trade receivables",
      "Loan default protection",
      "Reduces bad debt exposure significantly",
      "Improves credit risk management",
    ],
    formType: "standard",
  },
  engineering: {
    slug: "engineering",
    name: "Engineering Insurance",
    tagline: "Shield your projects and plant",
    color: "#78350F",
    shortDesc: "Contractor all-risk, erection all-risk, and plant cover.",
    description:
      "Comprehensive cover for construction projects, industrial machinery, and plants. From contractor's all-risk to erection all-risk and boiler insurance — we protect your engineering investments throughout the project lifecycle.",
    benefits: [
      "Contractor's all-risk (CAR) coverage",
      "Erection all-risk (EAR) for installations",
      "Boiler & pressure vessel protection",
      "Contractor plant & machinery cover",
      "Third-party liability included",
    ],
    formType: "standard",
  },
  liability: {
    slug: "liability",
    name: "Liability Insurance",
    tagline: "Protect your business from legal exposure",
    color: "#4338CA",
    shortDesc: "Cyber, D&O, professional indemnity, and public liability cover.",
    description:
      "Liability insurance shields businesses, directors, and professionals against legal claims and compensation demands. From cyber breaches to workmen's compensation — we cover the exposures that keep business owners up at night.",
    benefits: [
      "Cyber liability & data breach coverage",
      "Directors & officers (D&O) liability",
      "Professional indemnity protection",
      "Workmen's compensation (WC) cover",
      "Product & public liability available",
    ],
    formType: "standard",
  },
  marine: {
    slug: "marine",
    name: "Marine Insurance",
    tagline: "Safeguard your cargo at sea and beyond",
    color: "#0369A1",
    shortDesc: "Cargo, hull, and marine liability for import and export shipments.",
    description:
      "Our marine insurance protects goods in transit by sea, air, or road — against damage, piracy, theft, and accidents. Available for import/export cargo, hull & machinery, and marine liability — fully compliant with institute cargo clauses.",
    benefits: [
      "All-risk cargo cover for imports & exports",
      "Hull & machinery insurance for vessels",
      "Marine liability protection",
      "Covers all modes of transit",
      "Institute cargo clauses (ICC) compliant",
    ],
    formType: "standard",
  },
  miscellaneous: {
    slug: "miscellaneous",
    name: "Miscellaneous Insurance",
    tagline: "Coverage for life's unexpected moments",
    color: "#6B7280",
    shortDesc: "Burglary, event, pet, wedding, and more in one category.",
    description:
      "Our miscellaneous insurance category covers a wide range of unique risks — from protecting your pet's health to ensuring your wedding day goes without a hitch. If it matters to you, we have a policy designed for it.",
    benefits: [
      "Burglary & commercial theft protection",
      "Event cancellation & liability cover",
      "Pet insurance for veterinary expenses",
      "Fidelity guarantee for employees",
      "Money insurance for cash in transit",
    ],
    formType: "standard",
  },
  "personal-accident": {
    slug: "personal-accident",
    name: "Personal Accident",
    tagline: "Protection when you need it most",
    color: "#BE185D",
    shortDesc: "Accidental death, disability, and hospitalisation cover.",
    description:
      "Personal accident insurance provides financial compensation for accidental death, permanent or temporary disability, and hospitalisation expenses. Available for individuals and corporate groups — giving you and your team a vital safety net.",
    benefits: [
      "Accidental death benefit (sum assured)",
      "Permanent total & partial disability cover",
      "Temporary total disability weekly benefit",
      "Hospitalisation expenses covered",
      "Group personal accident for employees",
    ],
    formType: "standard",
  },
  surety: {
    slug: "surety",
    name: "Surety Insurance",
    tagline: "Meet contract obligations with confidence",
    color: "#1E40AF",
    shortDesc: "Bid bonds and performance bonds for projects and tenders.",
    description:
      "Surety bonds guarantee contract performance and protect project owners against contractor default. Our bid bonds and performance bonds are accepted by government departments and private project owners across India.",
    benefits: [
      "Bid bond for EMD replacement in tenders",
      "Performance bond for contract execution",
      "Protects project owners from default",
      "Replaces expensive cash collateral",
      "Accepted by government departments",
    ],
    formType: "standard",
  },
};

// Ordered list for the products page grid
export const PRODUCTS_LIST = [
  "motor",
  "health",
  "travel",
  "life",
  "agriculture",
  "fire",
  "credit",
  "engineering",
  "liability",
  "marine",
  "miscellaneous",
  "personal-accident",
  "surety",
].map((slug) => PRODUCTS_DATA[slug]);

// Mapping slug → STANDARD_CATEGORIES key
export const SLUG_TO_STANDARD_KEY: Record<string, keyof typeof STANDARD_CATEGORIES> = {
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
