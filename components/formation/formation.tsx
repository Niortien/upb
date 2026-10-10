"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowUpRight, Search } from "lucide-react";
import { CtaFinal } from "@/components/common/cta-final";
import { PageHero } from "@/components/common/page-hero";
import { programmes } from "@/data/programme.data";
import { useReveal } from "@/hooks/use-reveal";
import { WHATSAPP_URL } from "@/lib/constants";
import { NIVEAUX, scinderTitre, type NiveauProgramme } from "@/lib/programmes";

type Filtre = "tous" | NiveauProgramme;

/** Retire les accents et la casse pour que « ingenierie » trouve « Ingénierie ». */
const normaliser = (t: string) => t.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

export default function Formation() {
  const racine = useRef<HTMLDivElement>(null);
  const liste = useRef<HTMLDivElement>(null);
  const [filtre, setFiltre] = useState<Filtre>("tous");
  const [recherche, setRecherche] = useState("");
  useReveal(racine);

  const resultats = useMemo(() => {
    const q = normaliser(recherche.trim());
    return programmes.filter(
      (p) => (filtre === "tous" || p.niveau === filtre) && (!q || normaliser(`${p.title} ${p.description}`).includes(q))
    );
  }, [filtre, recherche]);

  // À chaque changement de filtre, les cartes se redessinent en cascade.
  useGSAP(
    () => {
      if (!liste.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(liste.current.querySelectorAll("[data-carte]"), { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.04, ease: "expo.out" });
    },
    { dependencies: [filtre, recherche], scope: liste }
  );

  return (
    <div ref={racine}>
      <PageHero
        variante="arche"
        lignes={["Nos", "formations."]}
        intro={`${programmes.length} programmes d'excellence, de la licence au doctorat. Construisez l'avenir que vous méritez.`}
        image={{ src: "/assets/image/home/star/laboratoire.jpg", alt: "Étudiantes en blouse blanche en travaux pratiques de laboratoire", position: "center 45%" }}
      />

      <section aria-label="Liste des formations" className="bg-craie pb-24 lg:pb-32">
        <div className="sticky top-20 z-30 border-y border-trait bg-craie/95 backdrop-blur-md">
          <div className="container mx-auto flex flex-col gap-3 px-5 py-3 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
            <div role="group" aria-label="Filtrer par niveau" className="flex flex-wrap gap-2">
              {[{ id: "tous" as const, label: "Toutes", diplome: "" }, ...NIVEAUX].map((n) => {
                const actif = filtre === n.id;
                return (
                  <button
                    key={n.id}
                    type="button"
                    aria-pressed={actif}
                    onClick={() => setFiltre(n.id)}
                    className={`min-h-11 rounded-full border px-5 text-[15px] font-bold transition-colors duration-200 ${
                      actif ? "border-indigo bg-indigo text-white" : "border-trait bg-white text-encre hover:border-indigo hover:text-indigo"
                    }`}
                  >
                    {n.label}{" "}
                    {n.diplome && <span className={`font-semibold ${actif ? "text-white/70" : "text-encre-douce"}`}>{n.diplome}</span>}
                  </button>
                );
              })}
            </div>
            <label className="relative block md:w-72">
              <span className="sr-only">Rechercher une formation</span>
              <Search aria-hidden className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-encre-douce" />
              <input
                type="search"
                value={recherche}
                onChange={(e) => setRecherche(e.target.value)}
                placeholder="Rechercher une formation"
                className="h-11 w-full rounded-full border border-trait bg-white pl-10 pr-4 text-[15px] text-encre outline-none transition-colors placeholder:text-encre-douce focus:border-indigo"
              />
            </label>
          </div>
        </div>

        <div className="container mx-auto px-5 pt-8 sm:px-6 lg:px-8">
          <p className="text-sm text-encre-douce" aria-live="polite">
            {resultats.length} formation{resultats.length > 1 ? "s" : ""}
          </p>

          <div ref={liste} className="mt-6">
            {NIVEAUX.map((n) => {
              const groupe = resultats.filter((p) => p.niveau === n.id);
              if (groupe.length === 0) return null;
              return (
                <div key={n.id} className="mb-16 last:mb-0">
                  <h2 className="titre-upb flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-trait pb-4 text-3xl text-indigo sm:text-4xl">
                    {n.label}
                    <span className="text-lg font-semibold text-laurier-fonce">{n.diplome}</span>
                  </h2>
                  <ul className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                    {groupe.map((p) => {
                      const { court, detail } = scinderTitre(p.title);
                      return (
                        <li key={p.id} data-carte>
                          <Link href={`/formation-detail/${p.id}`} className="group block">
                            <span className="relative block aspect-[4/3] overflow-hidden rounded-2xl bg-indigo">
                              <Image
                                src={p.img}
                                alt=""
                                fill
                                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 95vw"
                                className="object-cover object-top transition-transform duration-700 ease-arrivee group-hover:scale-[1.05]"
                              />
                              <span
                                aria-hidden
                                className="absolute bottom-3 right-3 flex h-11 w-11 items-center justify-center rounded-full bg-white text-indigo shadow-md transition-colors duration-200 group-hover:bg-laurier"
                              >
                                <ArrowUpRight className="h-5 w-5" />
                              </span>
                            </span>
                            <span className="mt-4 block text-xl font-bold leading-snug text-encre transition-colors duration-200 group-hover:text-indigo">
                              {court}
                            </span>
                            {detail && <span className="mt-0.5 block text-[15px] text-encre-douce">{detail}</span>}
                            <span className="mt-2 line-clamp-2 block leading-relaxed text-encre-douce">{p.description}</span>
                            {p.debouche && p.debouche.length > 0 && (
                              <span className="mt-3 block text-[15px] text-encre-douce">
                                <span className="font-semibold text-encre">Débouchés : </span>
                                {p.debouche.slice(0, 3).join(", ")}
                              </span>
                            )}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}

            {resultats.length === 0 && (
              <div className="py-16 text-center">
                {recherche.trim() ? (
                  <>
                    <p className="titre-upb text-2xl text-indigo">Aucune formation ne correspond.</p>
                    <p className="mt-2 text-encre-douce">Essayez un autre mot, ou affichez tous les niveaux.</p>
                  </>
                ) : (
                  <>
                    <p className="titre-upb text-2xl text-indigo">Pas encore de formation à ce niveau.</p>
                    <p className="mt-2 text-encre-douce">Les programmes arrivent bientôt. Découvrez en attendant les autres niveaux.</p>
                  </>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setFiltre("tous");
                    setRecherche("");
                  }}
                  className="mt-6 min-h-11 rounded-full border border-indigo px-6 font-bold text-indigo transition-colors hover:bg-indigo hover:text-white"
                >
                  Tout afficher
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <CtaFinal
        titre="Votre avenir commence ici."
        texte="Inscriptions ouvertes pour 2025-2026. Rejoignez les 3000+ étudiants qui font confiance à l'UPB."
        actions={[
          { label: "Candidater maintenant", href: "/contact" },
          { label: "Parler à un conseiller", href: WHATSAPP_URL, externe: true, style: "contour" },
        ]}
      />
    </div>
  );
}
