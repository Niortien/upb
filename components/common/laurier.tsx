import type { SVGProps } from "react";

/**
 * Le laurier du logo UPB, redessiné en vecteur : deux branches de feuilles en goutte, en deux ors.
 * Chaque feuille porte la classe « feuille » et un data-ordre (du pied vers la pointe) pour pouvoir
 * les faire pousser une à une.
 */

const FEUILLE = "M0 0 C -8 -7 -9 -21 0 -32 C 9 -21 8 -7 0 0 Z";
const OR = "#f7b500";
const OR_FONCE = "#e8920c";

interface LaurierProps extends Omit<SVGProps<SVGSVGElement>, "children"> {
  /** Feuilles par branche. */
  feuilles?: number;
}

export function Laurier({ feuilles = 9, ...props }: LaurierProps) {
  const cx = 200;
  const cy = 200;
  const r = 170;
  // Angles en degrés, 90° = bas (repère SVG). La branche gauche monte du bas jusqu'en haut à gauche.
  const debut = 100;
  const fin = 254;

  /**
   * Comme sur le logo : chaque nœud porte deux feuilles qui se chevauchent, l'une qui s'ouvre vers
   * l'extérieur, l'autre vers l'intérieur. Elles suivent la tangente de l'arc et rapetissent vers la pointe.
   */
  const branche = (cote: "gauche" | "droite") =>
    Array.from({ length: feuilles }, (_, i) => {
      const t = i / (feuilles - 1);
      const angle = debut + (fin - debut) * t;
      const rad = (angle * Math.PI) / 180;
      const x = cx + r * Math.cos(rad);
      const y = cy + r * Math.sin(rad);
      const tangente = angle + 180;
      const echelle = 1.18 - t * 0.4;
      const xFinal = cote === "gauche" ? x : 2 * cx - x;
      const sens = cote === "gauche" ? 1 : -1;

      return [
        { ouverture: -34, couleur: OR },
        { ouverture: 30, couleur: OR_FONCE },
      ].map(({ ouverture, couleur }, k) => (
        <g
          key={`${cote}-${i}-${k}`}
          transform={`translate(${xFinal.toFixed(1)} ${y.toFixed(1)}) rotate(${(sens * (tangente + ouverture)).toFixed(1)}) scale(${echelle.toFixed(2)})`}
        >
          {/* La feuille elle-même reste sans transformation : c'est elle qu'on fait pousser. */}
          <path className="feuille" data-ordre={i} d={FEUILLE} fill={couleur} />
        </g>
      ));
    });

  return (
    <svg viewBox="0 0 400 400" aria-hidden="true" focusable="false" {...props}>
      {branche("gauche")}
      {branche("droite")}
    </svg>
  );
}
