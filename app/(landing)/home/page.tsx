import HeroSection from '@/components/landingpage/home/HeroSection';
import FeaturesSection from '@/components/landingpage/home/FeaturesSection';
import StatsSection from '@/components/landingpage/home/StatsSection';
import CTASection from '@/components/landingpage/home/CTASection';
import GuideSection from '@/components/landingpage/home/GuideSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <CTASection />
      <GuideSection />
    </>
  );
}
