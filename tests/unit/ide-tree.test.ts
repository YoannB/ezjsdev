import {
    ancestorsOf,
    closeTab,
    findCurrentFile,
    isExpanded,
    openTab,
    resolveTree,
    treeFiles,
    treeKey,
    visibleNodes,
    type ExplorerDecl,
    type ResolveContext,
    type TreeFile,
    type TreeFolder,
    type TreeNode,
} from "@/components/site/ide/tree-model";
import { EXPLORER } from "@/site/explorer";
import { describe, expect, it } from "vitest";

// PURE model of the IDE shell (components/site/ide/tree-model.ts): inline fixtures, no fs, no
// next-intl. The callbacks of ResolveContext stand for the server lookups of SiteShell.tsx.
const ctx: ResolveContext = {
    folderLabel: (key) => `[${key}]`,
    message: (path) => `<${path}>`,
    href: (route) => `/fr${route === "/" ? "" : route}`,
    alternates: (route) => [
        { locale: "fr", href: `/fr${route}` },
        { locale: "en", href: `/en${route}` },
    ],
    entries: (collection) =>
        collection === "off"
            ? null
            : [
                  {
                      id: "e1",
                      slug: "first",
                      title: "First",
                      description: "One",
                      href: `/fr/${collection}/first`,
                      alternates: [{ locale: "fr", href: `/fr/${collection}/first` }],
                  },
                  {
                      id: "e2",
                      slug: "second",
                      title: "Second",
                      description: "Two",
                      href: `/fr/${collection}/second`,
                      alternates: [],
                  },
              ],
    itemRoute: (collection) => `/${collection}/[slug]`,
};

const decls: ExplorerDecl[] = [
    {
        kind: "page",
        id: "top",
        name: "page.tsx",
        route: "/",
        titleKey: "meta.title",
        descriptionKey: "meta.desc",
    },
    {
        kind: "folder",
        id: "notes",
        labelKey: "notes",
        defaultOpen: true,
        children: [
            { kind: "page", id: "notes/page", name: "page.tsx", route: "/notes", titleKey: "t", descriptionKey: "d" },
            { kind: "collection", id: "notes", collection: "notes" },
        ],
    },
    { kind: "folder", id: "future", labelKey: "future", planned: true, children: [] },
    {
        kind: "folder",
        id: "empty",
        labelKey: "empty",
        children: [{ kind: "collection", id: "off", collection: "off" }],
    },
    {
        kind: "folder",
        id: "outer",
        labelKey: "outer",
        children: [
            {
                kind: "folder",
                id: "inner",
                labelKey: "inner",
                children: [
                    {
                        kind: "page",
                        id: "inner/page",
                        name: "page.tsx",
                        route: "/legal",
                        titleKey: "t",
                        descriptionKey: "d",
                    },
                ],
            },
        ],
    },
];

const tree = resolveTree(decls, ctx);
const files = treeFiles(tree);
const file = (id: string) => files.find((f) => f.id === id) as TreeFile;
const folder = (nodes: readonly TreeNode[], id: string): TreeFolder => {
    for (const n of nodes) {
        if (n.kind === "folder") {
            if (n.id === id) return n;
            const below = folder(n.children, id);
            if (below) return below;
        }
    }
    return undefined as unknown as TreeFolder;
};

describe("resolveTree", () => {
    it("resolves a top-level page file (no folder prefix in its tab label)", () => {
        expect(tree[0]).toEqual({
            kind: "file",
            id: "top",
            name: "page.tsx",
            tabLabel: "page.tsx",
            title: "<meta.title>",
            description: "<meta.desc>",
            href: "/fr",
            route: "/",
            alternates: [
                { locale: "fr", href: "/fr/" },
                { locale: "en", href: "/en/" },
            ],
        });
    });

    it("prefixes a page's tab label with its folder name", () => {
        expect(file("notes/page").tabLabel).toBe("[notes]/page.tsx");
        expect(file("notes/page").href).toBe("/fr/notes");
    });

    it("localizes a file name declared with nameKey (folder prefix included)", () => {
        const [docs] = resolveTree(
            [
                {
                    kind: "folder",
                    id: "docs",
                    labelKey: "docs",
                    children: [
                        {
                            kind: "page",
                            id: "docs/page",
                            name: "doc.md",
                            nameKey: "ide.fileNames.doc",
                            route: "/docs",
                            titleKey: "t",
                            descriptionKey: "d",
                        },
                    ],
                },
            ],
            ctx,
        );
        const [doc] = treeFiles([docs]);
        expect(doc.name).toBe("<ide.fileNames.doc>");
        expect(doc.tabLabel).toBe("[docs]/<ide.fileNames.doc>");
    });

    it("expands a collection into one <slug>.md file per entry, on the entry route", () => {
        expect(file("notes/e1")).toEqual({
            kind: "file",
            id: "notes/e1",
            name: "first.md",
            tabLabel: "first.md",
            title: "First",
            description: "One",
            href: "/fr/notes/first",
            route: "/notes/[slug]",
            slug: "first",
            alternates: [{ locale: "fr", href: "/fr/notes/first" }],
        });
        expect(file("notes/e2").slug).toBe("second");
    });

    it("never shows a planned folder, nor a folder left empty (disabled collection)", () => {
        const ids = tree.map((n) => n.id);
        expect(ids).toEqual(["top", "notes", "outer"]);
    });

    it("keeps nested folders and their defaultOpen flag", () => {
        expect(folder(tree, "notes").defaultOpen).toBe(true);
        expect(folder(tree, "outer").defaultOpen).toBe(false);
        expect(folder(tree, "inner").label).toBe("[inner]");
        expect(file("inner/page").tabLabel).toBe("[inner]/page.tsx");
    });

    it("lists the files depth first", () => {
        expect(files.map((f) => f.id)).toEqual(["top", "notes/page", "notes/e1", "notes/e2", "inner/page"]);
    });
});

describe("findCurrentFile — tab <-> URL", () => {
    it("matches a static route", () => {
        expect(findCurrentFile(files, "/notes", undefined)?.id).toBe("notes/page");
    });

    it("matches an entry by route AND slug", () => {
        expect(findCurrentFile(files, "/notes/[slug]", "second")?.id).toBe("notes/e2");
    });

    it("finds nothing for an unknown slug or route (404: no tab is active)", () => {
        expect(findCurrentFile(files, "/notes/[slug]", "nope")).toBeUndefined();
        expect(findCurrentFile(files, "/elsewhere", undefined)).toBeUndefined();
    });
});

describe("ancestorsOf", () => {
    it("returns the containing folders, outermost first", () => {
        expect(ancestorsOf(tree, "inner/page")).toEqual(["outer", "inner"]);
        expect(ancestorsOf(tree, "notes/e1")).toEqual(["notes"]);
    });

    it("is empty for a top-level node, a folder itself at the top, and an unknown id", () => {
        expect(ancestorsOf(tree, "top")).toEqual([]);
        expect(ancestorsOf(tree, "outer")).toEqual([]);
        expect(ancestorsOf(tree, "missing")).toEqual([]);
    });
});

describe("isExpanded", () => {
    const outer = folder(tree, "outer");
    const notes = folder(tree, "notes");

    it("follows the user's explicit choice first", () => {
        expect(isExpanded(notes, { notes: false }, [])).toBe(false);
        expect(isExpanded(outer, { outer: true }, [])).toBe(true);
    });

    it("else opens a defaultOpen folder", () => {
        expect(isExpanded(notes, {}, [])).toBe(true);
    });

    it("else opens the folders containing the current file, and only them", () => {
        expect(isExpanded(outer, {}, ["outer", "inner"])).toBe(true);
        expect(isExpanded(outer, {}, [])).toBe(false);
    });
});

describe("visibleNodes", () => {
    it("skips the children of collapsed folders and records level and parent", () => {
        const list = visibleNodes(tree, (f) => f.id !== "outer");
        expect(list.map((v) => [v.node.id, v.level, v.parentId])).toEqual([
            ["top", 1, null],
            ["notes", 1, null],
            ["notes/page", 2, "notes"],
            ["notes/e1", 2, "notes"],
            ["notes/e2", 2, "notes"],
            ["outer", 1, null],
        ]);
    });

    it("descends into open nested folders", () => {
        const list = visibleNodes(tree, () => true);
        expect(list.slice(-3).map((v) => [v.node.id, v.level, v.parentId])).toEqual([
            ["outer", 1, null],
            ["inner", 2, "outer"],
            ["inner/page", 3, "inner"],
        ]);
    });
});

describe("treeKey — WAI-ARIA tree keyboard model", () => {
    const list = visibleNodes(tree, (f) => f.id !== "outer");

    it("does nothing for an id that is not laid out", () => {
        expect(treeKey(list, "inner/page", "ArrowDown", false)).toEqual({ type: "none" });
    });

    it("moves down and up, stopping at both ends", () => {
        expect(treeKey(list, "top", "ArrowDown", false)).toEqual({ type: "focus", id: "notes" });
        expect(treeKey(list, "outer", "ArrowDown", false)).toEqual({ type: "none" });
        expect(treeKey(list, "notes", "ArrowUp", true)).toEqual({ type: "focus", id: "top" });
        expect(treeKey(list, "top", "ArrowUp", false)).toEqual({ type: "none" });
    });

    it("jumps to the first and the last node", () => {
        expect(treeKey(list, "notes/e1", "Home", false)).toEqual({ type: "focus", id: "top" });
        expect(treeKey(list, "notes/e1", "End", false)).toEqual({ type: "focus", id: "outer" });
    });

    it("ArrowRight opens a closed folder, enters an open one, ignores a file", () => {
        expect(treeKey(list, "outer", "ArrowRight", false)).toEqual({ type: "toggle", id: "outer", open: true });
        expect(treeKey(list, "notes", "ArrowRight", true)).toEqual({ type: "focus", id: "notes/page" });
        expect(treeKey(list, "notes/e1", "ArrowRight", false)).toEqual({ type: "none" });
    });

    it("ArrowLeft closes an open folder, else goes to the parent, else does nothing", () => {
        expect(treeKey(list, "notes", "ArrowLeft", true)).toEqual({ type: "toggle", id: "notes", open: false });
        expect(treeKey(list, "notes/e2", "ArrowLeft", false)).toEqual({ type: "focus", id: "notes" });
        expect(treeKey(list, "outer", "ArrowLeft", false)).toEqual({ type: "none" });
        expect(treeKey(list, "top", "ArrowLeft", false)).toEqual({ type: "none" });
    });

    it("ignores any other key (Enter/Space are handled by the element)", () => {
        expect(treeKey(list, "top", "Enter", false)).toEqual({ type: "none" });
    });
});

describe("openTab / closeTab", () => {
    it("appends a new tab once, keeps the order, ignores no file (404)", () => {
        expect(openTab(["home"], "a")).toEqual(["home", "a"]);
        expect(openTab(["home", "a"], "home")).toEqual(["home", "a"]);
        expect(openTab(["home"], undefined)).toEqual(["home"]);
    });

    it("closing an inactive tab keeps the current page (no navigation)", () => {
        expect(closeTab(["home", "a", "b"], "a", "b")).toEqual({ tabs: ["home", "b"], next: undefined });
    });

    it("closing the active tab activates its right neighbour, else its left one", () => {
        expect(closeTab(["home", "a", "b"], "a", "a")).toEqual({ tabs: ["home", "b"], next: "b" });
        expect(closeTab(["home", "a", "b"], "b", "b")).toEqual({ tabs: ["home", "a"], next: "a" });
    });

    it("closing an unknown tab changes nothing", () => {
        expect(closeTab(["home"], "x", "x")).toEqual({ tabs: ["home"], next: undefined });
    });
});

describe("site/explorer.ts — the ezjsdev declaration", () => {
    const pages = (list: readonly ExplorerDecl[]): ExplorerDecl[] =>
        list.flatMap((d) => (d.kind === "folder" ? (d.planned ? [] : pages(d.children)) : [d]));

    it("opens the pages required by the shell, the home first", () => {
        const routes = pages(EXPLORER).flatMap((d) => (d.kind === "page" ? [d.route] : []));
        expect(routes).toEqual([
            "/",
            "/about",
            "/services",
            "/projects",
            "/articles",
            "/reminders",
            "/contact",
            "/sitemap",
            "/legal",
            "/privacy",
            "/cookies",
        ]);
    });

    it("lists the articles and the reminders, one file per entry", () => {
        const collections = pages(EXPLORER).flatMap((d) => (d.kind === "collection" ? [d.collection] : []));
        expect(collections).toEqual(["articles", "reminders"]);
    });

    it("reserves the SEO tools page without showing it (planned, no real tool yet: spec §5.5)", () => {
        const planned = EXPLORER.filter((d) => "planned" in d && d.planned).map((d) => d.id);
        expect(planned).toEqual(["seo-tools"]);
        const shown = resolveTree(EXPLORER, ctx).map((n) => n.id);
        expect(shown).not.toContain("seo-tools");
        expect(shown).toEqual(expect.arrayContaining(["about", "services", "projects", "contact"]));
    });

    it("stages About as a localized Markdown document (spec §5: A-propos/contenu.md)", () => {
        const about = treeFiles(resolveTree(EXPLORER, ctx)).find((f) => f.route === "/about");
        expect(about?.name).toBe("<ide.fileNames.about>");
    });

    it("uses unique page and folder ids (they key the tabs and the expanded state)", () => {
        const ids: string[] = [];
        const walk = (list: readonly ExplorerDecl[]) =>
            list.forEach((d) => {
                if (d.kind !== "collection") ids.push(d.id);
                if (d.kind === "folder") walk(d.children);
            });
        walk(EXPLORER);
        expect(new Set(ids).size).toBe(ids.length);
    });
});
