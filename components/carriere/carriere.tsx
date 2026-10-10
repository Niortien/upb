"use client";

import { useMemo, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CalendarClock, MapPin } from "lucide-react";
import { CtaFinal } from "@/components/common/cta-final";
import { PageHero } from "@/components/common/page-hero";
import { Planche } from "@/components/common/planche";
import { OFFRES, PARTENAIRES, type TypeOffre } from "@/data/carrieres.data";
import { useJourCourant } from "@/hooks/use-jour-courant";
import { useReveal } from "@/hooks/use-reveal";
import { WHATSAPP_URL } from "@/lib/constants";

const TYPE_LABELS: Record<TypeOffre, string> = { stage: "Stage", emploi: "Emploi", alternance: "Alternance" };

const chiffres = [
  { valeur: 65, suffixe: " %", libelle: "en emploi sous 6 mois" },
  { valeur: 200, suffixe: "+", libelle: "entreprises partenaires" },
  { valeur: 500, suffixe: "+", libelle: "offres par an" },
  { valeur: 1200, suffixe: "+", libelle: "alumni en poste" },
];

const services = [
  { titre: "Atelier CV et lettre de motivation", texte: "Des sessions pour optimiser vos candidatures avec les conseils de recruteurs professionnels.", freq: "Chaque vendredi" },
  { titre: "Coaching LinkedIn", texte: "Bâtissez un profil LinkedIn percutant et développez votre réseau professionnel en Côte d'Ivoire.", freq: "2 fois par mois" },
  { titre: "Simulations d'entretiens", texte: "Préparez-vous avec des mises en situation réelles conduites par des professionnels RH partenaires.", freq: "Sur rendez-vous" },
  { titre: "Mentorat alumni", texte: "Soyez accompagné pendant 3 mois par un diplômé UPB en poste dans votre secteur cible.", freq: "Programme trimestriel" },
];

const FILTRES: Array<{ label: string; valeur: TypeOffre | "tous" }> = [
  { label: "Toutes les offres", valeur: "tous" },
  { label: "Emplois", valeur: "emploi" },
  { label: "Stages", valeur: "stage" },
  { label: "Alternances", valeur: "alternance" },
];

const MOIS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];

/** « 2026-07-31 » devient « 31 juillet 2026 », sans dépendre du fuseau ni de la langue du navigateur. */
function dateLongue(iso: string): string {
  const [a, m, j] = iso.split("-").map(Number);
  return `${j} ${MOIS[m - 1]} ${a}`;
}

export default function Carriere() {
  const racine = useRef<HTMLDivElement>(null);
  const liste = useRef<HTMLUListElement>(null);
  const [filtre, setFiltre] = useState<TypeOffre | "tous">("tous");
  const jour = useJourCourant();
  useReveal(racine);

  // Offres ouvertes d'abord ; une offre dont la date limite est passée est signalée « clôturée ».
  const offres = useMemo(() => {
    const cloturee = (iso: string) => jour > 0 && Date.parse(iso) < jour * 86_400_000;
    return OFFRES.filter((o) => filtre === "tous" || o.type === filtre)
      .map((o) => ({ ...o, cloturee: cloturee(o.dateExpiration) }))
      .sort((a, b) => Number(a.cloturee) - Number(b.cloturee));
  }, [filtre, jour]);
  const ouvertes = offres.filter((o) => !o.cloturee).length;

  useGSAP(
    () => {
      if (!liste.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(liste.current.children, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.04, ease: "expo.out" });
    },
    { dependencies: [filtre], scope: liste }
  );

  return (
    <div ref={racine}>
      <PageHero
        variante="texte"
        repere="PL. 18"
        legende="Service carrière"
        lignes={["Lancez votre", "carrière."]}
        intro="Accédez aux offres de stages, d'emplois et d'alternances de nos entreprises partenaires, et profitez des services carrière de l'université."
      />

      <section className="fond-indigo text-white">
        <dl className="container mx-auto grid grid-cols-2 px-5 sm:px-6 lg:grid-cols-4 lg:px-8">
          {chiffres.map((c) => (
            <div key={c.libelle} className="border-white/25 py-7 pr-4 odd:border-r lg:border-r lg:pl-8 lg:first:pl-0 lg:last:border-r-0">
              <dd className="chiffre-upb text-4xl text-white sm:text-5xl">
                <span data-compteur={c.valeur} data-suffixe={c.suffixe}>
                  {c.valeur.toLocaleString("fr-FR")}
                  {c.suffixe}
                </span>
              </dd>
              <dt className="mt-1 text-white/80">{c.libelle}</dt>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="offres-titre" className="fond-papier">
        <div className="container mx-auto px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <Planche repere="PL. 19" legende="Registre des offres" id="offres-titre" titre="Les offres." largeur="8ch" />
            <div role="group" aria-label="Filtrer par type d'offre" className="flex flex-wrap gap-2">
              {FILTRES.map((f) => {
                const actif = f.valeur === filtre;
                return (
                  <button
                    key={f.valeur}
                    type="button"
                    aria-pressed={actif}
                    onClick={() => setFiltre(f.valeur)}
                    className={`etiquette min-h-11 border px-4 text-[12px] transition-colors duration-200 ${
                      actif ? "border-indigo bg-indigo text-white" : "border-indigo/40 bg-white text-indigo hover:bg-indigo/10"
                    }`}
                  >
                    {f.label}
                  </button>
                );
              })}
            </div>
          </div>

          <p className="etiquette mt-6 text-encre-douce" aria-live="polite">
            {jour > 0
              ? `${ouvertes} offre${ouvertes > 1 ? "s" : ""} ouverte${ouvertes > 1 ? "s" : ""} sur ${offres.length}`
              : `${offres.length} offre${offres.length > 1 ? "s" : ""}`}
          </p>

          <ul ref={liste} className="mt-3 border-t-2 border-indigo">
            {offres.map((o) => (
              <li key={o.id} className={`border-b border-indigo/25 ${o.cloturee ? "opacity-70" : ""}`}>
                <article className="grid gap-x-8 gap-y-4 py-7 lg:grid-cols-[9rem_1fr_15rem]">
                  <div className="flex items-start gap-2 lg:flex-col lg:gap-1">
                    <p className="etiquette bg-indigo px-3 py-1 text-[12px] text-white">{TYPE_LABELS[o.type]}</p>
                    {o.duree && <p className="px-1 py-1 text-sm font-semibold text-encre-douce">{o.duree}</p>}
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-xl font-bold leading-snug text-encre">{o.titre}</h3>
                    <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-encre-douce">
                      <span className="font-semibold text-indigo">{o.entreprise}</span>
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5" aria-hidden />
                        {o.lieu}
                      </span>
                    </p>
                    <p className="mt-3 max-w-[64ch] leading-relaxed text-encre-douce">{o.description}</p>
                    <p className="mt-3 text-[15px] text-encre-douce">
                      <span className="font-semibold text-encre">Formations visées : </span>
                      {o.formations.join(", ")}
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 lg:items-end lg:text-right">
                    {o.remuneration && <p className="font-bold text-encre">{o.remuneration}</p>}
                    <p className="inline-flex items-center gap-1.5 text-[15px] text-encre-douce">
                      <CalendarClock className="h-4 w-4" aria-hidden />
                      {o.cloturee ? "Clôturée le " : "Jusqu'au "}
                      {dateLongue(o.dateExpiration)}
                    </p>
                    {o.cloturee ? (
                      <p className="etiquette inline-flex h-11 items-center border border-indigo/30 px-5 text-[12px] text-encre-douce">Offre clôturée</p>
                    ) : (
                      <a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Postuler : ${o.titre}, ${o.entreprise}`}
                        className="btn-usine btn-or !min-h-11"
                      >
                        Postuler
                      </a>
                    )}
                  </div>
                </article>
              </li>
            ))}
          </ul>

          {offres.length === 0 && <p className="mt-10 text-lg text-encre-douce">Aucune offre dans cette catégorie pour le moment.</p>}
        </div>
      </section>

      <section aria-labelledby="partenaires-titre" className="fond-papier border-t border-indigo/30">
        <div className="container mx-auto px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
          <Planche repere="PL. 20" legende="Partenaires" id="partenaires-titre" titre="Ils recrutent nos talents." largeur="14ch" />
          <p data-reveal className="mt-3 max-w-[50ch] text-lg text-encre-douce">
            Des entreprises de premier plan font confiance à l&apos;UPB pour recruter leurs talents.
          </p>
          <ul data-reveal-lignes className="mt-10 grid border-t-2 border-indigo sm:grid-cols-2 lg:grid-cols-3">
            {PARTENAIRES.map((p) => (
              <li key={p.nom} className="border-b border-indigo/25 py-5 pr-6">
                <p className="text-lg font-bold text-encre">{p.nom}</p>
                <p className="text-encre-douce">{p.secteur}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="services-titre" className="fond-papier border-t border-indigo/30">
        <div className="container mx-auto grid gap-10 px-5 py-16 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-8 lg:py-24">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Planche repere="PL. 21" legende="Accompagnement" id="services-titre" titre="Préparez votre insertion." largeur="12ch" />
            <p data-reveal className="mt-4 max-w-[42ch] text-lg leading-relaxed text-encre-douce">
              L&apos;UPB vous accompagne bien au-delà du diplôme, avec des services carrière concrets et personnalisés.
            </p>
          </div>
          <ul data-reveal-lignes className="divide-y divide-indigo/25 border-y-2 border-indigo">
            {services.map((s) => (
              <li key={s.titre} className="py-6">
                <p className="etiquette text-[12px] text-laurier-fonce">{s.freq}</p>
                <h3 className="mt-1 text-xl font-bold text-encre">{s.titre}</h3>
                <p className="mt-1.5 max-w-[56ch] leading-relaxed text-encre-douce">{s.texte}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaFinal
        titre="Vous êtes une entreprise ? Recrutez nos talents."
        texte="Déposez vos offres gratuitement et accédez à un vivier de plus de 5 000 étudiants qualifiés dans le numérique, la finance, le droit et l'environnement."
        actions={[
          { label: "Déposer une offre d'emploi", href: "/contact" },
          { label: "Nous contacter sur WhatsApp", href: WHATSAPP_URL, externe: true, style: "contour" },
        ]}
      />
    </div>
  );
}
