// ─── Données des applications ProductivAI ───

export interface App {
  id: string;
  name: string;
  tagline: string;
  icon: string;
  description: string;
  features: string[];
  kpiLabel: string;
  gradient: string;
  url: string;
}

export interface Sector {
  id: string;
  name: string;
  icon: string;
  description: string;
  benefits: string[];
  appMapping: string[];
}

export const apps: App[] = [
  {
    id: 'erp',
    name: 'ERP/CRM Entreprise',
    tagline: 'Centralisez votre gestion commerciale',
    icon: '📊',
    description:
      'Plateforme SaaS multi-tenant qui couvre l\'intégralité du cycle commercial : CRM prospects, devis, bons de commande, factures, stock et trésorerie. Un tableau de bord dirigeant pour piloter en temps réel.',
    features: [
      'Pipeline commercial Kanban avec scoring et montants pondérés',
      'Cycle documentaire complet : devis → BC → BL → facture → avoir',
      'Catalogue produits avec calcul de marge et stock multi-entrepôts',
      'Trésorerie temps réel, encaissements, créances et dépenses',
      'Tableau de bord KPI : CA, marge, pipeline, alertes',
      'Multi-tenant avec isolation RLS PostgreSQL',
    ],
    kpiLabel: '+40% de productivité commerciale',
    gradient: 'from-violet-600 to-indigo-600',
    url: 'https://crm-famille-eglise.vercel.app/',
  },
  {
    id: 'crm',
    name: 'CRM Communautaire',
    tagline: 'Pilotez vos communautés avec précision',
    icon: '👥',
    description:
      'Application de gestion communautaire complète : suivi des membres, calendrier d\'événements, pointage des présences, pipeline d\'intégration et tableau de bord de l\'engagement.',
    features: [
      'Gestion centralisée des membres avec fiches complètes',
      'Calendrier et suivi des présences avec historique individuel',
      'Pipeline d\'intégration : contact → formation → membre actif',
      'Actions terrain structurées par zone géographique',
      'Notifications prioritaires et espace de partage',
      '7 niveaux de rôles RBAC + isolation des données',
    ],
    kpiLabel: '-60% de temps administratif',
    gradient: 'from-emerald-500 to-teal-600',
    url: '#',
  },
  {
    id: 'media',
    name: 'Médiathèque Audio/Vidéo',
    tagline: 'Valorisez et mesurez vos contenus',
    icon: '🎬',
    description:
      'Plateforme de diffusion de contenus audio/vidéo avec catalogue intelligent, partage social multi-plateforme, analytics d\'audience et administration multi-rôles.',
    features: [
      'Catalogue intelligent avec recherche textuelle et filtres',
      'Partage social 1 clic : Facebook, X, LinkedIn, WhatsApp, Telegram',
      'Import en masse jusqu\'à 500 Mo/fichier',
      'Tableau de bord analytics : vues, partages, top contenus',
      'Administration multi-rôles (admin, gestionnaire, lecteur)',
      'Optimisation des coûts bande passante',
    ],
    kpiLabel: '×3 l\'engagement audience',
    gradient: 'from-rose-500 to-orange-500',
    url: 'https://temoignages-icc.vercel.app/',
  },
  {
    id: 'proximite',
    name: 'Proximité Habitat',
    tagline: 'Orchestrez vos forces de vente multi-sites',
    icon: '🏠',
    description:
      'CRM commercial multi-sites pour réseaux de vente : workflow guidé en 7 étapes, affectation intelligente des prospects, signature électronique et pilotage des objectifs commerciaux.',
    features: [
      'Workflow guidé 7 étapes : qualification → signature électronique',
      'Affectation intelligente des prospects par zone et expertise',
      'Multi-tenant natif avec consolidation Direction 360°',
      'Signature électronique horodatée conforme RGPD',
      'Pilotage objectifs et primes automatiques',
      'Dashboard dirigeant : CA, taux conversion, performance par agence',
    ],
    kpiLabel: '+55% de taux de closing',
    gradient: 'from-cyan-500 to-blue-600',
    url: 'https://proximite-habitat.vercel.app/reporting',
  },
];

export const sectors: Sector[] = [
  {
    id: 'commerce',
    name: 'Commerce & Distribution',
    icon: '🛒',
    description:
      'Cycle devis-facture automatisé, gestion de stock en temps réel, pipeline clients et pilotage des équipes de vente multi-sites.',
    benefits: [
      'Fin des saisies manuelles et des erreurs de ressaisie',
      'Visibilité en temps réel sur les stocks et les marges',
      'Pipeline commercial clair : taux de conversion par commercial',
      'Tableau de bord pour piloter chaque point de vente',
    ],
    appMapping: ['erp', 'proximite'],
  },
  {
    id: 'services',
    name: 'Services & Conseil',
    icon: '💼',
    description:
      'CRM prospects-clients, facturation projets, suivi des encaissements et pilotage de la rentabilité par mission.',
    benefits: [
      'Fini les fichiers Excel et les feuilles de temps approximatives',
      'Suivi de chaque client : historique des échanges et des documents',
      'Facturation projets en un clic depuis les devis',
      'Rentabilité par mission visible en temps réel',
    ],
    appMapping: ['erp'],
  },
  {
    id: 'immobilier',
    name: 'Immobilier & Transaction',
    icon: '🏢',
    description:
      'Gestion des mandats, suivi des visites, pipeline offre → compromis → acte authentique, pilotage des négociateurs.',
    benefits: [
      'Tragabilité juridique de chaque mandat et compromis',
      'Signature électronique pour les actes sous seing privé',
      'Déclenchement automatique des primes sur objectifs',
      'Analyse des taux de transformation par secteur géographique',
    ],
    appMapping: ['proximite'],
  },
  {
    id: 'association',
    name: 'Associations & ONG',
    icon: '🤝',
    description:
      'Gestion des adhérents et bénévoles, suivi de l\'engagement, pipeline d\'intégration et rapports pour les financeurs.',
    benefits: [
      'Visibilité sur les taux de participation et d\'engagement',
      'Détection des membres en décrochage avant qu\'ils ne partent',
      'Gestion simplifiée des événements et des présences',
      'Rapports automatisés pour les financeurs',
    ],
    appMapping: ['crm'],
  },
  {
    id: 'creation',
    name: 'Création & Design IA',
    icon: '🎨',
    description:
      'Workflow brief → livrable → validation, affectation par expertise, suivi de rentabilité par studio ou par créatif.',
    benefits: [
      'Fin des briefs perdus entre Notion, Slack et Drive',
      'Tragabilité de chaque validation client (anti-litige)',
      'Répartition optimale des projets par compétence',
      'Rentabilité par typologie de livrable',
    ],
    appMapping: ['proximite'],
  },
  {
    id: 'renovation',
    name: 'Rénovation Énergétique',
    icon: '🔧',
    description:
      'Pipeline de vente complet pour les réseaux de rénovation : qualification, devis, signature, pilotage des équipes terrain.',
    benefits: [
      'Digitalisation des fiches de renseignement terrain',
      'Conformité CEE et MaPrimeRénov\' intégrée',
      'Suivi des taux de transformation par zone et par commercial',
      'Tableau de bord consolidé pour la Direction Générale',
    ],
    appMapping: ['proximite'],
  },
];

// ─── ROI Simulator ───
export function calculateRoi(
  employees: number,
  monthlyVolume: number,
  hoursSaved: number
): { annualSavings: number; monthlySavings: number; hourlyGain: number; productivityGain: number } {
  const hourlyRate = 45; // taux horaire moyen cadre PME
  const monthlyHours = employees * hoursSaved * 4.33; // heures économisées/mois
  const monthlySavings = monthlyHours * hourlyRate;
  const annualSavings = monthlySavings * 12;

  // Gain de productivité basé sur le volume traité
  const productivityGain = Math.round((monthlyVolume / (employees * 20)) * 100);

  return {
    annualSavings: Math.round(annualSavings),
    monthlySavings: Math.round(monthlySavings),
    hourlyGain: Math.round(hoursSaved * employees),
    productivityGain: Math.min(productivityGain, 300),
  };
}