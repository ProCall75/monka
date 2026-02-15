import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import MInput from "./MInput";
import MIcon from "./MIcon";

const meta: Meta<typeof MInput> = {
    title: "Primitives/MInput",
    component: MInput,
    argTypes: {
        placeholder: { control: "text" },
        value: { control: "text" },
        error: { control: "text" },
        disabled: { control: "boolean" },
    },
};
export default meta;
type Story = StoryObj<typeof MInput>;

export const Default: Story = { args: { placeholder: "Rechercher..." } };
export const WithIcon: Story = {
    render: (args) => (
        <div style={{ padding: 16 }}>
            <MInput {...args} icon={<MIcon name="search" size={18} color="#8E8E93" />} />
        </div>
    ),
    args: { placeholder: "Rechercher un article..." },
};
export const WithError: Story = { args: { value: "test@", error: "Email invalide" } };
export const Disabled: Story = { args: { placeholder: "Indisponible", disabled: true } };
