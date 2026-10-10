"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Clock, Facebook, Instagram, Linkedin, Loader2, Mail, MapPin, MessageCircle, Phone, Send, Youtube } from "lucide-react";
import { IconBrandTiktok } from "@tabler/icons-react";
import { toast } from "sonner";
import { CtaFinal } from "@/components/common/cta-final";
import { PageHero } from "@/components/common/page-hero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useReveal } from "@/hooks/use-reveal";
import { SITE_CONTACT, SOCIAL_LINKS, WHATSAPP_URL } from "@/lib/constants";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

type Erreurs = Partial<Record<keyof ContactFormData, string>>;

const VIDE: ContactFormData = { name: "", email: "", phone: "", subject: "", message: "" };
const MESSAGE_MAX = 1000;

const reseaux: Record<string, React.ReactNode> = {
  TikTok: <IconBrandTiktok stroke={2} className="h-5 w-5" />,
  YouTube: <Youtube className="h-5 w-5" />,
  Facebook: <Facebook className="h-5 w-5" />,
  LinkedIn: <Linkedin className="h-5 w-5" />,
  Instagram: <Instagram className="h-5 w-5" />,
};

/** Mêmes règles que l'API (/api/contact) : on prévient avant l'envoi, champ par champ. */
function verifier(d: ContactFormData): Erreurs {
  const e: Erreurs = {};
  if (d.name.trim().length < 2) e.name = "Indiquez votre nom (2 lettres au moins).";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email.trim())) e.email = "Cette adresse email n'est pas valide.";
  if (d.phone.replace(/\D/g, "").length < 8) e.phone = "Indiquez un numéro d'au moins 8 chiffres.";
  if (!d.subject) e.subject = "Choisissez un sujet.";
  if (d.message.trim().length < 10) e.message = "Votre message est trop court (10 caractères au moins).";
  return e;
}

const ORDRE: Array<keyof ContactFormData> = ["name", "email", "phone", "subject", "message"];

const Contact = () => {
  const racine = useRef<HTMLDivElement>(null);
  const [donnees, setDonnees] = useState<ContactFormData>(VIDE);
  const [erreurs, setErreurs] = useState<Erreurs>({});
  const [envoi, setEnvoi] = useState(false);
  useReveal(racine);

  const modifier = <T extends keyof ContactFormData>(champ: T, valeur: ContactFormData[T]) => {
    setDonnees((p) => ({ ...p, [champ]: valeur }));
    if (erreurs[champ]) setErreurs((p) => ({ ...p, [champ]: undefined }));
  };

  const soumettre = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trouvees = verifier(donnees);
    setErreurs(trouvees);
    const premiere = ORDRE.find((c) => trouvees[c]);
    if (premiere) {
      toast.error("Certains champs sont à corriger.");
      document.getElementById(premiere)?.focus();
      return;
    }
    setEnvoi(true);
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(donnees) });
      if (!res.ok) throw new Error("Erreur serveur");
      toast.success("Message envoyé ! Nous vous répondrons sous 24 h ouvrées.");
      setDonnees(VIDE);
    } catch {
      toast.error("L'envoi a échoué. Réessayez, ou écrivez-nous sur WhatsApp.");
    } finally {
      setEnvoi(false);
    }
  };

  const tel = (n: string) => `tel:${n.replace(/\s/g, "")}`;
  const champ = "h-12 rounded-xl border-trait bg-white text-base";

  return (
    <div ref={racine}>
      <PageHero lignes={["Contactez-", "nous."]} intro="Notre équipe est à votre disposition pour répondre à toutes vos questions : admission, formations, visite du campus." />

      <section className="bg-craie">
        <div className="container mx-auto grid gap-14 px-5 pb-20 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-8 lg:pb-28">
          <div>
            <h2 data-reveal className="titre-upb text-[clamp(1.8rem,3.2vw,2.6rem)] text-indigo">
              Nos coordonnées.
            </h2>
            <dl data-reveal-lignes className="mt-8 divide-y divide-trait border-y border-trait">
              <div className="flex items-start gap-4 py-5">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-indigo" aria-hidden />
                <div>
                  <dt className="text-sm font-bold text-encre-douce">Adresse</dt>
                  <dd className="text-lg font-semibold text-encre">{SITE_CONTACT.address}</dd>
                </div>
              </div>
              <div className="flex items-start gap-4 py-5">
                <Phone className="mt-1 h-5 w-5 shrink-0 text-indigo" aria-hidden />
                <div>
                  <dt className="text-sm font-bold text-encre-douce">Téléphone</dt>
                  <dd className="flex flex-col text-lg font-semibold text-encre">
                    <a href={tel(SITE_CONTACT.phone1)} className="inline-flex min-h-11 items-center hover:text-indigo">{SITE_CONTACT.phone1}</a>
                    <a href={tel(SITE_CONTACT.phone2)} className="inline-flex min-h-11 items-center hover:text-indigo">{SITE_CONTACT.phone2}</a>
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-4 py-5">
                <Mail className="mt-1 h-5 w-5 shrink-0 text-indigo" aria-hidden />
                <div>
                  <dt className="text-sm font-bold text-encre-douce">Email</dt>
                  <dd className="text-lg font-semibold text-encre">
                    <a href={`mailto:${SITE_CONTACT.email}`} className="inline-flex min-h-11 items-center hover:text-indigo">{SITE_CONTACT.email}</a>
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-4 py-5">
                <Clock className="mt-1 h-5 w-5 shrink-0 text-indigo" aria-hidden />
                <div>
                  <dt className="text-sm font-bold text-encre-douce">Horaires</dt>
                  <dd className="text-lg font-semibold text-encre">{SITE_CONTACT.hours}</dd>
                </div>
              </div>
            </dl>

            <div data-reveal className="mt-8">
              <p className="text-sm font-bold text-encre-douce">Suivez-nous</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {SOCIAL_LINKS.map((s) => (
                  <li key={s.name}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.name}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-trait bg-white text-indigo transition-colors duration-200 hover:border-indigo hover:bg-indigo hover:text-white"
                    >
                      {reseaux[s.name]}
                    </a>
                  </li>
                ))}
              </ul>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex h-13 items-center gap-2 rounded-full bg-laurier px-7 font-bold text-nuit transition-colors duration-200 hover:bg-laurier-fonce"
              >
                <MessageCircle className="h-5 w-5" aria-hidden />
                Écrire sur WhatsApp
              </a>
            </div>
          </div>

          <div data-reveal className="rounded-3xl border border-trait bg-white p-6 shadow-[0_24px_48px_-32px_rgb(20_23_74/0.4)] sm:p-9">
            <h2 className="titre-upb text-[clamp(1.6rem,2.8vw,2.2rem)] text-indigo">Envoyez-nous un message.</h2>
            <p className="mt-1 text-encre-douce">Réponse sous 24 h ouvrées. Les champs marqués * sont obligatoires.</p>

            <form onSubmit={soumettre} noValidate className="mt-7 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom complet *</Label>
                  <Input id="name" autoComplete="name" value={donnees.name} onChange={(e) => modifier("name", e.target.value)} aria-invalid={Boolean(erreurs.name)} aria-describedby={erreurs.name ? "name-err" : undefined} className={champ} placeholder="Jean Konan" />
                  {erreurs.name && <p id="name-err" role="alert" className="text-sm font-semibold text-destructive">{erreurs.name}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" type="email" autoComplete="email" value={donnees.email} onChange={(e) => modifier("email", e.target.value)} aria-invalid={Boolean(erreurs.email)} aria-describedby={erreurs.email ? "email-err" : undefined} className={champ} placeholder="jean@email.com" />
                  {erreurs.email && <p id="email-err" role="alert" className="text-sm font-semibold text-destructive">{erreurs.email}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Téléphone *</Label>
                <Input id="phone" type="tel" autoComplete="tel" inputMode="tel" value={donnees.phone} onChange={(e) => modifier("phone", e.target.value)} aria-invalid={Boolean(erreurs.phone)} aria-describedby={erreurs.phone ? "phone-err" : undefined} className={champ} placeholder="+225 07 00 00 00 00" />
                {erreurs.phone && <p id="phone-err" role="alert" className="text-sm font-semibold text-destructive">{erreurs.phone}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Sujet *</Label>
                <Select value={donnees.subject} onValueChange={(v) => modifier("subject", v)}>
                  <SelectTrigger id="subject" aria-invalid={Boolean(erreurs.subject)} aria-describedby={erreurs.subject ? "subject-err" : undefined} className={`${champ} w-full data-[size=default]:h-12`}>
                    <SelectValue placeholder="Sélectionnez un sujet" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admission">Admission</SelectItem>
                    <SelectItem value="formations">Formations</SelectItem>
                    <SelectItem value="visite">Visite du campus</SelectItem>
                    <SelectItem value="partenariats">Partenariats</SelectItem>
                    <SelectItem value="autre">Autre</SelectItem>
                  </SelectContent>
                </Select>
                {erreurs.subject && <p id="subject-err" role="alert" className="text-sm font-semibold text-destructive">{erreurs.subject}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea id="message" rows={5} maxLength={MESSAGE_MAX} value={donnees.message} onChange={(e) => modifier("message", e.target.value)} aria-invalid={Boolean(erreurs.message)} aria-describedby={erreurs.message ? "message-err" : undefined} className="resize-none rounded-xl border-trait bg-white text-base" placeholder="Décrivez votre demande…" />
                <div className="flex items-start justify-between gap-4">
                  {erreurs.message ? <p id="message-err" role="alert" className="text-sm font-semibold text-destructive">{erreurs.message}</p> : <span />}
                  <p className="shrink-0 text-sm tabular-nums text-encre-douce">
                    {donnees.message.length}/{MESSAGE_MAX}
                  </p>
                </div>
              </div>

              <Button type="submit" disabled={envoi} className="h-14 w-full rounded-full bg-indigo text-base font-bold text-white hover:bg-indigo-deep">
                {envoi ? <Loader2 className="h-5 w-5 animate-spin" aria-hidden /> : <Send className="h-5 w-5" aria-hidden />}
                {envoi ? "Envoi en cours…" : "Envoyer le message"}
              </Button>
            </form>
          </div>
        </div>
      </section>

      <section aria-label="Plan d'accès" className="bg-white">
        <div className="container mx-auto px-5 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div data-reveal className="h-96 overflow-hidden rounded-3xl border border-trait">
            <iframe
              title="Carte : Université Polytechnique de Bingerville"
              src={SITE_CONTACT.mapsEmbed}
              width="100%"
              height="100%"
              className="border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <p className="mt-4 text-encre-douce">
            Besoin d&apos;un renseignement avant de venir ?{" "}
            <Link href="/formation" className="lien-souligne inline-flex min-h-11 items-center font-semibold text-indigo">Consultez nos formations</Link>.
          </p>
        </div>
      </section>

      <CtaFinal
        titre="Prêt à rejoindre l'aventure ?"
        texte="Rejoignez une communauté de plus de 3000 étudiants et lancez votre carrière avec l'UPB."
        actions={[{ label: "Découvrir les formations", href: "/formation" }]}
      />
    </div>
  );
};

export default Contact;
