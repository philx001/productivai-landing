'use client';

import { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export default function CtaSection() {
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
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="cta"
      ref={sectionRef}
      className="relative overflow-hidden px-6 py-24 sm:py-32"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/10 blur-[150px]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
      </div>

      <div
        className={cn(
          'relative mx-auto max-w-3xl text-center transition-all duration-700',
          scrolled ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        )}
      >
        <h2 className="mb-6 text-3xl font-bold leading-tight sm:text-5xl sm:leading-tight">
          Pret a construire votre
          <br />
          <span className="gradient-text">application sur-mesure</span> ?
        </h2>

        <p className="mx-auto mb-10 max-w-xl text-lg text-muted">
          Parlons de votre projet. Nous configurons une instance de demonstration
          adaptee a votre secteur en 24h. Sans engagement.
        </p>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="mailto:contact@productivai.fr"
            className="animate-pulse-glow rounded-full bg-violet-600 px-10 py-4 text-base font-medium text-white transition-all hover:bg-violet-500"
          >
            Demander ma demo personnalisee
          </a>
          <a
            href="mailto:contact@productivai.fr"
            className="rounded-full border border-label px-10 py-4 text-base font-medium text-muted transition-all hover:border-muted hover:text-fg"
          >
            contact@productivai.fr
          </a>
        </div>

        {/* Trust indicators */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-kpi-label">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Deploiement en 24h
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Applications en production
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Zero engagement
          </span>
        </div>

        {/* Notice: futur formulaire Notion */}
        <div className="mt-6 text-[10px] text-kpi-label">
          Formulaire de contact automatisé (Notion) à venir prochainement.
        </div>
      </div>

      {/* Footer */}
      <div className="relative mx-auto mt-24 max-w-6xl border-t border-panel pt-8 text-center text-sm text-kpi-label">
        <p>
          &copy; {new Date().getFullYear()} ProductivAI &mdash; Des applications qui transforment les donnees
          en decisions.
        </p>
        <div className="mt-2 flex justify-center gap-4">
          <a href="mailto:contact@productivai.fr" className="transition-colors hover:text-muted">
            Contact
          </a>
          <span>&middot;</span>
          <span>Fait avec Next.js</span>
        </div>
      </div>
    </section>
  );
}