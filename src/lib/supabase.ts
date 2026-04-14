// Cloudflare R2 Storage Configuration
// PDFs are hosted on Cloudflare R2 and served over CDN

const CLOUDFLARE_R2_URL = 'https://pub-06da56e628dd4d788982885a8f0c9ce3.r2.dev'

// Helper function to get PDF URL from Cloudflare R2 Storage
export const getPdfUrl = (fileName: string) => {
  return `${CLOUDFLARE_R2_URL}/${fileName}`
}
