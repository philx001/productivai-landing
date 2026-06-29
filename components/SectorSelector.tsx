'use client';

import { useRef, useEffect, useState } from 'react';
import { sectors } from '@/lib/data';
import { cn } from '@/lib/utils';
import WorkflowDiagram from './WorkflowDiagram';

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

export default function SectorSelector() {
  const [scrolled, setScrolled] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setScrolled(true); observer.disconnect(); }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const show = scrolled;

  return (
    <section id="sectors" ref={sectionRef} className="relative px-6 py-16 sm:py-20">
      <div className="pointer-events-none absolute left-1/3 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-cyan-500/5 blur-[100px]" />

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <div className={cn('mb-12 text-center transition-all duration-700', show ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0')}>
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
            Adapté à <span className="gradient-text">votre secteur</span>
          </h2>
          <p className="mx-auto max-w-2xl text-muted">
            Découvrez les automatisations possibles pour votre activité.
          </p>
        </div>

        {/* Sector cards grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sectors.map((sector, index) => {
            const workflows = sectorWorkflows[sector.id] || [sector.id];
            return (
              <div
                key={sector.id}
                className={cn(
                  'rounded-xl border border-panel bg-card p-5 transition-all duration-500',
                  show ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                )}
                style={{ transitionDelay: `${index * 60}ms` }}
              >
                {/* Icon + name */}
                <div className="mb-3 flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-500/15 text-lg">
                    {sector.icon}
                  </span>
                  <h3 className="text-base font-semibold">{sector.name}</h3>
                </div>

                {/* Description */}
                <p className="mb-3 text-xs text-muted leading-relaxed">{sector.description}</p>

                {/* Benefits as compact list */}
                <div className="mb-3 flex flex-wrap gap-1.5">
                  {sector.benefits.slice(0, 3).map((b) => (
                    <span key={b} className="inline-flex items-center gap-1 rounded-full bg-benefit px-2 py-0.5 text-[10px] text-benefit">
                      ✓ {b.length > 30 ? b.slice(0, 30) + '…' : b}
                    </span>
                  ))}
                </div>

                {/* Workflow diagram */}
                <div className="pointer-events-none">
                  {workflows.slice(0, 1).map((wf) => (
                    <WorkflowDiagram key={wf} type={wf} gradient="from-violet-600 to-indigo-600" />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
