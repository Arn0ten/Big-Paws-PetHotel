import type React from "react";
import ClientWebAppLayout from "./ClientWebAppLayout";

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
