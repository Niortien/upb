"use client";

import { PageMessage } from "@/components/common/page-message";

export default function ClubError({ reset }: { error: Error; reset: () => void }) {
  return (
    <PageMessage
      titre="Ce club est introuvable."
      texte="Ce club n'existe pas ou a été supprimé. Revenez à la liste des clubs."
      actions={[{ label: "Tous les clubs", href: "/clubs" }]}
      onReessayer={reset}
    />
  );
}
