'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { calculateRoi } from '@/lib/data';
import { cn } from '@/lib/utils';

export default function RoiSimulator() {
  const [employees, setEmployees] = useState(10);
  const [volume, setVolume] = useState(100);
  const [hours, setHours] = useState(5);
  const [scrolled, setScrolled] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [displayAnnual, setDisplayAnnual] = useState(0);

  const roi = calculateRoi(employees, volume, hours);
  const show = scrolled;

  // Animate counter on change
  useEffect(() => {
    const start = displayAnnual;
    const end = roi.annualSavings;
    const duration = 800;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayAnnual(Math.round(start + (end - start) * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [roi.annualSavings]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setScrolled(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const formatNumber = (n: number) =>
    new Intl.NumberFormat('fr-FR').format(n);

  return (
    <section id="simulator" ref={sectionRef} className="relative px-6 py-24 sm:py-32">
      <div className="pointer-events-none absolute right-0 top-1/3 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-violet-600/5 blur-[120px]" />

      <div className="relative mx-auto max-w-4xl">
        {/* Header */}
        <div
          className={cn(
            'mb-12 text-center transition-all duration-700',
            show ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          )}
        >
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
            Combien <span className="gradient-text">gagneriez-vous</span> ?
          </h2>
          <p className="mx-auto max-w-xl text-zinc-400">
            Deplacez les curseurs selon votre situation. Le calcul s&apos;actualise
            en temps reel.
          </p>
        </div>

        {/* Simulator card */}
        <div
          className={cn(
            'rounded-2xl border border-zinc-800 bg-card p-8 transition-all duration-700 sm:p-10',
            show ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          )}
        >
          <div className="grid gap-8 lg:grid-cols-5">
            {/* Left: controls */}
            <div className="space-y-8 lg:col-span-3">
              <SliderControl
                label="Nombre d'employes concernes"
                min={1}
                max={200}
                value={employees}
                onChange={setEmployees}
              />
              <SliderControl
                label="Clients / devis par mois"
                min={10}
                max={1000}
                step={10}
                value={volume}
                onChange={setVolume}
              />
              <SliderControl
                label="Heures gagnees / employe / semaine"
                min={1}
                max={20}
                value={hours}
                onChange={setHours}
              />
            </div>

            {/* Right: result */}
            <div className="flex flex-col items-center justify-center rounded-xl border border-zinc-800 bg-black/40 p-8 lg:col-span-2">
              <p className="mb-2 text-sm text-zinc-500">Economies annuelles estimees</p>
              <div className="mb-4 text-center">
                <span className="text-4xl font-bold gradient-text sm:text-5xl">
                  {formatNumber(displayAnnual)}
                </span>
                <span className="ml-1 text-xl text-zinc-400">&euro;</span>
              </div>

              <div className="grid w-full grid-cols-2 gap-3 text-center text-xs">
                <div className="rounded-lg bg-zinc-800/50 p-3">
                  <p className="text-zinc-500">Par mois</p>
                  <p className="text-base font-semibold text-white">
                    {formatNumber(roi.monthlySavings)} &euro;
                  </p>
                </div>
                <div className="rounded-lg bg-zinc-800/50 p-3">
                  <p className="text-zinc-500">Gain productivite</p>
                  <p className="text-base font-semibold text-cyan-400">
                    +{roi.productivityGain}%
                  </p>
                </div>
              </div>

              {roi.annualSavings > 50000 && (
                <div className="mt-4 flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-2 text-xs text-emerald-400">
                  <span>Impact significatif sur votre tresorerie</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* CTA after simulator */}
        <div
          className={cn(
            'mt-8 text-center transition-all duration-700',
            show ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          )}
        >
          <p className="mb-4 text-sm text-zinc-500">
            Ces chiffres sont une estimation. Contactez-nous pour une analyse
            personnalisee.
          </p>
          <a
            href="mailto:contact@productivai.fr"
            className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-8 py-3.5 text-base font-medium text-white transition-all hover:bg-violet-500"
          >
            Demander mon analyse personnalisee &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}

function SliderControl({
  label,
  min,
  max,
  step,
  value,
  onChange,
}: {
  label: string;
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label className="text-sm font-medium text-zinc-300">{label}</label>
        <span className="text-lg font-bold text-white">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step ?? 1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="roi-slider w-full"
      />
      <div className="mt-1 flex justify-between text-xs text-zinc-600">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}