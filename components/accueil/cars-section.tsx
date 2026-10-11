"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Bus, MapPin, Shield, Wifi } from "lucide-react";
import { Planche } from "@/components/common/planche";
import { Reperes } from "@/components/common/reperes";
import { useReveal } from "@/hooks/use-reveal";

gsap.registerPlugin(ScrollTrigger);

const stations = ["Yopougon", "Abobo", "Santaï", "Adjamé", "Cocody", "Bingerville"];

const confort = [
  { icon: Wifi, label: "Wi-Fi à bord" },
  { icon: Shield, label: "Voyage sécurisé" },
  { icon: Bus, label: "60 places" },
  { icon: MapPin, label: "GPS en temps réel" },
];

const chiffres = [
  { valeur: "12+", libelle: "zones desservies" },
  { valeur: "500+", libelle: "étudiants par jour" },
  { valeur: "0 CFA", libelle: "pour les résidents" },
];

/**
 * Le transport, comme un schéma de ligne : les communes sont des stations, le campus est le terminus.
 * Au défilement, la ligne se trace, le car (repère or, grand écran) la parcourt et chaque station s'allume à son passage ;
 * sur téléphone la ligne verticale se trace de la même façon. Sans « réduire les animations », la ligne reste complète.
 */
const CarsSection = () => {
  const racine = useRef<HTMLElement>(null);
  useReveal(racine);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const reduit = "(prefers-reduced-motion: no-preference)";

      /** Ligne tracée au défilement, stations allumées à mesure (la dernière, le campus, claque en fin de course). */
      const tracer = (ligne: string, axe: "scaleX" | "scaleY", avecCar: boolean) => {
        const marques = gsap.utils.toArray<HTMLElement>("[data-station]", racine.current);
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: "[data-ligne]", start: "top 78%", end: "bottom 45%", scrub: 0.7 },
        });
        tl.fromTo(ligne, { [axe]: 0 }, { [axe]: 1, duration: 1 }, 0);
        if (avecCar) tl.fromTo("[data-car]", { left: "0%" }, { left: "100%", duration: 1 }, 0);
        marques.forEach((m, k) => {
          const t = marques.length > 1 ? k / (marques.length - 1) : 0;
          tl.fromTo(m, { scale: 0.35, backgroundColor: "#ffffff" }, { scale: 1, backgroundColor: "#f7b500", duration: 0.08, ease: "back.out(3)" }, Math.max(0, t - 0.04));
        });
      };

      mm.add(`(min-width: 1024px) and ${reduit}`, () => tracer("[data-trait-h]", "scaleX", true));
      mm.add(`(max-width: 1023px) and ${reduit}`, () => tracer("[data-trait-v]", "scaleY", false));
      return () => mm.revert();
    },
    { scope: racine }
  );

  return (
    <section ref={racine} aria-labelledby="transport-titre" className="fond-papier">
      <div className="container mx-auto grid gap-12 px-5 py-20 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-20 lg:px-8 lg:py-28">
        <div className="grid grid-cols-5 gap-5">
          <figure className="relative col-span-3">
            <div data-reveal-image className="relative aspect-[3/4] overflow-hidden bg-indigo">
              <Image src="/assets/image/cite/car.jpg" alt="Le car universitaire Confort+ garé devant le campus" fill sizes="(min-width: 1024px) 28vw, 60vw" className="object-cover" />
            </div>
            <Reperes taille={16} className="text-indigo" />
            <figcaption className="etiquette mt-3 text-[11px] text-encre-douce">
              <span className="text-indigo">FIG. 05</span> · Car Confort+
            </figcaption>
          </figure>
          <figure className="relative col-span-2 mt-12">
            <div data-reveal-image className="relative aspect-[2/3] overflow-hidden bg-indigo">
              <Image src="/assets/image/home/car-upb.jpg" alt="Un bus aux couleurs de l'UPB" fill sizes="(min-width: 1024px) 20vw, 40vw" className="object-cover" />
            </div>
            <Reperes taille={16} className="text-indigo" />
            <figcaption className="etiquette mt-3 text-[11px] text-encre-douce">
              <span className="text-indigo">FIG. 06</span> · Bus UPB
            </figcaption>
          </figure>
        </div>

        <div>
          <Planche repere="PL. 04" legende="Réseau de transport" id="transport-titre" titre="Vos déplacements, notre priorité." largeur="14ch" />
          <p data-reveal className="mt-6 max-w-[48ch] text-lg leading-relaxed text-encre-douce">
            Un service de transport sécurisé et moderne depuis plusieurs communes d&apos;Abidjan : sièges rembourrés, climatisation, Wi-Fi et prises USB, pour des trajets confortables et productifs.
          </p>

          {/* Schéma de ligne : vertical sur téléphone, horizontal sur grand écran. */}
          <div data-reveal className="mt-10">
            <p className="etiquette text-indigo">Ligne UPB · 6 stations</p>
            <ol data-ligne className="relative mt-6 flex flex-col gap-5 lg:flex-row lg:justify-between lg:gap-0 lg:pt-1">
              <span aria-hidden data-trait-v className="absolute bottom-2 left-[5px] top-2 w-[2px] origin-top bg-indigo lg:hidden" />
              <span aria-hidden data-trait-h className="absolute left-0 right-0 top-[9px] hidden h-[2px] origin-left bg-indigo lg:block" />
              <span aria-hidden data-car className="absolute top-[3px] z-10 hidden h-3.5 w-3.5 -translate-x-1/2 bg-laurier outline outline-2 outline-nuit lg:block" />
              {stations.map((s, i) => {
                const terminus = i === stations.length - 1;
                return (
                  <li key={s} className="relative flex items-center gap-4 lg:flex-col lg:items-center lg:gap-3">
                    <span
                      aria-hidden
                      data-station
                      className={`relative z-[1] block shrink-0 border-2 border-indigo ${terminus ? "h-4 w-4 bg-laurier" : "h-3 w-3 bg-white"} lg:mt-0.5`}
                    />
                    <span className={`etiquette text-[12px] ${terminus ? "font-semibold text-indigo" : "text-encre"}`}>
                      {s}
                      {terminus && <span className="ml-2 bg-indigo px-1.5 py-0.5 text-[10px] text-white lg:ml-0 lg:mt-1 lg:block">Campus</span>}
                    </span>
                  </li>
                );
              })}
            </ol>
            <p className="mt-6 text-sm text-encre-douce">… et d&apos;autres communes d&apos;Abidjan.</p>
          </div>

          <ul data-reveal-lignes className="mt-8 grid grid-cols-2 gap-x-6">
            {confort.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-3 border-t border-indigo/25 py-3 font-semibold text-encre">
                <Icon className="h-5 w-5 text-indigo" aria-hidden />
                {label}
              </li>
            ))}
          </ul>

          <dl data-reveal className="mt-8 grid grid-cols-3 border-t-2 border-indigo pt-6">
            {chiffres.map((c) => (
              <div key={c.libelle} className="pr-2 [&:not(:first-child)]:border-l [&:not(:first-child)]:border-indigo/25 [&:not(:first-child)]:pl-4">
                <dd className="chiffre-upb text-2xl text-indigo sm:text-4xl">{c.valeur}</dd>
                <dt className="etiquette mt-1 text-[11px] text-encre-douce">{c.libelle}</dt>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};

export default CarsSection;
