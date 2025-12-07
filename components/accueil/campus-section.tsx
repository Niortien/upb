import { Building2, MapPin, Sparkles, Users } from "lucide-react";
import Image from "next/image";
import { Typewriter } from "../ui/type-writer";

const CampusSection = () => {
  const features = [
    {
      icon: Building2,
      title: "Infrastructures modernes",
      description:
        "Laboratoires de pointe, bibliothèques numériques et espaces collaboratifs",
    },
    {
      icon: Users,
      title: "Vie étudiante dynamique",
      description:
        "Plus de 100 associations et clubs pour enrichir votre parcours",
    },
    {
      icon: MapPin,
      title: "Localisation idéale",
      description: "Au cœur de la ville, accessible et connectée",
    },
    {
      icon: Sparkles,
      title: "Environnement inspirant",
      description:
        "Espaces verts, architecture historique et design contemporain",
    },
  ];

  const images = [
    {
      src: "/assets/image/home/campus/2O4A6842.webp",
      alt: "Bibliothèque universitaire moderne",
      title: "Bibliothèque",
    },
    {
      src: "/assets/image/home/campus/2O4A6842.webp",
      alt: "Campus extérieur avec étudiants",
      title: "Espaces verts",
    },
    {
      src: "/assets/image/home/star/laboratoire.jpg",
      alt: "Laboratoire scientifique",
      title: "Laboratoires",
    },
  ];

  return (
    <section className="py-10 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-4">
            <span className="text-sm font-semibold text-primary font-protos uppercase tracking-wider">
              <Typewriter
                text={["Notre Campus"]}
                className="text-2xl"
                loop
                speed={100}
              />
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-protos font-bold text-foreground mb-6">
            Un Environnement d&apos;Excellence
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed font-raleway">
            Découvrez un campus qui allie tradition académique et innovation
            moderne, conçu pour inspirer et favoriser la réussite de chaque
            étudiant.
          </p>
        </div>

        {/* Images Gallery */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {images.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                height={200}
                width={200}
                className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-white">
                    {image.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group text-center p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg animate-fade-in"
                style={{ animationDelay: `${index * 0.1 + 0.3}s` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-16"></div>
      </div>
    </section>
  );
};

export default CampusSection;
