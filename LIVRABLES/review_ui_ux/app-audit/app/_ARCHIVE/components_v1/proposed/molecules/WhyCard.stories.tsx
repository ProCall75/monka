import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import WhyCard from "./WhyCard";
import { monka } from "./monka-design-tokens";

const meta: Meta<typeof WhyCard> = {
    title: "Composites/WhyCard",
    component: WhyCard,
    parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof WhyCard>;

export const Default: Story = {
    args: {
        question: "Pourquoi contacter le CCAS ?",
        answer: "Le CCAS (Centre Communal d'Action Sociale) évalue la situation de Francine et propose des aides concrètes : aide ménagère, portage de repas, adaptation du logement. C'est souvent la première étape pour débloquer les autres aides.",
    },
};

export const WithLearnMore: Story = {
    args: {
        question: "Pourquoi solliciter le département ?",
        answer: "Le département gère l'APA (Allocation Personnalisée d'Autonomie) et les MDPH. Contacter le département permet d'évaluer les droits de Francine et de lancer les démarches d'allocation.",
        learnMoreLabel: "Guide complet APA",
        onLearnMore: () => { },
    },
};

export const MedicalContext: Story = {
    args: {
        question: "Pourquoi un bilan santé pour vous ?",
        answer: "En tant qu'aidant, votre propre santé est essentielle. 48% des aidants déclarent des problèmes de santé liés à leur rôle. Un bilan préventif permet de détecter les signaux d'épuisement tôt.",
        accentColor: monka.colors.tabGreen,
    },
};
