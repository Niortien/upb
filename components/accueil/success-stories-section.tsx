"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Laurier } from "@/components/common/laurier";
import { useReveal } from "@/hooks/use-reveal";

const histoires = [
  {
    nom: "Ismaël Bakayoko",
    titre: "Félicité d'honneur de la République de Côte d'Ivoire",
    texte: "Diplômé de notre programme, Ismaël a su allier rigueur académique et engagement civique pour atteindre les plus hautes distinctions nationales.",
    annee: "Promotion 2015",
    image: "/assets/image/home/star/WhatsApp Image 2025-12-07 à 09.49.40_7ef1d2e4.jpg",
    alt: "Ismaël Bakayoko, diplômé de l'UPB, recevant sa distinction",
  },
  {
    nom: "Ismaël Bakayoko",
    titre: "Félicité d'honneur par les autorités de Bingerville",
    texte: "Reconnu par sa commune pour son excellence académique et son impact positif sur la communauté étudiante de l'UPB.",
    annee: "Promotion 2018",
    image: "/assets/image/home/star/WhatsApp Image 2025-12-07 à 09.43.02_7cc72767.jpg",
    alt: "Ismaël Bakayoko lors de la remise de sa distinction à Bingerville",
  },
];

const SuccessStoriesSection = () => {
  const racine = useRef<HTMLElement>(null);
  useReveal(racine);

  return (
    <section ref={racine} aria-labelledby="reussites-titre" className="bg-craie">
      <div className="container mx-auto px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
        <h2 id="reussites-titre" data-reveal className="titre-upb max-w-[20ch] text-[clamp(2.2rem,4.6vw,4rem)] text-indigo">
          Nos diplômés qui changent le monde.
        </h2>
        <p data-reveal className="mt-5 max-w-[50ch] text-lg leading-relaxed text-encre-douce">
          Des parcours d&apos;excellence qui illustrent l&apos;impact de nos formations sur la société, de Bingerville à toute l&apos;Afrique.
        </p>

        <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:gap-8">
          {histoires.map((h) => (
            <article key={h.titre} className="group">
              <div data-reveal-image className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-indigo sm:aspect-[5/4]">
                <Image src={h.image} alt={h.alt} fill sizes="(min-width: 1024px) 45vw, 95vw" className="object-cover transition-transform duration-700 ease-arrivee group-hover:scale-[1.03]" />
              </div>
              <div data-reveal className="mt-5">
                <p className="text-sm font-bold text-laurier-fonce">{h.annee}</p>
                <h3 className="mt-1 text-2xl font-bold leading-snug text-encre">{h.titre}</h3>
                <p className="mt-2 max-w-[52ch] leading-relaxed text-encre-douce">
                  <span className="font-semibold text-encre">{h.nom}. </span>
                  {h.texte}
                </p>
              </div>
            </article>
          ))}
        </div>

        <p data-reveal className="mt-10 max-w-[60ch] border-t border-trait pt-6 text-lg leading-relaxed text-encre-douce">
          <span className="font-bold text-indigo">Diplômés UPB, de 2015 à 2025 : </span>
          présents dans plus de cinq pays d&apos;Afrique, ils contribuent au développement économique et technologique du continent.
        </p>
      </div>

      <div className="relative overflow-hidden bg-nuit text-white">
        <Laurier className="pointer-events-none absolute -right-24 top-1/2 hidden w-[34rem] -translate-y-1/2 opacity-[0.14] lg:block" />
        <div className="container relative mx-auto px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
          <h2 data-reveal className="titre-upb max-w-[16ch] text-[clamp(2.4rem,5.4vw,4.6rem)]">
            Prêt à écrire votre histoire ?
          </h2>
          <p data-reveal className="mt-5 max-w-[46ch] text-lg leading-relaxed text-white/75">
            Rejoignez une communauté d&apos;excellence et tracez votre propre chemin vers le succès.
          </p>
          <div data-reveal className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/formation"
              className="group inline-flex h-13 items-center justify-center gap-2 rounded-full bg-laurier px-8 font-bold text-nuit transition-colors duration-200 hover:bg-laurier-fonce"
            >
              Nos formations
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-13 items-center justify-center rounded-full border border-white/30 px-8 font-bold text-white transition-colors duration-200 hover:bg-white/10"
            >
              Déposer une demande
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessStoriesSection;
