import { useEffect, useRef, useState } from 'react'

const DURATION = 5000 // 5s por página

export default function StoryViewer({ open, pages = [], onClose, onOpenNews }) {
  const [index, setIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const closeBtnRef = useRef(null)
  const rafRef = useRef(0)
  const startRef = useRef(0)

  // Reset quando abrir
  useEffect(() => {
    if (open) setIndex(0)
  }, [open])

  // Lock scroll + foco + ESC
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeBtnRef.current?.focus()

    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = prev }
  }, [open])

  // Timer por RAF
  useEffect(() => {
    if (!open) return
    cancelAnimationFrame(rafRef.current)
    startRef.current = performance.now()

    const tick = (t) => {
      const elapsed = t - startRef.current
      const p = Math.min(1, elapsed / DURATION)
      setProgress(p)
      if (p >= 1) {
        next()
      } else {
        rafRef.current = requestAnimationFrame(tick)
      }
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, open])

  const next = () => {
    setProgress(0)
    setIndex((i) => (i < pages.length - 1 ? i + 1 : (onClose(), i)))
  }
  const prev = () => {
    setProgress(0)
    setIndex((i) => (i > 0 ? i - 1 : 0))
  }

  if (!open || pages.length === 0) return null
  const page = pages[index]

  return (
    <div className="fixed inset-0 z-30 text-white" role="dialog" aria-modal="true" aria-label="Stories">
      <div className="absolute inset-0 bg-black/95" onClick={onClose} />
      <div className="relative h-full w-full max-w-md mx-auto flex flex-col justify-center">
        {/* Progress bars */}
        <div className="absolute top-2 left-2 right-2 flex gap-1 z-20">
          {pages.map((_, i) => (
            <div key={i} className="h-1 bg-white/40 rounded-full flex-1 overflow-hidden">
              <div className="h-1 bg-white" style={{ width: i < index ? '100%' : i === index ? `${progress * 100}%` : '0%' }} />
            </div>
          ))}
        </div>

        {/* Close */}
        <button ref={closeBtnRef} onClick={onClose} className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/20 backdrop-blur hover:bg-white/30" aria-label="Fechar stories">✕</button>

        {/* Background image */}
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${page.image}')` }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

        {/* Content */}
        <div className="relative z-10 h-full w-full flex flex-col justify-end">
          <div className="w-full p-4 flex items-end gap-4">
            <div className="flex-grow pr-2">
              <button onClick={() => onOpenNews(page.id)} className="mb-4 bg-white/30 backdrop-blur px-4 py-2 rounded-lg font-semibold hover:bg-white/50">Matéria Completa</button>
              <h3 className="text-2xl font-bold truncate">{page.title}</h3>
              <p className="mt-2 text-lg line-clamp-3">{page.summary}</p>
            </div>
            {/* Like visual */}
            <div className="flex flex-col items-center gap-5 text-white">
              <span aria-hidden>❤</span>
            </div>
          </div>
        </div>

        {/* Navegação por zonas */}
        <div className="absolute inset-0 flex">
          <button aria-label="Anterior" className="w-1/3 h-full" onClick={prev} />
          <button aria-label="Próximo" className="w-2/3 h-full" onClick={next} />
        </div>
      </div>
    </div>
  )
}
