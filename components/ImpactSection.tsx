'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function ImpactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const statsRefs = useRef<(HTMLDivElement | null)[]>([])
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return
    
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
          
          // Handle different number formats
          let numericValue = 0
          let suffix = ''
          let isPercentage = false
          let isMultiplier = false
          
          if (finalNumber.includes('%')) {
            isPercentage = true
            numericValue = parseInt(finalNumber.replace(/[^\d]/g, ''))
            suffix = '%'
          } else if (finalNumber.includes('x')) {
            isMultiplier = true
            numericValue = parseInt(finalNumber.replace(/[^\d]/g, ''))
            suffix = 'x'
          } else if (finalNumber.includes('k+')) {
            numericValue = parseInt(finalNumber.replace(/[^\d]/g, ''))
            suffix = 'k+'
          } else {
            numericValue = parseInt(finalNumber.replace(/[^\d]/g, ''))
          }
          
          const counter = { value: 0 }
          
          tl.to(counter, {
            value: numericValue,
            duration: 1.5,
            ease: 'power2.out',
            onUpdate: function() {
              const currentValue = Math.round(counter.value)
              if (isPercentage) {
                numberElement.textContent = currentValue + '%'
              } else if (isMultiplier) {
                numberElement.textContent = currentValue + 'x'
              } else if (suffix === 'k+') {
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
  }, [isClient])

  const stats = [
    {
      number: '65%',
      description: 'Reduction in Document Review Time'
    },
    {
      number: '5x',
      description: 'Case Law Research Productivity Gains'
    },
    {
      number: '20%',
      description: 'Increase in Billable Hours'
    },
    {
      number: '95%',
      description: 'Cost Reduction When Compared With Traditional Legal Research Fees'
    }
  ]

  return (
    <section ref={sectionRef} className="relative w-full bg-white pb-32">
      <div className="px-4 md:px-8 lg:px-16 xl:px-24 2xl:px-32">
        {/* Title */}
        <div className="text-center mb-16 md:mb-24">
          <h2 
            ref={titleRef}
            className="text-black"
          >
            Quantifiable Impact
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 lg:gap-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              ref={el => { statsRefs.current[index] = el }}
              className="text-center"
            >
              {/* Number */}
              <div className="mb-6">
                <h2 className="stat-number font-migra text-black leading-none" >
                  {stat.number}
                </h2>
              </div>
              
              {/* Description */}
              <p className="font-montreal text-lg md:text-xl text-black/80 leading-relaxed mx-auto">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}