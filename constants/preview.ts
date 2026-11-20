import type { PreviewDecl } from "@/components/site/ide/preview-model";
import { AXONS_PREVIEW_URL } from "@/constants/profile";

// EZJSDEV — what the preview panel of the IDE shell shows for each open file (ids of
// constants/explorer.ts). Model and rules: components/site/ide/preview-model.ts.
// - outline: the page's real h2/h3 headings (long pages; every collection entry is one too);
// - browser: browser frames around STATIC captures of real sites (public/demo, public/projects),
//   honest about being captures; projects in the order of the Projects page (constants/profile.ts);
// - anything else: the share card (title, description, domain, OpenGraph image when one exists).
export const PREVIEW = {
    outline: ["about/page", "services/page", "legal/page", "privacy/page", "cookies/page"],
    browser: {
        "home/page": ["axons"],
        "projects/page": ["axons", "idealco"],
    },
    captures: {
        // The home page of the Axons preview, in both themes (also the demo's result thumbnail).
        axons: {
            name: "Axons",
            url: AXONS_PREVIEW_URL,
            image: "/demo/axons-preview-fr-light.webp",
            imageDark: "/demo/axons-preview-fr-dark.webp",
        },
        // Public home page of idealco.fr, captured on 2026-11-17 (Playwright, fresh context: no
        // account, no cookie accepted), 1280×800 rendered at 640×400.
        idealco: { name: "idealco.fr", url: "https://idealco.fr", image: "/projects/idealco-home.webp" },
    },
} as const satisfies PreviewDecl;
