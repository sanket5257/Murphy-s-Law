'use client'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen w-full bg-white">
      {/* Content */}
      <div className="relative z-10 flex flex-col justify-start items-center px-4 md:px-8 lg:px-16 xl:px-24 2xl:px-32 text-center pt-32 pb-16 md:pb-24 lg:pb-32 max-w-[1920px] mx-auto">
        {/* Top tagline */}
        <p className="tagline text-black/80 mb-8 lg:mb-12">
          DISCOVER THE FUTURE OF LAW
        </p>
        
        {/* Main Heading */}
        <h1 className="text-black mb-12 lg:mb-16 max-w-6xl">
          Legal Intelligence.
          <br />
          Redefined.
        </h1>
        
        {/* CTA Button */}
        <div className="mb-16 lg:mb-20">
          <button className="bg-black text-white font-montreal font-medium px-8 py-3 lg:px-10 lg:py-4 xl:px-12 xl:py-5 rounded-sm hover:bg-gray-800 transition-colors duration-300 text-base lg:text-lg">
            Request a Demo
          </button>
        </div>
        
        {/* Bottom tagline */}
        <div className="max-w-3xl mb-12 lg:mb-16">
          <h2 className="subheading-large text-black font-medium">
            Empower Your Legal Journey
            <br />
            with AI-Driven Expertise
          </h2>
        </div>
        
        {/* Video Section */}
        <div className="w-full max-w-7xl 2xl:max-w-[1600px]">
          <video
            className="w-full h-auto rounded-lg shadow-2xl"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/videos/aN6JiJ5xUNkB1alN_EstrelaShowreelPreviewV2.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  )
}