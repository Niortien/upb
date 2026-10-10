"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, BookOpen, BriefcaseBusiness, ChevronRight } from "lucide-react";
import { CtaFinal } from "@/components/common/cta-final";
import { Planche } from "@/components/common/planche";
import type { Programme } from "@/components/accueil/programs-section";
import { useReveal } from "@/hooks/use-reveal";
import { libelleNiveau, scinderTitre } from "@/lib/programmes";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const deux = (n: number) => String(n).padStart(2, "0");

/**
 * Fiche d'une formation, comme une fiche technique : photo en tête, présentation, programme (liste numérotée),
 * débouchés (tableau) et évolutions possibles. La photo glisse plus lentement que la page.
 */
const FiliereHeader: React.FC<{ programme: Programme }> = ({ programme }) => {
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
        gsap.to(".fh-photo", { yPercent: 12, ease: "none", scrollTrigger: { trigger: hero.current, start: "top top", end: "bottom top", scrub: true } });
      });
      return () => mm.revert();
    },
    { scope: racine }
  );

  const lignesTitre = court.split(/(?<=\s)/).reduce<string[]>((acc, mot) => {
    const derniere = acc[acc.length - 1];
    if (derniere !== undefined && (derniere + mot).length <= 20) acc[acc.length - 1] = derniere + mot;
    else acc.push(mot);
    return acc;
  }, []);

  return (
    <div ref={racine}>
      <section ref={hero} className="fond-plan relative flex min-h-[78svh] items-end overflow-hidden text-white">
        <div aria-hidden className="absolute inset-0">
          <div className="fh-photo absolute -inset-y-[8%] inset-x-0">
            <Image src={programme.img} alt="" fill priority sizes="100vw" className="object-cover object-top" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-nuit/95 via-nuit/70 to-nuit/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-nuit/90 via-transparent to-nuit/40" />
        </div>

        <div className="container relative mx-auto px-5 pb-14 pt-32 sm:px-6 lg:px-8 lg:pb-20">
          <Link href="/formation" className="fh-apparait etiquette mb-8 inline-flex min-h-11 items-center gap-2 text-white/80 transition-colors duration-200 hover:text-laurier">
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Toutes les formations
          </Link>
          <p className="fh-apparait etiquette mb-4 flex items-center gap-3 text-white/80">
            <span className="bg-laurier px-2 py-1 text-nuit">F-{deux(programme.id)}</span>
            <span>{libelleNiveau[programme.niveau]}</span>
          </p>
          <h1 className="titre-pochoir max-w-[16ch] text-[clamp(2.8rem,min(7.4vw,12svh),6.6rem)]">
            {lignesTitre.map((l) => (
              <span key={l} className="fh-ligne block overflow-hidden pb-[0.05em]">
                <span className="block">{l.trim()}</span>
              </span>
            ))}
          </h1>
          {detail && <p className="fh-apparait mt-4 max-w-[52ch] text-lg text-white/85">{detail}</p>}
          <p className="fh-apparait etiquette mt-6 flex flex-wrap gap-x-8 gap-y-2 text-white/85">
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

      <section className="fond-papier">
        <div className="container mx-auto px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
          <p data-reveal className="etiquette text-indigo">Description</p>
          <p data-reveal className="mt-3 max-w-[40ch] text-[clamp(1.4rem,2.6vw,2.2rem)] font-semibold leading-snug text-indigo">
            {programme.description}
          </p>
        </div>
      </section>

      {programme.contenu && programme.contenu.length > 0 && (
        <section aria-labelledby="contenu-titre" className="fond-papier border-t border-indigo/30">
          <div className="container mx-auto grid gap-10 px-5 py-16 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-8 lg:py-24">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <Planche repere="§ 1" legende="Programme" id="contenu-titre" titre="Ce que vous allez apprendre." largeur="12ch" />
            </div>
            <ol data-reveal-lignes className="border-t-2 border-indigo">
              {programme.contenu.map((item, i) => (
                <li key={item} className="grid grid-cols-[3rem_1fr] items-baseline gap-3 border-b border-indigo/25 py-5 text-lg font-semibold leading-snug text-encre">
                  <span className="etiquette text-indigo">{deux(i + 1)}</span>
                  {item}
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {programme.debouche && programme.debouche.length > 0 && (
        <section aria-labelledby="debouches-titre" className="fond-indigo text-white">
          <div className="container mx-auto px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
            <Planche repere="§ 2" legende="Débouchés" id="debouches-titre" titre="Les métiers qui vous attendent." sombre largeur="14ch" />
            <ul data-reveal-lignes className="mt-10 grid sm:grid-cols-2 sm:gap-x-12">
              {programme.debouche.map((item, i) => (
                <li key={item} className="flex items-baseline gap-4 border-t border-white/30 py-5 text-xl font-semibold">
                  <span className="etiquette text-laurier">M-{deux(i + 1)}</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {programme.evolution && programme.evolution.length > 0 && (
        <section aria-labelledby="evolution-titre" className="fond-papier">
          <div className="container mx-auto px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
            <Planche repere="§ 3" legende="Évolutions" id="evolution-titre" titre="Et ensuite ?" largeur="12ch" />
            <p data-reveal className="mt-4 text-lg text-encre-douce">Les poursuites d&apos;études possibles après cette formation.</p>
            <ul data-reveal-lignes className="mt-8 flex flex-wrap gap-3">
              {programme.evolution.map((item) => (
                <li key={item} className="etiquette inline-flex items-center gap-2 border border-indigo bg-white px-4 py-3 text-[12px] text-indigo">
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
