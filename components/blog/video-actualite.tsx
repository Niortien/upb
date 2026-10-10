"use client";

import React from "react";

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
        <h3 className="titre-upb text-[clamp(1.8rem,3vw,2.6rem)] text-indigo">{title}</h3>
        <p className="mt-3 text-lg leading-relaxed text-encre-douce">{description}</p>
      </div>
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-nuit shadow-[0_24px_48px_-28px_rgb(20_23_74/0.55)]">
        <video src={src} title={title} className="h-full w-full" controls preload="metadata" />
      </div>
    </div>
  );
};

export default VideoActualite;
