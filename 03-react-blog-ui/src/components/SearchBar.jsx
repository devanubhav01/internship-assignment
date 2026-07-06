/**
 * SearchBar
 * Controlled text input for filtering posts by title/excerpt.
 * Props:
 * - value (string): current search term
 * - onChange (fn): called with the new value on every keystroke
 */
export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <input
        type="search"
        placeholder="Search posts by title or topic…"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label="Search posts"
      />
    </div>
  );
}
