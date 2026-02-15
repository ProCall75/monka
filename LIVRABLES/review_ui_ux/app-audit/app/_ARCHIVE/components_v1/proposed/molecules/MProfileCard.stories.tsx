import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import MProfileCard from "./MProfileCard";

const meta: Meta<typeof MProfileCard> = {
    title: "Composites/MProfileCard",
    component: MProfileCard,
    argTypes: {
        name: { control: "text" },
        subtitle: { control: "text" },
        showChevron: { control: "boolean" },
    },
};
export default meta;
type Story = StoryObj<typeof MProfileCard>;

export const Default: Story = { args: { name: "Marwane K.", subtitle: "Mon profil" } };
export const WithSubtitle: Story = { args: { name: "Francine D.", subtitle: "Médecin traitant" } };
export const NoChevron: Story = { args: { name: "CPAM", subtitle: "Organisme", showChevron: false } };
