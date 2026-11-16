import type { Meta, StoryObj } from "@storybook/react";
import { NextIntlClientProvider } from "next-intl";
import type { ComponentType } from "react";
import en from "../../../site/messages/en.json";
import type { DemoStatus } from "./demo-model";
import { DemoContext, DemoTrigger } from "./DemoTrigger";

// The home's "Generate a site" block: Axons' `Button` (secondary, its halo/sheen animation) and the
// note saying it is a simulation, in each state of the demo. Static snapshots: no timer runs here.
const withTranslations = (Story: ComponentType) => (
    <NextIntlClientProvider locale="en" messages={{ demo: en.demo }}>
        <div className="ide ide--story">
            <Story />
        </div>
    </NextIntlClientProvider>
);

const noop = () => undefined;

function Home({ status }: { status: DemoStatus }) {
    return (
        <DemoContext value={{ status, start: noop }}>
            <DemoTrigger />
        </DemoContext>
    );
}

const meta = {
    title: "Site/Demo/DemoTrigger",
    component: Home,
    tags: ["autodocs"],
    decorators: [withTranslations],
} satisfies Meta<typeof Home>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Initial: "Generate a site". */
export const Idle: Story = { args: { status: "idle" } };
/** Running: Axons' loading state (spinner, disabled: no double launch). */
export const Running: Story = { args: { status: "running" } };
/** Done: "Replay the demo". */
export const Done: Story = { args: { status: "done" } };
