// Informations générales du site : à modifier ici, elles se répercutent partout.
export const SITE = {
  nom: "Les Carthagi’Noix",
  devise: "From Carthago to Cularo",
  description:
    "Association culturelle grenobloise qui favorise les échanges culturels entre Grenoble et le monde arabe : musique, arts, rencontres et partage interculturel.",
  url: "https://www.lescarthaginoix.com",
  titreAccueil: "Les Carthagi’Noix · Association culturelle à Grenoble",
  fondation: "2025-10-31",
  adhesion: "https://adhesion.lescarthaginoix.com/",
  // Clé d'accès Web3Forms du formulaire de contact. Elle n'est pas dans le dépôt : elle vient de la
  // variable PUBLIC_WEB3FORMS_KEY (secret GitHub WEB3FORMS_KEY en production, fichier .env en local).
  // Tant qu'elle est vide, le formulaire affiche « bientôt disponible ».
  web3formsKey: (import.meta.env.PUBLIC_WEB3FORMS_KEY as string | undefined) ?? "",
  // Laisser vide ("") pour masquer un lien.
  email: "",
  instagram: "https://www.instagram.com/lescarthaginoix/",
  facebook: "https://www.facebook.com/profile.php?id=61576470172330",
  youtube: "",
};

export const NAV = [
  { href: "/association/", label: "L’association" },
  { href: "/activites/", label: "Activités" },
  { href: "/agenda/", label: "Agenda" },
  { href: "/actualites/", label: "Actualités" },
  { href: "/contact/", label: "Contact" },
];

export const BUREAU = [
  { nom: "Eya Ben Azouz", role: "Présidente" },
  { nom: "Taieb El Felah", role: "Vice-président" },
  { nom: "Jihen Jridi", role: "Secrétaire générale" },
  { nom: "Edam Abdelhedi", role: "Trésorier" },
];
