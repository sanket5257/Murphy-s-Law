'use client'

import React, { useState, useEffect } from 'react'

interface CarouselItem {
  id: number
  title: string
  description: string
  image?: string
  content?: React.ReactNode
}

interface GlassmorphCarouselProps {
  items: CarouselItem[]
  autoPlay?: boolean
  autoPlayInterval?: number
  showDots?: boolean
  showArrows?: boolean
}

export default function GlassmorphCarousel({ 
  items, 
  autoPlay = true, 
  autoPlayInterval = 4000,
  showDots = true,
  showArrows = true 
}: GlassmorphCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay) return

    const interval = setInterval(() => {
      nextSlide()
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [currentIndex, autoPlay, autoPlayInterval])

  const nextSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev + 1) % items.length)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const prevSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentIndex) return
    setIsAnimating(true)
    setCurrentIndex(index)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const getSlidePosition = (index: number) => {
    const diff = index - currentIndex
    const totalItems = items.length
    
    // Normalize the difference to be between -totalItems/2 and totalItems/2
    let normalizedDiff = diff
    if (diff > totalItems / 2) {
      normalizedDiff = diff - totalItems
    } else if (diff < -totalItems / 2) {
      normalizedDiff = diff + totalItems
    }
    
    return normalizedDiff
  }

  const getSlideStyles = (index: number) => {
    const position = getSlidePosition(index)
    const isActive = position === 0
    const isAdjacent = Math.abs(position) === 1
    const isVisible = Math.abs(position) <= 2

    if (!isVisible) {
      return {
        transform: `translateX(${position > 0 ? '400px' : '-400px'}) scale(0.6)`,
        opacity: 0,
        zIndex: 0,
      }
    }

    const translateX = position * 280 // Spacing between cards
    const scale = isActive ? 1 : isAdjacent ? 0.85 : 0.7
    const opacity = isActive ? 1 : isAdjacent ? 0.8 : 0.5
    const zIndex = isActive ? 10 : isAdjacent ? 5 : 1

    return {
      transform: `translateX(${translateX}px) scale(${scale})`,
      opacity,
      zIndex,
    }
  }

  return (
    <div className="relative w-full h-[500px] flex items-center justify-center overflow-hidden">
      {/* Carousel Container */}
      <div className="relative w-full h-full flex items-center justify-center">
        {items.map((item, index) => (
          <div
            key={item.id}
            className={`absolute w-80 h-96 transition-all duration-500 ease-out cursor-pointer ${
              getSlidePosition(index) === 0 ? 'cursor-default' : 'cursor-pointer'
            }`}
            style={getSlideStyles(index)}
            onClick={() => getSlidePosition(index) !== 0 && goToSlide(index)}
          >
            {/* Glassmorphism Card */}
            <div className={`
              w-full h-full rounded-2xl backdrop-blur-xl border shadow-2xl
              transition-all duration-500 ease-out
              ${getSlidePosition(index) === 0 
                ? 'bg-white/20 border-white/30 shadow-white/10' 
                : 'bg-white/10 border-white/20 shadow-white/5'
              }
            `}>
              {/* Card Content */}
              <div className="p-8 h-full flex flex-col justify-between">
                {/* Image/Icon Area */}
                {item.image && (
                  <div className="w-full h-32 mb-6 rounded-lg overflow-hidden bg-white/10">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                {/* Content Area */}
                <div className="flex-1">
                  <h3 className="text-white font-migra text-xl mb-4 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-white/80 font-montreal text-sm leading-relaxed">
                    {item.description}
                  </p>
                  
                  {/* Custom Content */}
                  {item.content && (
                    <div className="mt-4">
                      {item.content}
                    </div>
                  )}
                </div>

                {/* Card Number/Indicator */}
                <div className="flex justify-between items-center mt-6">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  
                  {/* Subtle arrow for non-active cards */}
                  {getSlidePosition(index) !== 0 && (
                    <div className="text-white/60">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path 
                          d="M9 18l6-6-6-6" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {showArrows && (
        <>
          <button
            onClick={prevSlide}
            disabled={isAnimating}
            className="absolute left-4 z-20 w-12 h-12 rounded-full backdrop-blur-md bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 disabled:opacity-50"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path 
                d="M15 18l-6-6 6-6" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </button>
          
          <button
            onClick={nextSlide}
            disabled={isAnimating}
            className="absolute right-4 z-20 w-12 h-12 rounded-full backdrop-blur-md bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 disabled:opacity-50"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path 
                d="M9 18l6-6-6-6" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {showDots && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              disabled={isAnimating}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-white w-8' 
                  : 'bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}