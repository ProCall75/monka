import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import MAvatar from "./MAvatar";

const meta: Meta<typeof MAvatar> = {
    title: "Primitives/MAvatar",
    component: MAvatar,
    argTypes: {
        name: { control: "text" },
        size: { control: "select", options: ["sm", "md", "lg"] },
    },
};
export default meta;
type Story = StoryObj<typeof MAvatar>;

export const Default: Story = { args: { name: "Marwane K." } };
export const Small: Story = { args: { name: "Francine D.", size: "sm" } };
export const Large: Story = { args: { name: "Docteur Martin", size: "lg" } };

export const AllSizes: Story = {
    render: () => (
        <div style={{ display: "flex", gap: 12, alignItems: "center", padding: 16 }}>
            <MAvatar name="Marwane K." size="sm" />
            <MAvatar name="Francine D." size="md" />
            <MAvatar name="Docteur Martin" size="lg" />
            <MAvatar name="CPAM" size="md" />
            <MAvatar name="Sophie L." size="md" />
        </div>
    ),
};
