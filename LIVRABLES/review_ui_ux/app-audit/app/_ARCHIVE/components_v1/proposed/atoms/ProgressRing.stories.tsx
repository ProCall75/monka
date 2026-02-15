import type { Meta, StoryObj } from "@storybook/react";
import ProgressRing from "./ProgressRing";
import { monka } from "../monka-design-tokens";

const meta: Meta<typeof ProgressRing> = {
    title: "Primitives/ProgressRing",
    component: ProgressRing,
    parameters: { layout: "centered" },
    argTypes: {
        value: { control: { type: "range", min: 0, max: 100 } },
        size: { control: { type: "range", min: 40, max: 120 } },
        strokeWidth: { control: { type: "range", min: 3, max: 10 } },
    },
};

export default meta;
type Story = StoryObj<typeof ProgressRing>;

export const Default: Story = {
    args: { value: 65, label: "65%", subLabel: "Santé" },
};

export const ThreeRings: Story = {
    render: () => (
        <div style={{ display: "flex", gap: 24, alignItems: "flex-end" }}>
            <ProgressRing
                value={75}
                color={monka.colors.themeSante}
                label="75%"
                subLabel="Santé"
                delay={0}
            />
            <ProgressRing
                value={40}
                color={monka.colors.themeAdmin}
                label="40%"
                subLabel="Admin"
                delay={0.15}
            />
            <ProgressRing
                value={90}
                color={monka.colors.themeBienEtre}
                label="90%"
                subLabel="Bien-être"
                delay={0.3}
            />
        </div>
    ),
};

export const Small: Story = {
    args: { value: 50, size: 48, strokeWidth: 4, label: "50%", subLabel: "Compact" },
};

export const Large: Story = {
    args: { value: 88, size: 110, strokeWidth: 8, label: "88%", subLabel: "Grande taille" },
};

export const Empty: Story = {
    args: { value: 0, label: "0%", subLabel: "Pas encore commencé" },
};

export const Complete: Story = {
    args: { value: 100, color: monka.colors.checkGreen, label: "100%", subLabel: "Terminé !" },
};
