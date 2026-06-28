'use client';

import { useState, useRef, useEffect } from 'react';
import { sectors, apps } from '@/lib/data';
import { cn } from '@/lib/utils';

interface Props {
  activeSector: string;
  onSectorChange: (id: string) => void;
}

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
  const show = scrolled;

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
            Une même technologie, déclinée selon les réalités de votre métier. Cliquez sur votre secteur, puis estimez votre gain avec le simulateur juste après.
          </p>
        </div>

        {/* Tabs */}
        <div className={cn('mb-10 flex flex-wrap justify-center gap-2 transition-all duration-700', show ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0')}>
          {sectors.map((s) => (
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

        {/* Content */}
        <div key={activeSector} className={cn('rounded-2xl border border-zinc-800 bg-card p-8 transition-all duration-500 sm:p-10', show ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0')}>
          <div className="grid gap-10 lg:grid-cols-5">
            <div className="lg:col-span-3">
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
            <div className="lg:col-span-2">
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-cyan-400">Applications associées</h4>
              <div className="space-y-4">
                {current.appMapping.map((appId) => {
                  const app = apps.find((a) => a.id === appId);
                  if (!app) return null;
                  return (
                    <div
                      key={app.id}
                      className="card-hover flex items-center gap-4 rounded-xl border border-zinc-800 bg-black/40 p-4"
                    >
                      <div className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br', app.gradient)}>
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