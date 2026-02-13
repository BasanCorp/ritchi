# 🚀 RITCHI.GURU - DEPLOYMENT GUIDE

## 📦 LEMONSQUEEZY SETUP (15 minutes)

### Step 1: Create Products

1. **Login to LemonSqueezy**: https://app.lemonsqueezy.com
2. **Go to Products** → Create Product

Create 3 products:
- **Ritchi Lib30** - For active altcoin traders
- **Ritchi Pro** - For serious traders (mark as featured)
- **Ritchi Elite** - For institutions & HNW

### Step 2: Create Variants (Regional Pricing)

For **each product**, create 4 variants:

#### Ritchi Lib30 Variants
| Region | Currency | Price | Variant Name |
|--------|----------|-------|--------------|
| Singapore | SGD | 13.90 | Lib30 - Singapore |
| UAE | AED | 36.00 | Lib30 - UAE |
| Vietnam | VND | 240,000 | Lib30 - Vietnam |
| Default | USD | 9.90 | Lib30 - Global |

#### Ritchi Pro Variants
| Region | Currency | Price | Variant Name |
|--------|----------|-------|--------------|
| Singapore | SGD | 65.00 | Pro - Singapore |
| UAE | AED | 180.00 | Pro - UAE |
| Vietnam | VND | 990,000 | Pro - Vietnam |
| Default | USD | 49.00 | Pro - Global |

#### Ritchi Elite Variants
| Region | Currency | Price | Variant Name |
|--------|----------|-------|--------------|
| Singapore | SGD | 135.00 | Elite - Singapore |
| UAE | AED | 365.00 | Elite - UAE |
| Vietnam | VND | 1,990,000 | Elite - Vietnam |
| Default | USD | 99.00 | Elite - Global |

### Step 3: Get Variant IDs

After creating variants:
1. Click on each variant
2. Copy the **Variant ID** from the URL (e.g., `123456`)
3. Save for later

### Step 4: Setup Webhook

1. **Go to Settings** → Webhooks
2. **Add Endpoint**: `https://ritchi.guru/api/webhooks/lemonsqueezy`
3. **Select Events**:
   - ✅ order_created
   - ✅ subscription_updated
   - ✅ subscription_cancelled
   - ✅ subscription_expired
4. **Copy Signing Secret** → Save for `.env`

### Step 5: Get API Key

1. **Go to Settings** → API
2. **Create New Token**
3. **Copy API Key** → Save for `.env`

---

## 🌐 VERCEL DEPLOYMENT (10 minutes)

### Step 1: Push to GitHub

```bash
cd /home/user/ritchi-platform

# Initialize git
git init
git add .
git commit -m "Initial commit: Ritchi Platform"

# Create GitHub repo (via GitHub CLI or web)
gh repo create ritchi-platform --public --source=. --remote=origin --push

# Or manually:
# Create repo on GitHub: https://github.com/new
# Then:
git remote add origin https://github.com/YOUR_USERNAME/ritchi-platform.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel

**Option A: Via Vercel Dashboard**
1. Go to https://vercel.com/lucas-projects-a3111d98
2. Click **Add New** → **Project**
3. **Import Git Repository** → Select `ritchi-platform`
4. **Configure Project**:
   - Framework Preset: **Next.js**
   - Root Directory: `./`
   - Build Command: `npm run build` (auto-detected)
5. Click **Deploy**

**Option B: Via Vercel CLI**
```bash
# Install Vercel CLI
npm i -g vercel

# Login to your account
vercel login

# Deploy
cd /home/user/ritchi-platform
vercel --prod

# Follow prompts:
# - Set up and deploy? Y
# - Which scope? lucas-projects-a3111d98
# - Link to existing project? N
# - Project name? ritchi-platform
# - Directory? ./
# - Override settings? N
```

### Step 3: Add Environment Variables

In Vercel Dashboard:
1. **Go to Project** → Settings → Environment Variables
2. **Add each variable** from `.env.example`:

```bash
# Required for production:
DATABASE_URL=postgresql://...
DIRECT_URL=postgresql://...
NEXTAUTH_SECRET=...
NEXTAUTH_URL=https://ritchi.guru
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
LEMONSQUEEZY_API_KEY=...
LEMONSQUEEZY_STORE_ID=...
LEMONSQUEEZY_WEBHOOK_SECRET=...

# All 12 variant IDs (from Step 3 above):
NEXT_PUBLIC_LS_VARIANT_LIB30_SGD=...
NEXT_PUBLIC_LS_VARIANT_PRO_SGD=...
NEXT_PUBLIC_LS_VARIANT_ELITE_SGD=...
# ... and so on
```

3. **Redeploy** after adding variables

### Step 4: Setup Custom Domain

1. **In Vercel**: Settings → Domains
2. **Add Domain**: `ritchi.guru`
3. **Update DNS Records** (at your domain registrar):

```
Type: CNAME
Name: @
Value: cname.vercel-dns.com

Type: CNAME  
Name: www
Value: cname.vercel-dns.com
```

4. **Wait 5-10 minutes** for DNS propagation
5. **SSL Certificate** auto-provisioned by Vercel

---

## 🗄️ DATABASE SETUP (Supabase - 5 minutes)

### Step 1: Create Project

1. Go to https://supabase.com/dashboard
2. **New Project**:
   - Name: `ritchi-platform`
   - Database Password: Generate strong password
   - Region: Singapore (closest to users)
3. **Wait 2 minutes** for provisioning

### Step 2: Get Connection Strings

1. **Go to Project Settings** → Database
2. **Copy Connection Strings**:
   - **Connection Pooling** (for Prisma) → `DATABASE_URL`
   - **Direct Connection** (for migrations) → `DIRECT_URL`
3. Add to Vercel environment variables

### Step 3: Run Migrations

```bash
# Local: Copy production DATABASE_URL to .env
echo "DATABASE_URL=postgresql://..." > .env.local

# Run Prisma migrations
npx prisma db push

# Seed initial data (optional)
npx prisma db seed
```

---

## 🔑 GOOGLE OAUTH SETUP (5 minutes)

### Step 1: Create OAuth App

1. Go to https://console.cloud.google.com
2. **Create Project** → "Ritchi Platform"
3. **APIs & Services** → OAuth consent screen
4. **External** → Fill required fields:
   - App name: Ritchi
   - User support email: support@ritchi.guru
   - Developer contact: your@email.com
5. **Save and Continue**

### Step 2: Create Credentials

1. **Credentials** → Create Credentials → OAuth client ID
2. **Application type**: Web application
3. **Authorized redirect URIs**:
   ```
   https://ritchi.guru/api/auth/callback/google
   http://localhost:3000/api/auth/callback/google
   ```
4. **Create** → Copy Client ID & Secret
5. Add to Vercel environment variables

---

## ✅ VERIFICATION CHECKLIST

After deployment, verify:

### Homepage
- [ ] Visit https://ritchi.guru
- [ ] All 3 sections render correctly
- [ ] Language switcher works (EN/AR/VI)
- [ ] Pricing shows correct currency based on IP
- [ ] Demo section interactive

### Authentication
- [ ] Click "Sign Up"
- [ ] Google OAuth redirects correctly
- [ ] After login, redirects to `/dashboard`
- [ ] User created in Supabase database

### Payments
- [ ] Click "Start Free Trial" on Pro plan
- [ ] LemonSqueezy checkout opens
- [ ] Complete test payment (use test card: 4242 4242 4242 4242)
- [ ] Webhook received (check Vercel logs)
- [ ] Subscription created in database
- [ ] User dashboard shows "Pro" badge

### Multi-language
- [ ] Change to Arabic → Text RTL, Arabic copy
- [ ] Change to Vietnamese → Vietnamese copy
- [ ] Pricing updates to local currency

### Mobile
- [ ] Test on mobile (Chrome DevTools)
- [ ] All sections responsive
- [ ] CTA buttons accessible
- [ ] Forms usable

---

## 🚨 TROUBLESHOOTING

### Issue: Build fails on Vercel
```bash
# Check Next.js version compatibility
# Ensure package.json has:
"engines": {
  "node": "20.x"
}
```

### Issue: Database connection fails
```bash
# Add connection pooling to DATABASE_URL:
postgresql://...?pgbouncer=true&connection_limit=1
```

### Issue: LemonSqueezy webhook not triggering
```bash
# 1. Check webhook URL is correct in LS dashboard
# 2. Check signature verification in route.ts
# 3. Test with LS webhook tester
# 4. Check Vercel function logs
```

### Issue: Wrong currency showing
```bash
# Vercel's req.geo might not work in dev
# Test in production or use VPN to simulate location
```

---

## 📊 POST-DEPLOYMENT MONITORING

### Day 1: Check These

**Vercel Dashboard**
- [ ] No failed deployments
- [ ] API routes responding < 500ms
- [ ] No 500 errors in logs

**Supabase Dashboard**
- [ ] Database connections stable
- [ ] No query timeouts
- [ ] User records creating correctly

**LemonSqueezy Dashboard**
- [ ] Webhooks delivering successfully
- [ ] Test orders completing
- [ ] Revenue tracking

**Analytics**
- [ ] PostHog receiving events (if configured)
- [ ] Page views tracking
- [ ] Conversion funnel working

---

## 🎉 LAUNCH CHECKLIST

Before announcing:
- [ ] All environment variables set
- [ ] SSL certificate active (https)
- [ ] Custom domain working
- [ ] All payment flows tested
- [ ] Email notifications working
- [ ] Mobile fully responsive
- [ ] 3 languages tested
- [ ] Legal pages added (Privacy, Terms)
- [ ] Support email setup (support@ritchi.guru)
- [ ] Status page setup (optional)

---

## 🚀 YOU'RE LIVE!

Your platform is now deployed at:
- 🌐 **Production**: https://ritchi.guru
- 🗄️ **Database**: Supabase Dashboard
- 💳 **Payments**: LemonSqueezy Dashboard
- 📊 **Monitoring**: Vercel Analytics

Next steps:
1. Soft launch to 10 beta users
2. Collect feedback
3. Fix critical bugs
4. Public launch to Singapore/UAE/Vietnam

**Let's get your first 100 paying users!** 🎯
