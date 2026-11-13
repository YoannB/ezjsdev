import type { ExplorerDecl } from "@/components/site/ide/tree-model";
import type { LogicalHref } from "@/lib/seo";

// EZJSDEV — the explorer tree of the IDE shell: which "files" exist and which REAL route each one
// opens (logical hrefs of routing.pathnames, Axons' + site/config.ts). Folder names live in
// site/messages/<locale>.json under `ide.tree`; page titles/descriptions reuse the pages' messages.
// Model and rules: components/site/ide/tree-model.ts. Spec v0.2 §5 (tree) and §6.1 (no file
// without a real page): the future pages are declared `planned` and stay hidden until they exist.
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
    // Planned (spec §5.2–§5.6): add the route to site/config.ts `pathnames`, the page, then a
    // `page` child here and drop `planned`.
    { kind: "folder", id: "about", labelKey: "about", planned: true, children: [] },
    { kind: "folder", id: "services", labelKey: "services", planned: true, children: [] },
    { kind: "folder", id: "projects", labelKey: "projects", planned: true, children: [] },
    { kind: "folder", id: "seo-tools", labelKey: "seoTools", planned: true, children: [] },
    { kind: "folder", id: "contact", labelKey: "contact", planned: true, children: [] },
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
