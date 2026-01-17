import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST() {
  try {
    // Check if Supabase is properly configured
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return NextResponse.json({ 
        success: false, 
        message: 'Supabase configuration is missing. Please check your environment variables.' 
      }, { status: 500 })
    }

    console.log('Setting up database tables...')

    // Note: This uses Supabase's SQL execution
    // You need to run the SQL schema manually in Supabase dashboard
    // This endpoint is just for verification

    // Check if tables exist by trying to query them
    const checks = []

    const { error: faqError } = await supabase.from('faqs').select('id').limit(1)
    checks.push({ table: 'faqs', exists: !faqError })

    const { error: pricingError } = await supabase.from('pricing_plans').select('id').limit(1)
    checks.push({ table: 'pricing_plans', exists: !pricingError })

    const { error: testimonialsError } = await supabase.from('testimonials').select('id').limit(1)
    checks.push({ table: 'testimonials', exists: !testimonialsError })

    const allTablesExist = checks.every(check => check.exists)

    if (allTablesExist) {
      return NextResponse.json({
        success: true,
        message: 'All tables exist!',
        tables: checks
      })
    } else {
      return NextResponse.json({
        success: false,
        message: 'Some tables are missing. Please run the SQL schema in Supabase dashboard.',
        tables: checks
      }, { status: 400 })
    }
  } catch (error: any) {
    console.error('Error checking tables:', error)
    return NextResponse.json({
      success: false,
      message: error.message || 'Error checking tables',
      error: error
    }, { status: 500 })
  }
}
