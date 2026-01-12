import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import LawyersUseSection from '@/components/LawyersUseSection'
import ImpactSection from '@/components/ImpactSection'
import TextRevealSection from '@/components/TextRevealSection'
import WorkSection from '@/components/WorkSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import FAQSection from '@/components/FAQSection'
import Footer from '@/components/Footer'
import MarqueeSection from '@/components/MarqueeSection'

export default function Home() {
  return (
    <main>
      <Header />
      <HeroSection />
      <MarqueeSection/>
      <TextRevealSection />
      <LawyersUseSection />
      <ImpactSection />
      <WorkSection />
      <TestimonialsSection />
      <FAQSection />
      <Footer />
    </main>
  )
}