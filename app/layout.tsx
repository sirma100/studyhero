import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MetaPixelScript from "@/components/MetaPixelScript";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StudyHero - Past Papers, Notes & AI Tutor for Kenyan Students",
  description: "Access past papers, CATs, assignments, and verified notes from Kenyan universities. Get AI tutoring in Swahili & English. Pay with M-Pesa from KES 50/day.",
  keywords: ["past papers", "Kenya university", "CATs", "study notes", "AI tutor", "M-Pesa", "UoN", "KU", "JKUAT"],
  openGraph: {
    title: "StudyHero - Past Papers & AI Tutor for Kenyan Students",
    description: "Stop searching WhatsApp groups. Get instant access to past papers from your university.",
    url: "https://studyhero-landing.vercel.app",
    siteName: "StudyHero",
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "StudyHero - Past Papers for Kenyan Students",
    description: "Access past papers, CATs & AI tutoring. From KES 50/day.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID || '';

  return (
    <html lang="en">
      <head>
        <MetaPixelScript pixelId={pixelId} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
