"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";

const lieux = [
  { src: "/assets/image/home/campus/2O4A6842.webp", alt: "Allée du campus entre les bâtiments principaux", titre: "Bâtiment principal", classe: "lg:col-span-7 lg:row-span-2 aspect-[4/3] lg:aspect-auto" },
  { src: "/assets/image/home/star/laboratoire.jpg", alt: "Étudiants au travail dans un laboratoire scientifique", titre: "Laboratoires", classe: "lg:col-span-5 aspect-[16/10]" },
  { src: "/assets/image/home/star/salle1.jpg", alt: "Salle de cours moderne", titre: "Salles modernes", classe: "lg:col-span-5 aspect-[16/10]" },
];

const atouts = [
  { titre: "Infrastructures modernes", texte: "Laboratoires, bibliothèque numérique et espaces collaboratifs de pointe." },
  { titre: "Vie étudiante dynamique", texte: "Plus de 10 clubs et associations pour enrichir votre parcours." },
  { titre: "Localisation idéale", texte: "À Bingerville, un cadre naturel accessible depuis Abidjan." },
  { titre: "Environnement inspirant", texte: "Espaces verts, architecture moderne et design contemporain." },
];

const CampusSection = () => {
  const racine = useRef<HTMLElement>(null);
  useReveal(racine);

  return (
    <section ref={racine} aria-labelledby="campus-titre" className="bg-craie">
      <div className="container mx-auto px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16">
          <h2 id="campus-titre" data-reveal className="titre-upb text-[clamp(2.2rem,4.6vw,4rem)] text-indigo">
            Un cadre d&apos;excellence au cœur de Bingerville.
          </h2>
          <p data-reveal className="max-w-[46ch] text-lg leading-relaxed text-encre-douce lg:pb-2">
            Un campus qui allie tradition académique et modernité, conçu pour inspirer et favoriser la réussite de chaque étudiant.
          </p>
        </div>

        <div className="mt-12 grid gap-4 lg:mt-16 lg:grid-cols-12 lg:grid-rows-2">
          {lieux.map((l) => (
            <figure key={l.src} data-reveal-image className={`group relative overflow-hidden rounded-3xl bg-indigo ${l.classe}`}>
              <Image src={l.src} alt={l.alt} fill sizes="(min-width: 1024px) 55vw, 95vw" className="object-cover transition-transform duration-700 ease-arrivee group-hover:scale-[1.04]" />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-nuit/85 to-transparent p-5 pt-14 text-lg font-bold text-white">
                {l.titre}
              </figcaption>
            </figure>
          ))}
        </div>

        <ul data-reveal-lignes className="mt-14 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {atouts.map((a) => (
            <li key={a.titre} className="border-t-2 border-laurier pt-4">
              <h3 className="text-lg font-bold text-encre">{a.titre}</h3>
              <p className="mt-1.5 leading-relaxed text-encre-douce">{a.texte}</p>
            </li>
          ))}
        </ul>

        <div className="mt-12">
          <Link href="/about" className="group inline-flex min-h-11 items-center gap-2 font-bold text-indigo">
            <span className="lien-souligne">Découvrir tout le campus</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CampusSection;
