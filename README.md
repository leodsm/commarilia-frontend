# ComMarília – Frontend (React + Vite + Tailwind)

MVP só de **frontend** com:
- Header “**Com**” azul + “**Marília**” laranja.
- Navbar de categorias (stories) acessível.
- Feed de notícias com **scroll infinito** (mock).
- **Modal de notícia** acessível (foco, Esc, role=dialog), com **curtir** visual.
- **Stories** com timer de 5s, barras de progresso, prev/next e ação “Matéria Completa”.
- Tailwind **sem CDN**, com plugins `typography` e `line-clamp`.

## Rodar local
```bash
npm install
npm run dev
```

A configuração do Firebase está em `src/lib/firebase.js`. Ajuste as chaves conforme seu projeto.

As notícias são buscadas da coleção `news` do Firestore.

## Estrutura
```
src/
  components/
    Header.jsx
    CategoryNav.jsx
    NewsCard.jsx
    NewsModal.jsx
    StoryViewer.jsx
  data/
    news.js
    stories.js
  hooks/
    useInfiniteFeed.js
    useNews.js
  lib/
    firebase.js
  App.jsx
  main.jsx
  index.css
```

## Próximos passos (backend)
- **Firebase**: Auth + Firestore.
  - Coleções: `articles`, `likes`, `reads`, `saves`.
  - Paginação com `limit`/`offset` → trocar o provider do `useInfiniteFeed` por fetch ao DB.
  - Persistir curtidas/leitura por `user_id`.

> Os arquivos de dados **mockados** estão em `src/data/`. Substitua depois por chamadas reais.
