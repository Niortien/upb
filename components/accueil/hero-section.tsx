"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import { Laurier } from "@/components/common/laurier";
import { WHATSAPP_URL } from "@/lib/constants";

gsap.registerPlugin(useGSAP);

interface Diapo {
  titre: [string, string, string];
  texte: string;
  image: string;
  alt: string;
  position: string;
  fait: { valeur: number; suffixe: string; libelle: string };
}

const diapos: Diapo[] = [
  {
    titre: ["Forgez votre", "excellence", "à Bingerville."],
    texte: "L'université qui allie rigueur académique, innovation technologique et développement humain.",
    image: "/assets/image/diplome/1.jpg",
    alt: "Diplômés de l'UPB en toge et écharpe blanche lors de la cérémonie de remise des diplômes",
    position: "62% center",
    fait: { valeur: 15000, suffixe: "+", libelle: "étudiants formés" },
  },
  {
    titre: ["Des diplômés", "qui rayonnent", "partout."],
    texte: "Des parcours d'excellence, de Bingerville à toute l'Afrique.",
    image: "/assets/image/home/campus/2O4A6914.webp",
    alt: "Trois diplômées souriantes en toge devant les bâtiments du campus",
    position: "center 30%",
    fait: { valeur: 5, suffixe: "+", libelle: "pays représentés" },
  },
  {
    titre: ["Un campus", "qui inspire", "chaque jour."],
    texte: "Bâtiments modernes, espaces verts et vie associative, au cœur de Bingerville.",
    image: "/assets/image/home/campus/2O4A6842.webp",
    alt: "Allée du campus entre deux bâtiments, le drapeau ivoirien au centre",
    position: "center 55%",
    fait: { valeur: 5000, suffixe: "+", libelle: "étudiants actifs" },
  },
  {
    titre: ["Apprendre", "en faisant", "dès le début."],
    texte: "Laboratoires, projets pratiques et ordinateurs offerts à chaque étudiant.",
    image: "/assets/image/home/star/laboratoire.jpg",
    alt: "Étudiantes en blouse blanche en travaux pratiques devant un oscilloscope",
    position: "center 45%",
    fait: { valeur: 8, suffixe: "+", libelle: "programmes, de la licence au doctorat" },
  },
  {
    titre: ["Une cité", "pour se sentir", "chez soi."],
    texte: "Chambres modernes, restauration et sécurité 24 h/24, à deux pas des cours.",
    image: "/assets/image/cite/cite1.jpg",
    alt: "Chambre de la cité universitaire avec bureau, lit superposé et fenêtre fleurie",
    position: "center 40%",
    fait: { valeur: 800, suffixe: "+", libelle: "places à la cité universitaire" },
  },
];

/** Temps d'affichage d'une diapositive avant la suivante. */
const DUREE = 6.5;
/** Biseau du balayage (en % de la largeur) : plus il est grand, plus le bord est penché. */
const BISEAU = 30;
/** Position finale du bord : assez loin pour que le biseau ait quitté l'écran. */
const DEBORD = 145;

type Sens = 1 | -1;

/** Surface à gauche (sens 1) ou à droite (sens -1) d'un bord penché situé à « a » % ; vide si a ≤ 0. */
function bord(a: number, sens: Sens): string {
  if (a <= 0) return "polygon(0 0,0 0,0 0,0 0)";
  const pts =
    sens === 1
      ? [[0, 0], [a, 0], [a - BISEAU, 100], [0, 100]]
      : [[100, 0], [100 - a, 0], [100 - a + BISEAU, 100], [100, 100]];
  return `polygon(${pts.map(([x, y]) => `${x}% ${y}%`).join(",")})`;
}

const deux = (n: number) => String(n).padStart(2, "0");

/**
 * Ouverture de l'accueil : un carrousel plein écran, pensé comme une série de couvertures de magazine.
 * Le passage d'une diapositive à l'autre se fait par un balayage penché en trois bandes (indigo, or,
 * puis la photo), pendant que le titre monte ligne par ligne et que le laurier repousse autour du compteur.
 * Défilement automatique, geste de glissement, flèches du clavier, pause (bouton, focus clavier, onglet masqué) ;
 * avec « réduire les animations » il démarre à l'arrêt et les photos se remplacent sans mouvement.
 */
const HeroSection = () => {
  const racine = useRef<HTMLElement>(null);
  const [actif, setActif] = useState(0);
  const [pauseUtilisateur, setPauseUtilisateur] = useState(false);
  const [pauseTemporaire, setPauseTemporaire] = useState(false);
  const [reduit, setReduit] = useState(false);

  const memoire = useRef({ index: 0, occupe: false, progression: null as gsap.core.Tween | null, pause: false, reduit: false });
  const allerRef = useRef<((vers: number, sens: Sens) => void) | null>(null);
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
          { scaleX: 1, duration: DUREE, ease: "none", paused: m.pause, onComplete: () => aller((i + 1) % diapos.length, 1) }
        );
      };

      /** Fait apparaître le texte d'une diapositive : lignes en cascade, phrase, boutons, chiffre qui grimpe. */
      const entrerTexte = (slide: HTMLElement, delai: number) => {
        gsap.fromTo(slide.querySelectorAll("[data-ligne] > span"), { yPercent: 112 }, { yPercent: 0, duration: 1, stagger: 0.09, delay: delai, ease: "expo.out" });
        gsap.fromTo(slide.querySelectorAll("[data-apparait]"), { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, delay: delai + 0.3, ease: "expo.out" });
        const chiffre = slide.querySelector<HTMLElement>("[data-fait-nombre]");
        if (chiffre) {
          const cible = Number(chiffre.dataset.faitNombre);
          const suffixe = chiffre.dataset.suffixe ?? "";
          const o = { n: 0 };
          gsap.to(o, {
            n: cible,
            duration: 1.6,
            delay: delai + 0.35,
            ease: "power3.out",
            onUpdate: () => {
              chiffre.textContent = `${Math.round(o.n).toLocaleString("fr-FR")}${suffixe}`;
            },
          });
        }
      };

      const repousserLaurier = (delai: number) => {
        gsap.fromTo(
          r.querySelectorAll(".compteur-laurier .feuille"),
          { scale: 0, transformOrigin: "50% 100%" },
          { scale: 1, duration: 0.65, stagger: 0.025, delay: delai, ease: "back.out(2)" }
        );
      };

      const rouler = (index: number, delai: number) => {
        const n = r.querySelector<HTMLElement>("[data-compteur-chiffre]");
        if (!n) return;
        gsap.delayedCall(delai, () => {
          n.textContent = deux(index + 1);
          gsap.fromTo(n, { yPercent: 70, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.6, ease: "expo.out" });
        });
      };

      const aller = (vers: number, sens: Sens) => {
        const m = memoire.current;
        if (m.occupe || vers === m.index) return;
        m.occupe = true;
        m.progression?.kill();

        const slides = gsap.utils.toArray<HTMLElement>("[data-diapo]", r);
        const sortante = slides[m.index];
        const entrante = slides[vers];
        const bandeIndigo = r.querySelector<HTMLElement>("[data-bande-indigo]")!;
        const bandeOr = r.querySelector<HTMLElement>("[data-bande-or]")!;

        // Sans mouvement : simple remplacement.
        if (m.reduit) {
          gsap.set(sortante, { autoAlpha: 0 });
          gsap.set(entrante, { autoAlpha: 1, clipPath: "none" });
          gsap.set(entrante.querySelectorAll("[data-ligne] > span, [data-apparait]"), { clearProps: "all" });
          const n = r.querySelector<HTMLElement>("[data-compteur-chiffre]");
          if (n) n.textContent = deux(vers + 1);
          m.index = vers;
          m.occupe = false;
          setActif(vers);
          return;
        }

        const terminer = () => {
          gsap.set(sortante, { autoAlpha: 0, zIndex: 0 });
          gsap.set(entrante, { clipPath: "none", zIndex: 10 });
          gsap.set([bandeIndigo, bandeOr], { clipPath: bord(0, 1) });
          m.index = vers;
          m.occupe = false;
          setActif(vers);
          demarrerProgression(vers);
        };

        gsap.set(entrante, { autoAlpha: 1, zIndex: 20, clipPath: bord(0, sens) });
        gsap.set(sortante, { zIndex: 10 });
        gsap.set(bandeIndigo, { zIndex: 15 });
        gsap.set(bandeOr, { zIndex: 17 });

        // Le texte sortant file vers le haut avant que le balayage ne le recouvre.
        gsap.to(sortante.querySelectorAll("[data-ligne] > span"), { yPercent: -112, duration: 0.55, stagger: 0.04, ease: "expo.in" });
        gsap.to(sortante.querySelectorAll("[data-apparait]"), { opacity: 0, duration: 0.3 });

        const o = { a: 0 };
        gsap.to(o, {
          a: DEBORD,
          duration: 1.25,
          ease: "power3.inOut",
          onUpdate: () => {
            entrante.style.clipPath = bord(o.a, sens);
            bandeOr.style.clipPath = bord(o.a + 7, sens);
            bandeIndigo.style.clipPath = bord(o.a + 15, sens);
          },
          onComplete: terminer,
        });

        // La photo entrante se dézoome pendant tout son temps d'affichage : lente dérive.
        gsap.fromTo(entrante.querySelector("[data-photo]"), { scale: 1.32 }, { scale: 1.04, duration: DUREE + 1.4, ease: "power2.out" });
        entrerTexte(entrante, 0.62);
        repousserLaurier(0.55);
        rouler(vers, 0.55);
      };

      allerRef.current = contextSafe(aller);

      // ── État initial : seule la première diapositive est visible, les bandes sont vides. ──
      gsap.set(r.querySelectorAll("[data-diapo]:not(:first-child)"), { autoAlpha: 0 });
      gsap.set([r.querySelector("[data-bande-indigo]"), r.querySelector("[data-bande-or]")], { clipPath: bord(0, 1) });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        memoire.current.reduit = false;
        setReduit(false);
        const premiere = r.querySelector<HTMLElement>("[data-diapo]")!;
        gsap.from(premiere.querySelector("[data-photo]"), { scale: 1.3, duration: 2.2, ease: "expo.out" });
        gsap.from(premiere, { clipPath: "inset(0 0 100% 0)", duration: 1.1, ease: "expo.out" });
        entrerTexte(premiere, 0.35);
        repousserLaurier(0.5);
        gsap.from(r.querySelectorAll("[data-controles] > *"), { opacity: 0, y: 14, duration: 0.7, delay: 0.8, ease: "expo.out" });
        demarrerProgression(0);

        // Parallaxe douce des photos au pointeur (souris uniquement).
        const photos = r.querySelectorAll<HTMLElement>("[data-photo]");
        const px = gsap.quickTo(photos, "x", { duration: 1.2, ease: "power3.out" });
        const py = gsap.quickTo(photos, "y", { duration: 1.2, ease: "power3.out" });
        const bouge = (e: PointerEvent) => {
          if (e.pointerType !== "mouse") return;
          px((e.clientX / window.innerWidth - 0.5) * -26);
          py((e.clientY / window.innerHeight - 0.5) * -18);
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

  const aller = (vers: number, sens: Sens) => allerRef.current?.(vers, sens);
  const suivante = () => aller((memoire.current.index + 1) % diapos.length, 1);
  const precedente = () => aller((memoire.current.index + diapos.length - 1) % diapos.length, -1);

  return (
    <section
      ref={racine}
      aria-roledescription="carrousel"
      aria-label="À la une : Université Polytechnique de Bingerville"
      className="relative h-[100svh] min-h-[640px] overflow-hidden bg-nuit text-white"
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
      <h1 className="sr-only">Université Polytechnique de Bingerville</h1>

      <div aria-live={enPause ? "polite" : "off"} className="absolute inset-0">
        {diapos.map((d, i) => (
          <div
            key={d.image}
            data-diapo
            role="group"
            aria-roledescription="diapositive"
            aria-label={`${i + 1} sur ${diapos.length}`}
            aria-hidden={i !== actif}
            inert={i !== actif}
            className="absolute inset-0"
            style={{ zIndex: i === 0 ? 10 : 0 }}
          >
            <div data-photo className="absolute -inset-[3%]">
              <Image
                src={d.image}
                alt={d.alt}
                fill
                priority={i === 0}
                sizes="106vw"
                className="object-cover"
                style={{ objectPosition: d.position }}
              />
            </div>
            <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-nuit/90 via-nuit/55 to-nuit/10" />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-nuit/85 via-transparent to-nuit/40" />

            <div className="container relative mx-auto flex h-full flex-col justify-end px-5 pb-36 pt-28 sm:px-6 lg:px-8 lg:pb-32">
              <h2 className="titre-upb text-[clamp(2.4rem,min(7.4vw,10.5vh),6rem)] text-white">
                {d.titre.map((l) => (
                  <span key={l} data-ligne className="block overflow-hidden pb-[0.07em]">
                    <span className="block">{l}</span>
                  </span>
                ))}
              </h2>
              <p data-apparait className="mt-5 max-w-[40ch] text-lg leading-relaxed text-white/85 sm:text-xl">
                {d.texte}
              </p>
              <div data-apparait className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/formation"
                  className="group inline-flex h-13 items-center justify-center gap-2 rounded-full bg-laurier px-7 font-bold text-nuit transition-colors duration-200 hover:bg-white"
                >
                  Découvrir nos formations
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                </Link>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-13 items-center justify-center rounded-full border border-white/40 px-7 font-bold text-white transition-colors duration-200 hover:bg-white/15"
                >
                  Parler à un conseiller
                </a>
              </div>
              <p data-apparait className="mt-8 hidden items-baseline gap-3 sm:flex [@media(max-height:700px)]:!hidden">
                <span data-fait-nombre={d.fait.valeur} data-suffixe={d.fait.suffixe} className="chiffre-upb text-4xl text-laurier">
                  {d.fait.valeur.toLocaleString("fr-FR")}
                  {d.fait.suffixe}
                </span>
                <span className="text-white/80">{d.fait.libelle}</span>
              </p>
            </div>
          </div>
        ))}

        {/* Bandes du balayage : indigo, puis or, juste devant la photo qui arrive. */}
        <div aria-hidden data-bande-indigo className="pointer-events-none absolute inset-0 bg-indigo" />
        <div aria-hidden data-bande-or className="pointer-events-none absolute inset-0 bg-laurier" />
      </div>

      {/* Compteur dans le laurier, comme le sigle de l'UPB. */}
      <div
        aria-hidden
        className="compteur-laurier pointer-events-none absolute bottom-28 right-6 z-30 hidden h-48 w-48 items-center justify-center lg:flex xl:right-12"
      >
        <Laurier feuilles={8} className="absolute inset-0 h-full w-full" />
        <span className="relative flex flex-col items-center leading-none">
          <span className="overflow-hidden pb-1">
            <span data-compteur-chiffre className="chiffre-upb block text-5xl text-white">
              {deux(1)}
            </span>
          </span>
          <span className="mt-1 text-sm font-bold text-white/75">/ {deux(diapos.length)}</span>
        </span>
      </div>

      {/* Commandes : segments de progression cliquables, pause, précédente / suivante. */}
      <div data-controles className="absolute inset-x-0 bottom-0 z-30 border-t border-white/15 bg-nuit/55 backdrop-blur-sm">
        <div className="container mx-auto flex items-center gap-3 px-5 py-3 sm:gap-5 sm:px-6 lg:px-8">
          <ol aria-label="Choisir une diapositive" className="flex min-w-0 flex-1 gap-2">
            {diapos.map((d, i) => (
              <li key={d.image} className="min-w-0 flex-1">
                <button
                  type="button"
                  aria-label={`Diapositive ${i + 1} : ${d.titre.join(" ")}`}
                  aria-current={i === actif ? "true" : undefined}
                  onClick={() => aller(i, i > actif ? 1 : -1)}
                  className="group flex min-h-11 w-full flex-col justify-center gap-2 text-left"
                >
                  <span
                    aria-hidden
                    className={`hidden truncate text-sm font-semibold transition-colors duration-200 group-hover:text-white lg:block ${i === actif ? "text-white" : "text-white/65"}`}
                  >
                    {d.titre[0]} {d.titre[1]}
                  </span>
                  <span className="relative block h-[3px] overflow-hidden rounded-full bg-white/25">
                    <span data-segment-rempli className="absolute inset-0 origin-left scale-x-0 rounded-full bg-laurier" />
                  </span>
                </button>
              </li>
            ))}
          </ol>

          <p aria-hidden className="text-sm font-bold tabular-nums text-white/80 lg:hidden">
            {deux(actif + 1)} / {deux(diapos.length)}
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPauseUtilisateur((p) => !p)}
              aria-label={pauseUtilisateur ? "Reprendre le défilement automatique" : "Mettre en pause le défilement automatique"}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/35 transition-colors duration-200 hover:bg-white/15"
            >
              {pauseUtilisateur ? <Play className="h-4 w-4" aria-hidden /> : <Pause className="h-4 w-4" aria-hidden />}
            </button>
            <button
              type="button"
              onClick={precedente}
              aria-label="Diapositive précédente"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/35 transition-colors duration-200 hover:bg-white/15"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
            </button>
            <button
              type="button"
              onClick={suivante}
              aria-label="Diapositive suivante"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-laurier text-nuit transition-colors duration-200 hover:bg-white"
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
