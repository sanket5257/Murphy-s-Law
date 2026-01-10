'use client'

import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const faqs = [
  {
    question: "What types of projects do you take on?",
    answer: "We specialise in branding and UX/UI design for websites and apps, but our approach is versatile. Whether it's a full brand identity, a design system build, or ongoing design support, we adapt to fit your business goals."
  },
  {
    question: "Which industries do you work with?",
    answer: "Our core expertise is in fintech and e-commerce, but we've partnered with clients across hospitality, law, accounting, packaging, edtech and many more. We are an agile team and our skills can adapt to most verticals, bringing a fresh, human-centric perspective to any industry."
  },
  {
    question: "How does your pricing work?",
    answer: "We offer both project-based pricing and ongoing retainers, billed at a flat hourly rate. Once we scope your project, you'll receive a clear estimate before we begin. If the scope shifts, we'll flag it early so there are no surprises."
  },
  {
    question: "Do you handle development too?",
    answer: "We focus on what we do best: design. For development, we collaborate with trusted partners we believe are the best of the best. If you already have a dev team, we'll work hand-in-hand with them to ensure a smooth handover and seamless build."
  },
  {
    question: "What is your design process like?",
    answer: "Every project begins with a discovery session to align on your goals. From there, we move through two key phases: UX Discovery & Design, where we focus on research, user flows, and wireframes to create an intuitive experience, and UI Discovery & Design, where we bring your brand to life through polished, visually engaging interfaces."
  },
  {
    question: "How long does a typical project take?",
    answer: "Timelines depend on scope, but most branding projects take roughly 6 to 8 weeks, and websites or apps typically run 8 to 12 weeks from kickoff to development handover. We'll always share a timeline upfront to ensure clarity and structure."
  }
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const faqRefs = useRef<(HTMLDivElement | null)[]>([])
  const answerRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(titleRef.current, 
        { 
          y: 100,
          opacity: 0 
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      )

      // FAQ items stagger animation
      gsap.fromTo(faqRefs.current.filter(Boolean), 
        { 
          y: 60,
          opacity: 0 
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const toggleFAQ = (index: number) => {
    const isOpening = openIndex !== index
    const answerElement = answerRefs.current[index]
    
    if (isOpening) {
      // Close previously opened FAQ
      if (openIndex !== null && answerRefs.current[openIndex]) {
        gsap.to(answerRefs.current[openIndex], {
          height: 0,
          opacity: 0,
          duration: 0.4,
          ease: "power2.inOut"
        })
      }
      
      // Open new FAQ
      setOpenIndex(index)
      
      if (answerElement) {
        gsap.set(answerElement, { height: "auto" })
        const height = answerElement.offsetHeight
        gsap.fromTo(answerElement, 
          { 
            height: 0,
            opacity: 0 
          },
          {
            height: height,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out"
          }
        )
      }
    } else {
      // Close current FAQ
      if (answerElement) {
        gsap.to(answerElement, {
          height: 0,
          opacity: 0,
          duration: 0.4,
          ease: "power2.inOut",
          onComplete: () => setOpenIndex(null)
        })
      }
    }
  }

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen bg-black py-20 px-6 md:px-12 lg:px-20"
    >
      <div className="max-w-6xl mx-auto">
        <h2 
          ref={titleRef}
          className="font-migra text-6xl md:text-8xl lg:text-9xl text-white text-center mb-20 tracking-tight"
        >
          FAQs
        </h2>
        
        <div className="space-y-0">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              ref={el => { faqRefs.current[index] = el }}
              className="border-t border-white/20 last:border-b"
            >
              <div 
                className="flex items-center justify-between py-8 cursor-pointer group hover:bg-white/5 transition-colors duration-300 px-6"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="font-montreal text-xl md:text-2xl lg:text-3xl text-white flex-1 pr-8 group-hover:text-white/80 transition-colors duration-300">
                  {faq.question}
                </h3>
                
                <div className="flex items-center space-x-2 text-white/60 group-hover:text-white transition-colors duration-300">
                  <span className="font-montreal text-2xl">(</span>
                  <div className={`w-6 h-0.5 bg-white transition-transform duration-300 ${openIndex === index ? 'rotate-90' : ''}`}></div>
                  <span className="font-montreal text-2xl">)</span>
                </div>
              </div>
              
              <div 
                ref={el => { answerRefs.current[index] = el }}
                className="overflow-hidden"
                style={{ height: openIndex === index ? 'auto' : 0 }}
              >
                <div className="px-6 pb-8">
                  <p className="font-montreal text-lg md:text-xl text-white/80 leading-relaxed max-w-4xl">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}