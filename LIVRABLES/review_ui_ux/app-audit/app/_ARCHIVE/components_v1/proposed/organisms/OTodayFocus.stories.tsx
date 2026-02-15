import type { Meta, StoryObj } from "@storybook/react";
import OTodayFocus from "./OTodayFocus";
import { monka } from "../monka-design-tokens";
import { IconMedical, IconClipboard, IconHeart } from "../foundation/MonkaIcons";

const meta: Meta<typeof OTodayFocus> = {
    title: "Organisms/OTodayFocus",
    component: OTodayFocus,
    parameters: { layout: "centered" },
    decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof OTodayFocus>;

export const UrgentMedical: Story = {
    args: {
        title: "Prendre RDV avec le généraliste",
        description: "Le renouvellement d'ordonnance de Francine arrive dans 5 jours. Prenez rendez-vous dès que possible.",
        whyItMatters: "Sans renouvellement, Francine ne pourra plus recevoir ses médicaments habituels à la pharmacie.",
        theme: "Santé",
        themeColor: monka.colors.themeSante,
        forWho: "Francine",
        priority: "urgent",
        icon: <IconMedical size={24} color={monka.colors.themeSante} />,
        ctaLabel: "Appeler le médecin",
    },
};

export const RecommendedAdmin: Story = {
    args: {
        title: "Compléter le dossier MDPH",
        description: "Ajoutez les pièces justificatives manquantes pour finaliser votre demande.",
        whyItMatters: "Le dossier incomplet retarde le traitement de la demande de 2 mois en moyenne.",
        theme: "Démarches",
        themeColor: monka.colors.themeAdmin,
        forWho: "Francine",
        priority: "recommended",
        icon: <IconClipboard size={24} color={monka.colors.themeAdmin} />,
        ctaLabel: "Ajouter les documents",
    },
};

export const OptionalWellbeing: Story = {
    args: {
        title: "Lire : Prendre soin de soi",
        description: "Un article court pour vous, pas pour votre proche. 4 minutes de lecture.",
        theme: "Bien-être",
        themeColor: monka.colors.themeBienEtre,
        priority: "optional",
        icon: <IconHeart size={24} color={monka.colors.themeBienEtre} />,
        ctaLabel: "Lire l'article",
    },
};
