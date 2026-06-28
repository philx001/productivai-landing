'use client';

import { useState, useRef, useEffect } from 'react';
import { sectors, apps } from '@/lib/data';
import { cn } from '@/lib/utils';
import WorkflowDiagram from './WorkflowDiagram';

interface Props {
  activeSector: string;
  onSectorChange: (id: string) => void;
}

const ROW1_COUNT = 6; // premiers secteurs = ligne 1

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
  const show = scrolled;

  // Map appId to gradient for workflow display
  const gradientMap: Record<string, string> = {
    erp: 'from-violet-600 to-indigo-600',
    crm: 'from-emerald-500 to-teal-600',
    media: 'from-rose-500 to-orange-500',
    proximite: 'from-cyan-500 to-blue-600',
  };

  return (
    <section id="sectors" ref={sectionRef} className="relative px-6 py-24 sm:py-32">
      <div className="pointer-events-none absolute left-1/3 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-cyan-500/5 blur-[100px]" />

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <div className={cn('mb-12 text-center transition-all duration-700', show ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0')}>
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
            Adapté à <span className="gradient-text">votre secteur</span>
          </h2>
          <p className="mx-auto max-w-2xl text-zinc-400">
            Chaque métier a ses contraintes. Nos solutions s&apos;y adaptent. Cliquez sur votre secteur pour voir le workflow associé, puis estimez votre gain.
          </p>
        </div>

        {/* Row 1 */}
        <div className={cn('mb-3 flex flex-wrap justify-center gap-2 transition-all duration-700', show ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0')}>
          {row1.map((s) => (
            <button
              key={s.id}
              onClick={() => onSectorChange(s.id)}
              className={cn(
                'flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all',
                activeSector === s.id
                  ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/25'
                  : 'bg-zinc-800/50 text-zinc-400 hover:bg-zinc-700/50 hover:text-white'
              )}
            >
              <span>{s.icon}</span>
              {s.name}
            </button>
          ))}
        </div>

        {/* Row 2 — nouveaux secteurs */}
        <div className={cn('mb-10 flex flex-wrap justify-center gap-2 transition-all duration-700', show ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0')}>
          {row2.map((s) => (
            <button
              key={s.id}
              onClick={() => onSectorChange(s.id)}
              className={cn(
                'flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all',
                activeSector === s.id
                  ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/25'
                  : 'bg-zinc-800/50 text-zinc-400 hover:bg-zinc-700/50 hover:text-white'
              )}
            >
              <span>{s.icon}</span>
              {s.name}
            </button>
          ))}
        </div>

        {/* Content panel — agrandi */}
        <div
          key={activeSector}
          className={cn(
            'rounded-2xl border border-zinc-800 bg-card p-8 transition-all duration-500 sm:p-12',
            show ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          )}
        >
          <div className="grid gap-10 lg:grid-cols-2">
            {/* Left: description + benefits */}
            <div>
              <h3 className="mb-3 text-2xl font-semibold">{current.icon} {current.name}</h3>
              <p className="mb-6 text-zinc-400">{current.description}</p>
              <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-violet-400">Bénéfices concrets</h4>
              <ul className="space-y-3">
                {current.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm text-zinc-300">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-500/20 text-xs text-violet-400">✓</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: workflow + apps associées */}
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-cyan-400">Fonctionnement</h4>
              {/* Workflow large */}
              <div className="mb-6 scale-110 origin-top-left">
                <WorkflowDiagram type={activeSector} gradient="from-violet-600 to-indigo-600" />
              </div>

              <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-cyan-400">Applications associées</h4>
              <div className="space-y-3">
                {current.appMapping.map((appId) => {
                  const app = apps.find((a) => a.id === appId);
                  if (!app) return null;
                  return (
                    <div
                      key={app.id}
                      className="flex items-center gap-4 rounded-xl border border-zinc-800 bg-black/40 p-4"
                    >
                      <div className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br text-lg', gradientMap[app.id] || app.gradient)}>
                        {app.icon}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium">{app.name}</p>
                        <p className="text-xs text-zinc-500">{app.tagline}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}