'use client';
import { Award, BookOpen, Globe, Heart, Lightbulb, Sparkles, Target, Users } from "lucide-react";

import Image from "next/image";
import { Typewriter } from "../ui/type-writer";
import { Button } from "../ui/button";

const About = () => {
   
  const values = [
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Nous encourageons la créativité et l'innovation dans tous nos programmes académiques"
    },
    {
      icon: Heart,
      title: "Excellence",
      description: "Nous visons l'excellence académique et personnelle pour chaque étudiant"
    },
    {
      icon: Globe,
      title: "Diversité",
      description: "Nous célébrons la diversité culturelle et favorisons l'inclusion"
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Nous encourageons le travail d'équipe et les partenariats internationaux"
    }
  ];

  const stats = [
    { number: "8+", label: "Ans d'Histoire" },
    { number: "15,000+", label: "Étudiants" },
    { number: "5+", label: "Pays Représentés" },
    { number: "50+", label: "Partenaires Académiques" }
  ];

  const milestones = [
    { year: "1875", title: "Fondation", description: "Création de l'université avec une vision d'excellence académique" },
    { year: "1920", title: "Expansion internationale", description: "Premiers programmes d'échange avec des universités étrangères" },
    { year: "1985", title: "Innovation technologique", description: "Lancement du premier laboratoire d'informatique avancée" },
    { year: "2010", title: "Campus moderne", description: "Inauguration du nouveau campus éco-responsable" },
    { year: "2023", title: "Excellence reconnue", description: "Classée parmi les 50 meilleures universités mondiales" }
  ];
const handleDownload = () => {
    const link = document.createElement("a");
    link.href =
      "/assets/pdf/FICHE DE RENSEIGNEMENT UPB  2025-2026_actualisée-1.pdf"; // chemin depuis /public
    link.download = "fiche-de-renseignement-UPB.pdf";
    link.click();
  };
  return (
    <div className="min-h-screen">  
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-linear-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-6">
                <span className="text-sm font-semibold text-primary  uppercase tracking-wider font-protos">
                  <Typewriter
                               text={["Qui sommes-nous?"]}
                               loop={true}
                               speed={100}
                               className="text-2xl font-protos"
                             />
                </span>
              </div>
              <h1 className="text-5xl font-protos sm:text-6xl font-bold text-foreground mb-6">
                8 Ans d&apos;Excellence
                <span className="block text-primary font-protos mt-2">Académique</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                Depuis 2018, notre université forme les leaders et innovateurs de demain. 
                Nous combinons tradition académique et innovation pédagogique pour offrir 
                une expérience éducative incomparable.
              </p>
              <div className="flex items-center gap-4">
                <Award className="w-12 h-12 text-secondary" />
                <div>
                  <div className="font-bold text-foreground">Top 10 des universités national</div>
                  <div className="text-sm text-muted-foreground">Classement du ministères de l&apos;enseignement superieur 2024</div>
                </div>
              </div>
            </div>

            <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <Image
                src={'/assets/image/home/campus/2O4A6842.webp'}
                height={200}
                width={200}
                alt="Université d'Excellence"
                className="rounded-3xl h-72 w-96 md:w-[450px]  shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary/90">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-5xl font-bold text-secondary mb-2">{stat.number}</div>
                <div className="text-white/90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
                <Target className="w-5 h-5 text-primary" />
                <span className="text-sm font-semibold text-primary uppercase tracking-wider">Notre Mission</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
                Transformer les Esprits, Façonner l&apos;Avenir
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Notre mission est de former des penseurs critiques, des innovateurs audacieux et des citoyens 
                responsables qui contribueront positivement à la société mondiale. Nous nous engageons à offrir 
                une éducation de qualité supérieure accessible à tous les talents, indépendamment de leur origine.
              </p>
            </div>

            {/* Values Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div
                    key={index}
                    className="group p-8 bg-card rounded-2xl border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-3">{value.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 rounded-full mb-6">
              <BookOpen className="w-5 h-5 text-secondary" />
              <span className="text-sm font-semibold text-secondary uppercase tracking-wider">Notre Histoire</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Une Histoire d&apos;Excellence
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Découvrez les moments clés qui ont façonné notre université et notre engagement envers l&apos;excellence
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className="flex gap-8 items-start animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex-shrink-0 w-24 text-right">
                    <div className="inline-block px-4 py-2 bg-gradient-to-br from-primary to-secondary rounded-full">
                      <span className="font-bold text-white">{milestone.year}</span>
                    </div>
                  </div>
                  <div className="flex-1 pb-8 border-l-2 border-primary/20 pl-8 relative">
                    <div className="absolute -left-2 top-2 w-4 h-4 rounded-full bg-secondary" />
                    <div className="bg-card rounded-2xl p-6 border border-border hover:shadow-lg transition-all duration-300">
                      <h3 className="text-xl font-bold text-foreground mb-2">{milestone.title}</h3>
                      <p className="text-muted-foreground">{milestone.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary via-primary to-primary/90">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center text-white">
            <Sparkles className="w-16 h-16 mx-auto mb-6 text-secondary animate-pulse" />
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Rejoignez Notre Communauté
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Faites partie d&apos;une communauté mondiale de plus de 100,000 anciens élèves 
              qui façonnent l&apos;avenir dans tous les domaines
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
              size="sm"
              className="bg-secondary hover:bg-secondary/90 rounded-full px-6"
              onClick={handleDownload}
            >
              Télécharger notre brochure
            </Button>
             
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
