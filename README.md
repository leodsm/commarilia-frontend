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

Crie um arquivo `.env` baseado em `.env.example` e preencha as chaves do **Supabase**:

```
VITE_SUPABASE_URL=... // URL do projeto
VITE_SUPABASE_ANON_KEY=... // chave pública
```

As notícias são buscadas da tabela `news` do Supabase.

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
    supabase.js
  App.jsx
  main.jsx
  index.css
```

## Próximos passos (backend)
- **Supabase** (recomendado): Postgres + Auth Google.
  - Tabelas: `articles`, `likes`, `reads`, `saves`.
  - Paginação com `limit`/`offset` → trocar o provider do `useInfiniteFeed` por fetch ao DB.
  - Persistir curtidas/leitura por `user_id`.
- Alternativa: **Firebase** (Auth + Firestore).

> Os arquivos de dados **mockados** estão em `src/data/`. Substitua depois por chamadas reais.
