"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type PointerEvent as ReactPointerEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  animate,
  motion,
  useIsPresent,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type AnimationPlaybackControls,
  type Transition,
  type MotionValue,
  type Variants,
} from "framer-motion";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import { Engrenage } from "@/components/common/engrenage";
import { Reperes } from "@/components/common/reperes";
import { WHATSAPP_URL } from "@/lib/constants";

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
/** Lames du rideau d'ouverture. */
const LAMES = 8;
/** Lamelles du store de la planche 2. */
const LAMELLES = 5;
/** Courbe « expo » : départ vif, arrivée très douce. */
const EXPO = [0.16, 1, 0.3, 1] as const;
/** Courbe du volet : accélère puis freine. */
const VOLET = [0.76, 0, 0.24, 1] as const;

const deux = (n: number) => String(n).padStart(2, "0");

/** Sens de la navigation : 1 vers l'avant, -1 vers l'arrière. */
type Sens = 1 | -1;

/* ── Variantes d'une planche ─────────────────────────────────────────────────────────────────────────────────── */

/** Colonne de texte : ses enfants arrivent en cascade, repartent plus vite. */
const colonne: Variants = {
  entree: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.45 } },
  sortie: { transition: { staggerChildren: 0.03 } },
};

/** Titre : les trois lignes montent l'une après l'autre derrière leur masque. */
const titre: Variants = {
  entree: {},
  visible: { transition: { staggerChildren: 0.09 } },
  sortie: { transition: { staggerChildren: 0.04 } },
};

const ligne: Variants = {
  entree: { y: "118%", skewY: 5 },
  visible: { y: "0%", skewY: 0, transition: { duration: 1, ease: EXPO } },
  sortie: { y: "-118%", skewY: -3, transition: { duration: 0.5, ease: [0.7, 0, 0.84, 0] } },
};

const apparait: Variants = {
  entree: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EXPO } },
  sortie: { opacity: 0, y: -8, transition: { duration: 0.25 } },
};

/* ── Scènes 3D : une entrée et un objet flottant propres à chaque planche ──────────────────────────────────────── */

type Scene = "carte" | "lamelles" | "plan" | "porte" | "pile";

interface PlanScene {
  scene: Scene;
  objet: { type: "cube" | "gyro"; position: string };
  /** Charnière de la plaque (point autour duquel elle pivote). */
  origine: string;
}

/** Indexé comme `diapos`. */
const SCENES: PlanScene[] = [
  { scene: "carte", objet: { type: "cube", position: "-bottom-5 -left-3 sm:-left-6" }, origine: "50% 50%" },
  { scene: "lamelles", objet: { type: "gyro", position: "-right-3 -top-5 sm:-right-6" }, origine: "50% 50%" },
  { scene: "plan", objet: { type: "cube", position: "-left-3 -top-6 sm:-left-6" }, origine: "50% 100%" },
  { scene: "porte", objet: { type: "gyro", position: "-bottom-6 -right-3 sm:-right-6" }, origine: "50% 0%" },
  { scene: "pile", objet: { type: "cube", position: "-right-3 -top-5 sm:-right-6" }, origine: "50% 50%" },
];

/** Ressort lent pour la rotation, simple fondu pour l'opacité (un ressort sur l'opacité dépasserait 1). */
const ressort = (delay = 0.1, raideur = 60, amorti = 14): Transition => ({
  default: { type: "spring", stiffness: raideur, damping: amorti, mass: 1.1, delay },
  opacity: { duration: 0.5, delay },
});
const sortieRapide: Transition = { duration: 0.65, ease: VOLET };

/** Plaque de la figure (hors lamelles) : chaque planche entre et sort à sa façon, en perspective. */
const plaques: Record<Exclude<Scene, "lamelles">, Variants> = {
  // Carte qui pivote autour de son axe vertical, comme un volet de classeur.
  carte: {
    entree: (sens: Sens) => ({ opacity: 0, rotateY: sens * -78, x: sens * -90, scale: 0.88 }),
    visible: { opacity: 1, rotateY: 0, x: 0, scale: 1, transition: ressort() },
    sortie: (sens: Sens) => ({ opacity: 0, rotateY: sens * 62, x: sens * 70, scale: 0.9, transition: sortieRapide }),
  },
  // Plan posé à plat qui se redresse depuis le sol.
  plan: {
    entree: { opacity: 0, rotateX: 64, y: 140, scale: 0.86 },
    visible: { opacity: 1, rotateX: 0, y: 0, scale: 1, transition: ressort(0.1, 55, 13) },
    sortie: { opacity: 0, rotateX: -30, y: -40, scale: 0.94, transition: sortieRapide },
  },
  // Porte rabattue, qui bascule depuis son bord haut.
  porte: {
    entree: { opacity: 0, rotateX: -96 },
    visible: { opacity: 1, rotateX: 0, transition: ressort(0.1, 48, 10) },
    sortie: { opacity: 0, rotateX: 38, transition: sortieRapide },
  },
  // Pile de plaques projetée vers l'avant.
  pile: {
    entree: (sens: Sens) => ({ opacity: 0, y: 160, rotateZ: sens * 7, rotateX: 20, scale: 0.9 }),
    visible: { opacity: 1, y: 0, rotateZ: 0, rotateX: 0, scale: 1, transition: ressort(0.1, 70, 13) },
    sortie: { opacity: 0, y: -120, rotateX: -18, scale: 1.06, transition: sortieRapide },
  },
};

/** Lamelle d'un store : se retourne l'une après l'autre (custom = rang de la lamelle). */
const lamelle: Variants = {
  entree: { rotateY: 95, opacity: 0 },
  visible: (i: number) => ({
    rotateY: 0,
    opacity: 1,
    transition: {
      default: { type: "spring", stiffness: 85, damping: 14, delay: 0.15 + i * 0.09 },
      opacity: { duration: 0.3, delay: 0.15 + i * 0.09 },
    },
  }),
  sortie: (i: number) => ({ rotateY: -95, opacity: 0, transition: { duration: 0.5, ease: VOLET, delay: i * 0.04 } }),
};

/** Élément de profondeur (cadre doré, plaques, objet) : apparaît après la plaque principale. */
const profondeur: Variants = {
  entree: { opacity: 0, scale: 0.7 },
  visible: (delai: number) => ({ opacity: 1, scale: 1, transition: { type: "spring", stiffness: 120, damping: 14, delay: delai } }),
  sortie: { opacity: 0, scale: 0.7, transition: { duration: 0.25 } },
};

/** Mise au point : l'image arrive grande et se pose en douceur. */
const mise: Variants = {
  entree: { scale: 1.4 },
  visible: { scale: 1.04, transition: { duration: DUREE + 1.5, ease: [0.22, 1, 0.36, 1] } },
  sortie: {},
};

const cote: Variants = {
  entree: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 1.1, ease: EXPO, delay: 0.5 } },
  sortie: { opacity: 0, transition: { duration: 0.2 } },
};

const etiquetteCote: Variants = {
  entree: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, delay: 1 } },
  sortie: { opacity: 0, transition: { duration: 0.2 } },
};

/* ── Éléments ─────────────────────────────────────────────────────────────────────────────────────────────────── */

/* ── Objets 3D filaires ────────────────────────────────────────────────────────────────────────────────────────── */

const FACES_CUBE = [
  "rotateY(0deg)",
  "rotateY(90deg)",
  "rotateY(180deg)",
  "rotateY(270deg)",
  "rotateX(90deg)",
  "rotateX(-90deg)",
];

/** Cube filaire, 6 faces : tourne sans fin sauf en mode « réduire les animations » (posé en biais). */
function CubeFilaire({ taille, reduit }: { taille: number; reduit: boolean }) {
  return (
    <motion.div
      aria-hidden
      className="relative"
      style={{ width: taille, height: taille, transformStyle: "preserve-3d", rotateX: -24, rotateY: 35 }}
      animate={reduit ? undefined : { rotateX: [-24, 336], rotateY: [35, 395] }}
      transition={{ duration: 16, ease: "linear", repeat: Infinity }}
    >
      {FACES_CUBE.map((t) => (
        <span
          key={t}
          className="absolute inset-0 border border-laurier/90 bg-laurier/10"
          style={{ transform: `${t} translateZ(${taille / 2}px)` }}
        />
      ))}
    </motion.div>
  );
}

/** Gyroscope : trois anneaux qui tournent autour d'axes différents. */
function Gyroscope({ taille, reduit }: { taille: number; reduit: boolean }) {
  const anneau = "absolute rounded-full border-2 border-laurier/85";
  return (
    <div aria-hidden className="relative" style={{ width: taille, height: taille, transformStyle: "preserve-3d" }}>
      <motion.span
        className={`${anneau} inset-0`}
        style={{ rotateX: 62 }}
        animate={reduit ? undefined : { rotateZ: [0, 360] }}
        transition={{ duration: 9, ease: "linear", repeat: Infinity }}
      />
      <motion.span
        className={`${anneau} inset-[14%]`}
        style={{ rotateY: 62 }}
        animate={reduit ? undefined : { rotateZ: [0, -360] }}
        transition={{ duration: 12, ease: "linear", repeat: Infinity }}
      />
      <motion.span
        className={`${anneau} inset-[30%] border-white/70`}
        animate={reduit ? undefined : { rotateX: [0, 360] }}
        transition={{ duration: 6, ease: "linear", repeat: Infinity }}
      />
      <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-laurier" />
    </div>
  );
}

/** Chiffre qui grimpe de 0 à sa valeur à l'arrivée de la planche. */
function Compteur({ valeur, suffixe }: { valeur: number; suffixe: string }) {
  const n = useMotionValue(0);
  const texte = useTransform(n, (v) => `${Math.round(v).toLocaleString("fr-FR")}${suffixe}`);

  useEffect(() => {
    const c = animate(n, valeur, { duration: 1.6, delay: 0.8, ease: [0.22, 1, 0.36, 1] });
    return () => c.stop();
  }, [n, valeur]);

  return <motion.span className="chiffre-upb text-3xl normal-case tracking-normal text-laurier">{texte}</motion.span>;
}

interface PlancheProps {
  d: Diapo;
  index: number;
  sens: Sens;
  prioritaire: boolean;
  reduit: boolean;
  px: MotionValue<number>;
  py: MotionValue<number>;
}

/** Une planche : figure cadrée à gauche/droite et texte. Joue « entree → visible » au montage et « sortie » au retrait. */
function Planche({ d, index, sens, prioritaire, reduit, px, py }: PlancheProps) {
  const presente = useIsPresent();

  // Parallaxe au pointeur : la photo dérive à contre-sens, le projecteur suit.
  const photoX = useTransform(px, [-0.5, 0.5], [20, -20]);
  const photoY = useTransform(py, [-0.5, 0.5], [14, -14]);
  const projecteurX = useTransform(px, [-0.5, 0.5], [0, 100]);
  const projecteurY = useTransform(py, [-0.5, 0.5], [0, 100]);
  // Inclinaison 3D de la scène, qui suit le pointeur.
  const inclineX = useTransform(py, [-0.5, 0.5], [9, -9]);
  const inclineY = useTransform(px, [-0.5, 0.5], [-12, 12]);
  const plan = SCENES[index];
  const projecteur = useMotionTemplate`radial-gradient(440px circle at ${projecteurX}% ${projecteurY}%, rgba(255,255,255,0.16), transparent 62%)`;

  return (
    <motion.div
      custom={sens}
      initial="entree"
      animate="visible"
      exit="sortie"
      role="group"
      aria-roledescription="diapositive"
      aria-label={`${index + 1} sur ${diapos.length}`}
      aria-hidden={!presente}
      inert={!presente}
      className={`absolute inset-0 ${presente ? "" : "pointer-events-none"}`}
    >
      <div className="container mx-auto grid h-full gap-5 px-5 py-4 sm:px-6 lg:grid-cols-[1fr_1.12fr] lg:items-center lg:gap-14 lg:px-8 lg:py-6">
        <figure className="relative order-1 h-[29svh] min-h-[10rem] lg:order-2 lg:h-[min(72svh,41rem)]">
          {/* Scène 3D : perspective > plaque (entrée) > balancement (repos) > inclinaison (pointeur) > contenu. */}
          <div className="absolute inset-3 lg:inset-4" style={{ perspective: 1500 }}>
            <motion.div
              custom={sens}
              variants={plan.scene === "lamelles" ? undefined : plaques[plan.scene]}
              className="absolute inset-0"
              style={{ transformStyle: "preserve-3d", transformOrigin: plan.origine }}
            >
              <motion.div
                className="absolute inset-0"
                style={{ transformStyle: "preserve-3d" }}
                animate={reduit ? undefined : { rotateY: [-3, 3], rotateX: [1.5, -1.5] }}
                transition={{ duration: 7, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
              >
                <motion.div className="absolute inset-0" style={{ transformStyle: "preserve-3d", ...(reduit ? {} : { rotateX: inclineX, rotateY: inclineY }) }}>
                  {/* Plaques empilées derrière la photo (planche 5). */}
                  {plan.scene === "pile" &&
                    [1, 2].map((k) => (
                      <motion.div
                        key={k}
                        aria-hidden
                        custom={0.7 + k * 0.12}
                        variants={profondeur}
                        className="absolute inset-0 border border-white/25 bg-indigo/70"
                        style={{ z: -34 * k, x: 16 * k, y: -16 * k }}
                      />
                    ))}

                  {plan.scene === "lamelles" ? (
                    <div className="absolute inset-0 flex" style={{ transformStyle: "preserve-3d" }}>
                      {Array.from({ length: LAMELLES }, (_, i) => (
                        <motion.div key={i} custom={i} variants={lamelle} className="relative h-full flex-1 overflow-hidden bg-indigo" style={{ backfaceVisibility: "hidden" }}>
                          <div className="absolute inset-y-0" style={{ width: `${LAMELLES * 100}%`, left: `${-i * 100}%` }}>
                            <Image
                              src={d.image}
                              alt={i === 0 ? d.alt : ""}
                              fill
                              sizes="(min-width: 1024px) 58vw, 100vw"
                              className="object-cover"
                              style={{ objectPosition: d.position }}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="absolute inset-0 overflow-hidden bg-indigo">
                      <motion.div variants={mise} className="absolute inset-0">
                        <motion.div style={reduit ? undefined : { x: photoX, y: photoY }} className="absolute -inset-[3%]">
                          <Image
                            src={d.image}
                            alt={d.alt}
                            fill
                            priority={prioritaire}
                            sizes="(min-width: 1024px) 58vw, 100vw"
                            className="object-cover"
                            style={{ objectPosition: d.position }}
                          />
                        </motion.div>
                      </motion.div>
                    </div>
                  )}

                  {/* Quadrillage de mise au point et projecteur, par-dessus la photo. */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-30"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(255,255,255,.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.35) 1px, transparent 1px)",
                      backgroundSize: "64px 64px",
                    }}
                  />
                  {!reduit && <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: projecteur }} />}

                  {/* Cadre doré flottant devant la photo. */}
                  <motion.div
                    aria-hidden
                    custom={0.9}
                    variants={profondeur}
                    className="pointer-events-none absolute -inset-3 border-2 border-laurier/70"
                    style={{ z: 46 }}
                  />

                  {/* Objet 3D de la planche. */}
                  <motion.div aria-hidden custom={1.1} variants={profondeur} className={`pointer-events-none absolute z-10 ${plan.objet.position}`} style={{ z: 90, transformStyle: "preserve-3d" }}>
                    <div className="origin-center scale-[0.6] sm:scale-100">
                      {plan.objet.type === "cube" ? <CubeFilaire taille={72} reduit={reduit} /> : <Gyroscope taille={84} reduit={reduit} />}
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
          <Reperes taille={22} />
          <figcaption className="etiquette absolute -bottom-px left-6 right-6 hidden items-center gap-3 bg-nuit px-3 text-[11px] text-laurier lg:flex" style={{ transform: "translateY(50%)" }}>
            <span>FIG. {deux(index + 1)}</span>
            <motion.span aria-hidden variants={cote} className="h-px flex-1 origin-left bg-laurier/70" />
            <motion.span variants={etiquetteCote} className="text-white/80">
              {d.legende}
            </motion.span>
          </figcaption>
        </figure>

        <motion.div variants={colonne} className="order-2 flex min-w-0 flex-col justify-center lg:order-1">
          <motion.h2 variants={titre} className="titre-pochoir text-[clamp(2.7rem,min(6.4vw,12.5svh),7.4rem)] text-white">
            {d.titre.map((l) => (
              <span key={l} className="block overflow-hidden pb-[0.05em]">
                <motion.span variants={ligne} className="block origin-bottom-left">
                  {l}
                </motion.span>
              </span>
            ))}
          </motion.h2>
          <motion.p variants={apparait} className="mt-4 max-w-[44ch] text-base leading-relaxed text-white/85 sm:text-lg lg:mt-5">
            {d.texte}
          </motion.p>
          <motion.div variants={apparait} className="mt-5 flex flex-col gap-3 sm:flex-row lg:mt-6">
            <Link href="/formation" className="btn-usine btn-or group">
              Découvrir nos formations
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
            </Link>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-usine btn-trait hidden sm:inline-flex">
              Parler à un conseiller
            </a>
          </motion.div>
          <motion.p
            variants={apparait}
            className="etiquette mt-5 hidden items-baseline gap-3 border-t border-white/25 pt-4 sm:flex [@media(max-height:700px)]:!hidden"
          >
            <span aria-hidden className="text-laurier">▸</span>
            <Compteur valeur={d.fait.valeur} suffixe={d.fait.suffixe} />
            <span className="text-white/80">{d.fait.libelle}</span>
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
}

/** Segment de la barre de progression : se remplit en continu pour la planche active. */
function Segment({ etat, progression }: { etat: "passe" | "actif" | "avenir"; progression: MotionValue<number> }) {
  return (
    <motion.span
      className="absolute inset-0 origin-left bg-laurier"
      style={{ scaleX: etat === "actif" ? progression : etat === "passe" ? 1 : 0 }}
    />
  );
}

/**
 * Ouverture de l'accueil : un carrousel de planches. Chaque diapositive est une figure cadrée entre repères de
 * coin, cotée comme un schéma, avec son titre en capitales d'atelier.
 *
 * Mouvement (Framer Motion) : à l'ouverture, un rideau de lames se relève ; au changement de planche, la photo
 * est révélée par un volet que précède une lame dorée, dans le sens de la navigation, pendant que le titre se
 * recompose ligne par ligne. La photo et un projecteur suivent le pointeur, le chiffre clé grimpe, l'engrenage
 * avance d'un cran.
 *
 * Défilement automatique, glissement, flèches du clavier, pause (bouton, focus clavier, onglet masqué) ;
 * avec « réduire les animations » l'ouverture et les changements de planche restent animés (une seule fois, sans boucle), mais le défilement
 * automatique est à l'arrêt et la parallaxe, le projecteur et la roue en filigrane sont coupés.
 */
const HeroSection = () => {
  // La préférence n'est lue qu'après l'hydratation : le serveur ne la connaît pas, les deux premiers rendus doivent coïncider.
  const prefereReduit = useReducedMotion();
  const monte = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const reduit = monte && prefereReduit === true;

  const [etat, setEtat] = useState<{ index: number; sens: Sens; tick: number }>({ index: 0, sens: 1, tick: 0 });
  const { index: actif, sens, tick } = etat;
  const [pauseUtilisateur, setPauseUtilisateur] = useState(false);
  const [pauseTemporaire, setPauseTemporaire] = useState(false);
  const [rideau, setRideau] = useState(true);
  const [prechargement, setPrechargement] = useState(false);
  const enPause = pauseUtilisateur || pauseTemporaire || reduit;

  const departX = useRef<number | null>(null);

  const aller = useCallback((vers: number) => {
    setEtat((e) => {
      const cible = (vers + diapos.length) % diapos.length;
      if (cible === e.index) return e;
      return { index: cible, sens: cible > e.index ? 1 : -1, tick: e.tick + 1 };
    });
  }, []);
  const suivante = useCallback(() => {
    setEtat((e) => ({ index: (e.index + 1) % diapos.length, sens: 1, tick: e.tick + 1 }));
  }, []);
  const precedente = useCallback(() => {
    setEtat((e) => ({ index: (e.index + diapos.length - 1) % diapos.length, sens: -1, tick: e.tick + 1 }));
  }, []);

  /* Progression de la planche active : 0 → 1 en DUREE secondes, puis planche suivante. */
  const progression = useMotionValue(0);
  const lecture = useRef<AnimationPlaybackControls | null>(null);
  const pauseRef = useRef(enPause);

  useEffect(() => {
    pauseRef.current = enPause;
    if (enPause) lecture.current?.pause();
    else lecture.current?.play();
  }, [enPause]);

  useEffect(() => {
    progression.set(0);
    if (reduit) return;
    const c = animate(progression, 1, { duration: DUREE, ease: "linear", onComplete: suivante });
    lecture.current = c;
    if (pauseRef.current) c.pause();
    return () => c.stop();
  }, [actif, tick, reduit, progression, suivante]);

  /* Onglet masqué : on met en pause. */
  useEffect(() => {
    const surVisibilite = () => setPauseTemporaire(document.hidden);
    document.addEventListener("visibilitychange", surVisibilite);
    return () => document.removeEventListener("visibilitychange", surVisibilite);
  }, []);

  /* Les photos des autres planches se chargent une fois la première affichée, pour que le volet n'ouvre pas sur du vide. */
  useEffect(() => {
    const t = window.setTimeout(() => setPrechargement(true), 1800);
    return () => window.clearTimeout(t);
  }, []);

  /* Pointeur (souris uniquement) : position normalisée entre -0.5 et 0.5, lissée par un ressort. */
  const brutX = useMotionValue(0);
  const brutY = useMotionValue(0);
  const px = useSpring(brutX, { stiffness: 70, damping: 18, mass: 0.8 });
  const py = useSpring(brutY, { stiffness: 70, damping: 18, mass: 0.8 });
  const surPointeur = (e: ReactPointerEvent<HTMLElement>) => {
    if (reduit || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    brutX.set((e.clientX - r.left) / r.width - 0.5);
    brutY.set((e.clientY - r.top) / r.height - 0.5);
  };

  // Remontée si la préférence « réduire les animations » change : la planche repart de l'état voulu, sans transition.
  const planche = (
    <Planche
      key={diapos[actif].image}
      d={diapos[actif]}
      index={actif}
      sens={sens}
      prioritaire={actif === 0}
      reduit={reduit}
      px={px}
      py={py}
    />
  );

  return (
    <section
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
      onPointerMove={surPointeur}
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

      {/* Grande roue dentée en filigrane, qui tourne sans fin derrière les planches. */}
      {!reduit && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -right-40 top-1/2 h-[46rem] w-[46rem] -translate-y-1/2 text-white/[0.04]"
          animate={{ rotate: 360 }}
          transition={{ duration: 90, ease: "linear", repeat: Infinity }}
        >
          <Engrenage className="h-full w-full" />
        </motion.div>
      )}

      <div aria-live={enPause ? "polite" : "off"} className="absolute inset-x-0 bottom-[4.75rem] top-16">
        <AnimatePresence custom={sens} mode="sync">
          {planche}
        </AnimatePresence>
      </div>

      {/* Photos des autres planches, chargées d'avance et jamais visibles. */}
      {prechargement && (
        <div aria-hidden className="relative hidden">
          {diapos.map((d, i) =>
            i === actif ? null : <Image key={d.image} src={d.image} alt="" fill loading="eager" sizes="(min-width: 1024px) 58vw, 100vw" />
          )}
        </div>
      )}

      {/* Rideau d'ouverture : des lames verticales se relèvent l'une après l'autre. */}
      {rideau && (
        <div
          aria-hidden
          data-rideau
          className="pointer-events-none absolute inset-x-0 bottom-0 top-16 z-20 grid"
          style={{ gridTemplateColumns: `repeat(${LAMES}, 1fr)` }}
        >
          {Array.from({ length: LAMES }, (_, n) => (
            <motion.span
              key={n}
              className={`origin-top ${n % 3 === 1 ? "bg-laurier" : "bg-indigo"} outline outline-1 -outline-offset-1 outline-white/10`}
              initial={{ scaleY: 1 }}
              animate={{ scaleY: 0 }}
              transition={{ duration: 0.9, ease: EXPO, delay: 0.15 + Math.abs(n - (LAMES - 1) / 2) * 0.07 }}
              onAnimationComplete={n === 0 ? () => setRideau(false) : undefined}
            />
          ))}
        </div>
      )}
      <noscript>
        <style>{"[data-rideau]{display:none}"}</style>
      </noscript>

      {/* Tableau de commande : segments de progression, pause, précédente / suivante, engrenage. */}
      <motion.div
        className="absolute inset-x-0 bottom-0 z-30 border-t border-white/25 bg-nuit"
        initial={{ y: "100%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 0.8, ease: EXPO, delay: 1 }}
      >
        <div className="container mx-auto flex items-center gap-3 px-5 py-2.5 sm:gap-5 sm:px-6 lg:px-8">
          <div className="relative hidden h-14 w-14 shrink-0 items-center justify-center text-laurier sm:flex" aria-hidden>
            <motion.div
              className="absolute inset-0"
              animate={{ rotate: tick * 72 }}
              transition={{ duration: 1.3, ease: [0.87, 0, 0.13, 1] }}
            >
              <Engrenage className="h-full w-full" />
            </motion.div>
            <span className="relative block h-5 w-6 overflow-hidden">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={actif}
                  className="chiffre-upb absolute inset-0 flex items-center justify-center text-sm text-white"
                  initial={{ y: "80%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  exit={{ y: "-80%", opacity: 0 }}
                  transition={{ duration: 0.5, ease: EXPO }}
                >
                  {deux(actif + 1)}
                </motion.span>
              </AnimatePresence>
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
                    <Segment etat={i < actif ? "passe" : i === actif ? (reduit ? "passe" : "actif") : "avenir"} progression={progression} />
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
      </motion.div>
    </section>
  );
};

export default HeroSection;
