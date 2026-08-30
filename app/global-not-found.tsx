import { Playfair_Display, Inter } from "next/font/google";
import Link from "next/link";
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

export default function GlobalNotFound() {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="antialiased bg-surface text-textBase">
        <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
          <p className="text-accent text-sm font-sans tracking-widest uppercase mb-4">404</p>
          <h1 className="text-4xl md:text-5xl font-serif mb-4">Page not found</h1>
          <p className="text-textBase/60 mb-8 max-w-md">
            The page you&apos;re looking for doesn&apos;t exist or may have moved.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-sm hover:bg-primary/90 transition-colors font-sans"
          >
            Back to home
          </Link>
        </main>
      </body>
    </html>
  );
}
