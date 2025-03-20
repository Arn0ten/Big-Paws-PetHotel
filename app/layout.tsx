import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import FloatingElements from "./components/FloatingElements";
import type React from "react";
import { Analytics } from "@vercel/analytics/next";
import ScrollButton from "./components/ScrollButton";
// import "./webapp/admin/requests/components/css-animations.css";

const inter = Inter({ subsets: ["latin"] });

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
    url: "https://big-paws-petsupplies.tech",
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
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" type="image/x-icon" />
        <link rel="canonical" href="https://big-paws-petsupplies.tech" />
        {/* Schema.org markup for Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "PetService",
              name: "Big Paws Pet Hotel",
              image:
                "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BigPawsLogoBig-QEuBX7LEMcYoQTMrjMOPnGFkVuwmrA.png",
              "@id": "https://big-paws-petsupplies.tech",
              url: "https://big-paws-petsupplies.tech",
              telephone: "+639501890933",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Bonifacio St.",
                addressLocality: "Tagum City",
                addressRegion: "Davao del Norte",
                postalCode: "8100",
                addressCountry: "PH",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 7.4460297,
                longitude: 125.8037527,
              },
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                ],
                opens: "08:00",
                closes: "19:00",
              },
              sameAs: [
                "https://www.facebook.com/share/15jqk6ZeSE/",
                // Add other social media URLs
              ],
              priceRange: "₱₱",
              description:
                "Big Paws Pet Hotel provides luxury accommodation and professional grooming services for pets in Tagum City. We offer boarding, daycare, grooming, and home services.",
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <FloatingElements />

          {children}
          <Analytics />
          <ScrollButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
