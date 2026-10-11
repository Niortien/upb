"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { Planche } from "@/components/common/planche";
import { useReveal } from "@/hooks/use-reveal";

gsap.registerPlugin(SplitText);

const temoignages = [
  {
    nom: "Kouadio Jean",
    programme: "Master en Intelligence Artificielle",
    citation:
      "L'université m'a offert des opportunités exceptionnelles. Les professeurs sont passionnés et l'environnement favorise l'innovation. J'ai décroché un stage grâce au réseau d'anciens élèves.",
  },
  {
    nom: "Anon Axel",
    programme: "Licence en ASSRI",
    citation:
      "Les installations sont modernes et le campus est vibrant. J'ai apprécié les projets pratiques qui m'ont préparé au monde professionnel dès la première année.",
  },
  {
    nom: "Amina Traoré",
    programme: "Licence en MIAGE",
    citation:
      "L'approche pédagogique axée sur les projets m'a permis de développer des compétences concrètes. La diversité culturelle sur le campus est un vrai plus.",
  },
];

/** Les témoignages comme des rapports d'essai : un cadre, un numéro, et un tampon « conforme ». */
const TestimonialsSection = () => {
  const racine = useRef<HTMLElement>(null);
  const rapport = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);
  const t = temoignages[i];
  useReveal(racine);

  useGSAP(
    () => {
      if (!rapport.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const citation = rapport.current.querySelector<HTMLElement>("[data-citation]");
      if (citation) {
        // Le blockquote est recréé à chaque témoignage (key) : SplitText n'agit jamais sur un texte que React va remplacer.
        SplitText.create(citation, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit(self) {
            self.masks.forEach((m) => {
              if (m instanceof HTMLElement) Object.assign(m.style, { paddingBottom: "0.15em", marginBottom: "-0.15em" });
            });
            return gsap.from(self.lines, { yPercent: 110, duration: 0.9, stagger: 0.09, ease: "expo.out" });
          },
        });
      }
      gsap.fromTo(rapport.current.querySelectorAll("[data-meta]"), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.3, stagger: 0.08, ease: "expo.out" });
      gsap.fromTo(rapport.current.querySelector("[data-tampon]"), { opacity: 0, scale: 1.7, rotate: -18 }, { opacity: 1, scale: 1, rotate: -8, duration: 0.5, delay: 0.35, ease: "back.out(2)" });
    },
    { dependencies: [i], scope: rapport }
  );

  return (
    <section ref={racine} aria-labelledby="temoignages-titre" className="fond-plan text-white">
      <div className="container mx-auto grid gap-10 px-5 py-20 sm:px-6 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16 lg:px-8 lg:py-28">
        <div>
          <Planche repere="PL. 06" legende="Rapports d'essai" id="temoignages-titre" titre="Ils ont choisi l'excellence." sombre largeur="10ch" />
          <div role="group" aria-label="Choisir un témoignage" data-reveal-lignes className="mt-8 flex flex-wrap gap-2 lg:flex-col lg:items-start">
            {temoignages.map((x, k) => (
              <button
                key={x.nom}
                type="button"
                aria-pressed={k === i}
                onClick={() => setI(k)}
                className={`etiquette min-h-11 border px-4 text-[12px] transition-colors duration-200 ${
                  k === i ? "border-laurier bg-laurier text-nuit" : "border-white/40 text-white hover:bg-white/10"
                }`}
              >
                Essai {String(k + 1).padStart(2, "0")} · {x.nom}
              </button>
            ))}
          </div>
        </div>

        <figure ref={rapport} aria-live="polite" className="relative border border-white/40 bg-nuit/60 p-6 sm:p-10">
          <p className="etiquette flex items-center gap-3 border-b border-white/25 pb-3 text-[11px] text-laurier">
            <span>Rapport d&apos;essai n° {String(i + 1).padStart(2, "0")}</span>
            <span aria-hidden className="h-px flex-1 bg-white/25" />
            <span className="text-white/75">{t.programme}</span>
          </p>
          <blockquote key={i} data-citation className="mt-6 max-w-[34ch] text-[clamp(1.4rem,2.6vw,2.1rem)] font-semibold leading-snug">
            « {t.citation} »
          </blockquote>
          <figcaption className="mt-8 flex flex-wrap items-end justify-between gap-6">
            <span>
              <span data-meta className="block text-lg font-bold">{t.nom}</span>
              <span data-meta className="text-white/75">{t.programme}</span>
            </span>
            <span
              data-tampon
              aria-hidden
              className="titre-pochoir inline-block -rotate-[8deg] border-[3px] border-laurier px-4 py-1 text-3xl text-laurier"
            >
              Conforme
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
};

export default TestimonialsSection;
