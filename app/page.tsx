'use client';

import { useState } from 'react';
import HeroSection from '@/components/HeroSection';
import AppsSection from '@/components/AppsSection';
import SectorSelector from '@/components/SectorSelector';
import RoiSimulator from '@/components/RoiSimulator';
import CtaSection from '@/components/CtaSection';
import { sectors } from '@/lib/data';

export default function Home() {
  const [activeSector, setActiveSector] = useState(sectors[0].id);

  return (
    <>
      <HeroSection />
      <AppsSection />
      <SectorSelector activeSector={activeSector} onSectorChange={setActiveSector} />
      <RoiSimulator sectorId={activeSector} />
      <CtaSection />
    </>
  );
}