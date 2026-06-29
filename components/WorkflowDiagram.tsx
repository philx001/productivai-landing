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
  const steps = wf.steps;
  const has5 = steps.length >= 5;

  return (
    <div className="w-full rounded-xl border border-workflow bg-workflow p-3 sm:p-4">
      <span className="mb-2 block text-[10px] font-semibold uppercase tracking-wider text-step-label sm:text-xs">
        {wf.title}
      </span>
      <div className={cn(
        'flex items-center justify-center',
        has5 ? 'gap-0.5 sm:gap-1' : 'gap-1 sm:gap-2'
      )}>
        {steps.map((step, i) => (
          <div key={step.label + i} className="flex items-center gap-0.5 sm:gap-1">
            <div className="flex flex-col items-center gap-1">
              <div className={cn(
                'flex items-center justify-center rounded-full shadow-md',
                has5 ? 'h-8 w-8 sm:h-11 sm:w-11 text-xs sm:text-base' : 'h-9 w-9 sm:h-12 sm:w-12 text-sm sm:text-lg',
                g
              )}>
                {step.icon}
              </div>
              <span className={cn(
                'text-center font-medium leading-tight text-step-label',
                has5 ? 'text-[8px] sm:text-[10px] max-w-[2.5rem] sm:max-w-[3.5rem]' : 'text-[9px] sm:text-xs max-w-[3rem] sm:max-w-[4.5rem]'
              )}>
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <span className={cn(
                'text-step-arrow shrink-0',
                has5 ? 'text-xs sm:text-base' : 'text-sm sm:text-xl'
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