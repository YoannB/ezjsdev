// EZJSDEV LOGO MARK — the `</>` glyph stroked with the cyan → blue brand gradient (tokens, so it
// follows both themes). components/ui/Logo.tsx wraps it in the <svg> (size, `logo` class,
// role="img", aria-label={SITE_NAME}): only the CONTENT is drawn here, in LOGO_VIEWBOX
// coordinates. Static by default; the Loader / splash animate it from site/theme.css, with a
// static fallback under prefers-reduced-motion. Same system as the favicon (site/icon.svg).
export const LOGO_VIEWBOX = "0 0 48 48";

export function LogoMark() {
    return (
        <>
            <defs>
                <linearGradient id="logoGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="var(--accent-2)" />
                    <stop offset="100%" stopColor="var(--accent-1)" />
                </linearGradient>
            </defs>
            <g stroke="url(#logoGrad)">
                <path className="logo__glyph logo__bracket--left" d="M16 13 L6 24 L16 35" />
                <path className="logo__glyph logo__slash" d="M28 9 L20 39" pathLength={1} />
                <path className="logo__glyph logo__bracket--right" d="M32 13 L42 24 L32 35" />
            </g>
        </>
    );
}
