// PURE module (no React, no next-intl, no fs): the explorer tree of the ezjsdev IDE shell and the
// tab <-> URL derivation. The DECLARATION (which "files" exist, which route each one opens) lives
// in site/explorer.ts; components/site/ide/SiteShell.tsx resolves it on the server (labels,
// localized hrefs, collection entries) through the callbacks of `ResolveContext`, and the client
// shell only derives state from the URL with the helpers below. Unit tests: tests/unit/ide-tree.test.ts.

/** A page of the site shown as a file. `route` = logical href of routing.pathnames ("/legal"). */
export interface PageFileDecl<R extends string = string> {
    readonly kind: "page";
    readonly id: string;
    /** File name shown in the tree ("page.tsx"). */
    readonly name: string;
    /** Full message path of a LOCALIZED file name ("ide.fileNames.about" -> "contenu.md"); wins over `name`. */
    readonly nameKey?: string;
    readonly route: R;
    /** Full message paths of the page title and description (preview panel, accessible name). */
    readonly titleKey: string;
    readonly descriptionKey: string;
}

/** One file per entry of a Markdown collection, in the visited locale: `<slug>.md`. */
export interface CollectionFilesDecl {
    readonly kind: "collection";
    readonly id: string;
    /** Collection id (site/config.ts `collections`, or Axons' "articles"). */
    readonly collection: string;
}

export interface FolderDecl<R extends string = string> {
    readonly kind: "folder";
    readonly id: string;
    /** Message key of the folder name, under `ide.tree`. */
    readonly labelKey: string;
    /** Expanded on first render even when the current page is elsewhere. */
    readonly defaultOpen?: boolean;
    /**
     * A page that does not exist yet (About, Services…): kept in the declaration so its place is
     * reserved, but NEVER shown (spec §6.1: no file without a real page). Remove the flag with the page.
     */
    readonly planned?: boolean;
    readonly children: readonly ExplorerDecl<R>[];
}

/** `R` = the logical routes a page may open (site/explorer.ts passes routing's static hrefs). */
export type ExplorerDecl<R extends string = string> = PageFileDecl<R> | CollectionFilesDecl | FolderDecl<R>;

/** The same page in every served locale where it exists (preview panel language links). */
export type Alternates = readonly { readonly locale: string; readonly href: string }[];

/** An entry of a collection, as listed in the visited locale. */
export interface CollectionItem {
    readonly id: string;
    readonly slug: string;
    readonly title: string;
    readonly description: string;
    /** Localized href of the entry in the visited locale. */
    readonly href: string;
    /** Locales the entry is translated into, with their localized href (preview panel). */
    readonly alternates: Alternates;
}

export interface ResolveContext {
    /** Folder name from `ide.tree.<key>`. */
    folderLabel(key: string): string;
    /** Message at a full path ("pages.legal.title"). */
    message(path: string): string;
    /** Localized href of a static route ("/legal" -> "/fr/mentions-legales" or "/legal"). */
    href(route: string): string;
    /** The static route in every served locale. */
    alternates(route: string): Alternates;
    /** The collection's items in the visited locale, or null when the collection is disabled. */
    entries(collection: string): readonly CollectionItem[] | null;
    /** Logical href of a collection's entry route ("/reminders/[slug]"). */
    itemRoute(collection: string): string;
}

export interface TreeFile {
    readonly kind: "file";
    readonly id: string;
    readonly name: string;
    /** Folder name + file name, shown in the tab ("Articles/page.tsx"). */
    readonly tabLabel: string;
    readonly title: string;
    readonly description: string;
    readonly href: string;
    /** Logical route (next-intl's usePathname value) and slug, matched against the URL. */
    readonly route: string;
    readonly slug?: string;
    readonly alternates: Alternates;
}

export interface TreeFolder {
    readonly kind: "folder";
    readonly id: string;
    readonly label: string;
    readonly defaultOpen: boolean;
    readonly children: readonly TreeNode[];
}

export type TreeNode = TreeFile | TreeFolder;

/** Resolves the declaration for one locale: planned folders and empty folders are dropped. */
export function resolveTree(decls: readonly ExplorerDecl[], ctx: ResolveContext, folder = ""): TreeNode[] {
    const out: TreeNode[] = [];
    for (const decl of decls) {
        if (decl.kind === "page") {
            const name = decl.nameKey ? ctx.message(decl.nameKey) : decl.name;
            out.push({
                kind: "file",
                id: decl.id,
                name,
                tabLabel: folder ? `${folder}/${name}` : name,
                title: ctx.message(decl.titleKey),
                description: ctx.message(decl.descriptionKey),
                href: ctx.href(decl.route),
                route: decl.route,
                alternates: ctx.alternates(decl.route),
            });
        } else if (decl.kind === "collection") {
            const route = ctx.itemRoute(decl.collection);
            for (const item of ctx.entries(decl.collection) ?? []) {
                const name = `${item.slug}.md`;
                out.push({
                    kind: "file",
                    id: `${decl.id}/${item.id}`,
                    name,
                    tabLabel: name,
                    title: item.title,
                    description: item.description,
                    href: item.href,
                    route,
                    slug: item.slug,
                    alternates: item.alternates,
                });
            }
        } else if (!decl.planned) {
            const label = ctx.folderLabel(decl.labelKey);
            const children = resolveTree(decl.children, ctx, label);
            if (children.length) {
                out.push({ kind: "folder", id: decl.id, label, defaultOpen: !!decl.defaultOpen, children });
            }
        }
    }
    return out;
}

/** Every file of the tree, depth first (tree order). */
export function treeFiles(nodes: readonly TreeNode[]): TreeFile[] {
    return nodes.flatMap((n) => (n.kind === "file" ? [n] : treeFiles(n.children)));
}

/**
 * The file opened by the URL: next-intl's usePathname() gives the LOGICAL route
 * ("/reminders/[slug]") and the slug comes from the route params. undefined = no file (404).
 */
export function findCurrentFile(
    files: readonly TreeFile[],
    route: string,
    slug: string | undefined,
): TreeFile | undefined {
    return files.find((f) => f.route === route && (f.slug === undefined || f.slug === slug));
}

/** Ids of the folders containing `id`, outermost first ([] when absent or at the top level). */
export function ancestorsOf(nodes: readonly TreeNode[], id: string): string[] {
    for (const n of nodes) {
        if (n.id === id) return [];
        if (n.kind === "folder") {
            const below = ancestorsOf(n.children, id);
            if (below.length || n.children.some((c) => c.id === id)) return [n.id, ...below];
        }
    }
    return [];
}

/**
 * Expanded state of a folder: the user's explicit choice wins; otherwise a folder is open when
 * declared `defaultOpen` or when it contains the current file (revealed like VS Code does).
 */
export function isExpanded(
    folder: TreeFolder,
    overrides: Readonly<Record<string, boolean>>,
    currentAncestors: readonly string[],
): boolean {
    return overrides[folder.id] ?? (folder.defaultOpen || currentAncestors.includes(folder.id));
}

/** A node as laid out in the tree: its depth (1-based, aria-level) and parent folder. */
export interface VisibleNode {
    readonly node: TreeNode;
    readonly level: number;
    readonly parentId: string | null;
}

/** The nodes a keyboard user can reach: children of collapsed folders are skipped. */
export function visibleNodes(
    nodes: readonly TreeNode[],
    expanded: (folder: TreeFolder) => boolean,
    level = 1,
    parentId: string | null = null,
): VisibleNode[] {
    return nodes.flatMap((node) => {
        const self: VisibleNode = { node, level, parentId };
        if (node.kind === "file" || !expanded(node)) return [self];
        return [self, ...visibleNodes(node.children, expanded, level + 1, node.id)];
    });
}

export type TreeKeyAction =
    | { readonly type: "focus"; readonly id: string }
    | { readonly type: "toggle"; readonly id: string; readonly open: boolean }
    | { readonly type: "none" };

/**
 * WAI-ARIA tree keyboard model (APG "navigation treeview"): Up/Down = previous/next visible node,
 * Home/End = first/last, Right = open a closed folder or enter an open one, Left = close an open
 * folder or go to the parent. Enter/Space are handled by the element itself (link or folder).
 */
export function treeKey(list: readonly VisibleNode[], id: string, key: string, open: boolean): TreeKeyAction {
    const index = list.findIndex((v) => v.node.id === id);
    if (index < 0) return { type: "none" };
    const at = (i: number): TreeKeyAction => ({ type: "focus", id: list[i].node.id });
    const { node, parentId } = list[index];
    switch (key) {
        case "ArrowDown":
            return index < list.length - 1 ? at(index + 1) : { type: "none" };
        case "ArrowUp":
            return index > 0 ? at(index - 1) : { type: "none" };
        case "Home":
            return at(0);
        case "End":
            return at(list.length - 1);
        case "ArrowRight":
            if (node.kind === "file") return { type: "none" };
            return open ? at(index + 1) : { type: "toggle", id, open: true };
        case "ArrowLeft":
            if (node.kind === "folder" && open) return { type: "toggle", id, open: false };
            return parentId ? { type: "focus", id: parentId } : { type: "none" };
        default:
            return { type: "none" };
    }
}

/** Open tabs: `id` is appended once (an already open tab keeps its place). */
export function openTab(tabs: readonly string[], id: string | undefined): string[] {
    return id === undefined || tabs.includes(id) ? [...tabs] : [...tabs, id];
}

/**
 * Closes `id`. When it was the ACTIVE tab, `next` is the tab to navigate to: its right neighbour,
 * else its left one (like VS Code). `next` is undefined when the closed tab was not active.
 */
export function closeTab(
    tabs: readonly string[],
    id: string,
    activeId: string | undefined,
): { tabs: string[]; next: string | undefined } {
    const index = tabs.indexOf(id);
    const rest = tabs.filter((t) => t !== id);
    if (index < 0 || id !== activeId) return { tabs: rest, next: undefined };
    return { tabs: rest, next: rest[Math.min(index, rest.length - 1)] };
}
