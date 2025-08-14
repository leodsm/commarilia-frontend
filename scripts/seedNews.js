import fs from 'fs'
import { initializeApp, cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

const serviceAccountPath = process.env.GOOGLE_APPLICATION_CREDENTIALS
if (!serviceAccountPath) {
  console.error('GOOGLE_APPLICATION_CREDENTIALS environment variable is not set')
  process.exit(1)
}

const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'))

initializeApp({
  credential: cert(serviceAccount),
})

const db = getFirestore()

const newsFile = new URL('./news.json', import.meta.url)
const news = JSON.parse(fs.readFileSync(newsFile, 'utf8'))

async function seed() {
  for (const item of news) {
    const { id, category, publishedAt, title, image, summary, fullText } = item
    await db.collection('news').doc(id).set({
      id,
      category,
      publishedAt,
      title,
      image,
      summary,
      fullText,
    })
    console.log(`Seeded ${id}`)
  }
}

seed()
  .then(() => {
    console.log('Seeding complete')
    process.exit(0)
  })
  .catch((err) => {
    console.error('Seeding failed', err)
    process.exit(1)
  })
