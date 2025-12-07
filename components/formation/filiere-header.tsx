"use client";

import React from "react";
import Image from "next/image";
import Navigation from "../common/navigation";

interface Programme {
  id: number;
  niveau: "licence" | "master" | "doctorat";
  title: string;
  description: string;
  img: string;
  debouche?: string[];
  contenu?: string[];
  evolution?: string[];
}

interface FiliereHeaderProps {
  programme: Programme;
}

const SectionCard = ({
  title,
  items,
}: {
  title: string;
  items: string[];
}) => (
  <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-gray-100 transition hover:shadow-md">
    <h2 className="text-xl font-semibold mb-4 text-gray-800">{title}</h2>
    <ul className="space-y-2 text-gray-600">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2">
          <span className="w-2 h-2 mt-2 rounded-full bg-blue-600"></span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

const FiliereHeader: React.FC<FiliereHeaderProps> = ({ programme }) => {
  return (
    <div className="w-full flex flex-col gap-12 mb-14">

      {/* ---------------- Hero Section ---------------- */}
      <div className="relative w-full rounded-3xl overflow-hidden shadow-lg">
        <Image
          src={programme.img}
          alt={programme.title}
          width={1400}
          height={800}
          className="w-full h-80 md:h-[60vh] lg:h-[80vh] object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/10 via-black/10 to-transparent" />

        {/* Text content */}
        <div className="absolute bottom-6 left-6 md:left-10 text-white max-w-2xl">
          <span className="text-sm uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
            {programme.niveau}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold mt-4 leading-tight">
            {programme.title}
          </h1>
        </div>
      </div>

      {/* ---------------- Description ---------------- */}
      <p className="text-lg md:text-xl text-gray-700 leading-relaxed px-2 md:px-4">
        {programme.description}
      </p>

      {/* ---------------- Sections ---------------- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-2 md:px-0">

        {programme.debouche && programme.debouche.length > 0 && (
          <SectionCard title="Débouchés" items={programme.debouche} />
        )}

        {programme.contenu && programme.contenu.length > 0 && (
          <SectionCard title="Contenu de la formation" items={programme.contenu} />
        )}

        {programme.evolution && programme.evolution.length > 0 && (
          <SectionCard title="Évolution possible" items={programme.evolution} />
        )}

      </div>
    </div>
  );
};

export default FiliereHeader;
