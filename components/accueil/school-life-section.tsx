"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useReveal } from "@/hooks/use-reveal";

const onglets = [
  {
    id: "campus",
    label: "Le campus",
    titre: "Un lieu fait pour apprendre.",
    texte:
      "Amphithéâtres, laboratoires informatiques, bibliothèque numérique, espaces verts et zones de coworking : tout est pensé pour favoriser votre réussite.",
    images: ["/assets/image/home/star/salle1.jpg", "/assets/image/home/star/motivation.jpg", "/assets/image/home/campus/campus1.jpg"],
    atouts: ["Amphithéâtres équipés", "Laboratoires informatiques", "Bibliothèque numérique", "Espaces verts"],
    chiffre: "5 000+",
    legende: "étudiants actifs sur le campus chaque jour",
  },
  {
    id: "cite",
    label: "La cité universitaire",
    titre: "Un chez-soi, à deux pas des cours.",
    texte:
      "Confort, sécurité et proximité : chambres modernes, espaces de détente, zones d'étude, restauration et sécurité 24 h/24 pour un environnement équilibré.",
    images: ["/assets/image/cite/cite1.jpg", "/assets/image/cite/cite2.jpg", "/assets/image/cite/cite3.jpg"],
    atouts: ["Chambres modernes", "Restauration", "Sécurité 24 h/24", "Espaces de détente"],
    chiffre: "800+",
    legende: "places disponibles à la cité universitaire",
  },
];

const SchoolLifeSection = () => {
  const racine = useRef<HTMLElement>(null);
  const contenu = useRef<HTMLDivElement>(null);
  const [actif, setActif] = useState(0);
  const o = onglets[actif];
  useReveal(racine);

  // Le changement d'onglet fait glisser le nouveau contenu : on voit qu'on passe d'un lieu à l'autre.
  useGSAP(
    () => {
      if (!contenu.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(
        contenu.current.querySelectorAll("[data-onglet]"),
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.07, ease: "expo.out" }
      );
    },
    { dependencies: [actif], scope: contenu }
  );

  return (
    <section ref={racine} aria-labelledby="vie-titre" className="bg-white">
      <div className="container mx-auto px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
        <h2 id="vie-titre" data-reveal className="titre-upb max-w-[18ch] text-[clamp(2.2rem,4.6vw,4rem)] text-indigo">
          La vie à l&apos;UPB.
        </h2>

        <div role="tablist" aria-label="Lieux de vie" className="mt-8 flex gap-2 border-b border-trait">
          {onglets.map((t, i) => (
            <button
              key={t.id}
              role="tab"
              id={`onglet-${t.id}`}
              aria-selected={i === actif}
              aria-controls={`panneau-${t.id}`}
              tabIndex={i === actif ? 0 : -1}
              onClick={() => setActif(i)}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight") setActif((actif + 1) % onglets.length);
                if (e.key === "ArrowLeft") setActif((actif + onglets.length - 1) % onglets.length);
              }}
              className={`relative min-h-12 px-4 pb-3 pt-2 text-base font-bold transition-colors duration-200 sm:px-6 sm:text-lg ${
                i === actif ? "text-indigo" : "text-encre-douce hover:text-indigo"
              }`}
            >
              {t.label}
              <span
                aria-hidden
                className={`absolute inset-x-0 -bottom-px h-[3px] origin-left bg-laurier transition-transform duration-500 ease-arrivee ${i === actif ? "scale-x-100" : "scale-x-0"}`}
              />
            </button>
          ))}
        </div>

        <div
          ref={contenu}
          role="tabpanel"
          id={`panneau-${o.id}`}
          aria-labelledby={`onglet-${o.id}`}
          className="mt-10 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16"
        >
          <div data-onglet className="grid h-[22rem] grid-cols-2 grid-rows-2 gap-3 sm:h-[30rem]">
            {o.images.map((src, i) => (
              <div key={src} className={`relative overflow-hidden rounded-2xl bg-indigo ${i === 0 ? "row-span-2" : ""}`}>
                <Image src={src} alt="" fill sizes="(min-width: 1024px) 28vw, 45vw" className="object-cover" />
              </div>
            ))}
          </div>

          <div className="flex flex-col justify-center">
            <h3 data-onglet className="titre-upb text-3xl text-encre sm:text-4xl">{o.titre}</h3>
            <p data-onglet className="mt-4 max-w-[48ch] text-lg leading-relaxed text-encre-douce">{o.texte}</p>
            <ul data-onglet className="mt-6 grid gap-x-6 gap-y-2 sm:grid-cols-2">
              {o.atouts.map((a) => (
                <li key={a} className="flex items-center gap-2.5 font-semibold text-encre">
                  <span aria-hidden className="h-2 w-2 rounded-full bg-laurier" />
                  {a}
                </li>
              ))}
            </ul>
            <p data-onglet className="mt-8 border-t border-trait pt-6">
              <span className="chiffre-upb block text-5xl text-indigo">{o.chiffre}</span>
              <span className="mt-1 block text-encre-douce">{o.legende}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SchoolLifeSection;
