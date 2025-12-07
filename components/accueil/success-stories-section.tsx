import { Button } from "@/components/ui/button";
import { Award, Briefcase, Globe, TrendingUp } from "lucide-react";
import Image from "next/image";

const SuccessStoriesSection = () => {
  const stories = [
    {
      name: "Ismaël Bakayoko",
      achievement: "Felicité d&apos;Honneur de la République de Côte d&apos;Ivoire",
      description: "Diplômée de notre programme de doctorat en 2015, Marie a révolutionné la recherche sur l'énergie quantique. Son travail a été reconnu mondialement par le Prix Nobel.",
      image: '/assets/image/home/star/WhatsApp Image 2025-12-07 à 09.49.40_7ef1d2e4.jpg',
      icon: Award,
      year: "Promotion 2015"
    },
    {
      name: "Ismael Bakayoko",
      achievement: "Felicité d&apos;Honneur par les autorités de la commune de Bingerville",
      description: "Après son Master en IA, Thomas a créé une startup valorisée à 2 milliards d'euros. Son entreprise développe des solutions d'IA pour la santé publique",
     
       image: '/assets/image/home/star/WhatsApp Image 2025-12-07 à 09.43.02_7cc72767.jpg',
      icon: TrendingUp,
      year: "Promotion 2018"
    },
    {
      name: "Fatima Al-Rashid",
      achievement: "Ambassadrice ONU pour l'Éducation",
      description: "Diplômée en Relations Internationales, Fatima œuvre pour l'éducation dans 50 pays. Elle a lancé des programmes touchant 5 millions d'enfants.",
      image: '/assets/image/home/campus/2O4A6842.webp',
      icon: Globe,
      year: "Promotion 2016"
    }
  ];

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-4 py-2 bg-secondary/10 rounded-full mb-4">
            <span className="text-sm font-semibold text-secondary uppercase tracking-wider font-protos">Réussites Étudiantes</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold font-protos text-foreground mb-6">
            Nos Diplômés qui Changent le Monde
          </h2>
          <p className="text-lg  font-raleway text-muted-foreground leading-relaxed">
            Des parcours exceptionnels qui illustrent l&apos;excellence de notre formation et l&apos;impact de nos diplômés sur la société.
          </p>
        </div>

        {/* Success Stories */}
        <div className="space-y-8">
          {stories.map((story, index) => {
            const Icon = story.icon;
            const isEven = index % 2 === 0;
            
            return (
              <div
                key={index}
                className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 items-center animate-fade-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Image */}
                <div className="w-full lg:w-1/2">
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
                    <Image
                      src={story.image}
                      alt={story.name}
                      height={200}
                      width={200}
                      className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                        <Briefcase className="w-4 h-4 text-white" />
                        <span className="text-sm font-medium text-white">{story.year}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="w-full lg:w-1/2">
                  <div className="bg-card border border-border rounded-2xl p-8 hover:shadow-xl transition-all duration-300">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary to-secondary/80 text-white mb-6 shadow-lg">
                      <Icon className="w-8 h-8" />
                    </div>
                    
                    <h3 className="text-3xl font-bold text-foreground mb-2">
                      {story.name}
                    </h3>
                    
                    <div className="inline-block px-4 py-2 bg-secondary/10 rounded-full mb-4">
                      <span className="text-sm font-semibold text-secondary">{story.achievement}</span>
                    </div>
                    
                    <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                      {story.description}
                    </p>

                    <Button 
                      variant="outline" 
                      className="group/btn border-2 hover:bg-primary/5"
                    >
                      Lire le parcours complet
                      <TrendingUp className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex flex-col items-center gap-4 p-10 bg-gradient-to-br from-primary via-primary to-primary/80 rounded-3xl shadow-2xl">
            <Award className="w-16 h-16 text-secondary animate-pulse" />
            <h3 className="text-3xl font-bold text-white">
              Prêt à Écrire Votre Histoire ?
            </h3>
            <p className="text-lg text-white/90 max-w-2xl">
              Rejoignez une communauté d&pos;excellence et tracez votre propre chemin vers le succès
            </p>
            <Button 
              size="lg" 
              className="bg-secondary hover:bg-secondary/90 text-white px-10 py-6 text-lg rounded-full shadow-xl hover:scale-105 transition-all duration-300"
            >
              Découvrir nos formations
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessStoriesSection;
