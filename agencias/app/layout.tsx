import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

import "./globals.css";

const atkinson = localFont({
  src: [
    { path: "./fonts/atkinson-hyperlegible-400-latin-latin-ext.woff2", weight: "400", style: "normal" },
    { path: "./fonts/atkinson-hyperlegible-700-latin-latin-ext.woff2", weight: "700", style: "normal" },
  ],
  display: "swap",
  variable: "--font-atkinson",
});

// Gilroy no pasa por next/font: la licencia prohíbe redistribuir el archivo, así
// que no está en git. Se declara con @font-face en globals.css y, si el archivo
// no está en public/fonts/, los títulos caen en Atkinson sin romper el build.

export const metadata: Metadata = { title: "Tempiax" };
export const viewport: Viewport = { themeColor: "#f2fcfe" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={atkinson.variable}>
      <body className="bg-[#f2fcfe] font-[family-name:var(--font-atkinson)] antialiased">{children}</body>
    </html>
  );
}
