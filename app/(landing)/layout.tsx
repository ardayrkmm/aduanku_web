import { Metadata } from 'next';
import Navbar from '@/components/landingpage/home/Navbar';
import Footer from '@/components/landingpage/home/Footer';

export const metadata: Metadata = {
  title: 'Aduanku - Platform Laporan Publik',
  description: 'Platform digital untuk melapor dan melacak masalah layanan publik',
};

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 overflow-hidden">
        {children}
      </main>
      <Footer />
    </div>
  );
}
