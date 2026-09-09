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
  const viewBoxHeight = showTagline ? 100 : 68;
  const aspectRatio = 400 / viewBoxHeight;
  const width = height * aspectRatio;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 400 ${viewBoxHeight}`}
      width={width}
      height={height}
      className={className}
      role="img"
      aria-label="INTENSE — Ultra Modern Design"
    >
      {/* Orange rectangle (left half) */}
      <rect x="0" y="0" width="218" height="68" fill="#FF6500" />
      {/* Black rectangle (right half) */}
      <rect x="218" y="0" width="182" height="68" fill="#1A1A1A" />

      {/* INTENSE text — light-weight, wide-tracked, spanning both halves */}
      <text
        x="200"
        y="49"
        textAnchor="middle"
        fontFamily="'Inter', 'Helvetica Neue', Arial, sans-serif"
        fontWeight="300"
        fontSize="42"
        letterSpacing="8"
        fill="white"
      >
        INTENSE
      </text>

      {/* Tagline (only when showTagline is true) */}
      {showTagline && (
        <text
          x="200"
          y="92"
          textAnchor="middle"
          fontFamily="'Inter', 'Helvetica Neue', Arial, sans-serif"
          fontWeight="400"
          fontSize="13"
          letterSpacing="5"
          fill={taglineColor}
        >
          ULTRA · MODERN DESIGN
        </text>
      )}
    </svg>
  );
}
