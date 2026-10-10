import type { Metadata } from "next";
import Blog from "@/components/blog/blog";

export const metadata: Metadata = {
  title: "Actualités — UPB",
  description: "Événements, innovations et vie étudiante : les actualités de l'Université Polytechnique de Bingerville.",
};

export default function Page() {
  return <Blog />;
}
