'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger)

    if (!videoRef.current || !sectionRef.current) return

    // Create GSAP scroll animation for video with scaling
    gsap.fromTo(videoRef.current, 
      {
        scale: 1.2, // Start larger
        y: 0
      },
      {
        scale: 0.8, // Scale down as we scroll
        y: -100,    // Move up as we scroll
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom", // Start when section top hits bottom of viewport
          end: "bottom top",   // End when section bottom hits top of viewport
          scrub: 1.5, // Smooth scrubbing
        }
      }
    )

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative min-h-screen w-full bg-white">
      {/* Content */}
      <div className="relative z-10 flex flex-col justify-start items-center px-4 md:px-8 lg:px-16 xl:px-24 2xl:px-32 text-center pt-48 pb-16 md:pb-24 lg:pb-32 max-w-7xl mx-auto">
        {/* Top tagline */}
        <p className="tagline text-black/80 mb-8">
          DISCOVER THE FUTURE OF LAW
        </p>
        
        {/* Main Heading */}
        <h1 className="text-black">
          Legal Intelligence.
          <br />
          Redefined.
        </h1>
        
        
        
        {/* Bottom tagline */}
        <div className="mb-8">
          <h2 className="subheading-large text-black ">
            Empower Your Legal Journey
            <br />
            with AI-Driven Expertise
          </h2>
        </div>

       
        
        {/* Video Section */}
        <div className="w-full mt-10 overflow-hidden">
          <video
            ref={videoRef}
            className="w-full h-auto rounded-lg shadow-2xl"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/videos/aN6JiJ5xUNkB1alN_EstrelaShowreelPreviewV2.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  )
}