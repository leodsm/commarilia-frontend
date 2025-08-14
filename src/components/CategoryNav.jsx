import { storyData } from '../data/stories'

const categories = [
  {
    id: 'marilia',
    label: 'Marília',
    img: 'https://marilianoticia.com.br/wp-content/uploads/2025/08/mercado-livre-ok-768x576.jpg',
    gradient: 'from-blue-500 to-blue-300',
  },
  { id: 'regiao', label: 'Região', img: 'https://images.unsplash.com/photo-1573168343383-f27a43d1d88a?q=80&w=800&auto=format&fit=crop', gradient: 'from-orange-500 to-yellow-300' },
  { id: 'brasil', label: 'Brasil', img: 'https://images.unsplash.com/photo-1523978591428-BC504392aaa6?q=80&w=800&auto=format&fit=crop', gradient: 'from-green-500 to-green-300' },
  { id: 'mundo', label: 'Mundo', img: 'https://images.unsplash.com/photo-1559424563-216434c4ead4?q=80&w=800&auto=format&fit=crop', gradient: 'from-gray-300 to-gray-400' },
  { id: 'entretenimento', label: 'Entretenimento', img: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop', gradient: 'from-purple-500 to-pink-500' },
]

export default function CategoryNav({ onOpenStory }) {
  return (
    <nav className="p-4 border-b bg-white">
      <div className="flex gap-4 overflow-x-auto no-scrollbar">
        {categories.map((c) => (
          <button
            key={c.id}
            type="button"
            aria-label={`Abrir stories de ${c.label}`}
            onClick={() => onOpenStory('marilia')} // demo
            className="text-center flex-shrink-0 w-20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brandBlue rounded-lg"
          >
            <div className={`w-16 h-16 mx-auto p-1 rounded-full bg-gradient-to-tr ${c.gradient}`}>
              <div className="bg-white h-full w-full rounded-full flex items-center justify-center p-1">
                <img loading="lazy" src={c.img} alt={`Miniatura ${c.label}`} className="w-full h-full object-cover rounded-full"/>
              </div>
            </div>
            <span className="text-xs font-semibold text-gray-700 mt-2 block">{c.label}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}
