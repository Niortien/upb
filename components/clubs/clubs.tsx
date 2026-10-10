"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, Calendar, Users } from "lucide-react";
import { CtaFinal } from "@/components/common/cta-final";
import { PageHero } from "@/components/common/page-hero";
import { CLUBS } from "@/data/clubs.data";
import { useReveal } from "@/hooks/use-reveal";
import { encreSur } from "@/lib/couleurs";
import { getClubIcon } from "@/lib/club-icons";

const totalMembres = CLUBS.reduce((n, c) => n + c.members, 0);
const totalEvenements = CLUBS.reduce((n, c) => n + c.eventsPerYear, 0);

const chiffres = [
  { valeur: CLUBS.length, suffixe: "", libelle: "clubs actifs" },
  { valeur: totalMembres, suffixe: "", libelle: "membres" },
  { valeur: totalEvenements, suffixe: "", libelle: "événements par an" },
];

export default function ClubsPage() {
  const racine = useRef<HTMLDivElement>(null);
  useReveal(racine);

  return (
    <div ref={racine}>
      <PageHero
        variante="arche"
        lignes={["Clubs et", "associations."]}
        intro="Trouvez votre tribu à l'UPB : des clubs pour coder, créer, jouer, débattre et se dépasser, ouverts à toutes les filières."
        image={{ src: "/assets/image/home/collectif.jpg", alt: "Étudiants réunis autour d'une table, ordinateurs et cahiers ouverts, en plein travail de groupe", position: "center 40%" }}
      />

      <section className="bg-craie">
        <dl className="container mx-auto grid grid-cols-3 border-y border-trait px-5 sm:px-6 lg:px-8">
          {chiffres.map((c) => (
            <div key={c.libelle} className="border-trait py-7 pr-3 [&:not(:first-child)]:border-l [&:not(:first-child)]:pl-4 sm:pl-8">
              <dd className="chiffre-upb text-3xl text-indigo sm:text-5xl">
                <span data-compteur={c.valeur} data-suffixe={c.suffixe}>
                  {c.valeur.toLocaleString("fr-FR")}
                </span>
              </dd>
              <dt className="mt-1 text-sm text-encre-douce sm:text-base">{c.libelle}</dt>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="clubs-titre" className="bg-craie">
        <div className="container mx-auto px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
          <h2 id="clubs-titre" data-reveal className="titre-upb max-w-[20ch] text-[clamp(2rem,4.2vw,3.4rem)] text-indigo">
            Plus qu&apos;un campus, une communauté.
          </h2>
          <p data-reveal className="mt-4 max-w-[56ch] text-lg leading-relaxed text-encre-douce">
            Les clubs sont le cœur battant de la vie étudiante. Rejoignez-en un, ou fondez le vôtre : c&apos;est ici que les passions deviennent des compétences.
          </p>

          <ul data-reveal-lignes className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CLUBS.map((club) => {
              const Icon = getClubIcon(club.iconName);
              const encre = encreSur(club.color);
              return (
                <li key={club.id}>
                  <Link
                    href={`/clubs/${club.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-3xl border border-trait bg-white transition-shadow duration-300 hover:shadow-[0_24px_48px_-28px_rgb(20_23_74/0.45)]"
                  >
                    <span
                      className="relative flex h-44 items-end justify-between overflow-hidden p-5"
                      style={{ backgroundColor: club.color, color: encre }}
                    >
                      <Icon
                        aria-hidden
                        strokeWidth={1.25}
                        className="absolute -right-4 -top-4 h-44 w-44 opacity-20 transition-transform duration-700 ease-arrivee group-hover:rotate-6 group-hover:scale-110"
                      />
                      <span className="titre-upb relative text-2xl leading-tight">{club.name}</span>
                      <span
                        aria-hidden
                        className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-indigo transition-colors duration-200 group-hover:bg-laurier"
                      >
                        <ArrowUpRight className="h-5 w-5" />
                      </span>
                    </span>

                    <span className="flex flex-1 flex-col p-6">
                      <span className="text-sm font-bold text-laurier-fonce">{club.tag}</span>
                      <span className="mt-2 block leading-relaxed text-encre-douce">{club.description}</span>
                      <span className="mt-4 flex flex-wrap gap-2">
                        {club.tags.slice(0, 4).map((t) => (
                          <span key={t} className="rounded-full bg-craie px-3 py-1 text-sm font-semibold text-encre">
                            {t}
                          </span>
                        ))}
                      </span>
                      <span className="mt-auto block pt-6">
                        <span className="flex flex-wrap items-center gap-x-5 gap-y-1 border-t border-trait pt-4 text-[15px] font-semibold text-encre">
                          <span className="inline-flex items-center gap-2">
                            <Users className="h-4 w-4 text-indigo" aria-hidden />
                            {club.members} membres
                          </span>
                          <span className="inline-flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-indigo" aria-hidden />
                            {club.eventsPerYear} événements/an
                          </span>
                        </span>
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <CtaFinal
        titre="Votre passion vous attend ici."
        texte="Adhérer à un club est gratuit. C'est une aventure humaine qui enrichit votre parcours bien au-delà des cours."
        actions={[
          { label: "Nous rejoindre", href: "/contact" },
          { label: "Découvrir l'UPB", href: "/about", style: "contour" },
        ]}
      />
    </div>
  );
}
