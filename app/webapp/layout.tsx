import type { Metadata, Viewport } from "next";
import type React from "react";
import ClientWebAppLayout from "./ClientWebAppLayout";

export const metadata: Metadata = {
  title: "Big Paws Pet Hotel - Web App",
  description:
    "Manage your pets and services with Big Paws Pet Hotel web application",
};

// Separate viewport export
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function WebAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientWebAppLayout>{children}</ClientWebAppLayout>
      </body>
    </html>
  );
}
