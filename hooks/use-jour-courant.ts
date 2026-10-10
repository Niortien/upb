"use client";

import { useSyncExternalStore } from "react";

const abonner = () => () => {};
const jour = () => Math.floor(Date.now() / 86_400_000);

/**
 * Le jour d'aujourd'hui (nombre de jours depuis 1970), lu côté navigateur seulement.
 * Au rendu du serveur il vaut 0 : la page ne prétend rien sur la date, puis se corrige à l'affichage.
 */
export function useJourCourant(): number {
  return useSyncExternalStore(abonner, jour, () => 0);
}
