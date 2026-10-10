import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Youtube,
  Facebook,
  Linkedin,
  Instagram,
} from "lucide-react";
import { IconBrandTiktok } from "@tabler/icons-react";
import { SITE_CONTACT, SOCIAL_LINKS, WHATSAPP_URL } from "@/lib/constants";

const navColumns = [
  {
    title: "Navigation",
    links: [
      { label: "Accueil", href: "/" },
      { label: "Formations", href: "/formation" },
      { label: "Clubs", href: "/clubs" },
      { label: "Carrière", href: "/carriere" },
      { label: "À propos", href: "/about" },
      { label: "Actualités", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

const socialIcons: Record<string, React.ReactNode> = {
  TikTok: <IconBrandTiktok stroke={2} className="w-4 h-4" />,
  YouTube: <Youtube className="w-4 h-4" />,
  Facebook: <Facebook className="w-4 h-4" />,
  LinkedIn: <Linkedin className="w-4 h-4" />,
  Instagram: <Instagram className="w-4 h-4" />,
};

const Footer = () => {
  return (
    <footer className="fond-plan text-white">
      <div className="container mx-auto px-5 pb-8 pt-16 sm:px-6 lg:px-8 lg:pt-24">
        <p className="titre-pochoir text-[clamp(3.4rem,13vw,11rem)] text-white/95">
          Fabrique<br />de génie.
        </p>

        {/* Cartouche : le bloc d'identification en bas d'un plan. */}
        <div className="mt-12 grid border border-white/35 lg:grid-cols-[1.2fr_0.8fr_1.1fr_1fr]">
          <div className="border-b border-white/35 p-6 lg:border-b-0 lg:border-r">
            <p className="etiquette text-laurier">Établissement</p>
            <Link href="/" className="mt-3 flex items-center gap-4" aria-label="Université Polytechnique de Bingerville, accueil">
              <Image src="/assets/image/home/campus/2O4A7089.webp" alt="Logo UPB" width={120} height={120} className="h-14 w-14 object-cover" />
              <span className="titre-upb max-w-[12ch] text-2xl leading-none">Université Polytechnique de Bingerville</span>
            </Link>
            <ul className="mt-5 flex flex-wrap gap-2">
              {SOCIAL_LINKS.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    className="flex h-11 w-11 items-center justify-center border border-white/40 transition-colors duration-200 hover:border-laurier hover:bg-laurier hover:text-nuit"
                  >
                    {socialIcons[s.name]}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {navColumns.map((col) => (
            <nav key={col.title} aria-label={col.title} className="border-b border-white/35 p-6 lg:border-b-0 lg:border-r">
              <h2 className="etiquette text-laurier">{col.title}</h2>
              <ul className="mt-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="inline-flex min-h-11 items-center text-white/85 transition-colors duration-200 hover:text-laurier">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="border-b border-white/35 p-6 lg:border-b-0 lg:border-r">
            <h2 className="etiquette text-laurier">Contact</h2>
            <ul className="mt-3 space-y-1 text-white/85">
              <li className="flex items-start gap-3 py-2">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-laurier" aria-hidden />
                {SITE_CONTACT.address}
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-3 h-4 w-4 shrink-0 text-laurier" aria-hidden />
                <span className="flex flex-col">
                  <a href={`tel:${SITE_CONTACT.phone1.replace(/\s/g, "")}`} className="inline-flex min-h-11 items-center hover:text-laurier">{SITE_CONTACT.phone1}</a>
                  <a href={`tel:${SITE_CONTACT.phone2.replace(/\s/g, "")}`} className="inline-flex min-h-11 items-center hover:text-laurier">{SITE_CONTACT.phone2}</a>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-3 h-4 w-4 shrink-0 text-laurier" aria-hidden />
                <a href={`mailto:${SITE_CONTACT.email}`} className="inline-flex min-h-11 items-center hover:text-laurier">{SITE_CONTACT.email}</a>
              </li>
              <li className="flex items-start gap-3 py-2">
                <Clock className="mt-1 h-4 w-4 shrink-0 text-laurier" aria-hidden />
                {SITE_CONTACT.hours}
              </li>
            </ul>
          </div>

          <div className="p-6">
            <h2 className="etiquette text-laurier">Candidature</h2>
            <p className="mt-3 leading-relaxed text-white/85">
              Prêt à rejoindre l&apos;UPB ? Écrivez-nous sur WhatsApp pour toute question sur les admissions.
            </p>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-usine btn-or mt-5">
              Écrire sur WhatsApp
            </a>
            <p className="mt-3">
              <Link href="/contact" className="lien-souligne inline-flex min-h-11 items-center font-semibold text-white">
                Ou déposer une demande d&apos;admission
              </Link>
            </p>
          </div>
        </div>

        <div className="etiquette mt-6 flex flex-col gap-2 text-white/65 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Université Polytechnique de Bingerville</p>
          <p>Bingerville · 5°23′41″ N · 3°53′57″ O</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
