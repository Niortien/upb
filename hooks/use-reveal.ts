"use client";

import type { RefObject } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Révélation au défilement, partagée par les sections de l'accueil. Elle cherche, dans la section :
 *  - [data-reveal]        : le bloc monte et apparaît ;
 *  - [data-trait]         : le trait se dessine de gauche à droite ;
 *  - [data-reveal-lignes] : chaque enfant direct apparaît à la suite du précédent ;
 *  - [data-reveal-image]  : la photo se dévoile par un rideau qui s'ouvre, en se dézoomant ;
 *  - [data-compteur]      : le nombre grimpe jusqu'à sa valeur (data-compteur="15000", data-suffixe="+").
 * Le contenu est visible par défaut : si le script ne tourne pas, rien n'est caché. Avec « réduire les
 * animations », tout s'affiche tel quel.
 */
export function useReveal(racine: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const declencheur = { start: "top 82%", once: true } as const;

        gsap.utils.toArray<HTMLElement>("[data-reveal]", racine.current).forEach((el) => {
          gsap.from(el, { opacity: 0, y: 28, duration: 0.9, ease: "expo.out", scrollTrigger: { trigger: el, ...declencheur } });
        });

        gsap.utils.toArray<HTMLElement>("[data-trait]", racine.current).forEach((el) => {
          gsap.from(el, { scaleX: 0, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: el, ...declencheur } });
        });

        gsap.utils.toArray<HTMLElement>("[data-reveal-lignes]", racine.current).forEach((el) => {
          gsap.from(Array.from(el.children), {
            opacity: 0,
            y: 24,
            duration: 0.8,
            stagger: 0.09,
            ease: "expo.out",
            scrollTrigger: { trigger: el, ...declencheur },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-reveal-image]", racine.current).forEach((el) => {
          const photo = el.querySelector("img");
          gsap.from(el, {
            clipPath: "inset(0% 0% 100% 0%)",
            duration: 1.3,
            ease: "expo.out",
            scrollTrigger: { trigger: el, ...declencheur },
          });
          if (photo) {
            gsap.from(photo, { scale: 1.25, duration: 1.8, ease: "expo.out", scrollTrigger: { trigger: el, ...declencheur } });
          }
        });

        gsap.utils.toArray<HTMLElement>("[data-compteur]", racine.current).forEach((el) => {
          const cible = Number(el.dataset.compteur);
          const suffixe = el.dataset.suffixe ?? "";
          const etat = { n: 0 };
          gsap.to(etat, {
            n: cible,
            duration: 1.8,
            ease: "power3.out",
            scrollTrigger: { trigger: el, ...declencheur },
            onUpdate: () => {
              el.textContent = `${Math.round(etat.n).toLocaleString("fr-FR")}${suffixe}`;
            },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: racine }
  );
}
