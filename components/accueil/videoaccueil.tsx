"use client";

import React from "react";

interface VideoProps {
  src: string;
  title: string;
  description: string;
}

const VideoAccueil: React.FC<VideoProps> = ({
  src = "https://www.youtube.com/embed/tgbNymZ7vqY",
  title = "Bienvenue à UPB",
  description = "Plongez dans l'univers de l'Université Polytechnique de Bingerville.",
}) => {
  return (
    <section className="py-16 bg-gradient-to-r from-primary/10 to-secondary/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold mb-6">{title}</h2>
        <p className="text-lg text-muted-foreground mb-8">{description}</p>
        <div className="relative aspect-video w-full max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl">
          <iframe
            src={src}
            title={title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default VideoAccueil;
