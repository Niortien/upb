"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
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
import { MapPin, Phone, Mail, Clock, Twitter, Facebook, Linkedin, Instagram } from "lucide-react";
import Navigation from "../common/navigation";
import { toast } from "sonner";
import { Typewriter } from "../ui/type-writer";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface ContactInfoItem {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  content: string;
}

interface SocialItem {
  icon: React.ReactNode;
  name: string;
  link: string;
}

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const contactInfo: ContactInfoItem[] = [
    { icon: MapPin, title: "Adresse", content: "Bingerville, Akandjé II Cité Kokoh Adjoumani" },
    { icon: Phone, title: "Téléphone", content: "+225 0769291965 / +225 0102966292" },
    { icon: Mail, title: "Email", content: "infos@upb.ci" },
    { icon: Clock, title: "Horaires", content: "Lun-Ven: 8h-18h | Sam: 9h-13h" },
  ];

  const socialLinks: SocialItem[] = [
    { icon: <Twitter className="w-6 h-6" />, name: "Twitter", link: "#" },
    { icon: <Facebook className="w-6 h-6" />, name: "Facebook", link: "#" },
    { icon: <Linkedin className="w-6 h-6" />, name: "LinkedIn", link: "#" },
    { icon: <Instagram className="w-6 h-6" />, name: "Instagram", link: "#" },
  ];

  const handleInputChange = <T extends keyof ContactFormData>(field: T, value: ContactFormData[T]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simple validation sans Zod
    if (!formData.name || !formData.email || !formData.phone || !formData.subject || !formData.message) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      setIsSubmitting(false);
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success("Message envoyé avec succès !");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch {
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">


      {/* Hero */}
      <section className="pt-32 pb-12 bg-linear-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto animate-fade-in">
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-6">
              <span className="text-sm font-semibold text-primary uppercase">
                <Typewriter text={["Contact"]} className="text-2xl" loop speed={100} />
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold font-protos mb-6">Contactez-Nous</h1>
            <p className="text-xl text-muted-foreground">
              Notre équipe est à votre disposition pour répondre à toutes vos questions
            </p>
          </div>
        </div>
      </section>

      {/* Section Contact */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* FORMULAIRE */}
            <div className="animate-fade-in">
              <div className="bg-card rounded-3xl p-8 border shadow-xl">
                <h2 className="text-3xl font-bold font-protos mb-6">Envoyez-nous un message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom complet *</Label>
                    <Input id="name" value={formData.name} onChange={(e) => handleInputChange("name", e.target.value)} required className="h-12" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" type="email" value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)} required className="h-12" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone *</Label>
                    <Input id="phone" type="tel" value={formData.phone} onChange={(e) => handleInputChange("phone", e.target.value)} required className="h-12" />
                  </div>
                  <div className="space-y-2">
                    <Label>Sujet *</Label>
                    <Select value={formData.subject} onValueChange={(v) => handleInputChange("subject", v)}>
                      <SelectTrigger className="h-12">
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
                    <Textarea id="message" value={formData.message} onChange={(e) => handleInputChange("message", e.target.value)} rows={6} className="resize-none" />
                    <p className="text-xs text-muted-foreground text-right">{formData.message.length}/1000</p>
                  </div>
                  <Button type="submit" size="lg" disabled={isSubmitting} className="w-full h-14 text-lg rounded-full">
                    {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
                  </Button>
                </form>
              </div>
            </div>

            {/* INFORMATIONS */}
            <div className="space-y-8 animate-fade-in">
              <h2 className="text-3xl font-bold mb-6 font-protos">Informations de contact</h2>
              <div className="space-y-6">
                {contactInfo.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="flex items-start gap-4 p-6 bg-card rounded-2xl border hover:shadow-lg transition-all">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold">{item.title}</h3>
                        <p className="text-muted-foreground">{item.content}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Réseaux sociaux */}
              <div className="mt-8">
                <h3 className="text-2xl font-bold mb-4">Suivez-nous</h3>
                <div className="flex gap-4">
                  {socialLinks.map((item, idx) => (
                    <a key={idx} href={item.link} target="_blank" rel="noopener noreferrer" className="p-4 bg-card rounded-full hover:bg-primary/10 transition-all">
                      {item.icon}
                    </a>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border h-64 bg-muted flex items-center justify-center mt-6">
                <MapPin className="w-12 h-12 text-primary mb-2" />
                <p className="text-muted-foreground">Carte interactive</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
