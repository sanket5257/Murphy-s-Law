'use client'

import { useState, useEffect } from 'react'
import { Edit2, Trash2, Plus, Save, X, FileQuestion } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import type { FAQ } from '@/lib/database.types'

export default function FAQAdmin({ onUpdate }: { onUpdate?: () => void }) {
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState({ question: '', answer: '' })

  useEffect(() => {
    fetchFAQs()
  }, [])

  const fetchFAQs = async () => {
    try {
      const { data, error } = await supabase
        .from('faqs')
        .select('*')
        .order('order_index', { ascending: true })
      
      if (error) {
        console.error('Error fetching FAQs:', error)
        alert('Error loading FAQs. Make sure the database tables are created.')
        throw error
      }
      setFaqs(data || [])
    } catch (error) {
      console.error('Error fetching FAQs:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      if (editingId) {
        const { error } = await supabase
          .from('faqs')
          .update({ ...formData, updated_at: new Date().toISOString() })
          .eq('id', editingId)
        
        if (error) {
          alert(`Error updating FAQ: ${error.message}`)
          throw error
        }
      } else {
        const { error } = await supabase
          .from('faqs')
          .insert([{ ...formData, order_index: faqs.length }])
        
        if (error) {
          alert(`Error adding FAQ: ${error.message}`)
          throw error
        }
      }
      
      setFormData({ question: '', answer: '' })
      setEditingId(null)
      fetchFAQs()
      onUpdate?.()
      alert('FAQ saved successfully!')
    } catch (error) {
      console.error('Error saving FAQ:', error)
    }
  }

  const handleEdit = (faq: FAQ) => {
    setEditingId(faq.id)
    setFormData({ question: faq.question, answer: faq.answer })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this FAQ?')) return
    
    try {
      const { error } = await supabase
        .from('faqs')
        .delete()
        .eq('id', id)
      
      if (error) {
        alert(`Error deleting FAQ: ${error.message}`)
        throw error
      }
      fetchFAQs()
      onUpdate?.()
      alert('FAQ deleted successfully!')
    } catch (error) {
      console.error('Error deleting FAQ:', error)
    }
  }

  if (loading) return (
    <div className="flex items-center justify-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Add/Edit Form with glassmorphism */}
      <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
        <div className="bg-white/5 border-b border-white/10 px-6 py-4">
          <h2 className="text-xl font-bold text-white flex items-center space-x-2">
            <Edit2 className="w-5 h-5" />
            <span>{editingId ? 'Edit FAQ' : 'Add New FAQ'}</span>
          </h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-white/80 mb-2">Question</label>
              <input
                type="text"
                value={formData.question}
                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                className="w-full px-4 py-3 backdrop-blur-md bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white placeholder-white/40"
                placeholder="Enter your question here..."
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-white/80 mb-2">Answer</label>
              <textarea
                value={formData.answer}
                onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                className="w-full px-4 py-3 backdrop-blur-md bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none text-white placeholder-white/40"
                rows={5}
                placeholder="Enter the answer..."
                required
              />
            </div>
            
            <div className="flex space-x-3 pt-2">
              <button
                type="submit"
                className="px-6 py-3 backdrop-blur-xl bg-white/10 border border-white/20 text-white rounded-full hover:bg-white/20 font-semibold transition-all duration-300 flex items-center space-x-2"
              >
                {editingId ? <Save className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                <span>{editingId ? 'Update FAQ' : 'Add FAQ'}</span>
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null)
                    setFormData({ question: '', answer: '' })
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

      {/* FAQ List */}
      <div className="space-y-4">
        {faqs.length === 0 ? (
          <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-12 text-center">
            <FileQuestion className="w-16 h-16 text-white/40 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No FAQs Yet</h3>
            <p className="text-white/60">Add your first FAQ above or seed the database to get started.</p>
          </div>
        ) : (
          faqs.map((faq, index) => (
            <div 
              key={faq.id} 
              className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 overflow-hidden hover:bg-white/10 transition-all duration-300"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className="w-8 h-8 backdrop-blur-md bg-blue-500/20 border border-blue-500/30 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-blue-400 font-bold text-sm">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-white mb-2">{faq.question}</h3>
                      <p className="text-white/70 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2 mt-4 pt-4 border-t border-white/10">
                  <button
                    onClick={() => handleEdit(faq)}
                    className="px-4 py-2 backdrop-blur-xl bg-white/10 border border-white/20 text-white rounded-full hover:bg-white/20 font-medium text-sm transition-all duration-300 flex items-center space-x-1"
                  >
                    <Edit2 className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(faq.id)}
                    className="px-4 py-2 backdrop-blur-xl bg-red-500/20 border border-red-500/30 text-red-400 rounded-full hover:bg-red-500/30 font-medium text-sm transition-all duration-300 flex items-center space-x-1"
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
