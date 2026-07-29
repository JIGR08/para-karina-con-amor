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
  title: "Para Karina, con amor | 1 de agosto",
  description: "Una sorpresa romántica creada especialmente para Karina.",
  openGraph: {
    title: "Para Karina, con amor",
    description: "Una sorpresa romántica creada especialmente para Karina.",
    images: [{ url: "/og.png", width: 1732, height: 906 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Para Karina, con amor",
    description: "Una sorpresa romántica creada especialmente para Karina.",
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
