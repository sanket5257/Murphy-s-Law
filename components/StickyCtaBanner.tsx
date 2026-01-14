'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function StickyCtaBanner() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current

    // Animate the container to scroll with the page until it reaches bottom
    gsap.to(container, {
      scrollTrigger: {
        trigger: container,
        start: 'top bottom',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          // When scroll progress reaches 1, container is at its original position (bottom)
          if (self.progress >= 1) {
            container.style.position = 'sticky'
          } else {
            container.style.position = 'fixed'
          }
        }
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div 
      ref={containerRef}
      className="bottom-0 left-0 right-0 z-40 flex items-center justify-center py-4 px-4"
    >
      <a
        href="https://app.murphys-law.ai/?_gl=1*r2vl0e*_ga*MTU1NDY5OTcwOC4xNzY3OTUzNjc1*_ga_HQ19QDQ45R*czE3NjgzNjk1MzckbzExJGcwJHQxNzY4MzY5NTM3JGo2MCRsMCRoMA.."
        className="inline-flex items-center gap-4 px-8 py-3 bg-black text-white font-montreal font-medium rounded-full hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl max-w-max"
      >
        <span>Shift focus from admin to expertise</span>
        <span className="text-white/60">|</span>
        <span>Book a demo</span>
      </a>
    </div>
  )
}
