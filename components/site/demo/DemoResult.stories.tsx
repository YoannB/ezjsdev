import type { Meta, StoryObj } from "@storybook/react";
import { NextIntlClientProvider } from "next-intl";
import type { ComponentType } from "react";
import en from "../../../site/messages/en.json";
import { DemoResult } from "./DemoResult";

// Result card of the "Generate an SEO site" demo: the Axons preview (static thumbnail in the
// painted theme, URL, "Open the site" in a new tab). One column below 30rem of card width.
const withTranslations = (Story: ComponentType) => (
    <NextIntlClientProvider locale="en" messages={{ demo: en.demo }}>
        <div className="ide ide--story">
            <Story />
        </div>
    </NextIntlClientProvider>
);

const meta = {
    title: "Site/Demo/DemoResult",
    component: DemoResult,
    tags: ["autodocs"],
    decorators: [withTranslations],
} satisfies Meta<typeof DemoResult>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
/** The thumbnail cannot be loaded: a plain fallback box, the link stays usable. */
export const ThumbnailError: Story = { args: { thumbnail: "/demo/missing.webp" } };
/** Narrow (mobile): the thumbnail sits above the text. */
export const Narrow: Story = {
    decorators: [
        (Story) => (
            <div style={{ maxWidth: 343 }}>
                <Story />
            </div>
        ),
    ],
};
