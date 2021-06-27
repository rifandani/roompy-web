export const API_URL_DEV = 'http://localhost:3000/api'
export const API_URL_PROD = 'https://trishop.vercel.app/api'
export const IS_CLIENT = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
)
