# Supabase Authentication Setup Guide

This guide will walk you through setting up Supabase authentication for SmartCoachAI.

## Prerequisites

- A Supabase account (free tier works)
- The SmartCoachAI project installed locally

---

## Step 1: Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Click **"Start your project"** or **"New Project"**
3. Sign in with GitHub, Google, or email
4. Create a new organization (if you don't have one)
5. Click **"New Project"**
6. Fill in project details:
   - **Name**: `smartcoachai` (or any name you prefer)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose the closest region to your users
   - **Pricing Plan**: Free tier is sufficient for development
7. Click **"Create new project"**
8. Wait 2-3 minutes for the project to initialize

---

## Step 2: Get API Credentials

1. In your Supabase dashboard, click on your project
2. Go to **Settings** (gear icon) → **API**
3. You'll see two important values:
   - **Project URL** (looks like: `https://xxxxxxxxxxxxx.supabase.co`)
   - **anon/public key** (long string starting with `eyJ...`)
4. Keep this page open, you'll need these values

---

## Step 3: Configure Environment Variables

1. Open the `.env` file in your project root (`C:\Users\Prajval\Downloads\archive\.env`)
2. Replace the placeholder values with your actual credentials:

```env
VITE_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

3. **Important**: Never commit the `.env` file to Git (it's already in `.gitignore`)

---

## Step 4: Set Up Database Schema

1. In Supabase dashboard, go to **SQL Editor** (left sidebar)
2. Click **"New query"**
3. Copy the entire contents of `supabase-schema.sql` from your project
4. Paste it into the SQL Editor
5. Click **"Run"** (or press `Ctrl+Enter`)
6. You should see "Success. No rows returned" - this is normal!

This creates:
- ✅ `profiles` table (stores username and avatar)
- ✅ `videos` table (stores uploaded videos)
- ✅ `likes` table (stores video likes)
- ✅ `comments` table (stores video comments)
- ✅ Row Level Security (RLS) policies
- ✅ Auto-create profile trigger

---

## Step 5: Configure Authentication Settings

### Disable Email Confirmation (Development Only)

For easier testing during development:

1. Go to **Authentication** → **Providers** → **Email**
2. Scroll down to **"Confirm email"**
3. **Uncheck** "Enable email confirmations"
4. Click **"Save"**

⚠️ **Important**: Re-enable this in production for security!

### Optional: Enable Social Logins

You can also enable Google, GitHub, etc. in the same section.

---

## Step 6: Test the Authentication Flow

### Install Dependencies

```bash
cd C:\Users\Prajval\Downloads\archive
npm install
```

### Start the Development Server

```bash
npm run dev
```

### Test Sign Up

1. Open http://localhost:5173
2. Click **"Get Started"**
3. Fill in:
   - **Username**: `testuser`
   - **Email**: `test@example.com`
   - **Password**: `password123`
4. Click **"Sign Up"**
5. You should be redirected to the Player Analysis page

### Verify in Supabase

1. Go to **Authentication** → **Users** in Supabase dashboard
2. You should see your test user listed
3. Go to **Table Editor** → **profiles**
4. You should see a profile created automatically

### Test Login

1. Click your avatar (top right) → **Log Out**
2. Click **"Sign In"**
3. Enter the same email and password
4. Click **"Sign In"**
5. You should be logged in successfully

---

## Step 7: View Database Tables

### Check Profiles Table

1. Go to **Table Editor** → **profiles**
2. You should see:
   - `id` (UUID matching the auth user)
   - `username`
   - `avatar_url`
   - `created_at`
   - `updated_at`

### Verify Row Level Security

1. Go to **Authentication** → **Policies**
2. You should see policies for each table
3. These ensure users can only modify their own data

---

## Common Issues & Solutions

### Issue: "Invalid API key"
**Solution**: Double-check your `.env` file has the correct credentials with no extra spaces

### Issue: "Missing Supabase credentials"
**Solution**: Make sure your `.env` file is in the root directory and has the `VITE_` prefix

### Issue: "User already registered"
**Solution**: Either:
- Use a different email
- Delete the user in Supabase dashboard (Authentication → Users)

### Issue: "Session expired"
**Solution**: The app auto-refreshes tokens, but you can log out and log in again

### Issue: "Profile not found"
**Solution**: Make sure you ran the SQL schema that includes the trigger to create profiles

### Issue: Email confirmation required
**Solution**: Either:
- Check your email for confirmation link
- Or disable email confirmation in Supabase settings (see Step 5)

---

## Security Best Practices

### For Development
- ✅ Disable email confirmation for easier testing
- ✅ Use test emails like `test@example.com`
- ✅ Keep `.env` in `.gitignore`

### For Production
- ✅ Enable email confirmation
- ✅ Set up password reset flow
- ✅ Enable CAPTCHA for signup
- ✅ Set up custom SMTP for emails
- ✅ Use environment variables in hosting platform
- ✅ Enable 2FA for your Supabase account

---

## Next Steps

Now that authentication is set up, you can:

1. ✅ Test login and signup
2. ✅ See your profile in the navbar dropdown
3. ✅ Sessions persist across page refreshes
4. 📝 Next: Connect video uploads to Supabase Storage
5. 📝 Next: Implement real-time comments
6. 📝 Next: Add likes functionality with database

---

## Useful Supabase Dashboard Links

- **Authentication**: See all users and their details
- **Table Editor**: View and edit database tables
- **SQL Editor**: Run custom SQL queries
- **API Docs**: Auto-generated API documentation
- **Logs**: View real-time logs and errors

---

## Testing Checklist

- [ ] Created Supabase project
- [ ] Added API credentials to `.env`
- [ ] Ran database schema SQL
- [ ] Disabled email confirmation (dev only)
- [ ] Installed npm dependencies
- [ ] Started dev server
- [ ] Signed up a test user
- [ ] Verified user in Supabase dashboard
- [ ] Logged out successfully
- [ ] Logged in successfully
- [ ] Profile data appears in navbar

---

## Support

If you encounter any issues:

1. Check the browser console (F12) for errors
2. Check the Supabase logs in your dashboard
3. Verify your `.env` file has correct credentials
4. Make sure the database schema was run successfully

---

## Summary

You've successfully configured Supabase authentication for SmartCoachAI! 🎉

Your app now has:
- ✅ Real user authentication
- ✅ Secure password storage
- ✅ Automatic profile creation
- ✅ Session management
- ✅ Row Level Security

The authentication is fully functional and ready for development!
