import { Button } from "@/components/ui/button";
import { BookOpen, Microscope, Briefcase, Palette, Code, Globe, ArrowRight } from "lucide-react";

const ProgramsSection = () => {
  const programs = [
    {
      icon: Microscope,
      title: "Sciences & Ingénierie",
      description: "Programmes d'excellence en recherche scientifique et innovation technologique",
      duration: "3-5 ans",
      level: "Licence, Master, Doctorat",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Briefcase,
      title: "Commerce & Management",
      description: "Formation en gestion d'entreprise, finance et entrepreneuriat",
      duration: "3-5 ans",
      level: "Licence, Master, MBA",
      color: "from-emerald-500 to-teal-500"
    },
    {
      icon: BookOpen,
      title: "Sciences Humaines",
      description: "Littérature, philosophie, histoire et sciences sociales",
      duration: "3-5 ans",
      level: "Licence, Master, Doctorat",
      color: "from-amber-500 to-orange-500"
    },
    {
      icon: Code,
      title: "Informatique & IA",
      description: "Technologies de pointe, cybersécurité et intelligence artificielle",
      duration: "3-5 ans",
      level: "Licence, Master, Doctorat",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Palette,
      title: "Arts & Design",
      description: "Création artistique, design graphique et architecture",
      duration: "3-5 ans",
      level: "Licence, Master",
      color: "from-rose-500 to-red-500"
    },
    {
      icon: Globe,
      title: "Relations Internationales",
      description: "Diplomatie, droit international et coopération mondiale",
      duration: "3-5 ans",
      level: "Licence, Master",
      color: "from-indigo-500 to-blue-500"
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-4 font-protos py-2 bg-secondary/10 rounded-full mb-4">
            <span className="text-sm font-semibold text-secondary uppercase tracking-wider font-protos">Nos Programmes</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold font-protos  text-foreground mb-6">
            Programmes Académiques d&apos;Excellence
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed font-raleway">
            Explorez notre large gamme de programmes conçus pour développer vos talents 
            et vous préparer aux défis du monde professionnel.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {programs.map((program, index) => {
            const Icon = program.icon;
            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-500 hover:shadow-2xl animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Gradient Background */}
                <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${program.color}`} />
                
                <div className="p-8">
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${program.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <Icon className="w-8 h-8" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-protos font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {program.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {program.description}
                  </p>

                  {/* Meta Info */}
                  <div className="flex flex-wrap gap-3 mb-6">
                    <span className="px-3 py-1 bg-muted rounded-full text-sm font-medium text-foreground">
                      {program.duration}
                    </span>
                    <span className="px-3 py-1 bg-primary/10 rounded-full text-sm font-medium text-primary">
                      {program.level}
                    </span>
                  </div>

                  {/* CTA */}
                  <Button 
                    variant="ghost" 
                    className="group/btn w-full justify-between hover:bg-primary/5"
                  >
                    <span>En savoir plus</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>

                {/* Hover Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${program.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`} />
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="inline-flex flex-col items-center gap-6 p-12 bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/5 rounded-3xl border border-border">
            <div>
              <h3 className="text-3xl font-bold text-foreground mb-3">
                Besoin d&apos;aide pour choisir ?
              </h3>
              <p className="text-lg text-muted-foreground">
                Nos conseillers pédagogiques sont là pour vous guider dans votre choix
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Contacter un conseiller
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="px-8 py-6 text-lg rounded-full border-2 hover:bg-muted transition-all duration-300 hover:scale-105"
              >
                Télécharger la brochure
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;
