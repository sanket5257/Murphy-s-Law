'use client'

import { useState, useEffect } from 'react'
import { Edit2, Trash2, Plus, Save, X, MessageSquare, User } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import type { Testimonial } from '@/lib/database.types'

export default function TestimonialsAdmin({ onUpdate }: { onUpdate?: () => void }) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    text: '',
    name: '',
    role: ''
  })

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('order_index', { ascending: true })
      
      if (error) throw error
      setTestimonials(data || [])
    } catch (error) {
      console.error('Error fetching testimonials:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      if (editingId) {
        const { error } = await supabase
          .from('testimonials')
          .update({ ...formData, updated_at: new Date().toISOString() })
          .eq('id', editingId)
        
        if (error) throw error
      } else {
        const { error } = await supabase
          .from('testimonials')
          .insert([{ ...formData, order_index: testimonials.length }])
        
        if (error) throw error
      }
      
      setFormData({ text: '', name: '', role: '' })
      setEditingId(null)
      fetchTestimonials()
      onUpdate?.()
    } catch (error) {
      console.error('Error saving testimonial:', error)
    }
  }

  const handleEdit = (testimonial: Testimonial) => {
    setEditingId(testimonial.id)
    setFormData({
      text: testimonial.text,
      name: testimonial.name,
      role: testimonial.role
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return
    
    try {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      fetchTestimonials()
      onUpdate?.()
    } catch (error) {
      console.error('Error deleting testimonial:', error)
    }
  }

  if (loading) return (
    <div className="flex items-center justify-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Add/Edit Form */}
      <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
        <div className="bg-white/5 border-b border-white/10 px-6 py-4">
          <h2 className="text-xl font-bold text-white flex items-center space-x-2">
            <MessageSquare className="w-5 h-5" />
            <span>{editingId ? 'Edit Testimonial' : 'Add New Testimonial'}</span>
          </h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-white/80 mb-2">Testimonial Text</label>
              <textarea
                value={formData.text}
                onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                className="w-full px-4 py-3 backdrop-blur-md bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none text-white placeholder-white/40"
                rows={5}
                placeholder="Enter the testimonial text..."
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-white/80 mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 backdrop-blur-md bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-white placeholder-white/40"
                  placeholder="e.g., John Doe"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-white/80 mb-2">Role/Company</label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-4 py-3 backdrop-blur-md bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-white placeholder-white/40"
                  placeholder="e.g., CEO, Company Name"
                  required
                />
              </div>
            </div>
            
            <div className="flex space-x-3 pt-2">
              <button
                type="submit"
                className="px-6 py-3 backdrop-blur-xl bg-white/10 border border-white/20 text-white rounded-full hover:bg-white/20 font-semibold transition-all duration-300 flex items-center space-x-2"
              >
                {editingId ? <Save className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                <span>{editingId ? 'Update Testimonial' : 'Add Testimonial'}</span>
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null)
                    setFormData({ text: '', name: '', role: '' })
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

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.length === 0 ? (
          <div className="col-span-2 backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-12 text-center">
            <MessageSquare className="w-16 h-16 text-white/40 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No Testimonials Yet</h3>
            <p className="text-white/60">Add your first testimonial above or seed the database.</p>
          </div>
        ) : (
          testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 overflow-hidden hover:bg-white/10 transition-all duration-300"
            >
              <div className="p-6">
                <div className="mb-4">
                  <div className="text-purple-400 text-4xl mb-3">"</div>
                  <p className="text-white/80 leading-relaxed italic">{testimonial.text}</p>
                </div>
                
                <div className="flex items-center space-x-3 mb-4 pb-4 border-b border-white/10">
                  <div className="w-12 h-12 backdrop-blur-md bg-purple-500/20 border border-purple-500/30 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    <User className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <p className="font-bold text-white">{testimonial.name}</p>
                    <p className="text-sm text-white/60">{testimonial.role}</p>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(testimonial)}
                    className="flex-1 px-4 py-2 backdrop-blur-xl bg-white/10 border border-white/20 text-white rounded-full hover:bg-white/20 font-medium text-sm transition-all duration-300 flex items-center justify-center space-x-1"
                  >
                    <Edit2 className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(testimonial.id)}
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
