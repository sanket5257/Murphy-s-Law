'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function SecurityCertifications() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const title = titleRef.current
    const cards = cardsRef.current
    const cta = ctaRef.current

    if (!section || !title || cards.length === 0 || !cta) return

    // Animate title
    gsap.fromTo(title,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    )

    // Animate cards
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
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          delay: index * 0.1
        }
      )
    })

    // Animate CTA
    gsap.fromTo(cta,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cta,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el)
    }
  }

  const certifications = [
    {
      icon: "/img/security iamges/4RqCDyH9K3kIMnlRI2SG2uD16k.svg",
      title: "Penetration Testing",
      description: "Regular third-party security assessments and vulnerability testing",
      frequency: "Quarterly"
    },
    {
      icon: "/img/security iamges/AEXl1pc8GJPqy9VFYUI4pzVvWY8.svg",
      title: "Security Audits",
      description: "Independent security audits by certified security professionals",
      frequency: "Annually"
    },
    {
      icon: "/img/security iamges/Cgztt1a8Ehqzd97ENh7tr2Am4vQ.svg",
      title: "Compliance Reviews",
      description: "Ongoing compliance monitoring and regulatory requirement reviews",
      frequency: "Continuous"
    },
    {
      icon: "/img/security iamges/4RqCDyH9K3kIMnlRI2SG2uD16k.svg",
      title: "Incident Response",
      description: "24/7 security incident response team with automated threat mitigation",
      frequency: "Real-time"
    }
  ]

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 md:py-32 px-8 md:px-16 lg:px-24 bg-black"
    >
      <div className="">
        {/* Section header */}
        <div className="text-center mb-20">
          <h2 
            ref={titleRef}
            className="text-white mb-6"
          >
            Security
            <br />
            <span className="text-blue-400">Operations</span>
          </h2>
          <p className="subheading-medium text-white/70 mx-auto">
            Continuous security monitoring and proactive threat management 
            to keep your data safe around the clock.
          </p>
        </div>

        {/* Certifications grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {certifications.map((cert, index) => (
            <div
              key={index}
              ref={addToRefs}
              className="group relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-blue-500/30 transition-all duration-500"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 bg-blue-500/20 rounded-xl flex items-center justify-center group-hover:bg-blue-500/30 transition-colors duration-300">
                  <img 
                    src={cert.icon}
                    alt={cert.title}
                    className="w-7 h-7"
                  />
                </div>
                <span className="font-montreal text-sm text-blue-400 bg-blue-500/20 px-3 py-1 rounded-full">
                  {cert.frequency}
                </span>
              </div>

              {/* Content */}
              <h3 className="font-montreal text-xl text-white mb-4 group-hover:text-blue-300 transition-colors duration-300">
                {cert.title}
              </h3>
              <p className="font-montreal text-white/70 leading-relaxed">
                {cert.description}
              </p>

              {/* Hover effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div 
          ref={ctaRef}
          className="text-center bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-2xl p-12 border border-white/10"
        >
          <h3 className="text-white mb-6">
            Ready to Secure Your Business?
          </h3>
          <p className="font-montreal text-lg text-white/70 mb-8 mx-auto">
            Get started with enterprise-grade security today. Our team will help you 
            implement the right security measures for your specific needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="font-montreal text-black bg-white hover:bg-white/90 px-8 py-4 rounded-full transition-all duration-300 hover:scale-105">
              Contact Security Team
            </button>
            <button className="font-montreal text-white border border-white/30 hover:border-white/60 px-8 py-4 rounded-full transition-all duration-300 hover:bg-white/10">
              View Security Documentation
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}