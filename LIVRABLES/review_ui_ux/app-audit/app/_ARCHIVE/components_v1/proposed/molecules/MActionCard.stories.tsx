import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import MActionCard from "./MActionCard";

const meta: Meta<typeof MActionCard> = {
    title: "Composites/MActionCard",
    component: MActionCard,
    argTypes: {
        title: { control: "text" },
        subtitle: { control: "text" },
        ctaLabel: { control: "text" },
    },
};
export default meta;
type Story = StoryObj<typeof MActionCard>;

export const Default: Story = {
    args: {
        title: "Demandez une prescription pour des examens de prévention",
        tags: [{ label: "Moins de 10 min", color: "sante" }, { label: "En ligne", color: "demarches" }],
        subtitle: "Pour vous",
        ctaLabel: "Je commence",
        icon: "shield",
    },
};

export const WithDroits: Story = {
    args: {
        title: "Vérifiez si vous êtes éligible à la CSS",
        tags: [{ label: "5 min", color: "demarches" }, { label: "Droits", color: "droits" }],
        ctaLabel: "Vérifier",
        icon: "check",
    },
};
