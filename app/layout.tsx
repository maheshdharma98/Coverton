import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import FloatingActions from "@/components/FloatingActions";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Coverton Insurance",
    template: "%s — Coverton Insurance",
  },
  description:
    "India's trusted insurance platform. Motor, health, life, travel and 9 more categories. Get a quote in minutes — IRDAI registered, 24/7 support.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3/dist/tabler-icons.min.css"
        />
      </head>
      <body className="font-sans antialiased">
        {children}
        <FloatingActions />
      </body>
    </html>
  );
}
