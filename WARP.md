# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

StudyHero.co.ke is a **validation landing page** for a CourseHero-style platform targeting Kenyan university students. The goal is to test market demand before building the full product.

**Key Validation Metrics:**
- Target: 100+ signups in 7 days
- Success threshold: 40%+ willing to pay KES 300/month
- Data storage: JSON file via API endpoint (with localStorage backup)

## Development Commands

```bash
# Install dependencies
npm install

# Run development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## Deployment

**Recommended:** Vercel
```bash
npm install -g vercel
vercel
```

## Architecture

### Tech Stack
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **State:** React hooks (useState, useEffect)
- **Data Storage:** localStorage (temporary validation)

### App Structure

This is a Next.js App Router project with two main routes:

**`app/page.tsx`** - Landing page with waitlist form
- Client component (`'use client'`)
- Captures: name, email, phone, university, course, year, payment willingness
- Stores submissions in localStorage under key `'studyhero-signups'`
- Mobile-first design (90% of target users are mobile)

**`app/admin/page.tsx`** - Admin dashboard
- Client component for viewing signup data
- Reads from localStorage
- Displays validation metrics and decision guidance
- CSV export functionality
- Accessible at `/admin` (no authentication - add if needed)

**`app/layout.tsx`** - Root layout
- Configures Geist fonts (sans & mono)
- Global metadata (needs updating from default)

**`app/globals.css`** - Global styles
- Tailwind CSS v4 imports
- CSS variables for theming
- Dark mode support (prefers-color-scheme)

**`app/api/signups/route.ts`** - API endpoint for signup data
- POST: Save new signup to `data/signups.json`
- GET: Retrieve all signups
- Validates required fields
- Creates `data/` directory if it doesn't exist

### Data Model

Signup object stored in localStorage:
```typescript
{
  name: string;
  email: string;
  phone: string;           // M-Pesa number
  university: string;      // 13 predefined options
  course: string;
  year: string;            // "1", "2", "3", "4", "5+"
  willingToPay: string;    // "yes", "maybe", "no"
  timestamp: string;       // ISO datetime
}
```

### Universities Supported
The form includes 13 Kenyan universities: University of Nairobi, Kenyatta University, JKUAT, Strathmore, Moi, Egerton, MMUST, Technical University of Kenya, USIU-Africa, Daystar, Mount Kenya University, KCA University, and "Other".

## Important Constraints

1. **This is validation-only** - Avoid over-engineering. The purpose is to test market demand with minimal features.

2. **No real database yet** - Data is stored in localStorage. To upgrade to persistent storage:
   - Supabase (recommended for MVP)
   - Google Sheets via form service
   - See README.md for migration SQL schema

3. **No authentication on admin page** - `/admin` is publicly accessible. Add basic auth if deploying with real user data.

4. **Mobile-first** - 90% of Kenyan students access via mobile. Always test responsive design.

5. **M-Pesa integration is future work** - Phone field is collected but payment isn't implemented.

6. **Metadata needs updating** - `app/layout.tsx` still has default "Create Next App" metadata.

## Next Steps After Validation

If validation succeeds (100+ signups, 40%+ willing to pay):

1. **Database:** Set up Supabase with `signups` table
2. **Auth:** Implement student authentication
3. **Upload system:** PDF upload with access control
4. **M-Pesa:** Integrate Daraja API for payments
5. **AI tutor:** OpenAI API for document Q&A
6. **Content:** Seed with past papers from partner students

## Common Tasks

**View admin dashboard:**
```bash
# Start dev server and navigate to:
http://localhost:3000/admin
```

**Export signups:**
Visit `/admin` and click "Export to CSV" button (client-side export)

**Clear test data:**
```bash
# Delete the data file
Remove-Item data\signups.json

# Or in browser console (localStorage backup)
localStorage.removeItem('studyhero-signups');
```

**View signup data file:**
```bash
# Open the JSON file
cat data/signups.json
# Or on Windows:
type data\signups.json
```

**Add new university:**
Edit the `universities` array in `app/page.tsx` (line 18)

## Validation Goals

From Facebook/Instagram ads targeting Kenyan students:
- Budget: KES 2,000-5,000 for 7 days
- Target CPC: <KES 5
- Target cost per signup: <KES 20
- Decision criteria: see admin dashboard

## Windows Development Notes

This project is being developed on Windows with PowerShell. Use `Get-ChildItem` instead of `ls -la` for directory listings.
