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
import { MapPin, Phone, Mail, Clock } from "lucide-react";

import { z } from "zod";
import Navigation from "../common/navigation";
import { toast } from "sonner";
import { Typewriter } from "../ui/type-writer";

// ----------------------
// 🎯 Typage du Formulaire
// ----------------------

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Le nom doit contenir au moins 2 caractères" })
    .max(100, { message: "Le nom ne peut pas dépasser 100 caractères" }),

  email: z
    .string()
    .trim()
    .email({ message: "Adresse email invalide" })
    .max(255, { message: "L'email ne peut pas dépasser 255 caractères" }),

  phone: z
    .string()
    .trim()
    .min(10, { message: "Numéro de téléphone invalide" })
    .max(20, { message: "Le numéro ne peut pas dépasser 20 caractères" }),

  subject: z.string().min(1, { message: "Veuillez sélectionner un sujet" }),

  message: z
    .string()
    .trim()
    .min(10, { message: "Le message doit contenir au moins 10 caractères" })
    .max(1000, { message: "Le message ne peut pas dépasser 1000 caractères" }),
});

type ContactFormData = z.infer<typeof contactSchema>;

// ----------------------
// 🎯 Typage Contact Info
// ----------------------

interface ContactInfoItem {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  content: string;
}

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const contactInfo: ContactInfoItem[] = [
    {
      icon: MapPin,
      title: "Adresse",
      content: "Bingerville,Akandjé II Cité Kokoh Adjoumani",
    },
    { icon: Phone, title: "Téléphone", content: "+225 0769291965 / +225 0102966292" },
    { icon: Mail, title: "Email", content: "infos@upb.ci" },
    {
      icon: Clock,
      title: "Horaires",
      content: "Lun-Ven: 8h-18h | Sam: 9h-13h",
    },
  ];

  // ------------------------------------------
  // 📌 Gestion du Submit avec validation Zod
  // ------------------------------------------

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const validated = contactSchema.parse(formData);

      // Simulation API
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success("Message envoyé avec succès !");

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      } else {
        toast.error("Une erreur est survenue. Veuillez réessayer.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // ------------------------------------------
  // 📌 Typage correct du handleInputChange
  // ------------------------------------------

  const handleInputChange = <T extends keyof ContactFormData>(
    field: T,
    value: ContactFormData[T]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-12 bg-linear-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-6">
              <span className="text-sm font-semibold text-primary uppercase">
                
                <Typewriter text={['Contact']}
                className="text-2xl" 
                loop
                speed={200}
                 />
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
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      required
                      maxLength={100}
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                      maxLength={255}
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      required
                      maxLength={20}
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Sujet *</Label>
                    <Select
                      value={formData.subject}
                      onValueChange={(value) =>
                        handleInputChange("subject", value)
                      }
                    >
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
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      required
                      rows={6}
                      maxLength={1000}
                      className="resize-none"
                    />
                    <p className="text-xs text-muted-foreground text-right">
                      {formData.message.length}/1000
                    </p>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full h-14 text-lg rounded-full"
                  >
                    {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
                  </Button>
                </form>
              </div>
            </div>

            {/* INFORMATIONS */}
            <div className="space-y-8 animate-fade-in">
              <h2 className="text-3xl font-bold mb-6 font-protos">Informations de contact</h2>

              <p className="text-muted-foreground mb-8">
                N&apos;hésitez pas à nous contacter pour toute question concernant nos
                programmes ou pour planifier une visite.
              </p>

              <div className="space-y-6">
                {contactInfo.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={i}
                      className="flex items-start gap-4 p-6 bg-card rounded-2xl border hover:shadow-lg transition-all"
                    >
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

              <div className="rounded-2xl border h-64 bg-muted flex items-center justify-center">
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
