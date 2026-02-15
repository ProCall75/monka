import type { Meta, StoryObj } from "@storybook/react";
import SOnboarding from "./SOnboarding";
import { IconTarget, IconPeople, IconSparkle } from "../foundation/MonkaIcons";
import { monka } from "../monka-design-tokens";

const meta: Meta<typeof SOnboarding> = {
    title: "Screens/SOnboarding",
    component: SOnboarding,
    parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof SOnboarding>;

export const Default: Story = {
    args: {},
};

export const CustomSlides: Story = {
    args: {
        slides: [
            { icon: <IconTarget size={36} color={monka.colors.ctaPrimary} />, title: "Bienvenue sur Monka", description: "L'app qui simplifie votre rôle d'aidant au quotidien." },
            { icon: <IconPeople size={36} color={monka.colors.ctaPrimary} />, title: "Un accompagnement humain", description: "Sophie, votre IDEC, est disponible pour répondre à vos questions." },
            { icon: <IconSparkle size={36} color={monka.colors.ctaPrimary} />, title: "À votre rythme", description: "Chaque petite action compte. Avancez pas à pas, on s'occupe du reste." },
        ],
    },
};
