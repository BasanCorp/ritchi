import { lemonSqueezySetup } from '@lemonsqueezy/lemonsqueezy.js'

// Initialize LemonSqueezy
export function configureLemonSqueezy() {
  const apiKey = process.env.LEMONSQUEEZY_API_KEY

  if (!apiKey) {
    throw new Error('LEMONSQUEEZY_API_KEY is required')
  }

  lemonSqueezySetup({ apiKey })
}

// Product Variant IDs (get these from LemonSqueezy dashboard)
export const LEMONSQUEEZY_VARIANTS = {
  // Singapore (SGD)
  SG: {
    lib30: process.env.NEXT_PUBLIC_LS_VARIANT_LIB30_SGD || '',
    pro: process.env.NEXT_PUBLIC_LS_VARIANT_PRO_SGD || '',
    elite: process.env.NEXT_PUBLIC_LS_VARIANT_ELITE_SGD || '',
  },
  // UAE (AED)
  AE: {
    lib30: process.env.NEXT_PUBLIC_LS_VARIANT_LIB30_AED || '',
    pro: process.env.NEXT_PUBLIC_LS_VARIANT_PRO_AED || '',
    elite: process.env.NEXT_PUBLIC_LS_VARIANT_ELITE_AED || '',
  },
  // Vietnam (VND)
  VN: {
    lib30: process.env.NEXT_PUBLIC_LS_VARIANT_LIB30_VND || '',
    pro: process.env.NEXT_PUBLIC_LS_VARIANT_PRO_VND || '',
    elite: process.env.NEXT_PUBLIC_LS_VARIANT_ELITE_VND || '',
  },
  // Default (USD)
  DEFAULT: {
    lib30: process.env.NEXT_PUBLIC_LS_VARIANT_LIB30_USD || '',
    pro: process.env.NEXT_PUBLIC_LS_VARIANT_PRO_USD || '',
    elite: process.env.NEXT_PUBLIC_LS_VARIANT_ELITE_USD || '',
  },
} as const

// Regional pricing display
export const regionalPricing = {
  SG: {
    currency: 'SGD',
    symbol: 'S$',
    lib30: 13.9,
    pro: 65,
    elite: 135,
  },
  AE: {
    currency: 'AED',
    symbol: 'د.إ',
    lib30: 36,
    pro: 180,
    elite: 365,
  },
  VN: {
    currency: 'VND',
    symbol: '₫',
    lib30: 240_000,
    pro: 990_000,
    elite: 1_990_000,
  },
  DEFAULT: {
    currency: 'USD',
    symbol: '$',
    lib30: 9.9,
    pro: 49,
    elite: 99,
  },
} as const

export type Tier = 'lib30' | 'pro' | 'elite'
export type Region = keyof typeof LEMONSQUEEZY_VARIANTS

export function getRegionalPrice(tier: Tier, region: Region = 'DEFAULT') {
  const pricing = regionalPricing[region] || regionalPricing.DEFAULT
  return {
    amount: pricing[tier],
    currency: pricing.currency,
    symbol: pricing.symbol,
    formatted: `${pricing.symbol}${pricing[tier].toLocaleString()}`,
  }
}

export function getVariantId(tier: Tier, region: Region = 'DEFAULT'): string {
  return LEMONSQUEEZY_VARIANTS[region]?.[tier] || LEMONSQUEEZY_VARIANTS.DEFAULT[tier]
}

// Detect user's region from IP
export function detectRegion(country?: string): Region {
  if (!country) return 'DEFAULT'
  
  if (country === 'SG') return 'SG'
  if (country === 'AE' || ['SA', 'KW', 'QA', 'BH', 'OM'].includes(country)) return 'AE'
  if (country === 'VN') return 'VN'
  
  return 'DEFAULT'
}
