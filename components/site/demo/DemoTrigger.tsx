"use client";
import { Button } from "@/components/ui";
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
 * "Generate a site" button: Axons' `Button` (its gradient/halo animation, a real <button>). While
 * the demo runs it is in Axons' `busy` state (spinner, `aria-disabled` + `aria-busy`, no native
 * `disabled`: it KEEPS the focus and ignores clicks, so no double launch), then becomes "Replay". `short`: the compact label and size of the terminal bar.
 */
export function DemoButton({ className, short = false }: { className?: string; short?: boolean }) {
    const t = useTranslations("demo");
    const demo = useContext(DemoContext);
    if (!demo) return null;
    const running = demo.status === "running";
    const label = demo.status === "done" ? t(short ? "replayShort" : "replay") : running ? t("running") : t("trigger");
    return (
        <Button
            variant="secondary"
            size={short ? "sm" : "md"}
            className={className}
            busy={running}
            onClick={demo.start}
        >
            {label}
        </Button>
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
