'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
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
      router.push('/admin/login')
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  return (
    <AuthCheck>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50">
        {/* Header with Logout */}
        <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex justify-between items-center flex-wrap gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Murphy's Law Admin</h1>
                <p className="text-gray-500 text-sm">Content Management System</p>
              </div>
              <div className="flex items-center space-x-3 flex-wrap gap-2">
                {/* User Info */}
                {userEmail && (
                  <div className="flex items-center space-x-2 px-3 py-2 bg-gray-100 rounded-lg">
                    <span className="text-gray-600 text-sm">👤</span>
                    <span className="text-gray-700 text-sm font-medium">{userEmail}</span>
                  </div>
                )}
                
                {/* Action Buttons */}
                <a
                  href="/"
                  target="_blank"
                  className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 text-sm font-medium shadow-sm transition-all duration-200 flex items-center space-x-2"
                >
                  <span>🌐</span>
                  <span className="hidden sm:inline">Site</span>
                </a>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm font-medium shadow-sm transition-all duration-200 flex items-center space-x-2"
                >
                  <span>🚪</span>
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 text-sm font-semibold uppercase tracking-wide mb-1">Total FAQs</p>
                  <p className="text-4xl font-bold text-blue-900">{stats.faqs}</p>
                </div>
                <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-3xl">❓</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-600 text-sm font-semibold uppercase tracking-wide mb-1">Pricing Plans</p>
                  <p className="text-4xl font-bold text-green-900">{stats.plans}</p>
                </div>
                <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-3xl">💰</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-600 text-sm font-semibold uppercase tracking-wide mb-1">Testimonials</p>
                  <p className="text-4xl font-bold text-purple-900">{stats.testimonials}</p>
                </div>
                <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-3xl">💬</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Tabs */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 mb-6 overflow-hidden">
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab('faq')}
                className={`flex-1 px-6 py-4 font-semibold transition-all duration-200 ${
                  activeTab === 'faq'
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span className="flex items-center justify-center space-x-2">
                  <span>❓</span>
                  <span>FAQs</span>
                </span>
              </button>
              <button
                onClick={() => setActiveTab('pricing')}
                className={`flex-1 px-6 py-4 font-semibold transition-all duration-200 ${
                  activeTab === 'pricing'
                    ? 'bg-gradient-to-r from-green-500 to-green-600 text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span className="flex items-center justify-center space-x-2">
                  <span>💰</span>
                  <span>Pricing</span>
                </span>
              </button>
              <button
                onClick={() => setActiveTab('testimonials')}
                className={`flex-1 px-6 py-4 font-semibold transition-all duration-200 ${
                  activeTab === 'testimonials'
                    ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span className="flex items-center justify-center space-x-2">
                  <span>💬</span>
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
