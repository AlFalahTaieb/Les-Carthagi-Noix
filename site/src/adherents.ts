// Nombre d'adhérents, produit avant la compilation par scripts/adherents.mjs (absent en local : compteur masqué).
const fichiers = import.meta.glob<{ nombre: number | null; misAJour?: string }>('./data/adherents.json', { eager: true, import: 'default' });
const donnees = Object.values(fichiers)[0];

export const adherents: number | null = donnees?.nombre ?? null;
export const adherentsMisAJour: string | null = donnees?.misAJour ?? null;
