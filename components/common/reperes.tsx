/** Repères de coin d'un cadre de plan : quatre équerres aux angles. À poser dans un parent « relative ». */
export function Reperes({ taille = 16, className = "text-laurier" }: { taille?: number; className?: string }) {
  const base = { width: taille, height: taille } as const;
  return (
    <span aria-hidden className={`pointer-events-none absolute inset-0 ${className}`}>
      <span className="absolute left-0 top-0 border-l-2 border-t-2 border-current" style={base} />
      <span className="absolute right-0 top-0 border-r-2 border-t-2 border-current" style={base} />
      <span className="absolute bottom-0 left-0 border-b-2 border-l-2 border-current" style={base} />
      <span className="absolute bottom-0 right-0 border-b-2 border-r-2 border-current" style={base} />
    </span>
  );
}
