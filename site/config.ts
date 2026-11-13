import type { SiteConfig } from "@/lib/site-extension";

// EZJSDEV — the site's own configuration (with site/messages/*.json). Everything else (env, flags,
// locales, layout constants) stays in Axons' constants/site.ts, which re-exports these values.
// Contract and merge rules: lib/site-extension.ts; guide: docs/architecture.md → Deriving a site.

// The site's own localized routes. [slug] = the TRANSLATED slug of the entry (front matter).
const pathnames = {
    "/reminders": {
        fr: "/pense-betes",
        en: "/reminders",
        es: "/recordatorios",
        de: "/merkzettel",
        it: "/promemoria",
        pt: "/lembretes",
    },
    "/reminders/[slug]": {
        fr: "/pense-betes/[slug]",
        en: "/reminders/[slug]",
        es: "/recordatorios/[slug]",
        de: "/merkzettel/[slug]",
        it: "/promemoria/[slug]",
        pt: "/lembretes/[slug]",
    },
} as const;

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
    // MUI palette per mode (buttons, chips, focus rings…). CSS tokens (--accent-1, --bg-0, --btn-fg…)
    // are overridden in site/theme.css; keep both in step when rebranding.
    palette: {
        // Outlined/text buttons use these as TEXT colour: lighter on dark, darker on light (AA on
        // --bg-0 / --surface-*). contrastText = primary (blue → cyan gradient) label, as --btn-fg.
        dark: { primary: "#5b9bff", secondary: "#22c3ee", contrastText: "#06101f" },
        light: { primary: "#1d4ed8", secondary: "#0e7490", contrastText: "#ffffff" },
    },
    pathnames,
    nav: [{ href: "/reminders", key: "nav.reminders" }],
    // Markdown collections besides the articles: the old site's "pense-bêtes" (2013–2017 archives).
    collections: [
        {
            id: "reminders",
            enabled: true,
            href: "/reminders",
            itemHref: "/reminders/[slug]",
            namespace: "pages.reminders",
            schemaType: "TechArticle",
        },
    ],
    // Axons copy replaced on purpose by site/messages/<locale>.json.
    messageOverrides: ["meta.home", "footer.tagline", "pages.articles.intro"],
} as const satisfies SiteConfig<typeof pathnames>;
