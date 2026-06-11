# SmartCoachAI - Supabase Authentication Quick Start

## ⚡ Quick Steps to Get Authentication Working

### Step 1: Create the `.env` File

1. **Copy** the `.env.example` file in this directory
2. **Rename** the copy to `.env` (just `.env`, no `.example`)
3. Keep it open - you'll add your credentials in Step 3

### Step 2: Create Supabase Project (5 minutes)

1. Go to **https://supabase.com**
2. Sign up or log in
3. Click **"New Project"**
4. Fill in:
   - **Name**: `smartcoachai`
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to you
5. Click **"Create new project"**
6. ⏳ Wait 2-3 minutes for setup

### Step 3: Get Your API Credentials

1. In Supabase dashboard, go to **Settings** (⚙️) → **API**
2. You'll see two values:
   
   **Project URL**
   ```
   https://xxxxxxxxxxxxx.supabase.co
   ```
   
   **anon public key**
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

3. **Copy these** and paste them into your `.env` file:

```env
VITE_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

4. **Save** the `.env` file

### Step 4: Set Up Database Tables

1. In Supabase dashboard, go to **SQL Editor** (left sidebar)
2. Click **"New query"**
3. Open the `supabase-schema.sql` file from this project
4. **Copy ALL the SQL** from that file
5. **Paste** it into the Supabase SQL Editor
6. Click **"Run"** or press `Ctrl+Enter`
7. ✅ You should see "Success. No rows returned"

### Step 5: Disable Email Confirmation (Development Only)

1. In Supabase, go to **Authentication** → **Providers** → **Email**
2. Scroll down to **"Confirm email"**
3. **Uncheck** "Enable email confirmations"
4. Click **"Save"**

⚠️ This makes testing easier. Re-enable for production!

### Step 6: Run the App

Open Command Prompt (not PowerShell):

```bash
cd C:\Users\Prajval\Downloads\archive
npm install
npm run dev
```

### Step 7: Test Authentication

1. Open **http://localhost:5173**
2. Click **"Get Started"**
3. Sign up with:
   - Username: `testuser`
   - Email: `test@example.com`
   - Password: `password123`
4. You should be logged in and see the Player Analysis page!
5. Your avatar should appear in the top right

### Step 8: Verify in Supabase

1. Go to **Authentication** → **Users** in Supabase
2. You should see your test user
3. Go to **Table Editor** → **profiles**
4. You should see your profile with username and avatar

---

## ✅ Success Checklist

- [ ] Created `.env` file with Supabase credentials
- [ ] Created Supabase project
- [ ] Ran database schema SQL
- [ ] Disabled email confirmation
- [ ] Installed dependencies (`npm install`)
- [ ] Started dev server (`npm run dev`)
- [ ] Successfully signed up
- [ ] Can see profile in navbar
- [ ] Successfully logged out
- [ ] Successfully logged in

---

## 🎯 What Works Now

### ✅ Authentication Features
- **Sign Up**: Create new accounts with username, email, password
- **Login**: Sign in with email and password
- **Logout**: Sign out from avatar dropdown
- **Sessions**: Stay logged in across page refreshes
- **Profile**: Username and avatar stored in database
- **Security**: Row Level Security (RLS) protecting your data

### 🔒 Security Features
- Passwords are hashed and secure
- Users can only access their own data
- JWT tokens for authentication
- Auto-refresh tokens
- Protected routes (can't access app without login)

---

## 🐛 Troubleshooting

### "Missing Supabase credentials" Error
- Make sure `.env` file exists (not `.env.example`)
- Check that values don't have quotes or extra spaces
- Restart dev server after creating `.env`

### "Invalid API key" Error
- Double-check you copied the **anon public key** (not service role key)
- Make sure there are no spaces before/after the key

### Sign Up Doesn't Work
- Check browser console (F12) for errors
- Verify database schema was run successfully
- Check if email confirmation is disabled

### Profile Not Showing
- Verify the SQL schema created the trigger
- Check Table Editor → profiles for your user
- Try logging out and back in

### Can't Log In After Signing Up
- If email confirmation is enabled, check your email
- Or disable email confirmation in Supabase settings

---

## 📁 Files Changed for Authentication

### New Files Created:
- `src/lib/supabase.js` - Supabase client configuration
- `supabase-schema.sql` - Database schema
- `.env.example` - Environment variables template
- `SUPABASE_SETUP.md` - Detailed setup guide
- `AUTHENTICATION_GUIDE.md` - This file

### Files Modified:
- `src/context/AuthContext.jsx` - Now uses real Supabase auth
- `src/pages/LoginPage.jsx` - Async login with error handling
- `src/pages/SignUpPage.jsx` - Async signup with error handling
- `src/components/Navbar.jsx` - Displays profile from database

---

## 🚀 Next Steps

Now that authentication is working, you can:

1. **Test the full flow**: Sign up, log in, log out
2. **Upload videos**: Videos will soon be stored in Supabase
3. **Add likes**: Connect like button to database
4. **Add comments**: Store comments in Supabase
5. **Video storage**: Upload actual video files to Supabase Storage

---

## 📚 Additional Resources

- **Full Setup Guide**: See `SUPABASE_SETUP.md`
- **Supabase Docs**: https://supabase.com/docs/guides/auth
- **React Docs**: https://react.dev

---

## 💡 Tips

- Use **Command Prompt** instead of PowerShell on Windows
- Keep your Supabase dashboard open while testing
- Check the **Logs** in Supabase if something doesn't work
- The browser console (F12) shows helpful error messages

---

## ✨ That's It!

Your SmartCoachAI app now has **real authentication** powered by Supabase! 🎉

Users can sign up, log in, and their sessions persist across page refreshes. The foundation is ready for building out the rest of your video analysis features.
