import HeroSection from '@/components/HeroSection';
import AppsSection from '@/components/AppsSection';
import SectorSelector from '@/components/SectorSelector';
import RoiSimulator from '@/components/RoiSimulator';
import CtaSection from '@/components/CtaSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <AppsSection />
      <SectorSelector />
      <RoiSimulator />
      <CtaSection />
    </>
  );
}