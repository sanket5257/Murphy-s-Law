'use client'

export default function MarqueeSection() {
  // Array of partner logos using available images from public folder
  const partnerLogos = [
    { src: '/img/SMAI-Logo.png', alt: 'SMAI Law Firm' },
    { src: '/img/Black-Attorneys-Inc.png', alt: 'Black Attorneys Inc' },
    { src: '/img/bregman.png', alt: 'Bregman Law' },
    { src: '/img/Brittan-law.png', alt: 'Brittan Law' },
    { src: '/img/mmh-logo.png', alt: 'MMH Legal' },
    { src: '/img/RSW-logo.webp', alt: 'RSW Law' },
    { src: '/img/SAI-Logo.webp', alt: 'SAI Legal' },
    { src: '/img/Wright-inc.webp', alt: 'Wright Inc Law' },
    { src: '/img/3.png', alt: 'Partner Law Firm' },
    { src: '/img/4.png', alt: 'Legal Associates' },
    { src: '/img/5.png', alt: 'Law Partners' },
  ]

  return (
    <section className="relative pb-40 bg-white overflow-hidden">
      <div className="">
        {/* Section Title */}
        <div className="text-center mb-16 ">
        <h2 className="text-black">
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
              className="flex-shrink-0 flex items-center justify-center h-20 md:h-24 w-32 md:w-40"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="object-contain transition-all duration-300 filter grayscale hover:grayscale-0 hover:scale-105"
                style={{ maxWidth: '160px', maxHeight: '80px' }}
              />
            </div>
          ))}
          {/* Second set of logos for seamless loop */}
          {partnerLogos.map((logo, index) => (
            <div 
              key={`second-${index}`}
              className="flex-shrink-0 flex items-center justify-center h-20 md:h-24 w-32 md:w-40"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="object-contain transition-all duration-300 filter grayscale hover:grayscale-0 hover:scale-105"
                style={{ maxWidth: '160px', maxHeight: '80px' }}
              />
            </div>
          ))}
        </div>
        </div>

        {/* Text below marquee - right bottom */}
        <div className="flex justify-end mt-16 px-4 md:px-8 lg:px-16 xl:px-24 2xl:px-32">
          <p className="text-black text-right max-w-2xl font-migra text-lg md:text-xl">
Refocus your time on high-value legal work.
Murphy removes administrative friction so your firm can think sharper, act faster, and serve clients at a higher standard.          </p>
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