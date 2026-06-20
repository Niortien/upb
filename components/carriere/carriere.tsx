"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Briefcase,
  GraduationCap,
  MapPin,
  Clock,
  Building2,
  ChevronRight,
  Users,
  Star,
  FileText,
  Linkedin,
  Mail,
  TrendingUp,
  Filter,
  Zap,
} from "lucide-react";
import { OFFRES, PARTENAIRES, type TypeOffre } from "@/data/carrieres.data";
import { WHATSAPP_URL } from "@/lib/constants";

const TYPE_LABELS: Record<TypeOffre, string> = {
  stage: "Stage",
  emploi: "Emploi",
  alternance: "Alternance",
};

const TYPE_COLORS: Record<TypeOffre, { bg: string; text: string; border: string }> = {
  stage: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
  emploi: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  alternance: { bg: "bg-violet-50", text: "text-violet-700", border: "border-violet-200" },
};

const careerStats = [
  { value: "65%", label: "Taux d'emploi à 6 mois", icon: TrendingUp },
  { value: "200+", label: "Entreprises partenaires", icon: Building2 },
  { value: "500+", label: "Offres par an", icon: Briefcase },
  { value: "1 200+", label: "Alumni en poste", icon: Users },
];

const services = [
  {
    icon: FileText,
    title: "Atelier CV & Lettre de motivation",
    description: "Sessions hebdomadaires pour optimiser vos candidatures avec les conseils de recruteurs professionnels.",
    freq: "Chaque vendredi",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: Linkedin,
    title: "Coaching LinkedIn",
    description: "Apprenez à bâtir un profil LinkedIn percutant et à développer votre réseau professionnel en Côte d'Ivoire.",
    freq: "2x par mois",
    color: "bg-sky-50 text-sky-600",
  },
  {
    icon: Users,
    title: "Simulations d'entretiens",
    description: "Préparez-vous avec des mises en situation réelles conduites par des professionnels RH partenaires.",
    freq: "Sur rendez-vous",
    color: "bg-violet-50 text-violet-600",
  },
  {
    icon: Star,
    title: "Mentorat Alumni",
    description: "Soyez accompagné par un diplômé UPB en poste dans votre secteur cible pendant 3 mois.",
    freq: "Programme trimestriel",
    color: "bg-orange-50 text-orange-600",
  },
];

const FILTER_TABS: { label: string; value: TypeOffre | "tous" }[] = [
  { label: "Toutes les offres", value: "tous" },
  { label: "Emplois", value: "emploi" },
  { label: "Stages", value: "stage" },
  { label: "Alternances", value: "alternance" },
];

export default function Carriere() {
  const [activeFilter, setActiveFilter] = useState<TypeOffre | "tous">("tous");

  const filtered =
    activeFilter === "tous"
      ? OFFRES
      : OFFRES.filter((o) => o.type === activeFilter);

  return (
    <div className="min-h-screen bg-background">

      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden pt-32 pb-24 px-6 bg-mesh-primary">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-secondary/5 blur-3xl pointer-events-none" />

        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <div className="tag-primary mb-6 mx-auto w-fit">
            <Briefcase className="w-3 h-3" />
            Carrière & Opportunités
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-protos font-black text-foreground leading-[1.05] mb-6">
            Lancez votre{" "}
            <span className="text-gradient-gold">Carrière</span>
            <br />
            avec l&apos;UPB
          </h1>

          <p className="text-xl text-muted-foreground font-raleway max-w-2xl mx-auto mb-12 leading-relaxed">
            Accédez aux offres de stages, d&apos;emplois et d&apos;alternances de nos entreprises
            partenaires, et bénéficiez des services carrière de l&apos;université.
          </p>

          {/* Hero stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {careerStats.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className="upb-card p-5 text-center">
                  <Icon className="w-5 h-5 text-secondary mx-auto mb-2" />
                  <div className="number-stat text-2xl mb-1">{s.value}</div>
                  <p className="text-xs text-muted-foreground font-semibold leading-tight">{s.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── OFFRES ─── */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <div className="tag-primary mb-4 w-fit">
                <Filter className="w-3 h-3" />
                Offres disponibles
              </div>
              <h2 className="text-3xl sm:text-4xl font-protos font-black text-foreground">
                {filtered.length} offre{filtered.length > 1 ? "s" : ""} disponible{filtered.length > 1 ? "s" : ""}
              </h2>
            </div>

            {/* Filter tabs */}
            <div className="flex flex-wrap gap-2">
              {FILTER_TABS.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setActiveFilter(tab.value)}
                  className={`px-4 py-2 rounded-full text-sm font-bold border transition-all duration-200 ${
                    activeFilter === tab.value
                      ? "bg-primary text-white border-primary shadow-md shadow-primary/20"
                      : "bg-background text-foreground/70 border-border hover:border-primary/40 hover:text-primary"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Offres grid */}
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map((offre) => {
              const col = TYPE_COLORS[offre.type];
              return (
                <div key={offre.id} className="upb-card p-6 flex flex-col gap-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${col.bg} ${col.text} ${col.border}`}
                    >
                      {offre.type === "stage" && <Clock className="w-3 h-3" />}
                      {offre.type === "emploi" && <Briefcase className="w-3 h-3" />}
                      {offre.type === "alternance" && <Zap className="w-3 h-3" />}
                      {TYPE_LABELS[offre.type]}
                    </div>
                    {offre.duree && (
                      <span className="text-xs text-muted-foreground font-semibold bg-muted px-2.5 py-1 rounded-full">
                        {offre.duree}
                      </span>
                    )}
                  </div>

                  {/* Title & company */}
                  <div>
                    <h3 className="text-base font-protos font-black text-foreground leading-snug mb-1">
                      {offre.titre}
                    </h3>
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Building2 className="w-3.5 h-3.5 shrink-0" />
                      <span className="font-semibold">{offre.entreprise}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-1">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      <span>{offre.lieu}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {offre.description}
                  </p>

                  {/* Formations cibles */}
                  <div className="flex flex-wrap gap-1.5">
                    {offre.formations.map((f) => (
                      <span key={f} className="tag-primary text-[10px] py-0.5 px-2">
                        {f}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="border-t border-border pt-4 mt-auto flex items-center justify-between">
                    {offre.remuneration && (
                      <span className="text-xs font-bold text-secondary">
                        {offre.remuneration}
                      </span>
                    )}
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-white text-xs font-bold rounded-full hover:bg-primary/90 hover:scale-105 transition-all duration-200 ml-auto"
                    >
                      Postuler
                      <ChevronRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Vide */}
          {filtered.length === 0 && (
            <div className="text-center py-24">
              <div className="text-5xl mb-4">🔍</div>
              <p className="text-muted-foreground font-raleway">
                Aucune offre disponible dans cette catégorie pour le moment.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ─── PARTENAIRES ─── */}
      <section className="py-24 px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <div className="tag-primary mb-4 mx-auto w-fit">
              <Building2 className="w-3 h-3" />
              Entreprises partenaires
            </div>
            <h2 className="text-3xl sm:text-4xl font-protos font-black text-foreground">
              Nos partenaires qui recrutent
            </h2>
            <p className="text-muted-foreground font-raleway mt-3 max-w-xl mx-auto">
              Des entreprises de premier plan font confiance à l&apos;UPB pour recruter leurs talents.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {PARTENAIRES.map((p) => (
              <div
                key={p.nom}
                className="upb-card p-5 text-center flex flex-col items-center gap-3"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/8 flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-protos font-bold text-foreground leading-tight">{p.nom}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{p.secteur}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICES CARRIÈRE ─── */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <div className="tag-gold mb-4 mx-auto w-fit">
              <Star className="w-3 h-3" />
              Services UPB
            </div>
            <h2 className="text-3xl sm:text-4xl font-protos font-black text-foreground">
              Préparez votre insertion professionnelle
            </h2>
            <p className="text-muted-foreground font-raleway mt-3 max-w-xl mx-auto">
              L&apos;UPB vous accompagne bien au-delà du diplôme, avec des services carrière
              concrets et personnalisés.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className="upb-card p-6 group">
                  <div className={`w-12 h-12 rounded-2xl ${s.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-protos font-bold text-foreground mb-2 leading-snug">
                    {s.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {s.description}
                  </p>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-primary bg-primary/8 px-3 py-1.5 rounded-full">
                    <Clock className="w-3 h-3" />
                    {s.freq}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── CTA ENTREPRISES ─── */}
      <section className="py-24 px-6 bg-[#060b18] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-[120px] bg-primary/15 pointer-events-none" />
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-left">
              <div className="tag-gold mb-4 w-fit">
                <GraduationCap className="w-3 h-3" />
                Vous êtes une entreprise ?
              </div>
              <h2 className="text-3xl sm:text-4xl font-protos font-black text-white leading-tight mb-4">
                Recrutez les meilleurs talents de l&apos;UPB
              </h2>
              <p className="text-white/60 font-raleway leading-relaxed">
                Déposez vos offres gratuitement et accédez à un vivier de plus
                de 5 000 étudiants qualifiés dans les domaines du numérique,
                de la finance, du droit et de l&apos;environnement.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-secondary text-foreground font-bold rounded-full hover:bg-secondary/90 hover:scale-105 transition-all duration-300 shadow-lg shadow-secondary/20"
              >
                <Briefcase className="w-5 h-5" />
                Déposer une offre d&apos;emploi
              </Link>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-white/20 text-white font-bold rounded-full hover:bg-white/10 hover:border-white/40 transition-all duration-300"
              >
                <Mail className="w-5 h-5" />
                Nous contacter
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
