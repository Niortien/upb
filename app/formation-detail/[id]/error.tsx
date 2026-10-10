"use client";

import { PageMessage } from "@/components/common/page-message";

export default function FormationError({ reset }: { error: Error; reset: () => void }) {
  return (
    <PageMessage
      titre="Formation introuvable."
      texte="Cette formation n'existe pas ou a été supprimée. Revenez à la liste des formations."
      actions={[{ label: "Toutes les formations", href: "/formation" }]}
      onReessayer={reset}
    />
  );
}
