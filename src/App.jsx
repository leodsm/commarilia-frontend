import { useCallback, useMemo, useState } from 'react'
import Header from './components/Header'
import CategoryNav from './components/CategoryNav'
import NewsCard from './components/NewsCard'
import NewsModal from './components/NewsModal'
import StoryViewer from './components/StoryViewer'
import { storyData } from './data/stories'
import { useInfiniteFeed } from './hooks/useInfiniteFeed'
import { useNews } from './hooks/useNews'

export default function App() {
  const news = useNews()
  const newsMap = useMemo(
    () => Object.fromEntries(news.map((n) => [n.slug || n.id, n])),
    [news]
  )

  const provider = useMemo(() => {
    if (news.length === 0) return () => []
    const flat = Array.from({ length: 30 }, (_, r) =>
      news.map((n) => ({ ...n, key: `${n.id}-${r}`, baseId: n.id }))
    ).flat()
    return (offset, limit) => flat.slice(offset, offset + limit)
  }, [news])

  const { items, hasMore, sentinelRef } = useInfiniteFeed(provider, 8)

  const [newsOpen, setNewsOpen] = useState(false)
  const [selectedNews, setSelectedNews] = useState(null)

  const [storiesOpen, setStoriesOpen] = useState(false)

  const [likes, setLikes] = useState(() => new Set()) // ids base

  const openNews = useCallback((item) => {
    setSelectedNews(item)
    setNewsOpen(true)
  }, [])

  const toggleLike = useCallback((id) => {
    setLikes((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  return (
    <div className="max-w-md mx-auto min-h-screen bg-gray-50">
      <Header />
      <CategoryNav onOpenStory={() => setStoriesOpen(true)} />

      <main className="p-4 space-y-4">
        {items.map((item) => (
          <NewsCard key={item.key} item={item} onOpen={() => openNews(item)} />
        ))}

        {/* Sentinel do infinito */}
        <div ref={sentinelRef} className="py-6 text-center text-sm text-gray-500">
          {hasMore ? 'Carregando…' : 'Fim do feed por enquanto 🙂'}
        </div>
      </main>

      {/* Modal notícia */}
      <NewsModal
        open={newsOpen}
        item={selectedNews}
        onClose={() => setNewsOpen(false)}
        liked={selectedNews ? likes.has(selectedNews.baseId || selectedNews.id) : false}
        onToggleLike={() => {
          if (!selectedNews) return
          toggleLike(selectedNews.baseId || selectedNews.id)
        }}
      />

      {/* Stories */}
      <StoryViewer
        open={storiesOpen}
        pages={storyData.marilia.pages}
        onClose={() => setStoriesOpen(false)}
        onOpenNews={(id) => {
          setStoriesOpen(false)
          const item = newsMap[id]
          if (item) {
            setSelectedNews(item)
            setNewsOpen(true)
          }
        }}
      />
    </div>
  )
}
