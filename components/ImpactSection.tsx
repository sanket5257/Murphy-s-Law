'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function ImpactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const statsRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Create a single timeline for better performance
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    })

    // Animate title
    if (titleRef.current) {
      tl.fromTo(titleRef.current, 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
      )
    }

    // Animate stats with stagger in a single timeline
    const validStats = statsRefs.current.filter(Boolean)
    if (validStats.length > 0) {
      tl.fromTo(validStats,
        { opacity: 0, y: 60 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          stagger: 0.15,
          ease: 'power2.out' 
        },
        '-=0.4'
      )

      // Animate numbers counting up with a single timeline
      validStats.forEach((stat, index) => {
        const numberElement = stat?.querySelector('.stat-number')
        if (numberElement) {
          const finalNumber = numberElement.textContent || '0'
          const isKFormat = finalNumber.includes('k+')
          const numericValue = parseInt(finalNumber.replace(/[^\d]/g, ''))
          
          const counter = { value: 0 }
          
          tl.to(counter, {
            value: numericValue,
            duration: 1.5,
            ease: 'power2.out',
            onUpdate: function() {
              const currentValue = Math.round(counter.value)
              if (isKFormat) {
                numberElement.textContent = currentValue + 'k+'
              } else {
                numberElement.textContent = currentValue.toString()
              }
            }
          }, `-=${1.5 - (index * 0.1)}`)
        }
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  const stats = [
    {
      number: '700',
      description: 'Leading law firms and enterprises'
    },
    {
      number: '50',
      description: 'of AmLaw 100 firms on Murphy'
    },
    {
      number: '74k+',
      description: 'Lawyers using Murphy'
    }
  ]

  return (
    <section ref={sectionRef} className="relative w-full bg-white py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        {/* Title */}
        <div className="text-center mb-16 md:mb-24">
          <h2 
            ref={titleRef}
            className="font-migra text-4xl md:text-5xl lg:text-6xl text-black leading-tight"
          >
            Quantifiable Impact
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              ref={el => { statsRefs.current[index] = el }}
              className="text-center"
            >
              {/* Number */}
              <div className="mb-6">
                <span className="stat-number font-migra text-6xl md:text-7xl lg:text-8xl text-black leading-none">
                  {stat.number}
                </span>
              </div>
              
              {/* Description */}
              <p className="font-montreal text-lg md:text-xl text-black/80 leading-relaxed max-w-xs mx-auto">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}