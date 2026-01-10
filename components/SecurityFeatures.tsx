'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function SecurityFeatures() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const section = sectionRef.current
    const cards = cardsRef.current

    if (!section || cards.length === 0) return

    // Animate cards on scroll
    cards.forEach((card, index) => {
      gsap.fromTo(card,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          },
          delay: index * 0.2
        }
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el)
    }
  }

  const features = [
    {
      icon: "/img/security iamges/4RqCDyH9K3kIMnlRI2SG2uD16k.svg",
      title: "End-to-End Encryption",
      description: "All data is encrypted in transit and at rest using AES-256 encryption standards. Your sensitive information remains protected at every step."
    },
    {
      icon: "/img/security iamges/AEXl1pc8GJPqy9VFYUI4pzVvWY8.svg",
      title: "Multi-Factor Authentication",
      description: "Advanced authentication protocols including biometric verification, hardware tokens, and time-based one-time passwords."
    },
    {
      icon: "/img/security iamges/Cgztt1a8Ehqzd97ENh7tr2Am4vQ.svg",
      title: "Zero Trust Architecture",
      description: "Never trust, always verify. Our zero-trust model ensures every access request is authenticated and authorized."
    },
    {
      icon: "/img/security iamges/4RqCDyH9K3kIMnlRI2SG2uD16k.svg",
      title: "Real-time Monitoring",
      description: "24/7 security monitoring with AI-powered threat detection and automated incident response capabilities."
    },
    {
      icon: "/img/security iamges/AEXl1pc8GJPqy9VFYUI4pzVvWY8.svg",
      title: "Data Privacy Controls",
      description: "Granular privacy controls that give you complete visibility and control over your data usage and sharing."
    },
    {
      icon: "/img/security iamges/Cgztt1a8Ehqzd97ENh7tr2Am4vQ.svg",
      title: "Secure Infrastructure",
      description: "Built on enterprise-grade cloud infrastructure with redundant security layers and automatic failover protection."
    }
  ]

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 md:py-32 px-8 md:px-16 lg:px-24 bg-black"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-20">
          <h2 className="font-migra text-4xl md:text-6xl text-white mb-6 leading-tight">
            Security Features
          </h2>
          <p className="font-montreal text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
            Comprehensive security measures designed to protect your business 
            and maintain the highest standards of data protection.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={addToRefs}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-purple-500/30 transition-all duration-500"
            >
              {/* Icon */}
              <div className="w-16 h-16 bg-purple-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-purple-500/30 transition-colors duration-300">
                <img 
                  src={feature.icon}
                  alt={feature.title}
                  className="w-8 h-8"
                />
              </div>

              {/* Content */}
              <h3 className="font-montreal text-xl text-white mb-4 group-hover:text-purple-300 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="font-montreal text-white/70 leading-relaxed">
                {feature.description}
              </p>

              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}