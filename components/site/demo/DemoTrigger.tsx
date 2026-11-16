"use client";
import { cn } from "@/lib/cn";
import { useTranslations } from "next-intl";
import { createContext, useContext } from "react";
import type { DemoStatus } from "./demo-model";

// The demo is owned by the IDE shell (its terminal shows it); triggers placed anywhere in the shell
// (the home body, the terminal bar) reach it through this context.
export interface DemoControls {
    status: DemoStatus;
    start: () => void;
}
export const DemoContext = createContext<DemoControls | null>(null);

/**
 * "Generate an SEO site" button. A real <button>; while the demo runs it stays focusable but is
 * `aria-disabled` and ignores clicks (no double launch, focus is not lost), then becomes "Replay".
 */
export function DemoButton({ className, short = false }: { className?: string; short?: boolean }) {
    const t = useTranslations("demo");
    const demo = useContext(DemoContext);
    if (!demo) return null;
    const running = demo.status === "running";
    const label = demo.status === "done" ? t(short ? "replayShort" : "replay") : running ? t("running") : t("trigger");
    return (
        <button
            type="button"
            className={cn("ez-demo-btn", className)}
            aria-disabled={running || undefined}
            data-demo-status={demo.status}
            onClick={running ? undefined : demo.start}
        >
            {label}
        </button>
    );
}

/** Home block: the button and a sober note saying it is a simulation. */
export function DemoTrigger() {
    const t = useTranslations("demo");
    return (
        <div className="ez-home__demo">
            <DemoButton className="ez-home__action ez-home__action--demo" />
            <p className="ez-home__demo-note">{t("note")}</p>
        </div>
    );
}
