'use client';

import { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const testimonials = [
  {
    icon: '🛒',
    sector: 'Commerce',
    metric: '+55%',
    label: 'de taux de closing',
    desc: 'Un réseau de 12 vendeurs a digitalisé son cycle de vente. Fin des fiches papier, fin des doublons.',
    tag: 'Réseau multi-agences',
  },
  {
    icon: '💼',
    sector: 'Conseil',
    metric: '-60%',
    label: "d'admin facturation",
    desc: 'Un cabinet de 8 consultants a automatisé ses devis et factures. 1 clic au lieu de 30 minutes.',
    tag: 'Cabinet de conseil',
  },
  {
    icon: '👥',
    sector: 'Association',
    metric: '×2',
    label: "l'engagement membres",
    desc: 'Une ONG de 200 membres suit ses présences et détecte les décrochages avant qu\'ils ne partent.',
    tag: 'ONG 200 membres',
  },
  {
    icon: '🏢',
    sector: 'Immobilier',
    metric: '+40%',
    label: 'd\'honoraires par agence',
    desc: 'Un réseau de 6 agences a unifié son pipeline mandats. Visibilité temps réel pour la direction.',
    tag: '6 agences',
  },
  {
    icon: '🎨',
    sector: 'Design IA',
    metric: '3×',
    label: 'de projets livrés',
    desc: 'Un studio de création a structuré son workflow brief → livrable. Plus de fichiers perdus.',
    tag: 'Studio 5 créatifs',
  },
  {
    icon: '🔧',
    sector: 'Rénovation',
    metric: '+35%',
    label: 'de ventes terrain',
    desc: 'Une enseigne de rénovation a équipé ses 15 commerciaux d\'un CRM mobile. Qualification en 5 min.',
    tag: '15 commerciaux',
  },
];

export default function TestimonialsSection() {
  const [scrolled, setScrolled] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setScrolled(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const show = scrolled;

  return (
    <section ref={sectionRef} className="relative px-6 py-16 sm:py-20">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/5 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl">
        <div className={cn('mb-12 text-center transition-all duration-700', show ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0')}>
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
            Ils ont <span className="gradient-text">transformé</span> leur activité
          </h2>
          <p className="mx-auto max-w-xl text-muted">
            Des résultats concrets, secteur par secteur.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <div
              key={t.sector}
              className={cn(
                'rounded-xl border border-panel bg-card p-6 transition-all duration-500',
                show ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              )}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {/* Top: icon + sector */}
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/15 text-lg">
                  {t.icon}
                </span>
                <div>
                  <p className="text-xs text-muted">{t.sector}</p>
                  <p className="text-[10px] text-kpi-label">{t.tag}</p>
                </div>
              </div>

              {/* Metric */}
              <div className="mb-2 flex items-baseline gap-1">
                <span className="text-3xl font-bold gradient-text">{t.metric}</span>
                <span className="text-sm text-muted-strong">{t.label}</span>
              </div>

              {/* Description */}
              <p className="text-sm text-muted leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}