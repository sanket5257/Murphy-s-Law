'use client'

import React, { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'

const testimonials = [
  {
    text: "The team at Estrela have been amazing and critical to our UI/UX journey, they challenge our thoughts for the better and have allowed us to become South Africa's fastest-growing Buy Now Pay Later platform. I cannot recommend them enough.",
    name: "Craig Newborn",
    role: "Former CEO, PayJustNow"
  },
  {
    text: "Working with Estrela Studio has been a genuinely outstanding experience. Their team brings a rare combination of creativity, technical expertise, and collaborative spirit. Estrela met us exactly where we were – they listened closely, understood the strategic goals and translated that direction into clear, compelling visual design.",
    name: "Donna Blackwell-Kopotic",
    role: "Sims Lifecycle Service (US)"
  },
  {
    text: "The Estrela team have a grasp of branding and product design like I've never seen before. We searched the globe for a tech-focused CI design agency and found that the top talent was right here in Cape Town.",
    name: "Colleen Harrison",
    role: "Former Head of Marketing, Payfast"
  }
]

export default function TestimonialsSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const centerCardRef = useRef<HTMLDivElement>(null)
  const leftCardRef = useRef<HTMLDivElement>(null)
  const rightCardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(console.error)
    }

    // Initialize only center card animation
    const centerCard = centerCardRef.current
    if (centerCard) {
      gsap.set(centerCard, { opacity: 1, y: 0, scale: 1 })
    }
  }, [])

  const animateTransition = (newIndex: number, direction: 'next' | 'prev' | 'direct' = 'direct') => {
    if (isTransitioning || newIndex === currentTestimonial) return
    
    setIsTransitioning(true)
    
    const centerCard = centerCardRef.current
    if (!centerCard) return
    
    // Animate out only the center card
    gsap.to(centerCard, {
      opacity: 0,
      y: direction === 'next' ? -30 : direction === 'prev' ? 30 : 0,
      scale: 0.95,
      duration: 0.4,
      ease: "power2.inOut",
      onComplete: () => {
        // Update state
        setCurrentTestimonial(newIndex)
        
        // Animate in only the center card
        gsap.fromTo(centerCard, 
          {
            opacity: 0,
            y: direction === 'next' ? 30 : direction === 'prev' ? -30 : 0,
            scale: 0.95
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            ease: "power2.out",
            onComplete: () => {
              setIsTransitioning(false)
            }
          }
        )
      }
    })
  }

  const nextTestimonial = () => {
    const newIndex = (currentTestimonial + 1) % testimonials.length
    animateTransition(newIndex, 'next')
  }

  const prevTestimonial = () => {
    const newIndex = (currentTestimonial - 1 + testimonials.length) % testimonials.length
    animateTransition(newIndex, 'prev')
  }

  const goToTestimonial = (index: number) => {
    animateTransition(index, 'direct')
  }

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/videos/aK8JRWGNHVfTOXgT_estrela-hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center items-center px-4 md:px-8 lg:px-16 xl:px-24 2xl:px-32 py-16">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-24">
         

          <h2 className="text-white mx-auto">
            Some words from our
            <br />
            valued clients
          </h2>
        </div>

        {/* Testimonial Cards Container */}
        <div className="relative w-full">
          <div className="flex justify-center items-center space-x-6 lg:space-x-8 xl:space-x-12">
            {/* Left Card (Previous) */}
            <div ref={leftCardRef} className="hidden lg:block w-80 xl:w-96 2xl:w-[420px] opacity-50 transform scale-90">
              <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-8 xl:p-10 h-[500px] xl:h-[550px] flex flex-col justify-between">
                <div>
                  <p className="text-white/80 text-sm xl:text-base leading-relaxed mb-6">
                    "{testimonials[(currentTestimonial - 1 + testimonials.length) % testimonials.length].text.substring(0, 120)}..."
                  </p>
                </div>
                <div>
                  <p className="text-white font-medium text-lg xl:text-xl">
                    {testimonials[(currentTestimonial - 1 + testimonials.length) % testimonials.length].name}
                  </p>
                  <p className="text-white/60 text-sm xl:text-base">
                    {testimonials[(currentTestimonial - 1 + testimonials.length) % testimonials.length].role}
                  </p>
                </div>
              </div>
            </div>

            {/* Center Card (Current) */}
            <div ref={centerCardRef} className="w-full lg:w-[600px] xl:w-[700px] 2xl:w-[800px] transform scale-100">
              <div className="backdrop-blur-xl bg-white/15 border border-white/30 rounded-2xl p-8 md:p-12 lg:p-16 xl:p-20 shadow-2xl min-h-[500px] xl:min-h-[600px] flex flex-col justify-between">
                <div className="mb-8">
                  <p className="text-white text-base lg:text-lg xl:text-xl leading-relaxed">
                    "{testimonials[currentTestimonial].text}"
                  </p>
                </div>
                <div>
                  <p className="text-white font-medium subheading-medium mb-1">
                    {testimonials[currentTestimonial].name}
                  </p>
                  <p className="text-white/70 text-sm xl:text-base">
                    {testimonials[currentTestimonial].role}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Card (Next) */}
            <div ref={rightCardRef} className="hidden lg:block w-80 xl:w-96 2xl:w-[420px] opacity-50 transform scale-90">
              <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-8 xl:p-10 h-[500px] xl:h-[550px] flex flex-col justify-between">
                <div>
                  <p className="text-white/80 text-sm xl:text-base leading-relaxed mb-6">
                    "{testimonials[(currentTestimonial + 1) % testimonials.length].text.substring(0, 120)}..."
                  </p>
                </div>
                <div>
                  <p className="text-white font-medium text-lg xl:text-xl">
                    {testimonials[(currentTestimonial + 1) % testimonials.length].name}
                  </p>
                  <p className="text-white/60 text-sm xl:text-base">
                    {testimonials[(currentTestimonial + 1) % testimonials.length].role}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            disabled={isTransitioning}
            className="absolute left-4 lg:left-0 top-1/2 transform -translate-y-1/2 backdrop-blur-md bg-white/10 border border-white/20 rounded-full p-3 hover:bg-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <button
            onClick={nextTestimonial}
            disabled={isTransitioning}
            className="absolute right-4 lg:right-0 top-1/2 transform -translate-y-1/2 backdrop-blur-md bg-white/10 border border-white/20 rounded-full p-3 hover:bg-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex space-x-2 mt-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              disabled={isTransitioning}
              className={`w-2 h-2 rounded-full transition-all duration-300 disabled:cursor-not-allowed ${
                index === currentTestimonial 
                  ? 'bg-white' 
                  : 'bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}