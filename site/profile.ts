import type { ProjectDecl } from "@/components/site/content/profile-model";

// EZJSDEV — the facts behind the content pages (About, Projects, Contact) that are NOT copy:
// links, contact details and technology names. The copy itself (6 locales) lives
// in site/messages/<locale>.json under `pages.about`, `pages.projects`, `pages.contact`.
// Sources: spec v0.2 §3.1, §3.3, §5.4, §5.6 and the user's decisions (LinkedIn only, no e-mail published).

/** Live preview of Axons (Projects page link, result of the home demo — spec v0.2 §7.3). */
export const AXONS_PREVIEW_URL = "https://axons-preview.netlify.app/fr";

export const PROFILE = {
    name: "Yoann Barbier",
    linkedinUrl: "https://www.linkedin.com/in/yoann-barbier-89ba1810",
    locality: "Nantes",
    country: "FR",
    school: "Polytech'Nantes",
    // Technologies he works with (spec §3.2), for the Person's `knowsAbout`.
    knowsAbout: ["React", "TypeScript", "Node.js", "NestJS", "Vue.js", "Nuxt", "Angular"],
} as const;

// Order = display order (Projects page, home preview): Axons first (the flagship project), then the
// idealco.fr redesign (the only client the user allows to name). No figure, no other client.
// Copy: `pages.projects.items.<id>`.
export const PROJECTS = [
    {
        id: "axons",
        current: true,
        // Technologies of the repository itself (package.json / README / AGENTS.md of Axons).
        stack: [
            "Next.js 16",
            "React 19",
            "TypeScript",
            "Material UI 9",
            "next-intl 4",
            "Vitest",
            "Playwright",
            "Storybook 10",
            "Netlify",
        ],
        links: [
            { key: "source", href: "https://github.com/YoannB/axons" },
            { key: "preview", href: AXONS_PREVIEW_URL },
        ],
    },
    {
        id: "idealco",
        current: false,
        // Only what the user stated: a redesign of idealco.fr in Next.js 14+.
        stack: ["Next.js 14+"],
        links: [{ key: "idealco", href: "https://idealco.fr" }],
    },
] as const satisfies readonly ProjectDecl[];
