import type { AppTerminalLine } from "@/components/ui/types";

// Read-only status output of the shell's terminal panel, styled by Axons' `.terminal` classes
// (styles/ui/terminal.css). NOT a live region: it only echoes the page the URL opened, which
// Next's route announcer already announces, so screen readers must not hear it twice. Axons'
// `Terminal` is always role="log" + aria-live="polite" (made for scripted sequences); a `live`
// switch there is listed as an Axons candidate. Plain text only (never innerHTML).
const MARK: Partial<Record<NonNullable<AppTerminalLine["kind"]>, string>> = { command: ">", success: "✓", error: "✗" };

export function StatusTerminal({ lines, ariaLabel }: { lines: readonly AppTerminalLine[]; ariaLabel: string }) {
    return (
        <section className="terminal">
            <div className="terminal__body" role="group" aria-label={ariaLabel} tabIndex={0}>
                {lines.map((line) => {
                    const kind = line.kind ?? "output";
                    const mark = MARK[kind];
                    return (
                        <div key={line.id} className={`terminal__line terminal__line--${kind}`}>
                            {mark ? (
                                <span className="terminal__mark" aria-hidden="true">
                                    {mark}
                                </span>
                            ) : null}
                            <span>{line.text}</span>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
