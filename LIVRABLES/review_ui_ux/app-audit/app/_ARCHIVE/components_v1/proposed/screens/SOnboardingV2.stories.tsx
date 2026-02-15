import type { Meta, StoryObj } from "@storybook/react";
import SOnboardingV2 from "./SOnboardingV2";

const meta: Meta<typeof SOnboardingV2> = {
    title: "Screens/SOnboardingV2",
    component: SOnboardingV2,
    parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof SOnboardingV2>;

export const Default: Story = {};
