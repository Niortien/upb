"use client";

import { Bus, ShieldCheck } from "lucide-react";
import Image from "next/image";

const CarsSection = () => {
  const cars = [
    {
      name: "Car Universitaire Confort+",
      description:
        "Équipé de sièges rembourrés, climatisation, WIFI et prises USB. Parfait pour les longs trajets en toute tranquillité.",
      images: [
        "/assets/image/home/campus/2O4A6842.webp",
       "/assets/image/home/campus/2O4A6842.webp",
      ],
      capacity: "60 places",
      features: ["Climatisation", "WiFi", "USB", "Sièges Confort+"],
    },
    {
      name: "Bus pour toutes les communes principales d'Abidjan",
      description:
        "Bus standard assurant le transport quotidien des étudiants entre le campus et les principales communes d'Abidjan. toujours à l'heure et sécurisé.",
      images: [
        "/assets/image/home/campus/2O4A6842.webp",
       "/assets/image/home/campus/2O4A6842.webp",
      ],
      capacity: "60 places",
      features: ["Climatisation", "Sécurité renforcée", "Conduite douce"],
    },
    {
      name: "Navette Premium",
      description:
        "Navette haut de gamme avec un niveau de confort supérieur, destinée aux étudiants résidents.",
      images: [
       "/assets/image/home/campus/2O4A6842.webp",
       "/assets/image/home/campus/2O4A6842.webp",
      ],
      capacity: "30 places",
      features: ["Confort premium", "Espace jambes", "WiFi+ rapide"],
    },
  ];

  return (
    <section className="py-10 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-4">
            <span className="text-sm font-protos tracking-wider text-primary uppercase">
              Transport Étudiant
            </span>
          </div>

          <h2 className="text-4xl font-protos sm:text-5xl font-bold text-foreground mb-6">
            Nos Cars Universitaires
          </h2>

          <p className="text-lg text-muted-foreground leading-relaxed">
            Notre service de transport sécurisé et moderne assure le déplacement
            quotidien de nos étudiants depuis plusieurs zones de la ville.
          </p>
        </div>

        {/* GRID DES CARS */}
        <div className="grid lg:grid-cols-3 gap-12">
          {cars.map((car, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              {/* Images */}
              <div className="space-y-4 mb-6">
                {car.images.map((src, i) => (
                  <div
                    key={i}
                    className="relative rounded-xl overflow-hidden group shadow-lg"
                  >
                    <Image
                      src={src}
                      alt={car.name}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>

              {/* Titre */}
              <h3 className="text-xl font-bold font-protos text-foreground mb-2">
                {car.name}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {car.description}
              </p>

              {/* Infos */}
              <div className="flex items-center gap-3 text-primary mb-3">
                <Bus className="w-6 h-6" />
                <span className="font-semibold">{car.capacity}</span>
              </div>

              {/* Features */}
              <ul className="space-y-1 text-sm text-muted-foreground">
                {car.features.map((f, idx) => (
                  <li key={idx} className="flex gap-2 items-center">
                    <ShieldCheck className="w-4 h-4 text-secondary" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* FOOTER STATS */}
        <div className="mt-20 bg-linear-to-br from-primary to-secondary p-10 rounded-3xl text-white shadow-2xl">
          <div className="grid grid-cols-2 md:grid-cols-4 text-center gap-6">
            <div>
              <div className="text-4xl font-bold">12+</div>
              <p className="text-white/90">Zones desservies</p>
            </div>
            <div>
              <div className="text-4xl font-bold">3</div>
              <p className="text-white/90">Types de cars modernes</p>
            </div>
            <div>
              <div className="text-4xl font-bold">500+</div>
              <p className="text-white/90">Étudiants transportés/jour</p>
            </div>
            <div>
              <div className="text-4xl font-bold">100%</div>
              <p className="text-white/90">Sécurité garantie</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarsSection;
