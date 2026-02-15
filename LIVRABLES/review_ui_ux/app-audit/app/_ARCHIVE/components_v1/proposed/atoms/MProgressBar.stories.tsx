import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import MProgressBar from "./MProgressBar";

const meta: Meta<typeof MProgressBar> = {
    title: "Primitives/MProgressBar",
    component: MProgressBar,
    argTypes: {
        progress: { control: { type: "range", min: 0, max: 100, step: 1 } },
        showLabel: { control: "boolean" },
        height: { control: { type: "number", min: 2, max: 20 } },
    },
};
export default meta;
type Story = StoryObj<typeof MProgressBar>;

export const Empty: Story = { args: { progress: 0 } };
export const Half: Story = { args: { progress: 50 } };
export const Full: Story = { args: { progress: 100 } };
export const WithLabel: Story = { args: { progress: 66, showLabel: true } };

export const Showcase: Story = {
    render: () => (
        <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 16 }}>
            <MProgressBar progress={0} showLabel />
            <MProgressBar progress={25} showLabel />
            <MProgressBar progress={66} showLabel />
            <MProgressBar progress={100} showLabel />
        </div>
    ),
};
