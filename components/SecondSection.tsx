'use client'

import { useEffect, useRef } from 'react'

export default function SecondSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play()
    }

    // Simple scroll-based scaling without GSAP
    const handleScroll = () => {
      const section = sectionRef.current
      const video = videoRef.current
      
      if (!section || !video) return

      const rect = section.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      // Calculate scroll progress through the section
      const sectionTop = rect.top
      const sectionHeight = rect.height
      
      // Progress from 0 to 1 as section scrolls through viewport
      let progress = 0
      
      if (sectionTop <= 0 && sectionTop > -sectionHeight) {
        // Section is in viewport
        progress = Math.abs(sectionTop) / sectionHeight
      } else if (sectionTop > 0) {
        // Section hasn't entered yet
        progress = 0
      } else {
        // Section has passed
        progress = 1
      }
      
      // Smooth scaling from 1 to 0.6
      const scale = 1 - (progress * 0.4) // Scale from 1.0 to 0.6
      const opacity = 1 - (progress * 0.2) // Opacity from 1.0 to 0.8
      
      video.style.transform = `scale(${Math.max(0.6, scale)})`
      video.style.opacity = Math.max(0.8, opacity).toString()
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative w-full h-screen bg-white overflow-hidden">
      {/* Centered Video */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <video
          ref={videoRef}
          className="w-3/4 h-3/4 object-contain transition-all duration-100 ease-out"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/videos/aN6JiJ5xUNkB1alN_EstrelaShowreelPreviewV2.mp4" type="video/mp4" />
        </video>
      </div>
      
     
    </section>
  )
}