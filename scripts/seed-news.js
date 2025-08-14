import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'
import { newsData } from './newsData.js'

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables.')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function main() {
  const rows = newsData.map(({ slug, ...rest }) => rest)
  const { error } = await supabase.from('news').insert(rows)
  if (error) {
    console.error('Error seeding news:', error)
    process.exit(1)
  }
  console.log(`Inserted ${rows.length} news items`)
}

main()
