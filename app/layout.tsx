import type { Metadata, Viewport } from "next";
import ClientLayout from "./clientLayout";
import type React from "react";

export const metadata: Metadata = {
  title: "Big Paws Pet Hotel - Premium Pet Care Services in Tagum City",
  description:
    "Big Paws Pet Hotel offers luxury pet accommodation, professional grooming, and home services in Tagum City. Expert care for dogs and cats with state-of-the-art facilities.",
  generator: "Next.js",
  applicationName: "Big Paws Pet Hotel",
  keywords: [
    "pet hotel",
    "dog grooming",
    "cat grooming",
    "pet boarding",
    "home service grooming",
    "Tagum City pet care",
    "pet supplies",
    "professional pet grooming",
    "luxury pet accommodation",
    "pet daycare",
    "Big Paws Pet Hotel",
    "pet care services",
    "pet sitting",
    "dog walking",
    "pet spa",
  ],
  authors: [{ name: "Big Paws Pet Hotel" }],
  creator: "Big Paws Pet Hotel",
  publisher: "Big Paws Pet Hotel",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://bigpawspethotel.me",
    title: "Big Paws Pet Hotel - Premium Pet Care Services in Tagum City",
    description:
      "Professional pet grooming, boarding, and home services in Tagum City. Luxury accommodation for your beloved pets.",
    siteName: "Big Paws Pet Hotel",
    images: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BigPawsLogoBig-QEuBX7LEMcYoQTMrjMOPnGFkVuwmrA.png",
        width: 1200,
        height: 630,
        alt: "Big Paws Pet Hotel Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Big Paws Pet Hotel - Premium Pet Care Services",
    description:
      "Professional pet grooming, boarding, and home services in Tagum City. Luxury accommodation for your beloved pets.",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BigPawsLogoBig-QEuBX7LEMcYoQTMrjMOPnGFkVuwmrA.png",
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BigPawsLogoBig-QEuBX7LEMcYoQTMrjMOPnGFkVuwmrA.png",
    shortcut:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BigPawsLogoBig-QEuBX7LEMcYoQTMrjMOPnGFkVuwmrA.png",
    apple:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BigPawsLogoBig-QEuBX7LEMcYoQTMrjMOPnGFkVuwmrA.png",
  },
  manifest: "/manifest.json",
  verification: {
    google: "google-site-verification-code", // Replace with actual verification code
  },
};

// Separate viewport export
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClientLayout>{children}</ClientLayout>;
}
