import { useEffect, useRef, useState } from 'react'

/**
 * Hook simples para scroll infinito.
 * itemsProvider: (offset, limit) => array de itens
 */
export function useInfiniteFeed(itemsProvider, batch = 8) {
  const [items, setItems] = useState([])
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const sentinelRef = useRef(null)

  // primeira leva
  useEffect(() => {
    const newItems = itemsProvider(0, batch)
    setItems(newItems)
    setPage(1)
    setHasMore(newItems.length === batch)
  }, [itemsProvider, batch])

  useEffect(() => {
    if (!hasMore) return
    const el = sentinelRef.current
    if (!el) return

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const offset = page * batch
          const more = itemsProvider(offset, batch)
          setItems((prev) => [...prev, ...more])
          setPage((p) => p + 1)
          if (more.length < batch) setHasMore(false)
        }
      })
    }, { rootMargin: '200px' })

    io.observe(el)
    return () => io.disconnect()
  }, [page, hasMore, itemsProvider, batch])

  return { items, hasMore, sentinelRef }
}
