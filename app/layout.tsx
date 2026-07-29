import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat, Parisienne } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const sans = Montserrat({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const script = Parisienne({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Para ti, mi amor | 1 de agosto",
  description: "Una sorpresa especial para celebrar el Día de la Novia.",
  openGraph: {
    title: "Para ti, mi amor",
    description: "Una sorpresa especial para celebrar el 1 de agosto.",
    images: [{ url: "/og.png", width: 1732, height: 906 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Para ti, mi amor",
    description: "Una sorpresa especial para celebrar el 1 de agosto.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={`${display.variable} ${sans.variable} ${script.variable}`}>
        {children}
      </body>
    </html>
  );
}
