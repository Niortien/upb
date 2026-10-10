"use client";

import React from "react";
import { Reperes } from "@/components/common/reperes";

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
    <section aria-label={title} className="relative border border-indigo/40 bg-white p-5 sm:p-8">
      <Reperes taille={16} className="text-indigo" />
      <div className="grid gap-6 lg:grid-cols-[0.7fr_1.3fr] lg:items-center lg:gap-10">
        <div>
          <p className="etiquette text-indigo">Document vidéo</p>
          <h3 className="titre-upb mt-2 text-4xl text-indigo">{title}</h3>
          <p className="mt-3 text-lg leading-relaxed text-encre-douce">{description}</p>
        </div>
        <div className="relative aspect-video w-full overflow-hidden bg-nuit">
          <video src={src} title={title} className="h-full w-full" controls preload="metadata" />
        </div>
      </div>
    </section>
  );
};

export default VideoMaster;
