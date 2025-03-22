"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import FloatingElements from "./components/FloatingElements";
import type React from "react";
import { Analytics } from "@vercel/analytics/next";
import ScrollButton from "./components/ScrollButton";
// import "./webapp/admin/requests/components/css-animations.css";

const inter = Inter({ subsets: ["latin"] });

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" type="image/x-icon" />
        <link rel="canonical" href="https://bigpawspethotel.me" />
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
              "@id": "https://bigpawspethotel.me",
              url: "https://bigpawspethotel.me",
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
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <FloatingElements />

          {children}
          <Analytics />
          <ScrollButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
