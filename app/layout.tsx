import type { Metadata } from "next";
import "./globals.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://little-whiskers-kittens.jguzm047.chatgpt.site";
const imageUrl = `${siteUrl}/og-v2.png`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Gris & the Five — Kittens Looking for Loving Homes",
  description: "Meet Mango, Mocha, Baby, Toby, and their curious brother—five socialized kittens born June 18, 2026 and looking for loving homes.",
  icons: {
    icon: `${basePath}/favicon.svg`,
    shortcut: `${basePath}/favicon.svg`,
  },
  openGraph: {
    title: "Gris & the Five",
    description: "Born June 18, 2026 • Looking for loving homes",
    images: [{ url: imageUrl, width: 1200, height: 630, alt: "Gris & the Five: five kitten siblings looking for loving homes" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gris & the Five",
    description: "Born June 18, 2026 • Looking for loving homes",
    images: [imageUrl],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
