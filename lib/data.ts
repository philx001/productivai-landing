// ─── Applications ───
export interface App {
  id: string;
  name: string;
  tagline: string;
  icon: string;
  description: string;
  features: string[];
  kpiLabel: string;
  gradient: string;
  // Données pour le mockup visuel
  mockupType: 'erp' | 'crm' | 'media' | 'proximite';
  mockupData: Record<string, number | string>;
}

export const apps: App[] = [
  {
    id: 'erp',
    name: 'ERP/CRM Entreprise',
    tagline: 'Centralisez votre gestion commerciale',
    icon: '📊',
    description: 'Plateforme SaaS multi-tenant qui couvre l\'intégralité du cycle commercial : CRM prospects, devis, factures, stock et trésorerie.',
    features: [
      'Pipeline commercial Kanban avec scoring et montants pondérés',
      'Cycle documentaire complet : devis, BC, BL, facture, avoir',
      'Catalogue produits avec marge et stock multi-entrepôts',
      'Trésorerie temps réel, encaissements, créances',
      'Tableau de bord KPI dirigeant',
      'Multi-tenant avec isolation RLS PostgreSQL',
    ],
    kpiLabel: '+40% productivité commerciale',
    gradient: 'from-violet-600 to-indigo-600',
    mockupType: 'erp',
    mockupData: { ca: 245800, pipeline: 12, conversion: 67, factures: 48 },
  },
  {
    id: 'crm',
    name: 'CRM Communautaire',
    tagline: 'Pilotez vos communautés avec précision',
    icon: '👥',
    description: 'Gestion communautaire complète : membres, événements, présences, pipeline d\'intégration et engagement.',
    features: [
      'Fiches membres complètes (identité, parcours, compétences)',
      'Calendrier et pointage des présences',
      'Pipeline d\'intégration : contact → membre actif',
      'Actions terrain structurées par zone',
      'Notifications et espace de partage',
      '7 niveaux de rôles RBAC',
    ],
    kpiLabel: '-60% temps administratif',
    gradient: 'from-emerald-500 to-teal-600',
    mockupType: 'crm',
    mockupData: { membres: 342, presences: 78, integration: 24, evenements: 12 },
  },
  {
    id: 'media',
    name: 'Médiathèque Audio/Vidéo',
    tagline: 'Valorisez et mesurez vos contenus',
    icon: '🎬',
    description: 'Plateforme de diffusion audio/vidéo avec catalogue intelligent, partage social, analytics et administration multi-rôles.',
    features: [
      'Catalogue intelligent avec recherche et filtres',
      'Partage social 1 clic vers tous les réseaux',
      'Import en masse jusqu\'à 500 Mo',
      'Analytics : vues, partages, top contenus',
      'Administration multi-rôles',
      'Optimisation des coûts bande passante',
    ],
    kpiLabel: '×3 engagement audience',
    gradient: 'from-rose-500 to-orange-500',
    mockupType: 'media',
    mockupData: { vues: 12580, partages: 3420, contenus: 156, stockage: 28 },
  },
  {
    id: 'proximite',
    name: 'Proximité Habitat',
    tagline: 'Orchestrez vos forces de vente multi-sites',
    icon: '🏠',
    description: 'CRM commercial multi-sites : workflow 7 étapes, affectation intelligente, signature électronique, pilotage des objectifs.',
    features: [
      'Workflow guidé 7 étapes : qualification → signature',
      'Affectation intelligente des prospects par zone',
      'Multi-tenant natif consolidation Direction 360°',
      'Signature électronique horodatée RGPD',
      'Pilotage objectifs et primes automatiques',
      'Dashboard dirigeant : CA, conversion, performance',
    ],
    kpiLabel: '+55% taux de closing',
    gradient: 'from-cyan-500 to-blue-600',
    mockupType: 'proximite',
    mockupData: { fiches: 89, closing: 55, agences: 6, caMensuel: 234000 },
  },
];

// ─── Secteurs ───
export interface Sector {
  id: string;
  name: string;
  icon: string;
  description: string;
  benefits: string[];
  appMapping: string[];
  // Paramètres ROI spécifiques au secteur
  roi: {
    label1: string;
    label2: string;
    label3: string;
    default1: number;
    default2: number;
    default3: number;
    max1: number;
    max2: number;
    max3: number;
    step2: number;
    unit: string;
    resultLabel: string;
    impactThreshold: number;
    impactMessage: string;
  };
}

export const sectors: Sector[] = [
  {
    id: 'commerce',
    name: 'Commerce & Distribution',
    icon: '🛒',
    description: 'Cycle devis-facture automatisé, stock en temps réel, pipeline clients et pilotage multi-sites.',
    benefits: [
      'Fin des saisies manuelles et erreurs de ressaisie',
      'Visibilité temps réel sur stocks et marges',
      'Taux de conversion par commercial visible',
      'Tableau de bord pour piloter chaque point de vente',
    ],
    appMapping: ['erp', 'proximite'],
    roi: {
      label1: 'Vendeurs dans votre réseau',
      label2: 'Ventes réalisées par mois',
      label3: 'Heures de saisie évitées par vendeur/semaine',
      default1: 8, default2: 120, default3: 6,
      max1: 150, max2: 2000, max3: 20,
      step2: 10,
      unit: '€ de CA supplémentaire',
      resultLabel: 'Gain de temps commercial annuel estimé',
      impactThreshold: 80000,
      impactMessage: 'Impact significatif sur votre chiffre d\'affaires annuel',
    },
  },
  {
    id: 'services',
    name: 'Services & Conseil',
    icon: '💼',
    description: 'CRM prospects-clients, facturation projets, encaissements et rentabilité par mission.',
    benefits: [
      'Fini les feuilles de temps et Excel approximatifs',
      'Facturation projets en un clic depuis les devis',
      'Rentabilité par mission visible en temps réel',
      'Tableau de bord pour piloter votre cabinet',
    ],
    appMapping: ['erp'],
    roi: {
      label1: 'Consultants dans votre cabinet',
      label2: 'Projets / missions par mois',
      label3: 'Heures d\'admin facturation évitées / consultant / semaine',
      default1: 5, default2: 15, default3: 5,
      max1: 80, max2: 200, max3: 20,
      step2: 1,
      unit: '€ de temps facturable récupéré',
      resultLabel: 'Temps administratif récupéré en valeur annuelle',
      impactThreshold: 60000,
      impactMessage: 'Un consultant supplémentaire que vous pourriez embaucher',
    },
  },
  {
    id: 'immobilier',
    name: 'Immobilier & Transaction',
    icon: '🏢',
    description: 'Mandats, visites, pipeline offre → compromis, pilotage des négociateurs.',
    benefits: [
      'Traçabilité juridique de chaque mandat',
      'Signature électronique pour compromis',
      'Primes automatiques sur objectifs',
      'Analyse des taux de transformation par secteur',
    ],
    appMapping: ['proximite'],
    roi: {
      label1: 'Négociateurs dans votre réseau',
      label2: 'Mandats signés par mois',
      label3: 'Heures de suivi dossier gagnées / négociateur / semaine',
      default1: 6, default2: 20, default3: 7,
      max1: 100, max2: 200, max3: 20,
      step2: 1,
      unit: '€ d\'honoraires additionnels',
      resultLabel: 'Gain de productivité commerciale annuel estimé',
      impactThreshold: 90000,
      impactMessage: 'Une agence supplémentaire que vous pourriez ouvrir',
    },
  },
  {
    id: 'association',
    name: 'Associations & ONG',
    icon: '🤝',
    description: 'Adhérents, bénévoles, engagement, pipeline d\'intégration, rapports pour financeurs.',
    benefits: [
      'Visibilité sur les taux d\'engagement',
      'Détection des membres en décrochage',
      'Événements et présences simplifiés',
      'Rapports automatisés pour les financeurs',
    ],
    appMapping: ['crm'],
    roi: {
      label1: 'Bénévoles / membres actifs',
      label2: 'Membres suivis individuellement',
      label3: 'Heures de coordination gagnées / responsable / semaine',
      default1: 15, default2: 200, default3: 8,
      max1: 500, max2: 5000, max3: 20,
      step2: 50,
      unit: '€ d\'économie de fonctionnement',
      resultLabel: 'Économies de fonctionnement annuelles estimées',
      impactThreshold: 30000,
      impactMessage: 'Un poste de coordinateur supplémentaire financé',
    },
  },
  {
    id: 'creation',
    name: 'Création & Design IA',
    icon: '🎨',
    description: 'Workflow brief → livrable → validation, affectation par expertise, suivi de rentabilité.',
    benefits: [
      'Fin des briefs perdus entre Notion, Slack et Drive',
      'Traçabilité de chaque validation client',
      'Répartition optimale des projets',
      'Rentabilité par typologie de livrable',
    ],
    appMapping: ['proximite'],
    roi: {
      label1: 'Créatifs dans votre studio',
      label2: 'Projets livrés par mois',
      label3: 'Heures d\'itération évitées / créatif / semaine',
      default1: 4, default2: 8, default3: 6,
      max1: 60, max2: 100, max3: 20,
      step2: 1,
      unit: '€ de marge récupérée',
      resultLabel: 'Gain de rentabilité studio annuel estimé',
      impactThreshold: 50000,
      impactMessage: 'Un CDI créatif supplémentaire financé chaque année',
    },
  },
  {
    id: 'renovation',
    name: 'Rénovation énergétique',
    icon: '🔧',
    description: 'Pipeline de vente : qualification, devis, signature, pilotage des équipes terrain.',
    benefits: [
      'Digitalisation des fiches terrain',
      'Conformité CEE et MaPrimeRénov\' intégrée',
      'Taux de conversion par zone et commercial',
      'Tableau de bord consolidé Direction',
    ],
    appMapping: ['proximite'],
    roi: {
      label1: 'Commerciaux terrain',
      label2: 'Visites de qualification par mois',
      label3: 'Heures de paperasse gagnées / commercial / semaine',
      default1: 10, default2: 80, default3: 7,
      max1: 120, max2: 500, max3: 20,
      step2: 5,
      unit: '€ de marge additionnelle',
      resultLabel: 'Gain de productivité terrain annuel estimé',
      impactThreshold: 70000,
      impactMessage: 'Un commercial supplémentaire déployable sur le terrain',
    },
  },
];

// ─── ROI Calculator ───
export interface RoiParams {
  metric1: number;  // nombre de personnes
  metric2: number;  // volume mensuel
  metric3: number;  // heures économisées / personne / semaine
}

export interface RoiResult {
  annualGain: number;
  monthlyGain: number;
  productivityGain: number;
  description: string;
}

export function calculateRoi(sectorId: string, params: RoiParams): RoiResult {
  const sector = sectors.find(s => s.id === sectorId) || sectors[0];
  const roi = sector.roi;
  const { metric1: people, metric2: volume, metric3: hours } = params;

  // Taux horaire moyen selon le secteur
  const rates: Record<string, number> = {
    commerce: 42,
    services: 65,  // TJM plus élevé pour consultants
    immobilier: 48,
    association: 28,
    creation: 55,
    renovation: 40,
  };
  const hourlyRate = rates[sectorId] || 45;

  // Gain direct : heures économisées × taux horaire × 52 semaines
  const weeklyHours = people * hours;
  const annualDirect = weeklyHours * hourlyRate * 52;

  // Gain indirect : productivité liée au volume traité
  const baseVolume = sectorId === 'association'
    ? Math.round((volume / (people * 30)) * 100)
    : Math.round((volume / (people * 20)) * 100);

  // Bonus si gain > 5h/personne/semaine
  const productivityBonus = hours > 5 ? Math.round(hours * 0.08 * 100) : 0;

  const totalAnnual = Math.round(annualDirect * (1 + productivityBonus / 100));
  const monthlyGain = Math.round(totalAnnual / 12);
  const productivityGain = Math.min(baseVolume + productivityBonus, 300);

  // Description contextualisée
  const descriptions: Record<string, string> = {
    commerce: `Equivalent à ${Math.round(totalAnnual / 42000)} vendeur(s) temps plein`,
    services: `Soit ${Math.round(totalAnnual / 65000)} consultant(s) junior(s) par an`,
    immobilier: `Soit ${Math.round(totalAnnual / 50000)} négociateur(s) supplémentaire(s)`,
    association: `Soit ${Math.round(totalAnnual / 30000)} poste(s) de coordinateur`,
    creation: `Soit ${Math.round(totalAnnual / 55000)} CDI créatif supplémentaire`,
    renovation: `Soit ${Math.round(totalAnnual / 42000)} commercial(e)(s) terrain de plus`,
  };
  const description = descriptions[sectorId] || 'ROI estimé sur votre activité';

  return { annualGain: totalAnnual, monthlyGain, productivityGain, description };
}