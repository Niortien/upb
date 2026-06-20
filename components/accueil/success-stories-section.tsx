import { ArrowRight, Award, Globe, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const stories = [
  {
    name: "Ismaël Bakayoko",
    achievement: "Félicité d'Honneur de la République de Côte d'Ivoire",
    description:
      "Diplômé de notre programme, Ismaël a su allier rigueur académique et engagement civique pour atteindre les plus hautes distinctions nationales.",
    image:
      "/assets/image/home/star/WhatsApp Image 2025-12-07 à 09.49.40_7ef1d2e4.jpg",
    icon: Award,
    year: "Promotion 2015",
    tag: "Distinction Nationale",
    tagColor: "tag-gold",
  },
  {
    name: "Ismaël Bakayoko",
    achievement: "Félicité d'Honneur par les autorités de Bingerville",
    description:
      "Reconnu par sa commune pour son excellence académique et son impact positif sur la communauté étudiante de l'UPB.",
    image:
      "/assets/image/home/star/WhatsApp Image 2025-12-07 à 09.43.02_7cc72767.jpg",
    icon: TrendingUp,
    year: "Promotion 2018",
    tag: "Excellence Locale",
    tagColor: "tag-primary",
  },
  {
    name: "Diplômés UPB",
    achievement: "Présents dans 5+ pays d'Afrique",
    description:
      "Nos diplômés rayonnent à l'international et contribuent activement au développement économique et technologique de l'Afrique.",
    image: "/assets/image/home/campus/2O4A6842.webp",
    icon: Globe,
    year: "2015 – 2025",
    tag: "Impact Africain",
    tagColor: "tag-primary",
  },
];

const SuccessStoriesSection = () => {
  return (
    <section className="py-12 bg-mesh-primary relative overflow-hidden">
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="tag-gold mb-3 mx-auto w-fit">✦ Réussites Étudiantes</div>
          <h2 className="text-4xl sm:text-5xl font-protos font-black text-foreground leading-tight mb-2">
            Nos diplômés qui{" "}
            <span className="text-gradient-primary">changent le monde</span>
          </h2>
          <p className="text-base text-muted-foreground font-raleway">
            Des parcours d&apos;excellence qui illustrent l&apos;impact de nos formations sur la société.
          </p>
        </div>

        {/* Magazine-style layout */}
        <div className="space-y-4 mb-8">
          {stories.map((story, i) => {
            const Icon = story.icon;
            const isEven = i % 2 === 0;
            return (
              <div
                key={i}
                className={`grid lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-lg group ${
                  isEven ? "" : "direction-rtl"
                }`}
              >
                {/* Image */}
                <div className={`relative h-56 lg:h-auto ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                  <Image
                    src={story.image}
                    alt={story.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t lg:bg-linear-to-r from-[#0a0e1a]/70 via-[#0a0e1a]/20 to-transparent" />
                  <div className="absolute bottom-3 left-3 lg:hidden">
                    <span className={story.tagColor}>{story.tag}</span>
                  </div>
                </div>

                {/* Content */}
                <div className={`bg-white p-5 lg:p-7 flex flex-col justify-center ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                  <div className={`${story.tagColor} mb-2 w-fit hidden lg:flex`}>
                    {story.tag}
                  </div>

                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-secondary" />
                    </div>
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                      {story.year}
                    </span>
                  </div>

                  <h3 className="text-xl font-protos font-black text-foreground mb-1.5 leading-tight">
                    {story.name}
                  </h3>

                  <p className="text-primary font-bold text-sm mb-2">{story.achievement}</p>

                  <p className="text-muted-foreground font-raleway leading-relaxed text-sm mb-4">
                    {story.description}
                  </p>

                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:gap-4 transition-all duration-300 group/link"
                  >
                    Lire le parcours
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA block */}
        <div className="relative rounded-2xl overflow-hidden shadow-xl">
          <div className="absolute inset-0 bg-linear-to-br from-primary via-[#1a237e] to-primary" />
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 p-6 lg:p-8">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 mb-2">
                <Award className="w-6 h-6 text-secondary" />
                <span className="text-secondary font-bold text-xs uppercase tracking-widest">
                  Votre tour
                </span>
              </div>
              <h3 className="text-2xl lg:text-3xl font-protos font-black text-white mb-2">
                Prêt à écrire votre histoire ?
              </h3>
              <p className="text-white/70 font-raleway max-w-lg text-sm">
                Rejoignez une communauté d&apos;excellence et tracez votre propre chemin vers le succès.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                href="/formation"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-secondary text-foreground font-bold rounded-full hover:bg-secondary/90 hover:scale-105 transition-all duration-300 shadow-lg shadow-secondary/25 text-sm whitespace-nowrap"
              >
                Nos formations
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm text-white font-bold rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 text-sm whitespace-nowrap"
              >
                Nous contacter
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="section-divider absolute bottom-0 left-0 right-0" />
    </section>
  );
};

export default SuccessStoriesSection;
