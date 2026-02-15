import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import MIcon from "./MIcon";
import type { IconName } from "./MIcon";

const ALL_ICONS: IconName[] = [
    "search", "chevron-right", "chevron-left", "close",
    "heart", "heart-fill", "clipboard", "chat", "person",
    "bell", "lock", "check", "plus", "phone", "mail",
    "shield", "star", "clock", "arrow-right",
];

const meta: Meta<typeof MIcon> = {
    title: "Primitives/MIcon",
    component: MIcon,
    argTypes: {
        name: { control: "select", options: ALL_ICONS },
        size: { control: { type: "number", min: 12, max: 48 } },
        color: { control: "color" },
    },
};
export default meta;
type Story = StoryObj<typeof MIcon>;

export const Default: Story = { args: { name: "heart", size: 24, color: "#2C8C99" } };
export const Search: Story = { args: { name: "search", size: 20 } };

export const AllIcons: Story = {
    render: () => (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16, padding: 16 }}>
            {ALL_ICONS.map((name) => (
                <div key={name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                    <MIcon name={name} size={24} />
                    <span style={{ fontSize: 10, color: "#8E8E93" }}>{name}</span>
                </div>
            ))}
        </div>
    ),
};
