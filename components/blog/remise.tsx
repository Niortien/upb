"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GraduationCap, Star } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const ALL_IMAGES = [
  "/assets/image/diplome/1.jpg",
  "/assets/image/diplome/2.jpg",
  "/assets/image/diplome/3.jpg",
  "/assets/image/diplome/4.jpg",
  "/assets/image/diplome/5.jpg",
  "/assets/image/diplome/6.jpg",
  "/assets/image/diplome/7.jpg",
  "/assets/image/diplome/9.jpg",
];

const RemiseDesDiplomesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Header reveal
    gsap.from(".diplome-header > *", {
      y: 50,
      opacity: 0,
      duration: 0.9,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".diplome-header",
        start: "top 80%",
      },
    });

    // Bento items stagger
    gsap.from(".diplome-cell", {
      scale: 0.92,
      opacity: 0,
      duration: 0.7,
      stagger: 0.08,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".diplome-grid",
        start: "top 80%",
      },
    });

    // Quote block
    gsap.from(".diplome-quote", {
      x: -40,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".diplome-quote",
        start: "top 80%",
      },
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-28 bg-[#080d1a] relative overflow-hidden">
      {/* Subtle grid bg */}
      <div className="absolute inset-0 opacity-5"
        style={{ backgroundImage: "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      <div className="absolute inset-0 bg-linear-to-b from-[#080d1a] via-transparent to-[#080d1a] pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">

        {/* ── HEADER ─────────────────────────────────────── */}
        <div className="diplome-header text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 border border-secondary/20 rounded-full mb-6">
            <GraduationCap className="w-4 h-4 text-secondary" />
            <span className="text-secondary font-protos text-xs tracking-[0.3em] uppercase">
              4ème Promotion · UPB
            </span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-protos font-black text-white leading-tight mb-5">
            Chaque diplôme,<br />
            <span className="text-secondary">une victoire.</span>
          </h2>
          <p className="text-white/50 font-raleway text-lg leading-relaxed">
            Un moment d&apos;émotion et de fierté partagée entre diplômés, familles et corps professoral.
          </p>
        </div>

        {/* ── BENTO GRID ─────────────────────────────────── */}
        {/* 
          Layout (12 cols):
          Row 1 : [tall 4] [normal 4] [normal 4]
          Row 2 : [tall 4 cont.] [wide 8]
          Row 3 : [normal 3] [normal 3] [normal 3] [normal 3]
        */}
        <div className="diplome-grid grid grid-cols-12 gap-2 mb-20"
          style={{ gridTemplateRows: "280px 280px 260px" }}>

          {/* Cell 1 — tall left (rows 1-2) */}
          <div className="diplome-cell col-span-4 row-span-2 relative rounded-3xl overflow-hidden group">
            <Image src={ALL_IMAGES[0]} alt="" fill className="object-cover object-top transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-linear-to-t from-secondary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          {/* Cell 2 — top middle */}
          <div className="diplome-cell col-span-4 row-span-1 relative rounded-3xl overflow-hidden group">
            <Image src={ALL_IMAGES[1]} alt="" fill className="object-cover object-top transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-linear-to-t from-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          {/* Cell 3 — top right */}
          <div className="diplome-cell col-span-4 row-span-1 relative rounded-3xl overflow-hidden group">
            <Image src={ALL_IMAGES[2]} alt="" fill className="object-cover object-top transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-linear-to-t from-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          {/* Cell 4 — wide bottom-right (row 2, cols 5-12) */}
          <div className="diplome-cell col-span-8 row-span-1 relative rounded-3xl overflow-hidden group">
            <Image src={ALL_IMAGES[3]} alt="" fill className="object-cover object-center transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-linear-to-r from-black/50 to-transparent" />
            {/* Floating badge */}
            <div className="absolute bottom-5 left-5 flex items-center gap-2 px-4 py-2 bg-secondary rounded-full shadow-lg">
              <Star className="w-3.5 h-3.5 text-white fill-white" />
              <span className="text-white text-xs font-bold">Cérémonie 2024</span>
            </div>
          </div>

          {/* Row 3 — 4 equal cells */}
          {ALL_IMAGES.slice(4).map((src, i) => (
            <div key={i} className="diplome-cell col-span-3 row-span-1 relative rounded-3xl overflow-hidden group">
              <Image src={src} alt="" fill className="object-cover object-top transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>

        {/* ── QUOTE BLOCK ────────────────────────────────── */}
        <div className="diplome-quote max-w-4xl mx-auto border-l-4 border-secondary pl-8 py-2">
          <div className="text-6xl font-protos text-secondary/20 leading-none select-none mb-2">&ldquo;</div>
          <p className="text-white/60 font-raleway text-xl italic leading-relaxed">
            La cérémonie de remise des diplômes de la 4ème promotion a été un événement empreint
            d&apos;émotion et de fierté — des discours inspirants, des moments de joie partagée
            entre diplômés, leurs familles et tout le corps professoral de l&apos;UPB.
          </p>
          <div className="mt-6 text-white/30 text-sm font-raleway">
            — Service Communication, UPB
          </div>
        </div>

      </div>
    </section>
  );
};

export default RemiseDesDiplomesSection;
