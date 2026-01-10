import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FAQSection from '@/components/FAQSection'

export default function SecurityPage() {
  return (
    <main className="min-h-screen  bg-black">
      <Header />
      
      {/* Main Security Section */}
      <section className="min-h-screen flex">
        {/* Left Side - Content */}
        <div className="w-1/2 bg-black flex flex-col justify-center px-16 py-32">
          <div className="max-w-md">
            {/* Small header */}
            <div className="flex items-center gap-2 mb-8">
              <span className="font-montreal text-xs text-white/60 uppercase tracking-wider">SECURITY</span>
              <span className="font-montreal text-xs text-white/40">Always on. Always secure.</span>
            </div>
            
            {/* Main heading */}
            <h1 className="font-migra text-5xl text-white leading-tight mb-8">
              Your data is<br />
              in safe hands.
            </h1>
            
            {/* Description */}
            <p className="font-montreal text-white/70 text-base leading-relaxed mb-12">
              From encryption to access management, Murphy's Law<br />
              enforces rigorous standards to ensure your data stays<br />
              secure, private, and compliant.
            </p>
            
            {/* CTA Button */}
            <button className="font-montreal text-black bg-white hover:bg-white/90 px-6 py-3 text-sm transition-all duration-300">
              Go to trust center
            </button>
          </div>
        </div>
        
        {/* Right Side - Image */}
        <div className="w-1/2 relative overflow-hidden">
          <img 
            src="/img/security iamges/4NiQ5LBDGQ2eSxB2XzEI2lZg8Fg.webp"
            alt="Security Architecture"
            className="w-full h-full object-cover"
          />
          
          {/* Floating Security Icons */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            {/* Main security card */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-2xl flex items-center gap-4">
              {/* Shield icon */}
              <div className="w-8 h-8 flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              
              {/* Center icon with dots pattern */}
              <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center">
                <div className="grid grid-cols-3 gap-1">
                  <div className="w-1 h-1 bg-white rounded-full"></div>
                  <div className="w-1 h-1 bg-white rounded-full"></div>
                  <div className="w-1 h-1 bg-white rounded-full"></div>
                  <div className="w-1 h-1 bg-white rounded-full"></div>
                  <div className="w-1 h-1 bg-white rounded-full"></div>
                  <div className="w-1 h-1 bg-white rounded-full"></div>
                  <div className="w-1 h-1 bg-white rounded-full"></div>
                  <div className="w-1 h-1 bg-white rounded-full"></div>
                  <div className="w-1 h-1 bg-white rounded-full"></div>
                </div>
              </div>
              
              {/* Lock icon */}
              <div className="w-8 h-8 flex items-center justify-center">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      
      {/* Your Data, Your Decisions Section */}
      <section className="bg-neutral-900 min-h-screen flex items-center px-16">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20">
            <p className="font-montreal text-xs text-white/60 uppercase tracking-wider mb-6">
              YOUR DATA, YOUR DECISIONS
            </p>
            <h2 className="font-migra text-4xl md:text-5xl text-white leading-tight">
              You maintain control over your data at all times.
            </h2>
          </div>
          
          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border border-white/10 rounded-2xl overflow-hidden">
            
            {/* Data retention */}
            <div className="text-center p-8 border-r border-white/10 last:border-r-0 lg:last:border-r-0">
              <div className="w-32 h-32 mx-auto mb-8 flex items-center justify-center">
                <img 
                  src="/img/security iamges/4RqCDyH9K3kIMnlRI2SG2uD16k.svg"
                  alt="Data retention"
                  className="w-24 h-24"
                />
              </div>
              <h3 className="font-montreal text-white text-lg font-medium mb-4">Data retention</h3>
              <p className="font-montreal text-white/70 text-sm leading-relaxed">
                Set and manage data retention periods to align with your<br />
                internal policies and regulatory requirements.
              </p>
            </div>
            
            {/* Data governance */}
            <div className="text-center p-8 border-r border-white/10 last:border-r-0 lg:last:border-r-0">
              <div className="w-32 h-32 mx-auto mb-8 flex items-center justify-center">
                <img 
                  src="/img/security iamges/AEXl1pc8GJPqy9VFYUI4pzVvWY8.svg"
                  alt="Data governance"
                  className="w-24 h-24"
                />
              </div>
              <h3 className="font-montreal text-white text-lg font-medium mb-4">Data governance</h3>
              <p className="font-montreal text-white/70 text-sm leading-relaxed">
                Murphy's Law Data Governance tools give you real-time insight into<br />
                who's accessing your data and when.
              </p>
            </div>
            
            {/* Encryption management */}
            <div className="text-center p-8 border-r border-white/10 last:border-r-0 lg:last:border-r-0">
              <div className="w-32 h-32 mx-auto mb-8 flex items-center justify-center">
                <img 
                  src="/img/security iamges/Cgztt1a8Ehqzd97ENh7tr2Am4vQ.svg"
                  alt="Encryption management"
                  className="w-24 h-24"
                />
              </div>
              <h3 className="font-montreal text-white text-lg font-medium mb-4">Encryption management</h3>
              <p className="font-montreal text-white/70 text-sm leading-relaxed">
                Manage your own encryption keys with our BYOK option to<br />
                keep sensitive data protected at all times.
              </p>
            </div>
            
            {/* User authentication */}
            <div className="text-center p-8">
              <div className="w-32 h-32 mx-auto mb-8 flex items-center justify-center">
                <img 
                  src="/img/security iamges/4RqCDyH9K3kIMnlRI2SG2uD16k.svg"
                  alt="User authentication"
                  className="w-24 h-24"
                />
              </div>
              <h3 className="font-montreal text-white text-lg font-medium mb-4">User authentication</h3>
              <p className="font-montreal text-white/70 text-sm leading-relaxed">
                SSO integration gives you complete control over user<br />
                authentication and access management.
              </p>
            </div>
            
          </div>
        </div>
      </section>

      {/* Trusted Data Storage & Legal-grade Security Section */}
      <section className="bg-black py-24 px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32">
            
            {/* Trusted Data Storage */}
            <div>
              <h2 className="font-migra text-4xl text-white mb-16 leading-tight">
                Trusted data storage
              </h2>
              
              <div className="space-y-12">
                {/* Tiered Storage */}
                <div>
                  <h3 className="font-montreal text-white text-lg font-medium mb-4">Tiered Storage</h3>
                  <p className="font-montreal text-white/70 text-sm leading-relaxed">
                    Murphy's Law offers flexible storage options designed to match different data sensitivity levels and<br />
                    compliance needs.
                  </p>
                </div>
                
                {/* EU-hosted and US-based support */}
                <div>
                  <h3 className="font-montreal text-white text-lg font-medium mb-4">EU-hosted and US-based support</h3>
                  <p className="font-montreal text-white/70 text-sm leading-relaxed">
                    Murphy's Law has both EU-hosted and US-based technical work forces, meaning we ensure a higher<br />
                    level of processing for local data.
                  </p>
                </div>
                
                {/* No foundation model training */}
                <div>
                  <h3 className="font-montreal text-white text-lg font-medium mb-4">No foundation model training</h3>
                  <p className="font-montreal text-white/70 text-sm leading-relaxed">
                    Your confidential data remains secure and private to you. Murphy's Law will not use your data to train<br />
                    or fine tune any AI models.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Legal-grade Security */}
            <div>
              <h2 className="font-migra text-4xl text-white mb-16 leading-tight">
                Legal-grade security
              </h2>
              
              <div className="space-y-12">
                {/* Zero trust design principles */}
                <div>
                  <h3 className="font-montreal text-white text-lg font-medium mb-4">Zero trust design principles</h3>
                  <p className="font-montreal text-white/70 text-sm leading-relaxed">
                    We follow Zero Trust architecture, meaning no user or system is inherently trusted – access is<br />
                    always verified, limited, and logged.
                  </p>
                </div>
                
                {/* Your approval required */}
                <div>
                  <h3 className="font-montreal text-white text-lg font-medium mb-4">Your approval required</h3>
                  <p className="font-montreal text-white/70 text-sm leading-relaxed">
                    Access to customer data is strictly controlled and only granted to engineers with written<br />
                    customer approval for support-related issues.
                  </p>
                </div>
                
                {/* Regular security audits */}
                <div>
                  <h3 className="font-montreal text-white text-lg font-medium mb-4">Regular security audits</h3>
                  <p className="font-montreal text-white/70 text-sm leading-relaxed">
                    Murphy's Law undergoes semi-annual penetration tests covering the full platform scope and follows<br />
                    an "assume breach" methodology to proactively identify and mitigate risks.
                  </p>
                </div>
                
                {/* Trusted infrastructure */}
                <div>
                  <h3 className="font-montreal text-white text-lg font-medium mb-4">Trusted infrastructure</h3>
                  <p className="font-montreal text-white/70 text-sm leading-relaxed">
                    Murphy's Law Control is built on the Zendesk authorization system – the same proven<br />
                    infrastructure that powers Google Drive, YouTube, and other large-scale applications.
                  </p>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Certifications & Compliance Section */}
      <section className="bg-black py-24 px-16">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <p className="font-montreal text-xs text-white/60 uppercase tracking-wider mb-6">
              CERTIFIED & COMPLIANT
            </p>
            <h2 className="font-migra text-4xl md:text-5xl text-white leading-tight max-w-4xl mx-auto">
              Murphy's Law is committed to maintaining compliance with the most rigorous<br />
              international safety and security standards.
            </h2>
          </div>
          
          {/* Certifications Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mt-20">
            {/* ISO 45001 */}
            <div className="text-left">
              <h3 className="font-montreal text-white text-lg font-medium mb-4">ISO 45001</h3>
              <p className="font-montreal text-white/70 text-sm leading-relaxed mb-8">
                ISO 45001 certifies our AI governance framework gives<br />
                consumers confidence in how we build and run AI.
              </p>
              <div className="w-16 h-16 border border-white/20 rounded-full flex items-center justify-center">
                <span className="font-montreal text-white/60 text-xs">ISO</span>
              </div>
            </div>
            
            {/* ISO 27001 */}
            <div className="text-left">
              <h3 className="font-montreal text-white text-lg font-medium mb-4">ISO 27001</h3>
              <p className="font-montreal text-white/70 text-sm leading-relaxed mb-8">
                Murphy's Law is fully certified with ISO 27001, the internationally<br />
                recognised standard for information security management.
              </p>
              <div className="w-16 h-16 border border-white/20 rounded-full flex items-center justify-center">
                <span className="font-montreal text-white/60 text-xs">ISO</span>
              </div>
            </div>
            
            {/* SOC2 Type 2 */}
            <div className="text-left">
              <h3 className="font-montreal text-white text-lg font-medium mb-4">SOC2 Type 2</h3>
              <p className="font-montreal text-white/70 text-sm leading-relaxed mb-8">
                We meet SOC2 requirements to ensure secure and<br />
                compliant management of user access on our systems.
              </p>
              <div className="w-16 h-16 border border-white/20 rounded-full flex items-center justify-center">
                <span className="font-montreal text-white/60 text-xs">SOC</span>
              </div>
            </div>
            
            {/* GDPR */}
            <div className="text-left">
              <h3 className="font-montreal text-white text-lg font-medium mb-4">GDPR</h3>
              <p className="font-montreal text-white/70 text-sm leading-relaxed mb-8">
                With our technical team based in Sweden, we operate under<br />
                GDPR — the world's strictest standard for data privacy.
              </p>
              <div className="w-16 h-16 border border-white/20 rounded-full flex items-center justify-center">
                <div className="w-8 h-8 border border-white/40 rounded-full flex items-center justify-center">
                  <div className="grid grid-cols-3 gap-0.5">
                    <div className="w-0.5 h-0.5 bg-white/60 rounded-full"></div>
                    <div className="w-0.5 h-0.5 bg-white/60 rounded-full"></div>
                    <div className="w-0.5 h-0.5 bg-white/60 rounded-full"></div>
                    <div className="w-0.5 h-0.5 bg-white/60 rounded-full"></div>
                    <div className="w-0.5 h-0.5 bg-white/60 rounded-full"></div>
                    <div className="w-0.5 h-0.5 bg-white/60 rounded-full"></div>
                    <div className="w-0.5 h-0.5 bg-white/60 rounded-full"></div>
                    <div className="w-0.5 h-0.5 bg-white/60 rounded-full"></div>
                    <div className="w-0.5 h-0.5 bg-white/60 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <FAQSection/>

      <Footer />
    </main>
  )
}