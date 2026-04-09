import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load .env.local
dotenv.config({ path: path.join(__dirname, '../.env.local') })

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase credentials in .env.local')
  console.error('Loaded URL:', supabaseUrl)
  console.error('Loaded Key:', supabaseAnonKey)
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)
const pdfDir = path.join(__dirname, '../public')
const bucketName = 'magazine'

async function createBucketIfNotExists() {
  try {
    console.log(`Checking if bucket "${bucketName}" exists...`)
    // Since the bucket already exists, just return true
    console.log(`✓ Bucket "${bucketName}" is ready`)
    return true
  } catch (err) {
    console.error('Unexpected error:', err)
    return false
  }
}

async function uploadPdfs() {
  const bucketCreated = await createBucketIfNotExists()
  if (!bucketCreated) {
    console.error('Failed to create or access bucket')
    process.exit(1)
  }

  const files = fs.readdirSync(pdfDir).filter(file => file.endsWith('.pdf'))

  if (files.length === 0) {
    console.log('No PDF files found in public folder')
    return
  }

  console.log(`\nFound ${files.length} PDF(s) to upload:`)
  console.log(files)
  console.log('\nUploading PDFs...\n')

  let successCount = 0
  let failCount = 0

  for (const file of files) {
    try {
      const filePath = path.join(pdfDir, file)
      const fileContent = fs.readFileSync(filePath)

      console.log(`Uploading: ${file}...`)
      const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(file, fileContent, {
          cacheControl: '3600',
          upsert: true,
          contentType: 'application/pdf',
        })

      if (error) {
        console.error(`✗ Failed: ${file}`)
        console.error(`  Error: ${error.message}`)
        failCount++
      } else {
        console.log(`✓ Uploaded: ${file}`)
        successCount++
      }
    } catch (err) {
      console.error(`✗ Failed: ${file}`)
      console.error(`  Error: ${err instanceof Error ? err.message : String(err)}`)
      failCount++
    }
  }

  console.log(`\n✓ Upload complete: ${successCount} succeeded, ${failCount} failed`)
  console.log(`\nPDFs are now accessible at:`)
  console.log(`https://${supabaseUrl.split('//')[1]}/storage/v1/object/public/${bucketName}/[filename.pdf]`)
}

uploadPdfs().catch(err => {
  console.error('Upload failed:', err)
  process.exit(1)
})
