"use client";

import { forwardRef } from "react";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

// --- Types ---

// Props HTML standards pouvant être appliquées à <a>
interface AnchorAttributes extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

// Props de base pour Link (Next.js) sans any
interface NavLinkBaseProps extends Omit<LinkProps, "href">, AnchorAttributes {
  href: string;
  children?: React.ReactNode;
}

// Props pour les classes dynamiques
interface NavLinkStateProps {
  className?: string;
  activeClassName?: string;
}

// Props finales du composant
export type NavLinkProps = NavLinkBaseProps & NavLinkStateProps;

// --- Composant NavLink Typé ---

const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ className, activeClassName, href, ...props }, ref) => {
    const pathname = usePathname();

    // Détection de l'état actif
    const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);

    // Classes finales
    const finalClassName = cn(className, isActive && activeClassName);

    return (
      <Link ref={ref} href={href} className={finalClassName} {...props} />
    );
  }
);

NavLink.displayName = "NavLink";

export { NavLink };
