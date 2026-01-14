'use client'

export default function MarqueeSection() {
  // Array of partner logos (duplicating available logos for demo)
  const partnerLogos = [
    { src: '/img/SMAI-Logo.png', alt: 'SMAI Law Firm' },
    { src: '/img/3.png', alt: 'Partner Law Firm' },
    { src: '/img/5.png', alt: 'SMAI Legal' },
    { src: '/img/3.png', alt: 'Legal Partners' },
    { src: '/img/mmh-logo.png', alt: 'SMAI Partners' },
    { src: '/img/3.png', alt: 'Law Associates' },
    { src: '/img/SMAI-Logo.png', alt: 'SMAI Associates' },
    { src: '/img/3.png', alt: 'Legal Group' },
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
              className="flex-shrink-0 flex items-center justify-center h-20 md:h-24"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="object-contain transition-opacity duration-300 filter grayscale hover:grayscale-0"
                style={{ maxWidth: '200px', maxHeight: '100%' }}
              />
            </div>
          ))}
          {/* Second set of logos for seamless loop */}
          {partnerLogos.map((logo, index) => (
            <div 
              key={`second-${index}`}
              className="flex-shrink-0 flex items-center justify-center h-20 md:h-24"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="object-contain transition-opacity duration-300 filter grayscale hover:grayscale-0"
                style={{ maxWidth: '200px', maxHeight: '100%' }}
              />
            </div>
          ))}
        </div>
        </div>

        {/* Text below marquee - right bottom */}
        <div className="flex justify-end mt-16 px-4 md:px-8 lg:px-16 xl:px-24 2xl:px-32">
          <p className="text-black text-right max-w-2xl font-migra text-lg md:text-xl">
            Spend less time on routine, and more time on the work only lawyers can do. Murphy frees you from admin so you can think sharper, move faster, and deliver more for your clients.
          </p>
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