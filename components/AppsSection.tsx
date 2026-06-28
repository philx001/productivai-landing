'use client';

import { useState, useRef, useEffect } from 'react';
import { apps } from '@/lib/data';
import { cn } from '@/lib/utils';

export default function AppsSection() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setScrolled(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const show = scrolled;

  return (
    <section id="apps" ref={sectionRef} className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <div
          className={cn(
            'mb-16 text-center transition-all duration-700',
            show ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          )}
        >
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
            Nos <span className="gradient-text">realisations</span>
          </h2>
          <p className="mx-auto max-w-2xl text-zinc-400">
            Des applications completes, en production, qui prouvent notre capacite a livrer
            des solutions robustes et performantes.
          </p>
        </div>

        {/* Apps grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {apps.map((app, index) => (
            <div
              key={app.id}
              className={cn(
                'card-hover gradient-border group relative cursor-pointer rounded-2xl bg-card p-6 transition-all duration-500',
                show
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-12 opacity-0'
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
              onClick={() => setExpanded(expanded === app.id ? null : app.id)}
            >
              {/* Icon */}
              <div
                className={cn(
                  'mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-xl shadow-lg',
                  app.gradient
                )}
              >
                {app.icon}
              </div>

              {/* Title */}
              <h3 className="mb-1 text-lg font-semibold">{app.name}</h3>
              <p className="mb-3 text-sm text-zinc-400">{app.tagline}</p>

              {/* KPI badge */}
              <span className="inline-block rounded-full bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300">
                {app.kpiLabel}
              </span>

              {/* Features (expandable) */}
              <div
                className={cn(
                  'overflow-hidden transition-all duration-500',
                  expanded === app.id ? 'mt-4 max-h-96 opacity-100' : 'max-h-0 opacity-0'
                )}
              >
                <ul className="space-y-2 border-t border-zinc-800 pt-4">
                  {app.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-zinc-300">
                      <span className="mt-0.5 shrink-0 text-violet-400">&diams;</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={app.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-cyan-400 transition-colors hover:text-cyan-300"
                  onClick={(e) => e.stopPropagation()}
                >
                  Voir la demo &rarr;
                </a>
              </div>

              {/* Expand hint */}
              {expanded !== app.id && (
                <p className="mt-3 text-xs text-zinc-600">Cliquez pour voir les fonctionnalites</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}