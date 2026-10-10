import type { Metadata } from "next";
import { Archivo, Geist_Mono, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Navigation from "@/components/common/navigation";
import AutoDialog from "@/components/common/auto-dialog";
import Footer from "@/components/common/footer";
import ScrollToTop from "@/components/common/scroll-to-top";

/** Titres : Archivo, avec son axe de largeur (titres élargis, voix institutionnelle). */
const display = Archivo({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

/** Texte : Source Sans 3, la famille du nom de l'université sur le logo. */
const body = Source_Sans_3({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Université Polytechnique de Bingerville - UPB",
  description:
    "L'Université Polytechnique de Bingerville (UPB) est un établissement d'enseignement supérieur innovant situé en Côte d'Ivoire, dédié à la formation de professionnels compétents et à la recherche de pointe.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${display.variable} ${body.variable} ${geistMono.variable} font-body antialiased`}
      >
        <AutoDialog />
        <Navigation />
        {children}
        <Footer />
        <ScrollToTop />
        <Toaster />
      </body>
    </html>
  );
}
