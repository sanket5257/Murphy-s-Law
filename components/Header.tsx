'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function Header() {
  const navRef = useRef<HTMLElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const navMenuRef = useRef<HTMLDivElement>(null)
  const authButtonsRef = useRef<HTMLDivElement>(null)
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up')
  const [isDarkSection, setIsDarkSection] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const nav = navRef.current
    const glow = glowRef.current
    const navMenu = navMenuRef.current

    if (!nav || !glow) return

    // Section background detection
    const observerOptions = {
      root: null,
      rootMargin: '-80px 0px -80% 0px', // Only trigger when section is near the header
      threshold: 0
    }

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const section = entry.target as HTMLElement
          const bgColor = window.getComputedStyle(section).backgroundColor
          const bgClass = section.className
          
          // Check if section has dark background
          const hasWhiteBg = bgClass.includes('bg-white') || bgColor === 'rgb(255, 255, 255)'
          const hasBlackBg = bgClass.includes('bg-black') || 
                            bgClass.includes('bg-gray-900') || 
                            bgClass.includes('bg-slate-900') ||
                            bgClass.includes('bg-zinc-900') ||
                            bgColor === 'rgb(0, 0, 0)'
          const hasVideoWithDarkOverlay = !!section.querySelector('video') && !hasWhiteBg
          
          const isDark = (hasBlackBg || hasVideoWithDarkOverlay) && !hasWhiteBg
          
          console.log('Section detected:', {
            className: bgClass,
            backgroundColor: bgColor,
            hasWhiteBg,
            hasBlackBg,
            hasVideoWithDarkOverlay,
            isDark
          })
          
          setIsDarkSection(isDark)
        }
      })
    }, observerOptions)

    // Observe all sections
    const sections = document.querySelectorAll('section')
    sections.forEach(section => sectionObserver.observe(section))

    // Scroll handler to hide/show navigation
    const handleScroll = () => {
      const scrolled = window.pageYOffset
      const maxScroll = 300 // Longer scroll distance for smoother transition
      
      // Detect scroll direction
      const currentScrollY = scrolled
      const direction = currentScrollY > lastScrollY.current ? 'down' : 'up'
      setScrollDirection(direction)
      lastScrollY.current = currentScrollY

      if (navMenuRef.current && authButtonsRef.current && nav) {
        // If scrolling up or at top, expand header
        if (direction === 'up' || scrolled < 50) {
          // Expand header - show everything
          nav.style.maxWidth = '1152px'
          navMenuRef.current.style.opacity = '1'
          navMenuRef.current.style.visibility = 'visible'
          authButtonsRef.current.style.opacity = '1'
          authButtonsRef.current.style.visibility = 'visible'
          
          // Show both buttons
          const loginBtn = authButtonsRef.current.querySelector('a:first-child') as HTMLElement
          const signupBtn = authButtonsRef.current.querySelector('a:last-child') as HTMLElement
          if (loginBtn && signupBtn) {
            loginBtn.style.display = 'block'
            signupBtn.style.display = 'block'
          }
        } else {
          // Scrolling down - contract header
          const scrollProgress = Math.min(scrolled / maxScroll, 1) // 0 to 1
          
          // Use easing function for smoother transition
          const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4)
          const easedProgress = easeOutQuart(scrollProgress)
          
          // Smooth header width transition
          nav.style.maxWidth = `${1152 - (easedProgress * 852)}px`
          
          // Hide navigation menu completely
          navMenuRef.current.style.opacity = '0'
          navMenuRef.current.style.visibility = 'hidden'
          
          // Keep auth buttons visible but hide Sign Up, show only Login
          authButtonsRef.current.style.opacity = '1'
          authButtonsRef.current.style.visibility = 'visible'
          
          const loginBtn = authButtonsRef.current.querySelector('a:first-child') as HTMLElement
          const signupBtn = authButtonsRef.current.querySelector('a:last-child') as HTMLElement
          if (loginBtn && signupBtn) {
            loginBtn.style.display = 'block'
            signupBtn.style.display = 'none' // Hide Sign Up when contracted
          }
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
      
      // Cleanup observer
      const sections = document.querySelectorAll('section')
      sections.forEach(section => sectionObserver?.unobserve(section))
    }
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-6 py-5 md:px-8 md:py-6">
      <nav 
        ref={navRef}
        className="relative flex items-center backdrop-blur-xl bg-white/10 border border-white/10 rounded-full px-6 md:px-8 py-2.5 md:py-3 shadow-2xl  w-full overflow-hidden transition-all duration-500 ease-out"
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
          <a href="/" className="cursor-pointer">
            <img 
              src="/img/logo.png" 
              alt="Murphy's Law" 
              className="h-8 md:h-10 w-auto hover:opacity-80 transition-all duration-300"
              style={{ 
                filter: isDarkSection 
                  ? 'brightness(0) invert(1)' // White logo on dark sections
                  : 'brightness(0) invert(0)', // Black logo on light sections
                transition: 'filter 0.3s ease'
              }}
            />
          </a>
        </div>
        
        {/* Navigation Menu in Center */}
        <div 
          ref={navMenuRef}
          className="hidden md:flex relative z-10 flex-1 justify-center overflow-hidden transition-all duration-500 ease-out"
          style={{ transitionProperty: 'opacity, visibility' }}
        >
          <ul className="flex list-none gap-6 md:gap-8 items-center m-0 p-0 whitespace-nowrap">
            <li className="flex items-center gap-1">
              <a 
                href="/#Key_Features" 
                className={`font-montreal text-xs md:text-sm transition-colors duration-300 ${
                  isDarkSection 
                    ? 'text-white/80 hover:text-white' 
                    : 'text-black/80 hover:text-black'
                }`}
              >
                Key Features
              </a>
            </li>
            <li className="flex items-center gap-1">
              <a 
                href="/#pricing"
                className={`font-montreal text-xs md:text-sm transition-colors duration-300 ${
                  isDarkSection 
                    ? 'text-white/80 hover:text-white' 
                    : 'text-black/80 hover:text-black'
                }`}
              >
              Pricing
              </a>
            </li>
            <li>
              <a 
                href="/#About" 
                className={`font-montreal text-xs md:text-sm transition-colors duration-300 ${
                  isDarkSection 
                    ? 'text-white/80 hover:text-white' 
                    : 'text-black/80 hover:text-black'
                }`}
              >
                About
              </a>
            </li>
            <li className="flex items-center gap-1">
              <a 
                href="#contact" 
                className={`font-montreal text-xs md:text-sm transition-colors duration-300 ${
                  isDarkSection 
                    ? 'text-white/80 hover:text-white' 
                    : 'text-black/80 hover:text-black'
                }`}
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
        
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden relative z-10 flex items-center justify-center ml-auto mr-2"
          aria-label="Toggle menu"
        >
          <div className="flex flex-col gap-1.5">
            <span className={`w-6 h-0.5 rounded-full transition-colors duration-300 ${
              isDarkSection ? 'bg-white' : 'bg-black'
            }`} />
            <span className={`w-6 h-0.5 rounded-full transition-colors duration-300 ${
              isDarkSection ? 'bg-white' : 'bg-black'
            }`} />
            <span className={`w-6 h-0.5 rounded-full transition-colors duration-300 ${
              isDarkSection ? 'bg-white' : 'bg-black'
            }`} />
          </div>
        </button>
        
        {/* Login and Sign Up Buttons on Right Corner */}
        <div 
          ref={authButtonsRef}
          className="hidden md:flex relative z-10 items-center flex-shrink-0 gap-3 transition-all duration-500 ease-out"
          style={{ transitionProperty: 'opacity, visibility' }}
        >
          <a 
            href="https://app.murphys-law.ai/?_gl=1*r2vl0e*_ga*MTU1NDY5OTcwOC4xNzY3OTUzNjc1*_ga_HQ19QDQ45R*czE3NjgzNjk1MzckbzExJGcwJHQxNzY4MzY5NTM3JGo2MCRsMCRoMA.."
            className={`font-montreal text-xs md:text-sm rounded-full px-4 md:px-6 py-2 transition-all duration-300 ${
              isDarkSection 
                ? 'bg-transparent hover:bg-white/10 border border-white/20 text-white/80 hover:text-white' 
                : 'bg-transparent hover:bg-black/10 border border-black/20 text-black/80 hover:text-black'
            }`}
          >
            Login
          </a>
          <a 
            href="https://app.murphys-law.ai/sign-up?_gl=1*1ihcngf*_ga*MTU1NDY5OTcwOC4xNzY3OTUzNjc1*_ga_HQ19QDQ45R*czE3Njg2NDU5NDckbzE5JGcwJHQxNzY4NjQ1OTQ3JGo2MCRsMCRoMA.."
            className={`font-montreal text-xs md:text-sm rounded-full px-4 md:px-6 py-2 transition-all duration-300 ${
              isDarkSection 
                ? 'bg-white text-black hover:bg-white/90' 
                : 'bg-black text-white hover:bg-black/90'
            }`}
          >
            Sign Up
          </a>
        </div>
      </nav>

      {/* Mobile Slide-in Menu */}
      <div 
        className={`fixed top-0 right-0 h-full w-64 backdrop-blur-xl bg-white/10 border-l border-white/10 shadow-2xl transform transition-transform duration-300 ease-in-out z-40 ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full pt-24 px-8">
          {/* Close Button */}
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className={`absolute top-6 right-6 p-2 transition-colors duration-300 ${
              isDarkSection ? 'text-white' : 'text-black'
            }`}
            aria-label="Close menu"
          >
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Mobile Navigation Links */}
          <nav className="flex flex-col gap-6">
            <a 
              href="/#Key_Features"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`font-montreal text-lg transition-colors duration-300 ${
                isDarkSection 
                  ? 'text-white/80 hover:text-white' 
                  : 'text-black/80 hover:text-black'
              }`}
            >
              Key Features
            </a>
            <a 
              href="/#pricing"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`font-montreal text-lg transition-colors duration-300 ${
                isDarkSection 
                  ? 'text-white/80 hover:text-white' 
                  : 'text-black/80 hover:text-black'
              }`}
            >
              Pricing
            </a>
            <a 
              href="/#About"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`font-montreal text-lg transition-colors duration-300 ${
                isDarkSection 
                  ? 'text-white/80 hover:text-white' 
                  : 'text-black/80 hover:text-black'
              }`}
            >
              About
            </a>
            <a 
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`font-montreal text-lg transition-colors duration-300 ${
                isDarkSection 
                  ? 'text-white/80 hover:text-white' 
                  : 'text-black/80 hover:text-black'
              }`}
            >
              Contact
            </a>
            
            {/* Mobile Login and Sign Up Buttons */}
            <div className="flex flex-col gap-3 mt-6">
              <a 
                href="https://app.murphys-law.ai/?_gl=1*r2vl0e*_ga*MTU1NDY5OTcwOC4xNzY3OTUzNjc1*_ga_HQ19QDQ45R*czE3NjgzNjk1MzckbzExJGcwJHQxNzY4MzY5NTM3JGo2MCRsMCRoMA.."
                className={`font-montreal text-lg rounded-full px-6 py-3 text-center transition-all duration-300 ${
                  isDarkSection 
                    ? 'bg-transparent hover:bg-white/10 border border-white/20 text-white/80 hover:text-white' 
                    : 'bg-transparent hover:bg-black/10 border border-black/20 text-black/80 hover:text-black'
                }`}
              >
                Login
              </a>
              <a 
                href="https://app.murphys-law.ai/?_gl=1*r2vl0e*_ga*MTU1NDY5OTcwOC4xNzY3OTUzNjc1*_ga_HQ19QDQ45R*czE3NjgzNjk1MzckbzExJGcwJHQxNzY4MzY5NTM3JGo2MCRsMCRoMA.."
                className={`font-montreal text-lg rounded-full px-6 py-3 text-center transition-all duration-300 ${
                  isDarkSection 
                    ? 'bg-white text-black hover:bg-white/90' 
                    : 'bg-black text-white hover:bg-black/90'
                }`}
              >
                Sign Up
              </a>
            </div>
          </nav>
        </div>
      </div>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </header>
  )
}