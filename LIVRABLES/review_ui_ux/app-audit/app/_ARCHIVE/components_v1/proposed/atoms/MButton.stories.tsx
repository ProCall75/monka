import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import MButton from "./MButton";
import MIcon from "./MIcon";

const meta: Meta<typeof MButton> = {
    title: "Primitives/MButton",
    component: MButton,
    argTypes: {
        variant: { control: "select", options: ["primary", "secondary", "ghost", "outline"] },
        size: { control: "select", options: ["sm", "md", "lg"] },
        disabled: { control: "boolean" },
        fullWidth: { control: "boolean" },
        label: { control: "text" },
    },
};
export default meta;
type Story = StoryObj<typeof MButton>;

export const Primary: Story = { args: { label: "Je commence", variant: "primary" } };
export const Secondary: Story = { args: { label: "Plus tard", variant: "secondary" } };
export const Ghost: Story = { args: { label: "Passer", variant: "ghost" } };
export const Outline: Story = { args: { label: "S'abonner", variant: "outline" } };
export const Disabled: Story = { args: { label: "Indisponible", variant: "primary", disabled: true } };
export const WithIcon: Story = {
    args: { label: "Ajouter", variant: "primary" },
    render: (args) => <MButton {...args} icon={<MIcon name="plus" size={16} color="#fff" />} />,
};
export const FullWidth: Story = { args: { label: "Continuer", variant: "primary", fullWidth: true } };

export const AllVariants: Story = {
    render: () => (
        <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: 16 }}>
            <MButton label="Primary" variant="primary" />
            <MButton label="Secondary" variant="secondary" />
            <MButton label="Ghost" variant="ghost" />
            <MButton label="Outline" variant="outline" />
            <MButton label="Disabled" variant="primary" disabled />
            <MButton label="Small" variant="primary" size="sm" />
            <MButton label="Large" variant="primary" size="lg" />
        </div>
    ),
};
