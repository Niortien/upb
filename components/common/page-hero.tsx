"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Laurier } from "@/components/common/laurier";

gsap.registerPlugin(useGSAP);

interface PageHeroProps {
  /** Le titre, une ligne par entrée : chaque ligne monte à son tour. */
  lignes: string[];
  intro?: string;
  /** « arche » : photo dans une arche à droite, sur fond clair. « photo » : photo plein cadre sous le texte. */
  variante?: "arche" | "photo" | "texte";
  image?: { src: string; alt: string; position?: string };
  /** Titre de niveau 1 de la page : par défaut, c'est cet en-tête. */
  children?: ReactNode;
}

/**
 * En-tête commun des pages intérieures. L'arrivée est la même partout : le titre monte ligne par ligne,
 * l'introduction apparaît, et la photo se dévoile dans son arche. Sans mouvement, tout est affiché d'emblée.
 */
export function PageHero({ lignes, intro, variante = "texte", image, children }: PageHeroProps) {
  const racine = useRef<HTMLElement>(null);
  const photo = variante === "photo" && image;
  const arche = variante === "arche" && image;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.from(".pg-ligne > span", { yPercent: 112, duration: 1, stagger: 0.09 })
          .from(".pg-apparait", { opacity: 0, y: 18, duration: 0.8, stagger: 0.08 }, "<0.4");
        if (arche) {
          tl.from(".pg-arche", { clipPath: "inset(100% 0% 0% 0%)", duration: 1.3 }, 0.1).from(".pg-arche img", { scale: 1.2, duration: 1.8 }, 0.1);
        }
        if (photo) {
          tl.from(".pg-fond img", { scale: 1.18, duration: 2 }, 0);
        }
      });
      return () => mm.revert();
    },
    { scope: racine }
  );

  return (
    <section
      ref={racine}
      className={`relative overflow-hidden ${
        photo ? "bg-nuit text-white" : "bg-craie"
      } pt-32 lg:pt-40 ${photo ? "pb-14 lg:pb-20" : "pb-14 lg:pb-20"}`}
    >
      {photo && image && (
        <div aria-hidden className="pg-fond absolute inset-0">
          <Image src={image.src} alt="" fill priority sizes="100vw" className="object-cover" style={{ objectPosition: image.position }} />
          <div className="absolute inset-0 bg-gradient-to-r from-nuit/90 via-nuit/60 to-nuit/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-nuit/85 via-transparent to-nuit/50" />
        </div>
      )}
      {!photo && <Laurier aria-hidden className="pointer-events-none absolute -right-28 -top-16 hidden w-[34rem] opacity-[0.08] lg:block" />}

      <div
        className={`container relative mx-auto grid items-end gap-10 px-5 sm:px-6 lg:px-8 ${
          arche ? "lg:grid-cols-[1.15fr_0.85fr] lg:gap-14" : ""
        } ${photo ? "min-h-[46svh] content-end" : ""}`}
      >
        <div>
          <h1
            className={`titre-upb text-[clamp(2.5rem,min(6.8vw,11vh),5.6rem)] ${photo ? "text-white" : "text-indigo"}`}
          >
            {lignes.map((l) => (
              <span key={l} className="pg-ligne block overflow-hidden pb-[0.07em]">
                <span className="block">{l}</span>
              </span>
            ))}
          </h1>
          {intro && (
            <p className={`pg-apparait mt-6 max-w-[46ch] text-lg leading-relaxed sm:text-xl ${photo ? "text-white/85" : "text-encre-douce"}`}>{intro}</p>
          )}
          {children && <div className="pg-apparait mt-8">{children}</div>}
        </div>

        {arche && image && (
          <div className="pg-arche relative mx-auto aspect-[4/5] w-full max-w-[26rem] overflow-hidden rounded-t-full bg-indigo lg:mr-0">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority
              sizes="(min-width: 1024px) 26rem, 80vw"
              className="object-cover"
              style={{ objectPosition: image.position }}
            />
          </div>
        )}
      </div>
    </section>
  );
}
