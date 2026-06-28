'use client';

export default function Header() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-800/50 bg-black/60 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <button onClick={() => scrollTo('hero')} className="text-lg font-bold tracking-tight">
          Productiv<span className="text-violet-400">AI</span>
        </button>
        <nav className="hidden items-center gap-8 text-sm text-zinc-400 sm:flex">
          <button onClick={() => scrollTo('apps')} className="transition-colors hover:text-white">
            Réalisations
          </button>
          <button onClick={() => scrollTo('sectors')} className="transition-colors hover:text-white">
            Secteurs
          </button>
          <button onClick={() => scrollTo('simulator')} className="transition-colors hover:text-white">
            Simulateur
          </button>
          <button
            onClick={() => scrollTo('cta')}
            className="rounded-full bg-violet-600 px-5 py-2 text-sm font-medium text-white transition-all hover:bg-violet-500"
          >
            Demander une démo
          </button>
        </nav>
        {/* Mobile menu button */}
        <button
          onClick={() => scrollTo('cta')}
          className="rounded-full bg-violet-600 px-4 py-1.5 text-xs font-medium text-white transition-all hover:bg-violet-500 sm:hidden"
        >
          Démo
        </button>
      </div>
    </header>
  );
}