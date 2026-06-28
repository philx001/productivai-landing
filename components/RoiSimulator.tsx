'use client';

import { useState, useRef, useEffect } from 'react';
import { calculateRoi, sectors } from '@/lib/data';
import { cn } from '@/lib/utils';

interface Props {
  sectorId: string;
}

// ─── Cas concrets par secteur ───
const caseStudies: Record<string, { scenario: string; detail: string }> = {
  commerce: {
    scenario: 'Un réseau de 8 vendeurs réalisant 120 ventes/mois',
    detail: 'Chaque vendeur passe ~6h/semaine à ressaisir des commandes dans Excel, éditer des factures manuellement et réconcilier les paiements. Notre ERP automatise tout le cycle devis-facture-paiement, libérant ces heures pour la vente terrain.',
  },
  services: {
    scenario: 'Un cabinet de 5 consultants gérant 15 projets/mois',
    detail: 'Chaque consultant perd ~5h/semaine en facturation manuelle, relances clients et suivi de temps. Notre CRM projet automatisé transforme les devis en factures en un clic et suit la rentabilité par mission en temps réel.',
  },
  immobilier: {
    scenario: 'Un réseau de 6 négociateurs signant 20 mandats/mois',
    detail: 'Chaque négociateur passe ~7h/semaine à gérer les fiches papier, les relances et la coordination des visites. Notre CRM multi-sites digitalise tout le workflow du mandat à l\'acte authentique.',
  },
  association: {
    scenario: 'Une association de 15 bénévoles suivant 200 membres',
    detail: 'Chaque responsable perd ~8h/semaine en tableaux Excel, pointages manuels et relances individuelles. Notre CRM communautaire automatise le suivi des présences et détecte les membres en décrochage avant qu\'ils ne partent.',
  },
  creation: {
    scenario: 'Un studio de 4 créatifs livrant 8 projets/mois',
    detail: 'Chaque créatif perd ~6h/semaine en allers-retours de validation, fichiers éparpillés et réunions de coordination. Notre plateforme centralise briefs, validations et livrables avec traçabilité complète.',
  },
  renovation: {
    scenario: 'Un réseau de 10 commerciaux réalisant 80 visites/mois',
    detail: 'Chaque commercial passe ~7h/semaine en paperasse administrative : fiches de visite papier, devis manuscrits, photos à trier. Notre solution digitalise toute la chaîne de qualification à la signature.',
  },
  rh: {
    scenario: 'Un pôle RH de 3 recruteurs traitant 50 candidatures/mois',
    detail: 'Chaque recruteur passe ~8h/semaine à trier des CV, envoyer des relances manuelles et coordonner les entretiens. Notre outil automatise le sourcing, le suivi des candidatures et l\'intégration des nouveaux embauchés.',
  },
  juridique: {
    scenario: 'Un cabinet de 3 juristes gérant 15 dossiers/mois',
    detail: 'Chaque juriste perd ~7h/semaine en recherche documentaire, rédaction de templates et suivi des échéances. Notre plateforme centralise les dossiers, automatise la génération d\'actes et sécurise la traçabilité des validations.',
  },
  social: {
    scenario: 'Une agence de 2 community managers planifiant 40 publications/mois',
    detail: 'Chaque CM passe ~5h/semaine à compiler des rapports d\'engagement, exporter des statistiques et coordonner les publications entre clients et validateurs. Notre médiathèque centralise la création, le planning et les analytics.',
  },
  freelance: {
    scenario: 'Un freelance facturant 8 clients par mois',
    detail: 'Vous perdez ~6h/semaine en devis à refaire, factures à rédiger, relances à envoyer et comptabilité à tenir. Notre ERP simplifié automatise vos documents, vos rappels et vous donne une vue claire sur votre trésorerie.',
  },
};

export default function RoiSimulator({ sectorId }: Props) {
  const sector = sectors.find((s) => s.id === sectorId) || sectors[0];
  const cfg = sector.roi;
  const cs = caseStudies[sectorId] || caseStudies['commerce'];

  const [m1, setM1] = useState(cfg.default1);
  const [m2, setM2] = useState(cfg.default2);
  const [m3, setM3] = useState(cfg.default3);
  const [scrolled, setScrolled] = useState(false);
  const [displayAnnual, setDisplayAnnual] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const roi = calculateRoi(sectorId, { metric1: m1, metric2: m2, metric3: m3 });

  // Reset on sector change
  useEffect(() => {
    setM1(cfg.default1);
    setM2(cfg.default2);
    setM3(cfg.default3);
  }, [sectorId]);

  // Animate counter
  useEffect(() => {
    const start = displayAnnual;
    const end = roi.annualGain;
    const duration = 800;
    const startTime = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayAnnual(Math.round(start + (end - start) * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [roi.annualGain]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setScrolled(true); observer.disconnect(); }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const fmt = (n: number) => new Intl.NumberFormat('fr-FR').format(n);
  const show = scrolled;

  // Détail du calcul
  const calcSteps = [
    `${m1} personne(s) × ${m3}h/sem × 52 semaines = ${m1 * m3 * 52}h économisées/an`,
    `${m1 * m3 * 52}h × taux horaire secteur = ${fmt(roi.annualGain)} €`,
  ];

  return (
    <section id="simulator" ref={sectionRef} className="relative px-6 py-24 sm:py-32">
      <div className="pointer-events-none absolute right-0 top-1/3 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-violet-600/5 blur-[120px]" />

      <div className="relative mx-auto max-w-4xl">
        {/* Header */}
        <div className={cn('mb-12 text-center transition-all duration-700', show ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0')}>
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
            Simulateur <span className="gradient-text">{sector.name}</span>
          </h2>
          <p className="mx-auto max-w-xl text-zinc-400">
            Ajustez les curseurs selon votre situation. Le gain se recalcule en temps réel.
          </p>
        </div>

        {/* ─── Case study ─── */}
        <div
          key={sectorId + '-case'}
          className={cn(
            'mb-6 rounded-xl border border-violet-500/20 bg-violet-500/5 p-5 transition-all duration-700',
            show ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          )}
        >
          <div className="flex items-start gap-3">
            <span className="mt-0.5 shrink-0 text-lg">{sector.icon}</span>
            <div>
              <p className="mb-1 text-sm font-medium text-violet-200">
                Cas concret : {cs.scenario}
              </p>
              <p className="text-xs leading-relaxed text-zinc-400">{cs.detail}</p>
            </div>
          </div>
        </div>

        {/* ─── Simulator ─── */}
        <div className={cn('rounded-2xl border border-zinc-800 bg-card p-8 transition-all duration-700 sm:p-10', show ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0')}>
          <div className="grid gap-8 lg:grid-cols-5">
            {/* Controls */}
            <div className="space-y-7 lg:col-span-3">
              <Slider label={cfg.label1} min={1} max={cfg.max1} value={m1} onChange={setM1} />
              <Slider label={cfg.label2} min={5} max={cfg.max2} step={cfg.step2} value={m2} onChange={setM2} />
              <Slider label={cfg.label3} min={0} max={cfg.max3} value={m3} onChange={setM3} />
            </div>

            {/* Result */}
            <div className="flex flex-col items-center justify-center rounded-xl border border-zinc-800 bg-black/40 p-8 lg:col-span-2">
              <p className="mb-1 text-center text-sm text-zinc-500">{cfg.resultLabel}</p>
              <div className="mb-3 text-center">
                <span className="text-4xl font-bold gradient-text sm:text-5xl">{fmt(displayAnnual)}</span>
                <span className="ml-1 text-xl text-zinc-400">€</span>
              </div>
              <p className="mb-4 text-center text-xs text-zinc-500">{cfg.unit}</p>

              <div className="grid w-full grid-cols-2 gap-3 text-center text-xs">
                <div className="rounded-lg bg-zinc-800/50 p-3">
                  <p className="text-zinc-500">Par mois</p>
                  <p className="text-base font-semibold text-white">{fmt(roi.monthlyGain)} €</p>
                </div>
                <div className="rounded-lg bg-zinc-800/50 p-3">
                  <p className="text-zinc-500">Gain productivité</p>
                  <p className="text-base font-semibold text-cyan-400">+{roi.productivityGain}%</p>
                </div>
              </div>

              {roi.annualGain > cfg.impactThreshold && (
                <div className="mt-4 flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-2 text-xs text-emerald-400">
                  <span>💡</span>
                  {cfg.impactMessage}
                </div>
              )}

              <p className="mt-3 text-[10px] text-zinc-600 italic text-center">{roi.description}</p>
            </div>
          </div>
        </div>

        {/* ─── Détail du calcul ─── */}
        <div
          key={sectorId + '-calc'}
          className={cn(
            'mt-4 rounded-xl border border-zinc-800 bg-black/30 p-4 transition-all duration-700',
            show ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          )}
        >
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">Comment ce chiffre est calculé</p>
          <div className="space-y-1">
            {calcSteps.map((step, i) => (
              <p key={i} className="text-xs text-zinc-400">
                {i + 1}. {step}
              </p>
            ))}
            <p className="mt-1 text-[10px] text-zinc-600">
              * Le gain réel dépend du secteur, de votre organisation et des outils déjà en place. Ce simulateur donne un ordre de grandeur basé sur des moyennes constatées.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className={cn('mt-8 text-center transition-all duration-700', show ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0')}>
          <p className="mb-4 text-sm text-zinc-500">
            Vous voulez un chiffrage précis pour votre activité ? Contactez-nous.
          </p>
          <a
            href="mailto:contact@productivai.fr"
            className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-8 py-3.5 text-base font-medium text-white transition-all hover:bg-violet-500"
          >
            Demander mon analyse personnalisée →
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Slider ───
function Slider({ label, min, max, step, value, onChange }: {
  label: string; min: number; max: number; step?: number; value: number; onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label className="text-sm font-medium text-zinc-300">{label}</label>
        <span className="text-lg font-bold text-white">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step ?? 1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="roi-slider w-full"
      />
      <div className="mt-1 flex justify-between text-xs text-zinc-600">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}