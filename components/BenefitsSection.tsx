'use client'

import React from 'react'

const benefitsData = [
  {
    title: "Individuals",
    subtitle: "Personal Legal Empowerment",
    description: "Get quick answers to everyday legal questions without hiring a full-time attorney. Access legal information, understand contracts, and handle personal legal matters with confidence.",
    image: "/img/founder.avif",
    features: [
      "Easy, Affordable Legal Guidance",
      "Peace of Mind with AI-powered safety net",
      "Access to Justice without attorney fees",
      "Case Preparation and court procedures",
      "Consumer Protection and contract review"
    ]
  },
  {
    title: "Businesses",
    subtitle: "Enterprise Legal Solutions",
    description: "Stay up to date on legal requirements and precedents. Automate routine tasks, reduce risk, and free your team to focus on growth rather than legal red tape.",
    image: "/img/nevzRKAxQ4WBQM1uoFjcJ6DC5HQ.avif",
    features: [
      "Access to Regulations & Case Law",
      "Document Review & Drafting with AI",
      "Effortless Compliance automation",
      "Scalable for startups to enterprises",
      "Risk reduction and growth focus"
    ]
  },
  {
    title: "Lawyers",
    subtitle: "Professional Legal Enhancement",
    description: "Leverage advanced AI tools to detect hidden issues, automate repetitive work, and deliver faster insights. Focus on strategy and client relationships while AI handles the heavy lifting.",
    image: "/img/20eqxzj1K5zVGCBf7tenzY3LhI.avif",
    features: [
      "Automate Repetitive Research Work",
      "Enhanced Accuracy with AI detection",
      "Boost Client Satisfaction rates",
      "Due Diligence & Compliance automation",
      "Strategic focus on client relationships"
    ]
  }
]

export default function BenefitsSection() {
  return (
    <section className="relative min-h-screen w-full bg-white py-16 md:py-24">
      <div className="w-full px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 lg:mb-20">
          <div className="inline-flex items-center px-4 py-2 mb-6 rounded-full bg-black/5 border border-black/10">
            <span className="text-black/60 text-sm font-montreal uppercase tracking-wide">A Growing Ecosystem</span>
          </div>

          <h2 className="text-black font-migra text-4xl md:text-5xl lg:text-6xl mb-6">
            Every tool, working together
          </h2>
          
          <p className="text-black/70 font-montreal text-lg max-w-3xl leading-relaxed">
            Tap into the full power of the Murphy platform—combining drafting, review, extraction, search, and custom tools into cohesive workflows. Each workflow calls on the right capabilities to deliver end-to-end solutions, enabling legal teams to handle complex tasks with precision and consistency.
          </p>
        </div>

        {/* Benefits Cards - Stacked Layout */}
        <div className="space-y-8 lg:space-y-12">
          {benefitsData.map((benefit, index) => (
            <div key={index} className="group">
              <div className="bg-white border border-black/10 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 h-[700px]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 h-full">
                  {/* Content Side */}
                  <div className={`p-8 lg:p-12 flex flex-col justify-start ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                    {/* Category Badge */}
                    <div className="inline-flex items-center px-4 py-2 mb-6 rounded-full bg-gradient-to-r from-orange-500/10 to-red-200/10 border border-orange-500/20 w-fit">
                      <span className="text-orange-600 text-sm font-montreal font-medium">{benefit.title}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-black font-migra text-2xl lg:text-3xl xl:text-4xl mb-4 leading-tight">
                      {benefit.subtitle}
                    </h3>

                    {/* Description */}
                    <p className="text-black/70 font-montreal text-base lg:text-lg leading-relaxed mb-8">
                      {benefit.description}
                    </p>

                    {/* Features List */}
                    <div className="space-y-3 mb-8">
                      {benefit.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-red-200 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-black/80 font-montreal text-sm lg:text-base">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <a 
                      href="https://app.murphys-law.ai/?_gl=1*r2vl0e*_ga*MTU1NDY5OTcwOC4xNzY3OTUzNjc1*_ga_HQ19QDQ45R*czE3NjgzNjk1MzckbzExJGcwJHQxNzY4MzY5NTM3JGo2MCRsMCRoMA.."
                      className="inline-flex items-center px-6 py-3 bg-black text-white font-montreal font-medium rounded-full hover:bg-black/90 transition-all duration-300 w-fit group-hover:scale-105"
                    >
                      Learn More
                      <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>

                  {/* Image Side */}
                  <div className={`relative h-64 lg:h-full hidden lg:block ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <img 
                      src={benefit.image} 
                      alt={benefit.title}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Overlay Tools Panel (similar to your reference image) */}
                    <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/20">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-black/60 text-xs font-montreal uppercase tracking-wide">Tools</span>
                        <button className="text-black/40 hover:text-black/60">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      <div className="space-y-2">
                        {benefit.features.slice(0, 3).map((feature, idx) => (
                          <div key={idx} className="flex items-center space-x-2 text-xs">
                            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                            <span className="text-black/70 font-montreal">{feature.split(' ')[0]} {feature.split(' ')[1]}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Card Number */}
                    <div className="absolute bottom-6 left-6 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-black font-montreal font-bold text-lg">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 lg:mt-20">
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <a 
              href="https://app.murphys-law.ai/?_gl=1*r2vl0e*_ga*MTU1NDY5OTcwOC4xNzY3OTUzNjc1*_ga_HQ19QDQ45R*czE3NjgzNjk1MzckbzExJGcwJHQxNzY4MzY5NTM3JGo2MCRsMCRoMA.."
              className="px-8 py-4 bg-black text-white font-montreal font-medium rounded-full hover:bg-black/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              Start Your Free Trial
            </a>
            <a 
              href="https://app.murphys-law.ai/?_gl=1*r2vl0e*_ga*MTU1NDY5OTcwOC4xNzY3OTUzNjc1*_ga_HQ19QDQ45R*czE3NjgzNjk1MzckbzExJGcwJHQxNzY4MzY5NTM3JGo2MCRsMCRoMA.."
              className="px-8 py-4 bg-transparent border-2 border-black text-black font-montreal font-medium rounded-full hover:bg-black hover:text-white transition-all duration-300"
            >
              Schedule a Demo
            </a>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-100 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-100 rounded-full filter blur-3xl opacity-20"></div>
      </div>
    </section>
  )
}