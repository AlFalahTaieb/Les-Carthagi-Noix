# Site des Carthagi’Noix

Site statique (Astro). Aucun back-end : tout est généré en fichiers HTML.

## Commandes (Node 22)

```bash
nvm use 22
npm install
npm run dev      # aperçu local sur http://localhost:4321
npm run build    # génère le dossier dist/ à envoyer sur l'hébergeur
```

## Ajouter un événement (agenda)

Créer un fichier dans `src/content/evenements/`, par exemple `2026-12-05-concert.md` :

```md
---
titre: "Concert de Mosaïque"
date: 2026-12-05T20:00:00+01:00   # +01:00 en hiver, +02:00 en été
lieu: "Grenoble"
lien: "https://..."               # facultatif
lienTexte: "Réserver"             # facultatif
---
Description en Markdown.
```

Les événements passés disparaissent seuls de l'agenda.

## Ajouter un article

Créer un fichier dans `src/content/actualites/`, par exemple `2026-12-10-titre.md` :

```md
---
titre: "Titre de l’article"
date: 2026-12-10
resume: "Une phrase qui apparaît dans la liste."
image: "/images/mon-image.jpg"   # facultatif, fichier dans public/images/
---
Texte de l’article en Markdown.
```

## Modifier les infos générales

`src/config.ts` : e-mail, réseaux sociaux (laisser vide pour masquer), menu, bureau, lien d'adhésion.
Les couleurs et polices sont dans `src/styles/global.css`.

## Mise en ligne

Après `npm run build`, envoyer le contenu du dossier `dist/` à la racine de l'hébergement du domaine.
