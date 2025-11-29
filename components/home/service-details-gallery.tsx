'use client';
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const textFake = [
    {
        title: "un campus moderne et écologique",
        content:
            "L’Université Polytechnique de Bingerville offre un cadre d’exception, alliant infrastructures modernes et environnement verdoyant. Les étudiants évoluent dans un campus pensé pour leur épanouissement, leur confort et leur réussite académique.",
        image: "/assets/image/home/campus/2O4A6842.webp",
    },
    {
        title: "des laboratoires de pointe et une pédagogie innovante",
        content:
            "L’UPB se distingue par des équipements scientifiques de dernière génération et une pédagogogie orientée vers la pratique. Les laboratoires, ateliers et salles multimédias permettent aux étudiants de développer un véritable savoir-faire professionnel.",
        image: "/assets/image/home/campus/2O4A6914.webp",
    },
    {
        title: "une vie étudiante dynamique et inclusive",
        content:
            "Clubs, associations, compétitions sportives, événements culturels : la vie étudiante de l’UPB est riche et diversifiée. L’université encourage l’expression, la créativité et l’engagement pour former des leaders ouverts sur le monde.",
        image: "/assets/image/home/campus/2O4A7104.webp",
    },
];

function ServiceDetailsGallery() {
    const gallery = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const details = gsap.utils.toArray<HTMLElement>(".service-text-item");
            const photos = gsap.utils.toArray<HTMLElement>(".photo");

            // État initial global : toutes les photos sont cachées et mises en arrière-plan
            gsap.set(photos, { autoAlpha: 0, zIndex: 1, scale: 1.1, y: 30 });
            
            // La première photo est affichée et au premier plan pour commencer
            gsap.set(photos[0], { autoAlpha: 1, zIndex: 10, scale: 1, y: 0 });

            details.forEach((detail, index) => {
                ScrollTrigger.create({
                    trigger: detail,
                    start: "top center",
                    end: "bottom center",
                    
                    // Quand le texte entre
                    onEnter: () => {
                        // 1. On cache toutes les photos qui ne sont pas l'actuelle (pas nécessaire si on utilise zIndex et onEnter/onLeave)
                        // 2. On anime la photo actuelle
                        gsap.to(photos[index], {
                            autoAlpha: 1,
                            scale: 1,
                            y: 0,
                            zIndex: 10, // La fait passer devant
                            duration: 1.2, // Légèrement plus long pour la fluidité
                            ease: "power3.out",
                        });
                        // Animation pour cacher la photo PRÉCÉDENTE (sauf pour le premier)
                        if (index > 0) {
                             gsap.to(photos[index - 1], {
                                autoAlpha: 0,
                                zIndex: 1, // La renvoie en arrière-plan
                                duration: 0.5,
                            });
                        }
                    },

                    // Quand le texte sort par le bas (on passe au suivant, mais on remonte)
                    onLeaveBack: () => {
                         // On cache la photo actuelle et la renvoie en arrière
                         gsap.to(photos[index], {
                            autoAlpha: 0,
                            zIndex: 1,
                            scale: 1.1, // Prépare l'effet d'entrée si on redescend
                            y: 30,
                            duration: 0.5,
                        });
                        // On réaffiche la photo PRÉCÉDENTE
                        if (index > 0) {
                            gsap.to(photos[index - 1], {
                                autoAlpha: 1,
                                zIndex: 10,
                                scale: 1,
                                y: 0,
                                duration: 0.5,
                            });
                        }
                    },

                    // Quand le texte entre en remontant (on revient sur cette section)
                    onEnterBack: () => {
                        // On réaffiche la photo actuelle
                        gsap.to(photos[index], {
                            autoAlpha: 1,
                            scale: 1,
                            y: 0,
                            zIndex: 10,
                            duration: 1.2,
                            ease: "power3.out",
                        });
                        // On cache la photo SUIVANTE
                        if (index < photos.length - 1) {
                            gsap.to(photos[index + 1], {
                                autoAlpha: 0,
                                zIndex: 1,
                                duration: 0.5,
                            });
                        }
                    },
                    
                    // Quand le texte sort par le haut (on passe au précédent)
                    onLeave: () => {
                        // On cache la photo actuelle et la renvoie en arrière
                        gsap.to(photos[index], {
                            autoAlpha: 0,
                            zIndex: 1,
                            scale: 1.1, 
                            y: 30,
                            duration: 0.5,
                        });
                        // On réaffiche la photo SUIVANTE (normalement géré par le onEnter de la prochaine section, mais on le fait ici pour la propreté)
                        if (index < photos.length - 1) {
                            gsap.to(photos[index + 1], {
                                autoAlpha: 1,
                                zIndex: 10,
                                scale: 1,
                                y: 0,
                                duration: 0.5,
                            });
                        }
                    }
                });
            });
        },
        { scope: gallery }
    );

    return (
        <section ref={gallery} className="flex flex-wrap relative">
            {/* TEXTES */}
            {/* Ajout de padding vertical (py-24) pour donner de l'air aux extrémités sur mobile/desktop */}
            <div className="md:w-1/2 px-4 py-24 text-center md:text-left"> 
                {textFake.map((item, i) => (
                    <div
                        key={i}
                        // Utilisation d'une hauteur d'écran complète pour s'assurer que le trigger dure assez longtemps
                        className="service-text-item min-h-screen flex flex-col justify-center" 
                    >
                        <ServicesTextItem
                            title={item.title}
                            content={item.content}
                            image={item.image}
                        />
                    </div>
                ))}
            </div>

            {/* IMAGES (Desktop seulement) */}
            <div className="w-1/2 max-md:hidden h-screen sticky top-0 flex items-center justify-center overflow-hidden">
                <div className="relative w-full h-full flex items-center justify-center">
                    {textFake.map((item, idx) => (
                        <div
                            key={item.image + idx}
                            className="
                                photo absolute 
                                left-0 right-0 mx-auto /* Centrage horizontal fiable */
                                w-[480px] h-[420px] /* Taille fixe pour une présentation stable */
                                rounded-lg bg-cover bg-center 
                                shadow-2xl will-change-transform /* Ombre subtile et optimisation de l'animation */
                            "
                            style={{ backgroundImage: `url(${item.image})` }}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

function ServicesTextItem({
    title,
    content,
    image,
}: {
    title: string;
    content: string;
    image: string;
}) {
    return (
        // Max-w-lg pour une meilleure lisibilité sur grand écran, centré
        <div className="max-w-lg flex flex-col justify-center mx-auto py-10"> 
            {/* Image mobile : ajout d'une classe pour centrer et taille max */}
            <div className="md:hidden flex justify-center">
                <Image
                    src={image}
                    alt={title}
                    width={400} // Augmenté pour une meilleure visibilité sur mobile
                    height={220}
                    className="mb-6 rounded-lg w-full max-w-xs sm:max-w-md" 
                />
            </div>

            <h3 className="uppercase font-semibold text-3xl mb-4">{title}</h3>
            <p className="text-sm text-[#595959]">{content}</p>
			
        </div>
    );
}

export default ServiceDetailsGallery;