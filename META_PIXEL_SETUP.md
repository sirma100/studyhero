# Meta Pixel Setup Instructions

The Meta Pixel is now integrated into your StudyHero website! Follow these steps to activate it.

## Step 1: Create Your Meta Pixel

1. Go to [Meta Events Manager](https://business.facebook.com/events_manager2)
2. Click **"Connect data sources"** → **"Web"**
3. Select **"Meta pixel"** → Click **"Connect"**
4. Name your pixel: **"StudyHero"**
5. Click **"Create pixel"**
6. You'll see your **Pixel ID** (a number like `123456789012345`)
7. **Copy this Pixel ID** - you'll need it next

## Step 2: Add Pixel ID to Your Environment

### For Local Development:

1. Open `.env.local` in your project root
2. Find the line: `NEXT_PUBLIC_META_PIXEL_ID=`
3. Paste your Pixel ID after the equals sign:
   ```
   NEXT_PUBLIC_META_PIXEL_ID=123456789012345
   ```
4. Save the file
5. **Restart your dev server:**
   ```bash
   npm run dev
   ```

### For Vercel Production:

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your **studyhero-landing** project
3. Go to **Settings** → **Environment Variables**
4. Click **"Add New"**
5. Set:
   - **Key:** `NEXT_PUBLIC_META_PIXEL_ID`
   - **Value:** Your Pixel ID (e.g., `123456789012345`)
6. Apply to: **Production**, **Preview**, and **Development**
7. Click **"Save"**
8. **Redeploy your site** (it will auto-redeploy on next push)

## Step 3: Verify Pixel is Working

### Option A: Using Meta Pixel Helper (Recommended)

1. Install [Meta Pixel Helper Chrome Extension](https://chrome.google.com/webstore/detail/meta-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc)
2. Visit your website: https://studyhero-landing.vercel.app
3. Click the Pixel Helper icon in your Chrome toolbar
4. You should see:
   - ✅ **PageView** event firing
   - ✅ Your Pixel ID
   - ✅ Green checkmark (no errors)

### Option B: Using Meta Events Manager

1. Go to [Meta Events Manager](https://business.facebook.com/events_manager2)
2. Select your **StudyHero** pixel
3. Click **"Test Events"** tab
4. Open your website in a new tab
5. You should see events appearing in real-time:
   - **PageView** when page loads
   - **Lead** when someone submits the form

## Step 4: Test Conversion Tracking

1. Visit your website
2. Fill out the waitlist form
3. Submit it
4. Check Meta Events Manager → **Test Events** tab
5. You should see a **"Lead"** event with these details:
   - Event Name: **Lead**
   - Content Name: **Waitlist Signup**
   - Content Category: **Education**
   - Currency: **KES**

## What Gets Tracked?

### Automatic Tracking:
- ✅ **PageView** - Every time someone visits your site
- ✅ **ViewContent** - When someone views the landing page

### Manual Tracking:
- ✅ **Lead** - When someone submits the waitlist form

## Step 5: Create a Custom Conversion in Ads Manager

To optimize your ads for signups:

1. Go to [Meta Events Manager](https://business.facebook.com/events_manager2)
2. Select your pixel
3. Click **"Custom Conversions"** → **"Create Custom Conversion"**
4. Set:
   - **Name:** Waitlist Signup
   - **Data Source:** StudyHero Pixel
   - **Event:** Lead
   - **Rule:** URL contains `/` (or leave default)
5. Click **"Create"**

Now when you create Facebook ads, you can optimize for **"Waitlist Signup"** conversions!

## Troubleshooting

### Pixel Not Firing

**Problem:** Meta Pixel Helper shows no pixel
**Solution:**
- Make sure you added `NEXT_PUBLIC_META_PIXEL_ID` to both `.env.local` and Vercel
- Restart dev server: Stop (Ctrl+C) and run `npm run dev` again
- Hard refresh your browser: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

### Pixel ID Not Showing

**Problem:** Pixel is loading but no ID shown
**Solution:**
- Check that your Pixel ID has no spaces or quotes
- In `.env.local`, it should look like: `NEXT_PUBLIC_META_PIXEL_ID=123456789012345`
- **NOT** like: `NEXT_PUBLIC_META_PIXEL_ID="123456789012345"` (no quotes!)

### Lead Event Not Tracking

**Problem:** PageView works but Lead event doesn't fire on form submission
**Solution:**
- Open browser console (F12) and check for errors
- Make sure the form submission is successful (check admin dashboard)
- Try submitting the form again
- Wait 5-10 seconds, events can be slightly delayed

### Events Show in Test but Not in Dashboard

**Problem:** Events appear in "Test Events" but not in main dashboard
**Solution:**
- This is normal! Test Events show real-time data
- Main dashboard updates every few hours
- Wait 24 hours for accurate data to appear

## Using Pixel Data in Facebook Ads

Once your pixel is collecting data:

1. **Create Ad Campaign:**
   - Go to Facebook Ads Manager
   - Create new campaign
   - Choose **"Conversions"** objective

2. **Select Your Pixel:**
   - In Ad Set settings
   - Under "Conversion Event"
   - Select **"Lead"** or **"Waitlist Signup"** custom conversion

3. **Optimization:**
   - Facebook will optimize ads to show to people most likely to sign up
   - You'll see cost per Lead (CPL) in your ad metrics
   - Target CPL: <KES 20

## Privacy & Compliance

The Meta Pixel is GDPR/privacy compliant as configured:
- ✅ No personal data is sent to Meta
- ✅ Only anonymous events are tracked
- ✅ Form data stays in your Supabase database
- ✅ Meta only sees that "someone" signed up, not who

## Next Steps

1. ✅ Set up pixel (you're here!)
2. ✅ Test that it's working
3. 🎯 Run Facebook ads for 3 days with KES 1,000/day
4. 📊 Check ad performance in Ads Manager
5. 🚀 Scale winning ads, kill losing ones

Good luck with your ads! 🚀

## Resources

- [Meta Pixel Documentation](https://developers.facebook.com/docs/meta-pixel)
- [Meta Pixel Helper Extension](https://chrome.google.com/webstore/detail/meta-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc)
- [Meta Events Manager](https://business.facebook.com/events_manager2)
- [Facebook Ads Manager](https://business.facebook.com/adsmanager)
