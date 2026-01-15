'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import type { PricingPlan } from '@/lib/database.types'

export default function PricingAdmin({ onUpdate }: { onUpdate?: () => void }) {
  const [plans, setPlans] = useState<PricingPlan[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    price_monthly: 0,
    price_yearly: 0,
    features: '',
    button_text: 'GET STARTED',
    is_popular: false
  })

  useEffect(() => {
    fetchPlans()
  }, [])

  const fetchPlans = async () => {
    try {
      const { data, error } = await supabase
        .from('pricing_plans')
        .select('*')
        .order('order_index', { ascending: true })
      
      if (error) throw error
      setPlans(data || [])
    } catch (error) {
      console.error('Error fetching pricing plans:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const featuresArray = formData.features.split('\n').filter(f => f.trim())
    
    try {
      if (editingId) {
        const { error } = await supabase
          .from('pricing_plans')
          .update({
            name: formData.name,
            price_monthly: formData.price_monthly,
            price_yearly: formData.price_yearly,
            features: featuresArray,
            button_text: formData.button_text,
            is_popular: formData.is_popular,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingId)
        
        if (error) throw error
      } else {
        const { error } = await supabase
          .from('pricing_plans')
          .insert([{
            name: formData.name,
            price_monthly: formData.price_monthly,
            price_yearly: formData.price_yearly,
            features: featuresArray,
            button_text: formData.button_text,
            is_popular: formData.is_popular,
            order_index: plans.length
          }])
        
        if (error) throw error
      }
      
      setFormData({
        name: '',
        price_monthly: 0,
        price_yearly: 0,
        features: '',
        button_text: 'GET STARTED',
        is_popular: false
      })
      setEditingId(null)
      fetchPlans()
      onUpdate?.()
    } catch (error) {
      console.error('Error saving pricing plan:', error)
    }
  }

  const handleEdit = (plan: PricingPlan) => {
    setEditingId(plan.id)
    setFormData({
      name: plan.name,
      price_monthly: plan.price_monthly,
      price_yearly: plan.price_yearly,
      features: plan.features.join('\n'),
      button_text: plan.button_text,
      is_popular: plan.is_popular
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this pricing plan?')) return
    
    try {
      const { error } = await supabase
        .from('pricing_plans')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      fetchPlans()
      onUpdate?.()
    } catch (error) {
      console.error('Error deleting pricing plan:', error)
    }
  }

  if (loading) return (
    <div className="flex items-center justify-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Add/Edit Form */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-green-500 to-green-600 px-6 py-4">
          <h2 className="text-xl font-bold text-white flex items-center space-x-2">
            <span>💰</span>
            <span>{editingId ? 'Edit Pricing Plan' : 'Add New Pricing Plan'}</span>
          </h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Plan Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-gray-900 bg-white"
                  placeholder="e.g., Pro"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Button Text</label>
                <input
                  type="text"
                  value={formData.button_text}
                  onChange={(e) => setFormData({ ...formData, button_text: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-gray-900 bg-white"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Monthly Price ($)</label>
                <input
                  type="number"
                  value={formData.price_monthly}
                  onChange={(e) => setFormData({ ...formData, price_monthly: Number(e.target.value) })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-gray-900 bg-white"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Yearly Price ($)</label>
                <input
                  type="number"
                  value={formData.price_yearly}
                  onChange={(e) => setFormData({ ...formData, price_yearly: Number(e.target.value) })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-gray-900 bg-white"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Features (one per line)</label>
              <textarea
                value={formData.features}
                onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 resize-none font-mono text-sm text-gray-900 bg-white"
                rows={8}
                placeholder="Access to standard AI model&#10;Legislation and regulation&#10;5 questions per day"
                required
              />
            </div>
            
            <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-xl border border-green-200">
              <input
                type="checkbox"
                id="is_popular"
                checked={formData.is_popular}
                onChange={(e) => setFormData({ ...formData, is_popular: e.target.checked })}
                className="w-5 h-5 text-green-600 rounded focus:ring-2 focus:ring-green-500"
              />
              <label htmlFor="is_popular" className="text-sm font-semibold text-gray-700 cursor-pointer">
                ⭐ Mark as Popular/Standard Plan
              </label>
            </div>
            
            <div className="flex space-x-3 pt-2">
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 font-semibold shadow-sm transition-all duration-200 flex items-center space-x-2"
              >
                <span>{editingId ? '💾' : '➕'}</span>
                <span>{editingId ? 'Update Plan' : 'Add Plan'}</span>
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null)
                    setFormData({
                      name: '',
                      price_monthly: 0,
                      price_yearly: 0,
                      features: '',
                      button_text: 'GET STARTED',
                      is_popular: false
                    })
                  }}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 font-semibold transition-all duration-200"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </form>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.length === 0 ? (
          <div className="col-span-3 bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="text-6xl mb-4">💰</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Pricing Plans Yet</h3>
            <p className="text-gray-500">Add your first pricing plan above or seed the database.</p>
          </div>
        ) : (
          plans.map((plan) => (
            <div 
              key={plan.id} 
              className={`bg-white rounded-2xl shadow-sm border overflow-hidden hover:shadow-lg transition-all duration-200 ${
                plan.is_popular ? 'border-green-400 ring-2 ring-green-200' : 'border-gray-200'
              }`}
            >
              {plan.is_popular && (
                <div className="bg-gradient-to-r from-green-500 to-green-600 text-white text-center py-2 px-4 text-sm font-bold">
                  ⭐ POPULAR PLAN
                </div>
              )}
              
              <div className="p-6">
                <h3 className="font-bold text-2xl text-gray-900 mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <p className="text-4xl font-bold text-gray-900">${plan.price_monthly}</p>
                  <p className="text-sm text-gray-500 mt-1">${plan.price_yearly}/year</p>
                </div>
                
                <div className="mb-6 space-y-2 max-h-64 overflow-y-auto">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start text-sm">
                      <span className="text-green-500 mr-2 mt-0.5">✓</span>
                      <span className="text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex space-x-2 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => handleEdit(plan)}
                    className="flex-1 px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 font-medium text-sm transition-all duration-200"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(plan.id)}
                    className="flex-1 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 font-medium text-sm transition-all duration-200"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
