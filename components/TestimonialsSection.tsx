'use client'

import React, { useRef, useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'
import 'swiper/css/effect-coverflow'

const testimonials = [
  {
    text: "The team at Estrela have been amazing and critical to our UI/UX journey, they challenge our thoughts for the better and have allowed us to become South Africa's fastest-growing Buy Now Pay Later platform. I cannot recommend them enough.",
    name: "Craig Newborn",
    role: "Former CEO, PayJustNow"
  },
  {
    text: "Working with Estrela Studio has been a genuinely outstanding experience. Their team brings a rare combination of creativity, technical expertise, and collaborative spirit. Estrela met us exactly where we were – they listened closely, understood the strategic goals and translated that direction into clear, compelling visual design.",
    name: "Donna Blackwell-Kopotic",
    role: "Sims Lifecycle Service (US)"
  },
  {
    text: "The Estrela team have a grasp of branding and product design like I've never seen before. We searched the globe for a tech-focused CI design agency and found that the top talent was right here in Cape Town.",
    name: "Colleen Harrison",
    role: "Former Head of Marketing, Payfast"
  }
]

export default function TestimonialsSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const swiperRef = useRef<SwiperType | null>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(console.error)
    }
  }, [])

  const handleSlideChange = (swiper: SwiperType) => {
    setCurrentTestimonial(swiper.activeIndex)
  }

  const goToTestimonial = (index: number) => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(index)
    }
  }

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/videos/aK8JRWGNHVfTOXgT_estrela-hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center items-center px-4 md:px-8 lg:px-16 xl:px-24 2xl:px-32 py-16 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-24">
          {/* Glassmorphism badge */}
          <div className="inline-flex items-center px-4 py-2 lg:px-6 lg:py-3 mb-8 lg:mb-12 rounded-full backdrop-blur-md bg-white/10 border border-white/20">
            <span className="text-white/80 text-sm lg:text-base font-medium">Testimonials</span>
          </div>

          <h2 className="text-white mx-auto">
            Some words from our
            <br />
            valued clients
          </h2>
        </div>

        {/* Swiper Testimonials Carousel */}
        <div className="relative w-full">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            centeredSlides={true}
            speed={800}
            allowTouchMove={true}
            grabCursor={true}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper
            }}
            onSlideChange={handleSlideChange}
            className="w-full"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <div className="flex justify-center items-center space-x-6 lg:space-x-8 xl:space-x-12">
                  {/* Left Card (Previous) */}
                  <div className="hidden lg:block w-80 xl:w-96 2xl:w-[420px] opacity-50 transform scale-90">
                    <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-8 xl:p-10 h-[400px] xl:h-[450px] flex flex-col justify-between">
                      <div>
                        <p className="text-white/80 text-sm xl:text-base leading-relaxed mb-4">
                          "{testimonials[(index - 1 + testimonials.length) % testimonials.length].text.substring(0, 120)}..."
                        </p>
                      </div>
                      <div>
                        <p className="text-white font-medium text-lg xl:text-xl">
                          {testimonials[(index - 1 + testimonials.length) % testimonials.length].name}
                        </p>
                        <p className="text-white/60 text-sm xl:text-base">
                          {testimonials[(index - 1 + testimonials.length) % testimonials.length].role}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Center Card (Current) */}
                  <div className="w-full lg:w-[600px] xl:w-[700px] 2xl:w-[800px] transform scale-100">
                    <div className="backdrop-blur-xl bg-white/15 border border-white/30 rounded-2xl p-8 md:p-10 lg:p-12 xl:p-16 shadow-2xl min-h-[400px] xl:min-h-[450px] flex flex-col justify-between">
                      <div className="mb-6">
                        <p className="text-white text-base lg:text-lg xl:text-xl leading-relaxed">
                          "{testimonial.text}"
                        </p>
                      </div>
                      <div>
                        <p className="text-white font-medium subheading-medium mb-1">
                          {testimonial.name}
                        </p>
                        <p className="text-white/70 text-sm xl:text-base">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right Card (Next) */}
                  <div className="hidden lg:block w-80 xl:w-96 2xl:w-[420px] opacity-50 transform scale-90">
                    <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-8 xl:p-10 h-[400px] xl:h-[450px] flex flex-col justify-between">
                      <div>
                        <p className="text-white/80 text-sm xl:text-base leading-relaxed mb-4">
                          "{testimonials[(index + 1) % testimonials.length].text.substring(0, 120)}..."
                        </p>
                      </div>
                      <div>
                        <p className="text-white font-medium text-lg xl:text-xl">
                          {testimonials[(index + 1) % testimonials.length].name}
                        </p>
                        <p className="text-white/60 text-sm xl:text-base">
                          {testimonials[(index + 1) % testimonials.length].role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Dots Indicator */}
        <div className="flex space-x-2 mt-12 justify-center">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentTestimonial 
                  ? 'bg-white' 
                  : 'bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}