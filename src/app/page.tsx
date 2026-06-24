import Navbar from '@/components/organisms/Navbar';
import HeroSection from '@/components/organisms/HeroSection';
import WorksSection from '@/components/organisms/WorksSection';
import AboutSection from '@/components/organisms/AboutSection';
import ServicesSection from '@/components/organisms/ServicesSection';
// ─── Page ─────────────────────────────────────────────────────────────────────
// Single scroll page: Hero → Work → About → Contact
// Each section is its own component imported here

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <WorksSection />
        <ServicesSection />
        <AboutSection />
        {/* ContactForm goes here — Phase 2 */}
      </main>
    </>
  );
}
