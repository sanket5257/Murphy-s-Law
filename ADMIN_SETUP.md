# Admin Panel Setup Guide

## Quick Setup (3 Steps)

### Step 1: Create Database Tables
1. Go to your Supabase project dashboard: https://supabase.com/dashboard
2. Navigate to **SQL Editor** (left sidebar)
3. Copy the entire contents of `supabase-schema.sql` file
4. Paste into the SQL Editor and click **Run**

### Step 2: Seed the Database

**Option A: Using Terminal (Recommended)**
```bash
# Check if tables exist
npm run check-tables

# Seed the database
npm run seed

# Or do both at once
npm run setup-db
```

**Option B: Using Web Interface**
1. Start your development server: `npm run dev`
2. Visit: http://localhost:3000/admin/seed
3. Click "Check Tables Status" to verify tables are created
4. Click "Seed Database" to populate with default data

### Step 3: Access Admin Panel
Visit: http://localhost:3000/admin

## Available NPM Scripts

```bash
npm run check-tables  # Verify database tables exist
npm run seed          # Populate database with default data
npm run setup-db      # Check tables and seed in one command
```

## Admin Panel Features

### FAQ Management
- Add, edit, and delete FAQs
- Reorder FAQs by drag and drop (order_index)
- Questions and answers are stored in the database

### Pricing Management
- Manage pricing plans (Free, Pro, Business)
- Set monthly and yearly prices
- Add/edit features (one per line)
- Mark plans as "Popular"
- Features are stored as an array in PostgreSQL

### Testimonials Management
- Add, edit, and delete testimonials
- Include testimonial text, name, and role
- Reorder testimonials

## Environment Variables

Your `.env` file should have:
```
NEXT_PUBLIC_SUPABASE_URL=https://diirubmoetaewdkytycz.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=sb_publishable_tkI2rnqSsyOtiTikRS8-DQ_IEtPKg0_
DATABASE_URL=postgresql://postgres:evoleotion5257@db.diirubmoetaewdkytycz.supabase.co:5432/postgres
```

## Troubleshooting

### Tables not found error
- Make sure you ran the SQL schema in Supabase dashboard
- Use the "Check Tables Status" button on the seed page
- Or run `npm run check-tables` in terminal

### Connection errors
- Verify your Supabase URL and API key in `.env`
- Check that your Supabase project is active

### Data not showing
- Visit `/admin/seed` and click "Seed Database"
- Or run `npm run seed` in terminal
- Check browser console for errors

## Terminal Commands

```bash
# Check if database tables exist
npm run check-tables

# Seed the database with default data
npm run seed

# Check tables and seed in one command
npm run setup-db
```

See `scripts/README.md` for more details on terminal commands.

## Security Notes

⚠️ **Important**: This admin panel currently has no authentication. For production:

1. Add authentication (NextAuth.js, Supabase Auth, etc.)
2. Update RLS policies in Supabase to restrict write access
3. Add admin role checks before allowing CRUD operations

## Next Steps

To integrate the database data into your frontend components:

1. Update `components/FAQSection.tsx` to fetch from Supabase
2. Update `components/PricingSection.tsx` to fetch from Supabase
3. Update `components/TestimonialsSection.tsx` to fetch from Supabase

Example fetch code:
```typescript
const { data: faqs } = await supabase
  .from('faqs')
  .select('*')
  .order('order_index', { ascending: true })
```
