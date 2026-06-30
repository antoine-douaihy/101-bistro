/**
 * Inline social brand glyphs. Lucide removed brand marks (trademark), so these
 * are minimal, currentColor-based SVGs kept alongside the brand assets.
 */
type IconProps = React.SVGProps<SVGSVGElement>;

export function InstagramIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <rect x="2" y="2" width="20" height="20" rx="5.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.6" cy="6.4" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M14 9V7.2c0-.9.2-1.4 1.5-1.4H17V3.1c-.3 0-1.3-.1-2.4-.1-2.5 0-4.1 1.5-4.1 4.2V9H8v3h2.5v9h3v-9h2.6l.4-3H14z" />
    </svg>
  );
}

export function TikTokIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M16.5 3c.3 2.1 1.5 3.6 3.5 3.9v2.6c-1.2 0-2.4-.4-3.5-1.1v5.9c0 3.3-2.5 5.7-5.6 5.7-3.1 0-5.4-2.4-5.4-5.4 0-3.1 2.6-5.4 5.7-5.1v2.7c-.4-.1-.8-.2-1.2-.2-1.4 0-2.5 1.1-2.5 2.6 0 1.5 1.1 2.6 2.5 2.6 1.5 0 2.6-1.1 2.6-3V3h3.4z" />
    </svg>
  );
}
