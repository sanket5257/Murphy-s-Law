import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Only show warning in development and if variables are actually missing
if (process.env.NODE_ENV === 'development' && (!supabaseUrl || !supabaseKey)) {
  console.warn('Supabase environment variables are not set. Some features may not work.')
}

// Use the actual values or fallbacks for build time
export const supabase = createClient(
  supabaseUrl || 'https://diirubmoetaewdkytycz.supabase.co', 
  supabaseKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRpaXJ1Ym1vZXRhZXdka3l0eWN6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg0NzEzMjIsImV4cCI6MjA4NDA0NzMyMn0.8jB44d9G6oAyNW4pgKocZMK188KqzgJMCfO8JDDaqG0'
)
