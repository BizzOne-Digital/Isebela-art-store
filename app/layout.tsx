import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://isabel-creando-arte-magia.vercel.app"),
  title: {
    default: "Isabel Creando Arte y Magia | Artesanías en Goma Eva Hechas a Mano",
    template: "%s | Isabel Creando Arte y Magia",
  },
  description: "Creaciones artesanales únicas en goma eva: muñecas con alma, tarjetas pop-up, papelería artística y arte reciclado. Hecho a mano con amor en Argentina. Encargos personalizados.",
  keywords: ["goma eva", "artesanías", "hecho a mano", "muñecas artesanales", "tarjetas pop-up", "papelería artesanal", "arte reciclado", "regalos personalizados", "Argentina"],
  authors: [{ name: "Isabel Creando Arte y Magia" }],
  creator: "Isabel Creando Arte y Magia",
  publisher: "Isabel Creando Arte y Magia",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "https://isabel-creando-arte-magia.vercel.app",
    siteName: "Isabel Creando Arte y Magia",
    title: "Isabel Creando Arte y Magia | Artesanías en Goma Eva Hechas a Mano",
    description: "Creaciones artesanales únicas en goma eva: muñecas, tarjetas pop-up, papelería y arte reciclado. Hecho a mano con amor en Argentina.",
    images: [
      {
        url: "/images/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Isabel Creando Arte y Magia - Artesanías en Goma Eva",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Isabel Creando Arte y Magia",
    description: "Creaciones artesanales únicas en goma eva hechas a mano con amor.",
    images: ["/images/og-image.svg"],
  },
  verification: {
    google: "google-site-verification-code",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAFAF9" },
    { media: "(prefers-color-scheme: dark)", color: "#18181B" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}