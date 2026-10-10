"use client";

import React from "react";
import { Reperes } from "@/components/common/reperes";

interface VideoProps {
  src: string;
  title: string;
  description: string;
}

const VideoActualite: React.FC<VideoProps> = ({
  src = "/assets/video/master.mp4",
  title = "Actualité UPB",
  description = "Restez informé(e) des dernières nouvelles et événements à l'UPB.",
}) => {
  return (
    <div className="grid gap-6 lg:grid-cols-[0.7fr_1.3fr] lg:items-center lg:gap-12">
      <div>
        <p className="etiquette text-[12px] text-laurier-fonce">Vidéo</p>
        <h3 className="titre-upb mt-2 text-[clamp(1.8rem,3vw,2.6rem)] text-indigo">{title}</h3>
        <p className="mt-3 text-lg leading-relaxed text-encre-douce">{description}</p>
      </div>
      <div className="relative aspect-video w-full bg-nuit">
        <video src={src} title={title} className="h-full w-full" controls preload="metadata" />
        <Reperes taille={16} className="text-indigo" />
      </div>
    </div>
  );
};

export default VideoActualite;
