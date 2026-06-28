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

export default function WorkflowDiagram({ type, gradient }: { type: string; gradient: string }) {
  const wf = workflows[type];
  if (!wf) return null;

  const g = gradientMap[type] || gradient;
  const has5 = wf.steps.length >= 5;

  return (
    <div className="w-full rounded-xl border border-zinc-700/50 bg-black/40 p-4 sm:p-5">
      <span className="mb-3 block text-xs font-semibold uppercase tracking-wider text-zinc-500 sm:text-sm">
        {wf.title}
      </span>
      <div className="flex items-center justify-between gap-1 sm:gap-2">
        {wf.steps.map((step, i) => (
          <div key={step.label} className="flex items-center gap-1 sm:gap-2">
            {/* Step circle */}
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={cn(
                  'flex items-center justify-center rounded-full shadow-md',
                  has5 ? 'h-9 w-9 sm:h-12 sm:w-12 text-sm sm:text-lg' : 'h-10 w-10 sm:h-14 sm:w-14 text-base sm:text-xl',
                  g
                )}
              >
                {step.icon}
              </div>
              <span className={cn(
                'text-center font-medium text-zinc-400 leading-tight',
                has5 ? 'text-[9px] sm:text-xs max-w-[3.5rem] sm:max-w-[5rem]' : 'text-[10px] sm:text-xs max-w-[4rem] sm:max-w-[5rem]'
              )}>
                {step.label}
              </span>
            </div>
            {/* Arrow */}
            {i < wf.steps.length - 1 && (
              <span className={cn(
                'text-zinc-700 shrink-0',
                has5 ? 'text-sm sm:text-xl' : 'text-base sm:text-2xl'
              )}>
                →
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}