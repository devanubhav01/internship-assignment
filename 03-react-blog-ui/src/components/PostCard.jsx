/**
 * PostCard
 * Renders a single blog post preview.
 * Props: post ({ title, excerpt, category, author, date, readTime })
 */
export default function PostCard({ post }) {
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <article className="post-card">
      <span className="post-card__category">{post.category}</span>
      <h2 className="post-card__title">{post.title}</h2>
      <p className="post-card__excerpt">{post.excerpt}</p>
      <div className="post-card__meta">
        <span>{post.author}</span>
        <span aria-hidden="true">·</span>
        <span>{formattedDate}</span>
        <span aria-hidden="true">·</span>
        <span>{post.readTime} min read</span>
      </div>
    </article>
  );
}
