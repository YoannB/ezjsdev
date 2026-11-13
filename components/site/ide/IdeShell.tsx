"use client";
import { LanguageSwitcher, Logo, Tabs, ThemeToggle } from "@/components/ui";
import { CONSENT_REQUIRED, GITHUB_LINK_ENABLED, GITHUB_URL, SITE_NAME } from "@/constants/site";
import { useCookieConsent } from "@/hooks/use-consent";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Link, usePathname } from "@/i18n/routing";
import { cn } from "@/lib/cn";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ExplorerTree } from "./ExplorerTree";
import { IdeIcon } from "./IdeIcon";
import { IdePanel, type PanelState } from "./IdePanel";
import { PagePreview } from "./PagePreview";
import { StatusTerminal } from "./StatusTerminal";
import {
    ancestorsOf,
    closeTab,
    findCurrentFile,
    isExpanded,
    openTab,
    treeFiles,
    visibleNodes,
    type TreeFile,
    type TreeFolder,
    type TreeNode,
} from "./tree-model";

// The ezjsdev IDE shell (client part of the page frame, see SiteShell.tsx). THE URL IS THE SOURCE
// OF TRUTH: the current file is DERIVED from next-intl's usePathname() (logical route) + the slug
// param, so a direct URL, a reload and back/forward land on the right tab and tree item. Local
// state only holds user intent (open tabs, folders toggled, panels shown, drawer), never a copy
// of the URL (the React Compiler memoizes the derivations). The panels default to "auto" (CSS decides from the width: no hydration shift).
const HOME_ID = "home/page";
// Same breakpoints as the CSS (rem, so browser zoom switches layouts like a narrower screen).
const MQ_DESKTOP = "(min-width: 64rem)";
const MQ_WIDE = "(min-width: 80rem)";

export function IdeShell({ tree, siteUrl, children }: { tree: TreeNode[]; siteUrl: string; children: ReactNode }) {
    const t = useTranslations("ide");
    const tn = useTranslations("nav");
    const tc = useTranslations("cookie");
    const tf = useTranslations("footer");
    const router = useRouter();
    const route = usePathname();
    const params = useParams<{ slug?: string }>();
    const slug = typeof params?.slug === "string" ? decodeURIComponent(params.slug) : undefined;
    const { reopen } = useCookieConsent();

    const files = treeFiles(tree);
    const byId = new Map(files.map((f) => [f.id, f]));
    const current = findCurrentFile(files, route, slug);
    const currentId = current?.id;
    const locationKey = `${route}|${slug ?? ""}`;

    // Open tabs: the home is pinned; the current file joins the list when the URL changes
    // ("storing information from previous renders", react.dev — an update during render, no Effect).
    const [tabs, setTabs] = useState<string[]>(() => openTab([HOME_ID], currentId));
    const [seen, setSeen] = useState(currentId);
    if (currentId !== seen) {
        setSeen(currentId);
        setTabs(openTab(tabs, currentId));
    }
    const onCloseTab = (id: string) => {
        const { tabs: rest, next } = closeTab(tabs, id, currentId);
        setTabs(rest);
        const target = next ? byId.get(next) : undefined;
        if (target) router.push(target.href);
    };

    // Folders: explicit user choice, else declared default / contains the current file.
    const [folders, setFolders] = useState<Record<string, boolean>>({});
    const currentAncestors = currentId ? ancestorsOf(tree, currentId) : [];
    const expanded = (folder: TreeFolder) => isExpanded(folder, folders, currentAncestors);
    const visible = visibleNodes(tree, expanded);
    const onToggleFolder = (id: string, open: boolean) => setFolders((f) => ({ ...f, [id]: open }));

    // Explorer: a sidebar on desktop, a drawer below 64rem. The drawer belongs to the location it
    // was opened at, so any navigation (file click, back/forward) closes it without an Effect.
    const [sidebar, setSidebar] = useState(true);
    const [drawerFor, setDrawerFor] = useState<string | null>(null);
    const drawerOpen = drawerFor === locationKey;
    const burgerRef = useRef<HTMLButtonElement>(null);
    const explorerRef = useRef<HTMLElement>(null);
    const closeDrawer = () => {
        setDrawerFor(null);
        burgerRef.current?.focus();
    };
    // Focus moves INTO the drawer when it opens (DOM sync with an external system: focus).
    useEffect(() => {
        if (drawerOpen) explorerRef.current?.querySelector<HTMLElement>('[role="treeitem"][tabindex="0"]')?.focus();
    }, [drawerOpen]);

    // Each page starts at the top of the editor (the editor is the scroller on desktop).
    const editorRef = useRef<HTMLElement>(null);
    useEffect(() => {
        if (editorRef.current) editorRef.current.scrollTop = 0;
    }, [locationKey]);

    const desktop = useMediaQuery(MQ_DESKTOP);
    const wide = useMediaQuery(MQ_WIDE);
    const [preview, setPreview] = useState<PanelState>("auto");
    const [terminal, setTerminal] = useState<PanelState>("auto");
    const previewOpen = preview === "auto" ? wide : preview === "open";
    const terminalOpen = terminal === "auto" ? desktop : terminal === "open";

    // Real status only: the file the URL opened and its public address (nothing on a 404).
    const lines = current
        ? [
              { id: "open", kind: "command" as const, text: `open ${current.tabLabel}` },
              { id: "url", kind: "output" as const, text: new URL(current.href, siteUrl).toString() },
          ]
        : [];

    const tabItems = tabs
        .map((id) => byId.get(id))
        .filter((f): f is TreeFile => !!f)
        .map((f) => ({
            id: f.id,
            label: f.tabLabel,
            href: f.href,
            icon: <IdeIcon name={f.name.endsWith(".md") ? "md" : "tsx"} size={14} />,
            closable: f.id !== HOME_ID,
        }));

    const tagline = tn.has("tagline") ? tn("tagline") : null;

    return (
        <div
            className={cn("ide", drawerOpen && "is-drawer-open")}
            data-sidebar={sidebar ? "open" : "closed"}
            data-preview={preview}
            data-terminal={terminal}
        >
            <a className="ide-skip" href="#main">
                {t("skip")}
            </a>
            <header className="ide-titlebar">
                <button
                    ref={burgerRef}
                    type="button"
                    className="ide-btn ide-titlebar__menu"
                    aria-expanded={drawerOpen}
                    aria-controls="ide-explorer"
                    aria-label={drawerOpen ? t("closeExplorer") : t("openExplorer")}
                    onClick={() => (drawerOpen ? closeDrawer() : setDrawerFor(locationKey))}
                >
                    <IdeIcon name={drawerOpen ? "close" : "menu"} size={22} />
                </button>
                <Link href="/" className="ide-brand" aria-label={SITE_NAME}>
                    <Logo size={28} />
                    <span className="ide-brand__name">{SITE_NAME}</span>
                </Link>
                {tagline ? <p className="ide-titlebar__tagline">{tagline}</p> : null}
                <div className="ide-titlebar__tools">
                    <LanguageSwitcher />
                    <ThemeToggle />
                </div>
            </header>

            <nav className="ide-activity" aria-label={t("activity")} inert={drawerOpen || undefined}>
                <button
                    type="button"
                    className={cn("ide-activity__item", sidebar && "is-active")}
                    aria-expanded={sidebar}
                    aria-controls="ide-explorer"
                    aria-label={t("explorer")}
                    title={t("explorer")}
                    onClick={() => setSidebar((s) => !s)}
                >
                    <IdeIcon name="files" size={24} />
                </button>
                <Link
                    href="/articles"
                    className={cn("ide-activity__item", route.startsWith("/articles") && "is-active")}
                    aria-label={tn("articles")}
                    title={tn("articles")}
                >
                    <IdeIcon name="article" size={24} />
                </Link>
                <Link
                    href="/reminders"
                    className={cn("ide-activity__item", route.startsWith("/reminders") && "is-active")}
                    aria-label={tn("reminders")}
                    title={tn("reminders")}
                >
                    <IdeIcon name="note" size={24} />
                </Link>
                <Link
                    href="/sitemap"
                    className={cn("ide-activity__item", route === "/sitemap" && "is-active")}
                    aria-label={tn("sitemap")}
                    title={tn("sitemap")}
                >
                    <IdeIcon name="tree" size={24} />
                </Link>
                {GITHUB_LINK_ENABLED ? (
                    <a
                        href={GITHUB_URL}
                        className="ide-activity__item ide-activity__item--end"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={tn("github")}
                        title={tn("github")}
                    >
                        <IdeIcon name="github" size={24} />
                    </a>
                ) : null}
            </nav>

            <aside
                id="ide-explorer"
                ref={explorerRef}
                className="ide-explorer"
                aria-label={t("explorer")}
                onKeyDown={(e) => {
                    if (e.key === "Escape" && drawerOpen) closeDrawer();
                }}
            >
                <h2 className="ide-explorer__title">{t("explorer")}</h2>
                <ExplorerTree
                    nodes={tree}
                    visible={visible}
                    currentId={currentId}
                    expanded={expanded}
                    onToggle={onToggleFolder}
                    onOpenFile={() => setDrawerFor(null)}
                    ariaLabel={t("files")}
                />
            </aside>
            <button type="button" className="ide-backdrop" tabIndex={-1} aria-hidden="true" onClick={closeDrawer} />

            <div className="ide-workbench" inert={drawerOpen || undefined}>
                <div className="ide-editor-group">
                    <Tabs
                        items={tabItems}
                        activeId={currentId ?? ""}
                        ariaLabel={t("tabs")}
                        onClose={onCloseTab}
                        closeLabel={(label) => t("closeTab", { label })}
                        className="ide-tabs"
                    />
                    <div className="ide-split">
                        <main id="main" ref={editorRef} className="ide-editor" tabIndex={-1}>
                            {children}
                        </main>
                        <IdePanel
                            id="ide-preview"
                            className="ide-panel--preview"
                            title={t("preview")}
                            icon="preview"
                            state={preview}
                            open={previewOpen}
                            onToggle={() => setPreview(previewOpen ? "closed" : "open")}
                            showLabel={t("showPreview")}
                            hideLabel={t("hidePreview")}
                        >
                            <PagePreview file={current} siteUrl={siteUrl} />
                        </IdePanel>
                    </div>
                </div>
                <IdePanel
                    id="ide-terminal"
                    className="ide-panel--terminal"
                    title={t("terminal")}
                    icon="terminal"
                    state={terminal}
                    open={terminalOpen}
                    onToggle={() => setTerminal(terminalOpen ? "closed" : "open")}
                    showLabel={t("showTerminal")}
                    hideLabel={t("hideTerminal")}
                >
                    <StatusTerminal lines={lines} ariaLabel={t("terminalLog")} />
                </IdePanel>
            </div>

            <footer className="ide-statusbar" inert={drawerOpen || undefined}>
                <nav className="ide-statusbar__links" aria-label={t("statusbar")}>
                    <Link href="/sitemap">{tn("sitemap")}</Link>
                    <Link href="/legal">{tn("legal")}</Link>
                    <Link href="/privacy">{tn("privacy")}</Link>
                    <Link href="/cookies">{tn("cookies")}</Link>
                    {CONSENT_REQUIRED ? (
                        <button type="button" className="ide-statusbar__btn" onClick={reopen}>
                            {tc("manage")}
                        </button>
                    ) : null}
                    {GITHUB_LINK_ENABLED ? (
                        <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                            {tn("github")}
                        </a>
                    ) : null}
                </nav>
                <p className="ide-statusbar__meta">
                    {tf("rights", { year: new Date().getFullYear(), site: SITE_NAME })}
                </p>
            </footer>
        </div>
    );
}
