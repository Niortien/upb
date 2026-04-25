"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  Flame,
  Lightbulb,
  Mail,
  MapPin,
  Sparkles,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import type { Club, ClubProject } from "@/data/clubs.data";
import { getClubIcon } from "@/lib/club-icons";

gsap.registerPlugin(ScrollTrigger);

const PROJECT_TYPE_CONFIG = {
  solution: { label: "Solution", icon: Zap, bg: "#0f2a5a", text: "#4f6ef7" },
  invention: { label: "Invention", icon: Lightbulb, bg: "#2a1a00", text: "#f6a623" },
  event: { label: "Événement", icon: Trophy, bg: "#0a2a10", text: "#2ecc71" },
  publication: { label: "Publication", icon: Sparkles, bg: "#1a0a2a", text: "#9b59b6" },
};

const STATUS_COLORS = {
  "Terminé": { bg: "#0a2a10", text: "#2ecc71", dot: "#2ecc71" },
  "En cours": { bg: "#2a1a00", text: "#f6a623", dot: "#f6a623" },
  "À venir": { bg: "#05101a", text: "#3498db", dot: "#3498db" },
};

interface Props {
  club: Club;
}

export default function ClubDetail({ club }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Custom cursor
    const cursor = cursorRef.current;
    if (cursor) {
      const move = (e: MouseEvent) => {
        gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.4, ease: "power2.out" });
      };
      window.addEventListener("mousemove", move);
    }

    // Hero title & breadcrumb entry
    gsap.from(".dh-title-char", {
      y: 100,
      opacity: 0,
      rotateX: -80,
      duration: 0.8,
      stagger: 0.03,
      ease: "power4.out",
      delay: 0.1,
    });
    gsap.from(".dh-meta", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      delay: 0.6,
      ease: "power3.out",
    });
    gsap.from(".dh-stat", {
      scale: 0.7,
      opacity: 0,
      duration: 0.6,
      stagger: 0.08,
      delay: 0.9,
      ease: "back.out(1.5)",
    });

    // Image parallax in hero
    gsap.to(".dh-hero-img", {
      yPercent: 20,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    // Sections stagger reveal
    gsap.utils.toArray<HTMLElement>(".reveal-up").forEach((el) => {
      gsap.from(el, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%" },
      });
    });

    // Activity cards
    gsap.from(".activity-card", {
      x: -50,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: { trigger: ".activities-section", start: "top 80%" },
    });

    // Project cards
    gsap.from(".project-card", {
      y: 50,
      opacity: 0,
      scale: 0.96,
      duration: 0.65,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: { trigger: ".projects-section", start: "top 80%" },
    });

    // Team cards
    gsap.from(".team-card", {
      scale: 0.8,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: "back.out(1.5)",
      scrollTrigger: { trigger: ".team-section", start: "top 80%" },
    });

    // Gallery images
    gsap.from(".gallery-img", {
      scale: 0.85,
      opacity: 0,
      duration: 0.7,
      stagger: 0.12,
      ease: "power3.out",
      scrollTrigger: { trigger: ".gallery-section", start: "top 80%" },
    });

    // CTA section
    gsap.from(".cta-line", {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: "power3.out",
      scrollTrigger: { trigger: ".detail-cta", start: "top 85%" },
    });

    // Ticker
    gsap.to(".detail-ticker-inner", {
      xPercent: -50,
      duration: 18,
      ease: "none",
      repeat: -1,
    });
  }, { scope: containerRef });

  const Icon = getClubIcon(club.iconName);

  return (
    <div ref={containerRef} className="min-h-screen bg-background overflow-x-hidden">

      {/* Custom cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-9999 -translate-x-1/2 -translate-y-1/2 hidden lg:block transition-none"
        style={{ backgroundColor: club.color + "22", border: `1.5px solid ${club.color}55` }}
      />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative h-screen min-h-[600px] flex flex-col justify-end overflow-hidden"
        style={{ backgroundColor: club.bgDark }}
      >
        {/* Background image */}
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={club.image}
            alt={club.name}
            fill
            priority
            className="dh-hero-img object-cover object-top opacity-20 scale-110"
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to top, ${club.bgDark} 30%, ${club.bgDark}88 60%, transparent 100%)`,
            }}
          />
        </div>

        {/* Ambient glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[160px] pointer-events-none"
          style={{ backgroundColor: club.color + "18" }}
        />

        {/* Back link */}
        <div className="absolute top-8 left-6 sm:left-12 z-20">
          <Link
            href="/clubs"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm font-raleway transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Tous les clubs
          </Link>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 sm:px-12 pb-16">
          {/* Icon + tag */}
          <div className="dh-meta flex items-center gap-3 mb-5">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg"
              style={{ backgroundColor: club.color }}
            >
              <Icon className="w-6 h-6 text-white" />
            </div>
            <span
              className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest"
              style={{ backgroundColor: club.color + "22", color: club.accent, border: `1px solid ${club.color}44` }}
            >
              {club.tag}
            </span>
            <span className="text-white/30 text-xs font-raleway">Fondé en {club.founded}</span>
          </div>

          {/* Title */}
          <div className="overflow-hidden mb-2" style={{ perspective: "800px" }}>
            {club.name.toUpperCase().split("").map((char, i) => (
              <span
                key={i}
                className="dh-title-char inline-block font-protos font-black text-white leading-none"
                style={{
                  fontSize: "clamp(2.5rem, 7vw, 7rem)",
                  whiteSpace: char === " " ? "pre" : "normal",
                }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </div>

          {/* Tagline */}
          <p
            className="dh-meta font-raleway text-lg sm:text-xl max-w-xl mb-8"
            style={{ color: club.accent + "cc" }}
          >
            {club.tagline}
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-6">
            {[
              { icon: Users, value: `${club.members}+`, label: "Membres" },
              { icon: Calendar, value: `${club.eventsPerYear}`, label: "Événements/an" },
              { icon: Clock, value: club.schedule.split("—")[0].trim(), label: "Planning" },
            ].map(({ icon: SIcon, value, label }) => (
              <div key={label} className="dh-stat flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: club.color + "25" }}
                >
                  <SIcon className="w-4 h-4" style={{ color: club.accent }} />
                </div>
                <div>
                  <div className="text-white font-protos font-black text-lg leading-tight">{value}</div>
                  <div className="text-white/40 text-xs font-raleway">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/20 text-xs tracking-widest">
          <div className="w-px h-8 bg-white/20" />
          <span>SCROLL</span>
        </div>
      </section>

      {/* ── TICKER ───────────────────────────────────────── */}
      <div className="overflow-hidden py-3" style={{ backgroundColor: club.color }}>
        <div className="detail-ticker-inner flex gap-0 whitespace-nowrap w-max">
          {[...Array(2)].map((_, i) => (
            <span key={i} className="inline-flex items-center">
              {(club.tags.concat(club.tags)).map((t, j) => (
                <span key={j} className="inline-flex items-center gap-4 px-8 text-white font-protos font-bold text-sm tracking-wider uppercase">
                  <Icon className="w-3 h-3 opacity-50" />
                  {t}
                  <span className="text-white/30">◆</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ── ABOUT ────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="reveal-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-xs font-bold uppercase tracking-widest"
              style={{ backgroundColor: club.color + "15", color: club.accent, border: `1px solid ${club.color}30` }}>
              <Sparkles className="w-3.5 h-3.5" />
              À propos
            </div>
            <h2 className="text-3xl sm:text-4xl font-protos font-black text-foreground mb-6 leading-tight">
              Notre histoire
            </h2>
            <p className="text-muted-foreground font-raleway text-lg leading-relaxed">
              {club.longDescription}
            </p>
          </div>
        </div>
      </section>

      {/* ── ACTIVITIES ───────────────────────────────────── */}
      <section className="activities-section py-20 px-6 bg-card/50">
        <div className="container mx-auto max-w-5xl">
          <div className="reveal-up mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5 text-xs font-bold uppercase tracking-widest"
              style={{ backgroundColor: club.color + "15", color: club.accent, border: `1px solid ${club.color}30` }}>
              <Zap className="w-3.5 h-3.5" />
              Activités
            </div>
            <h2 className="text-3xl sm:text-4xl font-protos font-black text-foreground">
              Ce qu&apos;on fait ensemble
            </h2>
          </div>

          <div className="space-y-4">
            {club.activities.map((activity, i) => (
              <div
                key={i}
                className="activity-card flex items-start gap-5 p-5 sm:p-6 rounded-2xl border border-border bg-background hover:border-opacity-60 transition-all duration-300 group"
                style={{ ["--hover-border" as string]: club.color }}
              >
                <div
                  className="w-12 h-12 shrink-0 rounded-xl flex items-center justify-center text-xl"
                  style={{ backgroundColor: club.color + "18" }}
                >
                  {activity.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="font-protos font-black text-foreground text-lg">{activity.title}</h3>
                    <span
                      className="px-2.5 py-0.5 rounded-full text-xs font-semibold shrink-0"
                      style={{ backgroundColor: club.color + "15", color: club.accent }}
                    >
                      {activity.frequency}
                    </span>
                  </div>
                  <p className="text-muted-foreground font-raleway text-sm leading-relaxed">
                    {activity.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ─────────────────────────────────────── */}
      <section className="projects-section py-24 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="reveal-up mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5 text-xs font-bold uppercase tracking-widest"
              style={{ backgroundColor: club.color + "15", color: club.accent, border: `1px solid ${club.color}30` }}>
              <Lightbulb className="w-3.5 h-3.5" />
              Projets, Solutions & Inventions
            </div>
            <h2 className="text-3xl sm:text-4xl font-protos font-black text-foreground">
              Ce que nous avons bâti
            </h2>
          </div>

          {/* Highlighted projects */}
          <div className="grid sm:grid-cols-2 gap-5 mb-5">
            {club.projects.filter((p) => p.highlight).map((project, i) => (
              <ProjectCard key={i} project={project} clubColor={club.color} clubAccent={club.accent} />
            ))}
          </div>
          {/* Other projects */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {club.projects.filter((p) => !p.highlight).map((project, i) => (
              <ProjectCard key={i} project={project} clubColor={club.color} clubAccent={club.accent} small />
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY ──────────────────────────────────────── */}
      <section className="gallery-section py-12 px-6 bg-card/50">
        <div className="container mx-auto max-w-5xl">
          <div className="reveal-up mb-8">
            <h2 className="text-2xl font-protos font-black text-foreground">Notre galerie</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {club.galleryImages.map((src, i) => (
              <div
                key={i}
                className="gallery-img relative rounded-2xl overflow-hidden group cursor-pointer"
                style={{ height: i === 0 ? "280px" : "200px" }}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ backgroundColor: club.color + "33" }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ─────────────────────────────────────────── */}
      <section className="team-section py-24 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="reveal-up mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5 text-xs font-bold uppercase tracking-widest"
              style={{ backgroundColor: club.color + "15", color: club.accent, border: `1px solid ${club.color}30` }}>
              <Users className="w-3.5 h-3.5" />
              Bureau exécutif
            </div>
            <h2 className="text-3xl sm:text-4xl font-protos font-black text-foreground">
              L&apos;équipe dirigeante
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {club.coreTeam.map((member, i) => (
              <div
                key={i}
                className="team-card p-6 rounded-2xl border border-border bg-background hover:shadow-lg transition-all duration-300"
              >
                {/* Avatar */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-protos font-black text-xl mb-4 shadow-lg"
                  style={{ backgroundColor: member.avatar }}
                >
                  {member.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </div>
                <h3 className="font-protos font-black text-foreground text-lg leading-tight">{member.name}</h3>
                <p
                  className="text-sm font-semibold mt-1 mb-2"
                  style={{ color: club.accent }}
                >
                  {member.role}
                </p>
                <p className="text-muted-foreground text-xs font-raleway">{member.filiere}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── JOIN / INFO ───────────────────────────────────── */}
      <section className="py-20 px-6" style={{ backgroundColor: club.bgDark }}>
        <div className="container mx-auto max-w-4xl">
          <div className="grid sm:grid-cols-2 gap-8">
            {/* Join info */}
            <div className="reveal-up p-7 rounded-3xl border" style={{ borderColor: club.color + "30" }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: club.color + "25" }}>
                <CheckCircle2 className="w-5 h-5" style={{ color: club.accent }} />
              </div>
              <h3 className="font-protos font-black text-white text-xl mb-3">Comment rejoindre ?</h3>
              <p className="text-white/50 font-raleway text-sm leading-relaxed">{club.joinInfo}</p>
              <div className="mt-5 flex items-center gap-2">
                <Mail className="w-4 h-4" style={{ color: club.accent }} />
                <a href={`mailto:${club.contactEmail}`} className="text-sm font-semibold" style={{ color: club.accent }}>
                  {club.contactEmail}
                </a>
              </div>
            </div>

            {/* Schedule & socials */}
            <div className="reveal-up p-7 rounded-3xl border" style={{ borderColor: club.color + "30" }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: club.color + "25" }}>
                <MapPin className="w-5 h-5" style={{ color: club.accent }} />
              </div>
              <h3 className="font-protos font-black text-white text-xl mb-3">Planning & lieu</h3>
              <p className="text-white/50 font-raleway text-sm leading-relaxed">{club.schedule}</p>

              {club.socialLinks.length > 0 && (
                <div className="mt-6">
                  <p className="text-white/30 text-xs uppercase tracking-widest mb-3 font-raleway">Nos réseaux</p>
                  <div className="flex flex-wrap gap-3">
                    {club.socialLinks.map(({ platform }) => (
                      <span
                        key={platform}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
                        style={{ backgroundColor: club.color + "20", color: club.accent }}
                      >
                        <ExternalLink className="w-3 h-3" />
                        {platform}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section
        className="detail-cta relative py-32 px-6 overflow-hidden"
        style={{ backgroundColor: club.color }}
      >
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[120px]"
          style={{ backgroundColor: "#ffffff22" }} />

        <div className="relative z-10 container mx-auto max-w-2xl text-center">
          <div className="cta-line w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6 bg-white/20">
            <Icon className="w-7 h-7 text-white" />
          </div>
          <h2 className="cta-line text-4xl sm:text-5xl font-protos font-black text-white leading-tight mb-4">
            Prêt à rejoindre<br />le {club.name} ?
          </h2>
          <p className="cta-line text-white/70 font-raleway text-lg mb-10">
            {club.joinInfo}
          </p>
          <div className="cta-line flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`mailto:${club.contactEmail}`}
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-gray-900 font-bold rounded-full transition-all duration-300 hover:bg-white/90 shadow-xl"
            >
              <Flame className="w-4 h-4" />
              Nous contacter
            </a>
            <Link
              href="/clubs"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-white/30 text-white hover:bg-white/10 font-bold rounded-full transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4" />
              Tous les clubs
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

// ── Project Card Component ──────────────────────────────
function ProjectCard({
  project,
  clubColor,
  clubAccent,
  small = false,
}: {
  project: ClubProject;
  clubColor: string;
  clubAccent: string;
  small?: boolean;
}) {
  const typeConfig = PROJECT_TYPE_CONFIG[project.type];
  const statusConfig = STATUS_COLORS[project.status];
  const TypeIcon = typeConfig.icon;

  return (
    <div
      className={`project-card rounded-2xl border border-border bg-background p-5 sm:p-6 hover:shadow-md transition-all duration-300 ${small ? "" : "h-full"}`}
    >
      {/* Type badge + year */}
      <div className="flex items-center justify-between mb-4">
        <div
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold"
          style={{ backgroundColor: typeConfig.bg, color: typeConfig.text }}
        >
          <TypeIcon className="w-3 h-3" />
          {typeConfig.label}
        </div>
        <div className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: statusConfig.dot }}
          />
          <span
            className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
            style={{ backgroundColor: statusConfig.bg, color: statusConfig.text }}
          >
            {project.status}
          </span>
        </div>
      </div>

      <h3 className={`font-protos font-black text-foreground leading-tight mb-2 ${small ? "text-base" : "text-xl"}`}>
        {project.title}
      </h3>
      <p className="text-muted-foreground font-raleway text-sm leading-relaxed mb-3">
        {project.description}
      </p>

      <div className="text-xs font-semibold" style={{ color: clubAccent }}>
        {project.year}
      </div>
    </div>
  );
}
