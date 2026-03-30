import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Mono } from "next/font/google";
import "./globals.css";

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  weight: ["300", "400", "500"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Motor Assembly",
  description: "Precision Engineering — Scroll to Explore",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorantGaramond.variable} ${dmMono.variable} antialiased`}
    >
      <body className="bg-[var(--bg)] text-[var(--text)] font-sans selection:bg-[var(--gold-mid)] selection:text-[var(--bg)]">
        {children}
      </body>
    </html>
  );
}
