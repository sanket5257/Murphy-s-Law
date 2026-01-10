'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function SecurityHero() {
  const heroRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const hero = heroRef.current
    const title = titleRef.current
    const subtitle = subtitleRef.current
    const image = imageRef.current

    if (!hero || !title || !subtitle || !image) return

    // Initial animation
    gsap.fromTo(title, 
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.3 }
    )

    gsap.fromTo(subtitle,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.6 }
    )

    gsap.fromTo(image,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.5, ease: 'power3.out', delay: 0.9 }
    )
  }, [])

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center px-8 md:px-16 lg:px-24 pt-32 pb-16 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-black to-black" />
      
      <div className="relative z-10 max-w-7xl mx-auto text-center">
        {/* Main heading */}
        <h1 
          ref={titleRef}
          className="font-montreal text-6xl md:text-8xl lg:text-9xl text-white leading-none mb-8 tracking-tight"
        >
          Security
          <br />
          <span className="text-purple-400">First</span>
        </h1>
        
        {/* Subtitle */}
        <p 
          ref={subtitleRef}
          className="font-montreal text-xl md:text-2xl text-white/70 max-w-3xl mx-auto mb-16 leading-relaxed"
        >
          Enterprise-grade security built into every layer of our platform. 
          Your data protection is our highest priority.
        </p>

        {/* Security image */}
        <div 
          ref={imageRef}
          className="relative max-w-4xl mx-auto"
        >
          <img 
            src="/img/security iamges/4NiQ5LBDGQ2eSxB2XzEI2lZg8Fg.webp"
            alt="Security Infrastructure"
            className="w-full h-auto rounded-2xl shadow-2xl"
          />
          
          {/* Floating security icons */}
          <div className="absolute -top-8 -left-8 w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-purple-500/30">
            <img 
              src="/img/security iamges/4RqCDyH9K3kIMnlRI2SG2uD16k.svg"
              alt="Security Icon"
              className="w-8 h-8"
            />
          </div>
          
          <div className="absolute -top-4 -right-12 w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-blue-500/30">
            <img 
              src="/img/security iamges/AEXl1pc8GJPqy9VFYUI4pzVvWY8.svg"
              alt="Security Icon"
              className="w-10 h-10"
            />
          </div>
          
          <div className="absolute -bottom-6 -left-6 w-14 h-14 bg-green-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-green-500/30">
            <img 
              src="/img/security iamges/Cgztt1a8Ehqzd97ENh7tr2Am4vQ.svg"
              alt="Security Icon"
              className="w-7 h-7"
            />
          </div>
        </div>
      </div>
    </section>
  )
}