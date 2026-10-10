"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useReveal } from "@/hooks/use-reveal";

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

const TestimonialsSection = () => {
  const racine = useRef<HTMLElement>(null);
  const citation = useRef<HTMLQuoteElement>(null);
  const [i, setI] = useState(0);
  const t = temoignages[i];
  useReveal(racine);

  useGSAP(
    () => {
      if (!citation.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(citation.current, { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.8, ease: "expo.out" });
    },
    { dependencies: [i], scope: citation }
  );

  return (
    <section ref={racine} aria-labelledby="temoignages-titre" className="bg-indigo text-white">
      <div className="container mx-auto grid gap-10 px-5 py-20 sm:px-6 lg:grid-cols-[0.55fr_1.45fr] lg:gap-20 lg:px-8 lg:py-28">
        <div>
          <h2 id="temoignages-titre" data-reveal className="titre-upb text-[clamp(2rem,3.6vw,3rem)] text-white">
            Ils ont choisi l&apos;excellence.
          </h2>
          <div role="group" aria-label="Choisir un témoignage" className="mt-8 flex flex-wrap gap-2 lg:flex-col lg:items-start">
            {temoignages.map((x, k) => (
              <button
                key={x.nom}
                type="button"
                aria-pressed={k === i}
                onClick={() => setI(k)}
                className={`min-h-11 rounded-full px-5 text-[15px] font-bold transition-colors duration-200 ${
                  k === i ? "bg-laurier text-nuit" : "border border-white/25 text-white hover:bg-white/10"
                }`}
              >
                {x.nom}
              </button>
            ))}
          </div>
        </div>

        <figure aria-live="polite">
          <blockquote ref={citation}>
            <span aria-hidden className="titre-upb block text-[6rem] leading-[0.6] text-laurier">&ldquo;</span>
            <p className="max-w-[34ch] text-[clamp(1.5rem,2.9vw,2.4rem)] font-semibold leading-snug text-white">{t.citation}</p>
            <figcaption className="mt-8 border-t border-white/20 pt-5">
              <span className="block text-lg font-bold">{t.nom}</span>
              <span className="text-white/70">{t.programme}</span>
            </figcaption>
          </blockquote>
        </figure>
      </div>
    </section>
  );
};

export default TestimonialsSection;
