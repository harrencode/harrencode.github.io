import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Harendra Kumarasiri",
  description: "Terminal-style portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
