import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import MSeparator from "./MSeparator";

const meta: Meta<typeof MSeparator> = {
    title: "Primitives/MSeparator",
    component: MSeparator,
    argTypes: {
        variant: { control: "select", options: ["hairline", "thick", "inset"] },
    },
};
export default meta;
type Story = StoryObj<typeof MSeparator>;

export const Hairline: Story = { args: { variant: "hairline" } };
export const Thick: Story = { args: { variant: "thick" } };
export const Inset: Story = { args: { variant: "inset" } };

export const AllVariants: Story = {
    render: () => (
        <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 24 }}>
            <div>
                <p style={{ fontSize: 12, color: "#8E8E93", margin: "0 0 8px" }}>Hairline (0.5px)</p>
                <MSeparator variant="hairline" />
            </div>
            <div>
                <p style={{ fontSize: 12, color: "#8E8E93", margin: "0 0 8px" }}>Thick (8px)</p>
                <MSeparator variant="thick" />
            </div>
            <div>
                <p style={{ fontSize: 12, color: "#8E8E93", margin: "0 0 8px" }}>Inset (indent left)</p>
                <MSeparator variant="inset" />
            </div>
        </div>
    ),
};
