'use client'

import React, { useState, useEffect, useRef } from 'react'
import { supabase } from '@/lib/supabase'

interface Testimonial {
  id: number
  text: string
  name: string
  role: string
  order_index: number
}

export default function TestimonialsCarousel() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch testimonials from database
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const { data, error } = await supabase
          .from('testimonials')
          .select('*')
          .order('order_index', { ascending: true })
        
        if (error) {
          console.error('Error fetching testimonials:', error)
          return
        }
        
        if (data && data.length > 0) {
          setTestimonials(data)
        }
      } catch (error) {
        console.error('Error fetching testimonials:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTestimonials()
  }, [])

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(console.error)
    }
  }, [])

  const nextSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    setTimeout(() => setIsAnimating(false), 800)
  }

  const prevSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setTimeout(() => setIsAnimating(false), 800)
  }

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentIndex) return
    setIsAnimating(true)
    setCurrentIndex(index)
    setTimeout(() => setIsAnimating(false), 800)
  }

  // Auto-play functionality with pause capability
  useEffect(() => {
    if (isPaused || testimonials.length === 0) return

    const interval = setInterval(() => {
      if (!isAnimating) {
        nextSlide()
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [currentIndex, isPaused, isAnimating, testimonials.length])

  // Show loading state
  if (loading) {
    return (
      <section className="relative min-h-screen w-full overflow-hidden bg-black">
        <div className="relative z-10 min-h-screen flex flex-col justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          <p className="text-white mt-4">Loading testimonials...</p>
        </div>
      </section>
    )
  }

  // Show empty state
  if (testimonials.length === 0) {
    return (
      <section className="relative min-h-screen w-full overflow-hidden bg-black">
        <div className="relative z-10 min-h-screen flex flex-col justify-center items-center">
          <p className="text-white text-xl">No testimonials available</p>
        </div>
      </section>
    )
  }

  const getSlidePosition = (index: number) => {
    const diff = index - currentIndex
    const totalItems = testimonials.length
    
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
        transform: `translateX(${position > 0 ? '900px' : '-900px'}) scale(0.3) rotateY(${position > 0 ? '60deg' : '-60deg'})`,
        opacity: 0,
        zIndex: 0,
        filter: 'blur(6px)',
      }
    }

    // Increased spacing for larger cards
    const translateX = position * 480 // Increased from 420 to 480 for larger cards
    const scale = isActive ? 1 : isAdjacent ? 0.75 : 0.6
    const opacity = isActive ? 1 : isAdjacent ? 0.7 : 0.4
    const zIndex = isActive ? 10 : isAdjacent ? 5 : 1
    const rotateY = position * 20
    const blur = isActive ? 0 : Math.abs(position) * 1.5
    const translateZ = isActive ? '0px' : '-100px' // Increased depth for larger cards

    return {
      transform: `translateX(${translateX}px) scale(${scale}) rotateY(${rotateY}deg) translateZ(${translateZ})`,
      opacity,
      zIndex,
      filter: `blur(${blur}px)`,
    }
  }

  return (
    <section 
      className="relative min-h-screen w-full overflow-hidden bg-black"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
     

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center items-center py-16 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-20">
         

          <h2 className="text-white font-migra text-4xl md:text-5xl lg:text-6xl mb-6">
            Some words from our
            <br />
            <span className="text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
              valued clients
            </span>
          </h2>
        </div>

        {/* Carousel Container with 3D perspective */}
        <div 
          className="relative w-full h-[500px] md:h-[600px] flex items-center justify-center mb-16 overflow-hidden"
          style={{ 
            perspective: '1800px', // Increased perspective for larger cards
            perspectiveOrigin: 'center center'
          }}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`absolute w-80 md:w-96 h-[450px] md:h-[500px] transition-all duration-700 ease-in-out cursor-pointer ${
                getSlidePosition(index) === 0 ? 'cursor-default' : 'cursor-pointer'
              }`}
              style={{
                ...getSlideStyles(index),
                transformStyle: 'preserve-3d',
                willChange: 'transform, opacity, filter',
              }}
              onClick={() => getSlidePosition(index) !== 0 && goToSlide(index)}
            >
              {/* Glassmorphism Card */}
              <div className={`
                w-full h-full rounded-2xl backdrop-blur-xl border shadow-2xl p-6 md:p-8
                transition-all duration-700 ease-in-out flex flex-col justify-between
                transform-gpu
                ${getSlidePosition(index) === 0 
                  ? 'bg-white/25 border-white/40 shadow-white/30' 
                  : 'bg-white/15 border-white/25 shadow-white/15'
                }
              `}>
                {/* Quote Icon */}
                <div className="mb-4 md:mb-6">
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-700 ${
                    getSlidePosition(index) === 0 ? 'bg-white/20' : 'bg-white/10'
                  }`}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="md:w-6 md:h-6">
                      <path 
                        d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" 
                        fill="currentColor"
                        className="text-white/60"
                      />
                    </svg>
                  </div>
                </div>

                {/* Testimonial Text */}
                <div className="flex-1 mb-4 md:mb-6 overflow-y-auto">
                  <p className={`text-white leading-relaxed transition-all duration-700 ${
                    getSlidePosition(index) === 0 ? 'text-xs md:text-base' : 'text-xs md:text-sm'
                  }`}>
                    "{testimonial.text}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-white font-medium mb-1 transition-all duration-700 ${
                      getSlidePosition(index) === 0 ? 'text-base md:text-lg' : 'text-sm md:text-base'
                    }`}>
                      {testimonial.name}
                    </p>
                    <p className={`text-white/70 transition-all duration-700 ${
                      getSlidePosition(index) === 0 ? 'text-xs md:text-sm' : 'text-xs'
                    }`}>
                      {testimonial.role}
                    </p>
                  </div>
                  
                  {/* Card Number */}
                  <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-700 ${
                    getSlidePosition(index) === 0 ? 'bg-white/20' : 'bg-white/10'
                  }`}>
                    <span className="text-white text-xs md:text-sm font-medium">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            disabled={isAnimating}
            className="absolute left-4 z-20 w-12 h-12 rounded-full backdrop-blur-md bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
            className="absolute right-4 z-20 w-12 h-12 rounded-full backdrop-blur-md bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
        </div>

        {/* Dots Indicator */}
        <div className="flex space-x-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              disabled={isAnimating}
              className={`h-2 rounded-full transition-all duration-500 ease-out ${
                index === currentIndex 
                  ? 'bg-white w-8 shadow-lg shadow-white/30' 
                  : 'bg-white/40 hover:bg-white/60 w-2'
              }`}
            />
          ))}
        </div>

       
      </div>

      <style jsx>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </section>
  )
}