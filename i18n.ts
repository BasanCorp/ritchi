import { getRequestConfig } from 'next-intl/server'
import { headers } from 'next/headers'

export const locales = ['en', 'ar', 'vi', 'zh'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'en'

export const localeNames: Record<Locale, string> = {
  en: 'English',
  ar: 'العربية',
  vi: 'Tiếng Việt',
  zh: '简体中文',
}

// Detect locale from IP geolocation
export function detectLocaleFromIP(country?: string): Locale {
  if (!country) return defaultLocale

  // Singapore, India, Malaysia → English
  if (['SG', 'IN', 'MY', 'PH'].includes(country)) return 'en'

  // UAE, Saudi, Kuwait, Qatar → Arabic
  if (['AE', 'SA', 'KW', 'QA', 'BH', 'OM'].includes(country)) return 'ar'

  // Vietnam → Vietnamese
  if (country === 'VN') return 'vi'

  // China, Taiwan, Hong Kong → Chinese
  if (['CN', 'TW', 'HK'].includes(country)) return 'zh'

  return defaultLocale
}

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`./messages/${locale}.json`)).default,
}))
