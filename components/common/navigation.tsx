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
  const pathname = usePathname();

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
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/20 bg-nuit text-white">
      <nav aria-label="Navigation principale" className="container mx-auto flex h-16 items-center justify-between gap-4 px-5 sm:px-6 lg:px-8">
        <Link href="/" aria-label="Université Polytechnique de Bingerville, accueil" className="flex items-center gap-3">
          <Image src="/assets/image/home/campus/2O4A7089.webp" alt="Logo UPB" width={96} height={96} className="h-11 w-11 object-cover" />
          <span className="leading-none">
            <span className="titre-upb block text-2xl">UPB</span>
            <span className="etiquette mt-0.5 hidden text-[10px] text-white/70 sm:block">Fabrique de génie</span>
          </span>
        </Link>

        <ul className="hidden items-center lg:flex">
          {liens.map((l) => {
            const actif = pathname === l.to || (l.to !== "/" && pathname.startsWith(l.to));
            return (
              <li key={l.to}>
                <Link
                  href={l.to}
                  aria-current={actif ? "page" : undefined}
                  className={`etiquette group relative inline-flex h-16 items-center px-3.5 transition-colors duration-200 ${
                    actif ? "text-laurier" : "text-white/80 hover:text-white"
                  }`}
                >
                  <span aria-hidden className={`mr-1 transition-opacity ${actif ? "opacity-100" : "opacity-0 group-hover:opacity-60"}`}>[</span>
                  {l.label}
                  <span aria-hidden className={`ml-1 transition-opacity ${actif ? "opacity-100" : "opacity-0 group-hover:opacity-60"}`}>]</span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-usine btn-or hidden !min-h-11 !px-4 sm:inline-flex">
            <MessageCircle className="h-4 w-4" aria-hidden />
            WhatsApp
          </a>
          <button
            type="button"
            onClick={() => setOuvert((o) => !o)}
            aria-expanded={ouvert}
            aria-controls="menu-mobile"
            aria-label={ouvert ? "Fermer le menu" : "Ouvrir le menu"}
            className="flex h-11 w-11 items-center justify-center border border-white/40 transition-colors hover:bg-white/10 lg:hidden"
          >
            {ouvert ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <div
        id="menu-mobile"
        aria-hidden={!ouvert}
        inert={!ouvert}
        className={`fond-plan fixed inset-x-0 bottom-0 top-16 overflow-y-auto px-6 pb-10 pt-6 transition-[clip-path,opacity] duration-500 ease-arrivee motion-reduce:transition-opacity lg:hidden ${
          ouvert ? "[clip-path:inset(0_0_0%_0)] opacity-100" : "pointer-events-none [clip-path:inset(0_0_100%_0)] opacity-0"
        }`}
      >
        <ul>
          {liens.map((l, i) => (
            <li
              key={l.to}
              style={{ transitionDelay: ouvert ? `${120 + i * 45}ms` : "0ms" }}
              className={`transition-[opacity,transform] duration-500 ease-arrivee motion-reduce:translate-y-0 ${
                ouvert ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
            >
              <Link
                href={l.to}
                onClick={() => setOuvert(false)}
                aria-current={pathname === l.to ? "page" : undefined}
                className={`titre-upb flex min-h-16 items-center gap-4 border-b border-white/20 text-[2.4rem] ${pathname === l.to ? "text-laurier" : "text-white"}`}
              >
                <span className="etiquette w-8 text-sm text-white/60">{String(i + 1).padStart(2, "0")}</span>
                {l.label}
                <ArrowUpRight className="ml-auto h-6 w-6 opacity-50" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-usine btn-or mt-8 w-full">
          <MessageCircle className="h-5 w-5" aria-hidden />
          Écrire sur WhatsApp
        </a>
      </div>
    </header>
  );
};

export default Navigation;
