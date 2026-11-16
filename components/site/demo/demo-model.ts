import type { AppTerminalLine, AppTerminalLineKind } from "@/components/ui/types";

// Pure model of the "Generate an SEO site" demo (spec v0.2 §7): a SCRIPTED simulation, no network,
// no AI call, nothing persisted. The hook (use-seo-demo.ts) only adds the timer and the location.
//   idle ──start──▶ running (1 line shown) ──step × n──▶ done (every line shown, result card)
//   idle ──start + reduced motion──▶ done at once
// A run belongs to the location it was started at (`at`): navigating elsewhere cancels it.
export type DemoStatus = "idle" | "running" | "done";

export interface DemoState {
    status: DemoStatus;
    /** Lines revealed so far. */
    shown: number;
    /** Location (route + slug) the run was started at; null when idle. */
    at: string | null;
    /** Run counter: a new run remounts the result card (focus moves to it again). */
    run: number;
}

/** Delay between two lines (ms): quick but readable. */
export const DEMO_STEP_MS = 420;

export const IDLE: DemoState = { status: "idle", shown: 0, at: null, run: 0 };

/** Starts a run (ignored while one is already running here: no double launch). */
export function startDemo(state: DemoState, count: number, reduced: boolean, at: string): DemoState {
    if (state.status === "running" && state.at === at) return state;
    const run = state.run + 1;
    if (reduced || count <= 1) return { status: "done", shown: Math.max(count, 0), at, run };
    return { status: "running", shown: 1, at, run };
}

/** One timer tick: reveals the next line, ends on the last one. */
export function stepDemo(state: DemoState, count: number): DemoState {
    if (state.status !== "running") return state;
    const shown = state.shown + 1;
    return shown >= count ? { ...state, status: "done", shown: count } : { ...state, shown };
}

/** Back to idle, keeping the run counter. */
export function cancelDemo(state: DemoState): DemoState {
    return { ...IDLE, run: state.run };
}

/** True when the run was started at another location (navigation cancels it). */
export function isStale(state: DemoState, location: string): boolean {
    return state.at !== null && state.at !== location;
}

/**
 * Terminal lines of the localized script: the first one says it is a demonstration (plain
 * output), the steps get a check mark, the last one closes the demo (plain output).
 */
export function demoLines(script: readonly string[], shown: number): AppTerminalLine[] {
    const last = script.length - 1;
    const kindAt = (i: number): AppTerminalLineKind => (i === 0 || i === last ? "output" : "success");
    return script.slice(0, shown).map((text, i) => ({ id: `demo-${i}`, kind: kindAt(i), text }));
}

/** Static thumbnail of the Axons preview matching the painted theme (public/demo/). */
export function demoThumbnail(theme: "light" | "dark"): string {
    return `/demo/axons-preview-fr-${theme}.webp`;
}
