"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Planche } from "@/components/common/planche";
import { Reperes } from "@/components/common/reperes";
import { useReveal } from "@/hooks/use-reveal";

const onglets = [
  {
    id: "campus",
    lettre: "A",
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
    lettre: "B",
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

  // Le changement de vue fait glisser le nouveau contenu : on voit qu'on passe d'une coupe à l'autre.
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
    <section ref={racine} aria-labelledby="vie-titre" className="fond-indigo text-white">
      <div className="container mx-auto px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
        <Planche repere="PL. 03" legende="Vue en coupe" id="vie-titre" titre="La vie à l'UPB." sombre largeur="12ch" />

        <div role="tablist" aria-label="Lieux de vie" className="mt-10 flex flex-wrap gap-0 border-b border-white/35">
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
              className={`etiquette relative min-h-12 border border-b-0 px-5 py-3 text-[12px] transition-colors duration-200 ${
                i === actif ? "border-white/35 bg-nuit text-laurier" : "border-transparent text-white/70 hover:text-white"
              }`}
            >
              [{t.lettre}] {t.label}
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
          <div data-onglet className="relative grid h-[22rem] grid-cols-2 grid-rows-2 gap-3 p-3 sm:h-[30rem]">
            {o.images.map((src, i) => (
              <div key={src} className={`relative overflow-hidden bg-nuit ${i === 0 ? "row-span-2" : ""}`}>
                <Image src={src} alt="" fill sizes="(min-width: 1024px) 28vw, 45vw" className="object-cover" />
              </div>
            ))}
            <Reperes taille={20} />
          </div>

          <div className="flex flex-col justify-center">
            <h3 data-onglet className="titre-upb text-4xl text-white sm:text-5xl">{o.titre}</h3>
            <p data-onglet className="mt-4 max-w-[48ch] text-lg leading-relaxed text-white/85">{o.texte}</p>
            <ul data-onglet className="mt-6 grid gap-x-6 sm:grid-cols-2">
              {o.atouts.map((a) => (
                <li key={a} className="flex items-center gap-3 border-t border-white/25 py-3 font-semibold">
                  <span aria-hidden className="etiquette text-laurier">▸</span>
                  {a}
                </li>
              ))}
            </ul>
            <p data-onglet className="mt-8 border-t-2 border-laurier pt-5">
              <span className="chiffre-upb block text-6xl leading-none text-laurier">{o.chiffre}</span>
              <span className="etiquette mt-2 block text-white/80">{o.legende}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SchoolLifeSection;
