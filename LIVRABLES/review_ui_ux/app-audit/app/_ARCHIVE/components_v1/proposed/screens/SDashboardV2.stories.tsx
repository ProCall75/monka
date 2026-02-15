import type { Meta, StoryObj } from "@storybook/react";
import SDashboardV2 from "./SDashboardV2";

const meta: Meta<typeof SDashboardV2> = {
    title: "Screens/SDashboardV2",
    component: SDashboardV2,
    parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof SDashboardV2>;

export const Default: Story = {};
