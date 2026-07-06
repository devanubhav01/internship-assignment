# React Blog UI — Mini Project

A small blog layout that reads posts from `src/data/posts.json` and lets you
search by keyword and filter by category, both live.

## Run it

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

## How it works

- `src/data/posts.json` — 8 sample posts (title, excerpt, category, author, date, read time).
- `src/components/PostCard.jsx` — renders one post preview.
- `src/components/SearchBar.jsx` — controlled input, filters on title + excerpt.
- `src/components/FilterBar.jsx` — category pills, built dynamically from whatever
  categories exist in the JSON (no hardcoded list).
- `src/App.jsx` — holds `searchTerm` and `activeCategory` in state, derives
  `filteredPosts` with `useMemo` so filtering only recalculates when an input changes.

## Extending it

- Point `posts.json` at a real API response shape and swap the static import for a `fetch`.
- Add a `sortBy` control (newest / read time) next to the filter pills.
- Add pagination once the post list grows past a screenful.
