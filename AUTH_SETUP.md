# 🔐 Admin Authentication Setup Guide

The admin panel now requires login to access. Here's how to set it up:

## Quick Setup

### Step 1: Enable Email Auth in Supabase

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project
3. Navigate to **Authentication** → **Providers**
4. Make sure **Email** provider is enabled
5. Configure email settings (or use default)

### Step 2: Create an Admin User

You have two options:

#### Option A: Using Supabase Dashboard (Recommended)
1. Go to **Authentication** → **Users**
2. Click **Add User**
3. Enter email and password
4. Click **Create User**

#### Option B: Using Sign Up Page (Create One)
Or you can create a signup page temporarily to register yourself.

### Step 3: Test Login

1. Go to: `http://localhost:3000/admin`
2. You'll be redirected to: `http://localhost:3000/admin/login`
3. Enter your credentials
4. You should be logged in and redirected to the admin panel

## Features

### ✅ What's Protected
- `/admin` - Main admin dashboard
- `/admin/seed` - Database seeding page
- All admin CRUD operations

### ✅ What's Included
- **Login Page** - Beautiful, modern login interface
- **Auth Check** - Automatic redirect if not logged in
- **Session Management** - Stays logged in across page refreshes
- **Logout Button** - Easy logout from admin panel
- **User Display** - Shows logged-in user email

## File Structure

```
app/
├── admin/
│   ├── page.tsx          # Protected admin dashboard
│   ├── login/
│   │   └── page.tsx      # Login page
│   └── seed/
│       └── page.tsx      # Seed page (also protected)
components/
└── admin/
    └── AuthCheck.tsx     # Authentication wrapper
lib/
└── auth.ts               # Auth helper functions
```

## How It Works

1. **User visits `/admin`**
   - `AuthCheck` component checks if user is logged in
   - If not logged in → redirect to `/admin/login`
   - If logged in → show admin panel

2. **User logs in**
   - Credentials sent to Supabase Auth
   - Session created and stored
   - Redirect to `/admin`

3. **User logs out**
   - Click logout button
   - Session destroyed
   - Redirect to `/admin/login`

## Customization

### Change Login Page Styling

Edit `app/admin/login/page.tsx`:
```typescript
// Modify colors, layout, etc.
```

### Add More Auth Features

You can add:
- Password reset
- Email verification
- Social login (Google, GitHub, etc.)
- Two-factor authentication

### Protect More Routes

Wrap any page with `AuthCheck`:
```typescript
import AuthCheck from '@/components/admin/AuthCheck'

export default function ProtectedPage() {
  return (
    <AuthCheck>
      {/* Your protected content */}
    </AuthCheck>
  )
}
```

## Security Best Practices

### 1. Use Strong Passwords
- Minimum 12 characters
- Mix of letters, numbers, symbols
- Don't reuse passwords

### 2. Enable Email Verification
In Supabase Dashboard:
- **Authentication** → **Email Templates**
- Enable "Confirm signup" email

### 3. Set Up Row Level Security (RLS)
Add policies to restrict database access:

```sql
-- Only authenticated users can modify data
CREATE POLICY "Authenticated users can insert" ON faqs
  FOR INSERT TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update" ON faqs
  FOR UPDATE TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete" ON faqs
  FOR DELETE TO authenticated
  USING (true);
```

### 4. Use Environment Variables
Never commit credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your_key
```

## Troubleshooting

### Can't Login
1. Check Supabase Dashboard → Authentication → Users
2. Verify user exists
3. Check email/password are correct
4. Check browser console for errors

### Redirects Not Working
1. Clear browser cache
2. Check `next.config.js` for redirect rules
3. Verify Supabase URL in `.env`

### Session Not Persisting
1. Check browser cookies are enabled
2. Verify Supabase project is active
3. Check for CORS issues

### "Invalid login credentials" Error
- Email/password don't match
- User doesn't exist
- Check Supabase Dashboard → Authentication → Users

## Advanced: Add Role-Based Access

### 1. Add Roles to Users
In Supabase, add a `role` column to `auth.users` metadata:

```sql
-- Add role to user metadata
UPDATE auth.users
SET raw_user_meta_data = raw_user_meta_data || '{"role": "admin"}'::jsonb
WHERE email = 'admin@example.com';
```

### 2. Check Role in Code
```typescript
const user = await getCurrentUser()
const role = user?.user_metadata?.role

if (role !== 'admin') {
  router.push('/unauthorized')
}
```

## Testing Credentials

For development, create a test admin:
- Email: `admin@test.com`
- Password: `Admin123!@#`

**⚠️ Change this in production!**

## Next Steps

1. ✅ Create your admin user in Supabase
2. ✅ Test login at `/admin/login`
3. ✅ Set up RLS policies for security
4. ✅ Enable email verification (optional)
5. ✅ Add more admins as needed

---

Your admin panel is now secure! 🔒
