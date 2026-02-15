import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import PriorityBadge from "./PriorityBadge";

const meta: Meta<typeof PriorityBadge> = {
    title: "Primitives/PriorityBadge",
    component: PriorityBadge,
    argTypes: {
        level: { control: "select", options: ["critical", "ccc", "standard"] },
        showDeadline: { control: "boolean" },
        compact: { control: "boolean" },
    },
    parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof PriorityBadge>;

export const Critical: Story = { args: { level: "critical" } };
export const CCC: Story = { args: { level: "ccc" } };
export const Standard: Story = { args: { level: "standard" } };

export const WithDeadline: Story = { args: { level: "critical", showDeadline: true } };
export const CompactCritical: Story = { args: { level: "critical", compact: true } };
export const CompactCCC: Story = { args: { level: "ccc", compact: true } };
export const CompactStandard: Story = { args: { level: "standard", compact: true } };

export const AllVariants: Story = {
    render: () => (
        <div style={{ display: "flex", flexDirection: "column", gap: 16, padding: 24 }}>
            <div>
                <p style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", color: "#86868B", marginBottom: 8 }}>Full</p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <PriorityBadge level="critical" />
                    <PriorityBadge level="ccc" />
                    <PriorityBadge level="standard" />
                </div>
            </div>
            <div>
                <p style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", color: "#86868B", marginBottom: 8 }}>With deadline</p>
                <div style={{ display: "flex", gap: 8, flexDirection: "column" }}>
                    <PriorityBadge level="critical" showDeadline />
                    <PriorityBadge level="ccc" showDeadline />
                    <PriorityBadge level="standard" showDeadline />
                </div>
            </div>
            <div>
                <p style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", color: "#86868B", marginBottom: 8 }}>Compact</p>
                <div style={{ display: "flex", gap: 12 }}>
                    <PriorityBadge level="critical" compact />
                    <PriorityBadge level="ccc" compact />
                    <PriorityBadge level="standard" compact />
                </div>
            </div>
        </div>
    ),
};
