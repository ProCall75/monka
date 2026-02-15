import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import AlertBanner from "./AlertBanner";

const meta: Meta<typeof AlertBanner> = {
    title: "Composites/AlertBanner",
    component: AlertBanner,
    parameters: { layout: "centered" },
    argTypes: {
        severity: { control: "select", options: ["critical", "warning", "info"] },
    },
};
export default meta;
type Story = StoryObj<typeof AlertBanner>;

export const Critical: Story = {
    args: {
        severity: "critical",
        title: "Situation critique détectée",
        description: "Combinaison isolement social + chute récente. Une intervention est recommandée sous 7 jours.",
        action: { label: "Contacter l'IDEC" },
    },
};

export const Warning: Story = {
    args: {
        severity: "warning",
        title: "Démarche APA à relancer",
        description: "Le dossier APA de Francine n'a pas avancé depuis 3 semaines. Un relance auprès du département est recommandée.",
        action: { label: "Voir la démarche" },
    },
};

export const Info: Story = {
    args: {
        severity: "info",
        title: "Nouveau parcours disponible",
        description: "Suite à vos dernières réponses, le parcours « Prévention santé aidant (S3) » a été activé pour vous.",
    },
};

export const Dismissible: Story = {
    args: {
        severity: "info",
        title: "Astuce : le chat avec Sophie est disponible",
        description: "Vous pouvez poser vos questions directement à votre IDEC Sophie via la messagerie.",
        onDismiss: () => { },
    },
};

export const AllSeverities: Story = {
    render: () => (
        <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: 16, maxWidth: 380 }}>
            <AlertBanner severity="critical" title="Situation critique détectée" description="Combinaison isolement + chute récente." action={{ label: "Agir" }} />
            <AlertBanner severity="warning" title="Démarche à relancer" description="Dossier APA inactif depuis 3 semaines." />
            <AlertBanner severity="info" title="Nouveau parcours activé" description="Parcours Prévention santé aidant (S3)." onDismiss={() => { }} />
        </div>
    ),
};
