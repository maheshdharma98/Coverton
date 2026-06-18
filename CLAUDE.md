# Insurance Website — Project Context

## Project Overview
An insurance company website (Coverton Insurance) built with Next.js 14 App Router. Phase 1 includes the public website, 13 insurance category enquiry forms, Google Sheets logging, and email notifications. No CMS, no IBS integration yet.

## Brand & Design System
- Primary colour: #1247D6 (blue)
- Accent colour: #F5B800 (gold/yellow)
- Background: #FAFBFF (light surface)
- Text: #0A0F1E (near black)
- Font: Inter (Google Fonts)
- Border radius: 14px cards, 50px pills/nav
- Nav style: Floating centered pill with logo + Home, Claims, Products, About us + Get a quote CTA
- Design style: Editorial bento grid, clean white surfaces, no gradients, no shadows

## Tech Stack
- Framework: Next.js 14 (App Router)
- Language: TypeScript
- Styling: Tailwind CSS + custom CSS variables
- Font: Inter via next/font/google
- Form handling: React Hook Form + Zod
- Google Sheets: googleapis
- Email: Nodemailer with Gmail SMTP
- File upload (Motor only): formidable

## Project Structure
/app
  /page.tsx                        → Homepage (all sections)
  /products/page.tsx               → All products listing
  /products/[slug]/page.tsx        → Individual product page with form
  /api/enquiry/route.ts            → Enquiry submission API
  /api/upload/route.ts             → Motor file upload API
/components
  /layout/Navbar.tsx               → Floating pill navbar
  /layout/Footer.tsx               → Footer
  /sections/                       → Homepage sections
    UserStory.tsx                  → Interactive phone story section
    BentoHero.tsx                  → Bento grid hero
    HowItWorks.tsx                 → 4-step process
    ProductsGrid.tsx               → All 13 products preview
    WhyCoverton.tsx                → 3 bento tiles
    ClientsSection.tsx             → Client logos + stats
    Testimonials.tsx               → 3 testimonials
    CtaBand.tsx                    → Gold CTA strip
  /forms/                          → All form components
    MotorForm.tsx
    HealthIndividualForm.tsx
    HealthFloaterForm.tsx
    HealthGroupForm.tsx
    TravelForm.tsx
    StandardForm.tsx               → Reusable for 9 other categories
  /ui/                             → Shared UI components
/lib
  /sheets.ts                       → Google Sheets integration
  /mailer.ts                       → Nodemailer email
  /validations/                    → Zod schemas
/types
  /forms.ts                        → TypeScript types
/public
  /fonts/                          → If needed

## Insurance Categories & Subcategories
Motor: Auto, Bike, Car, CPA, Commercial Vehicle, Private Car
Health Individual: (no subcategory — separate form)
Health Floater: (multi-member form — separate)
Health Group: (company form — separate)
Life: Endowment Plans, Money-Back Plans, Term Insurance, ULIP, Whole Life
Agriculture: Cattle, Crop
Fire: Commercial Property, Godown, Office Premises (Contents), Residence
Credit: Loan Default, Trade Credit
Engineering: Boiler and Pressure Plant, Contractor All Risk, Contractor Plant and Machinery, Erection All Risk
Liability: Cyber Liability, Directors and Officers, Employers Liability, Product Liability, Professional Indemnity, Public Liability, Workmen Compensation
Marine: Cargo, Hull, Marine Liability
Miscellaneous: Commercial, Burglary, Event, Fidelity Guarantee, Money Insurance, Other, Pet, Private Burglary, Wedding
Personal Accident: Group, Individual
Surety: Bid Bond, Performance Bond
Travel: Business/Leisure, Corporate (+ Travel Type: Including USA & Canada / Excluding USA & Canada)

## Form Fields
### Motor (unique)
Name, Mobile Number, Email ID, Pincode, Category (dropdown), Vehicle Number — all mandatory
Previous Insurance Policy upload — optional (PDF/image, max 5MB)

### Health Individual (unique)
Name, Mobile Number, Date of Birth, Email ID, Pincode — all mandatory
Pre-existing disease — Yes/No toggle (mandatory)

### Health Floater (unique)
Name, Mobile Number, Email ID, Pincode — all mandatory
Members in 2-column grid (Self, Spouse, Son+, Daughter+, Mother, Father, Mother-in-law, Father-in-law)
Each member: Age or DOB + PED Yes/No

### Health Group (unique)
Company Name, Mobile Number, No of Employees, Email ID, Pincode — all mandatory

### Travel (unique)
Name, Mobile Number, Email ID, Pincode, Category — all mandatory
Travel Type: Including USA & Canada / Excluding USA & Canada — mandatory card selection

### Standard Form (all others: Life, Agriculture, Fire, Credit, Engineering, Liability, Marine, Miscellaneous, Personal Accident, Surety)
Name, Mobile Number, Email ID, Pincode, Category (dropdown from subcategories) — all mandatory

## Validation Rules
- Mobile: 10 digits, Indian format
- Pincode: 6 digits
- Email: valid format
- All mandatory fields must be filled before submit
- Client-side AND server-side validation

## Google Sheets
- One master sheet with all enquiries
- Columns: Timestamp, Insurance Type, Subcategory, Name, Mobile, Email, Pincode, Extra Fields
- Credentials via environment variables

## Email
- Trigger on every submission
- Subject: "New [Insurance Type] Enquiry — [Name]"
- HTML table with all submitted fields
- Send to TEAM_EMAIL from env

## Environment Variables
GOOGLE_SHEETS_SPREADSHEET_ID=
GOOGLE_SERVICE_ACCOUNT_EMAIL=
GOOGLE_PRIVATE_KEY=
TEAM_EMAIL=
GMAIL_USER=
GMAIL_APP_PASSWORD=

## Phase Roadmap
Phase 1 (current): Website + forms + Google Sheets + Email
Phase 2: Sanity CMS
Phase 3: Campaign management
Phase 4: IBS integration
Phase 5: SEO + analytics

## Key Rules
- Never store enquiry data in a database — only Google Sheets + email
- Motor file upload server-side only
- IBS integration is future — not this phase
- All forms validate client AND server side
- Mobile number: 10 digits Indian format
- Pincode: 6 digits
