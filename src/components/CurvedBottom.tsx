/**
 * Large organic white wave that forms the foreground surface the
 * bottles stand on. Crest is higher on the right, dipping to the left.
 */
export function CurvedBottom({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1440 240"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0,150 C260,96 520,150 760,152 C1010,154 1200,74 1440,104 L1440,240 L0,240 Z"
        fill="#ffffff"
      />
    </svg>
  );
}
