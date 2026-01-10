'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function SecurityCompliance() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const content = contentRef.current
    const image = imageRef.current

    if (!section || !content || !image) return

    // Animate content on scroll
    gsap.fromTo(content,
      { x: -100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          end: 'bottom 30%',
          toggleActions: 'play none none reverse'
        }
      }
    )

    gsap.fromTo(image,
      { x: 100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          end: 'bottom 30%',
          toggleActions: 'play none none reverse'
        },
        delay: 0.3
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 md:py-32 px-8 md:px-16 lg:px-24 bg-gradient-to-b from-black to-gray-900"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div ref={contentRef}>
            <h2 className="font-montreal text-4xl md:text-6xl text-white mb-8 leading-tight">
              Compliance &
              <br />
              <span className="text-green-400">Standards</span>
            </h2>
            
            <p className="font-montreal text-lg md:text-xl text-white/70 mb-12 leading-relaxed">
              We maintain the highest industry standards and certifications 
              to ensure your data is protected according to global regulations.
            </p>

            {/* Compliance items */}
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-montreal text-xl text-white mb-2">SOC 2 Type II Certified</h3>
                  <p className="font-montreal text-white/60">
                    Independently audited security controls and processes
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-montreal text-xl text-white mb-2">GDPR Compliant</h3>
                  <p className="font-montreal text-white/60">
                    Full compliance with European data protection regulations
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-montreal text-xl text-white mb-2">ISO 27001 Certified</h3>
                  <p className="font-montreal text-white/60">
                    International standard for information security management
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-montreal text-xl text-white mb-2">HIPAA Ready</h3>
                  <p className="font-montreal text-white/60">
                    Healthcare data protection standards compliance
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div ref={imageRef} className="relative">
            <div className="relative bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
              <img 
                src="/img/security iamges/4NiQ5LBDGQ2eSxB2XzEI2lZg8Fg.webp"
                alt="Security Compliance"
                className="w-full h-auto rounded-xl"
              />
              
              {/* Floating compliance badges */}
              <div className="absolute -top-4 -right-4 bg-green-500/90 text-white px-4 py-2 rounded-full font-montreal text-sm font-medium">
                SOC 2 Certified
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-blue-500/90 text-white px-4 py-2 rounded-full font-montreal text-sm font-medium">
                ISO 27001
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}