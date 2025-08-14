import { useEffect, useRef } from 'react'

export default function NewsModal({ open, item, onClose, liked, onToggleLike }) {
  const closeBtnRef = useRef(null)

  // Lock de scroll + foco inicial + ESC
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      closeBtnRef.current?.focus()
      const onKey = (e) => {
        if (e.key === 'Escape') onClose()
      }
      window.addEventListener('keydown', onKey)
      return () => {
        window.removeEventListener('keydown', onKey)
        document.body.style.overflow = prev
      }
    }
  }, [open, onClose])

  if (!open || !item) return null

  return (
    <div className="fixed inset-0 z-20" role="dialog" aria-modal="true" aria-labelledby="news-title">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl max-w-md mx-auto h-[95vh] animate-[slideUp_.4s_ease]">
        <style>{`@keyframes slideUp{from{transform:translateY(100%)}to{transform:translateY(0)}}`}</style>
        <div className="relative h-full overflow-y-auto no-scrollbar pt-8 p-4 pb-24">
          <button ref={closeBtnRef} onClick={onClose} className="absolute top-4 right-4 text-gray-600 bg-gray-200 rounded-full p-1 hover:bg-gray-300" aria-label="Fechar notícia">✕</button>
          <img src={item.image} alt="Imagem da notícia" className="w-full h-64 object-cover rounded-lg mb-4"/>
          <h2 id="news-title" className="text-2xl font-bold text-gray-900 mb-2">{item.title}</h2>
          <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: item.fullText }} />
        </div>

        {/* Actions: só CURTIR visual */}
        <div className="absolute bottom-4 right-4 flex flex-col gap-3">
          <button onClick={onToggleLike} aria-pressed={liked} aria-label={liked ? 'Remover curtida' : 'Curtir'} className="w-10 h-10 flex items-center justify-center bg-white/90 backdrop-blur rounded-full shadow">
            <svg className={`w-5 h-5 ${liked ? 'text-red-500 fill-red-500' : 'text-gray-600'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
