"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import Image from "next/image";

const STORAGE_KEY = "upb_news_seen_v1";

export default function AutoDialog() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const alreadySeen = localStorage.getItem(STORAGE_KEY);
    if (!alreadySeen) {
      setOpen(true);
    }
  }, []);

  const handleOpenChange = (value: boolean) => {
    if (!value) {
      localStorage.setItem(STORAGE_KEY, "1");
    }
    setOpen(value);
  };

  const featuredPost = {
    title:
      "Percée scientifique : Nos chercheurs découvrent une nouvelle approche en IA quantique",
    excerpt:
      "L'équipe du professeur Laurent a publié une étude révolutionnaire dans Nature qui pourrait transformer l'informatique quantique telle que nous la connaissons.",
    image: "/assets/image/home/campus/2O4A6842.webp",
    category: "Recherche",
    author: "Dr. Marie Laurent",
    date: "15 Mars 2024",
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="space-y-4 max-w-md">
        <DialogHeader>
          <div className="tag-primary mb-2 w-fit">{featuredPost.category}</div>
          <DialogTitle className="text-lg leading-snug">{featuredPost.title}</DialogTitle>
          <DialogDescription>{featuredPost.excerpt}</DialogDescription>
        </DialogHeader>

        <div className="relative w-full h-48 rounded-xl overflow-hidden">
          <Image
            src={featuredPost.image}
            alt={featuredPost.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{featuredPost.author}</span>
          <span>{featuredPost.date}</span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
