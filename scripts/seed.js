const { createClient } = require('@supabase/supabase-js')
require('dotenv').config()

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Error: Missing Supabase credentials in .env file')
  console.error('Required: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function seedDatabase() {
  console.log('🌱 Starting database seeding...\n')

  try {
    // Clear existing data
    console.log('🗑️  Clearing existing data...')
    await supabase.from('faqs').delete().neq('id', 0)
    await supabase.from('pricing_plans').delete().neq('id', 0)
    await supabase.from('testimonials').delete().neq('id', 0)
    console.log('✓ Existing data cleared\n')

    // Seed FAQs
    console.log('📝 Seeding FAQs...')
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

    if (faqError) {
      console.error('❌ Error seeding FAQs:', faqError.message)
      throw faqError
    }
    console.log('✓ FAQs seeded successfully (4 items)\n')

    // Seed Pricing Plans
    console.log('💰 Seeding Pricing Plans...')
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

    if (pricingError) {
      console.error('❌ Error seeding Pricing Plans:', pricingError.message)
      throw pricingError
    }
    console.log('✓ Pricing Plans seeded successfully (3 plans)\n')

    // Seed Testimonials
    console.log('💬 Seeding Testimonials...')
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

    if (testimonialsError) {
      console.error('❌ Error seeding Testimonials:', testimonialsError.message)
      throw testimonialsError
    }
    console.log('✓ Testimonials seeded successfully (3 items)\n')

    console.log('✅ Database seeding completed successfully!')
    console.log('\n📊 Summary:')
    console.log('   - 4 FAQs')
    console.log('   - 3 Pricing Plans')
    console.log('   - 3 Testimonials')
    console.log('\n🎉 You can now access the admin panel at: http://localhost:3000/admin')
    
  } catch (error) {
    console.error('\n❌ Error during seeding:', error.message)
    process.exit(1)
  }
}

// Run the seeding function
seedDatabase()
