"use client";

import { Building2, ChevronRight, Home } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const tabs = [
  {
    id: "campus",
    label: "Campus",
    icon: Building2,
    description:
      "Notre campus a été conçu pour offrir un cadre propice à l'apprentissage — amphithéâtres, laboratoires informatiques, bibliothèque numérique, espaces verts et zones de coworking. Tout est pensé pour favoriser votre réussite.",
    images: [
      "/assets/image/home/star/salle1.jpg",
      "/assets/image/home/star/motivation.jpg",
      "/assets/image/home/campus/campus1.jpg",
    ],
    highlights: ["Amphithéâtres HD", "Labos informatiques", "Biblio numérique", "Espaces verts"],
    stat: "5 000+",
    statLabel: "Étudiants actifs sur le campus chaque jour",
  },
  {
    id: "cite",
    label: "Cité Universitaire",
    icon: Home,
    description:
      "La cité universitaire offre confort, sécurité et proximité. Chambres modernes, espaces de détente, zones d'étude, restauration et sécurité 24h/24 pour un environnement équilibré.",
    images: [
      "/assets/image/cite/cite1.jpg",
      "/assets/image/cite/cite2.jpg",
      "/assets/image/cite/cite3.jpg",
    ],
    highlights: ["Chambres modernes", "Restauration", "Sécurité 24/7", "Espaces détente"],
    stat: "800+",
    statLabel: "Places disponibles à la cité universitaire",
  },
];

const SchoolLifeSection = () => {
  const [activeTab, setActiveTab] = useState("campus");
  const active = tabs.find((t) => t.id === activeTab)!;
  const Icon = active.icon;

  return (
    <section className="py-12 bg-mesh-primary relative overflow-hidden">
      <div className="section-divider absolute top-0 left-0 right-0" />
      <div className="absolute -bottom-32 right-0 w-96 h-96 rounded-full bg-secondary/5 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-7">
          <div className="tag-primary mb-3 mx-auto w-fit">✦ La Vie à l&apos;UPB</div>
          <h2 className="text-4xl sm:text-5xl font-protos font-black text-foreground leading-tight mb-2">
            Découvrez un{" "}
            <span className="text-gradient-primary">environnement d&apos;exception</span>
          </h2>
          <p className="text-base text-muted-foreground font-raleway">
            Campus moderne, cité confortable, espaces verts — tout est réuni pour que vous vous épanouissiez.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex justify-center mb-7">
          <div className="inline-flex bg-white border border-border rounded-xl p-1 shadow-sm gap-1">
            {tabs.map((tab) => {
              const TabIcon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-primary text-white shadow-md shadow-primary/25"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <TabIcon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Images */}
          <div className="grid grid-cols-2 gap-2 h-[380px]">
            <div className="relative rounded-2xl overflow-hidden shadow-lg group row-span-2">
              <Image src={active.images[0]} alt="Vie à l'UPB" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-linear-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-lg group">
              <Image src={active.images[1]} alt="Vie à l'UPB" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-linear-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-lg group">
              <Image src={active.images[2]} alt="Vie à l'UPB" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-linear-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>

          {/* Text content */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-xl font-protos font-bold text-foreground">
                {active.id === "campus" ? "Le Campus Universitaire" : "La Cité Universitaire"}
              </h3>
            </div>

            <p className="text-sm text-muted-foreground font-raleway leading-relaxed">
              {active.description}
            </p>

            <div className="grid grid-cols-2 gap-2">
              {active.highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border border-border shadow-sm">
                  <ChevronRight className="w-3.5 h-3.5 text-secondary shrink-0" />
                  <span className="text-xs font-semibold text-foreground">{h}</span>
                </div>
              ))}
            </div>

            <div className="relative rounded-xl overflow-hidden p-5 bg-linear-to-br from-primary to-[#1a237e] text-white shadow-lg">
              <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-white/5" />
              <div className="relative z-10">
                <div className="number-stat text-3xl mb-1">{active.stat}</div>
                <div className="text-white/80 font-semibold text-xs">{active.statLabel}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section-divider absolute bottom-0 left-0 right-0" />
    </section>
  );
};

export default SchoolLifeSection;
