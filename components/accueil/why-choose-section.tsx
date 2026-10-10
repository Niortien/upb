"use client";

import { useRef } from "react";
import Image from "next/image";
import { useReveal } from "@/hooks/use-reveal";

const raisons = [
  { stat: "Top 10", titre: "Excellence reconnue", texte: "Classée parmi les meilleures universités de Côte d'Ivoire." },
  { stat: "10+", titre: "Vie associative", texte: "Plus de 10 clubs actifs couvrant divers intérêts professionnels." },
  { stat: "100 %", titre: "Ordinateurs offerts", texte: "Un accès équitable à la technologie, avec le Wi-Fi haut débit sur tout le campus." },
  { stat: "65 %", titre: "Employabilité", texte: "Des diplômés qui trouvent un emploi dans les six premiers mois." },
  { stat: "5+ pays", titre: "Ouverture internationale", texte: "Des partenariats avec des entreprises et des institutions à travers l'Afrique." },
  { stat: "1 pour 15", titre: "Accompagnement", texte: "Un système de parrainage pour un suivi personnalisé tout au long du cursus." },
];

const chiffres = [
  { valeur: 7, suffixe: "+", libelle: "années d'excellence" },
  { valeur: 5000, suffixe: "+", libelle: "étudiants actifs" },
  { valeur: 15, suffixe: "+", libelle: "professeurs experts" },
  { valeur: 5, suffixe: "+", libelle: "pays représentés" },
];

const WhyChooseSection = () => {
  const racine = useRef<HTMLElement>(null);
  useReveal(racine);

  return (
    <section ref={racine} aria-labelledby="pourquoi-titre" className="bg-white">
      <div className="container mx-auto grid gap-12 px-5 py-20 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-8 lg:py-28">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 id="pourquoi-titre" data-reveal className="titre-upb text-[clamp(2.2rem,4.6vw,4rem)] text-indigo">
            Une université qui fait la différence.
          </h2>
          <p data-reveal className="mt-5 max-w-[42ch] text-lg leading-relaxed text-encre-douce">
            Ce qui nous distingue, des milliers d&apos;étudiants le vivent chaque année, sur un campus pensé pour la réussite.
          </p>
          <div data-reveal-image className="relative mt-9 aspect-[4/3] overflow-hidden rounded-3xl bg-indigo">
            <Image
              src="/assets/image/home/campus/2O4A6842.webp"
              alt="Étudiants en toge devant les bâtiments du campus, le drapeau ivoirien flottant au centre"
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
            />
          </div>
        </div>

        <ul data-reveal-lignes className="divide-y divide-trait border-y border-trait">
          {raisons.map((r) => (
            <li key={r.titre} className="grid items-baseline gap-x-8 gap-y-1 py-7 sm:grid-cols-[10rem_1fr]">
              <span className="chiffre-upb text-3xl text-indigo sm:text-[2rem]">{r.stat}</span>
              <div>
                <h3 className="text-xl font-bold text-encre">{r.titre}</h3>
                <p className="mt-1.5 max-w-[52ch] leading-relaxed text-encre-douce">{r.texte}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-nuit text-white">
        <dl className="container mx-auto grid grid-cols-2 px-5 sm:px-6 lg:grid-cols-4 lg:px-8">
          {chiffres.map((c) => (
            <div key={c.libelle} className="border-white/10 py-10 pr-4 odd:border-r lg:border-r lg:py-14 lg:pl-8 lg:first:pl-0 lg:last:border-r-0">
              <dd className="chiffre-upb text-[clamp(2.4rem,4.4vw,3.6rem)] text-laurier">
                <span data-compteur={c.valeur} data-suffixe={c.suffixe}>
                  {c.valeur.toLocaleString("fr-FR")}
                  {c.suffixe}
                </span>
              </dd>
              <dt className="mt-1 text-white/70">{c.libelle}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default WhyChooseSection;
