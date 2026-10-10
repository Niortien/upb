import { createElement, type ReactElement } from "react";
import {
  BookOpen,
  Camera,
  Code2,
  Drama,
  Dumbbell,
  Globe,
  Leaf,
  Music,
  Palette,
  type LucideIcon,
  type LucideProps,
} from "lucide-react";

export const CLUB_ICON_MAP: Record<string, LucideIcon> = {
  Code2,
  Palette,
  Dumbbell,
  Globe,
  Drama,
  Music,
  Leaf,
  BookOpen,
  Camera,
};

export function getClubIcon(iconName: string): LucideIcon {
  return CLUB_ICON_MAP[iconName] ?? Globe;
}

/** L'icône d'un club prête à afficher : évite de choisir un composant pendant le rendu d'une page. */
export function iconeDeClub(iconName: string, props?: LucideProps): ReactElement {
  return createElement(getClubIcon(iconName), props);
}
