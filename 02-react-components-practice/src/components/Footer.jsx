/**
 * Footer
 * Reusable footer with a copyright line and a row of links.
 *
 * Props:
 * - brand (string): name shown in the copyright line
 * - links (array<{label, href}>): footer links
 * - year (number, optional): defaults to the current year
 */
export default function Footer({ brand = 'Brand', links = [], year }) {
  const displayYear = year ?? new Date().getFullYear();

  return (
    <footer className="footer">
      <p className="footer__copy">
        © {displayYear} {brand}. All rights reserved.
      </p>
      <ul className="footer__links">
        {links.map((link) => (
          <li key={link.label}>
            <a href={link.href}>{link.label}</a>
          </li>
        ))}
      </ul>
    </footer>
  );
}
