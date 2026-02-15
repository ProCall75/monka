import type { Meta, StoryObj } from "@storybook/react";
import IPhoneMockup from "../../storybook/IPhoneMockup";
import OHeroCard from "./OHeroCard";

const meta: Meta<typeof OHeroCard> = {
    title: "Organisms/OHeroCard",
    component: OHeroCard,
    parameters: {
        layout: "fullscreen",
    },
    argTypes: {
        backgroundColor: { control: "color" },
        title: { control: "text" },
        forWho: { control: "text" },
        tags: { control: "object" },
        ctaLabel: { control: "text" },
    },
    decorators: [
        (Story) => (
            <div style={{ padding: 16, background: "#E8F4F8" }}>
                <Story />
            </div>
        ),
    ],
};
export default meta;
type Story = StoryObj<typeof OHeroCard>;

export const Sante: Story = {
    args: {
        backgroundColor: "#2E8B57",
        title: "Demandez une prescription pour des examens de prévention.",
        forWho: "Pour Nadia",
        tags: ["Moins de 10 min", "Médecin traitant"],
        ctaLabel: "Je commence",
    },
};

export const Demarches: Story = {
    args: {
        backgroundColor: "#E67E22",
        title: "Renseignez-vous auprès de la CAF sur les aides disponibles.",
        forWho: "Pour vous",
        tags: ["30 min", "En ligne"],
        ctaLabel: "Je commence",
    },
};

export const Services: Story = {
    args: {
        backgroundColor: "#3A7BD5",
        title: "Contactez votre CCAS ou mairie pour connaître les services disponibles.",
        forWho: "Pour Nadia",
        tags: ["En personne", "CCAS"],
        ctaLabel: "Je contacte",
    },
};

export const NoTags: Story = {
    args: {
        backgroundColor: "#8E44AD",
        title: "Consultez les ressources disponibles pour les aidants.",
        forWho: "Pour vous",
        tags: [],
        ctaLabel: "Découvrir",
    },
};
