import type { Programme } from "@/components/accueil/programs-section";

export type NiveauProgramme = Programme["niveau"];

export const NIVEAUX: Array<{ id: NiveauProgramme; label: string; diplome: string }> = [
  { id: "licence", label: "Licence", diplome: "Bac+3" },
  { id: "master", label: "Master", diplome: "Bac+5" },
  { id: "doctorat", label: "Doctorat", diplome: "Bac+8" },
];

export const libelleNiveau: Record<NiveauProgramme, string> = {
  licence: "Licence · Bac+3",
  master: "Master · Bac+5",
  doctorat: "Doctorat · Bac+8",
};

/** Le titre complet porte souvent le détail entre parenthèses : on l'affiche en second. */
export function scinderTitre(titre: string): { court: string; detail?: string } {
  const m = titre.match(/^(.*?)\s*\((.*)\)\s*$/);
  return m ? { court: m[1], detail: m[2] } : { court: titre };
}
