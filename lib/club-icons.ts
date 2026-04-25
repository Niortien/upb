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
