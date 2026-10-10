interface PlancheProps {
  /** Repère de la planche, par exemple « PL. 02 ». */
  repere: string;
  /** Intitulé technique de la section, par exemple « Cahier des charges ». */
  legende: string;
  titre: string;
  id?: string;
  /** Section sur fond sombre (bleu de plan). */
  sombre?: boolean;
  /** Largeur maximale du titre. */
  largeur?: string;
}

/**
 * En-tête de section, façon planche d'un dossier technique : repère et légende sur un trait qui se dessine,
 * puis le titre en capitales condensées. Les éléments portent data-reveal / data-trait pour useReveal.
 */
export function Planche({ repere, legende, titre, id, sombre = false, largeur = "20ch" }: PlancheProps) {
  return (
    <header>
      <p data-reveal className={`etiquette flex items-center gap-3 ${sombre ? "text-white/75" : "text-encre-douce"}`}>
        <span className="bg-laurier px-2 py-1 text-nuit">{repere}</span>
        <span>{legende}</span>
        <span aria-hidden data-trait className={`h-px flex-1 origin-left ${sombre ? "bg-white/30" : "bg-indigo/30"}`} />
      </p>
      <h2
        id={id}
        data-reveal
        style={{ maxWidth: largeur }}
        className={`titre-upb mt-5 text-[clamp(2.6rem,6vw,5.2rem)] ${sombre ? "text-white" : "text-indigo"}`}
      >
        {titre}
      </h2>
    </header>
  );
}
