'use client';

import { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const scenarios = [
  { icon: '🧾', before: 'Factures saisies une par une dans Excel', after: 'Génération automatique en un clic' },
  { icon: '📞', before: 'Relances clients oubliées ou faites trop tard', after: 'Relances automatiques programmées' },
  { icon: '📊', before: 'Tableaux de bord reconstitués en fin de mois', after: 'KPIs en temps réel, actualisés en direct' },
  { icon: '💶', before: 'Trésorerie floue, créances non suivies', after: 'Vision claire : encaissements, dépenses, soldes' },
  { icon: '📝', before: 'Devis refaits manuellement à chaque fois', after: 'Modèles et transformation devis → facture 1 clic' },
];

export default function BeforeAfterSection() {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [autoIndex, setAutoIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const autoTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setScrolled(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Auto-cycle highlighting
  useEffect(() => {
    if (!scrolled) return;
    let i = 0;
    autoTimer.current = setInterval(() => {
      setAutoIndex(i);
      i = (i + 1) % scenarios.length;
    }, 2200);
    return () => {
      if (autoTimer.current) clearInterval(autoTimer.current);
    };
  }, [scrolled]);

  const show = scrolled;

  return (
    <section ref={sectionRef} className="relative px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <div className={cn('mb-10 text-center transition-all duration-700', show ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0')}>
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
            Avant / <span className="gradient-text">Après</span>
          </h2>
          <p className="mx-auto max-w-xl text-muted">
            Survolez une ligne pour voir le lien entre chaque problème et sa solution.
          </p>
        </div>

        {/* Conteneur deux colonnes */}
        <div
          className={cn(
            'grid grid-cols-1 gap-4 sm:grid-cols-2 transition-all duration-700',
            show ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          )}
        >
          {/* Colonne Avant */}
          <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-6 sm:p-8">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-red-500/20 text-base">❌</span>
              <h3 className="text-lg font-bold text-before-heading">Sans ProductivAI</h3>
            </div>
            <ul className="space-y-3">
              {scenarios.map((s, i) => {
                const isActive = hoveredIndex === i || autoIndex === i;
                return (
                  <li
                    key={s.before}
                    className={cn(
                      'flex items-start gap-3 rounded-lg p-3 text-sm transition-all duration-300 cursor-default',
                      isActive
                        ? 'bg-red-500/10 text-before-text-active'
                        : 'text-before-text'
                    )}
                    onMouseEnter={() => { setHoveredIndex(i); if (autoTimer.current) { clearInterval(autoTimer.current); autoTimer.current = null; } }}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <span className="shrink-0 text-base">{s.icon}</span>
                    <span>{s.before}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Colonne Après */}
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6 sm:p-8">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/20 text-base">✅</span>
              <h3 className="text-lg font-bold text-after-heading">Avec ProductivAI</h3>
            </div>
            <ul className="space-y-3">
              {scenarios.map((s, i) => {
                const isActive = hoveredIndex === i || autoIndex === i;
                return (
                  <li
                    key={s.after}
                    className={cn(
                      'flex items-start gap-3 rounded-lg p-3 text-sm transition-all duration-300 cursor-default',
                      isActive
                        ? 'bg-emerald-500/10 text-after-text-active'
                        : 'text-after-text'
                    )}
                    onMouseEnter={() => { setHoveredIndex(i); if (autoTimer.current) { clearInterval(autoTimer.current); autoTimer.current = null; } }}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <span className="shrink-0 text-base">{s.icon}</span>
                    <span>{s.after}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-muted">
          Survolez une ligne pour voir la correspondance problème → solution
        </p>
      </div>
    </section>
  );
}