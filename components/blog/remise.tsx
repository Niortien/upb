"use client";

import { Building2, Home } from "lucide-react";
import Image from "next/image";

const RemiseDesDiplomesSection = () => {
  const campusImages = [
    "/assets/image/diplome/1.jpg",
    "/assets/image/diplome/2.jpg",
    "/assets/image/diplome/3.jpg",
    "/assets/image/diplome/4.jpg",
  ];

  const residenceImages = [
    "/assets/image/diplome/5.jpg",
    "/assets/image/diplome/6.jpg",
    "/assets/image/diplome/7.jpg",
    "/assets/image/diplome/2.jpg",
    "/assets/image/diplome/9.jpg",
  ];

  return (
    <section className="py-24 relative bg-background overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-secondary/5 pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-4">
            <span className="text-sm text-primary font-protos tracking-wider uppercase">
              La Remise des Diplômes de la 4ème Promotion de l&apos;UPB
            </span>
          </div>
          <h2 className="text-4xl font-protos font-bold text-foreground sm:text-5xl mb-6">
            Célébration de la Réussite et de l&apos;Excellence Académique
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Un moment mémorable où nous honorons les efforts, la détermination
            et le succès de nos étudiants diplômés.
          </p>
        </div>

        {/* CAMPUS SECTION */}
        <div className="mb-24">
          <div className="flex items-center gap-3 mb-10">
            <Building2 className="w-8 h-8 text-primary" />
            <h3 className="text-3xl font-protos font-bold"></h3>
          </div>

          <p className="text-muted-foreground mb-10 max-w-2xl">
            La cérémonie de remise des diplômes de la 4ème promotion de
            l&apos;Université Polytechnique de Bingerville (UPB) a été un
            événement empreint d&apos;émotion et de fierté. Les diplômés, leurs
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                  className="w-full h-84 object-cover transition-transform duration-700 group-hover:scale-110"
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
              Moments Inoubliables de la Cérémonie
            </h3>
          </div>

          <p className="text-muted-foreground mb-10 max-w-2xl">
            La cérémonie a été marquée par des discours inspirants, des remises
            de diplômes émouvantes et des moments de joie partagée entre les
            diplômés, leurs familles et le corps professoral.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                  className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-110"
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

export default RemiseDesDiplomesSection;
