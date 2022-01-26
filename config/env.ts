const isProd = process.env.NODE_ENV === 'production'

export const PUBLIC_URL = isProd ? process.env.PUBLIC_URL || '' : ''
export const API_URL = process.env.NEXT_API_URL
export const GOOGLE_ANALYTICS_ID = process.env.GOOGLE_ANALYTICS_ID || ''
export const GOOGLE_TAG_MANAGER_ID = process.env.GOOGLE_TAG_MANAGER_ID || ''
export const GOOGLE_RECAPTCHA_SITE_KEY =
  process.env.GOOGLE_RECAPTCHA_SITE_KEY || ''
export const GOOGLE_SITE_VERIFICATION =
  process.env.GOOGLE_SITE_VERIFICATION || ''
export const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL || ''
export const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL || ''
export const NEXT_PUBLIC_GOOGLE_ANALYTICS_ID =
  process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || ''
export const NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID =
  process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID || ''
export const NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY =
  process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY || ''
export const NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || ''
