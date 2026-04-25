import ClubDetail from "@/components/clubs/club-detail";
import { CLUBS } from "@/data/clubs.data";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return CLUBS.map((club) => ({ id: club.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const club = CLUBS.find((c) => c.slug === id);
  if (!club) return {};
  return {
    title: `${club.name} — UPB`,
    description: club.description,
  };
}

export default async function ClubDetailPage({ params }: PageProps) {
  const { id } = await params;
  const club = CLUBS.find((c) => c.slug === id);
  if (!club) notFound();
  return <ClubDetail club={club} />;
}
