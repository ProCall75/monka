import type { Meta, StoryObj } from "@storybook/react";
import SAppDemo from "./SAppDemo";

const meta: Meta<typeof SAppDemo> = {
    title: "Screens/SAppDemo",
    component: SAppDemo,
    parameters: {
        layout: "fullscreen",
    },
};

export default meta;
type Story = StoryObj<typeof SAppDemo>;

export const ParcoursComplet: Story = {
    name: "Demo Monka V2",
};
