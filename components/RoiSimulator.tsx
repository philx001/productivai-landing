'use client';

import { useState, useRef, useEffect } from 'react';
import { calculateRoi, sectors, type Sector } from '@/lib/data';
import { cn } from '@/lib/utils';

interface Props {
  sectorId: string;
}

export default function RoiSimulator({ sectorId }: Props) {
  const sector = sectors.find((s) => s.id === sectorId) || sectors[0];
  const cfg = sector.roi;

  const [m1, setM1] = useState(cfg.default1);
  const [m2, setM2] = useState(cfg.default2);
  const [m3, setM3] = useState(cfg.default3);
  const [scrolled, setScrolled] = useState(false);
  const [displayAnnual, setDisplayAnnual] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const roi = calculateRoi(sectorId, { metric1: m1, metric2: m2, metric3: m3 });

  // Reset defaults when sector changes
  useEffect(() => {
    setM1(cfg.default1);
    setM2(cfg.default2);
    setM3(cfg.default3);
  }, [sectorId]);

  // Animate counter
  useEffect(() => {
    const start = displayAnnual;
    const end = roi.annualGain;
    const duration = 800;
    const startTime = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayAnnual(Math.round(start + (end - start) * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [roi.annualGain]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setScrolled(true); observer.disconnect(); }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const fmt = (n: number) => new Intl.NumberFormat('fr-FR').format(n);
  const show = scrolled;

  return (
    <section id="simulator" ref={sectionRef} className="relative px-6 py-24 sm:py-32">
      <div className="pointer-events-none absolute right-0 top-1/3 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-violet-600/5 blur-[120px]" />

      <div className="relative mx-auto max-w-4xl">
        {/* Header */}
        <div className={cn('mb-12 text-center transition-all duration-700', show ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0')}>
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
            Votre simulateur <span className="gradient-text">{sector.name}</span>
          </h2>
          <p className="mx-auto max-w-xl text-zinc-400">
            {sector.icon} Paramètres adaptés à votre secteur. Ajustez les curseurs selon votre situation.
          </p>
        </div>

        {/* Card */}
        <div className={cn('rounded-2xl border border-zinc-800 bg-card p-8 transition-all duration-700 sm:p-10', show ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0')}>
          <div className="grid gap-8 lg:grid-cols-5">
            {/* Controls */}
            <div className="space-y-7 lg:col-span-3">
              <Slider label={cfg.label1} min={1} max={cfg.max1} value={m1} onChange={setM1} />
              <Slider label={cfg.label2} min={5} max={cfg.max2} step={cfg.step2} value={m2} onChange={setM2} />
              <Slider label={cfg.label3} min={0} max={cfg.max3} value={m3} onChange={setM3} />
            </div>

            {/* Result */}
            <div className="flex flex-col items-center justify-center rounded-xl border border-zinc-800 bg-black/40 p-8 lg:col-span-2">
              <p className="mb-1 text-center text-sm text-zinc-500">{cfg.resultLabel}</p>
              <div className="mb-3 text-center">
                <span className="text-4xl font-bold gradient-text sm:text-5xl">{fmt(displayAnnual)}</span>
                <span className="ml-1 text-xl text-zinc-400">€</span>
              </div>

              <p className="mb-4 text-center text-xs text-zinc-500">{cfg.unit}</p>

              <div className="grid w-full grid-cols-2 gap-3 text-center text-xs">
                <div className="rounded-lg bg-zinc-800/50 p-3">
                  <p className="text-zinc-500">Par mois</p>
                  <p className="text-base font-semibold text-white">{fmt(roi.monthlyGain)} €</p>
                </div>
                <div className="rounded-lg bg-zinc-800/50 p-3">
                  <p className="text-zinc-500">Gain productivité</p>
                  <p className="text-base font-semibold text-cyan-400">+{roi.productivityGain}%</p>
                </div>
              </div>

              {roi.annualGain > cfg.impactThreshold && (
                <div className="mt-4 flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-2 text-xs text-emerald-400">
                  <span>💡</span>
                  {cfg.impactMessage}
                </div>
              )}

              <p className="mt-3 text-[10px] text-zinc-600 italic">{roi.description}</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className={cn('mt-8 text-center transition-all duration-700', show ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0')}>
          <p className="mb-4 text-sm text-zinc-500">
            Ces chiffres sont une estimation. Contactez-nous pour une analyse personnalisée de votre secteur.
          </p>
          <a
            href="mailto:contact@productivai.fr"
            className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-8 py-3.5 text-base font-medium text-white transition-all hover:bg-violet-500"
          >
            Demander mon analyse personnalisée →
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Slider sub-component ───
function Slider({ label, min, max, step, value, onChange }: {
  label: string; min: number; max: number; step?: number; value: number; onChange: (v: number) => void;
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