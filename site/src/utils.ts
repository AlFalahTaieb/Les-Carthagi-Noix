import { getCollection } from 'astro:content';

const TZ = 'Europe/Paris';

export const jour = (d: Date) => new Intl.DateTimeFormat('fr-FR', { day: 'numeric', timeZone: TZ }).format(d);
export const moisCourt = (d: Date) => new Intl.DateTimeFormat('fr-FR', { month: 'short', timeZone: TZ }).format(d).replace('.', '');
export const dateLongue = (d: Date) =>
  new Intl.DateTimeFormat('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: TZ }).format(d);
export const dateSimple = (d: Date) =>
  new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: TZ }).format(d);
export const heure = (d: Date) =>
  new Intl.DateTimeFormat('fr-FR', { hour: '2-digit', minute: '2-digit', timeZone: TZ }).format(d).replace(':', 'h');

/** Événements à venir (on garde ceux d'aujourd'hui jusqu'à la fin de la journée). */
export async function evenementsAVenir() {
  const limite = Date.now() - 24 * 3600 * 1000;
  const tous = await getCollection('evenements');
  return tous.filter((e) => e.data.date.getTime() >= limite).sort((a, b) => a.data.date.getTime() - b.data.date.getTime());
}

export async function actualitesRecentes() {
  const toutes = await getCollection('actualites');
  return toutes.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}
