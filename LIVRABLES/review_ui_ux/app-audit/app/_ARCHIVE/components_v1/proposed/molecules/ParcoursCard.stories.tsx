import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import ParcoursCard from "./ParcoursCard";

const meta: Meta<typeof ParcoursCard> = {
    title: "Composites/ParcoursCard",
    component: ParcoursCard,
    parameters: { layout: "centered" },
    argTypes: {
        category: { control: "select", options: ["social", "fragilite", "sante", "medical", "administratif"] },
    },
};
export default meta;
type Story = StoryObj<typeof ParcoursCard>;

export const SanteAidant: Story = {
    args: {
        title: "Prévention santé aidant",
        description: "Prenez soin de votre propre santé pour mieux accompagner Francine au quotidien.",
        category: "sante",
        currentMilestone: "Bilan santé effectué",
        tasksCompleted: 3,
        tasksTotal: 8,
        onPress: () => { },
    },
};

export const ParcoursMedical: Story = {
    args: {
        title: "Suivi médical de Francine",
        description: "Organisez le suivi médical régulier pour anticiper les complications.",
        category: "medical",
        currentMilestone: "Médecin traitant identifié",
        tasksCompleted: 1,
        tasksTotal: 5,
        onPress: () => { },
    },
};

export const Administratif: Story = {
    args: {
        title: "Dossier APA & aides financières",
        description: "Les démarches pour obtenir les allocations auxquelles Francine a droit.",
        category: "administratif",
        currentMilestone: "Dossier APA déposé",
        tasksCompleted: 0,
        tasksTotal: 6,
        onPress: () => { },
    },
};

export const Social: Story = {
    args: {
        title: "Lien social & soutien",
        description: "Maintenir le lien social est essentiel pour votre bien-être et celui de Francine.",
        category: "social",
        tasksCompleted: 5,
        tasksTotal: 5,
    },
};

export const AllCategories: Story = {
    render: () => (
        <div style={{ display: "flex", flexDirection: "column", gap: 10, padding: 16, maxWidth: 380 }}>
            <ParcoursCard title="Prévention santé" description="Prenez soin de vous" category="sante" currentMilestone="Bilan santé" tasksCompleted={3} tasksTotal={8} onPress={() => { }} />
            <ParcoursCard title="Suivi médical de Francine" description="Organisez le suivi" category="medical" tasksCompleted={1} tasksTotal={5} onPress={() => { }} />
            <ParcoursCard title="Démarches APA" description="Allocations et aides" category="administratif" tasksCompleted={0} tasksTotal={6} onPress={() => { }} />
            <ParcoursCard title="Lien social" description="Maintenir le contact" category="social" tasksCompleted={5} tasksTotal={5} />
            <ParcoursCard title="Fragilité du proche" description="Évaluer la situation" category="fragilite" tasksCompleted={2} tasksTotal={4} onPress={() => { }} />
        </div>
    ),
};
