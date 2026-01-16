'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Globe, LogOut, HelpCircle, DollarSign, MessageSquare } from 'lucide-react'
import FAQAdmin from '@/components/admin/FAQAdmin'
import PricingAdmin from '@/components/admin/PricingAdmin'
import TestimonialsAdmin from '@/components/admin/TestimonialsAdmin'
import AuthCheck from '@/components/admin/AuthCheck'
import { supabase } from '@/lib/supabase'
import { signOut, getCurrentUser } from '@/lib/auth'

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'faq' | 'pricing' | 'testimonials'>('faq')
  const [stats, setStats] = useState({ faqs: 0, plans: 0, testimonials: 0 })
  const [userEmail, setUserEmail] = useState('')
  const router = useRouter()

  useEffect(() => {
    fetchStats()
    loadUser()
  }, [])

  const loadUser = async () => {
    const user = await getCurrentUser()
    if (user) {
      setUserEmail(user.email || '')
    }
  }

  const fetchStats = async () => {
    try {
      const [faqsRes, plansRes, testimonialsRes] = await Promise.all([
        supabase.from('faqs').select('id', { count: 'exact', head: true }),
        supabase.from('pricing_plans').select('id', { count: 'exact', head: true }),
        supabase.from('testimonials').select('id', { count: 'exact', head: true })
      ])

      setStats({
        faqs: faqsRes.count || 0,
        plans: plansRes.count || 0,
        testimonials: testimonialsRes.count || 0
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  const handleLogout = async () => {
    try {
      await signOut()
      router.push('/cms-dashboard-2026/login')
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  return (
    <AuthCheck>
      <div className="min-h-screen bg-black">
        {/* Header with glassmorphism */}
        <div className="sticky top-0 z-50 backdrop-blur-xl bg-white/5 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex justify-between items-center flex-wrap gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">Murphy's Law</h1>
                <p className="text-white/60 text-sm">Admin Dashboard</p>
              </div>
              <div className="flex items-center space-x-3 flex-wrap gap-2">
                {/* User Info */}
                {userEmail && (
                  <div className="flex items-center space-x-2 px-4 py-2 backdrop-blur-md bg-white/10 border border-white/20 rounded-xl">
                    <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="text-white text-sm font-medium">{userEmail}</span>
                  </div>
                )}
                
                {/* Action Buttons */}
                <a
                  href="/"
                  target="_blank"
                  className="px-4 py-2 backdrop-blur-xl bg-white/10 border border-white/20 text-white rounded-full hover:bg-white/20 text-sm font-medium transition-all duration-300 flex items-center space-x-2"
                >
                  <Globe className="w-4 h-4" />
                  <span className="hidden sm:inline">View Site</span>
                </a>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 backdrop-blur-xl bg-red-500/20 border border-red-500/30 text-red-400 rounded-full hover:bg-red-500/30 text-sm font-medium transition-all duration-300 flex items-center space-x-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Stats Cards with glassmorphism */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm font-semibold uppercase tracking-wide mb-1">Total FAQs</p>
                  <p className="text-4xl font-bold text-white">{stats.faqs}</p>
                </div>
                <div className="w-16 h-16 backdrop-blur-md bg-blue-500/20 border border-blue-500/30 rounded-2xl flex items-center justify-center">
                  <HelpCircle className="w-8 h-8 text-blue-400" />
                </div>
              </div>
            </div>

            <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm font-semibold uppercase tracking-wide mb-1">Pricing Plans</p>
                  <p className="text-4xl font-bold text-white">{stats.plans}</p>
                </div>
                <div className="w-16 h-16 backdrop-blur-md bg-green-500/20 border border-green-500/30 rounded-2xl flex items-center justify-center">
                  <DollarSign className="w-8 h-8 text-green-400" />
                </div>
              </div>
            </div>

            <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm font-semibold uppercase tracking-wide mb-1">Testimonials</p>
                  <p className="text-4xl font-bold text-white">{stats.testimonials}</p>
                </div>
                <div className="w-16 h-16 backdrop-blur-md bg-purple-500/20 border border-purple-500/30 rounded-2xl flex items-center justify-center">
                  <MessageSquare className="w-8 h-8 text-purple-400" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Tabs with glassmorphism */}
          <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 mb-6 overflow-hidden">
            <div className="flex border-b border-white/10">
              <button
                onClick={() => setActiveTab('faq')}
                className={`flex-1 px-6 py-4 font-semibold transition-all duration-300 ${
                  activeTab === 'faq'
                    ? 'bg-white/10 text-white border-b-2 border-blue-500'
                    : 'text-white/60 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span className="flex items-center justify-center space-x-2">
                  <HelpCircle className="w-5 h-5" />
                  <span>FAQs</span>
                </span>
              </button>
              <button
                onClick={() => setActiveTab('pricing')}
                className={`flex-1 px-6 py-4 font-semibold transition-all duration-300 ${
                  activeTab === 'pricing'
                    ? 'bg-white/10 text-white border-b-2 border-green-500'
                    : 'text-white/60 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span className="flex items-center justify-center space-x-2">
                  <DollarSign className="w-5 h-5" />
                  <span>Pricing</span>
                </span>
              </button>
              <button
                onClick={() => setActiveTab('testimonials')}
                className={`flex-1 px-6 py-4 font-semibold transition-all duration-300 ${
                  activeTab === 'testimonials'
                    ? 'bg-white/10 text-white border-b-2 border-purple-500'
                    : 'text-white/60 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span className="flex items-center justify-center space-x-2">
                  <MessageSquare className="w-5 h-5" />
                  <span>Testimonials</span>
                </span>
              </button>
            </div>
          </div>

          {/* Content */}
          <div>
            {activeTab === 'faq' && <FAQAdmin onUpdate={fetchStats} />}
            {activeTab === 'pricing' && <PricingAdmin onUpdate={fetchStats} />}
            {activeTab === 'testimonials' && <TestimonialsAdmin onUpdate={fetchStats} />}
          </div>
        </div>
      </div>
    </AuthCheck>
  )
}
