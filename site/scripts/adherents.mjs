// Compte les adhérents du formulaire HelloAsso et écrit uniquement le nombre dans src/data/adherents.json.
// Lancé avant chaque compilation (voir .github/workflows/deploy.yml). Aucune donnée personnelle n'est lue
// au-delà du simple décompte, ni affichée, ni enregistrée.
import { mkdir, writeFile } from 'node:fs/promises';

const {
  HELLOASSO_CLIENT_ID: id,
  HELLOASSO_CLIENT_SECRET: secret,
  HELLOASSO_ORG: organisation, // identifiant de l'association dans l'adresse HelloAsso
  HELLOASSO_FORM: formulaire, // identifiant du formulaire d'adhésion
  HELLOASSO_FROM: depuis, // facultatif : ne compter que les adhésions depuis cette date (ex. 2025-09-01)
  HELLOASSO_API = 'https://api.helloasso.com',
  SITE_ADHERENTS_URL = 'https://www.lescarthaginoix.com/adherents.json',
} = process.env;

const SORTIE = new URL('../src/data/adherents.json', import.meta.url);

async function ecrire(nombre, misAJour = new Date().toISOString().slice(0, 10)) {
  await mkdir(new URL('./', SORTIE), { recursive: true });
  const donnees = { nombre, misAJour };
  await writeFile(SORTIE, JSON.stringify(donnees) + '\n');
  console.log(nombre === null ? 'Compteur : aucune valeur disponible (compteur masqué).' : `Compteur : ${nombre} adhérent(s).`);
}

async function compterDepuisHelloAsso() {
  const jeton = await fetch(`${HELLOASSO_API}/oauth2/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'client_credentials', client_id: id, client_secret: secret }),
  });
  if (!jeton.ok) throw new Error(`authentification refusée (HTTP ${jeton.status})`);
  const { access_token: acces } = await jeton.json();

  const vus = new Set();
  let suite = null;
  for (let page = 0; page < 200; page++) {
    const q = new URLSearchParams({ pageSize: '100' });
    // Processed = payé en ligne ; Registered = inscrit (paiement hors ligne ou gratuit). Annulés et remboursés exclus.
    for (const etat of ['Processed', 'Registered']) q.append('itemStates', etat);
    q.append('tierTypes', 'Membership');
    if (depuis) q.set('from', new Date(depuis).toISOString());
    if (suite) q.set('continuationToken', suite);

    const url = `${HELLOASSO_API}/v5/organizations/${encodeURIComponent(organisation)}/forms/Membership/${encodeURIComponent(formulaire)}/items?${q}`;
    const reponse = await fetch(url, { headers: { Authorization: `Bearer ${acces}` } });
    if (!reponse.ok) throw new Error(`lecture des adhésions refusée (HTTP ${reponse.status})`);
    const { data = [], pagination = {} } = await reponse.json();
    if (data.length === 0) return vus.size; // la documentation demande de s'arrêter sur une page vide
    for (const item of data) vus.add(item.id);
    suite = pagination.continuationToken ?? null;
    if (!suite) return vus.size;
  }
  throw new Error('trop de pages (boucle interrompue)');
}

// Dernier nombre connu : celui du site actuellement en ligne (évite de perdre le compteur si HelloAsso est indisponible).
async function dernierNombreConnu() {
  try {
    const r = await fetch(SITE_ADHERENTS_URL, { signal: AbortSignal.timeout(10_000) });
    const { nombre, misAJour } = await r.json();
    return Number.isInteger(nombre) ? { nombre, misAJour } : null;
  } catch {
    return null;
  }
}

if (!id || !secret || !organisation || !formulaire) {
  console.log('Identifiants HelloAsso non renseignés : compteur ignoré.');
  const ancien = await dernierNombreConnu();
  await ecrire(ancien?.nombre ?? null, ancien?.misAJour);
} else {
  try {
    await ecrire(await compterDepuisHelloAsso());
  } catch (erreur) {
    console.warn(`::warning::HelloAsso : ${erreur.message}. On conserve le dernier nombre connu.`);
    const ancien = await dernierNombreConnu();
    await ecrire(ancien?.nombre ?? null, ancien?.misAJour);
  }
}
