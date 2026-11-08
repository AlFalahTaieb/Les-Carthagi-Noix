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

## Formulaire de contact (Web3Forms)

La clé Web3Forms n'est pas dans le dépôt. En production, elle vient du secret GitHub `WEB3FORMS_KEY`
(Settings, Secrets and variables, Actions). Pour tester en local, copier `.env.example` en `.env` et
renseigner `PUBLIC_WEB3FORMS_KEY`. La clé reste visible dans le code HTML de la page publiée, ce qui est
inévitable pour tout formulaire envoyé depuis le navigateur.

## Compteur d'adhérents (HelloAsso)

Chaque jour (et à chaque déploiement), `scripts/adherents.mjs` compte les adhésions du formulaire HelloAsso
et le site affiche ce nombre sur l'accueil. Seul le nombre est lu et publié, jamais un nom.

Configuration dans GitHub (Settings, Secrets and variables, Actions) :
- Secrets : `HELLOASSO_CLIENT_ID` et `HELLOASSO_CLIENT_SECRET` (HelloAsso : Mon Compte, Intégration et API).
- Variables : `HELLOASSO_URL` (adresse publique de la page d'adhésion, ex.
  `https://www.helloasso.com/associations/mon-asso/adhesions/mon-formulaire`) et, facultatif,
  `HELLOASSO_FROM` (ex. `2025-09-01` : ne compter que les adhésions depuis cette date, utile pour une saison).

Si HelloAsso ne répond pas, on garde le nombre déjà affiché sur le site (publié dans `/adherents.json`).
Le seuil d'affichage se règle avec `seuilCompteur` dans `src/config.ts`. En local : `npm run adherents`
avec les mêmes variables dans `.env`.

## Mise en ligne

Après `npm run build`, envoyer le contenu du dossier `dist/` à la racine de l'hébergement du domaine.
