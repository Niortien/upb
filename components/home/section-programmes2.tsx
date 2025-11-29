'use client';
import React from 'react';
import Image from 'next/image';

// Données fictives pour les programmes
const programmes = [
    {
        title: "Ingénierie Informatique",
        description: "Développement logiciel, cybersécurité, intelligence artificielle et big data.",
        icon: "/assets/icons/code.svg", // Remplacez par votre icône
        color: "bg-blue-600",
    },
    {
        title: "Génie Civil",
        description: "Conception, construction et gestion des infrastructures (bâtiments, routes, ponts).",
        icon: "/assets/icons/build.svg", // Remplacez par votre icône
        color: "bg-green-600",
    },
    {
        title: "Énergies Renouvelables",
        description: "Maîtrise de l'énergie solaire, éolienne et hydraulique pour un avenir durable.",
        icon: "/assets/icons/leaf.svg", // Remplacez par votre icône
        color: "bg-amber-600",
    },
    {
        title: "Management et Gestion",
        description: "Stratégie d'entreprise, finance, marketing digital et gestion de projet.",
        icon: "/assets/icons/chart.svg", // Remplacez par votre icône
        color: "bg-purple-600",
    },
];

/**
 * Composant pour afficher une seule carte de programme.
 * Inclut des effets de survol modernes (hover).
 */
function ProgrammeCard({ title, description, icon, color }: typeof programmes[0]) {
    return (
        <div 
            className="
                relative p-8 h-full rounded-xl shadow-lg 
                bg-white border border-gray-100 transition-all duration-300 
                transform hover:scale-[1.03] hover:shadow-2xl 
                group
            "
        >
            <div 
                className={`
                    w-16 h-16 rounded-full flex items-center justify-center mb-6
                    ${color} transition-colors duration-300
                `}
            >
                {/* Ici, utilisez une icône ou votre propre composant d'icône */}
                {/* J'utilise l'import Next/Image pour simuler une icône SVG/PNG */}
                <Image 
                    src={icon} 
                    alt={`Icône de ${title}`} 
                    width={32} 
                    height={32} 
                    className="invert"
                />
            </div>
            
            <h3 className="text-2xl font-bold mb-3 text-gray-800 transition-colors duration-300 group-hover:text-blue-600">
                {title}
            </h3>
            <p className="text-gray-600 leading-relaxed">
                {description}
            </p>

            {/* Élément de décoration au survol */}
            <span className="absolute bottom-4 right-4 text-4xl opacity-0 transition-opacity duration-300 group-hover:opacity-10">
                →
            </span>
        </div>
    );
}

/**
 * Composant principal de la section Programmes.
 * Utilise une grille responsive et un espacement généreux.
 */
function SectionProgrammes() {
    return (
        <section className="py-20 md:py-32 bg-gray-50">
            <div className="container mx-auto px-4 max-w-7xl">
                <header className="mb-16 md:mb-20 text-center max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                        Découvrez nos Programmes d&pos;Excellence
                    </h2>
                    <p className="text-xl text-gray-600">
                        Une offre de formation complète, conçue pour former les leaders technologiques et managériaux de demain.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {programmes.map((programme) => (
                        <ProgrammeCard 
                            key={programme.title} 
                            {...programme} 
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default SectionProgrammes;