"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  BookOpen,
  Camera,
  Code2,
  Drama,
  Dumbbell,
  Flame,
  Globe,
  Leaf,
  Music,
  Palette,
  Trophy,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const CLUBS = [
  {
    id: 1,
    slug: "informatique",
    name: "Club Informatique",
    tag: "Tech & Innovation",
    description:
      "Hackathons, développement web, IA et robotique. Les passionnés de tech se retrouvent ici pour créer, innover et repousser les limites du possible.",
    members: 120,
    events: 18,
    icon: Code2,
    color: "#2f3e9e",
    accent: "#4f6ef7",
    image: "/assets/image/home/star/laboratoire.jpg",
    tags: ["Hackathon", "Dev Web", "IA", "Robotique"],
  },
  {
    id: 2,
    slug: "artistique",
    name: "Club Artistique",
    tag: "Arts & Créativité",
    description:
      "Peinture, sculpture, design graphique et arts numériques. Un espace de liberté créative ouvert à toutes les expressions artistiques.",
    members: 85,
    events: 24,
    icon: Palette,
    color: "#c0392b",
    accent: "#e74c3c",
    image: "/assets/image/home/star/motivation.jpg",
    tags: ["Peinture", "Design", "Arts numériques"],
  },
  {
    id: 3,
    slug: "sportif",
    name: "Club Sportif",
    tag: "Sports & Performance",
    description:
      "Football, basketball, athlétisme, arts martiaux. Dépassement de soi, esprit d'équipe et compétitions inter-universitaires au programme.",
    members: 210,
    events: 40,
    icon: Dumbbell,
    color: "#27ae60",
    accent: "#2ecc71",
    image: "/assets/image/home/star/sortie.jpg",
    tags: ["Football", "Basketball", "Athlétisme"],
  },
  {
    id: 4,
    slug: "culturel",
    name: "Club Culturel",
    tag: "Culture & Diversité",
    description:
      "Célébration des cultures africaines et mondiales. Festivals, soirées thématiques, danses traditionnelles et échanges interculturels.",
    members: 150,
    events: 30,
    icon: Globe,
    color: "#f6a623",
    accent: "#f39c12",
    image: "/assets/image/home/collectif.jpg",
    tags: ["Festivals", "Danse", "Échanges"],
  },
  {
    id: 5,
    slug: "theatre",
    name: "Club Théâtre",
    tag: "Scène & Expression",
    description:
      "Improvisation, mise en scène et spectacles. Le théâtre comme outil d'expression personnelle, de confiance en soi et de prise de parole.",
    members: 60,
    events: 12,
    icon: Drama,
    color: "#8e44ad",
    accent: "#9b59b6",
    image: "/assets/image/home/star/etudiant.jpg",
    tags: ["Improvisation", "Spectacles", "Mise en scène"],
  },
  {
    id: 6,
    slug: "musique",
    name: "Club Musique",
    tag: "Sons & Rythmes",
    description:
      "Chorale, instruments, beatmaking et concerts. La musique comme langage universel qui unit les étudiants de toutes filières.",
    members: 90,
    events: 20,
    icon: Music,
    color: "#1abc9c",
    accent: "#16a085",
    image: "/assets/image/home/star/image.jpg",
    tags: ["Chorale", "Concerts", "Beatmaking"],
  },
  {
    id: 7,
    slug: "environnement",
    name: "Club Environnement",
    tag: "Écologie & Avenir",
    description:
      "Sensibilisation au développement durable, nettoyage du campus, jardinage urbain et projets éco-responsables pour un campus vert.",
    members: 75,
    events: 15,
    icon: Leaf,
    color: "#16a085",
    accent: "#1abc9c",
    image: "/assets/image/home/campus/campus1.jpg",
    tags: ["Développement durable", "Campus vert", "Jardinage"],
  },
  {
    id: 8,
    slug: "debat",
    name: "Club Débat & Éloquence",
    tag: "Rhétorique & Leadership",
    description:
      "Prises de parole, joutes oratoires et débats contradictoires. Former les leaders de demain à l'art de convaincre et d'argumenter.",
    members: 65,
    events: 22,
    icon: BookOpen,
    color: "#2980b9",
    accent: "#3498db",
    image: "/assets/image/home/star/images.jpg",
    tags: ["Débats", "Éloquence", "Leadership"],
  },
  {
    id: 9,
    slug: "photo-video",
    name: "Club Photo & Vidéo",
    tag: "Image & Storytelling",
    description:
      "Photographie, vidéographie, montage et storytelling visuel. Capturer les moments forts de la vie universitaire à travers un objectif.",
    members: 55,
    events: 16,
    icon: Camera,
    color: "#d35400",
    accent: "#e67e22",
    image: "/assets/image/home/campus/2O4A7455.webp",
    tags: ["Photo", "Vidéo", "Montage"],
  },
];

const STATS = [
  { n: "10+", l: "Clubs actifs", icon: Users },
  { n: "900+", l: "Membres", icon: Flame },
  { n: "197+", l: "Événements/an", icon: Trophy },
  { n: "100%", l: "Accès gratuit", icon: Globe },
];

export default function ClubsPage() {
  const [activeClub, setActiveClub] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // ── Custom cursor
    const cursor = cursorRef.current;
    if (cursor) {
      const moveCursor = (e: MouseEvent) => {
        gsap.to(cursor, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.5,
          ease: "power2.out",
        });
      };
      window.addEventListener("mousemove", moveCursor);
    }

    // ── Hero title letter-by-letter
    const titleEl = titleRef.current;
    if (titleEl) {
      const chars = titleEl.querySelectorAll(".hero-char");
      gsap.from(chars, {
        y: 120,
        opacity: 0,
        rotateX: -90,
        duration: 0.8,
        stagger: 0.04,
        ease: "power4.out",
        delay: 0.2,
      });
    }

    // ── Hero subtitle & CTA
    gsap.from(".hero-sub", {
      y: 30,
      opacity: 0,
      duration: 1,
      delay: 0.9,
      ease: "power3.out",
    });

    // ── Background parallax particles
    gsap.to(".hero-particle", {
      y: "random(-60, 60)",
      x: "random(-30, 30)",
      duration: "random(4, 8)",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: { each: 0.5, from: "random" },
    });

    // ── Stats counter
    const statEls = statsRef.current?.querySelectorAll(".stat-num");
    if (statEls) {
      gsap.from(statEls, {
        textContent: 0,
        duration: 1.5,
        ease: "power2.out",
        snap: { textContent: 1 },
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 80%",
        },
        stagger: 0.15,
      });
    }

    gsap.from(".stat-card", {
      y: 40,
      opacity: 0,
      duration: 0.7,
      stagger: 0.12,
      ease: "power3.out",
      scrollTrigger: {
        trigger: statsRef.current,
        start: "top 80%",
      },
    });

    // ── Intro text split
    gsap.from(".intro-line", {
      y: 50,
      opacity: 0,
      duration: 0.9,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".intro-section",
        start: "top 80%",
      },
    });

    // ── Club cards — stagger fan-in
    const cards = gridRef.current?.querySelectorAll(".club-card");
    if (cards) {
      gsap.from(cards, {
        y: 80,
        opacity: 0,
        scale: 0.9,
        duration: 0.7,
        stagger: { each: 0.08, from: "start" },
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 75%",
        },
      });
    }

    // ── Horizontal scroll ticker section
    gsap.to(".clubs-ticker-inner", {
      xPercent: -50,
      duration: 20,
      ease: "none",
      repeat: -1,
    });

    // ── CTA section
    gsap.from(".cta-reveal", {
      y: 60,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ctaRef.current,
        start: "top 80%",
      },
    });
  }, { scope: containerRef });

  // Card hover effect
  const handleCardEnter = (id: number, color: string) => {
    setActiveClub(id);
    gsap.to(`#club-card-${id}`, {
      scale: 1.03,
      duration: 0.35,
      ease: "power2.out",
    });
    gsap.to(`#club-icon-${id}`, {
      rotate: 15,
      scale: 1.2,
      duration: 0.35,
      ease: "back.out(2)",
    });
    // Cursor grow
    gsap.to(cursorRef.current, {
      scale: 3,
      backgroundColor: color + "33",
      duration: 0.3,
    });
  };

  const handleCardLeave = (id: number) => {
    setActiveClub(null);
    gsap.to(`#club-card-${id}`, {
      scale: 1,
      duration: 0.35,
      ease: "power2.out",
    });
    gsap.to(`#club-icon-${id}`, {
      rotate: 0,
      scale: 1,
      duration: 0.35,
      ease: "power2.out",
    });
    gsap.to(cursorRef.current, {
      scale: 1,
      backgroundColor: "rgba(47,62,158,0.15)",
      duration: 0.3,
    });
  };

  const HERO_TITLE = "CLUBS &\nASSOCIATIONS";

  return (
    <div ref={containerRef} className="min-h-screen bg-background overflow-x-hidden">

      {/* ── CUSTOM CURSOR ────────────────────────────────── */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-9999 -translate-x-1/2 -translate-y-1/2 mix-blend-multiply hidden lg:block"
        style={{ backgroundColor: "rgba(47,62,158,0.15)", border: "1.5px solid rgba(47,62,158,0.3)" }}
      />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative h-screen min-h-[600px] bg-[#060b18] flex flex-col justify-end overflow-hidden"
      >
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/assets/image/home/star/sortie.jpg"
            alt=""
            fill
            priority
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-linear-to-b from-[#060b18]/80 via-transparent to-[#060b18]" />
        </div>

        {/* Floating particles */}
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="hero-particle absolute rounded-full pointer-events-none"
            style={{
              width: Math.random() * 6 + 3 + "px",
              height: Math.random() * 6 + 3 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              backgroundColor: i % 2 === 0 ? "#f6a623" : "#2f3e9e",
              opacity: 0.4,
            }}
          />
        ))}

        {/* Title */}
        <div className="relative z-10 container mx-auto px-6 sm:px-12 pb-16">
          <div ref={titleRef} className="overflow-hidden mb-4" style={{ perspective: "800px" }}>
            {HERO_TITLE.split("\n").map((line, li) => (
              <div key={li} className="overflow-hidden block">
                <div className="flex flex-wrap">
                  {line.split("").map((char, ci) => (
                    <span
                      key={ci}
                      className="hero-char inline-block text-white font-protos font-black leading-none"
                      style={{
                        fontSize: "clamp(3.5rem, 9vw, 9rem)",
                        whiteSpace: char === " " ? "pre" : "normal",
                      }}
                    >
                      {char === " " ? "\u00A0" : char}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="hero-sub flex flex-col sm:flex-row sm:items-center gap-6">
            <p className="text-white/50 font-raleway text-lg max-w-md">
              10 clubs actifs, 900+ membres — trouver ta tribu à l&apos;UPB.
            </p>
            <div className="flex items-center gap-3">
              <div className="w-1 h-12 bg-secondary rounded-full" />
              <span className="text-secondary font-protos text-sm tracking-[0.3em] uppercase">
                Université Polytechnique de Bingerville
              </span>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/20 text-xs tracking-widest">
          <div className="w-px h-10 bg-white/20" />
          <span>SCROLL</span>
        </div>
      </section>

      {/* ── TICKER ───────────────────────────────────────── */}
      <div className="bg-secondary overflow-hidden py-3">
        <div className="clubs-ticker-inner flex gap-0 whitespace-nowrap w-max">
          {[...Array(2)].map((_, i) => (
            <span key={i} className="inline-flex items-center">
              {CLUBS.concat(CLUBS).map((c, j) => (
                <span key={j} className="inline-flex items-center gap-4 px-6 text-white font-protos font-bold text-sm tracking-wider uppercase">
                  <c.icon className="w-3.5 h-3.5 opacity-60" />
                  {c.name}
                  <span className="text-white/30">◆</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ── STATS ────────────────────────────────────────── */}
      <section ref={statsRef} className="py-20 bg-primary">
        <div className="container mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map(({ n, l, icon: Icon }) => (
            <div key={l} className="stat-card text-center">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-4">
                <Icon className="w-5 h-5 text-secondary" />
              </div>
              <div className="stat-num text-4xl font-protos font-black text-secondary">{n}</div>
              <div className="text-white/60 text-sm mt-1 font-raleway">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── INTRO ────────────────────────────────────────── */}
      <section className="intro-section py-24 px-6 bg-background">
        <div className="container mx-auto max-w-3xl text-center">
          <div className="intro-line tag-primary mb-6 mx-auto w-fit">✦ La vie associative</div>
          <h2 className="intro-line text-4xl sm:text-5xl font-protos font-black text-foreground leading-tight mb-6">
            Plus qu&apos;un campus,<br />
            <span className="text-gradient-primary">une communauté.</span>
          </h2>
          <p className="intro-line text-muted-foreground font-raleway text-lg leading-relaxed">
            Les clubs de l&apos;UPB sont le cœur battant de notre vie étudiante.
            Rejoignez-en un — ou fondez le vôtre. C&apos;est ici que les passions
            deviennent des compétences, et les étrangers deviennent des amis.
          </p>
        </div>
      </section>

      {/* ── CLUBS GRID ───────────────────────────────────── */}
      <section className="pb-28 px-6 bg-background">
        <div
          ref={gridRef}
          className="container mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {CLUBS.map((club) => {
            const Icon = club.icon;
            return (
              <div
                id={`club-card-${club.id}`}
                key={club.id}
                className="club-card relative rounded-3xl overflow-hidden border border-border shadow-sm cursor-pointer"
                onMouseEnter={() => handleCardEnter(club.id, club.color)}
                onMouseLeave={() => handleCardLeave(club.id)}
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={club.image}
                    alt={club.name}
                    fill
                    className="object-cover object-top transition-transform duration-700"
                  />
                  <div
                    className="absolute inset-0 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(to bottom, ${club.color}22, ${club.color}cc)`,
                    }}
                  />
                  {/* Icon */}
                  <div
                    id={`club-icon-${club.id}`}
                    className="absolute top-5 left-5 w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg"
                    style={{ backgroundColor: club.color }}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  {/* Tag */}
                  <div className="absolute top-5 right-5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                    <span className="text-white text-xs font-bold">{club.tag}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 bg-card">
                  <h3 className="font-protos font-black text-foreground text-xl mb-2">
                    {club.name}
                  </h3>
                  <p className="text-muted-foreground text-sm font-raleway leading-relaxed mb-4 line-clamp-3">
                    {club.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {club.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-full text-xs font-semibold"
                        style={{ backgroundColor: club.color + "18", color: club.color }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Stats row */}
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-muted-foreground" />
                      <span className="text-sm font-semibold text-foreground">
                        {club.members} membres
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Trophy className="w-3.5 h-3.5 text-muted-foreground" />
                      <span className="text-sm font-semibold text-foreground">
                        {club.events} événements/an
                      </span>
                    </div>
                  </div>

                  {/* Detail link */}
                  <Link
                    href={`/clubs/${club.slug}`}
                    className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-bold transition-all duration-300 hover:opacity-90"
                    style={{ backgroundColor: club.color + "15", color: club.color }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    Découvrir le club →
                  </Link>
                </div>

                {/* Active glow border */}
                <div
                  className="absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-300 opacity-0"
                  style={{
                    boxShadow: `inset 0 0 0 2px ${club.accent}`,
                    opacity: activeClub === club.id ? 1 : 0,
                  }}
                />
              </div>
            );
          })}
        </div>
      </section>

      {/* ── MOSAIC BANNER ────────────────────────────────── */}
      <div className="grid grid-cols-5 h-64 overflow-hidden">
        {[
          "/assets/image/home/collectif.jpg",
          "/assets/image/home/star/sortie.jpg",
          "/assets/image/home/star/etudiant.jpg",
          "/assets/image/home/star/motivation.jpg",
          "/assets/image/home/campus/2O4A7455.webp",
        ].map((src, i) => (
          <div key={i} className="relative overflow-hidden group">
            <Image
              src={src}
              alt=""
              fill
              className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-primary/30 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        ))}
      </div>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section ref={ctaRef} className="relative py-32 px-6 bg-[#060b18] overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-secondary/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 container mx-auto max-w-2xl text-center">
          <div className="cta-reveal inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 border border-secondary/20 rounded-full mb-6">
            <Flame className="w-4 h-4 text-secondary" />
            <span className="text-secondary font-protos text-xs tracking-[0.3em] uppercase">Rejoignez l&apos;aventure</span>
          </div>
          <h2 className="cta-reveal text-4xl sm:text-6xl font-protos font-black text-white leading-tight mb-5">
            Votre passion<br />
            <span className="text-secondary">vous attend ici.</span>
          </h2>
          <p className="cta-reveal text-white/40 font-raleway text-lg mb-10 max-w-md mx-auto">
            Adhérer à un club, c&apos;est gratuit. C&apos;est une aventure humaine
            qui enrichit votre parcours bien au-delà des cours.
          </p>
          <div className="cta-reveal flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-secondary hover:bg-secondary/90 text-white font-bold rounded-full transition-all duration-300 shadow-lg shadow-secondary/30"
            >
              Nous rejoindre
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
            <a
              href="/about"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-white/20 text-white/70 hover:text-white hover:border-white/50 font-bold rounded-full transition-all duration-300"
            >
              En savoir plus
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
