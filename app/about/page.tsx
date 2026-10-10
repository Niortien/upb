import type { Metadata } from "next";
import About from "@/components/about/about";

export const metadata: Metadata = {
  title: "À propos — UPB",
  description: "Découvrez l'Université Polytechnique de Bingerville : son campus, sa vie étudiante, ses diplômés et son engagement.",
};

export default function Page() {
  return <About />;
}
