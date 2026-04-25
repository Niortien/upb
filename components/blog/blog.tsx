"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Calendar, Clock, Play, TrendingUp } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import RemiseDesDiplomesSection from "./remise";
import VideoActualite from "./video-actualite";

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = ["Tous", "Événements", "Vie Étudiante", "Sports", "Innovations", "Recherche"];

const POSTS = [
  {
    title: "Sortie Récréative — Jardin Botanique de Bingerville",
    excerpt: "Une journée détente et cohésion dans le magnifique Jardin Botanique de Bingerville pour l'ensemble des étudiants UPB.",
    image: "/assets/image/home/star/sortie.jpg",
    category: "Événements",
    date: "13 Déc 2025",
    readTime: "5 min",
    featured: true,
  },
  {
    title: "Cérémonie de Remise des Diplômes 2024",
    excerpt: "Plus de 500 étudiants ont célébré leur réussite lors d'une cérémonie mémorable.",
    image: "/assets/image/diplome/1.jpg",
    category: "Événements",
    date: "10 Mars 2024",
    readTime: "3 min",
    featured: false,
  },
  {
    title: "Laboratoires de Pointe : L'UPB s'équipe",
    excerpt: "De nouveaux équipements scientifiques de dernière génération arrivent sur le campus pour enrichir la formation pratique.",
    image: "/assets/image/home/star/laboratoire.jpg",
    category: "Innovations",
    date: "8 Mars 2024",
    readTime: "4 min",
    featured: false,
  },
  {
    title: "Festival des Cultures : 5+ Pays Représentés",
    excerpt: "Notre festival annuel a accueilli des étudiants de plusieurs pays pour célébrer la diversité culturelle.",
    image: "/assets/image/home/star/motivation.jpg",
    category: "Vie Étudiante",
    date: "5 Mars 2024",
    readTime: "3 min",
    featured: false,
  },
  {
    title: "Cohésion & Team Building",
    excerpt: "Les associations étudiantes organisent des activités de renforcement de liens pour les nouvelles promotions.",
    image: "/assets/image/home/collectif.jpg",
    category: "Vie Étudiante",
    date: "1 Mars 2024",
    readTime: "2 min",
    featured: false,
  },
  {
    title: "Campus en Images : Regard Photographique",
    excerpt: "Découvrez le campus de l'UPB à travers l'objectif de nos étudiants photographes en résidence.",
    image: "/assets/image/home/campus/2O4A7455.webp",
    category: "Recherche",
    date: "25 Fév 2024",
    readTime: "4 min",
    featured: false,
  },
];

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("Tous");

  const heroRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const tickerRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const filtered = activeCategory === "Tous"
    ? POSTS
    : POSTS.filter((p) => p.category === activeCategory);

  const featured = POSTS.find((p) => p.featured)!;

  useGSAP(() => {
    // ── Hero text reveal
    const heroLines = heroTextRef.current?.querySelectorAll(".hero-line");
    if (heroLines?.length) {
      gsap.from(heroLines, {
        y: 80,
        opacity: 0,
        duration: 1.1,
        stagger: 0.15,
        ease: "power4.out",
        delay: 0.3,
      });
    }

    // ── Hero image parallax on scroll
    const heroImg = heroRef.current?.querySelector(".hero-bg-img");
    if (heroImg) {
      gsap.to(heroImg, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    // ── Ticker marquee
    if (tickerRef.current) {
      const ticker = tickerRef.current.querySelector(".ticker-inner");
      if (ticker) {
        gsap.to(ticker, {
          xPercent: -50,
          duration: 18,
          ease: "none",
          repeat: -1,
        });
      }
    }

    // ── Featured card reveal
    if (featuredRef.current) {
      gsap.from(featuredRef.current.querySelector(".featured-img"), {
        scale: 1.12,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: featuredRef.current,
          start: "top 80%",
        },
      });
      gsap.from(featuredRef.current.querySelectorAll(".featured-text > *"), {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: featuredRef.current,
          start: "top 75%",
        },
      });
    }

    // ── Cards stagger
    if (cardsRef.current) {
      gsap.from(cardsRef.current.querySelectorAll(".blog-card"), {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 80%",
        },
      });
    }

    // ── Video section
    if (videoRef.current) {
      gsap.from(videoRef.current, {
        opacity: 0,
        scale: 0.96,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: videoRef.current,
          start: "top 80%",
        },
      });
    }

    // ── CTA
    if (ctaRef.current) {
      gsap.from(ctaRef.current.querySelectorAll(".cta-el"), {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 80%",
        },
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">

      {/* ── HERO ────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative h-[85vh] min-h-[560px] flex items-end overflow-hidden bg-[#080d1a]">
        <div className="hero-bg-img absolute inset-0 scale-110">
          <Image
            src="/assets/image/home/star/sortie.jpg"
            alt=""
            fill
            priority
            className="object-cover opacity-40"
          />
        </div>
        <div className="absolute inset-0 bg-linear-to-t from-[#080d1a] via-[#080d1a]/30 to-transparent" />

        <div ref={heroTextRef} className="relative z-10 container mx-auto px-6 sm:px-12 pb-20">
          <div className="hero-line">
            <span className="text-secondary font-protos text-xs tracking-[0.4em] uppercase">
              Actualités & Vie du Campus
            </span>
          </div>
          <h1 className="hero-line text-6xl sm:text-8xl font-protos font-black text-white leading-none mt-3">
            Le Blog
          </h1>
          <h1 className="hero-line text-6xl sm:text-8xl font-protos font-black leading-none">
            <span className="text-stroke-white opacity-20">UPB</span>
          </h1>
          <p className="hero-line mt-6 text-white/60 font-raleway text-lg max-w-md">
            Événements, innovations, vie étudiante — tout ce qui fait vibrer notre communauté.
          </p>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 right-8 flex flex-col items-center gap-2 text-white/30">
          <div className="w-px h-12 bg-white/20 animate-pulse" />
          <span className="text-xs tracking-widest rotate-90 origin-center">SCROLL</span>
        </div>
      </section>

      {/* ── TICKER ──────────────────────────────────────────── */}
      <div ref={tickerRef} className="bg-secondary py-3 overflow-hidden">
        <div className="ticker-inner flex gap-0 whitespace-nowrap w-max">
          {[...Array(2)].map((_, i) => (
            <span key={i} className="inline-flex items-center gap-6 pr-6">
              {CATEGORIES.concat(CATEGORIES).map((c, j) => (
                <span key={j} className="text-white font-protos font-bold text-sm tracking-wider uppercase flex items-center gap-3">
                  {c}
                  <span className="text-white/40">◆</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ── FEATURED POST ───────────────────────────────────── */}
      <section ref={featuredRef} className="py-24 px-6 bg-background">
        <div className="container mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <TrendingUp className="w-5 h-5 text-secondary" />
            <span className="font-protos font-bold text-foreground text-lg">À la une</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="grid lg:grid-cols-5 gap-0 rounded-3xl overflow-hidden shadow-2xl border border-border">
            {/* Image 3/5 */}
            <div className="featured-img lg:col-span-3 relative h-80 lg:h-[500px] overflow-hidden">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-r from-transparent to-background/20 hidden lg:block" />
              <div className="absolute top-5 left-5">
                <span className="px-3 py-1 bg-secondary text-white text-xs font-bold rounded-full">
                  {featured.category}
                </span>
              </div>
            </div>

            {/* Content 2/5 */}
            <div className="lg:col-span-2 featured-text bg-card p-8 lg:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                <Calendar className="w-3.5 h-3.5" />
                <span>{featured.date}</span>
                <span>·</span>
                <Clock className="w-3.5 h-3.5" />
                <span>{featured.readTime} de lecture</span>
              </div>
              <h2 className="text-2xl lg:text-3xl font-protos font-black text-foreground leading-tight mb-5">
                {featured.title}
              </h2>
              <p className="text-muted-foreground font-raleway leading-relaxed mb-8 text-sm lg:text-base">
                {featured.excerpt}
              </p>
              <button className="group flex items-center gap-3 text-primary font-bold text-sm self-start">
                <span className="w-9 h-9 rounded-full bg-primary flex items-center justify-center group-hover:bg-secondary transition-colors">
                  <ArrowRight className="w-4 h-4 text-white" />
                </span>
                Lire l&apos;article complet
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── VIDEO ───────────────────────────────────────────── */}
      <section ref={videoRef} className="px-6 pb-20">
        <div className="container mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <Play className="w-4 h-4 text-white fill-white" />
            </div>
            <span className="font-protos font-bold text-foreground text-lg">Vidéo à la une</span>
            <div className="flex-1 h-px bg-border" />
          </div>
          <VideoActualite
            src="/assets/video/master.mp4"
            title="Présentation du Master UPB"
            description="Découvrez nos formations Master et les opportunités offertes par UPB."
          />
        </div>
      </section>

      {/* ── FILTER + GRID ───────────────────────────────────── */}
      <section className="py-16 px-6 bg-muted/20">
        <div className="container mx-auto">
          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-12">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-primary text-white shadow-lg shadow-primary/25"
                    : "bg-white border border-border text-muted-foreground hover:border-primary hover:text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Cards grid */}
          <div ref={cardsRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post, i) => (
              <article
                key={i}
                className="blog-card group bg-white rounded-3xl overflow-hidden border border-border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-400"
              >
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
                  <span className="absolute top-4 left-4 px-3 py-1 bg-primary/90 text-white text-xs font-bold rounded-full backdrop-blur-sm">
                    {post.category}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                    <Calendar className="w-3 h-3" />
                    <span>{post.date}</span>
                    <span>·</span>
                    <Clock className="w-3 h-3" />
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="font-protos font-black text-foreground text-lg leading-snug mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground font-raleway leading-relaxed line-clamp-2 mb-5">
                    {post.excerpt}
                  </p>
                  <button className="flex items-center gap-2 text-xs font-bold text-primary group-hover:gap-3 transition-all">
                    Lire la suite
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── REMISE DIPLÔMES ─────────────────────────────────── */}
      <RemiseDesDiplomesSection />

      {/* ── CTA NEWSLETTER ──────────────────────────────────── */}
      <section ref={ctaRef} className="relative py-32 px-6 overflow-hidden bg-[#080d1a]">
        <div className="absolute inset-0">
          <Image src="/assets/image/home/campus/2O4A6914.webp" alt="" fill className="object-cover opacity-10" />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(47,62,158,0.4)_0%,transparent_70%)]" />
        <div className="relative z-10 container mx-auto max-w-2xl text-center">
          <div className="cta-el tag-primary mb-6 mx-auto w-fit">✦ Restez connectés</div>
          <h2 className="cta-el text-4xl sm:text-5xl font-protos font-black text-white leading-tight mb-4">
            Ne manquez aucune<br />
            <span className="text-secondary">actualité UPB.</span>
          </h2>
          <p className="cta-el text-white/50 font-raleway text-base mb-10 max-w-md mx-auto">
            Rejoignez la communauté et recevez les dernières nouvelles, événements et opportunités.
          </p>
          <button className="cta-el group inline-flex items-center gap-3 px-8 py-4 bg-secondary hover:bg-secondary/90 text-white font-bold rounded-full transition-all duration-300 hover:gap-5 shadow-lg shadow-secondary/30">
            S&apos;abonner à la newsletter
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

    </div>
  );
};

export default Blog;
