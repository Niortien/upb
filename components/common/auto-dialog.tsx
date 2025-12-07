"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import Image from "next/image";

export default function AutoDialog() {
  // Le dialog s'ouvre automatiquement au rendu initial
  const [open, setOpen] = useState(true);

  const featuredPost = {
    title:
      "Percée scientifique : Nos chercheurs découvrent une nouvelle approche en IA quantique",
    excerpt:
      "L'équipe du professeur Laurent a publié une étude révolutionnaire dans Nature qui pourrait transformer l'informatique quantique telle que nous la connaissons.",
    image: "/assets/image/home/campus/2O4A6842.webp",
    category: "Recherche",
    author: "Dr. Marie Laurent",
    date: "15 Mars 2024",
    readTime: "5 min",
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="space-y-4">
        <DialogHeader>
          <DialogTitle>{featuredPost.title}</DialogTitle>
          <DialogDescription>{featuredPost.excerpt}</DialogDescription>
        </DialogHeader>

        {/* Image */}
        <Image
          src={featuredPost.image}
          alt={featuredPost.title}
          className="w-full rounded-lg object-cover"
          width={200}
          height={200}
        />

        {/* Infos supplémentaires */}
        <div className="space-y-1 text-sm text-muted-foreground"></div>
      </DialogContent>
    </Dialog>
  );
}
