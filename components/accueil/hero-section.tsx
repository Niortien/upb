"use client";
import { ArrowDown, GraduationCap, MapPin, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

const stats = [
  { number: "15 000+", label: "Étudiants formés" },
  { number: "8+", label: "Programmes" },
  { number: "5+", label: "Pays représentés" },
  { number: "65%", label: "Taux d'emploi" },
];

const HeroSection = () => {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { width, height } = hero.getBoundingClientRect();
      const x = (clientX / width - 0.5) * 20;
      const y = (clientY / height - 0.5) * 20;
      const bg = hero.querySelector<HTMLDivElement>(".hero-parallax");
      if (bg) {
        bg.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.08)`;
      }
    };
    hero.addEventListener("mousemove", handleMouseMove);
    return () => hero.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background image with parallax */}
      <div className="absolute inset-0 z-0">
        <div className="hero-parallax absolute inset-[-4%] transition-transform duration-700 ease-out will-change-transform">
          <Image
            src="/assets/image/home/campus/2O4A6842.webp"
            alt="Campus UPB"
            fill
            priority
            className="object-cover"
          />
        </div>
        {/* Multi-layer overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-[#0a0e1a]/70 via-[#1a237e]/50 to-[#0a0e1a]/85" />
        <div className="absolute inset-0 bg-linear-to-r from-[#0a0e1a]/60 via-transparent to-[#0a0e1a]/40" />
      </div>

      {/* Animated geometric accent */}
      <div className="absolute top-1/4 right-12 w-64 h-64 rounded-full border border-secondary/20 animate-float hidden lg:block" />
      <div className="absolute top-1/3 right-20 w-40 h-40 rounded-full border border-white/10 animate-float hidden lg:block" style={{ animationDelay: "1s" }} />
      <div className="absolute bottom-1/4 left-12 w-48 h-48 rounded-full border border-primary/30 animate-float hidden lg:block" style={{ animationDelay: "2s" }} />

      {/* Ticker bar */}
      <div className="absolute top-20 left-0 right-0 z-10 overflow-hidden border-b border-white/10 bg-primary/60 backdrop-blur-sm py-2">
        <div className="animate-ticker whitespace-nowrap flex gap-16 text-white/80 text-xs font-semibold tracking-widest uppercase">
          {[...Array(6)].map((_, i) => (
            <span key={i} className="flex items-center gap-4">
              <Sparkles className="w-3 h-3 text-secondary inline" />
              Université Polytechnique de Bingerville
              <span className="text-secondary mx-4">·</span>
              Excellence · Innovation · Avenir
              <span className="text-secondary mx-4">·</span>
              Côte d&apos;Ivoire
            </span>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          {/* <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8 animate-slide-up">
            <MapPin className="w-4 h-4 text-secondary" />
            <span className="text-white/90 text-sm font-semibold tracking-wide">
              Bingerville, Côte d&apos;Ivoire
            </span>
          </div> */}

          {/* Main heading */}
          <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <span className="block text-secondary text-xl sm:text-2xl font-protos font-bold tracking-widest uppercase mb-4">
              UPB
            </span>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-protos font-black text-white leading-[1.05] mb-6">
              Forgez Votre{" "}
              <span
                className="relative inline-block"
                style={{
                  backgroundImage: "linear-gradient(135deg, #f6a623 0%, #ffd07a 50%, #f6a623 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Excellence
              </span>
              <br />
              <span className="text-white/90">à Bingerville</span>
            </h1>
          </div>

          {/* Subtitle */}
          <p
            className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-12 font-raleway leading-relaxed animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            L&apos;université qui allie rigueur académique, innovation technologique et développement humain pour préparer les leaders de demain.
          </p>

          {/* CTA buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20 animate-slide-up"
            style={{ animationDelay: "0.3s" }}
          >
            <Link
              href="/formation"
              className="flex items-center gap-2 px-8 py-4 bg-secondary text-foreground font-bold rounded-full hover:bg-secondary/90 hover:scale-105 transition-all duration-300 shadow-xl shadow-secondary/30 text-sm"
            >
              <GraduationCap className="w-5 h-5" />
              Découvrir nos formations
            </Link>
            <Link
              href="/about"
              className="flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-md text-white font-bold rounded-full border border-white/25 hover:bg-white/20 hover:scale-105 transition-all duration-300 text-sm"
            >
              En savoir plus
              <ArrowDown className="w-4 h-4 -rotate-90" />
            </Link>
          </div>

          {/* Stats */}
          <div
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto animate-slide-up"
            style={{ animationDelay: "0.4s" }}
          >
            {stats.map((stat, i) => (
              <div
                key={i}
                className="rounded-2xl p-5 text-center"
                style={{
                  background: "rgba(255,255,255,0.07)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
              >
                <div className="number-stat mb-1">{stat.number}</div>
                <div className="text-xs text-white/60 font-semibold uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-float">
        <span className="text-white/40 text-xs font-semibold uppercase tracking-widest">
          Défiler
        </span>
        <div className="w-5 h-8 rounded-full border border-white/30 flex items-start justify-center p-1">
          <div className="w-1 h-2 bg-white/60 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
