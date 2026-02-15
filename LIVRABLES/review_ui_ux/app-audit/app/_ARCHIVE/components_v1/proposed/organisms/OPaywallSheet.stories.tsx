import type { Meta, StoryObj } from "@storybook/react";
import OPaywallSheet from "./OPaywallSheet";

const meta: Meta<typeof OPaywallSheet> = {
    title: "Organisms/OPaywallSheet",
    component: OPaywallSheet,
    parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof OPaywallSheet>;

export const Open: Story = {
    args: {
        isOpen: true,
    },
};

export const Closed: Story = {
    args: {
        isOpen: false,
    },
};
