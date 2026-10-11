"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Planche } from "@/components/common/planche";
import { programmes } from "@/data/programme.data";
import { useReveal } from "@/hooks/use-reveal";
import { libelleNiveau, scinderTitre } from "@/lib/programmes";
import VideoMaster from "../formation/video-maste";

gsap.registerPlugin(ScrollTrigger);

export interface Programme {
  id: number;
  niveau: "licence" | "master" | "doctorat";
  title: string;
  description: string;
  img: string;
  debouche?: string[];
  contenu?: string[];
  evolution?: string[];
}

type Niveau = "all" | Programme["niveau"];

const niveaux: Array<{ id: Niveau; label: string; diplome: string }> = [
  { id: "all", label: "Tous", diplome: "" },
  { id: "licence", label: "Licence", diplome: "Bac+3" },
  { id: "master", label: "Master", diplome: "Bac+5" },
  { id: "doctorat", label: "Doctorat", diplome: "Bac+8" },
];

/** La liste complète est sur la page Formations : l'accueil n'en montre qu'un aperçu. */
const LIGNES_VISIBLES = 6;

const deux = (n: number) => String(n).padStart(2, "0");

/** Les formations comme une nomenclature de pièces : une ligne par programme (référence, niveau, débouchés). */
const ProgrammesPage = () => {
  const racine = useRef<HTMLElement>(null);
  const liste = useRef<HTMLUListElement>(null);
  const [niveau, setNiveau] = useState<Niveau>("all");
  const [toutVoir, setToutVoir] = useState(false);
  const filtres = niveau === "all" ? programmes : programmes.filter((p) => p.niveau === niveau);
  const visibles = toutVoir ? filtres : filtres.slice(0, LIGNES_VISIBLES);
  useReveal(racine);

  // Les lignes de la nomenclature arrivent par lots, au fur et à mesure qu'on les atteint (ScrollTrigger.batch).
  // Quand le niveau change ou qu'on déplie la liste, elles sont recréées et se redessinent de la même façon.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("all", () => {
        const lignes = gsap.utils.toArray<HTMLElement>("li", liste.current);
        gsap.set(lignes, { opacity: 0, x: -28 });
        ScrollTrigger.batch(lignes, {
          start: "top 92%",
          once: true,
          onEnter: (lot) => gsap.to(lot, { opacity: 1, x: 0, duration: 0.7, stagger: 0.07, ease: "expo.out", overwrite: true }),
        });
        ScrollTrigger.refresh();
      });
      return () => mm.revert();
    },
    { dependencies: [niveau, toutVoir], scope: liste, revertOnUpdate: true }
  );

  return (
    <section ref={racine} aria-labelledby="prog-titre" className="fond-papier">
      <div className="container mx-auto px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16">
          <Planche repere="PL. 05" legende="Nomenclature des formations" id="prog-titre" titre="Des formations pensées pour l'avenir." largeur="16ch" />
          <p data-reveal className="max-w-[46ch] text-lg leading-relaxed text-encre-douce lg:pb-2">
            De la licence au doctorat, des programmes conçus avec les entreprises pour maximiser votre employabilité.
          </p>
        </div>

        <div role="group" aria-label="Filtrer par niveau" className="mt-10 flex flex-wrap gap-2">
          {niveaux.map((n) => {
            const actif = niveau === n.id;
            return (
              <button
                key={n.id}
                type="button"
                aria-pressed={actif}
                onClick={() => {
                  setNiveau(n.id);
                  setToutVoir(false);
                }}
                className={`etiquette min-h-11 border px-4 text-[12px] transition-colors duration-200 ${
                  actif ? "border-indigo bg-indigo text-white" : "border-indigo/40 text-indigo hover:bg-indigo/10"
                }`}
              >
                {n.label} {n.diplome && <span className={actif ? "text-laurier" : "text-encre-douce"}>{n.diplome}</span>}
              </button>
            );
          })}
        </div>

        <p className="etiquette mt-6 text-encre-douce" aria-live="polite">
          {filtres.length} référence{filtres.length > 1 ? "s" : ""}
        </p>

        {/* En-tête de la nomenclature (grand écran). */}
        <div aria-hidden className="etiquette mt-3 hidden grid-cols-[4.5rem_1.3fr_9.5rem_1fr_3rem] gap-x-6 border-y-2 border-indigo px-3 py-2 text-[11px] text-indigo md:grid">
          <span>Réf.</span>
          <span>Désignation</span>
          <span>Niveau</span>
          <span>Débouchés</span>
          <span />
        </div>

        <ul ref={liste} className="border-t-2 border-indigo md:border-t-0">
          {visibles.map((p) => {
            const { court, detail } = scinderTitre(p.title);
            return (
              <li key={p.id} className="border-b border-indigo/25">
                <Link
                  href={`/formation-detail/${p.id}`}
                  className="group grid items-start gap-x-6 gap-y-1 px-3 py-5 transition-colors duration-200 hover:bg-indigo hover:text-white md:grid-cols-[4.5rem_1.3fr_9.5rem_1fr_3rem] md:items-center"
                >
                  <span className="etiquette text-indigo group-hover:text-laurier">F-{deux(p.id)}</span>
                  <span>
                    <span className="block text-xl font-semibold leading-snug text-encre group-hover:text-white">{court}</span>
                    {detail && <span className="mt-0.5 block text-[15px] text-encre-douce group-hover:text-white/80">{detail}</span>}
                  </span>
                  <span className="etiquette text-[12px] text-laurier-fonce group-hover:text-laurier">{libelleNiveau[p.niveau]}</span>
                  <span className="text-[15px] leading-snug text-encre-douce group-hover:text-white/85">
                    {p.debouche && p.debouche.length > 0 ? p.debouche.slice(0, 3).join(", ") : "—"}
                  </span>
                  <span aria-hidden className="hidden h-10 w-10 items-center justify-center border border-indigo/40 text-indigo transition-colors group-hover:border-laurier group-hover:bg-laurier group-hover:text-nuit md:flex">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        {filtres.length > LIGNES_VISIBLES && !toutVoir && (
          <button type="button" onClick={() => setToutVoir(true)} className="btn-usine btn-encre mt-6">
            Voir les {filtres.length - LIGNES_VISIBLES} autres formations
          </button>
        )}

        {(niveau === "all" || niveau === "master") && (
          <div data-reveal className="mt-14">
            <VideoMaster src="/assets/video/master.mp4" title="Présentation du Master UPB" description="Découvrez nos formations Master et les opportunités offertes par l'UPB." />
          </div>
        )}

        <div className="mt-12">
          <Link href="/formation" className="btn-usine btn-or group">
            Voir toutes nos formations
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProgrammesPage;
