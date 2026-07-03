import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EcoGrid GB / Energy Mix Dashboard",
  description:
    "Great Britain energy mix forecast and EV charging optimization dashboard.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}