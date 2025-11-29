"use client";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const programmes = [
  {
    title: "Informatique et Intelligence Artificielle",
    description:
      "Une formation complète couvrant la programmation, le machine learning et les systèmes intelligents pour préparer les étudiants aux métiers du futur.",
    image: "/assets/image/home/programmes/ia.webp",
  },
  {
    title: "Génie Civil et Urbanisme",
    description:
      "Développement des compétences techniques et pratiques pour concevoir et gérer des infrastructures durables et innovantes.",
    image: "/assets/image/home/programmes/civil.webp",
  },
  {
    title: "Management et Entrepreneuriat",
    description:
      "Préparation des étudiants à diriger, innover et créer des entreprises avec des approches modernes et stratégiques.",
    image: "/assets/image/home/programmes/management.webp",
  },
];

function SectionProgrammes() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>(".programme-item");
      const images = gsap.utils.toArray<HTMLElement>(".programme-photo");

      // état initial
      gsap.set(images, { autoAlpha: 0, zIndex: 0, scale: 1.05, y: 30 });
      gsap.set(images[0], { autoAlpha: 1, zIndex: 2, scale: 1, y: 0 });

      items.forEach((item, index) => {
        ScrollTrigger.create({
          trigger: item,
          start: "top center",
          end: "bottom center",
          onEnter: () => {
            gsap.set(images, { autoAlpha: 0, zIndex: 0 });
            gsap.fromTo(
              images[index],
              { autoAlpha: 0, scale: 1.05, y: 30 },
              {
                autoAlpha: 1,
                scale: 1,
                y: 0,
                zIndex: 2,
                duration: 1.5,
                ease: "power3.out",
              }
            );
          },
          onEnterBack: () => {
            gsap.set(images, { autoAlpha: 0, zIndex: 0 });
            gsap.fromTo(
              images[index],
              { autoAlpha: 0, scale: 1.05, y: 30 },
              {
                autoAlpha: 1,
                scale: 1,
                y: 0,
                zIndex: 2,
                duration: 1.5,
                ease: "power3.out",
              }
            );
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="flex flex-wrap relative px-4 md:px-8 lg:px-16 py-10">
      {/* TEXTES */}
      <div className="w-full md:w-1/2 flex flex-col gap-10">
        {programmes.map((prog, idx) => (
          <div
            key={idx}
            className="programme-item flex flex-col justify-center min-h-[50vh] md:min-h-screen"
          >
            <ProgrammeTextItem {...prog} />
          </div>
        ))}
      </div>

      {/* IMAGES */}
      <div className="w-full md:w-1/2 max-md:mt-10 h-auto md:h-screen sticky top-0 flex items-center justify-center overflow-hidden">
        <div className="relative w-full h-full flex items-center justify-center">
          {programmes.map((prog, idx) => (
            <div
              key={prog.image + idx}
              className="
                programme-photo absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                w-[90%] max-w-[500px] aspect-[16/9]
                rounded-lg bg-cover bg-center shadow-lg will-change-transform
              "
              style={{ backgroundImage: `url(${prog.image})` }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProgrammeTextItem({
  title,
  description,
  image,
}: {
  title: string;
  description: string;
  image: string;
}) {
  return (
    <div className="flex flex-col justify-center mx-auto max-w-full md:max-w-md px-2 md:px-0">
      {/* Image mobile */}
      <div className="md:hidden mb-4">
        <Image src={image} alt={title} width={400} height={220} className="rounded-lg w-full h-auto" />
      </div>

      <h3 className="uppercase font-semibold text-2xl md:text-3xl mb-4">{title}</h3>
      <p className="text-sm md:text-base text-[#595959]">{description}</p>
    </div>
  );
}

export default SectionProgrammes;
