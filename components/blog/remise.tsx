"use client";

import { useRef } from "react";
import Image from "next/image";
import { Planche } from "@/components/common/planche";
import { Reperes } from "@/components/common/reperes";
import { useReveal } from "@/hooks/use-reveal";

const PHOTOS = ["1", "2", "3", "4", "5", "6", "7", "9"].map((n) => `/assets/image/diplome/${n}.jpg`);

/** Reportage photo de la remise des diplômes : une mosaïque qui se dévoile au défilement, et le mot de l'université. */
const RemiseDesDiplomesSection = () => {
  const racine = useRef<HTMLElement>(null);
  useReveal(racine);

  return (
    <section ref={racine} aria-labelledby="remise-titre" className="fond-plan text-white">
      <div className="container mx-auto px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
        <Planche repere="PL. 17" legende="Reportage" id="remise-titre" titre="Chaque diplôme, une victoire." sombre largeur="14ch" />
        <p data-reveal className="mt-4 max-w-[48ch] text-lg leading-relaxed text-white/80">
          4<sup>e</sup> promotion de l&apos;UPB : un moment d&apos;émotion et de fierté partagée entre diplômés, familles et corps professoral.
        </p>

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {PHOTOS.map((src, i) => (
            <div key={src} data-reveal-image className={`relative bg-indigo ${i === 0 ? "col-span-2 row-span-2 aspect-[4/3] md:aspect-auto" : "aspect-[4/5]"}`}>
              <Image
                src={src}
                alt="Diplômés de l'UPB lors de la cérémonie de remise des diplômes"
                fill
                sizes={i === 0 ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"}
                className="object-cover object-top"
              />
              <Reperes taille={12} className="text-white" />
            </div>
          ))}
        </div>

        <figure data-reveal className="mt-14 max-w-[60ch] border-t border-white/30 pt-8">
          <blockquote className="text-xl leading-relaxed text-white/85">
            « La cérémonie de remise des diplômes de la 4<sup>e</sup> promotion a été un événement empreint d&apos;émotion et de fierté : des discours inspirants, des moments de joie partagée entre diplômés, leurs familles et tout le corps professoral de l&apos;UPB. »
          </blockquote>
          <figcaption className="mt-4 text-white/70">Service Communication, UPB</figcaption>
        </figure>
      </div>
    </section>
  );
};

export default RemiseDesDiplomesSection;
