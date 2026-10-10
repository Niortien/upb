"use client";

import { useRef } from "react";
import Image from "next/image";
import { Bus, MapPin, Shield, Wifi } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";

const communes = ["Yopougon", "Abobo", "Santaï", "Adjamé", "Cocody", "Bingerville"];

const confort = [
  { icon: Wifi, label: "Wi-Fi à bord" },
  { icon: Shield, label: "Voyage sécurisé" },
  { icon: Bus, label: "60 places" },
  { icon: MapPin, label: "GPS en temps réel" },
];

const chiffres = [
  { valeur: "12+", libelle: "zones desservies" },
  { valeur: "500+", libelle: "étudiants par jour" },
  { valeur: "0 CFA", libelle: "pour les résidents" },
];

const CarsSection = () => {
  const racine = useRef<HTMLElement>(null);
  useReveal(racine);

  return (
    <section ref={racine} aria-labelledby="transport-titre" className="bg-craie">
      <div className="container mx-auto grid gap-12 px-5 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-20 lg:px-8 lg:py-28">
        <div className="grid grid-cols-5 gap-3">
          <div data-reveal-image className="relative col-span-3 aspect-[3/4] overflow-hidden rounded-3xl bg-indigo">
            <Image src="/assets/image/cite/car.jpg" alt="Le car universitaire Confort+ garé devant le campus" fill sizes="(min-width: 1024px) 30vw, 60vw" className="object-cover" />
          </div>
          <div data-reveal-image className="relative col-span-2 mt-12 aspect-[2/3] overflow-hidden rounded-3xl bg-indigo">
            <Image src="/assets/image/home/car-upb.jpg" alt="Un bus aux couleurs de l'UPB" fill sizes="(min-width: 1024px) 20vw, 40vw" className="object-cover" />
          </div>
        </div>

        <div>
          <h2 id="transport-titre" data-reveal className="titre-upb text-[clamp(2.2rem,4.4vw,3.8rem)] text-indigo">
            Vos déplacements, notre priorité.
          </h2>
          <p data-reveal className="mt-5 max-w-[48ch] text-lg leading-relaxed text-encre-douce">
            Un service de transport sécurisé et moderne depuis plusieurs communes d&apos;Abidjan : sièges rembourrés, climatisation, Wi-Fi et prises USB, pour des trajets confortables et productifs.
          </p>

          <ul data-reveal-lignes className="mt-7 grid grid-cols-2 gap-x-6 gap-y-3">
            {confort.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-3 font-semibold text-encre">
                <Icon className="h-5 w-5 text-indigo" aria-hidden />
                {label}
              </li>
            ))}
          </ul>

          <div data-reveal className="mt-8">
            <h3 className="text-sm font-bold text-encre-douce">Communes desservies</h3>
            <p className="mt-2 text-lg font-semibold leading-relaxed text-indigo">
              {communes.join(" · ")} <span className="text-encre-douce">et d&apos;autres.</span>
            </p>
          </div>

          <dl data-reveal className="mt-9 grid grid-cols-3 border-t border-trait pt-6">
            {chiffres.map((c) => (
              <div key={c.libelle}>
                <dd className="chiffre-upb text-2xl text-indigo sm:text-3xl">{c.valeur}</dd>
                <dt className="mt-0.5 text-sm text-encre-douce">{c.libelle}</dt>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};

export default CarsSection;
