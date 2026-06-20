"use client";

import { Bus, MapPin, Shield, Wifi } from "lucide-react";
import Image from "next/image";

const routes = [
  "Yopougon", "Abobo", "Santaï", "Adjamé", "Cocody", "Bingerville",
];

const comfortFeatures = [
  { icon: Wifi, label: "Wi-Fi à bord" },
  { icon: Shield, label: "Sécurisé" },
  { icon: Bus, label: "60 places" },
  { icon: MapPin, label: "GPS en temps réel" },
];

const transportStats = [
  { value: "12+", label: "Zones desservies" },
  { value: "500+", label: "Étudiants/jour" },
  { value: "100%", label: "Sécurité garantie" },
  { value: "0 CFA", label: "Pour les résidents" },
];

const CarsSection = () => {
  return (
    <section className="py-12 bg-white relative overflow-hidden">
      <div className="section-divider absolute top-0 left-0 right-0" />
      <div className="absolute top-0 left-0 w-1/3 h-full bg-linear-to-r from-primary/3 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-7">
          <div className="tag-primary mb-3 mx-auto w-fit">✦ Transport Étudiant</div>
          <h2 className="text-4xl sm:text-5xl font-protos font-black text-foreground leading-tight mb-2">
            Vos déplacements,{" "}
            <span className="text-gradient-primary">notre priorité</span>
          </h2>
          <p className="text-base text-muted-foreground font-raleway">
            Un service de transport sécurisé et moderne pour nos étudiants depuis plusieurs communes d&apos;Abidjan.
          </p>
        </div>

        {/* Cards */}
        <div className="grid lg:grid-cols-2 gap-5 mb-8">
          {/* Car Confort+ */}
          <div className="upb-card overflow-hidden group">
            <div className="relative h-48 overflow-hidden rounded-t-2xl">
              <Image src="/assets/image/cite/car.jpg" alt="Car Confort+" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-linear-to-t from-primary/60 to-transparent" />
              <div className="absolute top-3 left-3">
                <span className="tag-gold text-xs">Premium</span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-base font-protos font-bold text-foreground mb-1.5">
                Car Universitaire Confort+
              </h3>
              <p className="text-xs text-muted-foreground mb-4 leading-relaxed font-raleway">
                Équipé de sièges rembourrés, climatisation, Wi-Fi et prises USB.
                Parfait pour des trajets confortables et productifs.
              </p>
              <div className="grid grid-cols-2 gap-2">
                {comfortFeatures.map((f, i) => {
                  const FIcon = f.icon;
                  return (
                    <div key={i} className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg">
                      <FIcon className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span className="text-xs font-semibold text-foreground">{f.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Routes card */}
          <div className="upb-card overflow-hidden group">
            <div className="relative h-48 overflow-hidden rounded-t-2xl">
              <Image src="/assets/image/home/car-upb.jpg" alt="Bus UPB" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-linear-to-t from-primary/60 to-transparent" />
              <div className="absolute top-3 left-3">
                <span className="tag-primary text-xs">Quotidien</span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-base font-protos font-bold text-foreground mb-1.5">
                Bus — Toutes les Communes
              </h3>
              <p className="text-xs text-muted-foreground mb-4 leading-relaxed font-raleway">
                Transport quotidien entre le campus et les principales communes d&apos;Abidjan.
                Toujours à l&apos;heure, toujours sécurisé.
              </p>
              <div className="flex flex-wrap gap-1.5">
                {routes.map((r, i) => (
                  <div key={i} className="flex items-center gap-1 px-2.5 py-1 bg-primary/8 border border-primary/15 rounded-full">
                    <MapPin className="w-2.5 h-2.5 text-primary" />
                    <span className="text-xs font-bold text-primary">{r}</span>
                  </div>
                ))}
                <div className="flex items-center gap-1 px-2.5 py-1 bg-secondary/10 border border-secondary/25 rounded-full">
                  <span className="text-xs font-bold text-amber-700">+ autres</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats banner */}
        <div className="relative rounded-2xl overflow-hidden shadow-xl">
          <div className="absolute inset-0 bg-linear-to-r from-primary via-primary to-[#1a237e]" />
          <div
            className="absolute inset-0 opacity-10"
            style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.1) 20px, rgba(255,255,255,0.1) 21px)" }}
          />
          <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10">
            {transportStats.map((s, i) => (
              <div key={i} className="text-center py-5 px-4">
                <div className="number-stat text-2xl mb-0.5">{s.value}</div>
                <div className="text-white/70 text-xs font-semibold uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="section-divider absolute bottom-0 left-0 right-0" />
    </section>
  );
};

export default CarsSection;
