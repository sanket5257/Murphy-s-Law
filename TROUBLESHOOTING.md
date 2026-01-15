# Troubleshooting Guide

## Error: EPERM - Operation Not Permitted

### Problem
```
Error: EPERM: operation not permitted, open 'C:\Users\...\murphys law\.next\trace'
```

This is a Windows permission issue with the Next.js build cache.

### Solutions

#### Option 1: Use the Clean Script (Recommended)
1. Close your development server (Ctrl+C in terminal)
2. Double-click `clean-build.bat` file
3. Wait for it to complete
4. Run `npm run dev` again

#### Option 2: Manual Cleanup
1. **Close the development server** (Ctrl+C)
2. **Close VS Code or any editor** that has the project open
3. **Wait 10 seconds** for all processes to release files
4. **Delete the `.next` folder** manually in File Explorer
5. **Restart your development server**: `npm run dev`

#### Option 3: Using Command Line
```bash
# Stop the dev server first (Ctrl+C)

# Then run:
taskkill /F /IM node.exe
timeout /t 2
rmdir /s /q .next
npm run dev
```

#### Option 4: Restart Computer
If all else fails:
1. Save your work
2. Restart your computer
3. Run `npm run dev` again

## Other Common Issues

### Port Already in Use
```
Error: Port 3000 is already in use
```

**Solution:**
```bash
# Kill the process using port 3000
npx kill-port 3000

# Or use a different port
npm run dev -- -p 3001
```

### Module Not Found Errors
```
Error: Cannot find module '@supabase/supabase-js'
```

**Solution:**
```bash
# Reinstall dependencies
npm install
```

### Database Connection Errors
```
Error: Could not find the table 'public.faqs'
```

**Solution:**
1. Make sure you ran the SQL schema in Supabase
2. Check your `.env` file has correct credentials
3. Run: `npm run check-tables`

### Changes Not Showing on Website

**Solution:**
1. Hard refresh the page: `Ctrl + Shift + R`
2. Clear browser cache
3. Check if data was saved in admin panel
4. Verify in Supabase dashboard

### White Text in Input Fields

**Solution:**
This has been fixed in the latest version. If you still see it:
1. Pull the latest changes
2. Restart the dev server

## Prevention Tips

### 1. Always Stop Dev Server Properly
- Use `Ctrl+C` to stop the server
- Don't just close the terminal window

### 2. Close Editors Before Cleaning
- Close VS Code or other editors
- This releases file locks

### 3. Use Git Ignore
The `.next` folder should already be in `.gitignore`:
```
.next/
```

### 4. Regular Cleanup
Run cleanup occasionally:
```bash
npm run dev
# Stop with Ctrl+C
# Delete .next folder
# Restart
```

## Getting Help

If you're still having issues:

1. **Check the console** for specific error messages
2. **Check browser console** (F12) for frontend errors
3. **Verify environment variables** in `.env` file
4. **Check Supabase dashboard** for database issues
5. **Review the logs** in terminal for detailed errors

## Quick Reference

### Useful Commands
```bash
# Check if tables exist
npm run check-tables

# Seed database
npm run seed

# Clean and restart
taskkill /F /IM node.exe
rmdir /s /q .next
npm run dev

# Check for port conflicts
netstat -ano | findstr :3000
```

### File Locations
- Environment variables: `.env`
- Database schema: `supabase-schema.sql`
- Admin panel: `http://localhost:3000/admin`
- Seed page: `http://localhost:3000/admin/seed`

## Still Having Issues?

1. Make sure all dependencies are installed: `npm install`
2. Check Node.js version: `node --version` (should be 18+)
3. Verify Supabase project is active
4. Check internet connection
5. Try restarting your computer

---

**Remember:** Most issues can be solved by:
1. Stopping the dev server properly
2. Deleting the `.next` folder
3. Restarting the dev server
