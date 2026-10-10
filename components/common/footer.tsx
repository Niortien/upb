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
    <footer className="bg-nuit text-white">
      <div className="container mx-auto px-5 pb-10 pt-20 sm:px-6 lg:px-8 lg:pt-24">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_0.7fr_1fr_1fr] lg:gap-14">
          <div>
            <Link href="/" className="inline-flex items-center gap-4" aria-label="Université Polytechnique de Bingerville, accueil">
              <Image src="/assets/image/home/campus/2O4A7089.webp" alt="Logo UPB" width={120} height={120} className="h-16 w-16 rounded-xl object-cover" />
              <span className="titre-upb max-w-[14ch] text-2xl leading-tight">Université Polytechnique de Bingerville</span>
            </Link>
            <p className="mt-6 max-w-[40ch] leading-relaxed text-white/75">
              Former les leaders et les innovateurs de demain en Côte d&apos;Ivoire.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {SOCIAL_LINKS.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white transition-colors duration-200 hover:border-laurier hover:bg-laurier hover:text-nuit"
                  >
                    {socialIcons[s.name]}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {navColumns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="text-sm font-bold text-laurier">{col.title}</h2>
              <ul className="mt-4 space-y-1">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="inline-flex min-h-11 items-center text-white/80 transition-colors duration-200 hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h2 className="text-sm font-bold text-laurier">Contact</h2>
            <ul className="mt-4 space-y-3.5 text-white/80">
              <li className="flex items-start gap-3">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-laurier" aria-hidden />
                {SITE_CONTACT.address}
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-1 h-4 w-4 shrink-0 text-laurier" aria-hidden />
                <span className="flex flex-col">
                  <a href={`tel:${SITE_CONTACT.phone1.replace(/\s/g, "")}`} className="inline-flex min-h-11 items-center hover:text-white">{SITE_CONTACT.phone1}</a>
                  <a href={`tel:${SITE_CONTACT.phone2.replace(/\s/g, "")}`} className="inline-flex min-h-11 items-center hover:text-white">{SITE_CONTACT.phone2}</a>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-1 h-4 w-4 shrink-0 text-laurier" aria-hidden />
                <a href={`mailto:${SITE_CONTACT.email}`} className="inline-flex min-h-11 items-center hover:text-white">{SITE_CONTACT.email}</a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-1 h-4 w-4 shrink-0 text-laurier" aria-hidden />
                {SITE_CONTACT.hours}
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-bold text-laurier">Candidature</h2>
            <p className="mt-4 leading-relaxed text-white/80">
              Prêt à rejoindre l&apos;UPB ? Écrivez-nous sur WhatsApp pour toute question sur les admissions.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex h-12 items-center gap-2 rounded-full bg-laurier px-6 font-bold text-nuit transition-colors duration-200 hover:bg-laurier-fonce"
            >
              Écrire sur WhatsApp
            </a>
            <p className="mt-4">
              <Link href="/contact" className="lien-souligne inline-flex min-h-11 items-center font-semibold text-white">
                Ou déposer une demande d&apos;admission
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-white/15 pt-6 text-sm text-white/65 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Université Polytechnique de Bingerville. Tous droits réservés.</p>
          <p>Bingerville, Côte d&apos;Ivoire</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
