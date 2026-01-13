'use client'

import React from 'react'
import GlassmorphCarousel from './GlassmorphCarousel'

const sampleItems = [
  {
    id: 1,
    title: "AI-Powered Legal Research",
    description: "Access comprehensive legal databases and case law with our advanced AI algorithms. Get instant insights and relevant precedents for your cases.",
    image: "/img/legal-research.jpg",
    content: (
      <div className="flex items-center space-x-2 mt-2">
        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
        <span className="text-white/70 text-xs">Active Research</span>
      </div>
    )
  },
  {
    id: 2,
    title: "Document Analysis & Review",
    description: "Upload contracts, pleadings, and legal documents for instant analysis. Our AI identifies key clauses, risks, and compliance issues.",
    image: "/img/document-analysis.jpg",
    content: (
      <div className="flex items-center space-x-2 mt-2">
        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
        <span className="text-white/70 text-xs">Smart Analysis</span>
      </div>
    )
  },
  {
    id: 3,
    title: "Legal Document Drafting",
    description: "Generate professional legal documents in seconds. From contracts to wills, our AI creates accurate, jurisdiction-specific documents.",
    image: "/img/document-drafting.jpg",
    content: (
      <div className="flex items-center space-x-2 mt-2">
        <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
        <span className="text-white/70 text-xs">Auto-Draft</span>
      </div>
    )
  },
  {
    id: 4,
    title: "Case Law Integration",
    description: "Stay updated with the latest case law and legal precedents. Our platform integrates with major legal databases for comprehensive coverage.",
    image: "/img/case-law.jpg",
    content: (
      <div className="flex items-center space-x-2 mt-2">
        <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
        <span className="text-white/70 text-xs">Live Updates</span>
      </div>
    )
  },
  {
    id: 5,
    title: "Compliance Monitoring",
    description: "Ensure your documents and processes meet current legal standards. Get real-time compliance alerts and recommendations.",
    image: "/img/compliance.jpg",
    content: (
      <div className="flex items-center space-x-2 mt-2">
        <div className="w-2 h-2 bg-red-400 rounded-full"></div>
        <span className="text-white/70 text-xs">Compliance Check</span>
      </div>
    )
  }
]

export default function CarouselDemo() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Background with subtle pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center items-center px-4 md:px-8 lg:px-16 py-16 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          {/* Glassmorphism badge */}
          <div className="inline-flex items-center px-6 py-3 mb-8 rounded-full backdrop-blur-md bg-white/10 border border-white/20">
            <span className="text-white/80 text-base font-medium">Our Services</span>
          </div>

          <h2 className="text-white font-migra text-4xl md:text-5xl lg:text-6xl mb-6">
            Legal Intelligence
            <br />
            <span className="text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
              Redefined
            </span>
          </h2>
          
          <p className="text-white/70 font-montreal text-lg max-w-2xl mx-auto">
            Discover how Murphy's Law AI transforms legal work with cutting-edge technology
          </p>
        </div>

        {/* Carousel */}
        <div className="w-full max-w-7xl">
          <GlassmorphCarousel 
            items={sampleItems}
            autoPlay={true}
            autoPlayInterval={5000}
            showDots={true}
            showArrows={true}
          />
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <button className="px-8 py-4 rounded-full backdrop-blur-md bg-white/10 border border-white/20 text-white font-medium hover:bg-white/20 transition-all duration-300">
            Explore All Features
          </button>
        </div>
      </div>
    </section>
  )
}