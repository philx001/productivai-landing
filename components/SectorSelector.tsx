'use client';

import { useState, useRef, useEffect } from 'react';
import { sectors } from '@/lib/data';
import { cn } from '@/lib/utils';
import WorkflowDiagram from './WorkflowDiagram';

interface Props {
  activeSector: string;
  onSectorChange: (id: string) => void;
}

const sectorWorkflows: Record<string, string[]> = {
  commerce: ['erp', 'proximite'],
  services: ['erp'],
  immobilier: ['proximite'],
  association: ['crm'],
  creation: ['proximite'],
  renovation: ['proximite'],
  rh: ['rh'],
  juridique: ['juridique'],
  social: ['social', 'media'],
  freelance: ['freelance'],
};

const ROW1_COUNT = 6;

export default function SectorSelector({ activeSector, onSectorChange }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setScrolled(true); observer.disconnect(); }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const current = sectors.find((s) => s.id === activeSector)!;
  const row1 = sectors.slice(0, ROW1_COUNT);
  const row2 = sectors.slice(ROW1_COUNT);
  const workflows = sectorWorkflows[activeSector] || [activeSector];
  const show = scrolled;

  return (
    <section id="sectors" className="relative px-6 py-24 sm:py-32">
      <div className="pointer-events-none absolute left-1/3 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-cyan-500/5 blur-[100px]" />

      <div className="relative mx-auto max-w-6xl">
        <div className={cn('mb-12 text-center transition-all duration-700', show ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0')}>
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
            Adapté à <span className="gradient-text">votre secteur</span>
          </h2>
          <p className="mx-auto max-w-2xl text-muted">
            Cliquez sur votre secteur pour voir les automatisations possibles, puis estimez votre gain.
          </p>
        </div>

        {/* Ligne 1 */}
        <div className={cn('mb-3 flex flex-wrap justify-center gap-2 transition-all duration-700', show ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0')}>
          {row1.map((s) => (
            <button
              key={s.id}
              onClick={() => onSectorChange(s.id)}
              className={cn(
                'flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all',
                activeSector === s.id
                  ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/25'
                  : 'bg-tab text-tab hover-bg-tab hover-text-tab'
              )}
            >
              <span>{s.icon}</span>
              {s.name}
            </button>
          ))}
        </div>

        {/* Ligne 2 */}
        <div className={cn('mb-10 flex flex-wrap justify-center gap-2 transition-all duration-700', show ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0')}>
          {row2.map((s) => (
            <button
              key={s.id}
              onClick={() => onSectorChange(s.id)}
              className={cn(
                'flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all',
                activeSector === s.id
                  ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/25'
                  : 'bg-tab text-tab hover-bg-tab hover-text-tab'
              )}
            >
              <span>{s.icon}</span>
              {s.name}
            </button>
          ))}
        </div>

        {/* Panneau secteur */}
        <div
          key={activeSector}
          className={cn(
            'rounded-2xl border border-panel bg-card p-6 transition-all duration-500 sm:p-12',
            show ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          )}
        >
          <div className="grid gap-10">
            <div>
              <h3 className="mb-3 text-xl font-semibold sm:text-2xl">{current.icon} {current.name}</h3>
              <p className="mb-6 text-sm text-muted sm:text-base">{current.description}</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {current.benefits.map((b) => (
                  <div key={b} className="flex items-start gap-3 text-sm text-muted-strong">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-benefit text-xs text-benefit">✓</span>
                    {b}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="mb-5 text-sm font-semibold uppercase tracking-wider text-cyan-400">
                Automatisations possibles dans ce secteur
              </h4>
              <div className={cn('grid gap-6', workflows.length > 1 ? 'sm:grid-cols-2' : 'sm:grid-cols-1')}>
                {workflows.map((wf) => (
                  <div key={wf} className="scale-100 origin-top">
                    <WorkflowDiagram type={wf} gradient="from-violet-600 to-indigo-600" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}