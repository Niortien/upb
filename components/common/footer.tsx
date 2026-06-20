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

const socialColors: Record<string, string> = {
  TikTok: "#010101",
  YouTube: "#FF0000",
  Facebook: "#1877F2",
  LinkedIn: "#0A66C2",
  Instagram: "#E1306C",
};

const Footer = () => {
  return (
    <footer className="bg-[#2A2A8C] text-white/80 border-t border-white/10">
      {/* Main footer grid */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-5 group w-fit">
              <div className="h-12 w-12 relative rounded-xl overflow-hidden ring-2 ring-white/10 group-hover:ring-secondary/50 transition-all duration-300">
                <Image
                  src="/assets/image/home/campus/2O4A7089.webp"
                  alt="Logo UPB"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <span className="block text-base font-protos font-bold text-white leading-tight">UPB</span>
                <span className="block text-[10px] font-semibold uppercase tracking-widest text-white/40">
                  Bingerville
                </span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-white/70 mb-6">
              L&apos;Université Polytechnique de Bingerville — former les leaders
              et innovateurs de demain en Côte d&apos;Ivoire.
            </p>
            {/* Social links */}
            <div className="flex gap-2 flex-wrap">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={s.name}
                  className="w-9 h-9 rounded-lg border border-white/20 bg-white/10 flex items-center justify-center text-white hover:bg-white/25 hover:scale-110 transition-all duration-200"
                >
                  {socialIcons[s.name]}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation column */}
          {navColumns.map((col) => (
            <div key={col.title}>
              <h4 className="text-white font-protos font-bold text-sm uppercase tracking-widest mb-5">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/70 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-flex"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact column */}
          <div>
            <h4 className="text-white font-protos font-bold text-sm uppercase tracking-widest mb-5">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                <span className="text-sm text-white/70">{SITE_CONTACT.address}</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                <span className="text-sm text-white/70">
                  {SITE_CONTACT.phone1}<br />{SITE_CONTACT.phone2}
                </span>

              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                <a href={`mailto:${SITE_CONTACT.email}`} className="text-sm text-white/70 hover:text-white transition-colors">
                  {SITE_CONTACT.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                <span className="text-sm text-white/70">{SITE_CONTACT.hours}</span>
              </li>
            </ul>
          </div>

          {/* WhatsApp CTA column */}
          <div>
            <h4 className="text-white font-protos font-bold text-sm uppercase tracking-widest mb-5">
              Candidature
            </h4>
            <p className="text-sm text-white/70 mb-5 leading-relaxed">
              Prêt à rejoindre l&apos;UPB ? Contactez-nous directement sur WhatsApp pour
              toute question sur les admissions.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-white transition-all duration-300 hover:scale-105 hover:opacity-90"
              style={{ background: "#25D366" }}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Écrire sur WhatsApp
            </a>

            <div className="mt-6 p-4 rounded-2xl border border-white/20 bg-white/10">
              <p className="text-xs text-white/60 uppercase tracking-wider font-bold mb-2">
                Formulaire d&apos;admission
              </p>
              <Link
                href="/contact"
                className="text-sm text-secondary hover:text-secondary/80 transition-colors font-semibold"
              >
                Déposer une demande →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/15">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/60">
            © {new Date().getFullYear()} Université Polytechnique de Bingerville — Tous droits réservés
          </p>
          <div className="flex items-center gap-4 text-xs text-white/60">
            <span>Bingerville, Côte d&apos;Ivoire</span>
            <span>·</span>
            <span className="text-secondary">Excellence · Innovation · Avenir</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
