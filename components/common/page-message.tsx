import Link from "next/link";
import { Engrenage } from "@/components/common/engrenage";

interface PageMessageProps {
  /** Grand repère au-dessus du titre (« 404 »). */
  repere?: string;
  titre: string;
  texte: string;
  actions: Array<{ label: string; href: string }>;
  /** Bouton « Réessayer » (pages d'erreur) : il relance le rendu de la page. */
  onReessayer?: () => void;
}

/** Page de message plein écran : introuvable, erreur. Même plan sombre que le reste du site. */
export function PageMessage({ repere, titre, texte, actions, onReessayer }: PageMessageProps) {
  return (
    <main id="contenu" className="fond-plan relative flex min-h-[100svh] items-center overflow-hidden px-5 pb-16 pt-28 text-white sm:px-6 lg:px-8">
      <Engrenage aria-hidden className="pointer-events-none absolute -right-24 top-1/2 w-[30rem] -translate-y-1/2 animate-[spin_60s_linear_infinite] text-white/12 motion-reduce:animate-none" />
      <div className="container relative mx-auto">
        {repere && <p className="chiffre-upb text-[clamp(5rem,16vw,11rem)] leading-none text-laurier">{repere}</p>}
        <h1 className="titre-pochoir mt-2 max-w-[14ch] text-[clamp(2.8rem,7vw,6rem)]">{titre}</h1>
        <p className="mt-5 max-w-[48ch] text-lg leading-relaxed text-white/80">{texte}</p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          {actions.map((a, i) => (
            <Link key={a.href} href={a.href} className={i === 0 ? "btn-usine btn-or" : "btn-usine btn-trait"}>
              {a.label}
            </Link>
          ))}
          {onReessayer && (
            <button type="button" onClick={onReessayer} className="btn-usine btn-trait">
              Réessayer
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
