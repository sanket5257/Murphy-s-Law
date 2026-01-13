import HeroSection from '@/components/HeroSection'
import LawyersUseSection from '@/components/LawyersUseSection'
import ImpactSection from '@/components/ImpactSection'
import VisionSection from '@/components/VisionSection'
import PricingSection from '@/components/PricingSection'
import TextRevealSection from '@/components/TextRevealSection'
import WorkSection from '@/components/WorkSection'
import TestimonialsCarousel from '@/components/TestimonialsCarousel'
import FAQSection from '@/components/FAQSection'
import MarqueeSection from '@/components/MarqueeSection'

export default function Home() {
  return (
    <>
      <HeroSection />
      <MarqueeSection/>
      <TextRevealSection />
      <LawyersUseSection />
      <ImpactSection />
      <VisionSection />
      <WorkSection />
      <PricingSection />
      <TestimonialsCarousel />
      <FAQSection />
    </>
  )
}