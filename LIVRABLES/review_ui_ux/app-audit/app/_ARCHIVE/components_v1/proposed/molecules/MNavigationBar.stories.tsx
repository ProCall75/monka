import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import MNavigationBar from "./MNavigationBar";
import MIcon from "../atoms/MIcon";

const meta: Meta<typeof MNavigationBar> = {
    title: "Composites/MNavigationBar",
    component: MNavigationBar,
    argTypes: {
        title: { control: "text" },
        showBack: { control: "boolean" },
    },
};
export default meta;
type Story = StoryObj<typeof MNavigationBar>;

export const Default: Story = { args: { title: "Pour Moi" } };
export const WithBack: Story = { args: { title: "Détails", showBack: true } };
export const WithAction: Story = {
    args: { title: "Messagerie" },
    render: (args) => (
        <MNavigationBar
            {...args}
            rightAction={<MIcon name="bell" size={22} color="#2C8C99" />}
        />
    ),
};
