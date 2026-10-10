"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, BookOpen, BriefcaseBusiness, Check, ChevronRight } from "lucide-react";
import { CtaFinal } from "@/components/common/cta-final";
import type { Programme } from "@/components/accueil/programs-section";
import { useReveal } from "@/hooks/use-reveal";
import { libelleNiveau, scinderTitre } from "@/lib/programmes";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface FiliereHeaderProps {
  programme: Programme;
}

/**
 * Fiche d'une formation : grande photo, présentation, contenu, débouchés et évolutions possibles.
 * La photo glisse plus lentement que la page (parallaxe) ; les listes se révèlent au défilement.
 */
const FiliereHeader: React.FC<FiliereHeaderProps> = ({ programme }) => {
  const racine = useRef<HTMLDivElement>(null);
  const hero = useRef<HTMLElement>(null);
  const { court, detail } = scinderTitre(programme.title);
  useReveal(racine);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".fh-ligne > span", { yPercent: 112, duration: 1, stagger: 0.09, ease: "expo.out" });
        gsap.from(".fh-apparait", { opacity: 0, y: 18, duration: 0.8, stagger: 0.08, delay: 0.5, ease: "expo.out" });
        gsap.to(".fh-photo", {
          yPercent: 14,
          ease: "none",
          scrollTrigger: { trigger: hero.current, start: "top top", end: "bottom top", scrub: true },
        });
      });
      return () => mm.revert();
    },
    { scope: racine }
  );

  const lignesTitre = court.split(/(?<=\s)/).reduce<string[]>((acc, mot) => {
    const derniere = acc[acc.length - 1];
    if (derniere !== undefined && (derniere + mot).length <= 22) acc[acc.length - 1] = derniere + mot;
    else acc.push(mot);
    return acc;
  }, []);

  return (
    <div ref={racine}>
      <section ref={hero} className="relative flex min-h-[78svh] items-end overflow-hidden bg-nuit text-white">
        <div aria-hidden className="absolute inset-0">
          <div className="fh-photo absolute -inset-y-[8%] inset-x-0">
            <Image src={programme.img} alt="" fill priority sizes="100vw" className="object-cover object-top" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-nuit/90 via-nuit/60 to-nuit/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-nuit/90 via-transparent to-nuit/50" />
        </div>

        <div className="container relative mx-auto px-5 pb-14 pt-36 sm:px-6 lg:px-8 lg:pb-20">
          <Link
            href="/formation"
            className="fh-apparait mb-8 inline-flex min-h-11 items-center gap-2 font-semibold text-white/80 transition-colors duration-200 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Toutes les formations
          </Link>
          <p className="fh-apparait mb-3 font-bold text-laurier">{libelleNiveau[programme.niveau]}</p>
          <h1 className="titre-upb max-w-[20ch] text-[clamp(2.2rem,min(6vw,10vh),5rem)] text-white">
            {lignesTitre.map((l) => (
              <span key={l} className="fh-ligne block overflow-hidden pb-[0.07em]">
                <span className="block">{l.trim()}</span>
              </span>
            ))}
          </h1>
          {detail && <p className="fh-apparait mt-4 max-w-[52ch] text-lg text-white/80">{detail}</p>}
          <p className="fh-apparait mt-6 flex flex-wrap gap-x-8 gap-y-2 text-white/85">
            {programme.contenu && (
              <span className="inline-flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-laurier" aria-hidden />
                {programme.contenu.length} enseignements
              </span>
            )}
            {programme.debouche && (
              <span className="inline-flex items-center gap-2">
                <BriefcaseBusiness className="h-4 w-4 text-laurier" aria-hidden />
                {programme.debouche.length} débouchés
              </span>
            )}
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="container mx-auto px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
          <p data-reveal className="max-w-[40ch] text-[clamp(1.4rem,2.6vw,2.1rem)] font-semibold leading-snug text-indigo">
            {programme.description}
          </p>
        </div>
      </section>

      {programme.contenu && programme.contenu.length > 0 && (
        <section aria-labelledby="contenu-titre" className="bg-craie">
          <div className="container mx-auto grid gap-10 px-5 py-16 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-8 lg:py-24">
            <h2 id="contenu-titre" data-reveal className="titre-upb text-[clamp(2rem,4vw,3.2rem)] text-indigo lg:sticky lg:top-28 lg:self-start">
              Ce que vous allez apprendre.
            </h2>
            <ul data-reveal-lignes className="divide-y divide-trait border-y border-trait">
              {programme.contenu.map((item) => (
                <li key={item} className="flex items-start gap-4 py-5 text-lg font-semibold leading-snug text-encre">
                  <Check className="mt-1 h-5 w-5 shrink-0 text-laurier-fonce" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {programme.debouche && programme.debouche.length > 0 && (
        <section aria-labelledby="debouches-titre" className="bg-indigo text-white">
          <div className="container mx-auto px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
            <h2 id="debouches-titre" data-reveal className="titre-upb max-w-[18ch] text-[clamp(2rem,4vw,3.2rem)]">
              Les métiers qui vous attendent.
            </h2>
            <ul data-reveal-lignes className="mt-10 grid gap-x-10 gap-y-0 sm:grid-cols-2">
              {programme.debouche.map((item) => (
                <li key={item} className="flex items-center gap-4 border-t border-white/20 py-5 text-xl font-semibold">
                  <span aria-hidden className="h-2.5 w-2.5 shrink-0 rounded-full bg-laurier" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {programme.evolution && programme.evolution.length > 0 && (
        <section aria-labelledby="evolution-titre" className="bg-white">
          <div className="container mx-auto px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
            <h2 id="evolution-titre" data-reveal className="titre-upb max-w-[18ch] text-[clamp(2rem,4vw,3.2rem)] text-indigo">
              Et ensuite ?
            </h2>
            <p data-reveal className="mt-3 text-lg text-encre-douce">Les poursuites d&apos;études possibles après cette formation.</p>
            <ul data-reveal-lignes className="mt-8 flex flex-wrap gap-3">
              {programme.evolution.map((item) => (
                <li
                  key={item}
                  className="inline-flex items-center gap-2 rounded-full border border-indigo/25 bg-craie px-5 py-3 font-semibold text-indigo"
                >
                  <ChevronRight className="h-4 w-4" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CtaFinal
        titre="Prêt à rejoindre cette formation ?"
        texte="Candidatez maintenant et commencez votre parcours d'excellence à l'UPB."
        actions={[
          { label: "Candidater", href: "/contact" },
          { label: "Voir les autres formations", href: "/formation", style: "contour" },
        ]}
      />
    </div>
  );
};

export default FiliereHeader;
