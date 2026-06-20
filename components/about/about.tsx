'use client';
import { ArrowRight, Award, GraduationCap, Microscope, Users, Wifi } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

const About = () => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/assets/pdf/FICHE DE RENSEIGNEMENT UPB  2025-2026_actualisée-1.pdf";
    link.download = "fiche-de-renseignement-UPB.pdf";
    link.click();
  };

  return (
    <div className="min-h-screen bg-background">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative h-screen min-h-[600px] overflow-hidden">
        <Image
          src="/assets/image/home/campus/2O4A6842.webp"
          alt="UPB campus"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end pb-20 px-6 sm:px-12 lg:px-24">
          <div className="max-w-3xl">
            <span className="inline-block text-secondary font-protos text-sm tracking-[0.3em] uppercase mb-4">
              Université Polytechnique de Bingerville
            </span>
            <h1 className="text-4xl sm:text-6xl font-protos font-black text-white leading-tight mb-6">
              Former les leaders<br />
              <span className="text-secondary">de demain.</span>
            </h1>
            <p className="text-white/70 text-lg font-raleway max-w-xl">
              Depuis 2018, un campus d'exception au cœur de la Côte d'Ivoire.
            </p>
          </div>
        </div>
        {/* Scroll hint */}
        <div className="absolute bottom-8 right-8 flex items-center gap-2 text-white/50 text-sm font-raleway">
          <span>Découvrir</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </section>

      {/* ── STATS STRIP ──────────────────────────────────────── */}
      <section className="bg-primary py-10 px-6">
        <div className="container mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8 text-center text-white">
          {[
            { n: "8+", l: "Ans d'excellence" },
            { n: "5 000+", l: "Étudiants actifs" },
            { n: "5+", l: "Pays représentés" },
            { n: "Top 10", l: "Universités nationales" },
          ].map(({ n, l }) => (
            <div key={l}>
              <div className="text-4xl font-protos font-black text-secondary">{n}</div>
              <div className="text-white/70 text-sm mt-1 font-raleway">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── BENTO GALLERY — CAMPUS ───────────────────────────── */}
      <section className="py-2 bg-background">
        <div className="grid grid-cols-12 grid-rows-[260px_260px] gap-2">
          {/* Large left */}
          <div className="col-span-5 row-span-2 relative overflow-hidden group">
            <Image src="/assets/image/home/campus/2O4A7455.webp" alt="" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
          {/* Top middle */}
          <div className="col-span-4 row-span-1 relative overflow-hidden group">
            <Image src="/assets/image/home/campus/2O4A7348.webp" alt="" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
          {/* Top right */}
          <div className="col-span-3 row-span-1 relative overflow-hidden group">
            <Image src="/assets/image/home/campus/campus1.jpg" alt="" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
          {/* Bottom middle */}
          <div className="col-span-3 row-span-1 relative overflow-hidden group">
            <Image src="/assets/image/home/star/salle1.jpg" alt="" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
          {/* Bottom right badge */}
          <div className="col-span-4 row-span-1 relative overflow-hidden group">
            <Image src="/assets/image/home/campus/2O4A7104.webp" alt="" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
        </div>
      </section>

      {/* ── IDENTITY SPLIT ───────────────────────────────────── */}
      <section className="py-24 px-6 bg-background">
        <div className="container mx-auto grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div className="order-2 lg:order-1">
            <div className="tag-primary mb-6 w-fit">✦ Notre ADN</div>
            <h2 className="text-4xl sm:text-5xl font-protos font-black text-foreground leading-tight mb-6">
              Un campus pensé pour<br />
              <span className="text-gradient-primary">l&apos;épanouissement.</span>
            </h2>
            <p className="text-muted-foreground font-raleway text-lg leading-relaxed mb-8 max-w-lg">
              Infrastructures modernes, espaces verts, résidence universitaire, laboratoires de pointe — 
              tout est conçu pour que chaque étudiant donne le meilleur de lui-même.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-10">
              {[
                { icon: Microscope, label: "Laboratoires équipés" },
                { icon: Wifi, label: "Wi-Fi 100% couverture" },
                { icon: Users, label: "Clubs & associations" },
                { icon: GraduationCap, label: "Diplômes reconnus" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-3 p-4 rounded-2xl bg-muted/50 border border-border">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm font-semibold text-foreground">{label}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <Award className="w-10 h-10 text-secondary shrink-0" />
              <div>
                <div className="font-bold text-foreground text-sm">Top 10 Universités Nationales</div>
                <div className="text-xs text-muted-foreground">Ministère de l&apos;Enseignement Supérieur 2024</div>
              </div>
            </div>
          </div>

          {/* Image stack */}
          <div className="order-1 lg:order-2 grid grid-cols-2 gap-3 h-[480px]">
            <div className="relative rounded-3xl overflow-hidden row-span-2 shadow-xl group">
              <Image src="/assets/image/home/cadre-de-trail.jpg" alt="" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="relative rounded-3xl overflow-hidden shadow-xl group">
              <Image src="/assets/image/home/star/laboratoire.jpg" alt="" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="relative rounded-3xl overflow-hidden shadow-xl group">
              <Image src="/assets/image/home/collectif.jpg" alt="" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
          </div>
        </div>
      </section>

      {/* ── VIE ÉTUDIANTE — MOSAIC ───────────────────────────── */}
      <section className="bg-muted/20 py-2">
        <div className="grid grid-cols-4 grid-rows-[300px_300px] gap-2">
          <div className="col-span-1 row-span-2 relative overflow-hidden group">
            <Image src="/assets/image/home/star/etudiant.jpg" alt="" fill className="object-cover object-top transition-transform duration-700 group-hover:scale-105" />
          </div>
          <div className="col-span-2 row-span-1 relative overflow-hidden group">
            <Image src="/assets/image/home/star/sortie.jpg" alt="" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
          <div className="col-span-1 row-span-1 relative overflow-hidden group">
            <Image src="/assets/image/home/star/motivation.jpg" alt="" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
          <div className="col-span-1 row-span-1 relative overflow-hidden group">
            <Image src="/assets/image/cite/cite1.jpg" alt="" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
          <div className="col-span-1 row-span-1 relative overflow-hidden group">
            <Image src="/assets/image/cite/cite2.jpg" alt="" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
          <div className="col-span-1 row-span-1 relative overflow-hidden group">
            <Image src="/assets/image/cite/cite3.jpg" alt="" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
        </div>
        {/* Label strip */}
        <div className="bg-white py-6 px-8 flex flex-wrap justify-center gap-6 text-sm font-semibold text-muted-foreground border-t border-border">
          {["Vie étudiante", "Cité universitaire", "Sorties & activités", "Esprit collectif"].map(t => (
            <span key={t} className="px-4 py-2 rounded-full bg-muted">{t}</span>
          ))}
        </div>
      </section>

      {/* ── MANIFESTE ÉMOTIONNEL ─────────────────────────────── */}
      {/*
          PSYCHOLOGIE : Activation d'identité + appartenance.
          Le visiteur ne voit plus un "établissement" — il voit un avenir.
          Le texte poétique crée un pic émotionnel fort mémorisé durablement.
      */}
      <section className="relative py-40 overflow-hidden bg-[#0a0f1e]">
        <Image
          src="/assets/image/home/campus/2O4A6914.webp"
          alt=""
          fill
          className="object-cover opacity-20 scale-110"
        />
        {/* Grain texture overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" />
        <div className="relative z-10 container mx-auto px-6 sm:px-12 lg:px-24 max-w-5xl">
          <div className="space-y-6">
            <p className="text-secondary font-protos text-sm tracking-[0.4em] uppercase">
              Notre engagement
            </p>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-protos font-black text-white leading-[1.1]">
              Ici, on ne vous donne pas
              <br />
              <span className="text-secondary italic">seulement un diplôme.</span>
            </h2>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-protos font-black text-white/30 leading-[1.1]">
              On vous donne les armes
              <br />
              pour conquérir le monde.
            </h2>
          </div>
          <div className="mt-16 flex items-start gap-8 border-t border-white/10 pt-10">
            <div className="text-5xl font-protos font-black text-secondary/40 leading-none select-none">"</div>
            <div>
              <p className="text-white/60 font-raleway text-lg leading-relaxed max-w-2xl italic">
                L'UPB m'a appris à penser grand, à travailler dur et à ne jamais douter de mon potentiel. 
                Aujourd'hui ingénieur, je dois tout à ces années à Bingerville.
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden relative">
                  <Image src="/assets/image/home/star/etudiant.jpg" alt="" fill className="object-cover object-top" />
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">Kouadio Ange</div>
                  <div className="text-white/40 text-xs">Promo 2023 · Ingénieur Informatique</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ILS ONT RÉUSSI ICI ───────────────────────────────── */}
      {/*
          PSYCHOLOGIE : Preuve sociale + identité aspirationnelle.
          Le visiteur projette sa propre réussite future en voyant celle des autres.
          Principe de Cialdini — "des gens comme moi ont réussi ici, je peux aussi".
          + FOMO : "Il ne faut pas rater ça".
      */}
      <section className="py-24 px-6 bg-background overflow-hidden">
        <div className="container mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
            <div>
              <div className="tag-gold mb-4 w-fit">✦ Parcours inspirants</div>
              <h2 className="text-3xl sm:text-4xl font-protos font-black text-foreground leading-tight">
                Ils ont commencé ici.<br />
                <span className="text-gradient-primary">Ils ont changé le monde.</span>
              </h2>
            </div>
            <p className="text-muted-foreground font-raleway text-base max-w-xs sm:text-right">
              65% de nos diplômés décrochent un emploi dans les 6 mois suivant leur sortie.
            </p>
          </div>

          {/* Cards grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                img: "/assets/image/home/star/motivation.jpg",
                name: "Adjoua Marie",
                promo: "Promo 2022",
                role: "Chef de projet — MTN Côte d'Ivoire",
                quote: "L'UPB m'a formée à relever n'importe quel défi professionnel.",
                field: "Management",
              },
              {
                img: "/assets/image/home/star/image.jpg",
                name: "Koné Ibrahim",
                promo: "Promo 2023",
                role: "Développeur Full-Stack — Orange CI",
                quote: "Du campus au monde professionnel en moins d'un an. Incroyable.",
                field: "Informatique",
              },
              {
                img: "/assets/image/home/star/images.jpg",
                name: "Yao Christelle",
                promo: "Promo 2021",
                role: "Auditrice — Deloitte Abidjan",
                quote: "Une formation rigoureuse qui m'a ouvert les portes des Big 4.",
                field: "Finance & Audit",
              },
            ].map(({ img, name, promo, role, quote, field }) => (
              <div
                key={name}
                className="group relative rounded-3xl overflow-hidden shadow-lg cursor-default"
              >
                {/* Image */}
                <div className="relative h-72">
                  <Image
                    src={img}
                    alt={name}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent" />
                </div>
                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="inline-block px-3 py-1 rounded-full bg-secondary/90 text-white text-xs font-bold mb-3">
                    {field}
                  </span>
                  <p className="text-white/70 font-raleway text-sm italic mb-3 leading-snug">
                    &ldquo;{quote}&rdquo;
                  </p>
                  <div className="border-t border-white/20 pt-3">
                    <div className="font-protos font-bold text-white">{name}</div>
                    <div className="text-white/50 text-xs">{promo} · {role}</div>
                  </div>
                </div>
                {/* Hover accent */}
                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-secondary opacity-0 group-hover:opacity-100 transition-opacity shadow-lg shadow-secondary/50" />
              </div>
            ))}
          </div>

          {/* Bottom social proof bar */}
          <div className="mt-12 rounded-3xl bg-linear-to-br from-primary/5 to-secondary/5 border border-border p-8 grid sm:grid-cols-3 gap-8 text-center">
            {[
              { n: "65%", l: "En emploi sous 6 mois" },
              { n: "3 000+", l: "Diplômés actifs" },
              { n: "120+", l: "Entreprises partenaires" },
            ].map(({ n, l }) => (
              <div key={l}>
                <div className="text-3xl font-protos font-black text-primary">{n}</div>
                <div className="text-muted-foreground text-sm mt-1 font-raleway">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REMISES DE DIPLÔMES ──────────────────────────────── */}
      <section className="py-24 px-6 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <div className="tag-gold mb-4 mx-auto w-fit">✦ Remise de Diplômes</div>
            <h2 className="text-3xl sm:text-4xl font-protos font-black text-foreground">
              Chaque diplôme, une victoire.
            </h2>
          </div>
          {/* Horizontal scroll gallery */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 h-[280px]">
            {["1","2","3","4","5","6","7","9"].slice(0,4).map((n) => (
              <div key={n} className="relative rounded-2xl overflow-hidden shadow-lg group">
                <Image
                  src={`/assets/image/diplome/${n}.jpg`}
                  alt=""
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 h-[280px] mt-3">
            {["5","6","7","9"].map((n) => (
              <div key={n} className="relative rounded-2xl overflow-hidden shadow-lg group">
                <Image
                  src={`/assets/image/diplome/${n}.jpg`}
                  alt=""
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="relative py-32 overflow-hidden">
        <Image
          src="/assets/image/home/campus/2O4A7089.webp"
          alt=""
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-primary/80" />
        <div className="relative z-10 container mx-auto px-6 text-center text-white">
          <h2 className="text-4xl sm:text-5xl font-protos font-black mb-4">
            Votre avenir commence ici.
          </h2>
          <p className="text-white/70 font-raleway text-lg mb-10 max-w-xl mx-auto">
            Rejoignez une communauté d&apos;étudiants ambitieux et bâtissez votre carrière avec nous.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-secondary hover:bg-secondary/90 text-white rounded-full px-8"
              onClick={handleDownload}
            >
              Télécharger la brochure
            </Button>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="rounded-full px-8 border-white text-black hover:bg-white hover:text-primary">
                Nous contacter
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
