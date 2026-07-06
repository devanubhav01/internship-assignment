/**
 * Card
 * Generic content card. Reusable for products, posts, team members, etc.
 *
 * Props:
 * - title (string)
 * - description (string)
 * - tag (string, optional): small label shown above the title
 * - footer (ReactNode, optional): e.g. a Button
 * - children (ReactNode, optional): extra content rendered under the description
 */
export default function Card({ title, description, tag, footer, children }) {
  return (
    <article className="card">
      {tag && <span className="card__tag">{tag}</span>}
      <h3 className="card__title">{title}</h3>
      {description && <p className="card__desc">{description}</p>}
      {children && <div className="card__body">{children}</div>}
      {footer && <div className="card__footer">{footer}</div>}
    </article>
  );
}
