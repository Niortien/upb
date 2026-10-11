"use client";

import type { RefObject } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

/** Découpes de rideau selon la direction demandée : data-reveal-image="gauche | droite | haut | bas". */
const RIDEAUX: Record<string, string> = {
  haut: "inset(0% 0% 100% 0%)",
  bas: "inset(100% 0% 0% 0%)",
  gauche: "inset(0% 100% 0% 0%)",
  droite: "inset(0% 0% 0% 100%)",
};

/**
 * Les lignes d'un titre sont coupées dans un masque : on lui laisse un peu de marge (compensée) pour que les
 * accents des capitales, serrées à 0,92 d'interligne, ne soient pas rognés.
 */
const elargirMasques = (masques: Element[]) => {
  masques.forEach((m) => {
    if (!(m instanceof HTMLElement)) return;
    m.style.paddingTop = "0.22em";
    m.style.marginTop = "-0.22em";
    m.style.paddingBottom = "0.08em";
    m.style.marginBottom = "-0.08em";
    // Une ligne peut dépasser la largeur maximale du titre (mot long) : le masque ne doit pas la couper à droite.
    m.style.paddingRight = "0.6em";
    m.style.marginRight = "-0.6em";
  });
};

/**
 * Révélation au défilement, partagée par les sections et les pages. Elle cherche, dans la section :
 *  - [data-reveal]        : le bloc monte et apparaît ;
 *  - [data-titre]         : le titre est coupé en lignes (SplitText) qui montent, l'une après l'autre, derrière un masque ;
 *  - [data-lettres]       : même chose, lettre par lettre, pour les grands titres de conclusion ;
 *  - [data-trait]         : le trait se dessine de gauche à droite ;
 *  - [data-reveal-lignes] : chaque enfant direct apparaît à la suite du précédent ;
 *  - [data-reveal-image]  : la photo se dévoile par un rideau qui s'ouvre (haut par défaut ; « gauche », « droite »
 *                           ou « bas » en valeur), puis glisse très légèrement derrière son cadre quand on défile (parallaxe) ;
 *  - [data-compteur]      : le nombre grimpe jusqu'à sa valeur (data-compteur="15000", data-suffixe="+") ;
 *  - [data-engrenage]     : la roue tourne au rythme du défilement.
 * Le contenu est visible par défaut : si le script ne tourne pas, rien n'est caché. Avec « réduire les
 * animations », tout s'affiche tel quel.
 */
export function useReveal(racine: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const declencheur = { start: "top 82%", once: true } as const;
        const tous = <T extends HTMLElement>(sel: string) => gsap.utils.toArray<T>(sel, racine.current);

        tous("[data-reveal]").forEach((el) => {
          gsap.from(el, { opacity: 0, y: 28, duration: 0.9, ease: "expo.out", scrollTrigger: { trigger: el, ...declencheur } });
        });

        // Titres : lignes masquées qui montent. autoSplit redécoupe si la police charge ou si la largeur change ;
        // l'animation est donc créée (et renvoyée) dans onSplit.
        tous("[data-titre]").forEach((el) => {
          SplitText.create(el, {
            type: "lines",
            mask: "lines",
            autoSplit: true,
            onSplit(self) {
              elargirMasques(self.masks);
              return gsap.from(self.lines, {
                yPercent: 112,
                rotate: 2.5,
                transformOrigin: "0% 100%",
                duration: 1.1,
                stagger: 0.12,
                ease: "expo.out",
                scrollTrigger: { trigger: el, ...declencheur },
              });
            },
          });
        });

        tous("[data-lettres]").forEach((el) => {
          SplitText.create(el, {
            type: "lines, chars",
            mask: "lines",
            autoSplit: true,
            onSplit(self) {
              elargirMasques(self.masks);
              return gsap.from(self.chars, {
                yPercent: 120,
                rotate: 6,
                duration: 0.9,
                stagger: { each: 0.025, from: "start" },
                ease: "expo.out",
                scrollTrigger: { trigger: el, ...declencheur },
              });
            },
          });
        });

        tous("[data-trait]").forEach((el) => {
          gsap.from(el, { scaleX: 0, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: el, ...declencheur } });
        });

        tous("[data-reveal-lignes]").forEach((el) => {
          gsap.from(Array.from(el.children), {
            opacity: 0,
            y: 24,
            duration: 0.8,
            stagger: 0.09,
            ease: "expo.out",
            scrollTrigger: { trigger: el, ...declencheur },
          });
        });

        tous("[data-reveal-image]").forEach((el) => {
          const photo = el.querySelector("img");
          const rideau = RIDEAUX[el.dataset.revealImage ?? ""] ?? RIDEAUX.haut;
          // La photo est agrandie et déplacée dans son cadre : le cadre doit la rogner, quelle que soit la page.
          gsap.set(el, { overflow: "hidden" });
          gsap.from(el,{ clipPath: rideau, duration: 1.3, ease: "expo.out", scrollTrigger: { trigger: el, ...declencheur } });
          if (!photo) return;
          // La photo se pose en dézoomant (1,35 → 1,14), puis la marge restante sert à la parallaxe.
          gsap.fromTo(photo, { scale: 1.35 }, { scale: 1.14, duration: 1.8, ease: "expo.out", scrollTrigger: { trigger: el, ...declencheur } });
          gsap.fromTo(
            photo,
            { yPercent: -6 },
            { yPercent: 6, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.6 } }
          );
        });

        tous("[data-compteur]").forEach((el) => {
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

        tous("[data-engrenage]").forEach((el) => {
          gsap.to(el, {
            rotation: 160,
            ease: "none",
            scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: 0.8 },
          });
        });
      });

      // Les polices (Big Shoulders) changent la hauteur des blocs : on recalcule les points de déclenchement.
      document.fonts?.ready.then(() => ScrollTrigger.refresh());

      return () => mm.revert();
    },
    { scope: racine }
  );
}
