export default function NewsCard({ item, onOpen }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="w-full text-left"
      aria-label={`Abrir notícia: ${item.title}`}
    >
      <div className="flex items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-200 transition-shadow">
        <img loading="lazy" src={item.image} alt="Imagem da notícia" className="h-24 w-24 object-cover rounded-lg"/>
        <div className="ml-4">
          <div className="uppercase tracking-wide text-xs text-blue-500 font-semibold">{item.category}</div>
          <h3 className="mt-1 text-lg font-bold text-black line-clamp-2">{item.title}</h3>
          <p className="mt-2 text-gray-500 text-sm line-clamp-2">{item.excerpt}</p>
        </div>
      </div>
    </button>
  )
}
