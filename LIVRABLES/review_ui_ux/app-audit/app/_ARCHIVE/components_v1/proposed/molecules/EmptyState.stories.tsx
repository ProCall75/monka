import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import EmptyState from "./EmptyState";

const meta: Meta<typeof EmptyState> = {
    title: "Composites/EmptyState",
    component: EmptyState,
    parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {
    args: {
        title: "Aucune tâche pour le moment",
        description: "Complétez votre questionnaire pour débloquer vos premières actions personnalisées.",
        action: { label: "Commencer le questionnaire" },
    },
};

export const NoMessages: Story = {
    args: {
        title: "Pas encore de messages",
        description: "Sophie, votre IDEC, est disponible pour répondre à vos questions sur la situation de Francine.",
        action: { label: "Écrire à Sophie" },
    },
};

export const NoResources: Story = {
    args: {
        title: "Aucune ressource trouvée",
        description: "Essayez de modifier vos critères de recherche ou explorez les catégories ci-dessus.",
    },
};

export const Compact: Story = {
    args: {
        title: "Pas d'alertes",
        description: "Tout va bien ! Aucune situation critique détectée.",
        compact: true,
    },
};
