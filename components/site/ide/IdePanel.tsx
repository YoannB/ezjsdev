"use client";
import { cn } from "@/lib/cn";
import type { ReactNode } from "react";
import { IdeIcon, type IdeIconName } from "./IdeIcon";

/** "auto" = the CSS decides from the available width (no layout shift at hydration). */
export type PanelState = "auto" | "open" | "closed";

// A collapsible panel of the shell (preview, terminal). Its header bar stays visible and holds
// the toggle (aria-expanded + aria-controls); the body is hidden by CSS when closed
// (`data-state`), never unmounted. `open` is the EFFECTIVE state (auto resolved by a media query).
export function IdePanel({
    id,
    className,
    title,
    icon,
    state,
    open,
    onToggle,
    showLabel,
    hideLabel,
    children,
}: {
    id: string;
    className?: string;
    title: string;
    icon: IdeIconName;
    state: PanelState;
    open: boolean;
    onToggle: () => void;
    showLabel: string;
    hideLabel: string;
    children: ReactNode;
}) {
    const bodyId = `${id}-body`;
    return (
        <section id={id} className={cn("ide-panel", className)} data-state={state} aria-labelledby={`${id}-title`}>
            <div className="ide-panel__bar">
                <h2 id={`${id}-title`} className="ide-panel__title">
                    <IdeIcon name={icon} size={16} />
                    <span>{title}</span>
                </h2>
                <button
                    type="button"
                    className="ide-btn ide-panel__toggle"
                    aria-expanded={open}
                    aria-controls={bodyId}
                    aria-label={open ? hideLabel : showLabel}
                    title={open ? hideLabel : showLabel}
                    onClick={onToggle}
                >
                    <IdeIcon name="chevron" size={16} className="ide-panel__chevron" />
                </button>
            </div>
            <div id={bodyId} className="ide-panel__body">
                {children}
            </div>
        </section>
    );
}
