import type { SVGProps } from "react";

interface EngrenageProps extends Omit<SVGProps<SVGSVGElement>, "children"> {
  dents?: number;
}

/** Une roue dentée dessinée au trait : le contour des dents, le moyeu et son axe. */
export function Engrenage({ dents = 14, ...props }: EngrenageProps) {
  const c = 100;
  const rExt = 92;
  const rInt = 76;
  const pas = (Math.PI * 2) / dents;
  const pts: string[] = [];
  for (let i = 0; i < dents; i++) {
    const a = i * pas - Math.PI / 2;
    // Une dent : base large sur le rayon intérieur, sommet plus étroit sur le rayon extérieur.
    for (const [da, r] of [[-0.38, rInt], [-0.2, rExt], [0.2, rExt], [0.38, rInt]] as const) {
      const ang = a + da * pas;
      pts.push(`${(c + r * Math.cos(ang)).toFixed(1)},${(c + r * Math.sin(ang)).toFixed(1)}`);
    }
  }
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" strokeWidth={2} strokeLinejoin="round" {...props}>
      <polygon points={pts.join(" ")} />
      <circle cx={c} cy={c} r={58} strokeWidth={1} />
      <circle cx={c} cy={c} r={14} strokeWidth={1} />
      {Array.from({ length: 6 }, (_, i) => {
        const a = (i * Math.PI) / 3;
        const f = (v: number) => v.toFixed(1);
        return <line key={i} x1={f(c + 14 * Math.cos(a))} y1={f(c + 14 * Math.sin(a))} x2={f(c + 58 * Math.cos(a))} y2={f(c + 58 * Math.sin(a))} strokeWidth={1} />;
      })}
    </svg>
  );
}
