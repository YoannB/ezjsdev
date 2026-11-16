import {
    cancelDemo,
    DEMO_STEP_MS,
    demoLines,
    demoThumbnail,
    IDLE,
    isStale,
    startDemo,
    stepDemo,
    type DemoState,
} from "@/components/site/demo/demo-model";
import { useSeoDemo } from "@/components/site/demo/use-seo-demo";
import { act, createElement } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

// Minimal renderHook (no @testing-library/react in the project): renders a probe, exposes the
// latest hook result, re-renders with new props, unmounts.
function renderHook<P, R>(
    hook: (props: P) => R,
    { initialProps }: { initialProps: P } = { initialProps: undefined as P },
) {
    const result = { current: undefined as R };
    const Probe = (props: { p: P }) => {
        result.current = hook(props.p);
        return null;
    };
    const root = createRoot(document.createElement("div"));
    act(() => root.render(createElement(Probe, { p: initialProps })));
    return {
        result,
        rerender: (p: P) => act(() => root.render(createElement(Probe, { p }))),
        unmount: () => act(() => root.unmount()),
    };
}

// ezjsdev "Generate an SEO site" demo: pure transitions (100% branches) and the timer hook.
const HOME = "/|";
const running = (shown: number, run = 1): DemoState => ({ status: "running", shown, at: HOME, run });

describe("demo-model — startDemo", () => {
    it("starts a run with the first line shown", () => {
        expect(startDemo(IDLE, 5, false, HOME)).toEqual({ status: "running", shown: 1, at: HOME, run: 1 });
    });
    it("reduced motion: every line and the result at once", () => {
        expect(startDemo(IDLE, 5, true, HOME)).toEqual({ status: "done", shown: 5, at: HOME, run: 1 });
    });
    it("a one-line script is done at once; an empty one too (never a negative count)", () => {
        expect(startDemo(IDLE, 1, false, HOME)).toMatchObject({ status: "done", shown: 1 });
        expect(startDemo(IDLE, 0, false, HOME)).toMatchObject({ status: "done", shown: 0 });
        expect(startDemo(IDLE, -1, false, HOME)).toMatchObject({ status: "done", shown: 0 });
    });
    it("no double launch while running at the same location", () => {
        const s = running(3);
        expect(startDemo(s, 5, false, HOME)).toBe(s);
    });
    it("replay after the end: a new run (counter + 1)", () => {
        const done: DemoState = { status: "done", shown: 5, at: HOME, run: 1 };
        expect(startDemo(done, 5, false, HOME)).toEqual({ status: "running", shown: 1, at: HOME, run: 2 });
    });
    it("running elsewhere does not block a start here", () => {
        expect(startDemo({ ...running(2), at: "/about|" }, 5, false, HOME)).toMatchObject({ at: HOME, shown: 1 });
    });
});

describe("demo-model — stepDemo", () => {
    it("reveals the next line", () => {
        expect(stepDemo(running(1), 3)).toEqual(running(2));
    });
    it("the last line ends the run", () => {
        expect(stepDemo(running(2), 3)).toEqual({ status: "done", shown: 3, at: HOME, run: 1 });
    });
    it("ignores ticks when not running", () => {
        expect(stepDemo(IDLE, 3)).toBe(IDLE);
    });
});

describe("demo-model — navigation", () => {
    it("a run started elsewhere is stale; idle or same location is not", () => {
        expect(isStale(running(2), "/about|")).toBe(true);
        expect(isStale(running(2), HOME)).toBe(false);
        expect(isStale(IDLE, HOME)).toBe(false);
    });
    it("cancel goes back to idle and keeps the run counter", () => {
        expect(cancelDemo(running(2, 4))).toEqual({ ...IDLE, run: 4 });
    });
});

describe("demo-model — lines and thumbnail", () => {
    it("first and last lines are plain output, steps are checked, only `shown` lines", () => {
        const lines = demoLines(["Demo", "a", "b", "End"], 4);
        expect(lines.map((l) => l.kind)).toEqual(["output", "success", "success", "output"]);
        expect(lines.map((l) => l.id)).toEqual(["demo-0", "demo-1", "demo-2", "demo-3"]);
        expect(demoLines(["Demo", "a", "End"], 2).map((l) => l.text)).toEqual(["Demo", "a"]);
    });
    it("thumbnail follows the painted theme", () => {
        expect(demoThumbnail("dark")).toBe("/demo/axons-preview-fr-dark.webp");
        expect(demoThumbnail("light")).toBe("/demo/axons-preview-fr-light.webp");
    });
});

describe("useSeoDemo — timer hook", () => {
    let reduced = false;
    beforeEach(() => {
        vi.useFakeTimers();
        reduced = false;
        vi.stubGlobal("matchMedia", (q: string) => ({ matches: q.includes("reduce") && reduced }));
    });
    afterEach(() => {
        vi.useRealTimers();
        vi.unstubAllGlobals();
    });

    it("idle, then one line per step until done", () => {
        const { result } = renderHook(() => useSeoDemo(3, HOME));
        expect(result.current.status).toBe("idle");
        act(() => result.current.start());
        expect(result.current).toMatchObject({ status: "running", shown: 1 });
        act(() => vi.advanceTimersByTime(DEMO_STEP_MS));
        expect(result.current).toMatchObject({ status: "running", shown: 2 });
        act(() => vi.advanceTimersByTime(DEMO_STEP_MS));
        expect(result.current).toMatchObject({ status: "done", shown: 3 });
        expect(vi.getTimerCount()).toBe(0); // interval cleared once done
    });

    it("reduced motion: done immediately, no timer", () => {
        reduced = true;
        const { result } = renderHook(() => useSeoDemo(4, HOME));
        act(() => result.current.start());
        expect(result.current).toMatchObject({ status: "done", shown: 4 });
        expect(vi.getTimerCount()).toBe(0);
    });

    it("no matchMedia: animated run", () => {
        vi.stubGlobal("matchMedia", undefined);
        const { result } = renderHook(() => useSeoDemo(3, HOME));
        act(() => result.current.start());
        expect(result.current.status).toBe("running");
    });

    it("a second start while running does not restart", () => {
        const { result } = renderHook(() => useSeoDemo(4, HOME));
        act(() => result.current.start());
        act(() => vi.advanceTimersByTime(DEMO_STEP_MS));
        act(() => result.current.start());
        expect(result.current.shown).toBe(2);
    });

    it("navigation cancels the run and coming back does not resume it", () => {
        const { result, rerender } = renderHook(({ at }) => useSeoDemo(4, at), { initialProps: { at: HOME } });
        act(() => result.current.start());
        rerender({ at: "/about|" });
        expect(result.current.status).toBe("idle");
        expect(vi.getTimerCount()).toBe(0);
        rerender({ at: HOME });
        act(() => vi.advanceTimersByTime(DEMO_STEP_MS * 4));
        expect(result.current).toMatchObject({ status: "idle", shown: 0, run: 1 });
    });

    it("unmount clears the interval", () => {
        const { result, unmount } = renderHook(() => useSeoDemo(4, HOME));
        act(() => result.current.start());
        expect(vi.getTimerCount()).toBe(1);
        unmount();
        expect(vi.getTimerCount()).toBe(0);
    });
});
