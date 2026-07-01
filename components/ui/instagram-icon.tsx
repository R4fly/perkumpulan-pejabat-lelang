import * as React from "react";

interface InstagramIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

/**
 * Inline Instagram glyph. We use an inline SVG instead of pulling from
 * `lucide-react` because that package's current release (1.x) ships
 * without the brand icons. Keeping it as a small local component avoids
 * adding a second icon library.
 */
export function Instagram({
  size = 16,
  ...props
}: InstagramIconProps): React.JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}
