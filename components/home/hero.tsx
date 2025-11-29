"use client"
import Image from "next/image";
import {  useEffect, useState } from "react";

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  image: string;
}

export default function Hero() {
  const slides: Slide[] = [
    {
      id: 1,
      title: "Dans le TOP 10 des Universités Privées en Côte d'Ivoire",
      subtitle: "Première Université Privée qui forme aux Technologies et Sciences du Futur",
      image: "/images/slide1.jpg",
    },
    {
      id: 2,
      title: "Une Formation d'Excellence",
      subtitle: "Un campus moderne et un corps enseignant de haut niveau",
      image: "/images/slide2.jpg",
    },
    {
      id: 3,
      title: "Innovation & Recherche",
      subtitle: "Construisez l'avenir avec les technologies d'aujourd'hui",
      image: "/assets/image/home/campus/2O4A7089.webp",
    },
  ];

  const [current, setCurrent] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative w-full h-screen overflow-hidden rounded-2xl shadow-xl">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center p-6">
            <h1 className="text-3xl md:text-5xl font-bold text-white max-w-3xl">
              {slide.title}
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mt-4 max-w-2xl">
              {slide.subtitle}
            </p>
          </div>
        </div>
      ))}

      <div className="absolute bottom-6 w-full flex justify-center gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-3 w-3 rounded-full transition-all ${
              index === current ? "bg-white scale-125" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}