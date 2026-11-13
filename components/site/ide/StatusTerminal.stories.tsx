import type { Meta, StoryObj } from "@storybook/react";
import { StatusTerminal } from "./StatusTerminal";

// The terminal panel's status output: the file the URL opened and its public address. Not a live
// region (Next's route announcer already announces the navigation).
const meta = {
    title: "Site/IDE/StatusTerminal",
    component: StatusTerminal,
    tags: ["autodocs"],
    decorators: [
        (Story) => (
            <div className="ide ide--story">
                <Story />
            </div>
        ),
    ],
    args: { ariaLabel: "Terminal output" },
} satisfies Meta<typeof StatusTerminal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OpenFile: Story = {
    args: {
        lines: [
            { id: "open", kind: "command", text: "open Reminders/page.tsx" },
            { id: "url", kind: "output", text: "https://ezjs.dev/en/reminders" },
        ],
    },
};
/** A 404: no file, nothing to report. */
export const Empty: Story = { args: { lines: [] } };
