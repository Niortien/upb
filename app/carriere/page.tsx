import type { Metadata } from "next";
import Carriere from "@/components/carriere/carriere";

export const metadata: Metadata = {
  title: "Carrière & Opportunités — UPB",
  description:
    "Retrouvez les offres de stages, d'emplois et d'alternances des entreprises partenaires de l'Université Polytechnique de Bingerville. Préparez votre insertion professionnelle avec les services carrière UPB.",
};

export default function CarrierePage() {
  return <Carriere />;
}
