import {
  Award,
  Globe,
  Heart,
  Laptop,
  TrendingUp,
  Users,
} from "lucide-react";
import Image from "next/image";

const reasons = [
  {
    icon: Award,
    title: "Excellence Reconnue",
    description: "Classée parmi les meilleures universités de Côte d'Ivoire",
    stat: "Top 10",
    iconBg: "bg-blue-100",
  },
  {
    icon: Users,
    title: "Vie Associative",
    description: "Plus de 10 clubs actifs couvrant divers intérêts professionnels",
    stat: "10+ Clubs",
    iconBg: "bg-violet-100",
  },
  {
    icon: Laptop,
    title: "Ordinateurs Offerts",
    description: "Accès équitable à la technologie + Wi-Fi haut débit sur tout le campus",
    stat: "100%",
    iconBg: "bg-emerald-100",
  },
  {
    icon: TrendingUp,
    title: "Employabilité",
    description: "65% de nos diplômés trouvent un emploi dans les 6 premiers mois",
    stat: "65%",
    iconBg: "bg-orange-100",
  },
  {
    icon: Globe,
    title: "Ouverture Internationale",
    description: "Des partenariats avec des entreprises et institutions à travers l'Afrique",
    stat: "5+ Pays",
    iconBg: "bg-sky-100",
  },
  {
    icon: Heart,
    title: "Accompagnement",
    description: "Système de parrainage pour un suivi personnalisé tout au long du cursus",
    stat: "1:15",
    iconBg: "bg-rose-100",
  },
];

const globalStats = [
  { value: "7+", label: "Années d'Excellence" },
  { value: "5 000+", label: "Étudiants Actifs" },
  { value: "15+", label: "Professeurs Experts" },
  { value: "5+", label: "Pays Représentés" },
];

const WhyChooseSection = () => {
  return (
    <section className="py-12 bg-mesh-primary relative overflow-hidden">
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-secondary/8 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="tag-primary mb-3 mx-auto w-fit">✦ Pourquoi nous choisir ?</div>
          <h2 className="text-4xl sm:text-5xl font-protos font-black text-foreground mb-2 leading-tight">
            Une université qui{" "}
            <span className="text-gradient-primary">fait la différence</span>
          </h2>
          <p className="text-base text-muted-foreground font-raleway leading-relaxed">
            Découvrez ce qui rend notre université unique et pourquoi des
            milliers d&apos;étudiants nous font confiance chaque année.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid lg:grid-cols-3 gap-5 mb-6">
          {/* Large image card */}
          <div className="lg:col-span-1 lg:row-span-2 relative rounded-3xl overflow-hidden shadow-xl group min-h-[440px]">
            <Image
              src="/assets/image/home/campus/2O4A6842.webp"
              alt="Campus UPB"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-primary via-primary/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <div className="tag-gold mb-2">Notre campus</div>
              <h3 className="text-xl font-protos font-bold text-white leading-tight">
                Un environnement d&apos;étude conçu pour l&apos;excellence
              </h3>
              <p className="text-white/70 text-xs mt-1.5 font-raleway">
                Infrastructures modernes, espaces collaboratifs et bibliothèque numérique
              </p>
            </div>
          </div>

          {/* Reasons grid */}
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
            {reasons.map((reason, i) => {
              const Icon = reason.icon;
              return (
                <div key={i} className="upb-card p-4 group">
                  <div className="flex items-start justify-between mb-2">
                    <div className={`w-10 h-10 rounded-xl ${reason.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <span className="number-stat text-xl">{reason.stat}</span>
                  </div>
                  <h3 className="text-sm font-protos font-bold text-foreground mb-1">
                    {reason.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats banner */}
        <div className="relative rounded-2xl overflow-hidden shadow-xl">
          <div className="absolute inset-0 bg-linear-to-br from-primary via-primary to-[#1a237e]" />
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: "radial-gradient(circle at 25% 50%, white 1px, transparent 1px), radial-gradient(circle at 75% 50%, white 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-0 divide-x divide-white/10">
            {globalStats.map((s, i) => (
              <div key={i} className="text-center py-5 px-4">
                <div className="number-stat mb-1">{s.value}</div>
                <div className="text-white/70 text-xs font-semibold uppercase tracking-wider">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
