"use client";

import React from "react";

interface VideoProps {
  src: string; // lien YouTube ou vidéo MP4
  title: string;
  description: string;
}

const VideoMaster: React.FC<VideoProps> = ({
  src = "/assets/video/master.mp4",
  title = "Présentation du Master UPB",
  description = "Découvrez nos formations Master et les opportunités offertes par UPB.",
}) => {
  return (
    <section className="py-5 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold mb-6">{title}</h2>
        <p className="text-lg text-muted-foreground mb-8">{description}</p>
        <div className="relative aspect-video w-full max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl">
          <iframe
            src={src}
            title={title}
            className="w-full h-full"
            allow="accelerometer; autoplay; muted clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default VideoMaster;
