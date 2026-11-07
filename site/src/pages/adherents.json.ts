import { adherents, adherentsMisAJour } from '../adherents';

// Publie le même nombre que celui affiché : le déploiement suivant s'en sert comme « dernier nombre connu ».
export const GET = () =>
  new Response(JSON.stringify({ nombre: adherents, misAJour: adherentsMisAJour }), {
    headers: { 'Content-Type': 'application/json' },
  });
