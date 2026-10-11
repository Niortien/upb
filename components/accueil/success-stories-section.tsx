"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Engrenage } from "@/components/common/engrenage";
import { Planche } from "@/components/common/planche";
import { Reperes } from "@/components/common/reperes";
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
    <section ref={racine} aria-labelledby="reussites-titre">
      <div className="fond-papier">
        <div className="container mx-auto px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
          <Planche repere="PL. 07" legende="Certificats" id="reussites-titre" titre="Nos diplômés qui changent le monde." largeur="16ch" />
          <p data-reveal className="mt-5 max-w-[50ch] text-lg leading-relaxed text-encre-douce">
            Des parcours d&apos;excellence qui illustrent l&apos;impact de nos formations sur la société, de Bingerville à toute l&apos;Afrique.
          </p>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {histoires.map((h, i) => (
              <article key={h.titre}>
                <figure className="relative">
                  <div data-reveal-image={i === 0 ? "gauche" : "droite"} className="relative aspect-[4/5] overflow-hidden bg-indigo sm:aspect-[5/4]">
                    <Image src={h.image} alt={h.alt} fill sizes="(min-width: 1024px) 45vw, 95vw" className="object-cover" />
                  </div>
                  <Reperes taille={18} className="text-indigo" />
                  <figcaption className="etiquette absolute bottom-0 left-4 translate-y-1/2 bg-nuit px-3 py-1 text-[11px] text-white">
                    <span className="text-laurier">FIG. {String(i + 8).padStart(2, "0")}</span> · {h.annee}
                  </figcaption>
                </figure>
                <div data-reveal className="mt-8">
                  <h3 className="text-2xl font-semibold leading-snug text-encre">{h.titre}</h3>
                  <p className="mt-2 max-w-[52ch] leading-relaxed text-encre-douce">
                    <span className="font-semibold text-encre">{h.nom}. </span>
                    {h.texte}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <p data-reveal className="mt-12 max-w-[60ch] border-t-2 border-indigo pt-5 text-lg leading-relaxed text-encre-douce">
            <span className="etiquette mr-2 text-indigo">2015 – 2025</span>
            Présents dans plus de cinq pays d&apos;Afrique, nos diplômés contribuent au développement économique et technologique du continent.
          </p>
        </div>
      </div>

      <div className="fond-plan relative overflow-hidden text-white">
        <Engrenage data-engrenage className="pointer-events-none absolute -right-24 top-1/2 hidden w-[34rem] -translate-y-1/2 text-white/15 lg:block" />
        <div className="container relative mx-auto px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
          <h2 data-lettres className="titre-pochoir max-w-[12ch] text-[clamp(3rem,8vw,7rem)]">
            Prêt à écrire votre histoire&nbsp;?
          </h2>
          <p data-reveal className="mt-5 max-w-[46ch] text-lg leading-relaxed text-white/80">
            Rejoignez une communauté d&apos;excellence et tracez votre propre chemin vers le succès.
          </p>
          <div data-reveal-lignes className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/formation" className="btn-usine btn-or group">
              Nos formations
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
            </Link>
            <Link href="/contact" className="btn-usine btn-trait">
              Déposer une demande
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessStoriesSection;
