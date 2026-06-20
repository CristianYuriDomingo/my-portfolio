import Navbar from '@/components/organisms/Navbar';
import HeroSection from '@/components/organisms/HeroSection';
import AboutSection from '@/components/organisms/AboutSection';
// ─── Page ─────────────────────────────────────────────────────────────────────
// Single scroll page: Hero → About → Works → Contact
// Each section is its own component imported here

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        {/* WorksGrid goes here — Phase 2 */}
        {/* ContactForm goes here — Phase 2 */}
      </main>
    </>
  );
}
