import type { Meta, StoryObj } from "@storybook/react";
import { NextIntlClientProvider } from "next-intl";
import type { ComponentType } from "react";
import { storyFile, storyMessages } from "./ide-story-data";
import { PagePreview } from "./PagePreview";

// Body of the preview panel: public URL, search-result snippet from the page's real title and
// description, and the page in the other languages.
const withTranslations = (Story: ComponentType) => (
    <NextIntlClientProvider locale="en" messages={storyMessages}>
        <div className="ide ide--story">
            <Story />
        </div>
    </NextIntlClientProvider>
);

const meta = {
    title: "Site/IDE/PagePreview",
    component: PagePreview,
    tags: ["autodocs"],
    decorators: [withTranslations],
    args: { siteUrl: "https://ezjs.dev" },
} satisfies Meta<typeof PagePreview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Entry: Story = { args: { file: storyFile } };
/** A 404: no file open. */
export const NoFile: Story = { args: { file: undefined } };
