import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/src/components/layout/Header";
import Footer from "@/src/components/layout/Footer";
import WhatsAppFloat from "@/src/components/ui/WhatsAppFloat";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: {
    default: "INTENSE Clothing — Premium Menswear Manufacturer",
    template: "%s | INTENSE Clothing",
  },
  description:
    "Premium menswear manufacturer specialising in shorts, denims and trousers. Manufacturing since 2004 in Sri Lanka.",
  metadataBase: new URL("https://intenseclothing.lk"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "INTENSE Clothing",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
