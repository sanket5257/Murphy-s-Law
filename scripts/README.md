# Database Setup Scripts

This folder contains Node.js scripts to manage your Supabase database from the terminal.

## Prerequisites

1. Make sure your `.env` file has the correct Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://diirubmoetaewdkytycz.supabase.co
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=sb_publishable_tkI2rnqSsyOtiTikRS8-DQ_IEtPKg0_
   ```

2. Create database tables first (see instructions below)

## Available Scripts

### 1. Check Tables (`npm run check-tables`)

Verifies that all required database tables exist.

```bash
npm run check-tables
```

**Output:**
- ✓ Shows which tables exist
- ❌ Shows which tables are missing
- Provides instructions if tables need to be created

### 2. Seed Database (`npm run seed`)

Populates the database with default data for FAQs, Pricing Plans, and Testimonials.

```bash
npm run seed
```

**What it does:**
- Clears existing data (optional - can be modified)
- Inserts 4 default FAQs
- Inserts 3 pricing plans (Free, Pro, Business)
- Inserts 3 testimonials

**Output:**
```
🌱 Starting database seeding...
🗑️  Clearing existing data...
✓ Existing data cleared

📝 Seeding FAQs...
✓ FAQs seeded successfully (4 items)

💰 Seeding Pricing Plans...
✓ Pricing Plans seeded successfully (3 plans)

💬 Seeding Testimonials...
✓ Testimonials seeded successfully (3 items)

✅ Database seeding completed successfully!
```

### 3. Setup Database (`npm run setup-db`)

Runs both check-tables and seed in sequence.

```bash
npm run setup-db
```

This is the quickest way to verify and populate your database.

## Creating Database Tables

Before running the seed script, you need to create the database tables:

1. Go to your Supabase dashboard: https://supabase.com/dashboard
2. Select your project
3. Navigate to **SQL Editor** (left sidebar)
4. Copy the entire contents of `supabase-schema.sql` (in the root directory)
5. Paste into the SQL Editor
6. Click **Run** or press `Ctrl+Enter`

## Troubleshooting

### Error: "Could not find the table"
- Tables haven't been created yet
- Run the SQL schema in Supabase dashboard first
- Then run `npm run check-tables` to verify

### Error: "Missing Supabase credentials"
- Check your `.env` file exists
- Verify the environment variables are set correctly
- Make sure there are no typos in the variable names

### Error: "duplicate key value violates unique constraint"
- Data already exists in the database
- The seed script clears existing data by default
- If you want to keep existing data, modify `scripts/seed.js`

## Modifying the Seed Data

To change the default data that gets seeded:

1. Open `scripts/seed.js`
2. Find the section for FAQs, Pricing Plans, or Testimonials
3. Modify the data objects
4. Save and run `npm run seed` again

## Files

- `create-tables.js` - Checks if database tables exist
- `seed.js` - Seeds the database with default data
- `README.md` - This file

## Next Steps

After seeding:
1. Visit http://localhost:3000/admin to manage your content
2. View the site at http://localhost:3000
3. Start customizing your FAQs, pricing, and testimonials!
