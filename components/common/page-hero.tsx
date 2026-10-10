"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Reperes } from "@/components/common/reperes";

gsap.registerPlugin(useGSAP);

interface PageHeroProps {
  /** Le titre, une ligne par entrée : chaque ligne monte à son tour. */
  lignes: string[];
  intro?: string;
  /** Repère de la page, par exemple « PL. 05 ». */
  repere?: string;
  /** Intitulé technique de la page, par exemple « Nomenclature ». */
  legende?: string;
  /** « arche » : photo cadrée à droite. « photo » : photo en fond sous le texte. « texte » : sans photo. */
  variante?: "arche" | "photo" | "texte";
  image?: { src: string; alt: string; position?: string };
  children?: ReactNode;
}

/**
 * En-tête commun des pages intérieures : un plan sombre, le titre en capitales pochoir qui monte ligne par ligne,
 * l'introduction, et la photo dans son cadre à repères. Sans mouvement, tout est affiché d'emblée.
 */
export function PageHero({ lignes, intro, repere, legende, variante = "texte", image, children }: PageHeroProps) {
  const racine = useRef<HTMLElement>(null);
  const photo = variante === "photo" && image;
  const cadre = variante === "arche" && image;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.from(".pg-ligne > span", { yPercent: 112, duration: 1, stagger: 0.09 })
          .from(".pg-apparait", { opacity: 0, y: 18, duration: 0.8, stagger: 0.08 }, "<0.4");
        if (cadre) tl.from(".pg-cadre", { clipPath: "inset(0 100% 0 0)", duration: 1.2 }, 0.1).from(".pg-cadre img", { scale: 1.2, duration: 1.8 }, 0.1);
        if (photo) tl.from(".pg-fond img", { scale: 1.15, duration: 2 }, 0);
      });
      return () => mm.revert();
    },
    { scope: racine }
  );

  return (
    <section ref={racine} className="fond-plan relative overflow-hidden pb-14 pt-28 text-white lg:pb-20 lg:pt-36">
      {photo && image && (
        <div aria-hidden className="pg-fond absolute inset-0">
          <Image src={image.src} alt="" fill priority sizes="100vw" className="object-cover" style={{ objectPosition: image.position }} />
          <div className="absolute inset-0 bg-gradient-to-r from-nuit/95 via-nuit/70 to-nuit/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-nuit/90 via-transparent to-nuit/40" />
        </div>
      )}

      <div className={`container relative mx-auto grid items-end gap-10 px-5 sm:px-6 lg:px-8 ${cadre ? "lg:grid-cols-[1.1fr_0.9fr] lg:gap-14" : ""}`}>
        <div>
          {(repere || legende) && (
            <p className="pg-apparait etiquette mb-5 flex items-center gap-3 text-white/80">
              {repere && <span className="bg-laurier px-2 py-1 text-nuit">{repere}</span>}
              {legende && <span>{legende}</span>}
              <span aria-hidden className="h-px w-16 bg-white/35" />
            </p>
          )}
          <h1 className="titre-pochoir text-[clamp(3rem,min(9vw,13svh),7.6rem)] text-white">
            {lignes.map((l) => (
              <span key={l} className="pg-ligne block overflow-hidden pb-[0.05em]">
                <span className="block">{l}</span>
              </span>
            ))}
          </h1>
          {intro && <p className="pg-apparait mt-6 max-w-[46ch] text-lg leading-relaxed text-white/85 sm:text-xl">{intro}</p>}
          {children && <div className="pg-apparait mt-8">{children}</div>}
        </div>

        {cadre && image && (
          <figure className="relative mx-auto w-full max-w-[30rem] lg:mr-0">
            <div className="pg-cadre relative aspect-[4/3] overflow-hidden bg-indigo">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority
                sizes="(min-width: 1024px) 30rem, 90vw"
                className="object-cover"
                style={{ objectPosition: image.position }}
              />
            </div>
            <Reperes taille={20} />
          </figure>
        )}
      </div>
    </section>
  );
}
