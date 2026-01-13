'use client'

import { useState } from 'react'

export default function PricingSection() {
  const [isYearly, setIsYearly] = useState(false)

  const plans = [
    {
      name: 'Free',
      price: { monthly: 0, yearly: 0 },
      features: [
        'Access to standard AI model',
        'Legislation and regulation',
        '5 questions per day',
        '50k tokens per day',
        'Standard response speed',
        'Chat history (7 days)'
      ],
      buttonText: 'GET STARTED',
      buttonStyle: 'border border-black text-black hover:bg-black hover:text-white',
      popular: false
    },
    {
      name: 'Pro',
      price: { monthly: 199, yearly: 2350 },
      features: [
        'Access to standard AI model',
        'Legislation and regulation',
        'Case law research',
        '15 questions per day',
        '100k tokens per day',
        'Higher response speed',
        'File upload',
        'Document review',
        'Deep Search functionality - Coming Soon'
      ],
      buttonText: 'GET STARTED',
      buttonStyle: 'bg-black text-white hover:bg-gray-800',
      popular: true
    },
    {
      name: 'Business',
      price: { monthly: 1999, yearly: 20000 },
      features: [
        'Access to standard AI model',
        'Legislation and regulation',
        'Case law research',
        '80 questions per day',
        '1M tokens per day',
        'Higher response speed',
        'Unlimited chat history',
        'File upload',
        'Priority support',
        'Deep Search functionality',
        'Streamline your work with Workflows (Coming Soon)',
        'Access to latest models',
        'Advanced search templates'
      ],
      buttonText: 'GET STARTED',
      buttonStyle: 'border border-black text-black hover:bg-black hover:text-white',
      popular: false
    }
  ]

  return (
    <section id="pricing" className="relative w-full bg-black py-16 md:py-24 lg:py-32 overflow-hidden">
      {/* Background Pattern/Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_0%,transparent_50%)]"></div>
      
      <div className="relative z-10 px-4 md:px-8 lg:px-16 xl:px-24 2xl:px-32 max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-white mb-8">
            Pricing
          </h2>
          
          {/* Monthly/Yearly Toggle */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <span className={`font-montreal text-lg ${!isYearly ? 'text-white font-medium' : 'text-white/60'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className="relative w-14 h-7 bg-white/20 backdrop-blur-sm rounded-full transition-colors duration-300 focus:outline-none border border-white/10"
            >
              <div
                className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform duration-300 ${
                  isYearly ? 'translate-x-8' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`font-montreal text-lg ${isYearly ? 'text-white font-medium' : 'text-white/60'}`}>
              Yearly
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 xl:gap-12 2xl:gap-16">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative backdrop-blur-xl bg-white/10 rounded-3xl p-8 lg:p-10 border border-white/20 transition-all duration-300 hover:bg-white/15 hover:border-white/30 group ${
                plan.popular 
                  ? 'bg-white/15 border-white/40 scale-105' 
                  : ''
              }`}
            >
              {/* Glassmorphism glow effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-white text-black px-6 py-2 rounded-full font-montreal text-sm font-medium backdrop-blur-sm">
                    Standard Plan
                  </span>
                </div>
              )}

              {/* Plan Name */}
              <div className="relative z-10 mb-8">
                <div className="text-left mb-6">
                  <span className="font-montreal text-white/60 text-sm uppercase tracking-wider">
                    {plan.name} Plan
                  </span>
                </div>
                
                {/* Price */}
                <div className="mb-6">
                  <h2 className="font-migra text-white" >
                    ${isYearly ? plan.price.yearly : plan.price.monthly}
                    {plan.price.monthly > 0 && (
                      <span className="font-montreal text-white/60 text-lg">/m</span>
                    )}
                  </h2>
                </div>
                 {/* CTA Button */}
              <button className={`relative z-10 w-full py-4 px-6 rounded-xl font-montreal font-medium text-sm transition-all duration-300 ${
                plan.popular 
                  ? 'bg-white text-black hover:bg-gray-100' 
                  : 'bg-white/10 text-white border border-white/20 hover:bg-white/20 backdrop-blur-sm'
              }`}>
                Get Started
              </button>
              </div>

              {/* Features */}
              <div className="relative z-10 mb-8">
                <ul className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="font-montreal text-white/80 text-sm leading-relaxed">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

             
            </div>
          ))}
        </div>

       
      </div>
    </section>
  )
}