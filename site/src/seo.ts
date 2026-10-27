import { SITE } from './config';

const ville = {
  '@type': 'PostalAddress',
  addressLocality: 'Grenoble',
  postalCode: '38000',
  addressRegion: 'Auvergne-Rhône-Alpes',
  addressCountry: 'FR',
};

export const ORG_ID = `${SITE.url}/#association`;
const url = (chemin: string) => new URL(chemin, SITE.url).href;

export const reseauxSociaux = () => [SITE.instagram, SITE.facebook, SITE.youtube].filter(Boolean);

/** Fiche de l'association : c'est elle que les moteurs et les IA utilisent pour « comprendre » qui nous sommes. */
export const organisation = () => ({
  '@context': 'https://schema.org',
  '@type': ['Organization', 'NGO'],
  '@id': ORG_ID,
  name: SITE.nom,
  alternateName: ['Les Carthaginoix', 'Les Carthagi\'Noix Grenoble', 'Carthaginoix'],
  slogan: SITE.devise,
  description: SITE.description,
  url: SITE.url,
  logo: { '@type': 'ImageObject', url: url('/images/og-image.jpg') },
  image: url('/images/og-image.jpg'),
  foundingDate: SITE.fondation,
  foundingLocation: { '@type': 'Place', name: 'Grenoble', address: ville },
  address: ville,
  areaServed: [{ '@type': 'City', name: 'Grenoble' }, { '@type': 'AdministrativeArea', name: 'Isère' }],
  knowsAbout: [
    'culture arabe', 'culture tunisienne', 'musique orientale', 'échanges interculturels',
    'accueil des étudiants internationaux', 'Carthage', 'Grenoble', 'Méditerranée',
  ],
  knowsLanguage: ['fr', 'ar'],
  sameAs: reseauxSociaux(),
  ...(SITE.email ? { email: SITE.email } : {}),
  potentialAction: { '@type': 'JoinAction', name: 'Adhérer à l’association', target: SITE.adhesion },
});

export const siteWeb = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE.url}/#site`,
  url: SITE.url,
  name: SITE.nom,
  inLanguage: 'fr-FR',
  publisher: { '@id': ORG_ID },
});

export const filAriane = (items: { nom: string; chemin: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [{ nom: 'Accueil', chemin: '/' }, ...items].map((it, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: it.nom,
    item: url(it.chemin),
  })),
});

export const evenement = (e: { id: string; data: { titre: string; date: Date; lieu?: string; resume?: string; lien?: string } }) => ({
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: e.data.titre,
  startDate: e.data.date.toISOString(),
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  location: { '@type': 'Place', name: e.data.lieu ?? 'Grenoble', address: ville },
  description: e.data.resume ?? e.data.titre,
  image: [url('/images/og-image.jpg')],
  organizer: { '@id': ORG_ID },
  url: url('/agenda/'),
  ...(e.data.lien ? { offers: { '@type': 'Offer', url: e.data.lien, availability: 'https://schema.org/InStock' } } : {}),
});

export const article = (a: { id: string; data: { titre: string; date: Date; resume: string; image?: string } }) => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: a.data.titre,
  description: a.data.resume,
  datePublished: a.data.date.toISOString(),
  dateModified: a.data.date.toISOString(),
  inLanguage: 'fr-FR',
  image: url(a.data.image ?? '/images/og-image.jpg'),
  mainEntityOfPage: url(`/actualites/${a.id}/`),
  author: { '@id': ORG_ID },
  publisher: { '@id': ORG_ID },
});

export const faq = (questions: { q: string; r: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: questions.map((x) => ({
    '@type': 'Question',
    name: x.q,
    acceptedAnswer: { '@type': 'Answer', text: x.r },
  })),
});
