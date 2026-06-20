import Link from "next/link";
import { GraduationCap, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 text-center">
      {/* Decorative blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-secondary/5 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-lg">
        {/* 404 number */}
        <div className="number-stat text-[8rem] leading-none mb-4 select-none">404</div>

        <div className="tag-primary mb-6 mx-auto w-fit">
          <Search className="w-3 h-3" />
          Page introuvable
        </div>

        <h1 className="text-3xl sm:text-4xl font-protos font-black text-foreground mb-4 leading-tight">
          Cette page n&apos;existe pas
        </h1>

        <p className="text-muted-foreground font-raleway mb-10 leading-relaxed">
          La page que vous cherchez a peut-être été déplacée ou supprimée.
          Revenez à l&apos;accueil ou explorez nos formations.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-full hover:bg-primary/90 hover:-translate-y-0.5 transition-all duration-300 shadow-lg shadow-primary/25"
          >
            <Home className="w-4 h-4" />
            Retour à l&apos;accueil
          </Link>
          <Link
            href="/formation"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-primary text-primary font-bold rounded-full hover:bg-primary hover:text-white transition-all duration-300"
          >
            <GraduationCap className="w-4 h-4" />
            Nos formations
          </Link>
        </div>
      </div>
    </div>
  );
}
