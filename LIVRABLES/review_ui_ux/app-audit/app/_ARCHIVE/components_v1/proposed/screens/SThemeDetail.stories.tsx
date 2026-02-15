import type { Meta, StoryObj } from "@storybook/react";
import SThemeDetail from "./SThemeDetail";

const meta: Meta<typeof SThemeDetail> = {
    title: "Screens/SThemeDetail",
    component: SThemeDetail,
    parameters: { layout: "fullscreen" },
    argTypes: {
        theme: {
            control: { type: "select" },
            options: ["sante", "admin", "bienetre"],
        },
    },
};

export default meta;
type Story = StoryObj<typeof SThemeDetail>;

export const Sante: Story = {
    args: { theme: "sante" },
};

export const Admin: Story = {
    args: { theme: "admin" },
};

export const BienEtre: Story = {
    args: { theme: "bienetre" },
};
