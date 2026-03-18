import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "SocialFix Pro - Professional Social Media Consulting Services",
  description: "Professional consulting services to help you navigate the official social media account appeal process. Expert guidance for Instagram, Facebook, TikTok, X, YouTube & WhatsApp.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="-G_udtcYZ9Gx5GQkexPh_DGn93DCqT781hiu47BlkYA" />
      </head>
      <body className={`${geistSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
