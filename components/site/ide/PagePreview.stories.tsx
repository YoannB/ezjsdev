import type { Meta, StoryObj } from "@storybook/react";
import { NextIntlClientProvider } from "next-intl";
import type { ComponentType } from "react";
import { storyFile, storyMessages } from "./ide-story-data";
import { PagePreview } from "./PagePreview";
import type { TreeFile } from "./tree-model";

// Body of the preview panel, contextual (constants/preview.ts): the page's OUTLINE (long pages and
// collection entries), BROWSER FRAMES around static site captures (home, Projects), or the SHARE
// CARD (every other page). The outline reads the real headings of the element `editorId`: the
// stories render a small page next to the panel for it.
const withTranslations = (Story: ComponentType) => (
    <NextIntlClientProvider locale="en" messages={storyMessages}>
        <div
            className="ide ide--story"
            style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) 22rem", gap: 24 }}
        >
            <main id="story-editor" className="ide-editor">
                <h1>GitHub reminder</h1>
                <h2>Configure git</h2>
                <p>Name, e-mail and default branch.</p>
                <h3>Aliases</h3>
                <p>Short commands for long ones.</p>
                <h2 id="branches">Branches</h2>
                <p>Create, switch, delete.</p>
                <h3>Rebase or merge</h3>
                <p>Keep the history readable.</p>
            </main>
            <div className="ide-panel__body">
                <Story />
            </div>
        </div>
    </NextIntlClientProvider>
);

const meta = {
    title: "Site/IDE/PagePreview",
    component: PagePreview,
    tags: ["autodocs"],
    decorators: [withTranslations],
    args: { siteUrl: "https://ezjs.dev", editorId: "story-editor" },
} satisfies Meta<typeof PagePreview>;

export default meta;
type Story = StoryObj<typeof meta>;

const page = (id: string, title: string, description: string, image?: string): TreeFile => ({
    ...storyFile,
    id,
    slug: undefined,
    route: `/${id.split("/")[0]}`,
    title,
    description,
    ...(image ? { image } : {}),
});

/** A collection entry: its outline (a heading with an id is a link, the others scroll to it). */
export const Outline: Story = { args: { file: storyFile } };

/** The home: the Axons capture in a browser frame (the painted theme's capture). */
export const BrowserHome: Story = { args: { file: page("home/page", "ezjsdev", "Home page.") } };

/** Projects: Axons, then idealco.fr. */
export const BrowserProjects: Story = {
    args: { file: page("projects/page", "Projects", "Axons and the idealco.fr redesign.") },
};

/** Any other page: how it shows when shared, then its other languages. No image: no image slot. */
export const ShareCard: Story = {
    args: { file: page("contact/page", "Contact", "Write to me about a project or a mission.") },
};

/** A page shared with an image (an entry's cover today; per-page OpenGraph images later). */
export const ShareCardWithImage: Story = {
    args: {
        file: page(
            "contact/page",
            "Contact",
            "Write to me about a project or a mission.",
            "/projects/idealco-home.webp",
        ),
    },
};

/** A 404: no file open. */
export const NoFile: Story = { args: { file: undefined } };
