'use client'

export default function Footer() {
  return (
    <footer className="relative bg-black text-white py-16 md:py-20 px-8 md:px-16 lg:px-24 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 mb-16">
          {/* Site Index */}
          <div>
            <h3 className="font-montreal text-sm text-white/60 mb-6 uppercase tracking-wider">
              Site Index
            </h3>
            <ul className="space-y-3">
              <li><a href="#home" className="font-montreal text-base text-white/80 hover:text-white transition-colors duration-300">Home</a></li>
              <li><a href="#work" className="font-montreal text-base text-white/80 hover:text-white transition-colors duration-300">Work</a></li>
              <li><a href="#about" className="font-montreal text-base text-white/80 hover:text-white transition-colors duration-300">About</a></li>
              <li><a href="#services" className="font-montreal text-base text-white/80 hover:text-white transition-colors duration-300">Services</a></li>
              <li><a href="#privacy" className="font-montreal text-base text-white/80 hover:text-white transition-colors duration-300">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-montreal text-sm text-white/60 mb-6 uppercase tracking-wider">
              Social
            </h3>
            <ul className="space-y-3">
              <li><a href="#instagram" className="font-montreal text-base text-white/80 hover:text-white transition-colors duration-300">Instagram</a></li>
              <li><a href="#facebook" className="font-montreal text-base text-white/80 hover:text-white transition-colors duration-300">Facebook</a></li>
              <li><a href="#linkedin" className="font-montreal text-base text-white/80 hover:text-white transition-colors duration-300">LinkedIn</a></li>
              <li><a href="#awwwards" className="font-montreal text-base text-white/80 hover:text-white transition-colors duration-300">Awwwards</a></li>
              <li><a href="#behance" className="font-montreal text-base text-white/80 hover:text-white transition-colors duration-300">Behance</a></li>
            </ul>
          </div>

         

          {/* Contact */}
          <div className="lg:col-span-2">
            {/* Contact Hover Area */}
            <div className="group relative bg-black hover:bg-green-400 transition-all duration-500 ease-out p-8 rounded-2xl cursor-pointer border border-white/10 hover:border-green-400">
              {/* Contact Us Button */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-2 h-2 bg-green-400 rounded-full group-hover:bg-black transition-colors duration-300"></div>
                <span className="font-montreal text-lg text-white group-hover:text-black transition-colors duration-300 bg-black group-hover:bg-green-400 px-4 py-2 rounded-full">
                  Contact Us
                </span>
              </div>

              {/* Content */}
              <div className="flex justify-between items-start">
                <div className="space-y-6">
                  <div>
                    <p className="font-montreal text-lg text-white/60 group-hover:text-black/70 transition-colors duration-300">
                      Tell us about your project.
                    </p>
                    <p className="font-montreal text-lg text-white/60 group-hover:text-black/70 transition-colors duration-300">
                      Let's collaborate.
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-white group-hover:bg-black rounded-full transition-colors duration-300"></div>
                      <p className="font-montreal text-base text-white group-hover:text-black transition-colors duration-300">
                        +27 (0) 78 054 8476
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-white group-hover:bg-black rounded-full transition-colors duration-300"></div>
                      <p className="font-montreal text-base text-white group-hover:text-black transition-colors duration-300">
                        Write Us
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1 h-1 bg-white group-hover:bg-black rounded-full transition-colors duration-300"></div>
                      <p className="font-montreal text-base text-white group-hover:text-black transition-colors duration-300">
                        Newsletter Signup
                      </p>
                    </div>
                  </div>
                </div>

                {/* Time */}
                <div className="text-right">
                  <p className="font-montreal text-sm text-white/40 group-hover:text-black/50 transition-colors duration-300">
                    08:47:28 (GMT+2)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Large Brand Name */}
        <div className="text-center mt-16">
          <h1 className="font-migra text-[12vw] md:text-[15vw] text-white leading-none tracking-tight whitespace-nowrap">
            Murphy's Law
          </h1>
        </div>
      </div>
    </footer>
  )
}