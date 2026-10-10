import type { Metadata } from "next";
import { Big_Shoulders, Big_Shoulders_Stencil, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Navigation from "@/components/common/navigation";
import AutoDialog from "@/components/common/auto-dialog";
import Footer from "@/components/common/footer";
import ScrollToTop from "@/components/common/scroll-to-top";

/** Titres : Big Shoulders Display, une grotesque condensée d'affichage industriel, en capitales. */
const display = Big_Shoulders({
  variable: "--font-display",
  subsets: ["latin", "latin-ext"],
  weight: ["700", "800", "900"],
  display: "swap",
});

/** Pochoir des caisses d'atelier : réservé aux plus grands titres (ouverture, appel final). */
const pochoir = Big_Shoulders_Stencil({
  variable: "--font-pochoir",
  subsets: ["latin", "latin-ext"],
  weight: ["800", "900"],
  display: "swap",
});

/** Texte : IBM Plex Sans, la famille des documents techniques. */
const body = IBM_Plex_Sans({
  variable: "--font-body",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

/** Cotes, repères, cartouches et chiffres : IBM Plex Mono. */
const mono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  display: "swap",
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
        className={`${display.variable} ${pochoir.variable} ${body.variable} ${mono.variable} font-body antialiased`}
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
