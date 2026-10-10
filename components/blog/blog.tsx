"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Calendar, Clock } from "lucide-react";
import { CtaFinal } from "@/components/common/cta-final";
import { PageHero } from "@/components/common/page-hero";
import { useReveal } from "@/hooks/use-reveal";
import { SOCIAL_LINKS } from "@/lib/constants";
import RemiseDesDiplomesSection from "./remise";
import VideoActualite from "./video-actualite";

const CATEGORIES = ["Tous", "Événements", "Vie Étudiante", "Sports", "Innovations", "Recherche"];

const POSTS = [
  {
    title: "Sortie Récréative — Jardin Botanique de Bingerville",
    excerpt: "Une journée détente et cohésion dans le magnifique Jardin Botanique de Bingerville pour l'ensemble des étudiants UPB.",
    image: "/assets/image/home/star/sortie.jpg",
    category: "Événements",
    date: "13 Déc 2025",
    readTime: "5 min",
    featured: true,
  },
  {
    title: "Cérémonie de Remise des Diplômes 2024",
    excerpt: "Plus de 500 étudiants ont célébré leur réussite lors d'une cérémonie mémorable.",
    image: "/assets/image/diplome/1.jpg",
    category: "Événements",
    date: "10 Mars 2024",
    readTime: "3 min",
    featured: false,
  },
  {
    title: "Laboratoires de Pointe : L'UPB s'équipe",
    excerpt: "De nouveaux équipements scientifiques de dernière génération arrivent sur le campus pour enrichir la formation pratique.",
    image: "/assets/image/home/star/laboratoire.jpg",
    category: "Innovations",
    date: "8 Mars 2024",
    readTime: "4 min",
    featured: false,
  },
  {
    title: "Festival des Cultures : 5+ Pays Représentés",
    excerpt: "Notre festival annuel a accueilli des étudiants de plusieurs pays pour célébrer la diversité culturelle.",
    image: "/assets/image/home/star/motivation.jpg",
    category: "Vie Étudiante",
    date: "5 Mars 2024",
    readTime: "3 min",
    featured: false,
  },
  {
    title: "Cohésion & Team Building",
    excerpt: "Les associations étudiantes organisent des activités de renforcement de liens pour les nouvelles promotions.",
    image: "/assets/image/home/collectif.jpg",
    category: "Vie Étudiante",
    date: "1 Mars 2024",
    readTime: "2 min",
    featured: false,
  },
  {
    title: "Campus en Images : Regard Photographique",
    excerpt: "Découvrez le campus de l'UPB à travers l'objectif de nos étudiants photographes en résidence.",
    image: "/assets/image/home/campus/2O4A7455.webp",
    category: "Recherche",
    date: "25 Fév 2024",
    readTime: "4 min",
    featured: false,
  },
];

const facebook = SOCIAL_LINKS.find((s) => s.name === "Facebook")?.url ?? "/contact";

const Blog = () => {
  const racine = useRef<HTMLDivElement>(null);
  const liste = useRef<HTMLUListElement>(null);
  const [categorie, setCategorie] = useState("Tous");
  useReveal(racine);

  const aLaUne = POSTS.find((p) => p.featured)!;
  const articles = POSTS.filter((p) => !p.featured && (categorie === "Tous" || p.category === categorie));

  useGSAP(
    () => {
      if (!liste.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(liste.current.children, { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.05, ease: "expo.out" });
    },
    { dependencies: [categorie], scope: liste }
  );

  return (
    <div ref={racine}>
      <PageHero
        variante="arche"
        lignes={["Actualités", "de l'UPB."]}
        intro="Événements, innovations, vie étudiante : tout ce qui fait vibrer notre communauté."
        image={{ src: "/assets/image/home/campus/2O4A6914.webp", alt: "Trois diplômées souriantes en toge sur le campus", position: "center 30%" }}
      />

      <section aria-labelledby="une-titre" className="bg-craie">
        <div className="container mx-auto px-5 py-14 sm:px-6 lg:px-8 lg:py-20">
          <h2 id="une-titre" className="sr-only">À la une</h2>
          <article className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div data-reveal-image className="relative mx-auto aspect-square w-full max-w-[34rem] overflow-hidden rounded-3xl bg-indigo">
              <Image src={aLaUne.image} alt={`Affiche : ${aLaUne.title}`} fill sizes="(min-width: 1024px) 36vw, 90vw" className="object-cover" />
            </div>
            <div data-reveal>
              <p className="font-bold text-laurier-fonce">À la une · {aLaUne.category}</p>
              <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-encre-douce">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" aria-hidden />
                  {aLaUne.date}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" aria-hidden />
                  {aLaUne.readTime} de lecture
                </span>
              </p>
              <h3 className="titre-upb mt-4 text-[clamp(1.9rem,3.6vw,3rem)] text-indigo">{aLaUne.title}</h3>
              <p className="mt-4 max-w-[48ch] text-lg leading-relaxed text-encre-douce">{aLaUne.excerpt}</p>
            </div>
          </article>
        </div>
      </section>

      <section aria-label="Vidéo à la une" className="bg-white">
        <div data-reveal className="container mx-auto px-5 py-14 sm:px-6 lg:px-8 lg:py-20">
          <VideoActualite src="/assets/video/master.mp4" title="Présentation du Master UPB" description="Découvrez nos formations Master et les opportunités offertes par l'UPB." />
        </div>
      </section>

      <section aria-labelledby="articles-titre" className="bg-craie">
        <div className="container mx-auto px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
          <h2 id="articles-titre" data-reveal className="titre-upb text-[clamp(2rem,4vw,3.2rem)] text-indigo">
            Tous les articles.
          </h2>

          <div role="group" aria-label="Filtrer par catégorie" className="mt-8 flex flex-wrap gap-2">
            {CATEGORIES.map((c) => {
              const actif = c === categorie;
              return (
                <button
                  key={c}
                  type="button"
                  aria-pressed={actif}
                  onClick={() => setCategorie(c)}
                  className={`min-h-11 rounded-full border px-5 text-[15px] font-bold transition-colors duration-200 ${
                    actif ? "border-indigo bg-indigo text-white" : "border-trait bg-white text-encre hover:border-indigo hover:text-indigo"
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>

          <ul ref={liste} className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((p) => (
              <li key={p.title}>
                <article className="group">
                  <div className="relative aspect-[16/11] overflow-hidden rounded-2xl bg-indigo">
                    <Image
                      src={p.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 95vw"
                      className="object-cover object-top transition-transform duration-700 ease-arrivee group-hover:scale-[1.05]"
                    />
                  </div>
                  <p className="mt-4 text-sm font-bold text-laurier-fonce">{p.category}</p>
                  <h3 className="mt-1 text-xl font-bold leading-snug text-encre">{p.title}</h3>
                  <p className="mt-2 line-clamp-3 leading-relaxed text-encre-douce">{p.excerpt}</p>
                  <p className="mt-3 flex items-center gap-4 text-sm text-encre-douce">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" aria-hidden />
                      {p.date}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" aria-hidden />
                      {p.readTime}
                    </span>
                  </p>
                </article>
              </li>
            ))}
          </ul>
          {articles.length === 0 && <p className="mt-10 text-lg text-encre-douce">Aucun article dans cette catégorie pour le moment.</p>}
        </div>
      </section>

      <RemiseDesDiplomesSection />

      <CtaFinal
        titre="Ne manquez aucune actualité UPB."
        texte="Suivez l'université sur Facebook, ou écrivez-nous pour recevoir les dernières nouvelles, événements et opportunités."
        actions={[
          { label: "Suivre l'UPB sur Facebook", href: facebook, externe: true },
          { label: "Nous écrire", href: "/contact", style: "contour" },
        ]}
      />
    </div>
  );
};

export default Blog;
