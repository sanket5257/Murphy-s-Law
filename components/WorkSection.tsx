'use client';

import React, { useRef, useEffect } from 'react';

const WorkSection = () => {
  const videoRef1 = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Auto-play videos when component mounts
    if (videoRef1.current) {
      videoRef1.current.play().catch(console.error);
    }
    if (videoRef2.current) {
      videoRef2.current.play().catch(console.error);
    }
  }, []);

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-left mb-16">
          <p className="text-sm uppercase tracking-wider text-gray-500 mb-4">
            SMARTER TOOLS, BETTER OUTCOMES
          </p>
          <h2 className="text-4xl text-black font-migra md:text-5xl lg:text-6xl font-light leading-tight max-w-4xl">
            Murphy streamlines everything from research to drafting and 
            review — helping lawyers spend less time managing process, 
            and more time delivering value.
          </h2>
        </div>

        {/* Three Panel Grid - Only 3 tools */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Panel 1 - Review faster */}
          <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
            <div className="aspect-[3/4] bg-gradient-to-br from-green-100 to-green-200 relative">
              <video
                ref={videoRef1}
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              >
                <source src="/videos/tools.mp4" type="video/mp4" />
              </video>
              
              {/* Document overlay */}
              <div className="absolute top-4 left-4 right-4">
                <div className="bg-white rounded-lg p-4 shadow-lg">
                  <h4 className="font-medium text-sm mb-3">Document</h4>
                  <div className="space-y-2">
                    <div className="flex items-center text-xs">
                      <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                      <span className="text-gray-700">Zenith_Consulting_Service_Agreement_...</span>
                    </div>
                    <div className="flex items-center text-xs">
                      <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                      <span className="text-gray-700">Beta_Solutions_Client_Contract_2024.docx</span>
                    </div>
                    <div className="flex items-center text-xs">
                      <div className="w-3 h-3 bg-red-500 rounded mr-2"></div>
                      <span className="text-gray-700">Acme_Corp_Agreement_2023.pdf</span>
                    </div>
                    <div className="flex items-center text-xs">
                      <div className="w-3 h-3 bg-orange-500 rounded mr-2"></div>
                      <span className="text-gray-700">Gamma_Tech_Partnership_Agreement_2...</span>
                    </div>
                    <div className="flex items-center text-xs">
                      <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                      <span className="text-gray-700">Delta_Industries_Service_Agreement_20...</span>
                    </div>
                    <div className="flex items-center text-xs">
                      <div className="w-3 h-3 bg-red-500 rounded mr-2"></div>
                      <span className="text-gray-700">Epsilon_Enterprises_NDA_2024.pdf</span>
                    </div>
                    <div className="flex items-center text-xs">
                      <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                      <span className="text-gray-700">Zeta_Consulting_Engagement_Letter_20...</span>
                    </div>
                    <div className="text-xs text-gray-400 mt-2">+ 432 more</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-medium mb-3">Review faster</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Being an experienced lawyer means reviewing and reading 
                mountains of material. Legora can analyze tens of thousands of 
                documents simultaneously, quickly surfacing the most relevant 
                based on your requirements.
              </p>
            </div>
          </div>

          {/* Panel 2 - Draft smarter */}
          <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
            <div className="aspect-[3/4] bg-gradient-to-br from-blue-100 to-blue-200 relative flex items-center justify-center">
              <video
                ref={videoRef2}
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              >
                <source src="/videos/tools2.mp4" type="video/mp4" />
              </video>
              
              {/* App icons overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex space-x-4">
                  <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center shadow-lg">
                    <div className="w-6 h-6 bg-white rounded"></div>
                  </div>
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-lg">W</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-medium mb-3">Draft smarter</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Legora draws on precedent to draft, rewrite, and refine your 
                content in Word. It identifies the substance of each document and 
                suggests revisions using easy-to-use language—with you in control of 
                what's approved and applied.
              </p>
            </div>
          </div>

          {/* Panel 3 - Research deeper */}
          <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
            <div className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 relative flex items-center justify-center p-6">
              <div className="bg-white rounded-lg p-4 shadow-lg w-full max-w-xs">
                <div className="mb-4">
                  <input 
                    type="text" 
                    placeholder="What would you like to do?" 
                    className="w-full p-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div className="text-xs text-gray-500 mb-2">Sources</div>
                <div className="space-y-1 mb-4">
                  <button className="w-full text-left p-2 hover:bg-gray-50 rounded flex items-center text-sm">
                    <div className="w-4 h-4 bg-blue-500 rounded-full mr-3 flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <span>Web search</span>
                  </button>
                  <button className="w-full text-left p-2 hover:bg-gray-50 rounded flex items-center text-sm">
                    <div className="w-4 h-4 bg-gray-400 rounded-full mr-3 flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <span>Legal search</span>
                  </button>
                  <button className="w-full text-left p-2 hover:bg-gray-50 rounded flex items-center text-sm">
                    <div className="w-4 h-4 bg-gray-600 rounded-full mr-3 flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <span>Database search</span>
                  </button>
                </div>
                
                <div className="flex space-x-2">
                  <button className="flex-1 text-xs py-2 px-3 border border-gray-200 rounded hover:bg-gray-50 flex items-center justify-center">
                    <span className="mr-1">+</span> Add sources
                  </button>
                  <button className="flex-1 text-xs py-2 px-3 border border-gray-200 rounded hover:bg-gray-50 flex items-center justify-center">
                    <span className="mr-1">✨</span> Create
                  </button>
                  <button className="flex-1 text-xs py-2 px-3 border border-gray-200 rounded hover:bg-gray-50 flex items-center justify-center">
                    <span className="mr-1">⚡</span> Workflows
                  </button>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-medium mb-3">Research deeper</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Access up-to-date information, legal databases, and your DMS 
                content, all within Legora. With partnerships across jurisdictions 
                and integrations with Manage and SharePoint, everything lawyers 
                need is here.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkSection;