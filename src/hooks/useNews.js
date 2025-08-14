import { useEffect, useState } from 'react'
import { db } from '../lib/firebase'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'

export function useNews() {
  const [news, setNews] = useState([])

  useEffect(() => {
    const load = async () => {
      try {
        const q = query(collection(db, 'news'), orderBy('id'))
        const snapshot = await getDocs(q)
        const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        setNews(items)
      } catch (error) {
        console.error('Error loading news', error)
      }
    }
    load()
  }, [])

  return news
}
