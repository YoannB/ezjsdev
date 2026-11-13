import type { Meta, StoryObj } from "@storybook/react";
import { IdeIcon, type IdeIconName } from "./IdeIcon";

const NAMES: IdeIconName[] = [
    "files",
    "article",
    "note",
    "tree",
    "github",
    "preview",
    "terminal",
    "chevron",
    "folder",
    "folderOpen",
    "tsx",
    "md",
    "menu",
    "close",
    "external",
];

// Decorative line icons of the IDE shell (aria-hidden; the buttons and links carry the names).
function Gallery({ size }: { size: number }) {
    return (
        <ul className="ide-icon-gallery">
            {NAMES.map((name) => (
                <li key={name}>
                    <IdeIcon name={name} size={size} />
                    <code>{name}</code>
                </li>
            ))}
        </ul>
    );
}

const meta = {
    title: "Site/IDE/IdeIcon",
    component: Gallery,
    args: { size: 24 },
} satisfies Meta<typeof Gallery>;

export default meta;
type Story = StoryObj<typeof meta>;

export const All: Story = {};
