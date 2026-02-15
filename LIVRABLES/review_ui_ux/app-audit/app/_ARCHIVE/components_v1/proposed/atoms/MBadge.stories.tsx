import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import MBadge from "./MBadge";

const meta: Meta<typeof MBadge> = {
    title: "Primitives/MBadge",
    component: MBadge,
    argTypes: {
        count: { control: { type: "number", min: 0, max: 999 } },
        color: { control: "select", options: ["primary", "alert", "success", "muted"] },
        dot: { control: "boolean" },
    },
};
export default meta;
type Story = StoryObj<typeof MBadge>;

export const Default: Story = { args: { count: 3, color: "alert" } };
export const HighCount: Story = { args: { count: 150, color: "alert" } };
export const Dot: Story = { args: { dot: true, color: "alert" } };
export const Success: Story = { args: { count: 2, color: "success" } };

export const AllVariants: Story = {
    render: () => (
        <div style={{ display: "flex", gap: 12, alignItems: "center", padding: 16 }}>
            <MBadge count={3} color="alert" />
            <MBadge count={42} color="primary" />
            <MBadge count={1} color="success" />
            <MBadge count={8} color="muted" />
            <MBadge dot color="alert" />
            <MBadge dot color="success" />
        </div>
    ),
};
