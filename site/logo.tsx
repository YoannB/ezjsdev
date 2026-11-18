// EZJSDEV LOGO MARK — the `</>` glyph stroked with the cyan → blue brand gradient (tokens, so it
// follows both themes). components/ui/Logo.tsx wraps it in the <svg> (size, `logo` class,
// role="img", aria-label={SITE_NAME}): only the CONTENT is drawn here, in LOGO_VIEWBOX
// coordinates. The glyph never moves: a light sweep (.logo__sheen, a diagonal highlight band
// masked by the same three strokes) crosses it, animated from site/theme.css in the loader, the
// shell's title bar and the pre-hydration splash (.splash-logo), and parked outside the mark
// elsewhere or under prefers-reduced-motion. Same system as the favicon (site/icon.svg).
// `id` is unique per rendered logo (splash + header + loader coexist): every SVG id below is
// built from it, never a literal one (docs/architecture.md → Deriving a site).
import type { LogoMarkProps } from "@/lib/site-extension";

export const LOGO_VIEWBOX = "0 0 48 48";

const GLYPHS = ["M16 13 L6 24 L16 35", "M28 9 L20 39", "M32 13 L42 24 L32 35"] as const;
const GLYPH_CLASSES = ["logo__bracket--left", "logo__slash", "logo__bracket--right"] as const;

export function LogoMark({ id }: LogoMarkProps) {
    const grad = `${id}-grad`;
    const sheenGrad = `${id}-sheen-grad`;
    const sheenMask = `${id}-sheen-mask`;
    return (
        <>
            <defs>
                <linearGradient id={grad} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="var(--accent-2)" />
                    <stop offset="100%" stopColor="var(--accent-1)" />
                </linearGradient>
                <linearGradient id={sheenGrad} x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" className="logo__sheen-stop" stopOpacity="0" />
                    <stop offset="50%" className="logo__sheen-stop" stopOpacity="0.9" />
                    <stop offset="100%" className="logo__sheen-stop" stopOpacity="0" />
                </linearGradient>
                <mask id={sheenMask} maskUnits="userSpaceOnUse" x="0" y="0" width="48" height="48">
                    <g stroke="#fff">
                        {GLYPHS.map((d) => (
                            <path key={d} className="logo__glyph-mask" d={d} />
                        ))}
                    </g>
                </mask>
            </defs>
            <g stroke={`url(#${grad})`}>
                {GLYPHS.map((d, i) => (
                    <path key={d} className={`logo__glyph ${GLYPH_CLASSES[i]}`} d={d} />
                ))}
            </g>
            <g mask={`url(#${sheenMask})`} aria-hidden="true">
                <g transform="rotate(20 24 24)">
                    <rect className="logo__sheen" x="-30" y="-12" width="14" height="72" fill={`url(#${sheenGrad})`} />
                </g>
            </g>
        </>
    );
}
