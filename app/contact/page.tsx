import type { Metadata } from "next";
import Contact from "@/components/contact/contact";

export const metadata: Metadata = {
  title: "Contact — UPB",
  description: "Contactez l'Université Polytechnique de Bingerville : admission, formations, visite du campus.",
};

export default function Page() {
  return <Contact />;
}
