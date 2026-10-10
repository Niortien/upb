"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, MessageCircle, X } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/constants";

const liens = [
  { to: "/", label: "Accueil" },
  { to: "/formation", label: "Formations" },
  { to: "/clubs", label: "Clubs" },
  { to: "/carriere", label: "Carrière" },
  { to: "/about", label: "À propos" },
  { to: "/blog", label: "Actualités" },
  { to: "/contact", label: "Contact" },
];

const Navigation = () => {
  const [ouvert, setOuvert] = useState(false);
  const [defile, setDefile] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setDefile(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Le menu mobile couvre l'écran : on bloque le défilement derrière lui et Échap le ferme.
  useEffect(() => {
    document.body.style.overflow = ouvert ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOuvert(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [ouvert]);


  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300 ${
        defile || ouvert ? "bg-craie/95 shadow-[0_1px_0_var(--upb-trait)] backdrop-blur-md" : "bg-craie"
      }`}
    >
      <nav aria-label="Navigation principale" className="container mx-auto flex h-20 items-center justify-between px-5 sm:px-6 lg:px-8">
        <Link href="/" aria-label="Université Polytechnique de Bingerville, accueil" className="flex items-center gap-3">
          <Image
            src="/assets/image/home/campus/2O4A7089.webp"
            alt="Logo UPB"
            width={120}
            height={120}
            className="h-14 w-14 rounded-xl object-cover"
          />
          <span className="hidden leading-tight sm:block">
            <span className="titre-upb block text-lg text-indigo">UPB</span>
            <span className="block text-[11px] font-semibold tracking-wide text-encre-douce">Université Polytechnique de Bingerville</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {liens.map((l) => {
            const actif = pathname === l.to || (l.to !== "/" && pathname.startsWith(l.to));
            return (
              <li key={l.to}>
                <Link
                  href={l.to}
                  aria-current={actif ? "page" : undefined}
                  className={`group relative inline-flex h-11 items-center px-3.5 text-[15px] font-semibold transition-colors duration-200 ${
                    actif ? "text-indigo" : "text-encre-douce hover:text-indigo"
                  }`}
                >
                  {l.label}
                  <span
                    aria-hidden
                    className={`absolute inset-x-3.5 bottom-1.5 h-[3px] origin-left rounded-full bg-laurier transition-transform duration-300 ease-arrivee ${
                      actif ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden h-11 items-center gap-2 rounded-full bg-laurier px-5 text-sm font-bold text-nuit transition-colors duration-200 hover:bg-laurier-fonce sm:inline-flex"
          >
            <MessageCircle className="h-4 w-4" aria-hidden />
            WhatsApp
          </a>
          <button
            type="button"
            onClick={() => setOuvert((o) => !o)}
            aria-expanded={ouvert}
            aria-controls="menu-mobile"
            aria-label={ouvert ? "Fermer le menu" : "Ouvrir le menu"}
            className="flex h-11 w-11 items-center justify-center rounded-full text-indigo transition-colors hover:bg-indigo/10 lg:hidden"
          >
            {ouvert ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Menu mobile : se déroule du haut ; les entrées arrivent l'une après l'autre. Sans mouvement : simple apparition. */}
      <div
        id="menu-mobile"
        aria-hidden={!ouvert}
        inert={!ouvert}
        className={`fixed inset-x-0 bottom-0 top-20 overflow-y-auto bg-indigo-deep px-6 pb-10 pt-8 transition-[clip-path,opacity] duration-500 ease-arrivee motion-reduce:transition-opacity lg:hidden ${
          ouvert ? "[clip-path:inset(0_0_0%_0)] opacity-100" : "pointer-events-none [clip-path:inset(0_0_100%_0)] opacity-0"
        }`}
      >
        <ul className="space-y-1">
          {liens.map((l, i) => (
            <li
              key={l.to}
              style={{ transitionDelay: ouvert ? `${120 + i * 50}ms` : "0ms" }}
              className={`transition-[opacity,transform] duration-500 ease-arrivee motion-reduce:translate-y-0 ${
                ouvert ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
            >
              <Link
                href={l.to}
                onClick={() => setOuvert(false)}
                aria-current={pathname === l.to ? "page" : undefined}
                className={`titre-upb flex min-h-14 items-center justify-between border-b border-white/10 text-[1.9rem] ${
                  pathname === l.to ? "text-laurier" : "text-white"
                }`}
              >
                {l.label}
                <ArrowUpRight className="h-6 w-6 opacity-50" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex h-13 w-full items-center justify-center gap-2 rounded-full bg-laurier font-bold text-nuit"
        >
          <MessageCircle className="h-5 w-5" aria-hidden />
          Écrire sur WhatsApp
        </a>
      </div>
    </header>
  );
};

export default Navigation;
