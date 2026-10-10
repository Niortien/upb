"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import { Engrenage } from "@/components/common/engrenage";
import { Reperes } from "@/components/common/reperes";
import { WHATSAPP_URL } from "@/lib/constants";

gsap.registerPlugin(useGSAP);

interface Diapo {
  titre: [string, string, string];
  texte: string;
  image: string;
  alt: string;
  position: string;
  /** Légende de la figure, comme sous un schéma. */
  legende: string;
  fait: { valeur: number; suffixe: string; libelle: string };
}

const diapos: Diapo[] = [
  {
    titre: ["Forgez votre", "excellence", "à Bingerville."],
    texte: "L'université qui allie rigueur académique, innovation technologique et développement humain.",
    image: "/assets/image/diplome/1.jpg",
    alt: "Diplômés de l'UPB en toge et écharpe blanche lors de la cérémonie de remise des diplômes",
    position: "62% center",
    legende: "Remise des diplômes",
    fait: { valeur: 15000, suffixe: "+", libelle: "étudiants formés" },
  },
  {
    titre: ["Des diplômés", "qui rayonnent", "partout."],
    texte: "Des parcours d'excellence, de Bingerville à toute l'Afrique.",
    image: "/assets/image/home/campus/2O4A6914.webp",
    alt: "Trois diplômées souriantes en toge devant les bâtiments du campus",
    position: "center 30%",
    legende: "Promotion sur le campus",
    fait: { valeur: 5, suffixe: "+", libelle: "pays représentés" },
  },
  {
    titre: ["Un campus", "qui inspire", "chaque jour."],
    texte: "Bâtiments modernes, espaces verts et vie associative, au cœur de Bingerville.",
    image: "/assets/image/home/campus/2O4A6842.webp",
    alt: "Allée du campus entre deux bâtiments, le drapeau ivoirien au centre",
    position: "center 55%",
    legende: "Allée centrale du campus",
    fait: { valeur: 5000, suffixe: "+", libelle: "étudiants actifs" },
  },
  {
    titre: ["Apprendre", "en faisant", "dès le début."],
    texte: "Laboratoires, projets pratiques et ordinateurs offerts à chaque étudiant.",
    image: "/assets/image/home/star/laboratoire.jpg",
    alt: "Étudiantes en blouse blanche en travaux pratiques devant un oscilloscope",
    position: "center 45%",
    legende: "Travaux pratiques, laboratoire",
    fait: { valeur: 8, suffixe: "+", libelle: "programmes, de la licence au doctorat" },
  },
  {
    titre: ["Une cité", "pour se sentir", "chez soi."],
    texte: "Chambres modernes, restauration et sécurité 24 h/24, à deux pas des cours.",
    image: "/assets/image/cite/cite1.jpg",
    alt: "Chambre de la cité universitaire avec bureau, lit superposé et fenêtre fleurie",
    position: "center 40%",
    legende: "Chambre, cité universitaire",
    fait: { valeur: 800, suffixe: "+", libelle: "places à la cité universitaire" },
  },
];

/** Temps d'affichage d'une diapositive avant la suivante. */
const DUREE = 6.5;
/** Dalles du balayage : colonnes × lignes. */
const COLONNES = 14;
const LIGNES = 9;
const DALLES = Array.from({ length: COLONNES * LIGNES }, (_, i) => i);

const deux = (n: number) => String(n).padStart(2, "0");

/**
 * Ouverture de l'accueil : un carrousel de planches. Chaque diapositive est une figure cadrée entre repères de
 * coin, cotée comme un schéma, avec son titre en capitales d'atelier. Le changement de planche se fait par un
 * balayage en dalles (l'image se « charge » comme un rendu de plan) et l'engrenage avance d'un cran.
 * Défilement automatique, glissement, flèches du clavier, pause (bouton, focus clavier, onglet masqué) ;
 * avec « réduire les animations » il démarre à l'arrêt et les planches se remplacent sans mouvement.
 */
const HeroSection = () => {
  const racine = useRef<HTMLElement>(null);
  const [actif, setActif] = useState(0);
  const [pauseUtilisateur, setPauseUtilisateur] = useState(false);
  const [pauseTemporaire, setPauseTemporaire] = useState(false);
  const [reduit, setReduit] = useState(false);

  const memoire = useRef({ index: 0, occupe: false, progression: null as gsap.core.Tween | null, pause: false, reduit: false });
  const allerRef = useRef<((vers: number) => void) | null>(null);
  const departX = useRef<number | null>(null);

  const enPause = pauseUtilisateur || pauseTemporaire || reduit;

  useGSAP(
    (_, contextSafe) => {
      const r = racine.current;
      if (!r || !contextSafe) return;
      const mm = gsap.matchMedia();

      const demarrerProgression = (i: number) => {
        const m = memoire.current;
        m.progression?.kill();
        const rempli = r.querySelectorAll<HTMLElement>("[data-segment-rempli]");
        rempli.forEach((el, k) => gsap.set(el, { scaleX: k < i ? 1 : 0 }));
        m.progression = gsap.fromTo(
          rempli[i],
          { scaleX: 0 },
          { scaleX: 1, duration: DUREE, ease: "none", paused: m.pause, onComplete: () => aller((i + 1) % diapos.length) }
        );
      };

      /** Une planche arrive : titre en cascade, phrase, boutons, cotes qui se tracent, chiffre qui grimpe. */
      const entrerTexte = (slide: HTMLElement, delai: number) => {
        gsap.fromTo(slide.querySelectorAll("[data-ligne] > span"), { yPercent: 112 }, { yPercent: 0, duration: 0.9, stagger: 0.08, delay: delai, ease: "expo.out" });
        gsap.fromTo(slide.querySelectorAll("[data-apparait]"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.07, delay: delai + 0.25, ease: "expo.out" });
        gsap.fromTo(slide.querySelectorAll("[data-cote]"), { scaleX: 0 }, { scaleX: 1, duration: 1, delay: delai + 0.1, ease: "expo.out", transformOrigin: "left center" });
        gsap.fromTo(slide.querySelectorAll("[data-cote-etiquette]"), { opacity: 0 }, { opacity: 1, duration: 0.5, delay: delai + 0.7 });
        const chiffre = slide.querySelector<HTMLElement>("[data-fait-nombre]");
        if (chiffre) {
          const cible = Number(chiffre.dataset.faitNombre);
          const suffixe = chiffre.dataset.suffixe ?? "";
          const o = { n: 0 };
          gsap.to(o, {
            n: cible,
            duration: 1.5,
            delay: delai + 0.3,
            ease: "power3.out",
            onUpdate: () => {
              chiffre.textContent = `${Math.round(o.n).toLocaleString("fr-FR")}${suffixe}`;
            },
          });
        }
      };

      const tourner = (delai: number) => {
        gsap.to(r.querySelector("[data-engrenage]"), { rotation: "+=72", duration: 1.3, delay: delai, ease: "expo.inOut" });
      };

      const rouler = (index: number, delai: number) => {
        const n = r.querySelector<HTMLElement>("[data-compteur-chiffre]");
        if (!n) return;
        gsap.delayedCall(delai, () => {
          n.textContent = deux(index + 1);
          gsap.fromTo(n, { yPercent: 70, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.5, ease: "expo.out" });
        });
      };

      const aller = (vers: number) => {
        const m = memoire.current;
        if (m.occupe || vers === m.index) return;
        m.occupe = true;
        m.progression?.kill();

        const slides = gsap.utils.toArray<HTMLElement>("[data-diapo]", r);
        const sortante = slides[m.index];
        const entrante = slides[vers];
        const dalles = r.querySelectorAll("[data-dalle]");

        // Sans mouvement : simple remplacement.
        if (m.reduit) {
          gsap.set(sortante, { autoAlpha: 0 });
          gsap.set(entrante, { autoAlpha: 1 });
          gsap.set(entrante.querySelectorAll("[data-ligne] > span, [data-apparait], [data-cote], [data-cote-etiquette]"), { clearProps: "all" });
          const n = r.querySelector<HTMLElement>("[data-compteur-chiffre]");
          if (n) n.textContent = deux(vers + 1);
          m.index = vers;
          m.occupe = false;
          setActif(vers);
          return;
        }

        const tl = gsap.timeline({
          onComplete: () => {
            m.index = vers;
            m.occupe = false;
            setActif(vers);
            demarrerProgression(vers);
          },
        });
        // Le texte sortant file vers le haut pendant que les dalles couvrent l'écran.
        tl.to(sortante.querySelectorAll("[data-ligne] > span"), { yPercent: -112, duration: 0.45, stagger: 0.04, ease: "expo.in" }, 0)
          .to(sortante.querySelectorAll("[data-apparait]"), { opacity: 0, duration: 0.25 }, 0)
          .to(dalles, { opacity: 1, duration: 0.28, stagger: { amount: 0.5, from: "random" }, ease: "none" }, 0.05)
          .add(() => {
            gsap.set(sortante, { autoAlpha: 0 });
            gsap.set(entrante, { autoAlpha: 1 });
            gsap.fromTo(entrante.querySelector("[data-photo]"), { scale: 1.28 }, { scale: 1.04, duration: DUREE + 1.2, ease: "power2.out" });
            entrerTexte(entrante, 0.15);
            tourner(0);
            rouler(vers, 0.1);
          }, 0.75)
          .to(dalles, { opacity: 0, duration: 0.28, stagger: { amount: 0.5, from: "random" }, ease: "none" }, 0.82);
      };

      allerRef.current = contextSafe(aller);

      // ── État initial : seule la première planche est visible, les dalles sont éteintes. ──
      gsap.set(r.querySelectorAll("[data-diapo]:not(:first-child)"), { autoAlpha: 0 });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        memoire.current.reduit = false;
        setReduit(false);
        const premiere = r.querySelector<HTMLElement>("[data-diapo]")!;
        // Ouverture : l'écran est d'abord couvert de dalles, qui s'éteignent une à une.
        gsap.fromTo(r.querySelectorAll("[data-dalle]"), { opacity: 1 }, { opacity: 0, duration: 0.3, stagger: { amount: 0.8, from: "random" }, ease: "none", delay: 0.1 });
        gsap.from(premiere.querySelector("[data-photo]"), { scale: 1.3, duration: 2.2, ease: "expo.out" });
        entrerTexte(premiere, 0.5);
        gsap.from(r.querySelectorAll("[data-controles] > *"), { opacity: 0, y: 14, duration: 0.7, delay: 1, ease: "expo.out" });
        demarrerProgression(0);

        // Parallaxe douce des photos au pointeur (souris uniquement).
        const photos = r.querySelectorAll<HTMLElement>("[data-photo]");
        const px = gsap.quickTo(photos, "x", { duration: 1.2, ease: "power3.out" });
        const py = gsap.quickTo(photos, "y", { duration: 1.2, ease: "power3.out" });
        const bouge = (e: PointerEvent) => {
          if (e.pointerType !== "mouse") return;
          px((e.clientX / window.innerWidth - 0.5) * -18);
          py((e.clientY / window.innerHeight - 0.5) * -12);
        };
        r.addEventListener("pointermove", bouge);
        return () => r.removeEventListener("pointermove", bouge);
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        memoire.current.reduit = true;
        setReduit(true);
      });

      return () => {
        memoire.current.progression?.kill();
        mm.revert();
      };
    },
    { scope: racine }
  );

  // Pause / reprise de la barre de progression selon l'état.
  useEffect(() => {
    memoire.current.pause = enPause;
    const p = memoire.current.progression;
    if (!p) return;
    if (enPause) p.pause();
    else p.resume();
  }, [enPause, actif]);

  // Onglet masqué : on met en pause.
  useEffect(() => {
    const surVisibilite = () => setPauseTemporaire(document.hidden);
    document.addEventListener("visibilitychange", surVisibilite);
    return () => document.removeEventListener("visibilitychange", surVisibilite);
  }, []);

  const aller = (vers: number) => allerRef.current?.(vers);
  const suivante = () => aller((memoire.current.index + 1) % diapos.length);
  const precedente = () => aller((memoire.current.index + diapos.length - 1) % diapos.length);

  return (
    <section
      ref={racine}
      aria-roledescription="carrousel"
      aria-label="À la une : Université Polytechnique de Bingerville"
      className="fond-plan relative h-[100svh] min-h-[680px] overflow-hidden pt-16 text-white"
      // Pause pendant la navigation au clavier seulement : un clic de souris ne doit pas figer le défilement.
      onFocusCapture={(e) => setPauseTemporaire(e.target.matches(":focus-visible"))}
      onBlurCapture={() => setPauseTemporaire(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") suivante();
        if (e.key === "ArrowLeft") precedente();
      }}
      onPointerDown={(e) => {
        departX.current = e.clientX;
      }}
      onPointerUp={(e) => {
        if (departX.current === null) return;
        const dx = e.clientX - departX.current;
        departX.current = null;
        if (dx < -70) suivante();
        else if (dx > 70) precedente();
      }}
      style={{ touchAction: "pan-y" }}
    >
      <h1 className="sr-only">Université Polytechnique de Bingerville, fabrique de génie</h1>

      <div aria-live={enPause ? "polite" : "off"} className="absolute inset-x-0 bottom-[4.75rem] top-16">
        {diapos.map((d, i) => (
          <div
            key={d.image}
            data-diapo
            role="group"
            aria-roledescription="diapositive"
            aria-label={`${i + 1} sur ${diapos.length}`}
            aria-hidden={i !== actif}
            inert={i !== actif}
            // Les planches suivantes sont cachées dès le HTML : sinon leurs textes se superposent avant le script.
            className={`absolute inset-0 ${i === 0 ? "" : "invisible"}`}
          >
            <div className="container mx-auto grid h-full gap-5 px-5 py-4 sm:px-6 lg:grid-cols-[1fr_1.12fr] lg:items-center lg:gap-14 lg:px-8 lg:py-6">
              <figure className="relative order-1 h-[29svh] min-h-[10rem] lg:order-2 lg:h-[min(72svh,41rem)]">
                <div className="absolute inset-3 overflow-hidden bg-indigo lg:inset-4">
                  <div data-photo className="absolute -inset-[3%]">
                    <Image
                      src={d.image}
                      alt={d.alt}
                      fill
                      priority={i === 0}
                      sizes="(min-width: 1024px) 58vw, 100vw"
                      className="object-cover"
                      style={{ objectPosition: d.position }}
                    />
                  </div>
                  {/* Quadrillage de mise au point, très léger, par-dessus la photo. */}
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-30"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(255,255,255,.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.35) 1px, transparent 1px)",
                      backgroundSize: "64px 64px",
                    }}
                  />
                </div>
                <Reperes taille={22} />
                <figcaption className="etiquette absolute -bottom-px left-6 right-6 hidden items-center gap-3 bg-nuit px-3 text-[11px] text-laurier lg:flex" style={{ transform: "translateY(50%)" }}>
                  <span>FIG. {deux(i + 1)}</span>
                  <span data-cote aria-hidden className="h-px flex-1 origin-left bg-laurier/70" />
                  <span data-cote-etiquette className="text-white/80">{d.legende}</span>
                </figcaption>
              </figure>

              <div className="order-2 flex min-w-0 flex-col justify-center lg:order-1">
                <h2 className="titre-pochoir text-[clamp(2.7rem,min(6.4vw,12.5svh),7.4rem)] text-white">
                  {d.titre.map((l) => (
                    <span key={l} data-ligne className="block overflow-hidden pb-[0.05em]">
                      <span className="block">{l}</span>
                    </span>
                  ))}
                </h2>
                <p data-apparait className="mt-4 max-w-[44ch] text-base leading-relaxed text-white/85 sm:text-lg lg:mt-5">
                  {d.texte}
                </p>
                <div data-apparait className="mt-5 flex flex-col gap-3 sm:flex-row lg:mt-6">
                  <Link href="/formation" className="btn-usine btn-or group">
                    Découvrir nos formations
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                  </Link>
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-usine btn-trait hidden sm:inline-flex">
                    Parler à un conseiller
                  </a>
                </div>
                <p data-apparait className="etiquette mt-5 hidden items-baseline gap-3 border-t border-white/25 pt-4 sm:flex [@media(max-height:700px)]:!hidden">
                  <span aria-hidden className="text-laurier">▸</span>
                  <span data-fait-nombre={d.fait.valeur} data-suffixe={d.fait.suffixe} className="chiffre-upb text-3xl normal-case tracking-normal text-laurier">
                    {d.fait.valeur.toLocaleString("fr-FR")}
                    {d.fait.suffixe}
                  </span>
                  <span className="text-white/80">{d.fait.libelle}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dalles du balayage : éteintes au repos, elles couvrent l'écran le temps de changer de planche. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 top-16 z-20 grid"
        style={{ gridTemplateColumns: `repeat(${COLONNES}, 1fr)`, gridTemplateRows: `repeat(${LIGNES}, 1fr)` }}
      >
        {DALLES.map((n) => (
          <span key={n} data-dalle className={`opacity-0 ${n % 11 === 3 ? "bg-laurier" : "bg-indigo"} outline outline-1 -outline-offset-1 outline-white/10`} />
        ))}
      </div>

      {/* Tableau de commande : segments de progression, pause, précédente / suivante, engrenage. */}
      <div data-controles className="absolute inset-x-0 bottom-0 z-30 border-t border-white/25 bg-nuit">
        <div className="container mx-auto flex items-center gap-3 px-5 py-2.5 sm:gap-5 sm:px-6 lg:px-8">
          <div className="relative hidden h-14 w-14 shrink-0 items-center justify-center text-laurier sm:flex" aria-hidden>
            <Engrenage data-engrenage className="absolute inset-0 h-full w-full" />
            <span className="overflow-hidden">
              <span data-compteur-chiffre className="chiffre-upb relative block text-sm text-white">
                {deux(1)}
              </span>
            </span>
          </div>

          <ol aria-label="Choisir une diapositive" className="flex min-w-0 flex-1 gap-2">
            {diapos.map((d, i) => (
              <li key={d.image} className="min-w-0 flex-1">
                <button
                  type="button"
                  aria-label={`Diapositive ${i + 1} : ${d.titre.join(" ")}`}
                  aria-current={i === actif ? "true" : undefined}
                  onClick={() => aller(i)}
                  className="group flex min-h-11 w-full flex-col justify-center gap-1.5 text-left"
                >
                  <span aria-hidden className={`etiquette truncate text-[11px] transition-colors duration-200 group-hover:text-white ${i === actif ? "text-laurier" : "text-white/60"}`}>
                    {deux(i + 1)}
                    <span className="hidden lg:inline"> · {d.titre[0]} {d.titre[1]}</span>
                  </span>
                  <span className="relative block h-[3px] bg-white/25">
                    <span data-segment-rempli className="absolute inset-0 origin-left scale-x-0 bg-laurier" />
                  </span>
                </button>
              </li>
            ))}
          </ol>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPauseUtilisateur((p) => !p)}
              aria-label={pauseUtilisateur ? "Reprendre le défilement automatique" : "Mettre en pause le défilement automatique"}
              className="flex h-11 w-11 items-center justify-center border border-white/40 transition-colors duration-200 hover:bg-white/15"
            >
              {pauseUtilisateur ? <Play className="h-4 w-4" aria-hidden /> : <Pause className="h-4 w-4" aria-hidden />}
            </button>
            <button
              type="button"
              onClick={precedente}
              aria-label="Diapositive précédente"
              className="flex h-11 w-11 items-center justify-center border border-white/40 transition-colors duration-200 hover:bg-white/15"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
            </button>
            <button
              type="button"
              onClick={suivante}
              aria-label="Diapositive suivante"
              className="flex h-11 w-11 items-center justify-center bg-laurier text-nuit transition-colors duration-200 hover:bg-white"
            >
              <ArrowRight className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
