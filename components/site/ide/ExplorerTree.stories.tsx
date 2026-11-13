import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ExplorerTree } from "./ExplorerTree";
import { storyTree } from "./ide-story-data";
import { ancestorsOf, isExpanded, visibleNodes, type TreeFolder } from "./tree-model";

// The explorer tree with the same derived state as IdeShell.tsx: folders open by default or
// because they contain the current file, the user's toggles win. Keyboard: arrows, Home/End,
// Enter/Space (APG navigation treeview). In the app the URL decides `currentId`.
function Harness({ currentId }: { currentId?: string }) {
    const [folders, setFolders] = useState<Record<string, boolean>>({});
    const ancestors = currentId ? ancestorsOf(storyTree, currentId) : [];
    const expanded = (folder: TreeFolder) => isExpanded(folder, folders, ancestors);
    return (
        <div className="ide ide--story">
            <aside className="ide-explorer" aria-label="Explorer">
                <ExplorerTree
                    nodes={storyTree}
                    visible={visibleNodes(storyTree, expanded)}
                    currentId={currentId}
                    expanded={expanded}
                    onToggle={(id, open) => setFolders((f) => ({ ...f, [id]: open }))}
                    onOpenFile={() => undefined}
                    ariaLabel="Site files"
                />
            </aside>
        </div>
    );
}

const meta = {
    title: "Site/IDE/ExplorerTree",
    component: Harness,
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "ARIA tree of the IDE shell: folders toggle, files are real links (role treeitem), the current file is marked with aria-current and a bar (not colour alone). Roving tabindex.",
            },
        },
    },
} satisfies Meta<typeof Harness>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HomeOpen: Story = { args: { currentId: "home/page" } };
/** A direct URL to an entry reveals its folder (closed by default). */
export const EntryRevealed: Story = { args: { currentId: "reminders/github" } };
/** A 404: no current file, the first node holds the tab stop. */
export const NoCurrentFile: Story = { args: {} };
