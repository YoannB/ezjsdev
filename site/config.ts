import type { SiteConfig } from "@/lib/site-extension";

// EZJSDEV — the site's own configuration (with site/messages/*.json). Everything else (env, flags,
// locales, layout constants) stays in Axons' constants/site.ts, which re-exports these values.
// Contract and merge rules: lib/site-extension.ts; guide: docs/architecture.md → Deriving a site.

// The site's own localized routes (none yet: the IDE shell pages come later).
const pathnames = {} as const;

export const SITE = {
    name: "ezjsdev",
    defaultTitle: "ezjsdev — Sites web & applications React, TypeScript, Node.js",
    defaultDescription:
        "Yoann Barbier, développeur full-stack indépendant à Nantes : conception, architecture et évolution d'applications web React, TypeScript et Node.js.",
    githubUrl: "https://github.com/YoannB/ezjsdev",
    // The mockup shows the word plainly (the `</>` mark carries the accent color): no accented part.
    brandAccentFrom: "ezjsdev".length,
    headerNavEnabled: true,
    githubLinkEnabled: true,
    articlesEnabled: true,
    // TEMPORARY: Axons' curated (real, public) Next.js resources, kept until the IDE shell replaces
    // the Axons home. Emptying them renders an empty black player (and 404 poster requests to
    // i.ytimg.com) because SeoResources has no "nothing to show" state.
    seoResources: [
        {
            id: "yt",
            kind: "video",
            url: "https://www.youtube.com/watch?v=jzdTBDmCAKE",
            videoId: "jzdTBDmCAKE",
            short: false,
            mark: "YT",
            titleKey: "seo.a1.title",
            summaryKey: "seo.a1.summary",
            sourceKey: "seo.a1.source",
            durationKey: "seo.a1.duration",
        },
        {
            id: "oc",
            kind: "article",
            url: "https://openclassrooms.com/fr/courses/8710351-creez-une-application-react-avec-next-js/8856186-demarrez-un-projet-next-js",
            mark: "OC",
            titleKey: "seo.a2.title",
            summaryKey: "seo.a2.summary",
            sourceKey: "seo.a2.source",
            durationKey: "seo.a2.duration",
        },
        {
            id: "ti",
            kind: "article",
            url: "https://tech-insider.org/fr/nextjs-16-tutoriel-app-full-stack-13-etapes-2026/",
            mark: "TI",
            titleKey: "seo.a3.title",
            summaryKey: "seo.a3.summary",
            sourceKey: "seo.a3.source",
            durationKey: "seo.a3.duration",
        },
    ],
    heroVideoId: "jzdTBDmCAKE",
    pathnames,
    nav: [],
    // Markdown collections besides the articles (the reminders come in their own PR).
    collections: [],
    // Axons copy replaced on purpose by site/messages/<locale>.json.
    messageOverrides: ["meta.home", "footer.tagline"],
} as const satisfies SiteConfig<typeof pathnames>;
