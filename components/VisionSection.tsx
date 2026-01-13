'use client'

import React, { useRef, useEffect } from 'react'

export default function VisionSection() {
  const sectionRef = useRef(null)

  return (
    <section 
      ref={sectionRef}
      className="relative w-full min-h-screen px-6 py-16 md:px-12 lg:px-16 xl:px-24"
      style={{ backgroundColor: '#E8EDE9' }}
    >
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column - Founder Image */}
          <div className="lg:col-span-3">
            <div className="space-y-4">
              <div className="relative w-full aspect-[3/4] rounded-sm overflow-hidden bg-gray-200">
                <img
                  src="/img/founder.avif"
                  alt="Max Jurnstrand"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-left pt-2">
                <p className="font-sans font-normal text-black text-base mb-1">Max Jurnstrand</p>
                <p className="font-sans text-sm text-black/60 mb-4">Co-founder & CEO</p>
                {/* Signature */}
                <div className="w-16 h-12">
                  <svg viewBox="0 0 80 60" className="w-full h-full">
                    <path
                      d="M 10 40 Q 15 20, 25 35 T 45 30 Q 55 25, 65 40"
                      stroke="black"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Column - Title */}
          <div className="lg:col-span-2 flex items-start">
            <h2 className="text-black font-serif text-4xl md:text-5xl lg:text-6xl leading-tight pt-0">
              Our Vision
            </h2>
          </div>

          {/* Right Columns - Text Content */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {/* First Text Column */}
              <div className="space-y-6">
                <p className="font-sans text-sm md:text-base text-black leading-relaxed">
                  Lawyers bring judgment, strategy, and creativity. AI brings speed, scale, and precision. Together, they unlock new possibilities for how legal work gets done.
                </p>
                
                <p className="font-sans text-sm md:text-base text-black leading-relaxed">
                  Our vision is to give every lawyer the tools to focus on what matters most: advising clients, shaping outcomes, and driving progress. By removing repetitive tasks and enabling complex workflows, Murphy's Law AI helps lawyers spend less time on admin and more time practicing law at its highest level.
                </p>
              </div>

              {/* Second Text Column */}
              <div>
                <p className="font-sans text-sm md:text-base text-black leading-relaxed">
                  We're building more than a product. Alongside industry professionals, we're building a new golden standard for legal work. A future where tech complements expertise, where legal teams operate with confidence and efficiency, and where every lawyer has the freedom to do their best work.
                </p>
              </div>
            </div>

            {/* Office Image */}
            <div className="mt-8 md:mt-12">
              <div className="relative w-full aspect-[16/9] rounded-sm overflow-hidden bg-gray-200">
                <img
                  src="/img/office.avif"
                  alt="Office space"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}