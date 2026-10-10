"use client";

import { useRef } from "react";
import Image from "next/image";
import { GraduationCap, Microscope, Users, Wifi } from "lucide-react";
import { CtaFinal } from "@/components/common/cta-final";
import { PageHero } from "@/components/common/page-hero";
import { Planche } from "@/components/common/planche";
import { Reperes } from "@/components/common/reperes";
import { useReveal } from "@/hooks/use-reveal";

const BROCHURE = "/assets/pdf/FICHE%20DE%20RENSEIGNEMENT%20UPB%20%202025-2026_actualis%C3%A9e-1.pdf";

const chiffres: Array<{ valeur?: number; suffixe?: string; texte?: string; libelle: string }> = [
  { valeur: 8, suffixe: "+", libelle: "ans d'excellence" },
  { valeur: 5000, suffixe: "+", libelle: "étudiants actifs" },
  { valeur: 5, suffixe: "+", libelle: "pays représentés" },
  { texte: "Top 10", libelle: "des universités nationales" },
];

const campus = [
  { src: "/assets/image/home/campus/2O4A7455.webp", alt: "Étudiants et visiteurs sur le campus", classe: "col-span-2 row-span-2" },
  { src: "/assets/image/home/campus/2O4A7348.webp", alt: "Un bâtiment du campus", classe: "" },
  { src: "/assets/image/home/campus/campus1.jpg", alt: "Vue du campus", classe: "" },
  { src: "/assets/image/home/star/salle1.jpg", alt: "Une salle de cours moderne", classe: "" },
  { src: "/assets/image/home/campus/2O4A7104.webp", alt: "Entrée du campus", classe: "" },
];

const atouts = [
  { icon: Microscope, label: "Laboratoires équipés" },
  { icon: Wifi, label: "Wi-Fi sur 100 % du campus" },
  { icon: Users, label: "Clubs et associations" },
  { icon: GraduationCap, label: "Diplômes reconnus" },
];

const vie = [
  { src: "/assets/image/cite/cite1.jpg", alt: "Une chambre de la cité universitaire" },
  { src: "/assets/image/cite/cite2.jpg", alt: "Un espace de la cité universitaire" },
  { src: "/assets/image/cite/cite3.jpg", alt: "La cité universitaire" },
  { src: "/assets/image/home/collectif.jpg", alt: "Étudiants en travail de groupe" },
];

const parcours = [
  { nom: "Adjoua Marie", promo: "Promo 2022", poste: "Chef de projet, MTN Côte d'Ivoire", citation: "L'UPB m'a formée à relever n'importe quel défi professionnel.", domaine: "Management" },
  { nom: "Koné Ibrahim", promo: "Promo 2023", poste: "Développeur Full-Stack, Orange CI", citation: "Du campus au monde professionnel en moins d'un an. Incroyable.", domaine: "Informatique" },
  { nom: "Yao Christelle", promo: "Promo 2021", poste: "Auditrice, Deloitte Abidjan", citation: "Une formation rigoureuse qui m'a ouvert les portes des Big 4.", domaine: "Finance et audit" },
];

const preuves = [
  { valeur: 65, suffixe: " %", libelle: "en emploi sous 6 mois" },
  { valeur: 3000, suffixe: "+", libelle: "diplômés actifs" },
  { valeur: 120, suffixe: "+", libelle: "entreprises partenaires" },
];

const diplomes = ["1", "2", "3", "4", "5", "6", "7", "9"].map((n) => ({ src: `/assets/image/diplome/${n}.jpg`, alt: "Diplômés de l'UPB lors d'une cérémonie de remise des diplômes" }));

const deux = (n: number) => String(n).padStart(2, "0");

export default function About() {
  const racine = useRef<HTMLDivElement>(null);
  useReveal(racine);

  return (
    <div ref={racine}>
      <PageHero
        variante="photo"
        repere="PL. 10"
        legende="Notice de présentation"
        lignes={["Former les leaders", "de demain."]}
        intro="Depuis 2018, un campus d'exception au cœur de la Côte d'Ivoire."
        image={{ src: "/assets/image/home/campus/2O4A6842.webp", alt: "", position: "center 55%" }}
      />

      <section className="fond-indigo text-white">
        <dl className="container mx-auto grid grid-cols-2 px-5 sm:px-6 lg:grid-cols-4 lg:px-8">
          {chiffres.map((c, i) => (
            <div key={c.libelle} className="border-white/25 py-8 pr-4 odd:border-r lg:border-r lg:py-12 lg:pl-8 lg:first:pl-0 lg:last:border-r-0">
              <p className="etiquette text-[11px] text-laurier">Mesure {deux(i + 1)}</p>
              <dd className="chiffre-upb mt-2 text-[clamp(2.2rem,4vw,3.4rem)] text-white">
                {c.texte ?? (
                  <span data-compteur={c.valeur} data-suffixe={c.suffixe}>
                    {c.valeur?.toLocaleString("fr-FR")}
                    {c.suffixe}
                  </span>
                )}
              </dd>
              <dt className="mt-1 text-white/80">{c.libelle}</dt>
            </div>
          ))}
        </dl>
      </section>

      <section aria-label="Le campus en images" className="fond-papier">
        <div className="container mx-auto grid auto-rows-[10rem] grid-cols-2 gap-4 px-5 py-16 sm:auto-rows-[13rem] sm:px-6 lg:grid-cols-4 lg:px-8 lg:py-24">
          {campus.map((c) => (
            <div key={c.src} data-reveal-image className={`relative bg-indigo ${c.classe}`}>
              <Image src={c.src} alt={c.alt} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
              <Reperes taille={12} className="text-white" />
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="adn-titre" className="fond-papier border-t border-indigo/30">
        <div className="container mx-auto grid gap-12 px-5 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-20 lg:px-8 lg:py-24">
          <div className="min-w-0">
            <Planche repere="PL. 11" legende="Le campus" id="adn-titre" titre="Un campus pensé pour l'épanouissement." largeur="16ch" />
            <p data-reveal className="mt-5 max-w-[48ch] text-lg leading-relaxed text-encre-douce">
              Infrastructures modernes, espaces verts, résidence universitaire, laboratoires de pointe : tout est conçu pour que chaque étudiant donne le meilleur de lui-même.
            </p>
            <ul data-reveal-lignes className="mt-8 grid gap-x-8 sm:grid-cols-2">
              {atouts.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-3 border-t border-indigo/30 py-4 font-semibold text-encre">
                  <Icon className="h-5 w-5 text-indigo" aria-hidden />
                  {label}
                </li>
              ))}
            </ul>
            <p data-reveal className="mt-6 border-t-2 border-laurier pt-4">
              <span className="block font-bold text-encre">Top 10 des universités nationales</span>
              <span className="text-sm text-encre-douce">Ministère de l&apos;Enseignement Supérieur, 2024</span>
            </p>
          </div>

          <div className="grid h-[28rem] grid-cols-2 grid-rows-2 gap-4 sm:h-[34rem]">
            <div data-reveal-image className="relative row-span-2 bg-indigo">
              <Image src="/assets/image/home/campus/2O4A7348.webp" alt="Un bâtiment du campus de l'UPB" fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
              <Reperes taille={14} className="text-white" />
            </div>
            <div data-reveal-image className="relative bg-indigo">
              <Image src="/assets/image/home/star/laboratoire.jpg" alt="Travaux pratiques en laboratoire" fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
              <Reperes taille={12} className="text-white" />
            </div>
            <div data-reveal-image className="relative bg-indigo">
              <Image src="/assets/image/home/collectif.jpg" alt="Étudiants en travail de groupe" fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
              <Reperes taille={12} className="text-white" />
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="vie-titre" className="fond-papier border-t border-indigo/30">
        <div className="container mx-auto px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
          <Planche repere="PL. 12" legende="Vie étudiante" id="vie-titre" titre="Cité, esprit collectif." largeur="14ch" />
          <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {vie.map((v) => (
              <div key={v.src} data-reveal-image className="relative aspect-[3/4] bg-indigo">
                <Image src={v.src} alt={v.alt} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
                <Reperes taille={12} className="text-white" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="engagement-titre" className="fond-plan relative overflow-hidden text-white">
        <Image src="/assets/image/home/campus/2O4A6914.webp" alt="" fill sizes="100vw" className="object-cover opacity-20" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-nuit via-nuit/70 to-nuit/30" />
        <div className="container relative mx-auto px-5 py-24 sm:px-6 lg:px-8 lg:py-36">
          <h2 id="engagement-titre" data-reveal className="titre-pochoir max-w-[16ch] text-[clamp(2.2rem,5.2vw,4.6rem)]">
            Ici, on ne vous donne pas seulement un diplôme.
          </h2>
          <p data-reveal className="titre-pochoir mt-4 max-w-[18ch] text-[clamp(2.2rem,5.2vw,4.6rem)] text-laurier">
            On vous donne les armes pour conquérir le monde.
          </p>
          <figure data-reveal className="mt-14 max-w-[56ch] border-t border-white/30 pt-8">
            <blockquote className="text-xl leading-relaxed text-white/85">
              « L&apos;UPB m&apos;a appris à penser grand, à travailler dur et à ne jamais douter de mon potentiel. Aujourd&apos;hui ingénieur, je dois tout à ces années à Bingerville. »
            </blockquote>
            <figcaption className="mt-4">
              <span className="block font-bold">Kouadio Ange</span>
              <span className="text-white/70">Promo 2023, ingénieur informatique</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section aria-labelledby="parcours-titre" className="fond-papier">
        <div className="container mx-auto px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
          <Planche repere="PL. 13" legende="Parcours de diplômés" id="parcours-titre" titre="Ils ont commencé ici." largeur="12ch" />
          <p data-reveal className="mt-4 max-w-[52ch] text-lg text-encre-douce">
            65 % de nos diplômés décrochent un emploi dans les 6 mois suivant leur sortie.
          </p>

          <ul data-reveal-lignes className="mt-12 grid gap-6 md:grid-cols-3">
            {parcours.map((p, i) => (
              <li key={p.nom} className="relative flex flex-col border border-indigo/40 bg-white p-7">
                <Reperes taille={12} className="text-indigo" />
                <p className="etiquette text-[12px] text-laurier-fonce">
                  P-{deux(i + 1)} · {p.domaine}
                </p>
                <figure className="flex flex-1 flex-col">
                  <blockquote className="mt-3 flex-1 text-xl font-semibold leading-snug text-indigo">« {p.citation} »</blockquote>
                  <figcaption className="mt-6 border-t border-indigo/25 pt-4">
                    <span className="block font-bold text-encre">{p.nom}</span>
                    <span className="text-[15px] text-encre-douce">
                      {p.promo} · {p.poste}
                    </span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>

          <dl data-reveal className="mt-12 grid grid-cols-3 border-t-2 border-indigo pt-8">
            {preuves.map((p) => (
              <div key={p.libelle} className="pr-3 [&:not(:first-child)]:border-l [&:not(:first-child)]:border-indigo/25 [&:not(:first-child)]:pl-4 sm:[&:not(:first-child)]:pl-8">
                <dd className="chiffre-upb text-3xl text-indigo sm:text-5xl">
                  <span data-compteur={p.valeur} data-suffixe={p.suffixe}>
                    {p.valeur.toLocaleString("fr-FR")}
                    {p.suffixe}
                  </span>
                </dd>
                <dt className="mt-1 text-sm text-encre-douce sm:text-base">{p.libelle}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-labelledby="diplomes-titre" className="fond-papier border-t border-indigo/30">
        <div className="container mx-auto px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
          <Planche repere="PL. 14" legende="Remises de diplômes" id="diplomes-titre" titre="Chaque diplôme, une victoire." largeur="14ch" />
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
            {diplomes.map((d) => (
              <div key={d.src} data-reveal-image className="relative aspect-[4/5] bg-indigo">
                <Image src={d.src} alt={d.alt} fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover object-top" />
                <Reperes taille={12} className="text-white" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaFinal
        titre="Votre avenir commence ici."
        texte="Rejoignez une communauté d'étudiants ambitieux et bâtissez votre carrière avec nous."
        actions={[
          { label: "Télécharger la brochure", href: BROCHURE, externe: true },
          { label: "Nous contacter", href: "/contact", style: "contour" },
        ]}
      />
    </div>
  );
}
