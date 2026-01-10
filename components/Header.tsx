'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function Header() {
  const navRef = useRef<HTMLElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const navMenuRef = useRef<HTMLDivElement>(null)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const nav = navRef.current
    const glow = glowRef.current
    const navMenu = navMenuRef.current

    if (!nav || !glow) return

    // Scroll handler to hide/show navigation
    const handleScroll = () => {
      const scrolled = window.pageYOffset
      const maxScroll = 300 // Longer scroll distance for smoother transition
      const scrollProgress = Math.min(scrolled / maxScroll, 1) // 0 to 1
      
      // Use easing function for smoother transition
      const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4)
      const easedProgress = easeOutQuart(scrollProgress)
      
      setIsScrolled(scrolled > 50)

      if (navMenu && nav) {
        // Very smooth opacity transition
        const opacity = Math.max(0, 1 - (easedProgress * 1.5))
        
        // Smooth header width transition with CSS
        nav.style.maxWidth = `${1152 - (easedProgress * 852)}px`
        navMenu.style.opacity = opacity.toString()
        
        // Hide navigation completely when opacity is very low
        if (opacity < 0.1) {
          navMenu.style.visibility = 'hidden'
        } else {
          navMenu.style.visibility = 'visible'
        }
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = nav.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      // Calculate position as percentage
      const xPercent = (x / rect.width) * 100
      const yPercent = (y / rect.height) * 100

      // Update glow position to follow cursor
      gsap.to(glow, {
        duration: 0.3,
        background: `radial-gradient(150px circle at ${xPercent}% ${yPercent}%, rgba(147, 51, 234, 0.4) 0%, rgba(147, 51, 234, 0.1) 50%, transparent 100%)`,
        ease: 'power2.out'
      })
    }

    const handleMouseEnter = () => {
      gsap.to(glow, {
        duration: 0.3,
        opacity: 1,
        ease: 'power2.out'
      })
    }

    const handleMouseLeave = () => {
      gsap.to(glow, {
        duration: 0.5,
        opacity: 0,
        ease: 'power2.out'
      })
    }

    window.addEventListener('scroll', handleScroll)
    nav.addEventListener('mousemove', handleMouseMove)
    nav.addEventListener('mouseenter', handleMouseEnter)
    nav.addEventListener('mouseleave', handleMouseLeave)

    // Initial call
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      nav.removeEventListener('mousemove', handleMouseMove)
      nav.removeEventListener('mouseenter', handleMouseEnter)
      nav.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-6 py-5 md:px-8 md:py-6">
      <nav 
        ref={navRef}
        className="relative flex items-center backdrop-blur-xl bg-white/10 border border-white/10 rounded-full px-6 md:px-8 py-2.5 md:py-3 shadow-2xl max-w-6xl w-full overflow-hidden transition-all duration-500 ease-out"
      >
        {/* Cursor following glow overlay */}
        <div 
          ref={glowRef}
          className="absolute inset-0 rounded-full opacity-0 pointer-events-none"
          style={{
            background: 'radial-gradient(150px circle at 50% 50%, rgba(147, 51, 234, 0.4) 0%, rgba(147, 51, 234, 0.1) 50%, transparent 100%)'
          }}
        />
        
        {/* Border glow effect */}
        <div className="absolute inset-0 rounded-full border border-purple-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        
        {/* Logo on Left Corner */}
        <div className="relative z-10 flex items-center flex-shrink-0">
          <img 
            src="/img/logo.png" 
            alt="Estrela Studio" 
            className="h-8 md:h-10 w-auto"
          />
        </div>
        
        {/* Navigation Menu in Center */}
        <div 
          ref={navMenuRef}
          className="relative z-10 flex-1 flex justify-center overflow-hidden transition-all duration-500 ease-out"
          style={{ transitionProperty: 'opacity, visibility' }}
        >
          <ul className="flex list-none gap-6 md:gap-8 items-center m-0 p-0 whitespace-nowrap">
            <li className="flex items-center gap-1">
              <a href="#platform" className="font-montreal text-xs md:text-sm text-white/80 hover:text-white transition-colors duration-300">Platform</a>
              <svg className="w-3 h-3 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </li>
            <li className="flex items-center gap-1">
              <a href="#solutions" className="font-montreal text-xs md:text-sm text-white/80 hover:text-white transition-colors duration-300">Solutions</a>
              <svg className="w-3 h-3 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </li>
            <li>
              <a href="#customers" className="font-montreal text-xs md:text-sm text-white/80 hover:text-white transition-colors duration-300">Customers</a>
            </li>
            <li>
              <a href="/security" className="font-montreal text-xs md:text-sm text-white/80 hover:text-white transition-colors duration-300">Security</a>
            </li>
            <li className="flex items-center gap-1">
              <a href="#resources" className="font-montreal text-xs md:text-sm text-white/80 hover:text-white transition-colors duration-300">Resources</a>
              <svg className="w-3 h-3 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </li>
            <li className="flex items-center gap-1">
              <a href="#about" className="font-montreal text-xs md:text-sm text-white/80 hover:text-white transition-colors duration-300">About</a>
              <svg className="w-3 h-3 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </li>
          </ul>
        </div>
        
        {/* Login Button on Right Corner */}
        <div className="relative z-10 flex items-center flex-shrink-0">
          <button className="font-montreal text-xs md:text-sm text-white/80 hover:text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-full px-4 md:px-6 py-2 transition-all duration-300">
            Login
          </button>
        </div>
      </nav>
    </header>
  )
}