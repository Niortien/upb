"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";
import { ArrowRight, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect, useCallback } from "react";
import { programmes } from "@/data/programme.data";
import { useBackgroundCanvas } from "@/hooks/useBackgroundCanvas";

gsap.registerPlugin(ScrollTrigger, Observer);

const NIVEAU_LABELS: Record<string, string> = {
  all: "Tous",
  licence: "Licence",
  master: "Master",
  doctorat: "Doctorat",
};

const NIVEAU_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  licence: { bg: "#2f3e9e18", text: "#2f3e9e", border: "#2f3e9e44" },
  master: { bg: "#f6a62318", text: "#c47b00", border: "#f6a62344" },
  doctorat: { bg: "#8e44ad18", text: "#8e44ad", border: "#8e44ad44" },
};

export default function Formation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState("all");
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  useBackgroundCanvas(canvasRef);

  const filtered = filter === "all"
    ? programmes
    : programmes.filter((p) => p.niveau === filter);

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
    const words = heroRef.current?.querySelectorAll(".hero-word");
    if (words) {
      gsap.from(words, {
        y: 80,
        opacity: 0,
        rotateX: -90,
        duration: 0.9,
        stagger: 0.08,
        ease: "power4.out",
        delay: 0.1,
      });
    }
    gsap.from(".hero-sub", {
      y: 30,
      opacity: 0,
      duration: 0.9,
      delay: 0.6,
      ease: "power3.out",
    });
    gsap.from(".filter-tab", {
      y: 20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.06,
      delay: 0.9,
      ease: "power2.out",
    });
    const cards = listRef.current?.querySelectorAll(".prog-card");
    if (cards) {
      cards.forEach((card, i) => {
        gsap.from(card, {
          y: 80,
          opacity: 0,
          duration: 0.75,
          ease: "power3.out",
          delay: i * 0.05,
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            once: true,
          },
        });
      });
    }
    gsap.utils.toArray<HTMLElement>(".section-label").forEach((el) => {
      gsap.from(el, {
        x: -40,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%" },
      });
    });
  }, { scope: containerRef, dependencies: [filter] });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: number) => {
    const el = document.getElementById(`mag-title-${id}`);
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width / 2)) * 0.22;
    const dy = (e.clientY - (rect.top + rect.height / 2)) * 0.22;
    gsap.to(el, { x: dx, y: dy, duration: 0.4, ease: "power2.out" });
  }, []);

  const handleCardEnter = useCallback((id: number) => {
    setHoveredId(id);
    gsap.to(`#card-img-${id}`, { scale: 1.06, duration: 0.6, ease: "power2.out" });
  }, []);

  const handleCardExit = useCallback((id: number) => {
    setHoveredId(null);
    gsap.to(`#card-img-${id}`, { scale: 1, duration: 0.6, ease: "power2.out" });
    const el = document.getElementById(`mag-title-${id}`);
    if (el) gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.5)" });
  }, []);

  const niveaux = ["all", ...Array.from(new Set(programmes.map((p) => p.niveau)))];

  return (
    <div ref={containerRef} className="min-h-screen bg-background overflow-x-hidden">

      {/* Canvas background */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ mixBlendMode: "multiply" }}
      />

      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-[3px] z-50 bg-transparent">
        <div
          ref={progressBarRef}
          className="h-full w-full origin-left"
          style={{ background: "linear-gradient(90deg, #2f3e9e, #f6a623)" }}
        />
      </div>

      {/* HERO */}
      <section
        ref={heroRef}
        className="relative pt-32 pb-24 px-6 flex flex-col items-center justify-center text-center min-h-[70vh] z-10"
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(47,62,158,0.07) 0%, transparent 70%)" }}
        />
        <div className="hero-sub inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary font-protos">
            Universite Polytechnique de Bingerville
          </span>
        </div>
        <div className="overflow-hidden mb-4" style={{ perspective: "800px" }}>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-protos font-black text-foreground leading-none flex flex-wrap justify-center gap-x-5 gap-y-2">
            {"NOS FORMATIONS".split(" ").map((word, i) => (
              <span key={i} className="hero-word inline-block">
                {word === "FORMATIONS" ? (
                  <span className="text-gradient-primary">{word}</span>
                ) : word}
              </span>
            ))}
          </h1>
        </div>
        <p className="hero-sub text-muted-foreground font-raleway text-xl max-w-xl mt-4 mb-10 leading-relaxed">
          {programmes.length} programmes d&apos;excellence — Licence, Master, Doctorat.
          Construisez l&apos;avenir que vous meritez.
        </p>
        <div className="hero-sub flex flex-wrap justify-center gap-3">
          {niveaux.map((n) => (
            <button
              key={n}
              onClick={() => setFilter(n)}
              className={`filter-tab px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                filter === n
                  ? "bg-primary text-white shadow-lg shadow-primary/30"
                  : "bg-card border border-border text-muted-foreground hover:border-primary/30 hover:text-primary"
              }`}
            >
              {NIVEAU_LABELS[n] ?? n}
            </button>
          ))}
        </div>
        <div className="hero-sub absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground/40 text-xs tracking-widest animate-bounce">
          <ChevronDown className="w-5 h-5" />
        </div>
      </section>

      {/* FORMATION LIST */}
      <section ref={listRef} className="relative z-10 px-6 pb-32">
        <div className="container mx-auto max-w-6xl">
          {(["licence", "master", "doctorat"] as const).map((niveau) => {
            const group = filtered.filter((p) => p.niveau === niveau);
            if (!group.length) return null;
            const col = NIVEAU_COLORS[niveau];
            return (
              <div key={niveau} className="mb-24">
                <div className="section-label flex items-center gap-4 mb-10">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-protos font-black text-xs uppercase"
                    style={{ backgroundColor: col.bg, color: col.text, border: `1px solid ${col.border}` }}
                  >
                    {niveau === "licence" ? "L" : niveau === "master" ? "M" : "D"}
                  </div>
                  <div>
                    <div className="font-protos font-black text-2xl text-foreground capitalize">
                      {NIVEAU_LABELS[niveau]}
                    </div>
                    <div className="text-muted-foreground text-xs font-raleway">
                      {group.length} formation{group.length > 1 ? "s" : ""}
                    </div>
                  </div>
                  <div className="flex-1 h-px bg-border ml-4" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                  {group.map((prog, idx) => {
                    const isLarge = idx % 5 === 0;
                    return (
                      <Link
                        href={`/formation-detail/${prog.id}`}
                        key={prog.id}
                        className={`prog-card group block ${isLarge ? "md:col-span-2" : ""}`}
                        onMouseMove={(e) => handleMouseMove(e, prog.id)}
                        onMouseEnter={() => handleCardEnter(prog.id)}
                        onMouseLeave={() => handleCardExit(prog.id)}
                      >
                        <div className="relative rounded-3xl overflow-hidden border border-border bg-card shadow-sm h-full transition-shadow duration-300 group-hover:shadow-xl group-hover:shadow-primary/10 group-hover:border-primary/20">
                          <div className={`relative overflow-hidden ${isLarge ? "h-72" : "h-52"}`}>
                            <Image
                              id={`card-img-${prog.id}`}
                              src={prog.img}
                              alt={prog.title}
                              fill
                              className="object-cover object-top"
                            />
                            <div
                              className="absolute inset-0"
                              style={{
                                background: `linear-gradient(to bottom, transparent 30%, ${col.text}22 100%)`,
                              }}
                            />
                            <div
                              className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm"
                              style={{ backgroundColor: col.bg, color: col.text, border: `1px solid ${col.border}` }}
                            >
                              {NIVEAU_LABELS[prog.niveau]}
                            </div>
                          </div>
                          <div className="p-6">
                            <h3
                              id={`mag-title-${prog.id}`}
                              className="font-protos font-black text-foreground text-lg leading-snug mb-3 will-change-transform"
                            >
                              {prog.title}
                            </h3>
                            <p className="text-muted-foreground text-sm font-raleway leading-relaxed line-clamp-2 mb-4">
                              {prog.description}
                            </p>
                            {prog.contenu && (
                              <div className="flex flex-wrap gap-1.5 mb-5">
                                {prog.contenu.slice(0, 3).map((item, i) => (
                                  <span
                                    key={i}
                                    className="px-2 py-0.5 rounded-full text-xs font-semibold"
                                    style={{ backgroundColor: col.bg, color: col.text }}
                                  >
                                    {item.split(" ").slice(0, 3).join(" ")}
                                  </span>
                                ))}
                              </div>
                            )}
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-muted-foreground font-raleway">
                                {prog.debouche?.length ?? 0} debouches
                              </span>
                              <div
                                className="flex items-center gap-2 text-sm font-bold transition-all duration-300 group-hover:gap-3"
                                style={{ color: col.text }}
                              >
                                Decouvrir
                                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                              </div>
                            </div>
                          </div>
                          <div
                            className="absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                            style={{ boxShadow: `inset 0 0 0 2px ${col.text}33` }}
                          />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA BAND */}
      <section className="relative z-10 py-24 px-6 overflow-hidden" style={{ backgroundColor: "#060b18" }}>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-[120px] pointer-events-none"
          style={{ backgroundColor: "rgba(47,62,158,0.15)" }}
        />
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="relative z-10 container mx-auto max-w-3xl text-center">
          <h2 className="text-4xl sm:text-6xl font-protos font-black text-white leading-tight mb-5">
            Votre avenir<br />
            <span className="text-secondary">commence ici.</span>
          </h2>
          <p className="text-white/40 font-raleway text-lg mb-10 max-w-md mx-auto">
            Inscriptions ouvertes pour 2025-2026. Rejoignez les 3000+ etudiants qui font confiance a l&apos;UPB.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-9 py-4 bg-secondary hover:bg-secondary/90 text-white font-bold rounded-full transition-all duration-300 shadow-lg shadow-secondary/30"
          >
            Candidater maintenant
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

    </div>
  );
}