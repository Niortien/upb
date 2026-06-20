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
    color: "bg-blue-50 text-blue-700 border-blue-100",
    iconBg: "bg-blue-100",
  },
  {
    icon: Users,
    title: "Vie Associative",
    description: "Plus de 10 clubs actifs couvrant divers intérêts professionnels",
    stat: "10+ Clubs",
    color: "bg-violet-50 text-violet-700 border-violet-100",
    iconBg: "bg-violet-100",
  },
  {
    icon: Laptop,
    title: "Ordinateurs Offerts",
    description: "Accès équitable à la technologie + Wi-Fi haut débit sur tout le campus",
    stat: "100%",
    color: "bg-emerald-50 text-emerald-700 border-emerald-100",
    iconBg: "bg-emerald-100",
  },
  {
    icon: TrendingUp,
    title: "Employabilité",
    description: "65% de nos diplômés trouvent un emploi dans les 6 premiers mois",
    stat: "65%",
    color: "bg-orange-50 text-orange-700 border-orange-100",
    iconBg: "bg-orange-100",
  },
  {
    icon: Globe,
    title: "Ouverture Internationale",
    description: "Des partenariats avec des entreprises et institutions à travers l'Afrique",
    stat: "5+ Pays",
    color: "bg-sky-50 text-sky-700 border-sky-100",
    iconBg: "bg-sky-100",
  },
  {
    icon: Heart,
    title: "Accompagnement",
    description: "Système de parrainage pour un suivi personnalisé tout au long du cursus",
    stat: "1:15",
    color: "bg-rose-50 text-rose-700 border-rose-100",
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
    <section className="py-20 bg-mesh-primary relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-secondary/8 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="tag-primary mb-6 mx-auto w-fit">
            ✦ Pourquoi nous choisir ?
          </div>
          <h2 className="text-4xl sm:text-5xl font-protos font-black text-foreground mb-6 leading-tight">
            Une université qui{" "}
            <span className="text-gradient-primary">fait la différence</span>
          </h2>
          <p className="text-lg text-muted-foreground font-raleway leading-relaxed">
            Découvrez ce qui rend notre université unique et pourquoi des
            milliers d&apos;étudiants nous font confiance chaque année.
          </p>
        </div>

        {/* Bento grid layout */}
        <div className="grid lg:grid-cols-3 gap-8 mb-10">
          {/* Large featured card — image */}
          <div className="lg:col-span-1 lg:row-span-2 relative rounded-3xl overflow-hidden shadow-2xl group min-h-[500px]">
            <Image
              src="/assets/image/home/campus/2O4A6842.webp"
              alt="Campus UPB"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-primary via-primary/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="tag-gold mb-4">Notre campus</div>
              <h3 className="text-2xl font-protos font-bold text-white leading-tight">
                Un environnement d&apos;étude conçu pour l&apos;excellence
              </h3>
              <p className="text-white/70 text-sm mt-2 font-raleway">
                Infrastructures modernes, espaces collaboratifs et bibliothèque numérique
              </p>
            </div>
          </div>

          {/* Reasons grid */}
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-5">
            {reasons.map((reason, i) => {
              const Icon = reason.icon;
              return (
                <div
                  key={i}
                  className="upb-card p-6 group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-11 h-11 rounded-2xl ${reason.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="number-stat text-2xl">{reason.stat}</span>
                  </div>
                  <h3 className="text-base font-protos font-bold text-foreground mb-2">
                    {reason.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats banner */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-linear-to-br from-primary via-primary to-[#1a237e]" />
          {/* Decorative pattern */}
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: "radial-gradient(circle at 25% 50%, white 1px, transparent 1px), radial-gradient(circle at 75% 50%, white 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-0 divide-x divide-white/10">
            {globalStats.map((s, i) => (
              <div key={i} className="text-center py-10 px-6">
                <div className="number-stat mb-2">{s.value}</div>
                <div className="text-white/70 text-sm font-semibold uppercase tracking-wider">
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
