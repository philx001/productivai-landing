'use client';

import { useState, useRef, useEffect } from 'react';
import { apps } from '@/lib/data';
import { cn } from '@/lib/utils';
import WorkflowDiagram from './WorkflowDiagram';

export default function AppsSection() {
  const [expanded, setExpanded] = useState<string | null>(null);
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
    <section id="apps" ref={sectionRef} className="relative px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className={cn('mb-16 text-center transition-all duration-700', show ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0')}>
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
            Nos <span className="gradient-text">réalisations</span>
          </h2>
          <p className="mx-auto max-w-2xl text-muted">
            Des applications complètes, en production. Cliquez sur une carte pour explorer ses fonctionnalités.
          </p>
        </div>

        {/* Cards — 2×2 */}
        <div className="grid gap-6 sm:grid-cols-2">
          {apps.map((app, index) => {
            const isOpen = expanded === app.id;
            return (
              <div
                key={app.id}
                className={cn(
                  'card-hover gradient-border group relative cursor-pointer rounded-2xl bg-card p-5 transition-all duration-500',
                  show ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
                onClick={() => setExpanded(isOpen ? null : app.id)}
              >
                {/* Icon + title */}
                <div className={cn('mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br text-lg shadow-lg', app.gradient)}>
                  {app.icon}
                </div>
                <h3 className="mb-0.5 text-base font-semibold">{app.name}</h3>
                <p className="mb-3 text-xs text-muted">{app.tagline}</p>

                {/* Workflow diagram */}
                <div className="mb-3 pointer-events-none">
                  <WorkflowDiagram type={app.id} gradient={app.gradient} />
                </div>

                {/* KPI badge + description courte */}
                <div className="mb-2">
                  <span className="inline-block rounded-full bg-badge px-2.5 py-0.5 text-[10px] font-medium text-badge">
                    {app.kpiLabel}
                  </span>
                </div>

                {/* Brève description */}
                <p className="text-[11px] text-muted leading-relaxed">{app.description}</p>

                {/* Expandable features */}
                <div className={cn('overflow-hidden transition-all duration-500', isOpen ? 'mt-3 max-h-96 opacity-100' : 'max-h-0 opacity-0')}>
                  <ul className="space-y-1.5 border-t border-subtle pt-3">
                    {app.features.map((f) => (
                      <li key={f} className="flex items-start gap-1.5 text-[11px] text-muted-strong">
                        <span className="mt-0.5 shrink-0 text-violet-400">✦</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                {!isOpen && <p className="mt-3 flex items-center gap-1.5 text-xs font-medium text-muted-strong transition-all hover:text-violet-400">Cliquez pour voir les fonctionnalités <span className="inline-block transition-transform group-hover:translate-x-0.5">→</span></p>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}