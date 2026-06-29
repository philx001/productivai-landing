'use client';

import { useState } from 'react';
import HeroSection from '@/components/HeroSection';
import BeforeAfterSection from '@/components/BeforeAfterSection';
import AppsSection from '@/components/AppsSection';
import SectorSelector from '@/components/SectorSelector';
import TestimonialsSection from '@/components/TestimonialsSection';
import RoiSimulator from '@/components/RoiSimulator';
import DiagnosticSection from '@/components/DiagnosticSection';
import CtaSection from '@/components/CtaSection';
import { sectors } from '@/lib/data';

export default function Home() {
  const [activeSector, setActiveSector] = useState(sectors[0].id);

  return (
    <>
      <HeroSection />
      <BeforeAfterSection />
      <AppsSection />
      <SectorSelector activeSector={activeSector} onSectorChange={setActiveSector} />
      <TestimonialsSection />
      <RoiSimulator sectorId={activeSector} />
      <DiagnosticSection />
      <CtaSection />
    </>
  );
}