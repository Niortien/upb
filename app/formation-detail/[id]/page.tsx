import type { Metadata } from "next";
import { notFound } from "next/navigation";
import FiliereHeader from "@/components/formation/filiere-header";
import { programmes } from "@/data/programme.data";

interface FormationPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return programmes.map((p) => ({ id: String(p.id) }));
}

export async function generateMetadata({ params }: FormationPageProps): Promise<Metadata> {
  const { id } = await params;
  const filiere = programmes.find((p) => p.id === Number(id));
  if (!filiere) return {};
  return { title: `${filiere.title} — UPB`, description: filiere.description };
}

export default async function FormationPage({ params }: FormationPageProps) {
  const { id } = await params;
  const filiere = programmes.find((p) => p.id === Number(id));
  if (!filiere) notFound();

  return <FiliereHeader programme={filiere} />;
}
