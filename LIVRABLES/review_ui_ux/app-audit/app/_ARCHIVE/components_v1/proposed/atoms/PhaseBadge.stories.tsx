import type { Meta, StoryObj } from "@storybook/react";
import PhaseBadge from "./PhaseBadge";

const meta: Meta<typeof PhaseBadge> = {
    title: "Primitives/PhaseBadge",
    component: PhaseBadge,
    parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof PhaseBadge>;

export const Decouverte: Story = {
    args: { phase: 1 },
};

export const Autonomie: Story = {
    args: { phase: 2 },
};

export const Serenite: Story = {
    args: { phase: 3 },
};

export const Compact: Story = {
    args: { phase: 2, compact: true },
};

export const AllPhases: Story = {
    render: () => (
        <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-start" }}>
            <PhaseBadge phase={1} />
            <PhaseBadge phase={2} />
            <PhaseBadge phase={3} />
            <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
                <PhaseBadge phase={1} compact />
                <PhaseBadge phase={2} compact />
                <PhaseBadge phase={3} compact />
            </div>
        </div>
    ),
};
