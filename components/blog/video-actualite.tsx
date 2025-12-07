"use client";

import React from "react";

interface VideoProps {
  src: string;
  title: string;
  description: string;
}

const VideoActualite: React.FC<VideoProps> = ({
  src = "https://www.youtube.com/embed/3JZ_D3ELwOQ",
  title = "Actualité UPB",
  description = "Restez informé(e) des dernières nouvelles et événements à UPB.",
}) => {
  return (
    <section className="py-16 bg-secondary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold mb-6">{title}</h2>
        <p className="text-lg text-muted-foreground mb-8">{description}</p>
        <div className="relative aspect-video w-full max-w-8xl mx-auto rounded-2xl overflow-hidden shadow-xl">
          <video
            src={src}
            title={title}
            className="w-full h-full"
            controls  
            autoPlay
            
          ></video>
        </div>
      </div>
    </section>
  );
};

export default VideoActualite;
