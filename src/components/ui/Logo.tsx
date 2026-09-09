interface LogoProps {
  /** Height in pixels. Width scales proportionally. */
  height?: number;
  /** Show the "ULTRA · MODERN DESIGN" tagline below. */
  showTagline?: boolean;
  /** Tagline color override (defaults to #1A1A1A). */
  taglineColor?: string;
  className?: string;
}

/**
 * INTENSE Clothing brand logo — SVG recreation.
 * Orange + Black split bar with white text, transparent background.
 */
export default function Logo({
  height = 40,
  showTagline = false,
  taglineColor = '#1A1A1A',
  className = '',
}: LogoProps) {
  /* Compact proportions — ~3:1 ratio instead of 6:1 */
  const viewBoxHeight = showTagline ? 120 : 80;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 260 ${viewBoxHeight}`}
      height={height}
      className={className}
      style={{ width: 'auto' }}
      role="img"
      aria-label="INTENSE — Ultra Modern Design"
    >
      {/* Orange rectangle (left half) */}
      <rect x="0" y="0" width="142" height="80" fill="#FF6500" />
      {/* Black rectangle (right half) */}
      <rect x="142" y="0" width="118" height="80" fill="#1A1A1A" />

      {/* INTENSE text — spanning both halves */}
      <text
        x="130"
        y="56"
        textAnchor="middle"
        fontFamily="'Inter', 'Helvetica Neue', Arial, sans-serif"
        fontWeight="300"
        fontSize="40"
        letterSpacing="6"
        fill="white"
      >
        INTENSE
      </text>

      {/* Tagline (only when showTagline is true) */}
      {showTagline && (
        <text
          x="130"
          y="106"
          textAnchor="middle"
          fontFamily="'Inter', 'Helvetica Neue', Arial, sans-serif"
          fontWeight="400"
          fontSize="11"
          letterSpacing="4"
          fill={taglineColor}
        >
          ULTRA · MODERN DESIGN
        </text>
      )}
    </svg>
  );
}
