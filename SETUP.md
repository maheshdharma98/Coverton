# Coverton Insurance — Setup Guide

This guide takes you from a fresh clone to a fully running website with Google Sheets logging and email notifications.

---

## Prerequisites

- Node.js 18 or 20 (LTS)
- A Google account
- A Gmail account you can create an App Password for

---

## Step 1 — Install dependencies

```bash
npm install
```

---

## Step 2 — Set up Google Cloud & Sheets API

### 2a. Create a Google Cloud project

1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Click **Select a project → New Project**
3. Name it (e.g. "Coverton Insurance") and click **Create**
4. Make sure the new project is selected in the top dropdown

### 2b. Enable the Google Sheets API

1. In the left sidebar: **APIs & Services → Library**
2. Search for **Google Sheets API**
3. Click it, then click **Enable**

### 2c. Create a Service Account

1. Go to **APIs & Services → Credentials**
2. Click **+ Create Credentials → Service Account**
3. Name it (e.g. "coverton-sheets"), click **Create and Continue**
4. Skip optional role and user access steps — click **Done**
5. Click on the new service account email in the list
6. Go to the **Keys** tab
7. Click **Add Key → Create new key → JSON → Create**
8. A `.json` file downloads to your computer — keep it safe

### 2d. Extract credentials from the JSON key file

Open the downloaded JSON file. You need two values:

| Field in JSON | `.env.local` variable |
|---|---|
| `"client_email"` | `GOOGLE_SERVICE_ACCOUNT_EMAIL` |
| `"private_key"` | `GOOGLE_PRIVATE_KEY` |

The `private_key` value looks like `"-----BEGIN RSA PRIVATE KEY-----\n...\n-----END RSA PRIVATE KEY-----\n"`. Copy it **including** the `\n` escape sequences — the app converts them automatically.

### 2e. Create the Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com) and create a new blank spreadsheet
2. Name it "Coverton Enquiries" (or anything you like)
3. Copy the **Spreadsheet ID** from the URL:
   ```
   https://docs.google.com/spreadsheets/d/  ← SPREADSHEET_ID HERE →  /edit
   ```
4. Click **Share** (top right)
5. In the "Add people" box, paste the **service account email** (from the JSON file, ends in `@...iam.gserviceaccount.com`)
6. Set permission to **Editor** and click **Send**

The app will write the header row on first run — you don't need to add anything manually.

---

## Step 3 — Set up Gmail App Password

This is required because Gmail blocks plain-password SMTP. App Passwords work even with 2FA enabled.

1. Go to [myaccount.google.com/security](https://myaccount.google.com/security)
2. Under "How you sign in to Google", click **2-Step Verification** (must be enabled first)
3. Scroll to the bottom and click **App passwords**
4. In the "Select app" dropdown, choose **Mail**; in "Select device" choose **Other** and type "Coverton"
5. Click **Generate** — copy the 16-character password shown (no spaces)

---

## Step 4 — Fill in `.env.local`

Open `.env.local` in the project root and fill in all values:

```env
GOOGLE_SHEETS_SPREADSHEET_ID=your_spreadsheet_id_here
GOOGLE_SERVICE_ACCOUNT_EMAIL=coverton-sheets@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\nABC...XYZ\n-----END RSA PRIVATE KEY-----\n"
TEAM_EMAIL=team@yourcompany.com
GMAIL_USER=yourgmail@gmail.com
GMAIL_APP_PASSWORD=abcdabcdabcdabcd
CUSTOMER_EMAIL_ENABLED=true
```

**Notes:**
- Wrap `GOOGLE_PRIVATE_KEY` in double quotes if it contains `\n` sequences
- `TEAM_EMAIL` is where all new enquiry notifications are sent
- Set `CUSTOMER_EMAIL_ENABLED=false` to skip sending confirmation emails to customers

---

## Step 5 — Test your integrations

Before launching, verify both integrations work:

```bash
npx tsx lib/test-connections.ts
```

Expected output:

```
✓  All 6 env vars present

─── Test 1: Google Sheets append ───────────────
─── Test 2: Send enquiry email ─────────────────

╔══════════════════════════════════════════════╗
║                   Results                   ║
╚══════════════════════════════════════════════╝

✓  PASS  Google Sheets → appendEnquiry
         {"success":true,"rowNumber":2}

✓  PASS  Nodemailer → sendEnquiryEmail

All tests passed. Your integrations are live.

Note: a test row was appended to the sheet with ref ID CVT-TEST-...
      You can delete it manually from Google Sheets.
```

If either test fails, the error message points to the problem (wrong key, sheet not shared, wrong App Password, etc.).

---

## Step 6 — Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Step 7 — Build for production

```bash
npm run build
npm start
```

Or deploy to Vercel:

```bash
npx vercel
```

When deploying to Vercel, add all six environment variables in **Project Settings → Environment Variables**.

---

## Troubleshooting

| Error | Fix |
|---|---|
| `GOOGLE_SHEETS_SPREADSHEET_ID is not set` | Check `.env.local` and restart the server |
| `403 PERMISSION_DENIED` | Share the Google Sheet with the service account email as **Editor** |
| `invalid_grant` | The service account JSON key may have expired — generate a new one |
| `Invalid login: 535` | Gmail App Password is wrong — re-generate it |
| `Error: connect ETIMEDOUT` | No internet, or Gmail SMTP blocked — try a different network |
| TypeScript errors on `npx tsx` | Make sure you're using Node 18+ (`node -v`) |

---

## Environment variables reference

| Variable | Required | Description |
|---|---|---|
| `GOOGLE_SHEETS_SPREADSHEET_ID` | Yes | ID from the Google Sheets URL |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | Yes | `client_email` from the JSON key file |
| `GOOGLE_PRIVATE_KEY` | Yes | `private_key` from the JSON key file |
| `TEAM_EMAIL` | Yes | Receives all new enquiry notifications |
| `GMAIL_USER` | Yes | Gmail address used to send emails |
| `GMAIL_APP_PASSWORD` | Yes | 16-character App Password from Google Account |
| `CUSTOMER_EMAIL_ENABLED` | No | Set to `false` to disable customer confirmations (default: `true`) |
