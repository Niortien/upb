"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { programmes } from "@/data/programme.data";
import { useReveal } from "@/hooks/use-reveal";
import VideoMaster from "../formation/video-maste";

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

/** La liste complète est sur la page Formations : l'accueil n'en montre qu'un aperçu. */
const LIGNES_VISIBLES = 6;

const niveaux: Array<{ id: Niveau; label: string; diplome: string }> = [
  { id: "all", label: "Tous", diplome: "" },
  { id: "licence", label: "Licence", diplome: "Bac+3" },
  { id: "master", label: "Master", diplome: "Bac+5" },
  { id: "doctorat", label: "Doctorat", diplome: "Bac+8" },
];

const libelleNiveau: Record<Programme["niveau"], string> = { licence: "Licence · Bac+3", master: "Master · Bac+5", doctorat: "Doctorat · Bac+8" };

/** Le titre complet porte souvent le détail entre parenthèses : on l'affiche en second. */
function scinder(titre: string): { court: string; detail?: string } {
  const m = titre.match(/^(.*?)\s*\((.*)\)\s*$/);
  return m ? { court: m[1], detail: m[2] } : { court: titre };
}

const ProgrammesPage = () => {
  const racine = useRef<HTMLElement>(null);
  const liste = useRef<HTMLUListElement>(null);
  const [niveau, setNiveau] = useState<Niveau>("all");
  const [toutVoir, setToutVoir] = useState(false);
  const filtres = niveau === "all" ? programmes : programmes.filter((p) => p.niveau === niveau);
  const visibles = toutVoir ? filtres : filtres.slice(0, LIGNES_VISIBLES);
  useReveal(racine);

  // Quand on change de niveau, la liste se redessine en cascade.
  useGSAP(
    () => {
      if (!liste.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(liste.current.children, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.55, stagger: 0.035, ease: "expo.out" });
    },
    { dependencies: [niveau], scope: liste }
  );

  return (
    <section ref={racine} aria-labelledby="prog-titre" className="bg-white">
      <div className="container mx-auto px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16">
          <h2 id="prog-titre" data-reveal className="titre-upb text-[clamp(2.2rem,4.6vw,4rem)] text-indigo">
            Des formations pensées pour l&apos;avenir.
          </h2>
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
                className={`min-h-11 rounded-full border px-5 text-[15px] font-bold transition-colors duration-200 ${
                  actif ? "border-indigo bg-indigo text-white" : "border-trait text-encre hover:border-indigo hover:text-indigo"
                }`}
              >
                {n.label}{" "}
                {n.diplome && <span className={`ml-1.5 font-semibold ${actif ? "text-white/70" : "text-encre-douce"}`}>{n.diplome}</span>}
              </button>
            );
          })}
        </div>

        <p className="mt-6 text-sm text-encre-douce" aria-live="polite">
          {filtres.length} formation{filtres.length > 1 ? "s" : ""}
        </p>

        <ul ref={liste} className="mt-3 border-t border-trait">
          {visibles.map((p) => {
            const { court, detail } = scinder(p.title);
            return (
              <li key={p.id} className="border-b border-trait">
                <Link
                  href={`/formation-detail/${p.id}`}
                  className="group grid items-center gap-x-6 gap-y-3 py-5 sm:grid-cols-[5.5rem_1fr_auto] sm:py-6"
                >
                  <span className="relative hidden h-[4.5rem] w-[5.5rem] overflow-hidden rounded-xl bg-indigo sm:block">
                    <Image src={p.img} alt="" fill sizes="88px" className="object-cover transition-transform duration-500 ease-arrivee group-hover:scale-110" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-bold text-laurier-fonce">{libelleNiveau[p.niveau]}</span>
                    <span className="mt-0.5 block text-xl font-bold leading-snug text-encre transition-colors duration-200 group-hover:text-indigo sm:text-2xl">
                      {court}
                    </span>
                    {detail && <span className="mt-0.5 block text-[15px] text-encre-douce">{detail}</span>}
                    {p.debouche && p.debouche.length > 0 && (
                      <span className="mt-2 block text-[15px] text-encre-douce">
                        <span className="font-semibold text-encre">Débouchés : </span>
                        {p.debouche.slice(0, 3).join(", ")}
                      </span>
                    )}
                  </span>
                  <span
                    aria-hidden
                    className="hidden h-12 w-12 items-center justify-center rounded-full border border-trait text-indigo transition-colors duration-200 group-hover:border-indigo group-hover:bg-indigo group-hover:text-white sm:flex"
                  >
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        {filtres.length > LIGNES_VISIBLES && !toutVoir && (
          <button
            type="button"
            onClick={() => setToutVoir(true)}
            className="mt-6 inline-flex min-h-12 items-center rounded-full border border-indigo px-6 font-bold text-indigo transition-colors duration-200 hover:bg-indigo hover:text-white"
          >
            Voir les {filtres.length - LIGNES_VISIBLES} autres formations
          </button>
        )}

        {(niveau === "all" || niveau === "master") && (
          <div data-reveal className="mt-14">
            <VideoMaster src="/assets/video/master.mp4" title="Présentation du Master UPB" description="Découvrez nos formations Master et les opportunités offertes par l'UPB." />
          </div>
        )}

        <div className="mt-12 text-center">
          <Link
            href="/formation"
            className="group inline-flex h-13 items-center justify-center gap-2 rounded-full bg-indigo px-8 font-semibold text-white transition-colors duration-200 hover:bg-indigo-deep"
          >
            Voir toutes nos formations
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProgrammesPage;
