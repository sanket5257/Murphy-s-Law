import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import ExperienceSection from '@/components/ExperienceSection'
import TextRevealSection from '@/components/TextRevealSection'
import WorkSection from '@/components/WorkSection'
import AboutSection from '@/components/AboutSection'
import ServicesSection from '@/components/ServicesSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import FAQSection from '@/components/FAQSection'
import PreFooterSection from '@/components/PreFooterSection'
import Footer from '@/components/Footer'
import MarqueeSection from '@/components/MarqueeSection'

export default function Home() {
  return (
    <main>
      <Header />
      <HeroSection />
      <ExperienceSection />
      <MarqueeSection/>
      <TextRevealSection />
      <WorkSection />
      {/* <AboutSection /> */}
      {/* <ServicesSection /> */}
      <TestimonialsSection />
      <FAQSection />
      {/* <PreFooterSection /> */}
      <Footer />
    </main>
  )
}