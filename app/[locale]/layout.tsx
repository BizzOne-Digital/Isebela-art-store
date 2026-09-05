import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "./providers";
import "../globals.css";

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

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.home" });
  const baseUrl = "https://isabel-creando-arte-magia.vercel.app";

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: t("title"),
      template: "%s | Isabel Creando Arte y Magia",
    },
    description: t("description"),
    keywords: ["goma eva", "artesanías", "hecho a mano", "muñecas artesanales", "tarjetas pop-up", "papelería artesanal", "arte reciclado", "regalos personalizados", "USA", "Estados Unidos"],
    authors: [{ name: "Isabel Creando Arte y Magia" }],
    creator: "Isabel Creando Arte y Magia",
    publisher: "Isabel Creando Arte y Magia",
    robots: "index, follow",
    alternates: {
      canonical: locale === routing.defaultLocale ? "/" : `/${locale}`,
      languages: {
        en: "/",
        es: "/es",
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "es" ? "es_US" : "en_US",
      url: locale === routing.defaultLocale ? baseUrl : `${baseUrl}/${locale}`,
      siteName: "Isabel Creando Arte y Magia",
      title: t("title"),
      description: t("description"),
      images: [
        {
          url: "/images/img/is2.jpg",
          width: 1200,
          height: 630,
          alt: "Isabel Creando Arte y Magia",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Isabel Creando Arte y Magia",
      description: t("description"),
      images: ["/images/img/is2.jpg"],
    },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAFAF9" },
    { media: "(prefers-color-scheme: dark)", color: "#18181B" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale} suppressHydrationWarning className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <meta name="google" content="notranslate" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <NextIntlClientProvider>
          <Providers>
            {/* Chrome lives in the layout, not in each page: the router then
                reuses this segment across navigations and only fetches the
                page that actually changed, instead of re-rendering and
                remounting the whole header/footer on every route click. */}
            <Navbar />
            {children}
            <Footer />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
