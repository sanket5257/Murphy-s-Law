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

async function checkTables() {
  console.log('🔍 Checking database tables...\n')

  const tables = [
    { name: 'faqs', emoji: '❓' },
    { name: 'pricing_plans', emoji: '💰' },
    { name: 'testimonials', emoji: '💬' }
  ]

  let allExist = true

  for (const table of tables) {
    try {
      const { error } = await supabase.from(table.name).select('id').limit(1)
      
      if (error) {
        console.log(`${table.emoji} ${table.name}: ❌ NOT FOUND`)
        console.log(`   Error: ${error.message}`)
        allExist = false
      } else {
        console.log(`${table.emoji} ${table.name}: ✓ EXISTS`)
      }
    } catch (error) {
      console.log(`${table.emoji} ${table.name}: ❌ ERROR`)
      console.log(`   Error: ${error.message}`)
      allExist = false
    }
  }

  console.log('\n' + '='.repeat(50))
  
  if (allExist) {
    console.log('✅ All tables exist! You can now run: npm run seed')
  } else {
    console.log('❌ Some tables are missing!')
    console.log('\n📝 To create tables:')
    console.log('   1. Go to: https://supabase.com/dashboard')
    console.log('   2. Open SQL Editor')
    console.log('   3. Copy contents from: supabase-schema.sql')
    console.log('   4. Paste and run the SQL')
    console.log('   5. Run this script again to verify')
  }
  
  console.log('='.repeat(50))
}

checkTables()
