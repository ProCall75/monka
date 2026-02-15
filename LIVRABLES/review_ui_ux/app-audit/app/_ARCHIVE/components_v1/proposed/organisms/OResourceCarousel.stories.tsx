import type { Meta, StoryObj } from "@storybook/react";
import OResourceCarousel from "./OResourceCarousel";
import { monka } from "../monka-design-tokens";
import { IconTarget, IconClipboard, IconHeart, IconStar, IconInfo } from "../foundation/MonkaIcons";

const meta: Meta<typeof OResourceCarousel> = {
    title: "Organisms/OResourceCarousel",
    component: OResourceCarousel,
    parameters: { layout: "padded" },
    decorators: [(Story) => <div style={{ width: 390 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof OResourceCarousel>;

export const Default: Story = {
    args: {
        title: "Articles recommandés",
        subtitle: "Sélectionnés pour vous",
        resources: [
            {
                title: "Les objectifs de la plateforme de répit",
                readingTime: "3 min",
                category: "Santé",
                categoryColor: monka.colors.themeSante,
                icon: <IconTarget size={28} color={monka.colors.themeSante} />,
            },
            {
                title: "Comment contacter la CAF pour une aide",
                readingTime: "5 min",
                category: "Démarches",
                categoryColor: monka.colors.themeAdmin,
                icon: <IconClipboard size={28} color={monka.colors.themeAdmin} />,
            },
            {
                title: "Prendre soin de soi en tant qu'aidant",
                readingTime: "4 min",
                category: "Bien-être",
                categoryColor: monka.colors.themeBienEtre,
                icon: <IconHeart size={28} color={monka.colors.themeBienEtre} />,
            },
            {
                title: "Comprendre la maladie d'Alzheimer",
                readingTime: "6 min",
                category: "Santé",
                categoryColor: monka.colors.themeSante,
                icon: <IconInfo size={28} color={monka.colors.themeSante} />,
            },
        ],
    },
};
