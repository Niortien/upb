"use client";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { useState } from "react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
 
  const navLinks = [
    { to: "/", label: "Accueil" },
    { to: "/formation", label: "Formations" },
    { to: "/about", label: "Qui sommes-nous" },
    { to: "/blog", label: "Actualités" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="h-20 w-20 relative">
              <Image
                src={"/assets/image/home/campus/2O4A7089.webp"}
                className="w-full h-full"
                alt="logo"
                width={200}
                height={200}
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                href={link.to}
                className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
              >
                {link.label}
              </Link>
            ))}

            <Button
              size="lg"
              className="bg-secondary hover:bg-secondary/90 rounded-full px-10"
            >
              <Link href="https://wa.me/+2250769291965?text=Bonjour%2C%20je%20souhaite%20avoir%20plus%20d'informations">
                {" "}
                Ecrivez-nous sur whatsaap{" "}
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-6 animate-fade-in">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  href={link.to}
                  className="text-foreground hover:text-primary transition-colors duration-200 font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
             <Button
              size="lg"
              className="bg-secondary hover:bg-secondary/90 rounded-full px-10"
            >
              <Link href="https://wa.me/+2250769291965?text=Bonjour%2C%20je%20souhaite%20avoir%20plus%20d'informations">
                {" "}
                Ecrivez-nous sur whatsaap{" "}
              </Link>
            </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
