"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowLeft, Calendar, Clock, Lightbulb, Mail, MapPin, Sparkles, Trophy, Zap } from "lucide-react";
import { CtaFinal } from "@/components/common/cta-final";
import { Planche } from "@/components/common/planche";
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
  "Terminé": "border-indigo/40 text-indigo",
  "En cours": "border-laurier bg-laurier text-nuit",
  "À venir": "border-indigo bg-indigo text-white",
};

const deux = (n: number) => String(n).padStart(2, "0");

function initiales(nom: string): string {
  return nom.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
}

/**
 * Fiche d'un club : en-tête à la couleur du club, puis une fiche technique (présentation, activités, projets, bureau).
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
      <section className="relative overflow-hidden pb-14 pt-28 lg:pb-20 lg:pt-36" style={{ backgroundColor: club.color, color: encre }}>
        <div aria-hidden className="absolute inset-0 opacity-25" style={{ backgroundImage: "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)", backgroundSize: "32px 32px", opacity: 0.12 }} />
        {iconeDeClub(club.iconName, {
          "aria-hidden": true,
          strokeWidth: 1,
          className: "cd-icone pointer-events-none absolute -right-16 -top-10 h-[30rem] w-[30rem] opacity-[0.14] lg:right-10",
        })}
        <div className="container relative mx-auto px-5 sm:px-6 lg:px-8">
          <Link href="/clubs" className="cd-apparait etiquette mb-8 inline-flex min-h-11 items-center gap-2 opacity-90 transition-opacity hover:opacity-100">
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Tous les clubs
          </Link>
          <p className="cd-apparait etiquette">
            {club.tag} · fondé en {club.founded}
          </p>
          <h1 className="titre-pochoir mt-3 text-[clamp(3rem,min(9vw,13svh),7.6rem)]">
            {lignesNom.map((l) => (
              <span key={l} className="cd-ligne block overflow-hidden pb-[0.05em]">
                <span className="block">{l}</span>
              </span>
            ))}
          </h1>
          <p className="cd-apparait mt-5 max-w-[34ch] text-xl font-semibold leading-snug sm:text-2xl">{club.tagline}</p>

          <dl className="cd-apparait mt-10 flex flex-wrap gap-x-10 gap-y-5 border-t border-current/40 pt-5">
            <div>
              <dt className="etiquette inline-flex items-center gap-2 text-[11px] opacity-85">
                <Calendar className="h-4 w-4" aria-hidden />
                Événements par an
              </dt>
              <dd className="chiffre-upb text-4xl">{club.eventsPerYear}</dd>
            </div>
            <div>
              <dt className="etiquette text-[11px] opacity-85">Membres</dt>
              <dd className="chiffre-upb text-4xl">{club.members}+</dd>
            </div>
            <div className="min-w-0">
              <dt className="etiquette inline-flex items-center gap-2 text-[11px] opacity-85">
                <Clock className="h-4 w-4" aria-hidden />
                Rendez-vous
              </dt>
              <dd className="mt-1 max-w-[30ch] text-lg font-bold leading-snug">{club.schedule}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section aria-labelledby="histoire-titre" className="fond-papier">
        <div className="container mx-auto grid gap-8 px-5 py-16 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-8 lg:py-24">
          <Planche repere="§ 1" legende="Présentation" id="histoire-titre" titre="Notre histoire." largeur="10ch" />
          <div>
            <p data-reveal className="max-w-[60ch] text-lg leading-relaxed text-encre-douce">{club.longDescription}</p>
            <ul data-reveal className="mt-6 flex flex-wrap gap-2">
              {club.tags.map((t) => (
                <li key={t} className="etiquette border border-indigo/40 px-3 py-1.5 text-[12px] text-indigo">{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="activites-titre" className="fond-papier border-t border-indigo/30">
        <div className="container mx-auto px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
          <Planche repere="§ 2" legende="Activités" id="activites-titre" titre="Ce qu'on fait ensemble." largeur="12ch" />
          <ul data-reveal-lignes className="mt-10 border-t-2 border-indigo">
            {club.activities.map((a, i) => (
              <li key={a.title} className="grid gap-x-8 gap-y-1 border-b border-indigo/25 py-6 md:grid-cols-[3rem_13rem_1fr]">
                <span className="etiquette text-indigo">{deux(i + 1)}</span>
                <p className="etiquette text-laurier-fonce">{a.frequency}</p>
                <div>
                  <h3 className="text-xl font-semibold text-encre">{a.title}</h3>
                  <p className="mt-1.5 max-w-[60ch] leading-relaxed text-encre-douce">{a.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {club.projects.length > 0 && (
        <section aria-labelledby="projets-titre" className="fond-indigo text-white">
          <div className="container mx-auto px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
            <Planche repere="§ 3" legende="Réalisations" id="projets-titre" titre="Ce que nous avons bâti." sombre largeur="12ch" />
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
        <section aria-labelledby="equipe-titre" className="fond-papier">
          <div className="container mx-auto px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
            <Planche repere="§ 4" legende="Bureau" id="equipe-titre" titre="L'équipe dirigeante." largeur="12ch" />
            <ul data-reveal-lignes className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
              {club.coreTeam.map((m) => (
                <li key={m.name} className="flex items-center gap-4 border-t border-indigo/30 pt-5">
                  <span aria-hidden className="titre-upb flex h-16 w-16 shrink-0 items-center justify-center text-3xl" style={{ backgroundColor: club.color, color: encre }}>
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

      <section aria-labelledby="rejoindre-titre" className="fond-plan text-white">
        <div className="container mx-auto grid gap-10 px-5 py-16 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8 lg:py-24">
          <div>
            <Planche repere="§ 5" legende="Adhésion" id="rejoindre-titre" titre="Comment rejoindre ?" sombre largeur="10ch" />
            <p data-reveal className="mt-4 max-w-[48ch] text-lg leading-relaxed text-white/85">{club.joinInfo}</p>
          </div>
          <ul data-reveal-lignes className="space-y-5 text-lg lg:pt-12">
            <li className="flex items-start gap-4 border-t border-white/30 pt-5">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-laurier" aria-hidden />
              <span>
                <span className="etiquette block text-[11px] text-white/70">Planning et lieu</span>
                {club.schedule}
              </span>
            </li>
            <li className="flex items-start gap-4 border-t border-white/30 pt-5">
              <Mail className="mt-1 h-5 w-5 shrink-0 text-laurier" aria-hidden />
              <span>
                <span className="etiquette block text-[11px] text-white/70">Écrire au club</span>
                <a href={`mailto:${club.contactEmail}`} className="lien-souligne inline-flex min-h-11 items-center break-all font-semibold">
                  {club.contactEmail}
                </a>
              </span>
            </li>
            {reseaux.length > 0 && (
              <li className="flex flex-wrap gap-3 border-t border-white/30 pt-5">
                {reseaux.map((r) => (
                  <a key={r.platform} href={r.url} target="_blank" rel="noopener noreferrer" className="btn-usine btn-trait !min-h-11">
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
    <li className={`border border-white/35 bg-nuit/50 p-6 ${mis ? "sm:p-8" : ""}`}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="etiquette inline-flex items-center gap-2 text-[12px] text-laurier">
          <TypeIcon className="h-4 w-4" aria-hidden />
          {type.label}
        </span>
        <span className={`etiquette border px-2.5 py-1 text-[11px] ${projet.status === "Terminé" ? "border-white/50 text-white" : STATUT_PROJET[projet.status]}`}>{projet.status}</span>
      </div>
      <h3 className={`mt-4 font-semibold leading-snug ${mis ? "text-2xl" : "text-lg"}`}>{projet.title}</h3>
      <p className="mt-2 leading-relaxed text-white/80">{projet.description}</p>
      <p className="etiquette mt-3 text-[12px] text-laurier">{projet.year}</p>
    </li>
  );
}
