'use client'

import { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'

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
  const swiperRef = useRef<SwiperType | null>(null)
  const progressRefs = useRef<(HTMLDivElement | null)[]>(new Array(tabsData.length).fill(null))
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Progress bar animation for active tab
  useEffect(() => {
    const currentProgressRef = progressRefs.current[activeTab]
    if (currentProgressRef) {
      // Reset all progress bars first
      progressRefs.current.forEach((ref, index) => {
        if (ref && index !== activeTab) {
          ref.style.width = '0%'
        }
      })
      
      // Animate current progress bar
      currentProgressRef.style.width = `${progress}%`
    }
  }, [progress, activeTab])

  // Auto-progress functionality
  useEffect(() => {
    const startAutoProgress = () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      
      intervalRef.current = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            // Move to next slide
            if (swiperRef.current) {
              swiperRef.current.slideNext()
            }
            return 0
          }
          return prev + 2 // Adjust speed here (2% every interval)
        })
      }, 100) // Update every 100ms
    }

    startAutoProgress()

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [activeTab])

  const handleTabClick = (index: number) => {
    // Clear any existing auto-progress
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    
    setActiveTab(index)
    setProgress(0)
    
    // Move swiper to the clicked slide
    if (swiperRef.current) {
      swiperRef.current.slideTo(index)
    }
    
    // Reset all progress bars
    progressRefs.current.forEach((ref) => {
      if (ref) {
        ref.style.width = '0%'
      }
    })
    
    // Restart auto-progress after a delay
    setTimeout(() => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      
      intervalRef.current = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            if (swiperRef.current) {
              swiperRef.current.slideNext()
            }
            return 0
          }
          return prev + 2
        })
      }, 100)
    }, 1000)
  }

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveTab(swiper.activeIndex)
    setProgress(0)
  }

  return (
    <section className="relative w-full bg-white py-16 md:py-24 lg:py-32">
      <div className="px-4 md:px-8 lg:px-16 xl:px-24 2xl:px-32">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="tagline text-black/60 mb-4">
            Solutions for All Lawyers
          </p>
          <h2 className="text-black">
            How Lawyers Use Murphy
          </h2>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-12">
          <div className="flex flex-wrap justify-center gap-1 md:gap-2 bg-gray-100 rounded-full p-2">
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

        {/* Swiper Carousel */}
        <div className="mx-auto">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            speed={800}
            allowTouchMove={true}
            grabCursor={true}
            onSwiper={(swiper) => {
              swiperRef.current = swiper
            }}
            onSlideChange={handleSlideChange}
            className="w-full"
          >
            {tabsData.map((tab) => (
              <SwiperSlide key={tab.id}>
                <div className="px-2">
                  <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                    <div className="grid lg:grid-cols-2">
                      {/* Left Side - Image */}
                      <div className="bg-gray-100 flex items-center justify-center">
                        <div className="w-full">
                          <img
                            src="/img/fbd4e7ba2db5ddd2e95040335b649bac55fa2f3b-569x543.svg"
                            alt="Legal workflow interface"
                            className="w-full h-auto"
                          />
                        </div>
                      </div>

                      {/* Right Side - Content */}
                      <div className="bg-black">
                        <div className="p-8 lg:p-12 flex flex-col justify-center h-full">
                          <h3 className="text-white mb-6">
                            {tab.title}
                          </h3>
                          <p className="font-montreal text-white/90 text-lg leading-relaxed mb-8">
                            Drive transformation by embedding your firm's unique expertise, elevating client service, and showing impact.
                          </p>
                          <button className="font-montreal text-white/70 hover:text-white text-sm transition-colors self-start">
                            Solutions for {tab.title} →
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  )
}