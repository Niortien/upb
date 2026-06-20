"use client";

import { useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useBackgroundCanvas } from "@/hooks/useBackgroundCanvas";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Youtube,
  Facebook,
  Linkedin,
  Instagram,
  Send,
  MessageCircle,
} from "lucide-react";
import { IconBrandTiktok } from "@tabler/icons-react";
import Link from "next/link";
import { toast } from "sonner";

gsap.registerPlugin(ScrollTrigger);

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const Contact = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const submitBtnRef = useRef<HTMLButtonElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  useBackgroundCanvas(canvasRef);

  const contactInfo = [
    {
      icon: MapPin,
      title: "Adresse",
      content: "Bingerville, Akandjé II Cité Kokoh Adjoumani",
      color: "#2f3e9e",
    },
    {
      icon: Phone,
      title: "Téléphone",
      content: "+225 0769291965 / +225 0102966292",
      color: "#f6a623",
    },
    { icon: Mail, title: "Email", content: "infos@upb.ci", color: "#2f3e9e" },
    {
      icon: Clock,
      title: "Horaires",
      content: "Lun-Ven: 8h-18h | Sam: 9h-13h",
      color: "#f6a623",
    },
  ];

  const socialLinks = [
    {
      icon: <IconBrandTiktok stroke={2} className="w-5 h-5" />,
      name: "TikTok",
      link: "https://www.tiktok.com/@upb_students/video/7528737531924352262",
      color: "#010101",
    },
    {
      icon: <Youtube className="w-5 h-5" />,
      name: "YouTube",
      link: "https://www.youtube.com/@infosupbupb810",
      color: "#FF0000",
    },
    {
      icon: <Facebook className="w-5 h-5" />,
      name: "Facebook",
      link: "https://web.facebook.com/upb.ci",
      color: "#1877F2",
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      name: "LinkedIn",
      link: "https://ci.linkedin.com/school/universit%C3%A9-polytechnique-de-bingerville/",
      color: "#0A66C2",
    },
    {
      icon: <Instagram className="w-5 h-5" />,
      name: "Instagram",
      link: "https://www.instagram.com/upbciv/",
      color: "#E1306C",
    },
  ];

  useGSAP(
    () => {
      // Progress bar
      if (progressBarRef.current) {
        gsap.set(progressBarRef.current, { scaleX: 0, transformOrigin: "left" });
        gsap.to(progressBarRef.current, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        });
      }

      // Hero title words
      const words = gsap.utils.toArray<HTMLElement>(".hero-word");
      gsap.fromTo(
        words,
        { rotateX: -90, opacity: 0, y: 40 },
        {
          rotateX: 0,
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.7)",
          delay: 0.3,
        }
      );

      // Hero subtitle + badge
      gsap.fromTo(
        ".hero-sub",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7, delay: 0.9, ease: "power3.out" }
      );

      // Contact info cards
      gsap.utils.toArray<HTMLElement>(".contact-info-card").forEach((el, i) => {
        gsap.fromTo(
          el,
          { x: -60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            delay: i * 0.1,
            scrollTrigger: { trigger: el, start: "top 85%" },
          }
        );
      });

      // Form slide in from right
      gsap.fromTo(
        ".contact-form-wrap",
        { x: 70, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-form-wrap",
            start: "top 80%",
          },
        }
      );

      // Social links bounce
      gsap.utils.toArray<HTMLElement>(".social-link").forEach((el, i) => {
        gsap.fromTo(
          el,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.45,
            ease: "back.out(2)",
            delay: i * 0.08,
            scrollTrigger: { trigger: el, start: "top 92%" },
          }
        );
      });

      // Map reveal
      gsap.fromTo(
        ".map-container",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: ".map-container", start: "top 85%" },
        }
      );

      // CTA band
      gsap.utils.toArray<HTMLElement>(".cta-word").forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            delay: i * 0.07,
            scrollTrigger: { trigger: el, start: "top 90%" },
          }
        );
      });
    },
    { scope: containerRef }
  );

  const handleBtnMouseMove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const btn = submitBtnRef.current;
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      const dx = (e.clientX - (rect.left + rect.width / 2)) * 0.35;
      const dy = (e.clientY - (rect.top + rect.height / 2)) * 0.35;
      gsap.to(btn, { x: dx, y: dy, duration: 0.3, ease: "power2.out" });
    },
    []
  );

  const handleBtnMouseLeave = useCallback(() => {
    gsap.to(submitBtnRef.current, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.5)",
    });
  }, []);

  const handleInputChange = <T extends keyof ContactFormData>(
    field: T,
    value: ContactFormData[T]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.subject ||
      !formData.message
    ) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      setIsSubmitting(false);
      return;
    }
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Erreur serveur");
      toast.success("Message envoyé avec succès ! Nous vous répondrons sous 24h.");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch {
      toast.error("Une erreur est survenue. Veuillez réessayer ou nous écrire sur WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-background overflow-x-hidden">

      {/* Canvas background */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ mixBlendMode: "multiply" }}
      />

      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 right-0 h-[3px] z-50">
        <div
          ref={progressBarRef}
          className="h-full w-full"
          style={{ background: "linear-gradient(90deg, #2f3e9e, #f6a623)" }}
        />
      </div>

      {/* ─── HERO ─── */}
      <section className="relative z-10 pt-36 pb-24 px-6 flex flex-col items-center justify-center text-center min-h-[55vh]">
        <div className="hero-sub inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 mb-8 opacity-0">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-semibold tracking-widest uppercase text-primary">
            Contact
          </span>
        </div>

        <h1
          className="text-5xl sm:text-7xl font-black font-protos leading-none mb-6 overflow-hidden"
          style={{ perspective: "800px" }}
        >
          {["Contactez-", "Nous"].map((word, i) => (
            <span
              key={i}
              className="hero-word inline-block mr-3"
              style={{ display: "inline-block" }}
            >
              {word}
            </span>
          ))}
        </h1>

        <p className="hero-sub text-lg text-muted-foreground max-w-xl opacity-0">
          Notre équipe est à votre disposition pour répondre à toutes vos
          questions
        </p>
      </section>

      {/* ─── CONTACT GRID ─── */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">

          {/* LEFT — Info + Socials + WhatsApp */}
          <div className="space-y-6">
            <p className="text-xs font-bold tracking-widest uppercase text-primary">
              Nos coordonnées
            </p>
            <h2 className="text-4xl font-black font-protos leading-tight">
              Parlons de
              <br />
              <span className="text-gradient-primary">votre projet</span>
            </h2>

            <div className="space-y-4 mt-8">
              {contactInfo.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={i}
                    className="contact-info-card flex items-start gap-4 p-5 rounded-2xl border bg-card/60 backdrop-blur-sm hover:shadow-lg transition-shadow group"
                  >
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: `${item.color}18` }}
                    >
                      <Icon
                        className="w-5 h-5"
                        style={{ color: item.color }}
                      />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-0.5">
                        {item.title}
                      </p>
                      <p className="font-semibold text-foreground">
                        {item.content}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Social links */}
            <div className="pt-4">
              <p className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-4">
                Suivez-nous
              </p>
              <div className="flex gap-3 flex-wrap">
                {socialLinks.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link w-11 h-11 rounded-xl border flex items-center justify-center bg-card/60 backdrop-blur-sm hover:scale-110 transition-transform"
                    title={item.name}
                    style={{ color: item.color }}
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* WhatsApp */}
            <Link
              href="https://wa.me/+2250769291965?text=Bonjour%2C%20je%20souhaite%20avoir%20plus%20d'informations"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 mt-2 px-8 py-4 rounded-full text-white font-bold text-sm hover:opacity-90 hover:scale-105 transition-all"
              style={{ background: "#25D366" }}
            >
              <MessageCircle className="w-5 h-5" />
              Écrire sur WhatsApp
            </Link>
          </div>

          {/* RIGHT — Form */}
          <div className="contact-form-wrap">
            <div className="rounded-3xl border bg-card/70 backdrop-blur-md p-8 shadow-2xl">
              <h3 className="text-2xl font-black font-protos mb-1">
                Envoyez-nous un message
              </h3>
              <p className="text-sm text-muted-foreground mb-8">
                Réponse sous 24h ouvrées
              </p>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom complet *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      required
                      className="h-12 rounded-xl"
                      placeholder="Jean Konan"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      required
                      className="h-12 rounded-xl"
                      placeholder="jean@email.com"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      handleInputChange("phone", e.target.value)
                    }
                    required
                    className="h-12 rounded-xl"
                    placeholder="+225 0X XX XX XX XX"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Sujet *</Label>
                  <Select
                    value={formData.subject}
                    onValueChange={(v) => handleInputChange("subject", v)}
                  >
                    <SelectTrigger className="h-12 rounded-xl">
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
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) =>
                      handleInputChange("message", e.target.value)
                    }
                    rows={5}
                    className="resize-none rounded-xl"
                    placeholder="Décrivez votre demande..."
                  />
                  <p className="text-xs text-muted-foreground text-right">
                    {formData.message.length}/1000
                  </p>
                </div>
                <button
                  ref={submitBtnRef}
                  type="submit"
                  disabled={isSubmitting}
                  onMouseMove={handleBtnMouseMove}
                  onMouseLeave={handleBtnMouseLeave}
                  className="w-full h-14 rounded-full text-white font-bold text-base flex items-center justify-center gap-3 transition-opacity disabled:opacity-60 cursor-pointer"
                  style={{
                    background:
                      "linear-gradient(135deg, #2f3e9e 0%, #f6a623 100%)",
                  }}
                >
                  {isSubmitting ? (
                    <span className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Envoyer le message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ─── MAP ─── */}
      <section className="relative z-10 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="map-container rounded-3xl overflow-hidden border shadow-2xl h-96">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3975.255930979857!2d-3.8991993!3d5.3946191!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfc18d10bfa0efe5%3A0x6552832fd69de896!2sUPB%20-%20Université%20Polytechnique%20de%20Bingerville!5e0!3m2!1sfr!2sci!4v1700000000000!5m2!1sfr!2sci"
              width="100%"
              height="100%"
              className="border-0"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* ─── CTA BAND ─── */}
      <section
        className="relative z-10 py-28 px-6 text-center"
        style={{ background: "#060b18" }}
      >
        <p className="text-xs font-bold tracking-widest uppercase text-primary mb-4">
          UPB
        </p>
        <h2 className="text-4xl sm:text-5xl font-black font-protos leading-tight mb-6 overflow-hidden">
          {["Prêt", "à", "rejoindre", "l'aventure\u00a0?"].map((word, i) => (
            <span
              key={i}
              className="cta-word inline-block mr-3 text-white"
              style={{ display: "inline-block" }}
            >
              {word}
            </span>
          ))}
        </h2>
        <p className="text-white/60 max-w-md mx-auto mb-10">
          Rejoignez une communauté de plus de 3000 étudiants et lancez votre
          carrière avec l&apos;UPB.
        </p>
        <Link
          href="/formation"
          className="inline-flex items-center gap-3 px-10 py-4 rounded-full font-bold text-white text-sm hover:opacity-90 transition-opacity"
          style={{
            background: "linear-gradient(135deg, #2f3e9e, #f6a623)",
          }}
        >
          Découvrir les formations
        </Link>
      </section>
    </div>
  );
};

export default Contact;