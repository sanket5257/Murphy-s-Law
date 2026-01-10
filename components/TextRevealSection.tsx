'use client'

import React, { useEffect, useRef } from 'react';

// Declare global types for GSAP
declare global {
  interface Window {
    gsap: any;
    ScrollTrigger: any;
  }
}

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load GSAP and ScrollTrigger from CDN
    const loadGSAP = async () => {
      // Create script elements
      const gsapScript = document.createElement('script');
      gsapScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js';
      gsapScript.async = true;

      const scrollTriggerScript = document.createElement('script');
      scrollTriggerScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js';
      scrollTriggerScript.async = true;

      // Wait for GSAP to load
      await new Promise((resolve) => {
        gsapScript.onload = resolve;
        document.body.appendChild(gsapScript);
      });

      // Wait for ScrollTrigger to load
      await new Promise((resolve) => {
        scrollTriggerScript.onload = resolve;
        document.body.appendChild(scrollTriggerScript);
      });

      // Initialize animations
      const gsap = window.gsap;
      const ScrollTrigger = window.ScrollTrigger;
      
      gsap.registerPlugin(ScrollTrigger);

      // Set initial position for description (start from below viewport)
      gsap.set(descriptionRef.current, {
        y: 400,
        opacity: 0
      });

      // Animate description section upward from below as user scrolls
      gsap.to(descriptionRef.current, {
        y: 0,
        opacity: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
        }
      });
    };

    loadGSAP();

    // Mouse move handler for glassmorphism glow effect
    const handleMouseMove = (e: MouseEvent) => {
      if (!descriptionRef.current || !glowRef.current) return;
      
      const rect = descriptionRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Calculate position as percentage
      const xPercent = (x / rect.width) * 100;
      const yPercent = (y / rect.height) * 100;

      // Update glow position to follow cursor
      if (window.gsap) {
        window.gsap.to(glowRef.current, {
          duration: 0.3,
          background: `radial-gradient(200px circle at ${xPercent}% ${yPercent}%, rgba(212, 165, 116, 0.3) 0%, rgba(212, 165, 116, 0.1) 50%, transparent 100%)`,
          ease: 'power2.out'
        });
      }
    };

    const handleMouseEnter = () => {
      if (window.gsap && glowRef.current) {
        window.gsap.to(glowRef.current, {
          duration: 0.3,
          opacity: 1,
          ease: 'power2.out'
        });
      }
    };

    const handleMouseLeave = () => {
      if (window.gsap && glowRef.current) {
        window.gsap.to(glowRef.current, {
          duration: 0.5,
          opacity: 0,
          ease: 'power2.out'
        });
      }
    };

    // Add event listeners after GSAP loads
    const addEventListeners = () => {
      if (descriptionRef.current) {
        descriptionRef.current.addEventListener('mousemove', handleMouseMove);
        descriptionRef.current.addEventListener('mouseenter', handleMouseEnter);
        descriptionRef.current.addEventListener('mouseleave', handleMouseLeave);
      }
    };

    // Load GSAP first, then add event listeners
    loadGSAP().then(addEventListeners);

    // Cleanup
    return () => {
      if (window.ScrollTrigger) {
        window.ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill());
      }
      if (descriptionRef.current) {
        descriptionRef.current.removeEventListener('mousemove', handleMouseMove);
        descriptionRef.current.removeEventListener('mouseenter', handleMouseEnter);
        descriptionRef.current.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div 
        ref={containerRef}
        className="sticky top-0 h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="relative w-full max-w-7xl px-8">
          {/* Main heading text - positioned to the left */}
          <div 
            ref={textRef}
            className="relative z-0"
          >
            <h1 className="text-[5rem] md:text-[7rem] lg:text-[8.5rem] leading-[0.95] font-serif">
              <span className=" text-black">Crafting competitive</span>
             
              <span className="block text-black">digital <span className="bg-gradient-to-r from-orange-500 via-orange-300 to-red-200 bg-clip-text text-transparent italic">experiences</span></span>
             
            </h1>
            
            <p className="text-[0.95rem] italic text-gray-700 mt-8 font-serif">
              Inside Myrph's Law
            </p>
          </div>

          {/* Description section with glassmorphism - positioned absolutely to the right */}
          <div 
            ref={descriptionRef}
            className="absolute z-50 top-1/2 right-8 -translate-y-1/2 max-w-xs backdrop-blur-xl bg-white/10 border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl overflow-hidden"
          >
            {/* Cursor following glow overlay */}
            <div 
              ref={glowRef}
              className="absolute inset-0 rounded-3xl opacity-0 pointer-events-none"
              style={{
                background: 'radial-gradient(200px circle at 50% 50%, rgba(212, 165, 116, 0.3) 0%, rgba(212, 165, 116, 0.1) 50%, transparent 100%)'
              }}
            />
            
            {/* Border glow effect */}
            <div className="absolute inset-0 rounded-3xl border border-[#d4a574]/20 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            
            {/* Content */}
            <div className="relative z-10">
              <p className="text-gray-600 text-sm leading-relaxed">
                Estrela Studio is a global branding and digital design agency rooted in 
                Vienna and Cape Town. We live and breathe our craft, building brands, 
                websites, and digital products that turn bold ideas into design that 
                matters
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer for scroll */}
    </div>
  );
}