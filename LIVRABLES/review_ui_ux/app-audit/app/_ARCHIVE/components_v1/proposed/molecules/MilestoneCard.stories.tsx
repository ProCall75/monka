import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import MilestoneCard from "./MilestoneCard";

const meta: Meta<typeof MilestoneCard> = {
    title: "Composites/MilestoneCard",
    component: MilestoneCard,
    parameters: { layout: "centered" },
    argTypes: {
        status: { control: "select", options: ["locked", "active", "achieved"] },
    },
};
export default meta;
type Story = StoryObj<typeof MilestoneCard>;

export const Active: Story = {
    args: {
        title: "Médecin traitant identifié",
        description: "Identifier le médecin traitant de Francine est la première étape pour organiser son suivi médical.",
        status: "active",
        tasksCompleted: 2,
        tasksTotal: 5,
        parcoursLabel: "Parcours Médical M1",
    },
};

export const Achieved: Story = {
    args: {
        title: "Dossier APA déposé",
        description: "Le dossier d'Allocation Personnalisée d'Autonomie a été soumis au département.",
        status: "achieved",
        parcoursLabel: "Administratif A2",
    },
};

export const Locked: Story = {
    args: {
        title: "Suivi nutritionnel mis en place",
        description: "Ce jalon sera débloqué après les précédentes étapes du parcours.",
        status: "locked",
        parcoursLabel: "Santé S2",
    },
};

export const AllStates: Story = {
    render: () => (
        <div style={{ display: "flex", flexDirection: "column", gap: 10, padding: 16, maxWidth: 380 }}>
            <MilestoneCard status="achieved" title="CCAS contacté" parcoursLabel="Social R1" />
            <MilestoneCard status="active" title="Médecin traitant identifié" description="Étape en cours" tasksCompleted={2} tasksTotal={5} parcoursLabel="Médical M1" />
            <MilestoneCard status="locked" title="Suivi nutritionnel" parcoursLabel="Santé S2" />
        </div>
    ),
};
