"use client";

import { Bus, MapPin, Shield, Wifi } from "lucide-react";
import Image from "next/image";

const routes = [
  "Yopougon", "Abobo", "SantaÃ¯", "AdjamÃ©", "Cocody", "Bingerville",
];

const comfortFeatures = [
  { icon: Wifi, label: "Wi-Fi Ã  bord" },
  { icon: Shield, label: "SÃ©curisÃ©" },
  { icon: Bus, label: "60 places" },
  { icon: MapPin, label: "GPS en temps rÃ©el" },
];

const transportStats = [
  { value: "12+", label: "Zones desservies" },
  { value: "500+", label: "Ã‰tudiants/jour" },
  { value: "100%", label: "SÃ©curitÃ© garantie" },
  { value: "0 CFA", label: "Pour les rÃ©sidents" },
];

const CarsSection = () => {
  return (
    <section className="py-28 bg-white relative overflow-hidden">
      <div className="section-divider absolute top-0 left-0 right-0" />
      <div className="absolute top-0 left-0 w-1/3 h-full bg-linear-to-r from-primary/3 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="tag-primary mb-6 mx-auto w-fit">âœ¦ Transport Ã‰tudiant</div>
          <h2 className="text-4xl sm:text-5xl font-protos font-black text-foreground leading-tight mb-4">
            Vos dÃ©placements,{" "}
            <span className="text-gradient-primary">notre prioritÃ©</span>
          </h2>
          <p className="text-lg text-muted-foreground font-raleway">
            Un service de transport sÃ©curisÃ© et moderne pour nos Ã©tudiants depuis plusieurs communes d&apos;Abidjan.
          </p>
        </div>

        {/* Main content */}
        <div className="grid lg:grid-cols-2 gap-10 mb-16">
          {/* Car Confort+ */}
          <div className="upb-card overflow-hidden group">
            <div className="relative h-56 overflow-hidden rounded-t-3xl">
              <Image
                src="/assets/image/cite/car.jpg"
                alt="Car Confort+"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-primary/60 to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="tag-gold text-xs">Premium</span>
              </div>
            </div>
            <div className="p-7">
              <h3 className="text-xl font-protos font-bold text-foreground mb-2">
                Car Universitaire Confort+
              </h3>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed font-raleway">
                Ã‰quipÃ© de siÃ¨ges rembourrÃ©s, climatisation, Wi-Fi et prises USB.
                Parfait pour des trajets confortables et productifs.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {comfortFeatures.map((f, i) => {
                  const FIcon = f.icon;
                  return (
                    <div key={i} className="flex items-center gap-2 px-3 py-2.5 bg-muted rounded-xl">
                      <FIcon className="w-4 h-4 text-primary shrink-0" />
                      <span className="text-sm font-semibold text-foreground">{f.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Routes card */}
          <div className="upb-card overflow-hidden group">
            <div className="relative h-56 overflow-hidden rounded-t-3xl">
              <Image
                src="/assets/image/home/car-upb.jpg"
                alt="Bus UPB"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-primary/60 to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="tag-primary text-xs">Quotidien</span>
              </div>
            </div>
            <div className="p-7">
              <h3 className="text-xl font-protos font-bold text-foreground mb-2">
                Bus â€” Toutes les Communes
              </h3>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed font-raleway">
                Transport quotidien entre le campus et les principales communes d&apos;Abidjan.
                Toujours Ã  l&apos;heure, toujours sÃ©curisÃ©.
              </p>
              {/* Route chips */}
              <div className="flex flex-wrap gap-2">
                {routes.map((r, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/8 border border-primary/15 rounded-full"
                  >
                    <MapPin className="w-3 h-3 text-primary" />
                    <span className="text-xs font-bold text-primary">{r}</span>
                  </div>
                ))}
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-secondary/10 border border-secondary/25 rounded-full">
                  <span className="text-xs font-bold text-amber-700">+ autres</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats banner */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-linear-to-r from-primary via-primary to-[#1a237e]" />
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.1) 20px, rgba(255,255,255,0.1) 21px)",
            }}
          />
          <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10">
            {transportStats.map((s, i) => (
              <div key={i} className="text-center py-10 px-6">
                <div className="number-stat text-3xl mb-2">{s.value}</div>
                <div className="text-white/70 text-xs font-semibold uppercase tracking-wider">
                  {s.label}
                </div>
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
