"use client";

import { ArrowRight, BookOpen, GraduationCap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { programmes } from "@/data/programme.data";
import VideoMaster from "../formation/video-maste";

export interface Programme {
  id: number;
  niveau: "licence" | "master" | "doctorat";
  title: string;
  description: string;
  img: string;
  debouche?: string[];
  contenu?: string[];
  evolution?: string[];
}

const levelConfig = {
  licence: {
    label: "Licence",
    badge: "Bac+3",
    color: "bg-blue-500",
    textColor: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-100",
  },
  master: {
    label: "Master",
    badge: "Bac+5",
    color: "bg-violet-500",
    textColor: "text-violet-600",
    bgColor: "bg-violet-50",
    borderColor: "border-violet-100",
  },
  doctorat: {
    label: "Doctorat",
    badge: "Bac+8",
    color: "bg-amber-500",
    textColor: "text-amber-600",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-100",
  },
};

const ProgrammesPage = () => {
  const router = useRouter();
  const [activeLevel, setActiveLevel] = useState<"all" | "licence" | "master" | "doctorat">("all");

  const filtered =
    activeLevel === "all"
      ? programmes
      : programmes.filter((p) => p.niveau === activeLevel);

  const levels: Array<"all" | "licence" | "master" | "doctorat"> = [
    "all", "licence", "master", "doctorat",
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="section-divider absolute top-0 left-0 right-0" />
      <div className="absolute -bottom-32 right-0 w-96 h-96 rounded-full bg-primary/4 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="tag-primary mb-5 mx-auto w-fit">✦ Nos Programmes</div>
          <h2 className="text-4xl sm:text-5xl font-protos font-black text-foreground leading-tight mb-3">
            Des formations{" "}
            <span className="text-gradient-primary">pensées pour l&apos;avenir</span>
          </h2>
          <p className="text-lg text-muted-foreground font-raleway">
            De la Licence au Doctorat, des programmes conçus avec les entreprises
            pour maximiser votre employabilité.
          </p>
        </div>

        {/* Level filter */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-muted rounded-2xl p-1.5 gap-1 flex-wrap justify-center">
            {levels.map((level) => (
              <button
                key={level}
                onClick={() => setActiveLevel(level)}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                  activeLevel === level
                    ? "bg-primary text-white shadow-lg shadow-primary/25"
                    : "text-muted-foreground hover:text-foreground hover:bg-white"
                }`}
              >
                {level === "all"
                  ? "Tous"
                  : levelConfig[level].label + " (" + levelConfig[level].badge + ")"}
              </button>
            ))}
          </div>
        </div>

        {/* Programme cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filtered.map((prog) => {
            const cfg = levelConfig[prog.niveau];
            return (
              <div
                key={prog.id}
                className="upb-card overflow-hidden group cursor-pointer"
                onClick={() => router.push(`/formation-detail/${prog.id}`)}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={prog.img}
                    alt={prog.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-primary/50 to-transparent" />
                  {/* Level badge */}
                  <div className="absolute top-4 left-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-white ${cfg.color} shadow-md`}>
                      <GraduationCap className="w-3 h-3" />
                      {cfg.label} · {cfg.badge}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-protos font-bold text-foreground text-base mb-2 line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                    {prog.title}
                  </h3>
                  <p className="text-sm text-muted-foreground font-raleway line-clamp-3 mb-4 leading-relaxed">
                    {prog.description}
                  </p>

                  {/* Débouchés preview */}
                  {prog.debouche && prog.debouche.length > 0 && (
                    <div className="flex items-center gap-2 mb-4">
                      <BookOpen className="w-4 h-4 text-secondary shrink-0" />
                      <span className="text-xs text-muted-foreground font-semibold line-clamp-1">
                        {prog.debouche.slice(0, 2).join(" · ")}
                      </span>
                    </div>
                  )}

                  <button
                    className="flex items-center gap-2 text-sm font-bold text-primary hover:gap-4 transition-all duration-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/formation-detail/${prog.id}`);
                    }}
                  >
                    En savoir plus
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div className="col-span-full text-center py-16 text-muted-foreground">
              <GraduationCap className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p className="font-semibold">Pas encore disponible</p>
            </div>
          )}
        </div>

        {/* Video Master */}
        {(activeLevel === "all" || activeLevel === "master") && (
          <div className="mb-12">
            <VideoMaster
              src="/assets/video/master.mp4"
              title="Présentation du Master UPB"
              description="Découvrez nos formations Master et les opportunités offertes par UPB."
            />
          </div>
        )}

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/formation"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white text-sm font-bold rounded-full hover:bg-primary/90 hover:-translate-y-0.5 transition-all duration-300 shadow-lg shadow-primary/25"
          >
            Voir toutes nos formations
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <div className="section-divider absolute bottom-0 left-0 right-0" />
    </section>
  );
};

export default ProgrammesPage;
