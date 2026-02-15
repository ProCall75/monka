import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import MSearchBar from "./MSearchBar";

const meta: Meta<typeof MSearchBar> = {
    title: "Composites/MSearchBar",
    component: MSearchBar,
    argTypes: {
        placeholder: { control: "text" },
        value: { control: "text" },
    },
};
export default meta;
type Story = StoryObj<typeof MSearchBar>;

export const Default: Story = { args: {} };
export const WithValue: Story = { args: { value: "Prévention" } };
export const CustomPlaceholder: Story = { args: { placeholder: "Rechercher un contact..." } };
