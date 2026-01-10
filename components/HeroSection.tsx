'use client'

import { useEffect, useRef } from 'react'

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const heroRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play()
    }

    // Simple parallax effect using scroll event
    const handleScroll = () => {
      const scrolled = window.pageYOffset
      const hero = heroRef.current
      const content = contentRef.current

      if (hero && content) {
        // Move background video slower than scroll
        const videoElement = hero.querySelector('video')
        if (videoElement) {
          videoElement.style.transform = `translateY(${scrolled * 0.5}px)`
        }

        // Move content slower than scroll
        content.style.transform = `translateY(${scrolled * 0.3}px)`
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section ref={heroRef} className="relative h-screen w-full overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          className="w-full h-full object-cover scale-110"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/videos/aK8JRWGNHVfTOXgT_estrela-hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/20"></div>
      </div>
      
      {/* Content */}
      <div ref={contentRef} className="relative z-10 h-full flex items-center justify-between px-8 md:px-16 lg:px-24">
        {/* Left Content */}
        <div className="flex-1">
          <h1 className="font-migra text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white leading-tight">
            A people first
          </h1>
        </div>
       
        
        {/* Right Content */}
        <div className="flex-1 text-right">
          <h1 className="font-migra text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white leading-tight">
            digital studio
          </h1>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <p className="font-montreal text-sm text-white/80 text-center">
          Scroll to discover our world
        </p>
      </div>
    </section>
  )
}