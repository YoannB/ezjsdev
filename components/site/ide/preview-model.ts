// PURE module (no React, no DOM access, no next-intl): what the preview panel shows for the open
// page, and the outline ("plan") of a page built from its real headings. The declaration (which
// page gets which mode, which site captures exist) lives in site/preview.ts; the DOM reading and the
// observers live in use-outline.ts. Unit tests: tests/unit/ide-preview.test.ts.

/** A static capture of a public site, shown in a browser frame (never a live preview). */
export interface SiteCapture {
    /** Proper name of the site ("Axons", "idealco.fr"): not translated. */
    readonly name: string;
    /** Public URL of the captured page (address bar + "Open the site"). */
    readonly url: `https://${string}`;
    /** Site-absolute image, 640×400. */
    readonly image: string;
    /** Capture of the dark theme of the same page; `image` is then the light one. */
    readonly imageDark?: string;
}

export interface PreviewDecl {
    /** File ids (site/explorer.ts) shown as an outline; collection entries always are. */
    readonly outline: readonly string[];
    /** File ids shown as browser frames, with the ids of the captures to show, in order. */
    readonly browser: Readonly<Record<string, readonly string[]>>;
    /** Every capture, by id (its alt text: `ide.captureAlt.<id>` in site/messages). */
    readonly captures: Readonly<Record<string, SiteCapture>>;
}

/** A capture with its declaration id. */
export type ShownCapture = SiteCapture & { readonly id: string };

export type PreviewMode =
    | { readonly kind: "empty" }
    | { readonly kind: "outline" }
    | { readonly kind: "browser"; readonly captures: readonly ShownCapture[] }
    | { readonly kind: "share" };

/**
 * Mode of the panel for the open file: nothing open (404) → empty; a declared browser page →
 * its captures (an unknown capture id is skipped; none left → share card); a collection entry
 * (it has a slug) or a declared long page → outline; anything else → the share card.
 */
export function previewMode(
    file: { readonly id: string; readonly slug?: string } | undefined,
    decl: PreviewDecl,
): PreviewMode {
    if (!file) return { kind: "empty" };
    const ids = decl.browser[file.id];
    if (ids) {
        const captures = ids.flatMap((id) => (decl.captures[id] ? [{ ...decl.captures[id], id }] : []));
        return captures.length ? { kind: "browser", captures } : { kind: "share" };
    }
    if (file.slug !== undefined || decl.outline.includes(file.id)) return { kind: "outline" };
    return { kind: "share" };
}

/** A heading as read from the page (tag level, id attribute, text content). */
export interface HeadingSource {
    readonly level: number;
    readonly id: string;
    readonly text: string;
}

export interface OutlineItem {
    /** Position among the page's headings (the DOM element to scroll to). */
    readonly index: number;
    readonly level: 2 | 3;
    readonly text: string;
    /** The heading's own anchor; absent when the page renders it without an id. */
    readonly id?: string;
}

/**
 * The outline: h2 and h3 only (the h1 is the page title), whitespace collapsed, empty headings
 * dropped. `index` stays the heading's position in the source list, so a dropped heading never
 * shifts the element a later item scrolls to.
 */
export function extractOutline(headings: readonly HeadingSource[]): OutlineItem[] {
    const items: OutlineItem[] = [];
    headings.forEach((h, index) => {
        if (h.level !== 2 && h.level !== 3) return;
        const text = h.text.replace(/\s+/g, " ").trim();
        if (!text) return;
        const id = h.id.trim();
        items.push(id ? { index, level: h.level, text, id } : { index, level: h.level, text });
    });
    return items;
}

/** Two outlines list the same headings (keeps the store snapshot stable across DOM mutations). */
export function sameOutline(a: readonly OutlineItem[], b: readonly OutlineItem[]): boolean {
    return (
        a.length === b.length &&
        a.every((x, i) => x.index === b[i].index && x.level === b[i].level && x.text === b[i].text && x.id === b[i].id)
    );
}

/**
 * The section being read: the LAST heading whose top has passed the reading line (`tops` in
 * document order, same coordinates as `line`); -1 while the reader is above the first one.
 */
export function activeSection(tops: readonly number[], line: number): number {
    let active = -1;
    tops.forEach((top, i) => {
        if (top <= line) active = i;
    });
    return active;
}

/** Host + path of a URL as shown in an address bar or a share card ("ezjs.dev/fr/contact"). */
export function displayUrl(url: string): string {
    return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

/** Domain of a URL ("ezjs.dev"), as a share card prints it. */
export function displayDomain(url: string): string {
    return new URL(url).host;
}
