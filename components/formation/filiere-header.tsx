"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useBackgroundCanvas } from "@/hooks/useBackgroundCanvas";

gsap.registerPlugin(ScrollTrigger);

interface Programme {
  id: number;
  niveau: "licence" | "master" | "doctorat";
  title: string;
  description: string;
  img: string;
  debouche?: string[];
  contenu?: string[];
  evolution?: string[];
}

interface FiliereHeaderProps {
  programme: Programme;
}

const NIVEAU_COLORS = {
  licence: { bg: "#2f3e9e18", text: "#2f3e9e", border: "#2f3e9e44", label: "Licence" },
  master: { bg: "#f6a62318", text: "#c47b00", border: "#f6a62344", label: "Master" },
  doctorat: { bg: "#8e44ad18", text: "#8e44ad", border: "#8e44ad44", label: "Doctorat" },
};

const FiliereHeader: React.FC<FiliereHeaderProps> = ({ programme }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const col = NIVEAU_COLORS[programme.niveau] ?? NIVEAU_COLORS.licence;

  useBackgroundCanvas(canvasRef);

  // Scroll progress bar
  useEffect(() => {
    const bar = progressBarRef.current;
    if (!bar) return;
    const st = ScrollTrigger.create({
      trigger: document.documentElement,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        gsap.set(bar, { scaleX: self.progress, transformOrigin: "left center" });
      },
    });
    return () => st.kill();
  }, []);

  useGSAP(() => {
    // Hero image parallax
    gsap.to(".detail-hero-img", {
      yPercent: 25,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    // Hero text entry
    gsap.from(".dh-title-word", {
      y: 80,
      opacity: 0,
      rotateX: -80,
      duration: 0.9,
      stagger: 0.07,
      ease: "power4.out",
      delay: 0.1,
    });
    gsap.from(".dh-meta", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      delay: 0.55,
      ease: "power3.out",
    });

    // Description parallax text
    gsap.from(".desc-text", {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".desc-section",
        start: "top 80%",
      },
    });

    // Syllabus items stagger from left
    gsap.from(".syllabus-item", {
      x: -50,
      opacity: 0,
      duration: 0.6,
      stagger: 0.08,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".syllabus-section",
        start: "top 80%",
      },
    });

    // Debouches stagger
    gsap.from(".debouche-item", {
      y: 40,
      opacity: 0,
      scale: 0.95,
      duration: 0.6,
      stagger: 0.07,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".debouche-section",
        start: "top 80%",
      },
    });

    // Evolution cards
    gsap.from(".evolution-card", {
      x: 50,
      opacity: 0,
      duration: 0.65,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".evolution-section",
        start: "top 85%",
      },
    });

    // Section headings parallax
    gsap.utils.toArray<HTMLElement>(".section-heading").forEach((el) => {
      gsap.from(el, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%" },
      });
    });

    // CTA band
    gsap.from(".cta-detail-item", {
      y: 50,
      opacity: 0,
      duration: 0.9,
      stagger: 0.12,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".cta-detail",
        start: "top 85%",
      },
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="min-h-screen bg-background overflow-x-hidden">

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ mixBlendMode: "multiply" }}
      />

      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-[3px] z-50">
        <div
          ref={progressBarRef}
          className="h-full w-full origin-left"
          style={{ background: `linear-gradient(90deg, ${col.text}, #f6a623)` }}
        />
      </div>

      {/* HERO */}
      <div ref={heroRef} className="relative h-screen min-h-[600px] overflow-hidden z-10">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={programme.img}
            alt={programme.title}
            fill
            priority
            className="detail-hero-img object-cover object-top scale-110"
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to top, #060b18 20%, ${col.text}44 60%, transparent 100%)`,
            }}
          />
        </div>

        {/* Ambient glow */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-[160px] pointer-events-none"
          style={{ backgroundColor: col.text + "15" }}
        />

        {/* Back link */}
        <div className="absolute top-8 left-6 sm:left-12 z-20">
          <Link
            href="/formation"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm font-raleway transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Toutes les formations
          </Link>
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 z-10 container mx-auto px-6 sm:px-12 pb-16">
          <div className="dh-meta flex items-center gap-3 mb-5">
            <div
              className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest backdrop-blur-sm"
              style={{ backgroundColor: col.bg, color: col.text, border: `1px solid ${col.border}` }}
            >
              {col.label}
            </div>
          </div>
          <div className="overflow-hidden mb-4" style={{ perspective: "800px" }}>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-protos font-black text-white leading-none flex flex-wrap gap-x-4 gap-y-1">
              {programme.title.split(" ").map((word, i) => (
                <span key={i} className="dh-title-word inline-block">
                  {word}
                </span>
              ))}
            </h1>
          </div>
          <div className="dh-meta flex flex-wrap items-center gap-6">
            {programme.contenu && (
              <div className="flex items-center gap-2 text-white/60 text-sm font-raleway">
                <BookOpen className="w-4 h-4" />
                {programme.contenu.length} modules
              </div>
            )}
            {programme.debouche && (
              <div className="flex items-center gap-2 text-white/60 text-sm font-raleway">
                <BriefcaseBusiness className="w-4 h-4" />
                {programme.debouche.length} debouches
              </div>
            )}
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/20 text-xs tracking-widest">
          <div className="w-px h-8 bg-white/20" />
          <span>SCROLL</span>
        </div>
      </div>

      {/* DESCRIPTION */}
      <section className="desc-section relative z-10 py-24 px-6 bg-[#060b18]">
        <div className="container mx-auto max-w-4xl">
          <div
            className="w-16 h-1 rounded-full mb-8"
            style={{ backgroundColor: col.text }}
          />
          <p className="desc-text text-white/70 font-raleway text-xl sm:text-2xl leading-relaxed">
            {programme.description}
          </p>
        </div>
      </section>

      {/* SYLLABUS */}
      {programme.contenu && programme.contenu.length > 0 && (
        <section className="syllabus-section relative z-10 py-24 px-6 bg-background">
          <div className="container mx-auto max-w-5xl">
            <div className="section-heading mb-12">
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
                style={{ backgroundColor: col.bg, color: col.text, border: `1px solid ${col.border}` }}
              >
                <BookOpen className="w-3.5 h-3.5" />
                Programme
              </div>
              <h2 className="text-3xl sm:text-4xl font-protos font-black text-foreground">
                Contenu de la formation
              </h2>
            </div>

            {/* Timeline layout */}
            <div className="relative">
              <div
                className="absolute left-5 top-0 bottom-0 w-px"
                style={{ backgroundColor: col.text + "30" }}
              />
              <div className="space-y-4 pl-14">
                {programme.contenu.map((item, i) => (
                  <div key={i} className="syllabus-item relative group">
                    {/* Timeline dot */}
                    <div
                      className="absolute -left-9 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full transition-transform duration-300 group-hover:scale-150"
                      style={{ backgroundColor: col.text, border: `2px solid white` }}
                    />
                    <div className="p-5 rounded-2xl border border-border bg-card hover:border-opacity-60 hover:shadow-md transition-all duration-300">
                      <div className="flex items-start gap-4">
                        <span
                          className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black font-protos"
                          style={{ backgroundColor: col.bg, color: col.text }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-foreground font-raleway font-medium leading-relaxed pt-0.5">
                          {item}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* DEBOUCHES */}
      {programme.debouche && programme.debouche.length > 0 && (
        <section className="debouche-section relative z-10 py-24 px-6 bg-card/50">
          <div className="container mx-auto max-w-5xl">
            <div className="section-heading mb-12">
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
                style={{ backgroundColor: col.bg, color: col.text, border: `1px solid ${col.border}` }}
              >
                <BriefcaseBusiness className="w-3.5 h-3.5" />
                Metiers
              </div>
              <h2 className="text-3xl sm:text-4xl font-protos font-black text-foreground">
                Debouches professionnels
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {programme.debouche.map((item, i) => (
                <div
                  key={i}
                  className="debouche-item flex items-start gap-3 p-5 rounded-2xl border border-border bg-background hover:shadow-md hover:border-opacity-60 transition-all duration-300 group"
                >
                  <CheckCircle2
                    className="w-5 h-5 mt-0.5 shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{ color: col.text }}
                  />
                  <span className="text-foreground font-raleway font-medium text-sm leading-relaxed">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* EVOLUTION */}
      {programme.evolution && programme.evolution.length > 0 && (
        <section className="evolution-section relative z-10 py-24 px-6 bg-background">
          <div className="container mx-auto max-w-5xl">
            <div className="section-heading mb-12">
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
                style={{ backgroundColor: col.bg, color: col.text, border: `1px solid ${col.border}` }}
              >
                <TrendingUp className="w-3.5 h-3.5" />
                Parcours
              </div>
              <h2 className="text-3xl sm:text-4xl font-protos font-black text-foreground">
                Evolutions possibles
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row flex-wrap gap-4">
              {programme.evolution.map((item, i) => (
                <div
                  key={i}
                  className="evolution-card inline-flex items-center gap-3 px-6 py-4 rounded-2xl border font-raleway font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                  style={{
                    backgroundColor: col.bg,
                    color: col.text,
                    borderColor: col.border,
                  }}
                >
                  <ChevronRight className="w-4 h-4 shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section
        className="cta-detail relative z-10 py-32 px-6 overflow-hidden"
        style={{ backgroundColor: "#060b18" }}
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-[120px] pointer-events-none"
          style={{ backgroundColor: col.text + "18" }}
        />
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="relative z-10 container mx-auto max-w-2xl text-center">
          <h2 className="cta-detail-item text-4xl sm:text-6xl font-protos font-black text-white leading-tight mb-5">
            Pret a rejoindre<br />
            <span style={{ color: col.text }}>cette formation ?</span>
          </h2>
          <p className="cta-detail-item text-white/40 font-raleway text-lg mb-10 max-w-md mx-auto">
            Candidatez maintenant et commencez votre parcours d&apos;excellence a l&apos;UPB.
          </p>
          <div className="cta-detail-item flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 text-white font-bold rounded-full transition-all duration-300 shadow-lg"
              style={{ backgroundColor: col.text }}
            >
              Candidater
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/formation"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-white/20 text-white/70 hover:text-white hover:border-white/50 font-bold rounded-full transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4" />
              Autres formations
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

import React from "react";
export default FiliereHeader;