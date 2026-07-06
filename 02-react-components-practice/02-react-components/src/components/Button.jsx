/**
 * Button
 * Reusable button with style variants.
 *
 * Props:
 * - children (ReactNode): button label/content
 * - variant ('primary' | 'secondary' | 'ghost'): visual style, default 'primary'
 * - onClick (fn, optional)
 * - disabled (bool, optional)
 * - type ('button' | 'submit' | 'reset'): default 'button'
 */
export default function Button({
  children,
  variant = 'primary',
  onClick,
  disabled = false,
  type = 'button'
}) {
  return (
    <button
      type={type}
      className={`btn btn--${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
