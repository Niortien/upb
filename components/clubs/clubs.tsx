"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, Calendar, Users } from "lucide-react";
import { CtaFinal } from "@/components/common/cta-final";
import { PageHero } from "@/components/common/page-hero";
import { Planche } from "@/components/common/planche";
import { CLUBS } from "@/data/clubs.data";
import { useReveal } from "@/hooks/use-reveal";
import { encreSur } from "@/lib/couleurs";
import { getClubIcon } from "@/lib/club-icons";

const totalMembres = CLUBS.reduce((n, c) => n + c.members, 0);
const totalEvenements = CLUBS.reduce((n, c) => n + c.eventsPerYear, 0);

const mesures = [
  { valeur: CLUBS.length, libelle: "clubs actifs" },
  { valeur: totalMembres, libelle: "membres" },
  { valeur: totalEvenements, libelle: "événements par an" },
];

const deux = (n: number) => String(n).padStart(2, "0");

export default function ClubsPage() {
  const racine = useRef<HTMLDivElement>(null);
  useReveal(racine);

  return (
    <div ref={racine}>
      <PageHero
        variante="arche"
        repere="PL. 08"
        legende="Modules associatifs"
        lignes={["Clubs et", "associations."]}
        intro="Trouvez votre tribu à l'UPB : des clubs pour coder, créer, jouer, débattre et se dépasser, ouverts à toutes les filières."
        image={{ src: "/assets/image/home/collectif.jpg", alt: "Étudiants réunis autour d'une table, ordinateurs et cahiers ouverts, en plein travail de groupe", position: "center 40%" }}
      />

      <section className="fond-indigo text-white">
        <dl className="container mx-auto grid grid-cols-3 px-5 sm:px-6 lg:px-8">
          {mesures.map((m, i) => (
            <div key={m.libelle} className="border-white/25 py-7 pr-3 [&:not(:first-child)]:border-l [&:not(:first-child)]:pl-4 sm:pl-8">
              <p className="etiquette text-[11px] text-laurier">Mesure {deux(i + 1)}</p>
              <dd className="chiffre-upb mt-2 text-4xl text-white sm:text-6xl">
                <span data-compteur={m.valeur}>{m.valeur.toLocaleString("fr-FR")}</span>
              </dd>
              <dt className="mt-1 text-sm text-white/80 sm:text-base">{m.libelle}</dt>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="clubs-titre" className="fond-papier">
        <div className="container mx-auto px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
          <Planche repere="PL. 09" legende="Catalogue des modules" id="clubs-titre" titre="Plus qu'un campus, une communauté." largeur="14ch" />
          <p data-reveal className="mt-4 max-w-[56ch] text-lg leading-relaxed text-encre-douce">
            Les clubs sont le cœur battant de la vie étudiante. Rejoignez-en un, ou fondez le vôtre : c&apos;est ici que les passions deviennent des compétences.
          </p>

          <ul data-reveal-lignes className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CLUBS.map((club, i) => {
              const Icon = getClubIcon(club.iconName);
              const encre = encreSur(club.color);
              return (
                <li key={club.id}>
                  <Link href={`/clubs/${club.slug}`} className="group flex h-full flex-col border border-indigo/40 bg-white transition-shadow duration-300 hover:shadow-[8px_8px_0_var(--upb-indigo)]">
                    <span className="relative flex h-44 items-end justify-between overflow-hidden p-5" style={{ backgroundColor: club.color, color: encre }}>
                      <Icon aria-hidden strokeWidth={1.25} className="absolute -right-4 -top-4 h-44 w-44 opacity-20 transition-transform duration-700 ease-arrivee group-hover:rotate-6 group-hover:scale-110" />
                      <span className="etiquette absolute left-4 top-4 text-[11px] opacity-90">M-{deux(i + 1)}</span>
                      <span className="titre-upb relative text-4xl leading-none">{club.name}</span>
                      <span aria-hidden className="relative flex h-11 w-11 shrink-0 items-center justify-center bg-white text-indigo transition-colors duration-200 group-hover:bg-laurier">
                        <ArrowUpRight className="h-5 w-5" />
                      </span>
                    </span>

                    <span className="flex flex-1 flex-col p-6">
                      <span className="etiquette text-[12px] text-laurier-fonce">{club.tag}</span>
                      <span className="mt-2 block leading-relaxed text-encre-douce">{club.description}</span>
                      <span className="mt-4 flex flex-wrap gap-2">
                        {club.tags.slice(0, 4).map((t) => (
                          <span key={t} className="etiquette border border-indigo/30 px-2.5 py-1 text-[11px] text-indigo">
                            {t}
                          </span>
                        ))}
                      </span>
                      <span className="mt-auto block pt-6">
                        <span className="flex flex-wrap items-center gap-x-5 gap-y-1 border-t border-indigo/25 pt-4 text-[15px] font-semibold text-encre">
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
