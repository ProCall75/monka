import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import SectionIntro from "./SectionIntro";
import { monka } from "./monka-design-tokens";

const meta: Meta<typeof SectionIntro> = {
    title: "Composites/SectionIntro",
    component: SectionIntro,
    parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof SectionIntro>;

const HealthIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" stroke={monka.colors.ctaPrimary} strokeWidth="1.5" fill="none" />
    </svg>
);

export const Default: Story = {
    args: {
        title: "Vos priorités du mois",
        subtitle: "Ce sont les actions les plus importantes pour la situation de Francine ce mois-ci.",
    },
};

export const WithIcon: Story = {
    args: {
        title: "Suivi santé de l'aidant",
        subtitle: "Prendre soin de vous est essentiel pour pouvoir continuer à aider Francine.",
        icon: <HealthIcon />,
    },
};

export const WithAction: Story = {
    args: {
        title: "Vos parcours actifs",
        subtitle: "Ces parcours ont été personnalisés selon les réponses de votre questionnaire.",
        action: { label: "Tout voir" },
    },
};

export const Complete: Story = {
    args: {
        title: "Démarches administratives",
        subtitle: "Ces démarches sont essentielles pour le dossier de Francine. Elles doivent être faites dans l'ordre.",
        icon: <HealthIcon />,
        accentColor: monka.colors.tabOrange,
        action: { label: "En savoir plus" },
    },
};
