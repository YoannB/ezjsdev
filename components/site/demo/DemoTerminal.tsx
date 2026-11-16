"use client";
import { Terminal } from "@/components/ui";
import { useTranslations } from "next-intl";
import { demoLines, type DemoStatus } from "./demo-model";
import { DemoResult } from "./DemoResult";

// Body of the terminal panel while the demo is shown: the scripted lines (Axons `Terminal`,
// `live={false}`: lines are NOT announced one by one — the shell's role="status" region announces
// the start and the result) and, once done, the result card (beside the lines when the panel is
// wide enough, below otherwise: container query in site/demo.css).
export function DemoTerminal({ status, shown, run }: { status: DemoStatus; shown: number; run: number }) {
    const t = useTranslations("demo");
    const script = t.raw("lines") as string[];
    return (
        <div className="ez-demo">
            <div className="ez-demo__grid" data-status={status}>
                <Terminal
                    ariaLabel={t("terminalLabel")}
                    lines={demoLines(script, shown)}
                    running={status === "running"}
                    live={false}
                    rows={script.length * 2}
                    className="ez-demo__log"
                />
                {status === "done" ? <DemoResult key={run} focusOnMount /> : null}
            </div>
        </div>
    );
}
