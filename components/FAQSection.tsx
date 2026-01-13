'use client'

import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const faqs = [
  {
    question: "Will documents I upload to Murphy be safe?",
    answer: "Yes, we use industry-standard security measures with robust encryption. Murphy does not train underlying models using your data."
  },
  {
    question: "Where does Murphy get case law from?",
    answer: "Other large language models do not have direct access to proprietary case law databases and rely on publicly available sources to generate legal answers. However, Murphy is integrated with reputable and reliable case law databases and has specifically curated datasets. This ensures that Murphy always has access to the most recent case law out there."
  },
  {
    question: "Can I export and download answers?",
    answer: "Yes, Murphy allows you to share entire chats and export documents in Word or PDF format. These documents are pre-formated and can be edited to suit user preferences."
  },
  {
    question: "Can I upload documents for review?",
    answer: "Yes, you can upload contracts, court pleadings, or other legal documents to be summarised, for clause extraction, or for compliance checks."
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
      className="min-h-screen bg-black py-16 px-4 md:px-8 lg:px-16 xl:px-24 2xl:px-32"
    >
      <div className="">
        <h2 
          ref={titleRef}
          className="text-white text-center mb-20 tracking-tight"
         
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
                <h3 className="subheading-large text-white flex-1 pr-8 group-hover:text-white/80 transition-colors duration-300">
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
                  <p className="font-montreal text-lg md:text-xl text-white/80 leading-relaxed">
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