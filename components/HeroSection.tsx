'use client'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen w-full bg-white">
      {/* Content */}
      <div className="relative z-10 flex flex-col justify-start items-center px-4 md:px-8 lg:px-12 text-center pt-32 pb-16">
        {/* Top tagline */}
        <p className="font-montreal text-sm md:text-base text-black/80 tracking-widest uppercase mb-8">
          DISCOVER THE FUTURE OF LAW
        </p>
        
        {/* Main Heading */}
        <h1 className="font-migra text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-black leading-tight mb-12 max-w-5xl">
          Legal Intelligence.
          <br />
          Redefined.
        </h1>
        
        {/* CTA Button */}
        <div className="mb-16">
          <button className="bg-black text-white font-montreal font-medium px-8 py-3 rounded-sm hover:bg-gray-800 transition-colors duration-300">
            Request a Demo
          </button>
        </div>
        
        {/* Bottom tagline */}
        <div className="max-w-2xl mb-12">
          <h2 className="font-montreal text-2xl md:text-3xl text-black font-medium leading-relaxed">
            Empower Your Legal Journey
            <br />
            with AI-Driven Expertise
          </h2>
        </div>
        
        {/* Video Section */}
        <div className="w-full max-w-6xl">
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