import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Engrenage } from "@/components/common/engrenage";

interface Action {
  label: string;
  href: string;
  /** Lien externe (s'ouvre dans un nouvel onglet). */
  externe?: boolean;
  /** « or » : bouton plein ; « contour » : bouton à bord clair. */
  style?: "or" | "contour";
}

interface CtaFinalProps {
  titre: string;
  texte: string;
  actions: Action[];
}

/**
 * Bandeau de fin de page : un titre pochoir, une phrase, deux actions, et un grand engrenage en filigrane.
 * Les éléments portent data-reveal : la page qui l'affiche lance useReveal pour les faire apparaître.
 */
export function CtaFinal({ titre, texte, actions }: CtaFinalProps) {
  return (
    <section className="fond-plan relative overflow-hidden text-white">
      <Engrenage aria-hidden className="pointer-events-none absolute -right-24 top-1/2 hidden w-[34rem] -translate-y-1/2 animate-[spin_60s_linear_infinite] text-white/15 motion-reduce:animate-none lg:block" />
      <div className="container relative mx-auto px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
        <h2 data-reveal className="titre-pochoir max-w-[14ch] text-[clamp(2.8rem,7vw,6.2rem)]">
          {titre}
        </h2>
        <p data-reveal className="mt-5 max-w-[46ch] text-lg leading-relaxed text-white/80">
          {texte}
        </p>
        <div data-reveal className="mt-9 flex flex-col gap-3 sm:flex-row">
          {actions.map((a) => {
            const classe = a.style === "contour" ? "btn-usine btn-trait" : "btn-usine btn-or group";
            const contenu =
              a.style === "contour" ? (
                a.label
              ) : (
                <>
                  {a.label}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                </>
              );
            return a.externe ? (
              <a key={a.label} href={a.href} target="_blank" rel="noopener noreferrer" className={classe}>
                {contenu}
              </a>
            ) : (
              <Link key={a.label} href={a.href} className={classe}>
                {contenu}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
