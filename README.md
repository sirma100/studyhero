# StudyHero.co.ke - Validation Landing Page

**CourseHero for Kenya** - Validation landing page to test market demand before building the full platform.

## What This Is

A validation landing page to test if Kenyan university students will pay for:
- Past papers, CATs, assignments
- AI tutoring in Swahili & English  
- M-Pesa payment integration
- Upload-to-unlock model

## Features

✅ **Landing Page**
- Hero section with clear value prop
- Problem/solution messaging
- Pricing transparency (KES 50/day, KES 300/month)
- Mobile-first design (90% of Kenyan students)

✅ **Waitlist Form**
- Collects: name, email, phone, university, course, year
- Critical validation question: "Would you pay KES 300/month?"
- Stores locally (can upgrade to Supabase later)

✅ **Admin Dashboard**
- View all signups
- Export to CSV
- Validation metrics (% willing to pay)
- Decision guide (green light at 100+ signups + 40% willing to pay)

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

Visit `http://localhost:3000`

### 3. View Admin Dashboard
Visit `http://localhost:3000/admin` to see signups and metrics

## Validation Process

### Phase 1: Test Locally (Today)
1. Run the site locally
2. Share with 5-10 friends/classmates
3. Collect initial feedback

### Phase 2: Deploy & Run Ads (Week 1)
1. Deploy to Vercel (see deployment section)
2. Run Facebook/Instagram ads targeting Kenyan students
3. Budget: KES 2,000-5,000
4. Target: 100+ signups in 7 days

### Phase 3: Decision (Week 2)
Based on signup data:

**✅ GREEN LIGHT** (Build MVP):
- 100+ signups
- 40%+ willing to pay
- Strong university concentration

**⚠️ CONSIDER** (Adjust & retry):
- 50-100 signups
- Mixed payment willingness
- Adjust pricing/messaging

**❌ PIVOT**:
- <50 signups in 7 days
- <20% willing to pay
- Consider different approach

## Deployment

### Option 1: Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

Follow prompts. Your site will be live at `your-project.vercel.app`

### Option 2: Netlify
1. Push code to GitHub
2. Connect GitHub repo to Netlify
3. Deploy

## Upgrading to Real Database

Currently uses `localStorage` (client-side only). To collect real data:

### Option A: Supabase (Free tier)
1. Create Supabase project
2. Create `signups` table:
```sql
create table signups (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  email text not null,
  phone text not null,
  university text not null,
  course text not null,
  year text not null,
  willing_to_pay text not null,
  created_at timestamp default now()
);
```
3. Replace localStorage code with Supabase client

### Option B: Google Sheets (Easiest)
Use a form service like:
- Tally.so
- Typeform
- Google Forms

Redirect form submissions to Google Sheets

## Running Facebook Ads

### Target Audience
- **Location**: Kenya
- **Age**: 18-30
- **Interests**: 
  - University of Nairobi
  - Kenyatta University
  - JKUAT
  - "Past papers"
  - "Exam revision"
  - "Study notes"

### Ad Copy Examples

**Headline Options:**
- "Stop Searching WhatsApp Groups for Past Papers"
- "Get KU/UoN/JKUAT Past Papers Instantly"
- "AI Tutor + Past Papers from KES 50/day"

**Body Text:**
```
Tired of broken Google Drive links? 

StudyHero gives you:
✅ Past papers from YOUR university
✅ CATs & assignments  
✅ AI tutor in Swahili & English
✅ Pay via M-Pesa

Join the waitlist. First 500 students get 3 MONTHS FREE.
```

**Call to Action:**
- "Sign Up"
- "Learn More"
- "Join Waitlist"

### Budget
- Start with KES 2,000 for 3-5 days
- Target: 100+ signups
- Cost per signup target: <KES 20

## Next Steps After Validation

If validation succeeds:

### Week 1-2: Tech Setup
- Choose: Django + Supabase OR Next.js + Supabase
- Set up database schema
- Build auth system

### Week 3: Core Features
- Upload system (PDF)
- Access control (upload-to-unlock)
- Search & filtering

### Week 4: Payments
- M-Pesa Daraja API integration
- Subscription logic

### Week 5: AI
- OpenAI API integration
- Document Q&A
- Study assistant

### Week 6: Beta Launch
- Seed content (partner with 5-10 students)
- Launch to first 500 waitlist members
- Collect feedback

## Key Metrics to Track

From admin dashboard:
1. **Total signups** - Target: 100+ in week 1
2. **Payment willingness** - Target: 40%+ say "yes"
3. **University distribution** - Which unis are most interested?
4. **Course distribution** - Which programs need this most?

From ads (if running):
1. **Click-through rate (CTR)** - Target: >2%
2. **Cost per click (CPC)** - Target: <KES 5
3. **Cost per signup** - Target: <KES 20

## Legal Considerations

Before launching full platform:
1. User agreement (upload terms)
2. DMCA takedown process
3. Privacy policy
4. M-Pesa payment terms
5. Consider hosting outside Kenya (AWS/Vercel)

## Tech Stack

**Current (Validation)**
- Next.js 14
- TypeScript
- Tailwind CSS
- LocalStorage

**Recommended for MVP**
- Next.js + TypeScript
- Supabase (Auth + Database + Storage)
- M-Pesa Daraja API
- OpenAI API
- Vercel hosting

## Quick Commands

```bash
# Install
npm install

# Run dev
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Deploy to Vercel
vercel
```

## File Structure

```
studyhero-landing/
├── app/
│   ├── page.tsx          # Main landing page
│   ├── admin/
│   │   └── page.tsx      # Admin dashboard
│   └── layout.tsx        # Root layout
├── public/               # Static assets
├── README.md             # This file
└── package.json
```

---

**Remember**: This is just validation. Don't overbuild. Get 100+ signups, then decide if it's worth building the full platform.

Good luck! 🇰🇪🚀
