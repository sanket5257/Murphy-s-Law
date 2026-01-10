'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

interface TabContent {
  id: string
  title: string
  content: {
    query: string
    description: string
    memo: {
      title: string
      summary: string
      details: string
    }
  }
}

const tabsData: TabContent[] = [
  {
    id: 'in-house-counsel',
    title: 'In-House Counsel',
    content: {
      query: 'Query',
      description: 'I am an associate at a defense-side litigation firm in San Francisco. My client, Twitter, Inc., was just served with the attached Complaint. Please analyze this Complaint and prepare a four-part memorandum, which...',
      memo: {
        title: 'Memorandum: Analysis of Securities Class Action Complaint Against Twitter, Inc.',
        summary: 'I. Summary of the Complaint',
        details: 'The Complaint, filed by Doris Shenwick as Trustee for the Doris Shenwick Trust, is a securities class action against Twitter, Inc., and Officers, Richard Costolo and Anthony Noto.'
      }
    }
  },
  {
    id: 'innovation-teams',
    title: 'Innovation Teams',
    content: {
      query: 'Innovation Query',
      description: 'Our innovation team is working on implementing AI-driven legal research tools to streamline case preparation and improve client outcomes...',
      memo: {
        title: 'Innovation Implementation Strategy',
        summary: 'II. Technology Integration Plan',
        details: 'The implementation focuses on leveraging machine learning algorithms to enhance legal research efficiency and accuracy.'
      }
    }
  },
  {
    id: 'transactional-work',
    title: 'Transactional Work',
    content: {
      query: 'Transaction Analysis',
      description: 'Review the attached merger agreement and identify potential regulatory compliance issues, particularly focusing on antitrust considerations...',
      memo: {
        title: 'Transactional Due Diligence Report',
        summary: 'III. Regulatory Compliance Assessment',
        details: 'The merger agreement presents several regulatory challenges that require careful consideration of federal antitrust laws.'
      }
    }
  },
  {
    id: 'litigation',
    title: 'Litigation',
    content: {
      query: 'Litigation Strategy',
      description: 'Analyze the discovery materials and prepare a comprehensive litigation strategy focusing on key evidence and witness testimony...',
      memo: {
        title: 'Litigation Strategy Memorandum',
        summary: 'IV. Case Strategy and Evidence Analysis',
        details: 'Based on the discovery materials, we recommend a multi-pronged approach focusing on documentary evidence and expert testimony.'
      }
    }
  }
]

export default function LawyersUseSection() {
  const [activeTab, setActiveTab] = useState(0)
  const [progress, setProgress] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const tabsRef = useRef<HTMLDivElement>(null)
  const progressRefs = useRef<(HTMLDivElement | null)[]>(new Array(tabsData.length).fill(null))
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Auto-scroll functionality
  useEffect(() => {
    const startAutoScroll = () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      
      intervalRef.current = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setActiveTab(current => (current + 1) % tabsData.length)
            return 0
          }
          return prev + 2 // Adjust speed here (2% every interval)
        })
      }, 100) // Update every 100ms
    }

    startAutoScroll()

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [activeTab])

  // GSAP animations for tab changes
  useEffect(() => {
    if (contentRef.current && imageRef.current) {
      const tl = gsap.timeline()
      
      tl.to(contentRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.3,
        ease: 'power2.out'
      })
      .to(imageRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 0.3,
        ease: 'power2.out'
      }, 0)
      .to([contentRef.current, imageRef.current], {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.4,
        ease: 'power2.out',
        stagger: 0.1
      })
    }
  }, [activeTab])

  // Progress bar animation
  useEffect(() => {
    const currentProgressRef = progressRefs.current[activeTab]
    if (currentProgressRef) {
      gsap.to(currentProgressRef, {
        width: `${progress}%`,
        duration: 0.1,
        ease: 'none'
      })
    }
  }, [progress, activeTab])

  const handleTabClick = (index: number) => {
    setActiveTab(index)
    setProgress(0)
    
    // Reset all progress bars
    progressRefs.current.forEach((ref) => {
      if (ref) {
        gsap.set(ref, { width: '0%' })
      }
    })
  }

  const currentTab = tabsData[activeTab]

  return (
    <section ref={sectionRef} className="relative w-full bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-montreal text-sm text-black/60 uppercase tracking-widest mb-4">
            Solutions for All Lawyers
          </p>
          <h2 className="font-migra text-4xl md:text-5xl lg:text-6xl text-black leading-tight">
            How Lawyers Use Murphy
          </h2>
        </div>

        {/* Debug: Show all tabs info */}
        <div className="text-center mb-4 text-xs text-gray-500">
          Total tabs: {tabsData.length} | Active: {activeTab} | Progress: {progress.toFixed(0)}%
        </div>

        {/* Navigation Tabs */}
        <div ref={tabsRef} className="flex justify-center mb-12">
          <div className="flex flex-wrap justify-center gap-1 md:gap-2 bg-gray-100 rounded-full p-2 max-w-4xl">
            {tabsData.map((tab, index) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(index)}
                className={`relative px-3 md:px-6 py-2 md:py-3 rounded-full font-montreal text-xs md:text-sm font-medium transition-all duration-300 overflow-hidden whitespace-nowrap ${
                  activeTab === index
                    ? 'bg-black text-white'
                    : 'text-black/70 hover:text-black hover:bg-white'
                }`}
              >
                {tab.title}
                
                {/* Progress Bar Background */}
                <div className={`absolute bottom-0 left-0 w-full h-1 ${
                  activeTab === index ? 'bg-white/20' : 'bg-transparent'
                } rounded-full transition-all duration-300`}>
                  {/* Progress Bar Fill */}
                  <div
                    ref={el => { progressRefs.current[index] = el }}
                    className={`h-full rounded-full transition-all duration-100 ${
                      activeTab === index 
                        ? 'bg-gradient-to-r from-blue-400 to-purple-500 shadow-lg' 
                        : 'bg-transparent'
                    }`}
                    style={{ width: '0%' }}
                  />
                </div>
                
                {/* Pulse effect for active tab */}
                {activeTab === index && (
                  <div className="absolute inset-0 rounded-full bg-white/10 animate-pulse" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Card */}
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid lg:grid-cols-2">
              {/* Left Side - Image */}
              <div className="bg-gray-100 flex items-center justify-center">
                <div className="w-full ">
                  <img
                    ref={imageRef}
                    src="/img/fbd4e7ba2db5ddd2e95040335b649bac55fa2f3b-569x543.svg"
                    alt="Legal workflow interface"
                    className="w-full h-auto"
                  />
                </div>
              </div>

              {/* Right Side - Content */}
              <div ref={contentRef} className="bg-black p-8 lg:p-12 flex flex-col justify-center">
                <h3 className="font-migra text-3xl md:text-4xl text-white mb-6">
                  {currentTab.title}
                </h3>
                <p className="font-montreal text-white/90 text-lg leading-relaxed mb-8">
                  Drive transformation by embedding your firm's unique expertise, elevating client service, and showing impact.
                </p>
                <button className="font-montreal text-white/70 hover:text-white text-sm transition-colors self-start">
                  Solutions for {currentTab.title} →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}