'use client'

export default function MarqueeSection() {
  // Array of partner logos (duplicating available logos for demo)
  const partnerLogos = [
    { src: '/img/SMAI-Logo.png', alt: 'SMAI Law Firm' },
    { src: '/img/3.png', alt: 'Partner Law Firm' },
    { src: '/img/SMAI-Logo.png', alt: 'SMAI Legal' },
    { src: '/img/3.png', alt: 'Legal Partners' },
    { src: '/img/SMAI-Logo.png', alt: 'SMAI Partners' },
    { src: '/img/3.png', alt: 'Law Associates' },
    { src: '/img/SMAI-Logo.png', alt: 'SMAI Associates' },
    { src: '/img/3.png', alt: 'Legal Group' },
  ]

  return (
    <section className="relative py-16 md:py-24 bg-white overflow-hidden">
      {/* Section Title */}
      <div className="text-center mb-12 md:mb-16">
        <h2 className="font-migra text-3xl md:text-4xl lg:text-5xl text-black leading-tight">
          Partner Law Firms
        </h2>
      </div>

      {/* Marquee Container */}
      <div className="marquee-container overflow-hidden whitespace-nowrap">
        <div className="marquee-content inline-flex items-center gap-16 md:gap-24 lg:gap-32 animate-marquee">
          {/* First set of logos */}
          {partnerLogos.map((logo, index) => (
            <div 
              key={`first-${index}`}
              className="flex-shrink-0 flex items-center justify-center h-16 md:h-20 lg:h-24"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="max-h-full max-w-full object-contain opacity-60 hover:opacity-100 transition-opacity duration-300 filter grayscale hover:grayscale-0"
                style={{ maxWidth: '200px' }}
              />
            </div>
          ))}
          {/* Second set of logos for seamless loop */}
          {partnerLogos.map((logo, index) => (
            <div 
              key={`second-${index}`}
              className="flex-shrink-0 flex items-center justify-center h-16 md:h-20 lg:h-24"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="max-h-full max-w-full object-contain opacity-60 hover:opacity-100 transition-opacity duration-300 filter grayscale hover:grayscale-0"
                style={{ maxWidth: '200px' }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        
        .marquee-container:hover .animate-marquee {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}