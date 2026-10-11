"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Planche } from "@/components/common/planche";
import { Reperes } from "@/components/common/reperes";
import { useReveal } from "@/hooks/use-reveal";

const exigences = [
  { ref: "A.01", stat: "Top 10", titre: "Excellence reconnue", texte: "Classée parmi les meilleures universités de Côte d'Ivoire." },
  { ref: "A.02", stat: "10+", titre: "Vie associative", texte: "Plus de 10 clubs actifs couvrant divers intérêts professionnels." },
  { ref: "A.03", stat: "100 %", titre: "Ordinateurs offerts", texte: "Un accès équitable à la technologie, avec le Wi-Fi haut débit sur tout le campus." },
  { ref: "A.04", stat: "65 %", titre: "Employabilité", texte: "Des diplômés qui trouvent un emploi dans les six premiers mois." },
  { ref: "A.05", stat: "5+ pays", titre: "Ouverture internationale", texte: "Des partenariats avec des entreprises et des institutions à travers l'Afrique." },
  { ref: "A.06", stat: "1 / 15", titre: "Accompagnement", texte: "Un système de parrainage pour un suivi personnalisé tout au long du cursus." },
];

const mesures = [
  { valeur: 7, suffixe: "+", libelle: "années d'excellence" },
  { valeur: 5000, suffixe: "+", libelle: "étudiants actifs" },
  { valeur: 15, suffixe: "+", libelle: "professeurs experts" },
  { valeur: 5, suffixe: "+", libelle: "pays représentés" },
];

gsap.registerPlugin(useGSAP, ScrollTrigger);

const WhyChooseSection = () => {
  const racine = useRef<HTMLElement>(null);
  useReveal(racine);

  // Lecture au défilement : la ligne qui traverse le milieu de l'écran s'allume (barre dorée qui se déploie).
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>("[data-exigence]", racine.current).forEach((ligne) => {
          const barre = ligne.querySelector<HTMLElement>("[data-barre]");
          if (!barre) return;
          ScrollTrigger.create({
            trigger: ligne,
            start: "top 62%",
            end: "bottom 38%",
            onToggle: (self) => gsap.to(barre, { scaleY: self.isActive ? 1 : 0, duration: 0.45, ease: "expo.out", overwrite: true }),
          });
        });
      });
      return () => mm.revert();
    },
    { scope: racine }
  );

  return (
    <section ref={racine} aria-labelledby="pourquoi-titre">
      <div className="fond-papier">
        <div className="container mx-auto px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
          <Planche repere="PL. 01" legende="Cahier des charges" id="pourquoi-titre" titre="Une université qui fait la différence." largeur="16ch" />

          <div className="mt-12 grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <figure className="lg:sticky lg:top-24 lg:self-start">
              <div data-reveal-image className="relative aspect-[4/5] bg-indigo p-0">
                <Image
                  src="/assets/image/home/campus/2O4A6842.webp"
                  alt="Étudiants en toge devant les bâtiments du campus, le drapeau ivoirien flottant au centre"
                  fill
                  sizes="(min-width: 1024px) 38vw, 90vw"
                  className="object-cover"
                />
              </div>
              <Reperes taille={20} className="text-indigo" />
              <figcaption className="etiquette mt-3 flex items-center gap-3 text-encre-douce">
                <span className="text-indigo">FIG. 01</span>
                <span aria-hidden className="h-px flex-1 bg-indigo/30" />
                Campus de Bingerville
              </figcaption>
            </figure>

            <ul data-reveal-lignes className="border-t-2 border-indigo">
              {exigences.map((e) => (
                <li
                  key={e.ref}
                  data-exigence
                  className="group relative grid items-baseline gap-x-5 gap-y-1 border-b border-indigo/25 px-1 py-6 transition-colors duration-200 hover:bg-indigo hover:text-white sm:grid-cols-[4rem_1fr_9rem] sm:px-3"
                >
                  <span aria-hidden data-barre className="absolute inset-y-0 left-0 w-1 origin-top scale-y-0 bg-laurier" />
                  <span className="etiquette text-indigo group-hover:text-laurier">{e.ref}</span>
                  <div>
                    <h3 className="text-xl font-semibold text-encre group-hover:text-white">{e.titre}</h3>
                    <p className="mt-1 max-w-[50ch] leading-relaxed text-encre-douce group-hover:text-white/85">{e.texte}</p>
                  </div>
                  <span className="chiffre-upb mt-2 text-3xl text-indigo group-hover:text-laurier sm:mt-0 sm:text-right sm:text-4xl">{e.stat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="fond-plan text-white">
        <dl data-reveal-lignes className="container mx-auto grid grid-cols-2 px-5 sm:px-6 lg:grid-cols-4 lg:px-8">
          {mesures.map((m, i) => (
            <div key={m.libelle} className="border-white/25 py-9 pr-4 odd:border-r lg:border-r lg:py-12 lg:pl-8 lg:first:pl-0 lg:last:border-r-0">
              <p className="etiquette flex items-center gap-2 text-laurier">
                <span>MESURE {String(i + 1).padStart(2, "0")}</span>
                <span aria-hidden data-trait className="h-px flex-1 origin-left bg-laurier/60" />
              </p>
              <dd className="chiffre-upb mt-3 text-[clamp(2.6rem,5vw,4.4rem)] leading-none text-white">
                <span data-compteur={m.valeur} data-suffixe={m.suffixe}>
                  {m.valeur.toLocaleString("fr-FR")}
                  {m.suffixe}
                </span>
              </dd>
              <dt className="mt-2 text-white/75">{m.libelle}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default WhyChooseSection;
