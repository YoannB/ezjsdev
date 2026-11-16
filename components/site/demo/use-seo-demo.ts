"use client";
import { useCallback, useEffect, useState } from "react";
import { cancelDemo, DEMO_STEP_MS, IDLE, isStale, startDemo, stepDemo, type DemoState } from "./demo-model";

// Timing of the scripted demo (pure transitions in demo-model.ts). Client state only, nothing
// persisted, no network. The interval is the external system: setState happens in its callback,
// never in the effect body; it is cleared on unmount and as soon as the run stops running.
// Navigation cancels a run: when `location` changes, the state is reset DURING render (react.dev
// "storing information from previous renders", like the shell's tabs), so the effect cleanup
// clears the interval and coming back does not resume an old run.
// prefers-reduced-motion is read in the start handler: the whole script then shows at once.
export function useSeoDemo(count: number, location: string, stepMs = DEMO_STEP_MS) {
    const [state, setState] = useState<DemoState>(IDLE);
    const current = isStale(state, location) ? cancelDemo(state) : state;
    if (current !== state) setState(current);

    const running = current.status === "running";
    useEffect(() => {
        if (!running) return;
        const id = window.setInterval(() => setState((s) => stepDemo(s, count)), stepMs);
        return () => window.clearInterval(id);
    }, [running, count, stepMs]);

    const start = useCallback(() => {
        const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
        setState((s) => startDemo(s, count, reduced, location));
    }, [count, location]);

    return { ...current, start };
}

export type SeoDemo = ReturnType<typeof useSeoDemo>;
