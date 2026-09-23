import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Outfit, Inter } from "next/font/google";
import { Nav } from "@/components/Nav";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import "./globals.css";

const display = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  variable: "--font-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Endemic — Field Notes for Fish, Plants, and Their Paper Trails",
  description:
    "Natural-history Field Notes and experimental tools for aquarium and plant hobbyists: habitats, names, provenance, people, and the evidence behind the stories.",
  keywords: [
    "aquarium biotope",
    "puffer fish",
    "carnivorous plants",
    "AquaTrack",
    "FloraTrack",
    "fish discoverer",
    "plant provenance",
  ],
  openGraph: {
    title: "Endemic",
    description:
      "Natural-history Field Notes and experimental tools for aquarium and plant hobbyists.",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Endemic",
  "description": "Biotope matching, discoverer profiles, and cross-kingdom connections for aquarists and plant collectors."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="pt-16">
        <ErrorBoundary>
          <Nav />
          {children}
        </ErrorBoundary>
      </body>
    </html>
  );
}
