"use client";
import { Menu, MessageCircle, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { to: "/", label: "Accueil" },
    { to: "/formation", label: "Formations" },
    { to: "/clubs", label: "Clubs" },
    { to: "/carriere", label: "Carrière" },
    { to: "/about", label: "À propos" },
    { to: "/blog", label: "Actualités" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl shadow-lg shadow-primary/5 border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="h-16 w-16 relative rounded-xl overflow-hidden ring-2 ring-primary/20 group-hover:ring-primary/50 transition-all duration-300">
              <Image
                src="/assets/image/home/campus/2O4A7089.webp"
                className="w-full h-full object-cover"
                alt="Logo UPB"
                width={200}
                height={200}
              />
            </div>
            <div className="hidden sm:block">
              <span
                className={`block text-lg font-protos font-bold leading-tight transition-colors duration-300 ${
                  scrolled ? "text-primary" : "text-white"
                }`}
              >
                UPB
              </span>
              <span
                className={`block text-[10px] font-semibold uppercase tracking-widest transition-colors duration-300 ${
                  scrolled ? "text-muted-foreground" : "text-white/80"
                }`}
              >
                Bingerville
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.to;
              return (
                <Link
                  key={link.to}
                  href={link.to}
                  className={`relative px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 group ${
                    isActive
                      ? scrolled
                        ? "text-primary"
                        : "text-white"
                      : scrolled
                      ? "text-foreground/70 hover:text-primary"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-0 left-4 right-4 h-0.5 rounded-full transition-all duration-300 ${
                      isActive ? "bg-secondary" : "bg-secondary scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              );
            })}

            <Link
              href="https://wa.me/+2250769291965?text=Bonjour%2C%20je%20souhaite%20avoir%20plus%20d'informations"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 flex items-center gap-2 px-5 py-2.5 bg-secondary text-foreground text-sm font-bold rounded-full hover:bg-secondary/90 hover:scale-105 transition-all duration-300 shadow-md shadow-secondary/20"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-2.5 rounded-xl transition-all duration-200 ${
              scrolled
                ? "hover:bg-muted text-foreground"
                : "hover:bg-white/10 text-white"
            }`}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-6 border-t border-border/50 mt-2 pt-4 bg-white/98 backdrop-blur-xl rounded-2xl shadow-xl mb-2 px-2 animate-slide-up">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    href={link.to}
                    className={`flex items-center px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? "bg-primary text-white"
                        : "text-foreground hover:bg-muted hover:text-primary"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <Link
                href="https://wa.me/+2250769291965?text=Bonjour%2C%20je%20souhaite%20avoir%20plus%20d'informations"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 mt-2 px-5 py-3 bg-secondary text-foreground text-sm font-bold rounded-xl hover:bg-secondary/90 transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                <MessageCircle className="w-4 h-4" />
                Écrire sur WhatsApp
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
