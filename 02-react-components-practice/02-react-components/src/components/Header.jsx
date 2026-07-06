import { useState } from 'react';

/**
 * Header
 * Reusable site header with a brand and a nav list.
 *
 * Props:
 * - brand (string): text shown as the site mark
 * - navItems (array<{label, href}>): links to render
 * - onNavigate (fn, optional): called with the clicked item's label
 */
export default function Header({ brand = 'Brand', navItems = [], onNavigate }) {
  const [activeLabel, setActiveLabel] = useState(navItems[0]?.label ?? null);

  function handleClick(item) {
    setActiveLabel(item.label);
    onNavigate?.(item.label);
  }

  return (
    <header className="header">
      <span className="header__brand">{brand}</span>
      <nav className="header__nav" aria-label="Primary">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className={
              'header__link' + (item.label === activeLabel ? ' header__link--active' : '')
            }
            onClick={() => handleClick(item)}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
