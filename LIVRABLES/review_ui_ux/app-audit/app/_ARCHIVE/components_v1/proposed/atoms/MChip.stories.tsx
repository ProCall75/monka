import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import MChip from "./MChip";

const meta: Meta<typeof MChip> = {
    title: "Primitives/MChip",
    component: MChip,
    argTypes: {
        label: { control: "text" },
        selected: { control: "boolean" },
    },
};
export default meta;
type Story = StoryObj<typeof MChip>;

export const Default: Story = { args: { label: "Tous", selected: false } };
export const Selected: Story = { args: { label: "Santé", selected: true } };

export const FilterBar: Story = {
    render: () => {
        const categories = ["Tous", "Santé", "Droits", "Démarches", "Services"];
        const [active, setActive] = useState("Tous");
        return (
            <div style={{ display: "flex", gap: 8, padding: 16, flexWrap: "wrap" }}>
                {categories.map((cat) => (
                    <MChip key={cat} label={cat} selected={active === cat} onPress={() => setActive(cat)} />
                ))}
            </div>
        );
    },
};
