'use client'

import { useState, useEffect } from 'react'
import { Edit2, Trash2, Plus, Save, X, DollarSign, Star } from 'lucide-react'
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
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Add/Edit Form */}
      <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
        <div className="bg-white/5 border-b border-white/10 px-6 py-4">
          <h2 className="text-xl font-bold text-white flex items-center space-x-2">
            <DollarSign className="w-5 h-5" />
            <span>{editingId ? 'Edit Pricing Plan' : 'Add New Pricing Plan'}</span>
          </h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-white/80 mb-2">Plan Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 backdrop-blur-md bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-white placeholder-white/40"
                  placeholder="e.g., Pro"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-white/80 mb-2">Button Text</label>
                <input
                  type="text"
                  value={formData.button_text}
                  onChange={(e) => setFormData({ ...formData, button_text: e.target.value })}
                  className="w-full px-4 py-3 backdrop-blur-md bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-white placeholder-white/40"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-white/80 mb-2">Monthly Price ($)</label>
                <input
                  type="number"
                  value={formData.price_monthly}
                  onChange={(e) => setFormData({ ...formData, price_monthly: Number(e.target.value) })}
                  className="w-full px-4 py-3 backdrop-blur-md bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-white placeholder-white/40"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-white/80 mb-2">Yearly Price ($)</label>
                <input
                  type="number"
                  value={formData.price_yearly}
                  onChange={(e) => setFormData({ ...formData, price_yearly: Number(e.target.value) })}
                  className="w-full px-4 py-3 backdrop-blur-md bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-white placeholder-white/40"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-white/80 mb-2">Features (one per line)</label>
              <textarea
                value={formData.features}
                onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                className="w-full px-4 py-3 backdrop-blur-md bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 resize-none font-mono text-sm text-white placeholder-white/40"
                rows={8}
                placeholder="Access to standard AI model&#10;Legislation and regulation&#10;5 questions per day"
                required
              />
            </div>
            
            <div className="flex items-center space-x-3 p-4 backdrop-blur-md bg-white/5 rounded-xl border border-white/10">
              <input
                type="checkbox"
                id="is_popular"
                checked={formData.is_popular}
                onChange={(e) => setFormData({ ...formData, is_popular: e.target.checked })}
                className="w-5 h-5 rounded focus:ring-2 focus:ring-green-500"
              />
              <label htmlFor="is_popular" className="text-sm font-semibold text-white/80 cursor-pointer flex items-center space-x-2">
                <Star className="w-4 h-4" />
                <span>Mark as Popular/Standard Plan</span>
              </label>
            </div>
            
            <div className="flex space-x-3 pt-2">
              <button
                type="submit"
                className="px-6 py-3 backdrop-blur-xl bg-white/10 border border-white/20 text-white rounded-full hover:bg-white/20 font-semibold transition-all duration-300 flex items-center space-x-2"
              >
                {editingId ? <Save className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
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
                  className="px-6 py-3 backdrop-blur-xl bg-white/10 border border-white/20 text-white/60 rounded-full hover:bg-white/20 hover:text-white font-semibold transition-all duration-300 flex items-center space-x-2"
                >
                  <X className="w-4 h-4" />
                  <span>Cancel</span>
                </button>
              )}
            </div>
          </div>
        </form>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.length === 0 ? (
          <div className="col-span-3 backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-12 text-center">
            <DollarSign className="w-16 h-16 text-white/40 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No Pricing Plans Yet</h3>
            <p className="text-white/60">Add your first pricing plan above or seed the database.</p>
          </div>
        ) : (
          plans.map((plan) => (
            <div 
              key={plan.id} 
              className={`backdrop-blur-xl bg-white/5 rounded-2xl border overflow-hidden hover:bg-white/10 transition-all duration-300 ${
                plan.is_popular ? 'border-green-500/50 ring-2 ring-green-500/20' : 'border-white/10'
              }`}
            >
              {plan.is_popular && (
                <div className="bg-gradient-to-r from-green-500/20 to-green-600/20 border-b border-green-500/30 text-green-400 text-center py-2 px-4 text-sm font-bold flex items-center justify-center space-x-1">
                  <Star className="w-4 h-4" />
                  <span>POPULAR PLAN</span>
                </div>
              )}
              
              <div className="p-6">
                <h3 className="font-bold text-2xl text-white mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <p className="text-4xl font-bold text-white">${plan.price_monthly}</p>
                  <p className="text-sm text-white/60 mt-1">${plan.price_yearly}/year</p>
                </div>
                
                <div className="mb-6 space-y-2 max-h-64 overflow-y-auto">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start text-sm">
                      <span className="text-green-400 mr-2 mt-0.5">✓</span>
                      <span className="text-white/70">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex space-x-2 pt-4 border-t border-white/10">
                  <button
                    onClick={() => handleEdit(plan)}
                    className="flex-1 px-4 py-2 backdrop-blur-xl bg-white/10 border border-white/20 text-white rounded-full hover:bg-white/20 font-medium text-sm transition-all duration-300 flex items-center justify-center space-x-1"
                  >
                    <Edit2 className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(plan.id)}
                    className="flex-1 px-4 py-2 backdrop-blur-xl bg-red-500/20 border border-red-500/30 text-red-400 rounded-full hover:bg-red-500/30 font-medium text-sm transition-all duration-300 flex items-center justify-center space-x-1"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete</span>
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
