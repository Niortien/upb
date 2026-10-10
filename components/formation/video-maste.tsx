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
    <section aria-label={title} className="rounded-3xl bg-craie p-5 sm:p-8">
      <div className="grid gap-6 lg:grid-cols-[0.7fr_1.3fr] lg:items-center lg:gap-10">
        <div>
          <h3 className="titre-upb text-3xl text-indigo">{title}</h3>
          <p className="mt-3 text-lg leading-relaxed text-encre-douce">{description}</p>
        </div>
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-nuit shadow-[0_24px_48px_-28px_rgb(20_23_74/0.55)]">
          <video src={src} title={title} className="h-full w-full" controls preload="metadata" />
        </div>
      </div>
    </section>
  );
};

export default VideoMaster;
