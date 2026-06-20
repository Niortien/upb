import { ArrowRight, Building2, MapPin, Sparkles, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const features = [
  {
    icon: Building2,
    title: "Infrastructures Modernes",
    description: "Laboratoires, bibliothèques numériques et espaces collaboratifs de pointe",
    gradient: "from-blue-500/10 to-blue-600/5",
    iconColor: "text-blue-600",
    iconBg: "bg-blue-100",
  },
  {
    icon: Users,
    title: "Vie Étudiante Dynamique",
    description: "Plus de 10 clubs et associations pour enrichir votre parcours",
    gradient: "from-violet-500/10 to-violet-600/5",
    iconColor: "text-violet-600",
    iconBg: "bg-violet-100",
  },
  {
    icon: MapPin,
    title: "Localisation Idéale",
    description: "Situé à Bingerville, un cadre naturel accessible depuis Abidjan",
    gradient: "from-emerald-500/10 to-emerald-600/5",
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-100",
  },
  {
    icon: Sparkles,
    title: "Environnement Inspirant",
    description: "Espaces verts, architecture moderne et design contemporain",
    gradient: "from-amber-500/10 to-amber-600/5",
    iconColor: "text-amber-600",
    iconBg: "bg-amber-100",
  },
];

const galleryImages = [
  { src: "/assets/image/home/campus/2O4A6842.webp", alt: "Bâtiment principal", title: "Bâtiment Principal" },
  { src: "/assets/image/home/star/laboratoire.jpg", alt: "Laboratoires scientifiques", title: "Laboratoires" },
  { src: "/assets/image/home/star/salle1.jpg", alt: "Salles de cours", title: "Salles Modernes" },
];

const CampusSection = () => {
  return (
    <section className="py-12 bg-white relative overflow-hidden">
      <div className="section-divider absolute top-0 left-0 right-0" />
      <div className="absolute top-0 right-0 w-1/3 h-full bg-linear-to-l from-primary/3 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-8">
          <div className="max-w-xl">
            <div className="tag-primary mb-3">✦ Notre Campus</div>
            <h2 className="text-4xl sm:text-5xl font-protos font-black text-foreground leading-tight">
              Un cadre d&apos;excellence{" "}
              <span className="text-gradient-primary">au cœur de Bingerville</span>
            </h2>
          </div>
          <p className="text-base text-muted-foreground font-raleway leading-relaxed max-w-md lg:text-right">
            Découvrez un campus qui allie tradition académique et modernité, conçu pour
            inspirer et favoriser la réussite de chaque étudiant.
          </p>
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-2 lg:grid-cols-3 grid-rows-2 gap-3 mb-8 h-[400px]">
          <div className="col-span-1 row-span-2 relative rounded-2xl overflow-hidden shadow-lg group">
            <Image src={galleryImages[0].src} alt={galleryImages[0].alt} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-linear-to-t from-primary/70 via-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
              <span className="text-base font-protos font-bold text-white">{galleryImages[0].title}</span>
            </div>
          </div>
          <div className="col-span-1 relative rounded-2xl overflow-hidden shadow-lg group">
            <Image src={galleryImages[1].src} alt={galleryImages[1].alt} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-linear-to-t from-primary/70 via-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
              <span className="text-sm font-protos font-bold text-white">{galleryImages[1].title}</span>
            </div>
          </div>
          <div className="col-span-1 relative rounded-2xl overflow-hidden shadow-lg group">
            <Image src={galleryImages[2].src} alt={galleryImages[2].alt} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-linear-to-t from-primary/70 via-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
              <span className="text-sm font-protos font-bold text-white">{galleryImages[2].title}</span>
            </div>
          </div>
          {/* Stats card */}
          <div className="hidden lg:flex col-span-1 row-span-2 relative rounded-2xl overflow-hidden bg-linear-to-br from-primary to-[#1a237e] items-center justify-center p-4">
            <div className="text-center text-white">
              <div className="number-stat text-3xl mb-1">100%</div>
              <div className="text-white/80 font-semibold text-xs leading-tight">Couverture Wi-Fi sur le campus</div>
              <div className="mt-3 w-10 h-0.5 bg-secondary rounded-full mx-auto" />
              <div className="mt-3 grid grid-cols-2 gap-2">
                <div className="bg-white/10 rounded-xl p-2.5">
                  <div className="number-stat text-lg">24/7</div>
                  <div className="text-white/70 text-xs mt-0.5">Sécurité</div>
                </div>
                <div className="bg-white/10 rounded-xl p-2.5">
                  <div className="number-stat text-lg">50+</div>
                  <div className="text-white/70 text-xs mt-0.5">Salles</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} className={`upb-card p-4 bg-linear-to-br ${f.gradient} group`}>
                <div className={`w-10 h-10 ${f.iconBg} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-5 h-5 ${f.iconColor}`} />
                </div>
                <h3 className="font-protos font-bold text-foreground mb-1 text-sm">{f.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{f.description}</p>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/about" className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:gap-4 transition-all duration-300">
            Découvrir tout le campus
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <div className="section-divider absolute bottom-0 left-0 right-0" />
    </section>
  );
};

export default CampusSection;
