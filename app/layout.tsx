import type { Metadata } from "next";
import { Geist, Geist_Mono,Prosto_One,Orbitron,Raleway } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Navigation from "@/components/common/navigation";
import AutoDialog from "@/components/common/auto-dialog";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

//la police protos

const protos = Prosto_One({
  variable: "--font-protos",
  subsets: ["cyrillic"],
  weight:"400"
});
const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight:"600"
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight:"600"
});

export const metadata: Metadata = {
  title: "Université Polytechnique de Bingerville - UPB",
  description: "L'Université Polytechnique de Bingerville (UPB) est un établissement d'enseignement supérieur innovant situé en Côte d'Ivoire, dédié à la formation de professionnels compétents et à la recherche de pointe.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${protos.variable} ${raleway.variable}  antialiased`}
      >
        <AutoDialog />
        <Navigation />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
