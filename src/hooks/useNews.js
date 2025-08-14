import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export function useNews() {
  const [news, setNews] = useState([])

  useEffect(() => {
    const load = async () => {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('id')
      if (error) {
        console.error('Error loading news', error)
        return
      }
      setNews(data || [])
    }
    load()
  }, [])

  return news
}
