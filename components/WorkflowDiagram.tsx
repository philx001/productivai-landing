'use client';

import { cn } from '@/lib/utils';

interface WorkflowStep {
  icon: string;
  label: string;
}

const workflows: Record<string, { title: string; steps: WorkflowStep[] }> = {
  erp: {
    title: 'Cycle commercial automatisé',
    steps: [
      { icon: '📝', label: 'Devis' },
      { icon: '📋', label: 'BC' },
      { icon: '📦', label: 'BL' },
      { icon: '🧾', label: 'Facture' },
      { icon: '💶', label: 'Paiement' },
    ],
  },
  crm: {
    title: 'Parcours membre',
    steps: [
      { icon: '👋', label: 'Contact' },
      { icon: '📞', label: 'Suivi' },
      { icon: '🎓', label: 'Formation' },
      { icon: '✅', label: 'Actif' },
    ],
  },
  media: {
    title: 'Diffusion de contenu',
    steps: [
      { icon: '📤', label: 'Import' },
      { icon: '🏷️', label: 'Catégorisation' },
      { icon: '📱', label: 'Partage' },
      { icon: '📊', label: 'Analytics' },
    ],
  },
  proximite: {
    title: 'Pipeline de vente',
    steps: [
      { icon: '🎯', label: 'Prospect' },
      { icon: '📋', label: 'Qualification' },
      { icon: '✍️', label: 'Signature' },
      { icon: '✅', label: 'Validé' },
    ],
  },
  rh: {
    title: 'Processus de recrutement',
    steps: [
      { icon: '📢', label: 'Offre' },
      { icon: '📥', label: 'Candidatures' },
      { icon: '🎤', label: 'Entretiens' },
      { icon: '🤝', label: 'Embauche' },
      { icon: '📋', label: 'Intégration' },
    ],
  },
  juridique: {
    title: 'Gestion de dossiers',
    steps: [
      { icon: '📁', label: 'Dossier' },
      { icon: '✍️', label: 'Rédaction' },
      { icon: '👁️', label: 'Revue' },
      { icon: '✅', label: 'Validation' },
      { icon: '📚', label: 'Archivage' },
    ],
  },
  social: {
    title: 'Chaîne éditoriale',
    steps: [
      { icon: '📝', label: 'Brief' },
      { icon: '🎨', label: 'Création' },
      { icon: '📅', label: 'Planning' },
      { icon: '🚀', label: 'Publication' },
      { icon: '📊', label: 'Analytics' },
    ],
  },
  freelance: {
    title: "Cycle d'activité",
    steps: [
      { icon: '🤝', label: 'Prospect' },
      { icon: '📝', label: 'Devis' },
      { icon: '💼', label: 'Mission' },
      { icon: '🧾', label: 'Facture' },
      { icon: '💶', label: 'Paiement' },
    ],
  },
};

const gradientMap: Record<string, string> = {
  erp: 'from-violet-600 to-indigo-600',
  crm: 'from-emerald-500 to-teal-600',
  media: 'from-rose-500 to-orange-500',
  proximite: 'from-cyan-500 to-blue-600',
  rh: 'from-blue-500 to-indigo-600',
  juridique: 'from-amber-500 to-orange-600',
  social: 'from-pink-500 to-rose-600',
  freelance: 'from-teal-500 to-emerald-600',
};

function StepIcon({ icon, label, gradient, large }: { icon: string; label: string; gradient: string; large: boolean }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className={cn(
        'flex items-center justify-center rounded-full shadow-md',
        large ? 'h-11 w-11 sm:h-14 sm:w-14 text-base sm:text-xl' : 'h-9 w-9 sm:h-11 sm:w-11 text-sm sm:text-base',
        gradient
      )}>
        {icon}
      </div>
      <span className={cn(
        'text-center font-medium text-zinc-400 leading-tight',
        large ? 'text-[10px] sm:text-xs max-w-[4rem] sm:max-w-[5rem]' : 'text-[9px] sm:text-[11px] max-w-[3.5rem] sm:max-w-[4rem]'
      )}>
        {label}
      </span>
    </div>
  );
}

function StepRow({ steps, gradient, large, startIndex }: { steps: WorkflowStep[]; gradient: string; large: boolean; startIndex: number }) {
  return (
    <div className="flex items-center justify-center gap-1 sm:gap-2">
      {steps.map((step, i) => (
        <div key={step.label + i} className="flex items-center gap-1 sm:gap-2">
          <StepIcon icon={step.icon} label={step.label} gradient={gradient} large={large} />
          {i < steps.length - 1 && (
            <span className={cn('text-zinc-700 shrink-0', large ? 'text-base sm:text-xl' : 'text-sm sm:text-base')}>
              →
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

export default function WorkflowDiagram({ type, gradient }: { type: string; gradient: string }) {
  const wf = workflows[type];
  if (!wf) return null;

  const g = gradientMap[type] || gradient;
  const steps = wf.steps;
  const has5 = steps.length >= 5;

  // 5+ steps → split into 2 rows (3 + 2)
  const row1 = has5 ? steps.slice(0, 3) : steps;
  const row2 = has5 ? steps.slice(3) : [];

  return (
    <div className="w-full rounded-xl border border-zinc-700/50 bg-black/40 p-3 sm:p-5">
      <span className="mb-3 block text-[10px] font-semibold uppercase tracking-wider text-zinc-500 sm:text-sm">
        {wf.title}
      </span>

      {/* Ligne 1 — toujours visible */}
      <div className="flex flex-col items-center gap-2">
        <StepRow steps={row1} gradient={g} large={!has5} startIndex={0} />

        {/* Connecteur vertical entre les 2 lignes (pour 5 étapes) */}
        {has5 && (
          <div className="flex items-center gap-2">
            <div className="h-5 w-0.5 bg-zinc-700 rounded-full" />
            <span className="text-zinc-700 text-xs">↓</span>
            <div className="h-5 w-0.5 bg-zinc-700 rounded-full" />
          </div>
        )}

        {/* Ligne 2 — seulement pour 5 étapes */}
        {has5 && (
          <StepRow steps={row2} gradient={g} large={false} startIndex={3} />
        )}
      </div>
    </div>
  );
}