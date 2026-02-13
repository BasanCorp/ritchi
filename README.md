# 🚀 Ritchi.guru - AI-Powered Trading Indicators Platform

![Ritchi Banner](https://via.placeholder.com/1200x400/6366f1/ffffff?text=Ritchi.guru+-+Trading+Indicators+That+Learn+Your+Style)

**Professional trading indicators with AI personalization for 60% less than LuxAlgo**

[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-green)](./LICENSE)
[![Deploy on Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/ritchi-platform)

---

## ✨ Features

### 🎯 Core Features
- **AI Personalization Engine** - Indicators adapt to YOUR trading style
- **50+ Premium Indicators** - Trend, momentum, volatility, and more
- **Auto Parameter Tuning** - Machine learning optimizes settings
- **8 Trading Style Profiles** - Scalping, swing, day trading, etc.
- **Advanced Backtesting** - Test strategies on historical data
- **Exchange Integration** - Connect Binance, Bybit, and more

### 🌍 Multi-Market Support
- **3 Languages**: English, Arabic, Vietnamese, Chinese
- **Regional Pricing**: SGD, AED, VND, USD
- **Local Compliance**: MAS (Singapore), VARA (UAE), Vietnam-legal
- **Cultural Adaptation**: Sharia-compliant options, local payment methods

### 💳 Flexible Pricing
| Tier | Price (USD) | Features |
|------|-------------|----------|
| **Free** | $0 | 3 indicators, basic features |
| **Lib30** | $9.9/mo | 30 altcoin indicators |
| **Pro** | $49/mo | Full platform, AI tuning |
| **Elite** | $99/mo | White-label, custom development |

*60% cheaper than LuxAlgo ($120/mo)*

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Accessible component library
- **Framer Motion** - Smooth animations
- **next-intl** - Internationalization

### Backend
- **Prisma** - Type-safe ORM
- **PostgreSQL** - Supabase database
- **NextAuth** - Authentication (Google, Email)
- **LemonSqueezy** - Payment processing
- **tRPC** - End-to-end type safety

### Infrastructure
- **Vercel** - Hosting & edge functions
- **Supabase** - Database & real-time
- **PostHog** - Analytics (optional)
- **Sentry** - Error tracking (optional)

---

## 🚀 Quick Start

### 1. Clone Repository
```bash
git clone https://github.com/YOUR_USERNAME/ritchi-platform.git
cd ritchi-platform
```

### 2. Install Dependencies
```bash
npm install
# or
pnpm install
```

### 3. Setup Environment Variables
```bash
cp .env.example .env.local
```

Fill in required variables:
- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_SECRET` - Generate with `openssl rand -base64 32`
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` - Google OAuth
- `LEMONSQUEEZY_API_KEY` - Payment processing
- `NEXT_PUBLIC_LS_VARIANT_*` - Product variant IDs (12 total)

### 4. Run Database Migrations
```bash
npx prisma db push
npx prisma generate
```

### 5. Start Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
ritchi-platform/
├── app/                      # Next.js App Router
│   ├── [locale]/            # Multi-language routes
│   │   ├── page.tsx         # Landing page
│   │   ├── pricing/         # Pricing page
│   │   └── dashboard/       # User dashboard
│   ├── api/                 # API routes
│   │   ├── auth/            # NextAuth endpoints
│   │   ├── checkout/        # LemonSqueezy checkout
│   │   └── webhooks/        # Payment webhooks
│   └── layout.tsx           # Root layout
│
├── components/              # React components
│   ├── hero-section.tsx     # Landing hero
│   ├── demo-section.tsx     # Interactive demo
│   ├── pricing-section.tsx  # Pricing table
│   └── ui/                  # shadcn components
│
├── lib/                     # Utilities
│   ├── auth.ts              # NextAuth config
│   ├── db.ts                # Prisma client
│   ├── lemonsqueezy.ts      # Payment logic
│   └── utils.ts             # Helper functions
│
├── messages/                # i18n translations
│   ├── en.json              # English
│   ├── ar.json              # Arabic
│   ├── vi.json              # Vietnamese
│   └── zh.json              # Chinese
│
├── prisma/                  # Database
│   ├── schema.prisma        # Database schema
│   └── migrations/          # Migration history
│
├── public/                  # Static assets
│
├── config/                  # Configuration
│   └── i18n.ts              # Language config
│
├── ARCHITECTURE.md          # Technical architecture
├── CONVERSION_OPTIMIZATION.md  # Growth tactics
├── DEPLOYMENT.md            # Deployment guide
├── MULTI_LANGUAGE_STRATEGY.md  # Market strategy
└── README.md               # This file
```

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/ritchi-platform)

**Manual deployment:**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

### Environment Variables (Vercel)
Add these in Vercel Dashboard → Settings → Environment Variables:
- All variables from `.env.example`
- Set **Environment**: Production, Preview, Development
- Redeploy after adding

---

## 💳 LemonSqueezy Setup

### 1. Create Products
- Ritchi Lib30
- Ritchi Pro (mark as featured)
- Ritchi Elite

### 2. Create Variants (Regional Pricing)
For each product, create 4 variants:
- **Singapore** (SGD): 13.90 / 65 / 135
- **UAE** (AED): 36 / 180 / 365
- **Vietnam** (VND): 240K / 990K / 1.99M
- **Default** (USD): 9.9 / 49 / 99

### 3. Setup Webhook
- URL: `https://ritchi.guru/api/webhooks/lemonsqueezy`
- Events: `order_created`, `subscription_updated`, `subscription_cancelled`

### 4. Get Credentials
- **API Key**: Settings → API
- **Store ID**: Your store URL
- **Webhook Secret**: Webhooks → Signing Secret
- **Variant IDs**: Each variant page → Copy from URL

See [DEPLOYMENT.md](./DEPLOYMENT.md) for step-by-step guide.

---

## 🗺️ Roadmap

### Phase 1: MVP (Weeks 1-4) ✅
- [x] Landing page with multi-language support
- [x] Authentication (Google OAuth)
- [x] LemonSqueezy payment integration
- [x] 3 free indicators
- [x] Basic dashboard

### Phase 2: Core Features (Weeks 5-8)
- [ ] AI personalization engine
- [ ] 50+ premium indicators
- [ ] Auto parameter tuning
- [ ] TradingView integration
- [ ] Advanced backtesting

### Phase 3: Growth (Weeks 9-12)
- [ ] Mobile app (React Native)
- [ ] Telegram/Discord bots
- [ ] Referral program
- [ ] Trading competitions
- [ ] API for developers

### Phase 4: Scale (Months 4-6)
- [ ] Institutional features
- [ ] White-label options
- [ ] Crypto exchange partnerships
- [ ] Expand to 10 more countries

---

## 📊 Target Markets

| Market | Population | Crypto Adoption | Pricing Strategy |
|--------|-----------|----------------|-----------------|
| 🇸🇬 Singapore | 5.9M | 13% (~770K) | Premium (SGD) |
| 🇦🇪 UAE | 9.3M | 25% (~2.3M) | Premium (AED) |
| 🇻🇳 Vietnam | 98M | 21% (~20M) | Value (VND -20% discount) |

**Total Addressable Market**: 23.1M crypto traders

**Revenue Goal (Year 1)**: 1,000 paid users × $49/mo = $588K ARR

---

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

### Development Workflow
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see [LICENSE](./LICENSE) file.

---

## 🙏 Acknowledgments

- **LuxAlgo** - Inspiration for premium indicators
- **TradingView** - Charting infrastructure
- **shadcn/ui** - Component library
- **Vercel** - Hosting platform
- **LemonSqueezy** - Payment processing

---

## 📞 Support

- **Website**: https://ritchi.guru
- **Email**: support@ritchi.guru
- **Telegram (VN)**: https://t.me/ritchivietnam
- **Discord**: https://discord.gg/ritchi
- **Documentation**: https://docs.ritchi.guru

---

## 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=YOUR_USERNAME/ritchi-platform&type=Date)](https://star-history.com/#YOUR_USERNAME/ritchi-platform&Date)

---

**Made with ❤️ by the Ritchi Team**

[Website](https://ritchi.guru) • [Documentation](https://docs.ritchi.guru) • [Blog](https://ritchi.guru/blog)
