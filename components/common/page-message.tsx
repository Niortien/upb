import Link from "next/link";
import { Laurier } from "@/components/common/laurier";

interface PageMessageProps {
  /** Grand repère au-dessus du titre (« 404 »). */
  repere?: string;
  titre: string;
  texte: string;
  actions: Array<{ label: string; href: string }>;
  /** Bouton « Réessayer » (pages d'erreur) : il relance le rendu de la page. */
  onReessayer?: () => void;
}

/** Page de message plein écran : introuvable, erreur. Même ton que le reste du site, sans décor inutile. */
export function PageMessage({ repere, titre, texte, actions, onReessayer }: PageMessageProps) {
  return (
    <main id="contenu" className="relative flex min-h-[100svh] items-center overflow-hidden bg-craie px-5 pb-16 pt-32 sm:px-6 lg:px-8">
      <Laurier aria-hidden className="pointer-events-none absolute -right-32 top-1/2 w-[38rem] -translate-y-1/2 opacity-[0.1]" />
      <div className="container relative mx-auto">
        {repere && <p className="chiffre-upb text-[clamp(5rem,16vw,11rem)] leading-none text-laurier-fonce">{repere}</p>}
        <h1 className="titre-upb mt-2 max-w-[20ch] text-[clamp(2.2rem,5.4vw,4.4rem)] text-indigo">{titre}</h1>
        <p className="mt-5 max-w-[48ch] text-lg leading-relaxed text-encre-douce">{texte}</p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          {actions.map((a, i) => (
            <Link
              key={a.href}
              href={a.href}
              className={
                i === 0
                  ? "inline-flex h-13 items-center justify-center rounded-full bg-indigo px-8 font-bold text-white transition-colors duration-200 hover:bg-indigo-deep"
                  : "inline-flex h-13 items-center justify-center rounded-full border border-indigo/30 px-8 font-bold text-indigo transition-colors duration-200 hover:border-indigo hover:bg-white"
              }
            >
              {a.label}
            </Link>
          ))}
          {onReessayer && (
            <button
              type="button"
              onClick={onReessayer}
              className="inline-flex h-13 items-center justify-center rounded-full border border-indigo/30 px-8 font-bold text-indigo transition-colors duration-200 hover:border-indigo hover:bg-white"
            >
              Réessayer
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
