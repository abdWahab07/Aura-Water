/**
 * Large purple curved ribbon that spans the top of the page.
 * The bottom edge is an organic wave — thinner on the left, dipping
 * deeper on the right where the navigation and wave button sit.
 */
export function CurvedTop({
  className = "",
  fill = "#1b4ef5",
}: {
  className?: string;
  fill?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 1440 170"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0,0 L1440,0 L1440,108 C1265,158 1095,150 905,120 C720,91 545,70 355,80 C205,88 95,74 0,62 Z"
        fill={fill}
      />
    </svg>
  );
}
