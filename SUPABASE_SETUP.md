# Supabase Setup Guide

Follow these steps to set up Supabase for your StudyHero landing page.

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Fill in:
   - **Project name**: `studyhero-landing` (or any name you prefer)
   - **Database password**: Generate a strong password (save it!)
   - **Region**: Choose closest to Kenya (e.g., `ap-south-1` for Mumbai or `eu-west-1` for Ireland)
4. Wait for the project to be created (~2 minutes)

## 2. Create the Database Table

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy and paste the entire contents of `supabase-schema.sql`
4. Click "Run" to execute the SQL
5. Verify the table was created by going to **Table Editor** → you should see `signups`

## 3. Get Your API Keys

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy these two values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon/public key** (the `anon` key under "Project API keys")

## 4. Configure Local Environment

1. Create a `.env.local` file in the project root:
```bash
# Copy the example file
cp .env.local.example .env.local
```

2. Edit `.env.local` and add your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

⚠️ **Important**: Never commit `.env.local` to Git. It's already in `.gitignore`.

## 5. Configure Vercel Environment Variables

Since your app is deployed on Vercel, you need to add the environment variables there too:

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Select your `studyhero-landing` project
3. Go to **Settings** → **Environment Variables**
4. Add both variables:
   - `NEXT_PUBLIC_SUPABASE_URL` = your project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your anon key
5. Make sure to apply them to **Production**, **Preview**, and **Development** environments

## 6. Test Locally

1. Start your dev server:
```bash
npm run dev
```

2. Open `http://localhost:3000` and fill out the waitlist form
3. Check your Supabase dashboard → **Table Editor** → **signups** to see the new entry
4. Visit `http://localhost:3000/admin` to see the data in your admin dashboard

## 7. Deploy to Vercel

After adding environment variables to Vercel, redeploy:

```bash
# Option 1: Push to Git (auto-deploys)
git add .
git commit -m "Add Supabase integration"
git push

# Option 2: Manual deploy
vercel --prod
```

## 8. Test Production

1. Visit your live site: `https://studyhero-landing.vercel.app`
2. Submit a test signup
3. Check Supabase dashboard to confirm it's saved
4. Visit `/admin` on your live site to view the data

## Troubleshooting

### "Missing Supabase environment variables" error
- Make sure `.env.local` exists with correct values
- For Vercel, verify environment variables are set in dashboard
- Redeploy after adding Vercel env vars

### Signup fails with 500 error
- Check Supabase dashboard → **Logs** for errors
- Verify the `signups` table exists
- Check that RLS policies are set up correctly (run the SQL schema again if needed)

### Admin dashboard shows no data
- Open browser console (F12) and check for errors
- Verify `/api/signups` endpoint returns data: visit `http://localhost:3000/api/signups`
- Check Supabase Table Editor to see if data exists in the database

### Row Level Security (RLS) issues
The schema includes public read/write policies for easy setup. For production:
- Consider adding authentication to the admin dashboard
- Update RLS policies to restrict access to authenticated users only

## Next Steps

✅ Your email storage is now persistent and will survive Vercel deployments!

Optional improvements:
- Add admin authentication (Supabase Auth)
- Set up email notifications for new signups
- Enable real-time subscriptions to watch signups live
- Add duplicate email detection

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [Next.js + Supabase Guide](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
