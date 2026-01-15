'use client'

import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { supabase } from '@/lib/supabase'

gsap.registerPlugin(ScrollTrigger)

interface FAQ {
  id: number
  question: string
  answer: string
  order_index: number
}

export default function FAQSection() {
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const faqRefs = useRef<(HTMLDivElement | null)[]>([])
  const answerRefs = useRef<(HTMLDivElement | null)[]>([])

  // Fetch FAQs from database
  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const { data, error } = await supabase
          .from('faqs')
          .select('*')
          .order('order_index', { ascending: true })
        
        if (error) {
          console.error('Error fetching FAQs:', error)
          return
        }
        
        if (data && data.length > 0) {
          setFaqs(data)
        }
      } catch (error) {
        console.error('Error fetching FAQs:', error)
      }
    }

    fetchFAQs()
  }, [])

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
      <div className="max-w-7xl mx-auto">
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