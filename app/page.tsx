import Navbar from '@/components/ui/Navbar';
import HeroSection from '@/components/landingpage/home/HeroSection';
import FeaturesSection from '@/components/landingpage/home/FeaturesSection';
import StatsSection from '@/components/landingpage/home/StatsSection';
import CTASection from '@/components/landingpage/home/CTASection';
import GuideSection from '@/components/landingpage/home/GuideSection';
import Footer from '@/components/ui/Footer';

export default function LandingPage() {
  return (
    <main className="overflow-hidden">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <CTASection />
      <GuideSection />
      <Footer />
    </main>
  );
}
