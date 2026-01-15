import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST() {
  try {
    console.log('Starting database seeding...')

    // Clear existing data (optional - comment out if you want to keep existing data)
    await supabase.from('faqs').delete().neq('id', 0)
    await supabase.from('pricing_plans').delete().neq('id', 0)
    await supabase.from('testimonials').delete().neq('id', 0)

    // Seed FAQs
    const { error: faqError } = await supabase.from('faqs').insert([
      {
        question: "Will documents I upload to Murphy be safe?",
        answer: "Yes, we use industry-standard security measures with robust encryption. Murphy does not train underlying models using your data.",
        order_index: 0
      },
      {
        question: "Where does Murphy get case law from?",
        answer: "Other large language models do not have direct access to proprietary case law databases and rely on publicly available sources to generate legal answers. However, Murphy is integrated with reputable and reliable case law databases and has specifically curated datasets. This ensures that Murphy always has access to the most recent case law out there.",
        order_index: 1
      },
      {
        question: "Can I export and download answers?",
        answer: "Yes, Murphy allows you to share entire chats and export documents in Word or PDF format. These documents are pre-formated and can be edited to suit user preferences.",
        order_index: 2
      },
      {
        question: "Can I upload documents for review?",
        answer: "Yes, you can upload contracts, court pleadings, or other legal documents to be summarised, for clause extraction, or for compliance checks.",
        order_index: 3
      }
    ])

    if (faqError) throw faqError

    // Seed Pricing Plans
    const { error: pricingError } = await supabase.from('pricing_plans').insert([
      {
        name: 'Free',
        price_monthly: 0,
        price_yearly: 0,
        features: [
          'Access to standard AI model',
          'Legislation and regulation',
          '5 questions per day',
          '50k tokens per day',
          'Standard response speed',
          'Chat history (7 days)'
        ],
        button_text: 'GET STARTED',
        is_popular: false,
        order_index: 0
      },
      {
        name: 'Pro',
        price_monthly: 199,
        price_yearly: 2350,
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
        button_text: 'GET STARTED',
        is_popular: true,
        order_index: 1
      },
      {
        name: 'Business',
        price_monthly: 1999,
        price_yearly: 20000,
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
        button_text: 'GET STARTED',
        is_popular: false,
        order_index: 2
      }
    ])

    if (pricingError) throw pricingError

    // Seed Testimonials
    const { error: testimonialsError } = await supabase.from('testimonials').insert([
      {
        text: "The team at Estrela have been amazing and critical to our UI/UX journey, they challenge our thoughts for the better and have allowed us to become South Africa's fastest-growing Buy Now Pay Later platform. I cannot recommend them enough.",
        name: "Craig Newborn",
        role: "Former CEO, PayJustNow",
        order_index: 0
      },
      {
        text: "Working with Estrela Studio has been a genuinely outstanding experience. Their team brings a rare combination of creativity, technical expertise, and collaborative spirit. Estrela met us exactly where we were – they listened closely, understood the strategic goals and translated that direction into clear, compelling visual design.",
        name: "Donna Blackwell-Kopotic",
        role: "Sims Lifecycle Service (US)",
        order_index: 1
      },
      {
        text: "The Estrela team have a grasp of branding and product design like I've never seen before. We searched the globe for a tech-focused CI design agency and found that the top talent was right here in Cape Town.",
        name: "Colleen Harrison",
        role: "Former Head of Marketing, Payfast",
        order_index: 2
      }
    ])

    if (testimonialsError) throw testimonialsError

    return NextResponse.json({ 
      success: true, 
      message: 'Database seeded successfully!' 
    })
  } catch (error: any) {
    console.error('Error seeding database:', error)
    return NextResponse.json({ 
      success: false, 
      message: error.message || 'Error seeding database',
      error: error
    }, { status: 500 })
  }
}
