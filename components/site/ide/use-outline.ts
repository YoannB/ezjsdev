"use client";
import { useState, useSyncExternalStore } from "react";
import { activeSection, extractOutline, sameOutline, type OutlineItem } from "./preview-model";

// The outline of the page shown in the editor, read from the DOM (the REAL h2/h3 the page
// rendered), and the section being read. An EXTERNAL STORE (useSyncExternalStore), not an Effect
// that copies state: the DOM is the external system, observed by
// - a MutationObserver on the editor: the page streams in, client navigation swaps it;
// - an IntersectionObserver whose box is everything ABOVE the reading line (30 % of the
//   scroller's height): a heading changes state exactly when it crosses that line, whatever the
//   scroll speed. The scroller is the editor on desktop, the viewport below 64rem (the document
//   scrolls there), re-checked on resize.
// The server snapshot is empty and not `ready`: the outline appears after hydration, without mismatch.
// Pure parts (extraction, active section): preview-model.ts.

export interface OutlineSnapshot {
    /** The page has been read at least once (false on the server and during hydration). */
    readonly ready: boolean;
    readonly items: readonly OutlineItem[];
    /** Position in `items` of the section being read, -1 above the first heading. */
    readonly active: number;
}

const EMPTY: OutlineSnapshot = { ready: false, items: [], active: -1 };
const getServerSnapshot = () => EMPTY;
/** Reading line, as a fraction of the scroller's height from its top. */
const LINE = 0.3;

function scrolls(el: HTMLElement): boolean {
    return /(auto|scroll)/.test(getComputedStyle(el).overflowY);
}

export interface OutlineStore {
    subscribe(listener: () => void): () => void;
    getSnapshot(): OutlineSnapshot;
    /** The heading element of an outline item (to scroll to it), if still in the page. */
    headingOf(item: OutlineItem): HTMLElement | undefined;
}

export function createOutlineStore(rootId: string): OutlineStore {
    let snapshot = EMPTY;
    let headings: HTMLElement[] = [];
    let mutations: MutationObserver | null = null;
    let crossings: IntersectionObserver | null = null;
    const listeners = new Set<() => void>();

    const set = (next: OutlineSnapshot) => {
        if (next === snapshot) return;
        snapshot = next;
        listeners.forEach((l) => l());
    };

    const active = (items: readonly OutlineItem[]) => {
        const box = crossings?.root instanceof HTMLElement ? crossings.root.getBoundingClientRect() : null;
        const top = box ? box.top : 0;
        const height = box ? box.height : window.innerHeight;
        const tops = items.map((item) => headings[item.index].getBoundingClientRect().top - top);
        return activeSection(tops, height * LINE);
    };

    const onCrossing = () => {
        const next = active(snapshot.items);
        if (next !== snapshot.active) set({ ...snapshot, active: next });
    };

    const scan = () => {
        const root = document.getElementById(rootId);
        headings = root ? Array.from(root.querySelectorAll<HTMLElement>("h2, h3")) : [];
        const found = extractOutline(
            headings.map((h) => ({ level: Number(h.tagName.slice(1)), id: h.id, text: h.textContent ?? "" })),
        );
        const items = sameOutline(found, snapshot.items) ? snapshot.items : found;
        // (Re)observe the current elements: the page may have swapped them for equal ones.
        const scroller = root && scrolls(root) ? root : null;
        if (!crossings || crossings.root !== scroller) {
            crossings?.disconnect();
            crossings = new IntersectionObserver(onCrossing, {
                root: scroller,
                rootMargin: `100000px 0px -${(1 - LINE) * 100}% 0px`,
            });
        } else {
            crossings.disconnect();
        }
        for (const item of items) crossings.observe(headings[item.index]);
        const current = active(items);
        set(
            snapshot.ready && items === snapshot.items && current === snapshot.active
                ? snapshot
                : { ready: true, items, active: current },
        );
    };

    return {
        subscribe(listener) {
            listeners.add(listener);
            if (listeners.size === 1) {
                mutations = new MutationObserver(scan);
                const root = document.getElementById(rootId);
                if (root) mutations.observe(root, { childList: true, subtree: true, characterData: true });
                window.addEventListener("resize", scan);
                scan();
            }
            return () => {
                listeners.delete(listener);
                if (listeners.size) return;
                mutations?.disconnect();
                crossings?.disconnect();
                window.removeEventListener("resize", scan);
                mutations = crossings = null;
                headings = [];
                snapshot = EMPTY;
            };
        },
        getSnapshot: () => snapshot,
        headingOf: (item) => (headings[item.index]?.isConnected ? headings[item.index] : undefined),
    };
}

/** Outline of the element `#rootId` (the editor's `<main>`), live. */
export function useOutline(rootId: string) {
    const [store] = useState(() => createOutlineStore(rootId));
    const snapshot = useSyncExternalStore(store.subscribe, store.getSnapshot, getServerSnapshot);
    return { ...snapshot, headingOf: store.headingOf };
}
