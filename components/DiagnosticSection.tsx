'use client';

import { useState, useRef, useEffect } from 'react';
import { sectors } from '@/lib/data';
import { cn } from '@/lib/utils';

const challenges = [
  { id: 'time', icon: '⏱️', label: 'Gagner du temps au quotidien' },
  { id: 'sales', icon: '📈', label: 'Augmenter mes ventes' },
  { id: 'team', icon: '👥', label: 'Suivre mes équipes' },
  { id: 'admin', icon: '📋', label: 'Automatiser la paperasse' },
];

const results: Record<string, Record<string, { app: string; icon: string; desc: string; roi: string }>> = {
  time: {
    commerce: { app: 'ERP/CRM Entreprise', icon: '📊', desc: 'Automatisation du cycle devis → facture → paiement. Vos vendeurs gagnent 6h/semaine.', roi: 'Économie estimée : 18 500 €/an' },
    services: { app: 'ERP/CRM Entreprise', icon: '📊', desc: 'Facturation projet en 1 clic depuis le devis. Fin des ressaisies.', roi: 'Économie estimée : 16 000 €/an' },
    immobilier: { app: 'Proximité Habitat', icon: '🏠', desc: 'Digitalisation des mandats et suivi des compromis. Fini le papier.', roi: 'Économie estimée : 22 000 €/an' },
    association: { app: 'CRM Communautaire', icon: '👥', desc: 'Suivi des présences automatisé. Détection des décrochages.', roi: 'Économie estimée : 12 000 €/an' },
    creation: { app: 'Proximité Habitat', icon: '🏠', desc: 'Centralisation des briefs et des validations. 80% d\'itérations en moins.', roi: 'Économie estimée : 14 000 €/an' },
    renovation: { app: 'Proximité Habitat', icon: '🏠', desc: 'Fiches terrain digitalisées. Qualification client en 5 min.', roi: 'Économie estimée : 20 000 €/an' },
    rh: { app: 'CRM Communautaire', icon: '👥', desc: 'Automatisation du tri des CV et des relances candidats.', roi: 'Économie estimée : 15 000 €/an' },
    juridique: { app: 'ERP/CRM Entreprise', icon: '📊', desc: 'Modèles de documents et suivi des échéances automatisé.', roi: 'Économie estimée : 25 000 €/an' },
    social: { app: 'Médiathèque A/V', icon: '🎬', desc: 'Planning éditorial et reporting automatisés.', roi: 'Économie estimée : 10 000 €/an' },
    freelance: { app: 'ERP/CRM Entreprise', icon: '📊', desc: 'Devis automatisés, factures en 1 clic, relances programmées.', roi: 'Économie estimée : 8 000 €/an' },
  },
  sales: {
    commerce: { app: 'Proximité Habitat', icon: '🏠', desc: 'Pipeline de vente structuré. Suivi de chaque prospect jusqu\'à la signature.', roi: '+55% de closing estimé' },
    services: { app: 'ERP/CRM Entreprise', icon: '📊', desc: 'Pipeline commercial avec scoring. Priorisation des prospects chauds.', roi: '+40% de conversion estimé' },
    immobilier: { app: 'Proximité Habitat', icon: '🏠', desc: 'Suivi des mandats et des visites. Taux de transformation par négociateur.', roi: '+35% d\'honoraires' },
    association: { app: 'CRM Communautaire', icon: '👥', desc: 'Pipeline d\'intégration des nouveaux membres. Taux de rétention amélioré.', roi: '+50% de membres actifs' },
    creation: { app: 'Proximité Habitat', icon: '🏠', desc: 'Suivi des prospects et relances automatiques. Pipeline projets.', roi: '+30% de nouveaux clients' },
    renovation: { app: 'Proximité Habitat', icon: '🏠', desc: 'Qualification rapide et suivi terrain. Taux de conversion par zone.', roi: '+45% de ventes' },
    rh: { app: 'CRM Communautaire', icon: '👥', desc: 'Pipeline de recrutement clair. De l\'offre à l\'intégration.', roi: '-40% de délais recrutement' },
    juridique: { app: 'ERP/CRM Entreprise', icon: '📊', desc: 'Suivi des dossiers clients. Relances et échéances automatisées.', roi: '+25% de chiffre d\'affaires' },
    social: { app: 'Médiathèque A/V', icon: '🎬', desc: 'Reporting client automatisé. Preuve de performance pour vos annonceurs.', roi: '+30% de rétention clients' },
    freelance: { app: 'ERP/CRM Entreprise', icon: '📊', desc: 'Relances clients automatiques. Facturation sans oubli.', roi: '+20% d\'encaissements' },
  },
  team: {
    commerce: { app: 'Proximité Habitat', icon: '🏠', desc: 'Pilotage multi-sites. Performance par vendeur et par agence.', roi: 'Visibilité 360° en temps réel' },
    services: { app: 'ERP/CRM Entreprise', icon: '📊', desc: 'Tableau de bord par consultant. Rentabilité par mission.', roi: 'Pilotage de la marge par projet' },
    immobilier: { app: 'Proximité Habitat', icon: '🏠', desc: 'Objectifs et primes automatiques. Classement par négociateur.', roi: '+30% de productivité équipe' },
    association: { app: 'CRM Communautaire', icon: '👥', desc: 'Taux d\'engagement par équipe. Détection des décrocheurs.', roi: 'Fidélisation des bénévoles' },
    creation: { app: 'Proximité Habitat', icon: '🏠', desc: 'Charge de travail par créatif. Rentabilité par studio.', roi: 'Optimisation des ressources' },
    renovation: { app: 'Proximité Habitat', icon: '🏠', desc: 'Performance par commercial et par zone géographique.', roi: 'Redéploiement rapide des forces' },
    rh: { app: 'CRM Communautaire', icon: '👥', desc: 'Suivi des recruteurs. Délais et coûts par recrutement.', roi: 'Tableau de bord RH complet' },
    juridique: { app: 'ERP/CRM Entreprise', icon: '📊', desc: 'Charge par juriste. Dossiers en cours et échéances.', roi: 'Productivité des collaborateurs' },
    social: { app: 'Médiathèque A/V', icon: '🎬', desc: 'Performance par CM. Engagement par publication.', roi: 'Reporting client automatisé' },
    freelance: { app: 'ERP/CRM Entreprise', icon: '📊', desc: 'Temps passé par mission. Rentabilité par client.', roi: 'Pilotage de votre activité' },
  },
  admin: {
    commerce: { app: 'ERP/CRM Entreprise', icon: '📊', desc: 'Cycle documentaire automatisé. Devis, BC, BL, facture, avoir.', roi: '-70% de temps administratif' },
    services: { app: 'ERP/CRM Entreprise', icon: '📊', desc: 'Devis vers facture en 1 clic. Relances automatiques.', roi: '-60% d\'admin' },
    immobilier: { app: 'Proximité Habitat', icon: '🏠', desc: 'Mandats et compromis électroniques. Archivage automatique.', roi: 'Zéro papier, zéro perte' },
    association: { app: 'CRM Communautaire', icon: '👥', desc: 'Pointage automatique des présences. Rapports générés.', roi: '-80% de saisie manuelle' },
    creation: { app: 'Proximité Habitat', icon: '🏠', desc: 'Briefs, validations, livrables centralisés. Fini les allers-retours.', roi: '-50% de réunions admin' },
    renovation: { app: 'Proximité Habitat', icon: '🏠', desc: 'Fiches terrain dématérialisées. Signature électronique.', roi: 'Gain de 7h/semaine par commercial' },
    rh: { app: 'CRM Communautaire', icon: '👥', desc: 'Tri automatique des CV. Relances candidats automatisées.', roi: '-60% de temps de traitement' },
    juridique: { app: 'ERP/CRM Entreprise', icon: '📊', desc: 'Modèles d\'actes. Suivi des échéances automatisé.', roi: '-50% de temps de rédaction' },
    social: { app: 'Médiathèque A/V', icon: '🎬', desc: 'Publication multi-plateforme. Reporting automatisé.', roi: '-5h/semaine par CM' },
    freelance: { app: 'ERP/CRM Entreprise', icon: '📊', desc: 'Devis, factures, relances automatiques. Comptabilité simplifiée.', roi: '-6h/semaine d\'admin' },
  },
};

export default function DiagnosticSection() {
  const [step, setStep] = useState<'sector' | 'challenge' | 'result'>('sector');
  const [selectedSector, setSelectedSector] = useState('');
  const [selectedChallenge, setSelectedChallenge] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setScrolled(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSectorPick = (id: string) => {
    setSelectedSector(id);
    setStep('challenge');
  };

  const handleChallengePick = (id: string) => {
    setSelectedChallenge(id);
    setStep('result');
  };

  const reset = () => {
    setStep('sector');
    setSelectedSector('');
    setSelectedChallenge('');
  };

  const show = scrolled;

  return (
    <section ref={sectionRef} className="relative px-6 py-16 sm:py-20">
      <div className="pointer-events-none absolute right-0 top-1/3 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-violet-600/5 blur-[120px]" />

      <div className="relative mx-auto max-w-3xl">
        <div className={cn('mb-10 text-center transition-all duration-700', show ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0')}>
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
            Trouvez votre <span className="gradient-text">solution</span> en 2 clics
          </h2>
          <p className="mx-auto max-w-lg text-muted">
            Répondez à 2 questions et découvrez l&apos;application ProductivAI adaptée à votre besoin.
          </p>
        </div>

        {/* Conteneur du quiz */}
        <div className={cn('rounded-2xl border border-panel bg-card p-8 transition-all duration-700 sm:p-10', show ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0')}>
          {/* Progress */}
          <div className="mb-8 flex items-center gap-2">
            {['sector', 'challenge', 'result'].map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div className={cn(
                  'flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium transition-all',
                  step === s ? 'bg-violet-600 text-white' : i < ['sector', 'challenge', 'result'].indexOf(step) ? 'bg-emerald-500/20 text-emerald-400' : 'bg-zinc-800 text-zinc-500'
                )}>
                  {i < ['sector', 'challenge', 'result'].indexOf(step) ? '✓' : i + 1}
                </div>
                {i < 2 && <div className={cn('h-0.5 w-8 rounded', i < ['sector', 'challenge', 'result'].indexOf(step) ? 'bg-emerald-500' : 'bg-zinc-800')} />}
              </div>
            ))}
          </div>

          {/* Step 1 : Secteur */}
          {step === 'sector' && (
            <div key="sector">
              <p className="mb-5 text-sm font-medium text-muted-strong">1. Quel est votre secteur d&apos;activité ?</p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
                {sectors.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => handleSectorPick(s.id)}
                    className="flex flex-col items-center gap-1.5 rounded-xl border border-panel bg-black/30 p-4 transition-all hover:border-violet-500/50 hover:bg-violet-500/5"
                  >
                    <span className="text-xl">{s.icon}</span>
                    <span className="text-[10px] text-muted text-center">{s.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2 : Défi */}
          {step === 'challenge' && (
            <div key="challenge">
              <p className="mb-5 text-sm font-medium text-muted-strong">2. Quel est votre principal défi ?</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {challenges.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => handleChallengePick(c.id)}
                    className="flex items-center gap-3 rounded-xl border border-panel bg-black/30 p-5 transition-all hover:border-violet-500/50 hover:bg-violet-500/5 text-left"
                  >
                    <span className="text-xl">{c.icon}</span>
                    <span className="text-sm text-muted-strong">{c.label}</span>
                  </button>
                ))}
              </div>
              <button onClick={reset} className="mt-4 text-xs text-muted hover:text-fg">← Revenir au choix du secteur</button>
            </div>
          )}

          {/* Step 3 : Résultat */}
          {step === 'result' && selectedChallenge && selectedSector && (
            <div key="result">
              {(() => {
                const r = results[selectedChallenge]?.[selectedSector];
                if (!r) return <p className="text-muted">Analyse en cours...</p>;
                return (
                  <div className="text-center">
                    <p className="mb-1 text-xs text-muted">Solution recommandée</p>
                    <div className="mb-4 inline-flex items-center gap-3 rounded-full bg-violet-500/10 px-6 py-2">
                      <span className="text-xl">{r.icon}</span>
                      <span className="text-lg font-semibold text-fg">{r.app}</span>
                    </div>
                    <p className="mx-auto mb-6 max-w-md text-sm text-muted leading-relaxed">{r.desc}</p>
                    <div className="mb-6 inline-block rounded-lg bg-emerald-500/10 px-5 py-3">
                      <p className="text-sm font-semibold text-emerald-400">{r.roi}</p>
                    </div>
                    <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                      <a
                        href="mailto:contact@productivai.fr"
                        className="rounded-full bg-violet-600 px-8 py-3 text-sm font-medium text-white transition-all hover:bg-violet-500"
                      >
                        Demander une démo personnalisée
                      </a>
                      <button
                        onClick={reset}
                        className="rounded-full border border-label px-8 py-3 text-sm font-medium text-muted transition-all hover:text-fg"
                      >
                        Recommencer le diagnostic
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}