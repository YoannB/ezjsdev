"use client";
import { useState, useSyncExternalStore } from "react";
import { activeSection, extractOutline, readingLine, sameOutline, type OutlineItem } from "./preview-model";

// The outline of the page shown in the editor, read from the DOM (the REAL h2/h3 the page
// rendered), and the section being read. An EXTERNAL STORE (useSyncExternalStore), not an Effect
// that copies state: the DOM is the external system, observed by
// - a MutationObserver on the editor: the page streams in, client navigation swaps it;
// - the scroller's `scroll` events (one measure per frame): the section being read is the last
//   heading above the READING LINE (preview-model.ts `readingLine`: 30 % of the scroller's
//   height, sliding to the bottom edge over the end of the scroll range, so the last sections of
//   a short page are reached too). The scroller is the editor on desktop, the viewport below
//   64rem (the document scrolls there), re-checked on window resize;
// - a ResizeObserver on the editor and its content: the editor grows or shrinks without any
//   scroll when the terminal below it folds or unfolds, and so does the page when images load.
// An outline click PINS its item as the section being read (`select`): several last headings may
// share the bottom of the scroll range, so the scroll position alone cannot tell which one was
// chosen. The pin lasts until the visitor scrolls by themself (wheel, touch, pointer, scroll keys).
// The server snapshot is empty and not `ready`: the outline appears after hydration, without mismatch.
// Pure parts (extraction, reading line, active section): preview-model.ts.

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
/** Keys that scroll the editor or the page: the visitor takes the reading back from a click. */
const SCROLL_KEYS = new Set(["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "]);
/** Events through which the visitor scrolls by themself (a programmatic scroll sends none). */
const INTENT_EVENTS = ["wheel", "touchstart", "pointerdown", "keydown"] as const;

function scrolls(el: HTMLElement): boolean {
    return /(auto|scroll)/.test(getComputedStyle(el).overflowY);
}

export interface OutlineStore {
    subscribe(listener: () => void): () => void;
    getSnapshot(): OutlineSnapshot;
    /** The heading element of an outline item (to scroll to it), if still in the page. */
    headingOf(item: OutlineItem): HTMLElement | undefined;
    /** The visitor chose this item in the outline: it is the section being read. */
    select(item: OutlineItem): void;
}

export function createOutlineStore(rootId: string): OutlineStore {
    let snapshot = EMPTY;
    let headings: HTMLElement[] = [];
    /** The editor when it scrolls (desktop), else null: the document scrolls. */
    let scroller: HTMLElement | null = null;
    let scrollTarget: HTMLElement | Window | null = null;
    /** Position in `snapshot.items` chosen by a click, until the visitor scrolls. */
    let pinned: number | null = null;
    let frame = 0;
    let mutations: MutationObserver | null = null;
    let sizes: ResizeObserver | null = null;
    const listeners = new Set<() => void>();

    const set = (next: OutlineSnapshot) => {
        if (next === snapshot) return;
        snapshot = next;
        listeners.forEach((l) => l());
    };

    const active = (items: readonly OutlineItem[]) => {
        if (pinned !== null && pinned < items.length) return pinned;
        const top = scroller ? scroller.getBoundingClientRect().top + scroller.clientTop : 0;
        const height = scroller ? scroller.clientHeight : window.innerHeight;
        const scrollTop = scroller ? scroller.scrollTop : window.scrollY;
        const max = scroller
            ? scroller.scrollHeight - scroller.clientHeight
            : document.documentElement.scrollHeight - window.innerHeight;
        const tops = items.map((item) => headings[item.index].getBoundingClientRect().top - top);
        return activeSection(tops, readingLine(height, scrollTop, max, LINE));
    };

    const update = () => {
        frame = 0;
        const next = active(snapshot.items);
        if (next !== snapshot.active) set({ ...snapshot, active: next });
    };
    /** One measure per frame, whatever the number of scroll/resize events. */
    const schedule = () => {
        if (!frame) frame = requestAnimationFrame(update);
    };

    const onIntent = (event: Event) => {
        if (pinned === null) return;
        if (event instanceof KeyboardEvent && !SCROLL_KEYS.has(event.key)) return;
        pinned = null;
        schedule();
    };

    const scan = () => {
        const root = document.getElementById(rootId);
        headings = root ? Array.from(root.querySelectorAll<HTMLElement>("h2, h3")) : [];
        const found = extractOutline(
            headings.map((h) => ({ level: Number(h.tagName.slice(1)), id: h.id, text: h.textContent ?? "" })),
        );
        const same = sameOutline(found, snapshot.items);
        const items = same ? snapshot.items : found;
        if (!same) pinned = null; // another page: a click on the previous one no longer holds
        // The scroller may change with the layout (desktop editor ↔ document).
        scroller = root && scrolls(root) ? root : null;
        const target = scroller ?? window;
        if (target !== scrollTarget) {
            scrollTarget?.removeEventListener("scroll", schedule);
            target.addEventListener("scroll", schedule, { passive: true });
            scrollTarget = target;
        }
        // (Re)observe the editor and its current content: the page may have swapped it.
        sizes?.disconnect();
        if (root && sizes) {
            sizes.observe(root);
            for (const child of Array.from(root.children)) sizes.observe(child);
        }
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
                sizes = new ResizeObserver(schedule);
                const root = document.getElementById(rootId);
                if (root) mutations.observe(root, { childList: true, subtree: true, characterData: true });
                window.addEventListener("resize", scan);
                for (const type of INTENT_EVENTS) window.addEventListener(type, onIntent, { passive: true });
                scan();
            }
            return () => {
                listeners.delete(listener);
                if (listeners.size) return;
                mutations?.disconnect();
                sizes?.disconnect();
                scrollTarget?.removeEventListener("scroll", schedule);
                window.removeEventListener("resize", scan);
                for (const type of INTENT_EVENTS) window.removeEventListener(type, onIntent);
                if (frame) cancelAnimationFrame(frame);
                mutations = sizes = null;
                scroller = scrollTarget = null;
                pinned = null;
                frame = 0;
                headings = [];
                snapshot = EMPTY;
            };
        },
        getSnapshot: () => snapshot,
        headingOf: (item) => (headings[item.index]?.isConnected ? headings[item.index] : undefined),
        select(item) {
            const index = snapshot.items.indexOf(item);
            if (index < 0) return;
            pinned = index;
            if (index !== snapshot.active) set({ ...snapshot, active: index });
        },
    };
}

/** Outline of the element `#rootId` (the editor's `<main>`), live. */
export function useOutline(rootId: string) {
    const [store] = useState(() => createOutlineStore(rootId));
    const snapshot = useSyncExternalStore(store.subscribe, store.getSnapshot, getServerSnapshot);
    return { ...snapshot, headingOf: store.headingOf, select: store.select };
}
