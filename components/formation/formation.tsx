

import { Button } from "@/components/ui/button";
import { BookOpen, Clock, Users, Award, CheckCircle, ArrowRight } from "lucide-react";
import Navigation from "../common/navigation";
import ProgramsSection from "../accueil/programs-section";
import { Typewriter } from "../ui/type-writer";

const Formation = () => {
  const advantages = [
    { icon: Users, text: "Enseignants experts reconnus internationalement" },
    { icon: Clock, text: "Horaires flexibles et cours en ligne disponibles" },
    { icon: Award, text: "Diplômes reconnus mondialement" },
    { icon: BookOpen, text: "Bibliothèque numérique de 500,000+ ressources" }
  ];

  const admissionSteps = [
    { step: "1", title: "Candidature en ligne", description: "Remplissez le formulaire avec vos informations académiques" },
    { step: "2", title: "Examen d'entrée", description: "Passez nos tests d'évaluation des compétences" },
    { step: "3", title: "Entretien", description: "Rencontrez nos conseillers pédagogiques" },
    { step: "4", title: "Inscription", description: "Finalisez votre inscription et commencez votre parcours" }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-linear-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-6">
              <span className="text-sm font-semibold text-primary uppercase tracking-wider font-protos">
                 <Typewriter
                              text={["FORMATION"]}
                              loop={true}
                              speed={100}
                              className="text-2xl font-protos"
                            />
              </span>
            </div>
            <h1 className="text-5xl font-protos sm:text-6xl font-bold text-foreground mb-6">
              Trouvez Votre
              <span className="block text-primary font-protos mt-2">Formation Idéale</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Plus de 200 programmes d&apos;excellence conçus pour développer vos compétences 
              et vous préparer aux défis professionnels de demain.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90 rounded-full px-8">
                Explorer les programmes
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8 border-2">
                Télécharger la brochure
              </Button>
            </div>
          </div>

          {/* Advantages Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            {advantages.map((advantage, index) => {
              const Icon = advantage.icon;
              return (
                <div
                  key={index}
                  className="flex items-center gap-4 p-6 bg-card rounded-2xl border border-border hover:shadow-lg transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-sm font-medium text-foreground">{advantage.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <ProgramsSection />

      {/* Admission Process */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-foreground font-protos mb-6">
              Processus d&apos;Admission
            </h2>
            <p className="text-lg text-muted-foreground">
              Un processus simplifié pour rejoindre notre communauté académique d&apos;excellence
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {admissionSteps.map((item, index) => (
              <div
                key={index}
                className="relative animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {index < admissionSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-primary to-transparent -ml-8" />
                )}
                <div className="bg-card rounded-2xl p-8 border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl h-full">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-2xl font-bold mb-6 shadow-lg">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-foreground font-protos mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  <CheckCircle className="w-6 h-6 text-secondary mt-4" />
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="bg-secondary hover:bg-secondary/90 rounded-full px-10">
              Commencer ma candidature
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Formation;
