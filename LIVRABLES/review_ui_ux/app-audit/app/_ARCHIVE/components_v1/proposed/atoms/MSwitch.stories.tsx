import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import MSwitch from "./MSwitch";

const meta: Meta<typeof MSwitch> = {
    title: "Primitives/MSwitch",
    component: MSwitch,
    argTypes: {
        checked: { control: "boolean" },
        disabled: { control: "boolean" },
    },
};
export default meta;
type Story = StoryObj<typeof MSwitch>;

export const Off: Story = { args: { checked: false } };
export const On: Story = { args: { checked: true } };
export const Disabled: Story = { args: { checked: false, disabled: true } };

export const InContext: Story = {
    render: () => (
        <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 16 }}>
            {["Notifications", "Dark Mode", "Haptics"].map((label) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 15 }}>{label}</span>
                    <MSwitch />
                </div>
            ))}
        </div>
    ),
};
