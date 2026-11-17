import type { SiteConfig } from "@/lib/site-extension";

// EZJSDEV — the site's own configuration (with site/messages/*.json). Everything else (env, flags,
// locales, layout constants) stays in Axons' constants/site.ts, which re-exports these values.
// Contract and merge rules: lib/site-extension.ts; guide: docs/architecture.md → Deriving a site.

// The site's own localized routes. [slug] = the TRANSLATED slug of the entry (front matter).
const pathnames = {
    // Content pages (spec v0.2 §5.2–§5.6).
    "/about": {
        fr: "/a-propos",
        en: "/about",
        es: "/sobre-mi",
        de: "/ueber-mich",
        it: "/chi-sono",
        pt: "/sobre-mim",
    },
    "/services": {
        fr: "/services",
        en: "/services",
        es: "/servicios",
        de: "/leistungen",
        it: "/servizi",
        pt: "/servicos",
    },
    "/projects": {
        fr: "/projets",
        en: "/projects",
        es: "/proyectos",
        de: "/projekte",
        it: "/progetti",
        pt: "/projetos",
    },
    "/contact": {
        fr: "/contact",
        en: "/contact",
        es: "/contacto",
        de: "/kontakt",
        it: "/contatti",
        pt: "/contacto",
    },
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
        dark: { primary: "#4daafc", secondary: "#22bef8", contrastText: "#04101e" },
        light: { primary: "#005fb8", secondary: "#00708c", contrastText: "#ffffff" },
    },
    pathnames,
    // Order of the header, footer and HTML sitemap: site entries follow Home; { axons: "/articles" }
    // places Axons' Articles entry among them. Sitemap and legal pages (Axons) come last.
    nav: [
        { href: "/about", key: "nav.about" },
        { href: "/services", key: "nav.services" },
        { href: "/projects", key: "nav.projects" },
        { axons: "/articles" },
        { href: "/reminders", key: "nav.reminders" },
        { href: "/contact", key: "nav.contact" },
    ],
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
    // "New" badge for 90 days (3 months) on future entries; everything published before 2018 (the
    // migrated 2013–2017 articles and reminders) is shown as an archive (docs/articles.md → New and
    // archive badges).
    collectionDefaults: { newForDays: 90, archiveBefore: "2018-01-01" },
    // Axons copy replaced on purpose by site/messages/<locale>.json.
    messageOverrides: ["meta.home", "footer.tagline", "pages.articles.intro", "pages.articles.archivesTitle"],
    // Message paths read by ezjsdev's own Client Components (useTranslations); the rest of the
    // catalogue stays on the server (docs/i18n.md → Client messages).
    clientMessages: ["ide", "demo"],
    // ezjsdev pages with their OWN social image (title + intro of their messages namespace);
    // collections are automatic, other pages share the home card. Drawing: site/og-image.tsx.
    ogPages: {
        "/about": "pages.about",
        "/services": "pages.services",
        "/projects": "pages.projects",
        "/contact": "pages.contact",
    },
} as const satisfies SiteConfig<typeof pathnames>;
