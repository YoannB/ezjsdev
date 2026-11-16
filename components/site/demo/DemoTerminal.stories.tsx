import type { Meta, StoryObj } from "@storybook/react";
import { NextIntlClientProvider } from "next-intl";
import type { ComponentType } from "react";
import axonsEn from "../../../messages/en.json";
import en from "../../../site/messages/en.json";
import type { DemoStatus } from "./demo-model";
import { DemoTerminal } from "./DemoTerminal";
import { DemoButton, DemoContext } from "./DemoTrigger";

// The terminal panel during the demo (states of spec v0.2 §7.4), with the terminal-bar button in
// the matching state (Axons `Button`, size sm). Static snapshots: no timer runs here.
const withTranslations = (Story: ComponentType) => (
    <NextIntlClientProvider locale="en" messages={{ demo: en.demo, common: axonsEn.common }}>
        <div className="ide ide--story">
            <Story />
        </div>
    </NextIntlClientProvider>
);

const LINES = en.demo.lines.length;
const noop = () => undefined;

function Panel({ status, shown }: { status: DemoStatus; shown: number }) {
    return (
        <DemoContext value={{ status, start: noop }}>
            <div style={{ display: "grid", gap: 12 }}>
                <div>
                    <DemoButton short className="ide-panel__action" />
                </div>
                {status === "idle" ? null : <DemoTerminal status={status} shown={shown} run={1} />}
            </div>
        </DemoContext>
    );
}

const meta = {
    title: "Site/Demo/DemoTerminal",
    component: Panel,
    tags: ["autodocs"],
    decorators: [withTranslations],
} satisfies Meta<typeof Panel>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Initial: only the button (the terminal shows the page status). */
export const Idle: Story = { args: { status: "idle", shown: 0 } };
/** Running: lines appear one by one, the button is in Axons' busy state (spinner, aria-busy, keeps the focus). */
export const Running: Story = { args: { status: "running", shown: 4 } };
/** Done: every line, the result card, the button replays. */
export const Done: Story = { args: { status: "done", shown: LINES } };
