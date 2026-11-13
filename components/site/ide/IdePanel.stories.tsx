import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { IdePanel } from "./IdePanel";

// A collapsible panel (preview, terminal): the bar stays, the body is hidden by CSS when closed.
function Harness({ initiallyOpen }: { initiallyOpen: boolean }) {
    const [open, setOpen] = useState(initiallyOpen);
    return (
        <div className="ide ide--story">
            <IdePanel
                id="story-panel"
                className="ide-panel--terminal"
                title="Terminal"
                icon="terminal"
                state={open ? "open" : "closed"}
                open={open}
                onToggle={() => setOpen((o) => !o)}
                showLabel="Show the terminal"
                hideLabel="Hide the terminal"
            >
                <p className="ide-preview__empty">Panel body.</p>
            </IdePanel>
        </div>
    );
}

const meta = {
    title: "Site/IDE/IdePanel",
    component: Harness,
    tags: ["autodocs"],
} satisfies Meta<typeof Harness>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = { args: { initiallyOpen: true } };
export const Closed: Story = { args: { initiallyOpen: false } };
