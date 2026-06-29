'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

const scenarios = [
  { icon: '🧾', before: 'Factures saisies une par une dans Excel', after: 'Génération automatique en un clic' },
  { icon: '📞', before: 'Relances clients oubliées ou faites trop tard', after: 'Relances automatiques programmées' },
  { icon: '📊', before: 'Tableaux de bord reconstitués en fin de mois', after: 'KPIs en temps réel, actualisés en direct' },
  { icon: '💶', before: 'Trésorerie floue, créances non suivies', after: 'Vision claire : encaissements, dépenses, soldes' },
  { icon: '📝', before: 'Devis refaits manuellement à chaque fois', after: 'Modèles et transformation devis → facture 1 clic' },
];

export default function BeforeAfterSection() {
  const [position, setPosition] = useState(50);
  const [scrolled, setScrolled] = useState(false);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setScrolled(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setDragging(true);
  }, []);

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
      setPosition((x / rect.width) * 100);
    };
    const onUp = () => setDragging(false);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); };
  }, [dragging]);

  const show = scrolled;

  return (
    <section ref={sectionRef} className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <div className={cn('mb-12 text-center transition-all duration-700', show ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0')}>
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
            Avant / <span className="gradient-text">Après</span>
          </h2>
          <p className="mx-auto max-w-xl text-muted">
            Faites glisser le curseur pour voir la différence qu&apos;une application sur-mesure apporte au quotidien.
          </p>
        </div>

        {/* Comparateur */}
        <div
          ref={containerRef}
          className={cn(
            'relative overflow-hidden rounded-2xl border border-panel bg-card transition-all duration-700 select-none',
            show ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          )}
          style={{ height: 380 }}
        >
          {/* Panneau gauche : Avant */}
          <div className="absolute inset-0 overflow-hidden" style={{ width: `${position}%` }}>
            <div className="flex h-full flex-col justify-center p-8 sm:p-12">
              <div className="mb-6 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/20 text-lg">❌</span>
                <h3 className="text-xl font-bold text-red-400">Sans ProductivAI</h3>
              </div>
              <ul className="space-y-4">
                {scenarios.map((s) => (
                  <li key={s.before} className="flex items-start gap-3 text-sm text-red-300/80">
                    <span>{s.icon}</span>
                    <span>{s.before}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Panneau droit : Après */}
          <div className="absolute inset-0 overflow-hidden" style={{ left: `${position}%`, width: `${100 - position}%` }}>
            <div className="flex h-full flex-col justify-center p-8 sm:p-12">
              <div className="mb-6 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20 text-lg">✅</span>
                <h3 className="text-xl font-bold text-emerald-400">Avec ProductivAI</h3>
              </div>
              <ul className="space-y-4">
                {scenarios.map((s) => (
                  <li key={s.after} className="flex items-start gap-3 text-sm text-emerald-300/90">
                    <span>{s.icon}</span>
                    <span>{s.after}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Curseur */}
          <div
            className="absolute top-0 bottom-0 z-10 flex cursor-ew-resize items-center justify-center"
            style={{ left: `calc(${position}% - 14px)`, width: 28 }}
            onMouseDown={handleMouseDown}
          >
            <div className="h-full w-0.5 bg-white/30" />
            <div className="absolute flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-zinc-900 shadow-xl">
              <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7l-4 4 4 4M16 7l4 4-4 4" />
              </svg>
            </div>
            <div className="h-full w-0.5 bg-white/30" />
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-muted">
          Faites glisser le curseur ← pour voir le quotidien sans nos solutions, → pour découvrir ce que nous apportons.
        </p>
      </div>
    </section>
  );
}