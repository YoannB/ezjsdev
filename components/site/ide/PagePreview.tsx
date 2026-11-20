"use client";
import { PREVIEW } from "@/constants/preview";
import { useTranslations } from "next-intl";
import { BrowserFrame } from "./BrowserFrame";
import { previewMode, type OutlineItem, type PreviewDecl } from "./preview-model";
import { PreviewOutline } from "./PreviewOutline";
import { ShareCard } from "./ShareCard";
import type { TreeFile } from "./tree-model";
import { useOutline } from "./use-outline";

// Body of the preview panel, CONTEXTUAL like VS Code's side views (spec §6.4: a rendering panel,
// not a second navigation). What it shows depends on the open page (constants/preview.ts):
// - long pages and every collection entry: the page's OUTLINE (its real h2/h3), the section being
//   read highlighted while the editor scrolls; a page without headings falls back to the share card;
// - the home and Projects: BROWSER FRAMES around static captures of the real sites;
// - every other page: the SHARE CARD (how the page shows when its link is shared).
export function PagePreview({
    file,
    siteUrl,
    decl = PREVIEW,
    editorId = "main",
}: {
    file: TreeFile | undefined;
    siteUrl: string;
    /** What each page shows (stories pass their own). */
    decl?: PreviewDecl;
    /** Id of the element whose headings make the outline (the editor's <main>). */
    editorId?: string;
}) {
    const t = useTranslations("ide");
    const mode = previewMode(file, decl);
    if (mode.kind === "empty" || !file) return <p className="ide-preview__empty">{t("previewEmpty")}</p>;
    return (
        <div className="ide-preview" data-mode={mode.kind}>
            {mode.kind === "browser" ? (
                mode.captures.map((capture) => <BrowserFrame key={capture.id} capture={capture} />)
            ) : mode.kind === "outline" ? (
                <OutlineView file={file} siteUrl={siteUrl} editorId={editorId} />
            ) : (
                <ShareCard file={file} siteUrl={siteUrl} />
            )}
        </div>
    );
}

/** The live outline of the editor; the share card when the page has no h2/h3. */
function OutlineView({ file, siteUrl, editorId }: { file: TreeFile; siteUrl: string; editorId: string }) {
    const { ready, items, active, headingOf, select } = useOutline(editorId);
    // Before the first read (server render, hydration): an empty body, so a page WITH an outline
    // never flashes its share card.
    if (!ready) return null;
    if (!items.length) return <ShareCard file={file} siteUrl={siteUrl} />;
    const onSelect = (item: OutlineItem) => {
        select(item);
        // A heading with an id is a link: the browser scrolls to its anchor by itself.
        if (item.id) return;
        const smooth = !window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
        headingOf(item)?.scrollIntoView({ block: "start", behavior: smooth ? "smooth" : "auto" });
    };
    return <PreviewOutline items={items} active={active} onSelect={onSelect} />;
}
