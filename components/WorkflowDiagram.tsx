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
      { icon: '📋', label: 'Bon commande' },
      { icon: '📦', label: 'Bon livraison' },
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
      { icon: '✅', label: 'Membre actif' },
    ],
  },
  media: {
    title: 'Diffusion de contenu',
    steps: [
      { icon: '📤', label: 'Import' },
      { icon: '🏷️', label: 'Catégorisation' },
      { icon: '📱', label: 'Partage social' },
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
};

export default function WorkflowDiagram({ type, gradient }: { type: string; gradient: string }) {
  const wf = workflows[type];
  if (!wf) return null;

  return (
    <div className="w-full rounded-lg border border-zinc-700/50 bg-black/40 p-3">
      <span className="mb-2 block text-[9px] font-semibold uppercase tracking-wider text-zinc-500">{wf.title}</span>
      <div className="flex items-center justify-between gap-0.5">
        {wf.steps.map((step, i) => (
          <div key={step.label} className="flex items-center gap-0.5">
            <div className="flex flex-col items-center gap-0.5">
              <div className={cn('flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br text-xs shadow-sm', gradient)}>
                {step.icon}
              </div>
              <span className="text-[7px] text-zinc-500 text-center leading-tight max-w-[3rem]">{step.label}</span>
            </div>
            {i < wf.steps.length - 1 && (
              <span className="text-zinc-700 text-xs mt-[-0.5rem]">→</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}