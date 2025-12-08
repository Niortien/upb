"use client";

import { Building2, Home } from "lucide-react";
import Image from "next/image";

const SchoolLifeSection = () => {
  const campusImages = [
    "/assets/image/home/star/salle1.jpg",
    "/assets/image/home/star/motivation.jpg",
    "/assets/image/home/campus/2O4A6842.webp",
   
  ];

  const residenceImages = [
    "/assets/image/cite/cite1.jpg",
  "/assets/image/cite/cite2.jpg",
    "/assets/image/cite/cite3.jpg",
  ];

  return (
    <section className="py-24 relative bg-background overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-secondary/5 pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-4">
            <span className="text-sm text-primary font-protos tracking-wider uppercase">
              La Vie sur le Campus
            </span>
          </div>
          <h2 className="text-4xl font-protos font-bold text-foreground sm:text-5xl mb-6">
            Découvrez un Environnement d’Exception
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Un campus moderne, une cité universitaire confortable, des espaces
            verdoyants et une ambiance étudiante unique. Ici, l’apprentissage
            rencontre l’inspiration.
          </p>
        </div>

        {/* CAMPUS SECTION */}
        <div className="mb-24">
          <div className="flex items-center gap-3 mb-10">
            <Building2 className="w-8 h-8 text-primary" />
            <h3 className="text-3xl font-protos font-bold">
              Le Campus Universitaire
            </h3>
          </div>

          <p className="text-muted-foreground mb-10 max-w-2xl">
            Notre campus a été conçu pour offrir un cadre propice à
            l’apprentissage, avec des infrastructures modernes : amphithéâtres,
            laboratoires informatiques, bibliothèque numérique, espaces verts,
            zones de coworking… Tout est pensé pour favoriser votre réussite.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {campusImages.map((src, index) => (
              <div
                key={index}
                className="relative rounded-2xl overflow-hidden shadow-xl group"
              >
                <Image
                  src={src}
                  alt="Campus"
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>

        {/* RESIDENCE SECTION */}
        <div className="mb-24">
          <div className="flex items-center gap-3 mb-10">
            <Home className="w-8 h-8 text-secondary" />
            <h3 className="text-3xl font-protos font-bold">
              La Cité Universitaire
            </h3>
          </div>

          <p className="text-muted-foreground mb-10 max-w-2xl">
            La cité universitaire offre confort, sécurité et proximité. Chambres
            modernes, espaces de détente, zones d’étude, restauration, sécurité
            24h/24… Tout pour créer un environnement équilibré entre vie
            étudiante et tranquillité.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {residenceImages.map((src, index) => (
              <div
                key={index}
                className="relative rounded-2xl overflow-hidden shadow-xl group"
              >
                <Image
                  src={src}
                  alt="Cité universitaire"
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>

        {/* GREEN AREA */}
      </div>
    </section>
  );
};

export default SchoolLifeSection;
