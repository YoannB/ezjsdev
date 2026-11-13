import type { ExplorerDecl } from "@/components/site/ide/tree-model";
import type { LogicalHref } from "@/lib/seo";

// EZJSDEV — the explorer tree of the IDE shell: which "files" exist and which REAL route each one
// opens (logical hrefs of routing.pathnames, Axons' + site/config.ts). Folder names live in
// site/messages/<locale>.json under `ide.tree`; page titles/descriptions reuse the pages' messages.
// Model and rules: components/site/ide/tree-model.ts. Spec v0.2 §5 (tree) and §6.1 (no file
// without a real page): a future page (SEO tools) is declared `planned` and stays hidden until it exists.
export const EXPLORER = [
    {
        kind: "folder",
        id: "home",
        labelKey: "home",
        defaultOpen: true,
        children: [
            {
                kind: "page",
                id: "home/page",
                name: "page.tsx",
                route: "/",
                titleKey: "meta.home.title",
                descriptionKey: "meta.home.description",
            },
        ],
    },
    // About is staged as the Markdown document of spec §5 ("A-propos/contenu.md"), its name
    // localized like the folder's (`ide.fileNames.about`).
    {
        kind: "folder",
        id: "about",
        labelKey: "about",
        defaultOpen: true,
        children: [
            {
                kind: "page",
                id: "about/page",
                name: "contenu.md",
                nameKey: "ide.fileNames.about",
                route: "/about",
                titleKey: "pages.about.title",
                descriptionKey: "pages.about.intro",
            },
        ],
    },
    {
        kind: "folder",
        id: "services",
        labelKey: "services",
        defaultOpen: true,
        children: [
            {
                kind: "page",
                id: "services/page",
                name: "page.tsx",
                route: "/services",
                titleKey: "pages.services.title",
                descriptionKey: "pages.services.intro",
            },
        ],
    },
    {
        kind: "folder",
        id: "projects",
        labelKey: "projects",
        defaultOpen: true,
        children: [
            {
                kind: "page",
                id: "projects/page",
                name: "page.tsx",
                route: "/projects",
                titleKey: "pages.projects.title",
                descriptionKey: "pages.projects.intro",
            },
        ],
    },
    // Planned (spec §5.5): no real SEO tool exists yet. Add the route to site/config.ts
    // `pathnames`, the page, then a `page` child here and drop `planned`.
    { kind: "folder", id: "seo-tools", labelKey: "seoTools", planned: true, children: [] },
    {
        kind: "folder",
        id: "articles",
        labelKey: "articles",
        children: [
            {
                kind: "page",
                id: "articles/page",
                name: "page.tsx",
                route: "/articles",
                titleKey: "pages.articles.title",
                descriptionKey: "pages.articles.intro",
            },
            { kind: "collection", id: "articles", collection: "articles" },
        ],
    },
    {
        kind: "folder",
        id: "reminders",
        labelKey: "reminders",
        children: [
            {
                kind: "page",
                id: "reminders/page",
                name: "page.tsx",
                route: "/reminders",
                titleKey: "pages.reminders.title",
                descriptionKey: "pages.reminders.intro",
            },
            { kind: "collection", id: "reminders", collection: "reminders" },
        ],
    },
    {
        kind: "folder",
        id: "contact",
        labelKey: "contact",
        defaultOpen: true,
        children: [
            {
                kind: "page",
                id: "contact/page",
                name: "page.tsx",
                route: "/contact",
                titleKey: "pages.contact.title",
                descriptionKey: "pages.contact.intro",
            },
        ],
    },
    {
        kind: "folder",
        id: "sitemap",
        labelKey: "sitemap",
        defaultOpen: true,
        children: [
            {
                kind: "page",
                id: "sitemap/page",
                name: "page.tsx",
                route: "/sitemap",
                titleKey: "pages.sitemap.title",
                descriptionKey: "pages.sitemap.intro",
            },
        ],
    },
    {
        kind: "folder",
        id: "legal",
        labelKey: "legal",
        defaultOpen: true,
        children: [
            {
                kind: "page",
                id: "legal/page",
                name: "page.tsx",
                route: "/legal",
                titleKey: "pages.legal.title",
                descriptionKey: "pages.legal.intro",
            },
        ],
    },
    {
        kind: "folder",
        id: "privacy",
        labelKey: "privacy",
        defaultOpen: true,
        children: [
            {
                kind: "page",
                id: "privacy/page",
                name: "page.tsx",
                route: "/privacy",
                titleKey: "pages.privacy.title",
                descriptionKey: "pages.privacy.intro",
            },
        ],
    },
    {
        kind: "folder",
        id: "cookies",
        labelKey: "cookies",
        defaultOpen: true,
        children: [
            {
                kind: "page",
                id: "cookies/page",
                name: "page.tsx",
                route: "/cookies",
                titleKey: "pages.cookies.title",
                descriptionKey: "pages.cookies.intro",
            },
        ],
    },
] as const satisfies readonly ExplorerDecl<LogicalHref>[];
