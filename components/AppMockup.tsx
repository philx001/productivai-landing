'use client';

import { cn } from '@/lib/utils';

interface AppMockupProps {
  type: 'erp' | 'crm' | 'media' | 'proximite';
  data: Record<string, number | string>;
  gradient: string;
}

export default function AppMockup({ type, data, gradient }: AppMockupProps) {
  const baseClass = 'w-full rounded-lg border border-zinc-700/50 bg-black/60 p-3 text-[10px] leading-tight';

  switch (type) {
    case 'erp':
      return <ErpMockup data={data} className={baseClass} gradient={gradient} />;
    case 'crm':
      return <CrmMockup data={data} className={baseClass} gradient={gradient} />;
    case 'media':
      return <MediaMockup data={data} className={baseClass} gradient={gradient} />;
    case 'proximite':
      return <ProximiteMockup data={data} className={baseClass} gradient={gradient} />;
  }
}

interface MockupInnerProps {
  data: Record<string, number | string>;
  className: string;
  gradient: string;
}

/* ─── ERP : Tableau de bord dirigeant ─── */
function ErpMockup({ data, className, gradient }: MockupInnerProps) {
  return (
    <div className={className}>
      {/* Header */}
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[9px] font-semibold uppercase tracking-wider text-zinc-500">Tableau de bord</span>
        <span className="rounded bg-violet-500/20 px-1.5 py-0.5 text-[8px] text-violet-300">Live</span>
      </div>
      {/* KPI row */}
      <div className="mb-2 grid grid-cols-3 gap-1.5">
        <KpiBox label="CA mensuel" value={`${Number(data.ca).toLocaleString('fr-FR')} €`} color="text-emerald-400" />
        <KpiBox label="Pipeline" value={`${data.pipeline} aff.`} color="text-violet-400" />
        <KpiBox label="Taux conversion" value={`${data.conversion}%`} color="text-cyan-400" />
      </div>
      {/* Bar chart mini */}
      <div className="flex items-end gap-1" style={{ height: 28 }}>
        {[35, 58, 42, 75, 63, 88, 50].map((h, i) => (
          <div
            key={i}
            className={`w-full rounded-t-sm bg-gradient-to-t ${gradient} opacity-80`}
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── CRM Communautaire : engagement ─── */
function CrmMockup({ data, className }: MockupInnerProps) {
  return (
    <div className={className}>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[9px] font-semibold uppercase tracking-wider text-zinc-500">Engagement</span>
        <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[8px] text-emerald-300">{data.membres} membres</span>
      </div>
      {/* Jauge présence */}
      <div className="mb-2">
        <div className="mb-0.5 flex justify-between text-[8px] text-zinc-500">
          <span>Présence moyenne</span>
          <span>{data.presences}%</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-700">
          <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400" style={{ width: `${data.presences}%` }} />
        </div>
      </div>
      {/* Cards mini */}
      <div className="grid grid-cols-2 gap-1">
        <div className="rounded bg-zinc-800/50 p-1.5">
          <p className="text-[8px] text-zinc-500">En intégration</p>
          <p className="text-xs font-bold text-white">{data.integration}</p>
        </div>
        <div className="rounded bg-zinc-800/50 p-1.5">
          <p className="text-[8px] text-zinc-500">Événements</p>
          <p className="text-xs font-bold text-white">{data.evenements}</p>
        </div>
      </div>
    </div>
  );
}

/* ─── Médiathèque : analytics ─── */
function MediaMockup({ data, className }: MockupInnerProps) {
  return (
    <div className={className}>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[9px] font-semibold uppercase tracking-wider text-zinc-500">Audience</span>
        <span className="rounded bg-rose-500/20 px-1.5 py-0.5 text-[8px] text-rose-300">{data.contenus} contenus</span>
      </div>
      {/* Stats row */}
      <div className="mb-2 grid grid-cols-2 gap-1.5">
        <KpiBox label="Vues totales" value={Number(data.vues).toLocaleString('fr-FR')} color="text-rose-400" />
        <KpiBox label="Partages" value={Number(data.partages).toLocaleString('fr-FR')} color="text-orange-400" />
      </div>
      {/* Top contenus mini liste */}
      <div className="space-y-0.5">
        {['Formation leadership', 'Interview expert', 'Podcast Hebdo'].map((t, i) => (
          <div key={i} className="flex items-center justify-between rounded bg-zinc-800/30 px-1.5 py-0.5">
            <span className="truncate text-[8px] text-zinc-400">{t}</span>
            <span className="shrink-0 text-[7px] text-zinc-600">{1200 - i * 300} vues</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Proximité Habitat : pipeline ─── */
function ProximiteMockup({ data, className }: MockupInnerProps) {
  return (
    <div className={className}>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[9px] font-semibold uppercase tracking-wider text-zinc-500">Pipeline</span>
        <span className="rounded bg-cyan-500/20 px-1.5 py-0.5 text-[8px] text-cyan-300">{data.agences} agences</span>
      </div>
      {/* Funnel mini */}
      <div className="mb-2 space-y-1">
        {[
          { label: 'Nouvelles fiches', value: data.fiches, pct: 100 },
          { label: 'En cours', value: Math.round(Number(data.fiches) * 0.74), pct: 74 },
          { label: 'Signées', value: Math.round((Number(data.fiches) * Number(data.closing)) / 100), pct: Number(data.closing) },
        ].map((r) => (
          <div key={r.label} className="flex items-center gap-1.5">
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-700">
              <div className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500" style={{ width: `${r.pct}%` }} />
            </div>
            <span className="shrink-0 text-[7px] text-zinc-500">{r.value}</span>
          </div>
        ))}
      </div>
      {/* KPI */}
      <div className="flex items-center justify-between rounded bg-zinc-800/50 px-1.5 py-1">
        <span className="text-[8px] text-zinc-500">CA mensuel</span>
        <span className="text-[10px] font-bold text-white">{Number(data.caMensuel).toLocaleString('fr-FR')} €</span>
      </div>
    </div>
  );
}

/* ─── Shared: mini boîte KPI ─── */
function KpiBox({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="rounded bg-zinc-800/40 p-1.5 text-center">
      <p className="text-[8px] text-zinc-500">{label}</p>
      <p className={`text-[10px] font-bold ${color}`}>{value}</p>
    </div>
  );
}