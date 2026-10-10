import type { Metadata } from "next";
import Formation from "@/components/formation/formation";

export const metadata: Metadata = {
  title: "Nos formations — UPB",
  description: "Licences, masters et doctorats de l'Université Polytechnique de Bingerville : programmes, débouchés et poursuites d'études.",
};

export default function Page() {
  return <Formation />;
}
