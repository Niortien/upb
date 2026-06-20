"use client";

import Link from "next/link";
import { ArrowLeft, AlertCircle } from "lucide-react";

export default function FormationError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 text-center">
      <div className="max-w-md">
        <div className="w-16 h-16 rounded-2xl bg-destructive/10 flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-8 h-8 text-destructive" />
        </div>

        <div className="tag-primary mb-4 mx-auto w-fit">Erreur</div>
        <h1 className="text-2xl font-protos font-black text-foreground mb-3">
          Formation introuvable
        </h1>
        <p className="text-muted-foreground font-raleway mb-8">
          Cette formation n&apos;existe pas ou a été supprimée. Revenez à la liste des formations.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/formation"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-full hover:bg-primary/90 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Toutes les formations
          </Link>
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-primary text-primary font-bold rounded-full hover:bg-primary hover:text-white transition-all"
          >
            Réessayer
          </button>
        </div>
      </div>
    </div>
  );
}
