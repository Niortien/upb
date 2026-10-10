"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Planche } from "@/components/common/planche";
import { Reperes } from "@/components/common/reperes";
import { useReveal } from "@/hooks/use-reveal";

const figures = [
  { src: "/assets/image/home/campus/2O4A6842.webp", alt: "Allée du campus entre les bâtiments principaux", legende: "Bâtiment principal", classe: "lg:col-span-7 lg:row-span-2 aspect-[4/3] lg:aspect-auto" },
  { src: "/assets/image/home/star/laboratoire.jpg", alt: "Étudiants au travail dans un laboratoire scientifique", legende: "Laboratoires", classe: "lg:col-span-5 aspect-[16/10]" },
  { src: "/assets/image/home/star/salle1.jpg", alt: "Salle de cours moderne", legende: "Salles modernes", classe: "lg:col-span-5 aspect-[16/10]" },
];

const legende = [
  { titre: "Infrastructures modernes", texte: "Laboratoires, bibliothèque numérique et espaces collaboratifs de pointe." },
  { titre: "Vie étudiante dynamique", texte: "Plus de 10 clubs et associations pour enrichir votre parcours." },
  { titre: "Localisation idéale", texte: "À Bingerville, un cadre naturel accessible depuis Abidjan." },
  { titre: "Environnement inspirant", texte: "Espaces verts, architecture moderne et design contemporain." },
];

const CampusSection = () => {
  const racine = useRef<HTMLElement>(null);
  useReveal(racine);

  return (
    <section ref={racine} aria-labelledby="campus-titre" className="fond-papier">
      <div className="container mx-auto px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16">
          <Planche repere="PL. 02" legende="Plan de masse" id="campus-titre" titre="Un cadre d'excellence au cœur de Bingerville." largeur="18ch" />
          <p data-reveal className="max-w-[46ch] text-lg leading-relaxed text-encre-douce lg:pb-2">
            Un campus qui allie tradition académique et modernité, conçu pour inspirer et favoriser la réussite de chaque étudiant.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:mt-16 lg:grid-cols-12 lg:grid-rows-2">
          {figures.map((f, i) => (
            <figure key={f.src} className={`relative ${f.classe}`}>
              <div data-reveal-image className="group absolute inset-0 overflow-hidden bg-indigo">
                <Image src={f.src} alt={f.alt} fill sizes="(min-width: 1024px) 55vw, 95vw" className="object-cover transition-transform duration-700 ease-arrivee group-hover:scale-[1.04]" />
              </div>
              <Reperes taille={18} className="text-indigo" />
              <figcaption className="etiquette absolute bottom-0 left-4 flex translate-y-1/2 items-center gap-3 bg-nuit px-3 py-1 text-[11px] text-white">
                <span className="text-laurier">FIG. {String(i + 2).padStart(2, "0")}</span>
                {f.legende}
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-16 border-t-2 border-indigo pt-3">
          <p className="etiquette text-indigo">Légende</p>
          <ul data-reveal-lignes className="mt-4 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
            {legende.map((a, i) => (
              <li key={a.titre} className="flex gap-4">
                <span className="etiquette mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center bg-indigo text-[11px] text-white">{String.fromCharCode(65 + i)}</span>
                <div>
                  <h3 className="text-lg font-semibold text-encre">{a.titre}</h3>
                  <p className="mt-1 leading-relaxed text-encre-douce">{a.texte}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12">
          <Link href="/about" className="group etiquette inline-flex min-h-11 items-center gap-2 text-indigo">
            <span className="lien-souligne">Découvrir tout le campus</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CampusSection;
