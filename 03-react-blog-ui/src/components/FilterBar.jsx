/**
 * FilterBar
 * Renders a row of category pills. "All" is always included.
 * Props:
 * - categories (array<string>): unique category names
 * - active (string): currently selected category, or 'All'
 * - onSelect (fn): called with the clicked category name
 */
export default function FilterBar({ categories, active, onSelect }) {
  const options = ['All', ...categories];

  return (
    <div className="filter-bar" role="group" aria-label="Filter posts by category">
      {options.map((category) => (
        <button
          key={category}
          className={'filter-pill' + (category === active ? ' filter-pill--active' : '')}
          onClick={() => onSelect(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
