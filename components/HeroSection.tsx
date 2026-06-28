'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export default function HeroSection() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6"
    >
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/3 top-1/4 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/10 blur-[150px]" />
        <div className="absolute right-1/4 top-2/3 h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-[120px]" />
      </div>

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Content */}
      <div
        className={cn(
          'relative z-10 mx-auto max-w-4xl text-center transition-all duration-1000',
          visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        )}
      >
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 text-xs text-violet-300">
          <span className="h-2 w-2 rounded-full bg-violet-400 animate-pulse" />
          Créateur d&apos;applications sur-mesure pour TPE & PME
        </div>

        {/* Title */}
        <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight sm:text-6xl sm:leading-tight">
          <span className="gradient-text">ProductivAI</span>
          <br />
          On écoute, on comprend, on construit.
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-zinc-400 sm:text-xl">
          Nous créons des sites web, des applications métier et des automatisations intelligentes
          adaptés <strong className="text-zinc-200">à votre activité</strong>.
          Pas de solution standard, pas de copie — du <strong className="text-zinc-200">sur-mesure</strong> qui résout vos vrais problèmes.
        </p>

        {/* Trust signals */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-6 text-sm text-zinc-500">
          <span className="flex items-center gap-1.5">🎯 Écoute & conseil</span>
          <span className="flex items-center gap-1.5">⚡ Applications en production</span>
          <span className="flex items-center gap-1.5">🤝 Accompagnement TPE/PME</span>
        </div>

        {/* CTAs */}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <button
            onClick={() => scrollTo('apps')}
            className="animate-pulse-glow rounded-full bg-violet-600 px-8 py-3.5 text-base font-medium text-white transition-all hover:bg-violet-500"
          >
            Découvrir nos réalisations
          </button>
          <button
            onClick={() => scrollTo('simulator')}
            className="rounded-full border border-zinc-700 px-8 py-3.5 text-base font-medium text-zinc-300 transition-all hover:border-zinc-500 hover:text-white"
          >
            Estimer mon gain →
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="h-6 w-6 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}