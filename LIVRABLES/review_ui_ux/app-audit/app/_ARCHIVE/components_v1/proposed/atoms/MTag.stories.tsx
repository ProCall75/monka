import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import MTag from "./MTag";

const meta: Meta<typeof MTag> = {
    title: "Primitives/MTag",
    component: MTag,
    argTypes: {
        label: { control: "text" },
        color: { control: "select", options: ["sante", "demarches", "droits", "services", "default"] },
    },
};
export default meta;
type Story = StoryObj<typeof MTag>;

export const Default: Story = { args: { label: "Général", color: "default" } };
export const Sante: Story = { args: { label: "Santé", color: "sante" } };
export const Demarches: Story = { args: { label: "Démarches", color: "demarches" } };
export const Droits: Story = { args: { label: "Droits", color: "droits" } };
export const Services: Story = { args: { label: "Services", color: "services" } };

export const AllTags: Story = {
    render: () => (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, padding: 16 }}>
            <MTag label="Santé" color="sante" />
            <MTag label="Démarches" color="demarches" />
            <MTag label="Droits" color="droits" />
            <MTag label="Services" color="services" />
            <MTag label="Général" color="default" />
            <MTag label="Moins de 10 min" color="sante" />
            <MTag label="En ligne" color="demarches" />
        </div>
    ),
};
