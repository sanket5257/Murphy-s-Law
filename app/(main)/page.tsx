import HeroSection from '@/components/HeroSection'
import LawyersUseSection from '@/components/LawyersUseSection'
import ImpactSection from '@/components/ImpactSection'
import VisionSection from '@/components/VisionSection'
import BenefitsSection from '@/components/BenefitsSection'
import PricingSection from '@/components/PricingSection'
import TextRevealSection from '@/components/TextRevealSection'
import WorkSection from '@/components/WorkSection'
import TestimonialsCarousel from '@/components/TestimonialsCarousel'
import FAQSection from '@/components/FAQSection'
import MarqueeSection from '@/components/MarqueeSection'
import StickyCtaBanner from '@/components/StickyCtaBanner'

export default function Home() {
  return (
    <>
      <HeroSection />
      <MarqueeSection/>
      <StickyCtaBanner />
      <TextRevealSection />
      <LawyersUseSection />
      <ImpactSection />
      <VisionSection />
      <BenefitsSection />
      <WorkSection />
      <PricingSection />
      <TestimonialsCarousel />
      <FAQSection />
    </>
  )
}