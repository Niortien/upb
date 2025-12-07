import {
  Award,
  Globe,
  Heart,
  Lightbulb,
  TrendingUp,
  Users,
} from "lucide-react";
import Image from "next/image";
import { Typewriter } from "../ui/type-writer";

const WhyChooseSection = () => {
  const reasons = [
    {
      icon: Award,
      title: "Excellence Reconnue",
      description: "Classée parmi les 50 meilleures universités de Côte d'Ivoire",
      stat: "Top 10",
    },
    {
      icon: Users,
      title: "Plusiers clubs et Associations Étudiantes",
      description: "Plus de 10 clubs actifs couvrants divers intérêts et domaines professionnels",
      stat: "2K+",
    },
    {
      icon: Globe,
      title: "Des ordinateurs gratuits pour chaque étudiant",
      description: "Garantie d'un accès égal à la technologie pour tous les étudiants,et un campus connecté via un réseau Wi-Fi haut débit",
      stat: "10+",
    },
    {
      icon: Lightbulb,
      title: "Innovation Constante",
      description: "Laboratoires de recherche à la pointe de la technologie",
      stat: "30+",
    },
    {
      icon: TrendingUp,
      title: "Employabilité",
      description: "65% de nos diplômés trouvent un emploi en 6 mois",
      stat: "65%",
    },
    {
      icon: Heart,
      title: "Accompagnement",
      description: "Suivi personnalisé tout au long de votre parcours à travers le système de parrainage ",
      stat: "1:15",
    },
  ];

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-4">
            <span className="text-sm font-protos font-semibold text-primary uppercase tracking-wider">
              
                    <Typewriter text={["Pourquoi Nous Choisir ?"]} className="text-2xl" loop speed={100} />
            </span>
          </div>
          <h2 className="text-4xl font-protos sm:text-5xl font-bold text-foreground mb-6">
            Une Université qui Fait la Différence
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Découvrez ce qui rend notre université unique et pourquoi des
            milliers d&apos;étudiants nous font confiance chaque année
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Left: Images */}
          <div className="space-y-6 animate-fade-in">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
              <Image
                src={"/assets/image/home/campus/2O4A6842.webp"}
                alt="Étudiant dans la bibliothèque"
                width={200}
                height={200}
                className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-primary/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-2xl font-protos font-bold text-white">
                  Environnement d&apos;Étude Optimal
                </h3>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
              <Image
                src={"/assets/image/home/collectif.jpg"}
                alt="Collaboration étudiante"
                width={200}
                height={200}
                className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-secondary/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-2xl font-bold font-protos  text-white">
                  Travail Collaboratif
                </h3>
              </div>
            </div>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
              <Image
                src={"/assets/image/home/cadre-de-trail.jpg"}
                alt="Collaboration étudiante"
                width={200}
                height={200}
                className="w-full h-96 object-cover bg-top transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-secondary/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-2xl font-bold font-protos  text-white">
                  Cadre de Travail Moderne
                </h3>
              </div>
            </div>
          </div>

          {/* Right: Reasons Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {reasons.map((reason, index) => {
              const Icon = reason.icon;
              return (
                <div
                  key={index}
                  className="group bg-card border border-border rounded-2xl p-6 hover:border-primary/50 hover:shadow-xl transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-2xl font-bold text-secondary">
                      {reason.stat}
                    </div>
                  </div>
                  <h3 className="text-lg font-protos font-bold text-foreground mb-2">
                    {reason.title}
                  </h3>
                  <p className="text-sm  text-muted-foreground leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Stats Banner */}
        <div className="bg-linear-to-br from-primary to-primary/90 rounded-3xl p-8 sm:p-12 shadow-2xl animate-fade-in">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl sm:text-5xl font-bold text-secondary mb-2">
                7+
              </div>
              <div className="text-white/90">Années d&apos;Excellence</div>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-bold text-secondary mb-2">
                5K+
              </div>
              <div className="text-white/90">Étudiants Actifs</div>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-bold text-secondary mb-2">
                15+
              </div>
              <div className="text-white/90">Professeurs Experts</div>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-bold text-secondary mb-2">
                5+
              </div>
              <div className="text-white/90">Pays Représentés</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
