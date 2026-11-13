import { getCollection, SITE_NAME, SITE_URL } from "@/constants/site";
import { getPathname, routing } from "@/i18n/routing";
import { getCollectionCatalog, getEntries } from "@/lib/articles/source";
import { entryPath, type EntryHref, type LogicalHref } from "@/lib/seo";
import type { SiteShellProps } from "@/lib/site-extension";
import { EXPLORER } from "@/site/explorer";
import { getTranslations } from "next-intl/server";
import { IdeShell } from "./IdeShell";
import { resolveTree, type CollectionItem, type TreeNode } from "./tree-model";

// ezjsdev's page FRAME (exported as `SiteShell` by site/shell.tsx, rendered by Axons'
// app/[locale]/layout.tsx around every page). Server Component: resolves the explorer
// declaration (site/explorer.ts) for the locale — folder names, page titles, localized hrefs,
// the collections' entries — then hands a plain, serializable tree to the client shell, which
// only derives its state from the URL. No request data is read (cookies/headers), so the pages
// keep their rendering mode.
export async function SiteShell({ children, locale }: SiteShellProps) {
    const t = await getTranslations({ locale });

    const entries = (id: string): CollectionItem[] | null => {
        const collection = getCollection(id);
        if (!collection.enabled) return null;
        const itemHref = collection.itemHref as EntryHref;
        const catalog = getCollectionCatalog(id);
        // Only the entries translated into this locale: a fallback (another language) is reachable
        // from the listing page, not shown as a file of this locale's tree.
        return getEntries(id, locale)
            .filter((listed) => !listed.isFallback)
            .map(({ article }) => {
                const translations = catalog.find((e) => e.id === article.id)?.translations ?? {};
                return {
                    id: article.id,
                    slug: article.slug,
                    title: article.title,
                    description: article.description,
                    href: entryPath(itemHref, locale, article.slug),
                    alternates: routing.locales
                        .filter((l) => translations[l])
                        .map((l) => ({ locale: l, href: entryPath(itemHref, l, translations[l].slug) })),
                };
            });
    };

    const files = resolveTree(EXPLORER, {
        folderLabel: (key) => t(`ide.tree.${key}`),
        message: (path) => t(path),
        href: (route) => getPathname({ locale, href: route as LogicalHref }),
        alternates: (route) =>
            routing.locales.map((l) => ({ locale: l, href: getPathname({ locale: l, href: route as LogicalHref }) })),
        entries,
        itemRoute: (id) => getCollection(id).itemHref,
    });
    // The project folder, as in an editor's explorer ("EZJSDEV/").
    const tree: TreeNode[] = [
        { kind: "folder", id: "root", label: SITE_NAME.toUpperCase(), defaultOpen: true, children: files },
    ];

    return (
        <IdeShell tree={tree} siteUrl={SITE_URL}>
            {children}
        </IdeShell>
    );
}
