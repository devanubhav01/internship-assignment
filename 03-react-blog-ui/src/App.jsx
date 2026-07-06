import { useMemo, useState } from 'react';
import postsData from './data/posts.json';
import PostCard from './components/PostCard.jsx';
import SearchBar from './components/SearchBar.jsx';
import FilterBar from './components/FilterBar.jsx';

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = useMemo(
    () => [...new Set(postsData.map((post) => post.category))].sort(),
    []
  );

  const filteredPosts = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return postsData.filter((post) => {
      const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
      const matchesSearch =
        term === '' ||
        post.title.toLowerCase().includes(term) ||
        post.excerpt.toLowerCase().includes(term);
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, activeCategory]);

  return (
    <div className="blog">
      <header className="blog__header">
        <h1>The Weekly Build</h1>
        <p>Short, practical posts on frontend engineering.</p>
      </header>

      <div className="blog__controls">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
        <FilterBar
          categories={categories}
          active={activeCategory}
          onSelect={setActiveCategory}
        />
      </div>

      <p className="blog__count">
        {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'} found
      </p>

      <div className="blog__grid">
        {filteredPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
        {filteredPosts.length === 0 && (
          <p className="blog__empty">No posts match your search. Try a different term or category.</p>
        )}
      </div>
    </div>
  );
}
