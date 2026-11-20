// Localized routes of the app (logical key → one path, or one path per locale), used by
// i18n/routing.ts. Kept out of routing.ts (which pulls next-intl/navigation, so next/navigation) so
// plain Node code — Playwright specs — can resolve localized paths too.
export const PATHNAMES = {
    "/": "/",
    "/sitemap": {
        fr: "/plan-du-site",
        en: "/sitemap",
        es: "/mapa-del-sitio",
        de: "/sitemap",
        it: "/mappa-del-sito",
        pt: "/mapa-do-site",
    },
    "/legal": {
        fr: "/mentions-legales",
        en: "/legal",
        es: "/aviso-legal",
        de: "/impressum",
        it: "/note-legali",
        pt: "/aviso-legal",
    },
    "/privacy": {
        fr: "/confidentialite",
        en: "/privacy",
        es: "/privacidad",
        de: "/datenschutz",
        it: "/privacy",
        pt: "/privacidade",
    },
    "/articles": {
        fr: "/articles",
        en: "/articles",
        es: "/articulos",
        de: "/artikel",
        it: "/articoli",
        pt: "/artigos",
    },
    // [slug] = the TRANSLATED slug of the article (front matter), different per locale.
    "/articles/[slug]": {
        fr: "/articles/[slug]",
        en: "/articles/[slug]",
        es: "/articulos/[slug]",
        de: "/artikel/[slug]",
        it: "/articoli/[slug]",
        pt: "/artigos/[slug]",
    },
    "/cookies": {
        fr: "/cookies",
        en: "/cookies",
        es: "/cookies",
        de: "/cookies",
        it: "/cookies",
        pt: "/cookies",
    },
    // ezjsdev's own pages (spec v0.2 §5.2–§5.6) and the reminders collection.
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
    // [slug] = the TRANSLATED slug of the reminder (front matter).
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

/** Logical key of a STATIC route of `P` (no dynamic `[param]` segment). */
export type StaticHref<P> = Exclude<Extract<keyof P, string>, `${string}[${string}`>;

/** Logical keys of the STATIC routes (no dynamic `[param]` segment), in declaration order. */
export function staticHrefs<P extends Readonly<Record<string, unknown>>>(pathnames: P): StaticHref<P>[] {
    return Object.keys(pathnames).filter((href) => !href.includes("[")) as StaticHref<P>[];
}
