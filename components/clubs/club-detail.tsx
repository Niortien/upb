"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowLeft, Calendar, Clock, Lightbulb, Mail, MapPin, Sparkles, Trophy, Zap } from "lucide-react";
import { CtaFinal } from "@/components/common/cta-final";
import type { Club, ClubProject } from "@/data/clubs.data";
import { useReveal } from "@/hooks/use-reveal";
import { iconeDeClub } from "@/lib/club-icons";
import { encreSur } from "@/lib/couleurs";

gsap.registerPlugin(useGSAP);

const TYPE_PROJET = {
  solution: { label: "Solution", icon: Zap },
  invention: { label: "Invention", icon: Lightbulb },
  event: { label: "Événement", icon: Trophy },
  publication: { label: "Publication", icon: Sparkles },
};

const STATUT_PROJET: Record<ClubProject["status"], string> = {
  "Terminé": "bg-craie text-encre",
  "En cours": "bg-laurier/25 text-nuit",
  "À venir": "bg-indigo/10 text-indigo",
};

function initiales(nom: string): string {
  return nom
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

/**
 * Fiche d'un club : en-tête à la couleur du club, présentation, activités, projets, bureau et comment rejoindre.
 * Les photos du club ne sont pas affichées : celles des données ne le représentent pas.
 */
export default function ClubDetail({ club }: { club: Club }) {
  const racine = useRef<HTMLDivElement>(null);
  const encre = encreSur(club.color);
  useReveal(racine);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".cd-ligne > span", { yPercent: 112, duration: 1, stagger: 0.09, ease: "expo.out" });
        gsap.from(".cd-apparait", { opacity: 0, y: 18, duration: 0.8, stagger: 0.08, delay: 0.45, ease: "expo.out" });
        gsap.from(".cd-icone", { scale: 0.6, rotate: -14, opacity: 0, duration: 1.1, ease: "back.out(1.6)", delay: 0.2 });
      });
      return () => mm.revert();
    },
    { scope: racine }
  );

  const lignesNom = club.name.split(" ").reduce<string[]>((acc, mot) => {
    const d = acc[acc.length - 1];
    if (d !== undefined && (d + " " + mot).length <= 14) acc[acc.length - 1] = d + " " + mot;
    else acc.push(mot);
    return acc;
  }, []);
  const projetsMis = club.projects.filter((p) => p.highlight);
  const autresProjets = club.projects.filter((p) => !p.highlight);
  const reseaux = club.socialLinks.filter((l) => l.url && l.url !== "#");

  return (
    <div ref={racine}>
      <section className="relative overflow-hidden pb-14 pt-32 lg:pb-20 lg:pt-40" style={{ backgroundColor: club.color, color: encre }}>
        {iconeDeClub(club.iconName, {
          "aria-hidden": true,
          strokeWidth: 1,
          className: "cd-icone pointer-events-none absolute -right-16 -top-10 h-[30rem] w-[30rem] opacity-[0.14] lg:right-10",
        })}
        <div className="container relative mx-auto px-5 sm:px-6 lg:px-8">
          <Link
            href="/clubs"
            className="cd-apparait mb-10 inline-flex min-h-11 items-center gap-2 font-semibold opacity-90 transition-opacity hover:opacity-100"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Tous les clubs
          </Link>
          <p className="cd-apparait font-bold opacity-90">
            {club.tag} · fondé en {club.founded}
          </p>
          <h1 className="titre-upb mt-3 text-[clamp(2.6rem,min(7.4vw,11vh),6rem)]">
            {lignesNom.map((l) => (
              <span key={l} className="cd-ligne block overflow-hidden pb-[0.07em]">
                <span className="block">{l}</span>
              </span>
            ))}
          </h1>
          <p className="cd-apparait mt-5 max-w-[34ch] text-xl font-semibold leading-snug sm:text-2xl">{club.tagline}</p>

          <dl className="cd-apparait mt-10 flex flex-wrap gap-x-10 gap-y-5">
            <div>
              <dt className="inline-flex items-center gap-2 text-sm font-semibold opacity-85">
                <Calendar className="h-4 w-4" aria-hidden />
                Événements par an
              </dt>
              <dd className="chiffre-upb text-4xl">{club.eventsPerYear}</dd>
            </div>
            <div>
              <dt className="text-sm font-semibold opacity-85">Membres</dt>
              <dd className="chiffre-upb text-4xl">{club.members}+</dd>
            </div>
            <div className="min-w-0">
              <dt className="inline-flex items-center gap-2 text-sm font-semibold opacity-85">
                <Clock className="h-4 w-4" aria-hidden />
                Rendez-vous
              </dt>
              <dd className="mt-1 max-w-[30ch] text-lg font-bold leading-snug">{club.schedule}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section aria-labelledby="histoire-titre" className="bg-white">
        <div className="container mx-auto grid gap-8 px-5 py-16 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-8 lg:py-24">
          <h2 id="histoire-titre" data-reveal className="titre-upb text-[clamp(2rem,4vw,3.2rem)] text-indigo">
            Notre histoire.
          </h2>
          <div>
            <p data-reveal className="max-w-[60ch] text-lg leading-relaxed text-encre-douce">
              {club.longDescription}
            </p>
            <ul data-reveal className="mt-6 flex flex-wrap gap-2">
              {club.tags.map((t) => (
                <li key={t} className="rounded-full bg-craie px-4 py-1.5 font-semibold text-encre">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="activites-titre" className="bg-craie">
        <div className="container mx-auto px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
          <h2 id="activites-titre" data-reveal className="titre-upb max-w-[20ch] text-[clamp(2rem,4vw,3.2rem)] text-indigo">
            Ce qu&apos;on fait ensemble.
          </h2>
          <ul data-reveal-lignes className="mt-10 divide-y divide-trait border-y border-trait">
            {club.activities.map((a) => (
              <li key={a.title} className="grid gap-x-10 gap-y-1 py-6 md:grid-cols-[14rem_1fr]">
                <p className="font-bold text-laurier-fonce">{a.frequency}</p>
                <div>
                  <h3 className="text-xl font-bold text-encre">{a.title}</h3>
                  <p className="mt-1.5 max-w-[60ch] leading-relaxed text-encre-douce">{a.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {club.projects.length > 0 && (
        <section aria-labelledby="projets-titre" className="bg-white">
          <div className="container mx-auto px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
            <h2 id="projets-titre" data-reveal className="titre-upb max-w-[22ch] text-[clamp(2rem,4vw,3.2rem)] text-indigo">
              Ce que nous avons bâti.
            </h2>
            {projetsMis.length > 0 && (
              <ul data-reveal-lignes className="mt-10 grid gap-6 md:grid-cols-2">
                {projetsMis.map((p) => (
                  <ProjetCarte key={p.title} projet={p} mis />
                ))}
              </ul>
            )}
            {autresProjets.length > 0 && (
              <ul data-reveal-lignes className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {autresProjets.map((p) => (
                  <ProjetCarte key={p.title} projet={p} />
                ))}
              </ul>
            )}
          </div>
        </section>
      )}

      {club.coreTeam.length > 0 && (
        <section aria-labelledby="equipe-titre" className="bg-craie">
          <div className="container mx-auto px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
            <h2 id="equipe-titre" data-reveal className="titre-upb max-w-[20ch] text-[clamp(2rem,4vw,3.2rem)] text-indigo">
              L&apos;équipe dirigeante.
            </h2>
            <ul data-reveal-lignes className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
              {club.coreTeam.map((m) => (
                <li key={m.name} className="flex items-center gap-4">
                  <span
                    aria-hidden
                    className="titre-upb flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-xl"
                    style={{ backgroundColor: club.color, color: encre }}
                  >
                    {initiales(m.name)}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold leading-tight text-encre">{m.name}</h3>
                    <p className="font-semibold text-indigo">{m.role}</p>
                    <p className="text-sm text-encre-douce">{m.filiere}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section aria-labelledby="rejoindre-titre" className="bg-indigo text-white">
        <div className="container mx-auto grid gap-10 px-5 py-16 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8 lg:py-24">
          <div>
            <h2 id="rejoindre-titre" data-reveal className="titre-upb text-[clamp(2rem,4vw,3.2rem)]">
              Comment rejoindre ?
            </h2>
            <p data-reveal className="mt-4 max-w-[48ch] text-lg leading-relaxed text-white/85">
              {club.joinInfo}
            </p>
          </div>
          <ul data-reveal-lignes className="space-y-5 text-lg">
            <li className="flex items-start gap-4 border-t border-white/20 pt-5">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-laurier" aria-hidden />
              <span>
                <span className="block text-sm font-bold text-white/70">Planning et lieu</span>
                {club.schedule}
              </span>
            </li>
            <li className="flex items-start gap-4 border-t border-white/20 pt-5">
              <Mail className="mt-1 h-5 w-5 shrink-0 text-laurier" aria-hidden />
              <span>
                <span className="block text-sm font-bold text-white/70">Écrire au club</span>
                <a href={`mailto:${club.contactEmail}`} className="lien-souligne inline-flex min-h-11 items-center break-all font-semibold">
                  {club.contactEmail}
                </a>
              </span>
            </li>
            {reseaux.length > 0 && (
              <li className="flex flex-wrap gap-3 border-t border-white/20 pt-5">
                {reseaux.map((r) => (
                  <a
                    key={r.platform}
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center rounded-full border border-white/35 px-5 font-semibold transition-colors hover:bg-white/10"
                  >
                    {r.platform}
                  </a>
                ))}
              </li>
            )}
          </ul>
        </div>
      </section>

      <CtaFinal
        titre={`Prêt à rejoindre le ${club.name} ?`}
        texte={club.joinInfo}
        actions={[
          { label: "Nous contacter", href: `mailto:${club.contactEmail}`, externe: true },
          { label: "Tous les clubs", href: "/clubs", style: "contour" },
        ]}
      />
    </div>
  );
}

function ProjetCarte({ projet, mis = false }: { projet: ClubProject; mis?: boolean }) {
  const type = TYPE_PROJET[projet.type];
  const TypeIcon = type.icon;
  return (
    <li className={`rounded-3xl border border-trait bg-craie p-6 ${mis ? "sm:p-8" : ""}`}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="inline-flex items-center gap-2 font-bold text-indigo">
          <TypeIcon className="h-4 w-4" aria-hidden />
          {type.label}
        </span>
        <span className={`rounded-full px-3 py-1 text-sm font-bold ${STATUT_PROJET[projet.status]}`}>{projet.status}</span>
      </div>
      <h3 className={`mt-4 font-bold leading-snug text-encre ${mis ? "text-2xl" : "text-lg"}`}>{projet.title}</h3>
      <p className="mt-2 leading-relaxed text-encre-douce">{projet.description}</p>
      <p className="mt-3 text-sm font-bold text-laurier-fonce">{projet.year}</p>
    </li>
  );
}
