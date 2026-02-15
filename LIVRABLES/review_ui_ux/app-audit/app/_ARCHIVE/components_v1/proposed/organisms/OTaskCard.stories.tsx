import type { Meta, StoryObj } from "@storybook/react";
import IPhoneMockup from "../../storybook/IPhoneMockup";
import OTaskCard from "./OTaskCard";

const meta: Meta<typeof OTaskCard> = {
    title: "Organisms/OTaskCard",
    component: OTaskCard,
    parameters: {
        layout: "fullscreen",
    },
    argTypes: {
        tags: { control: "object" },
        title: { control: "text" },
        forWho: { control: "text" },
        ctaLabel: { control: "text" },
        minWidth: { control: { type: "number", min: 200, max: 350 } },
    },
    decorators: [
        (Story) => (
            <div style={{ padding: 16, background: "#E0F4F4" }}>
                <Story />
            </div>
        ),
    ],
};
export default meta;
type Story = StoryObj<typeof OTaskCard>;

export const Default: Story = {
    args: {
        tags: ["Moins de 10 min", "Médecin traitant (ou g..."],
        title: "Demandez une prescription pour des examens de prévention.",
        forWho: "Pour vous",
        ctaLabel: "Je commence",
    },
};

export const ForNadia: Story = {
    args: {
        tags: ["Moins de 10 min", "En ligne"],
        title: "Demandez une prescription pour des examens de prévention.",
        forWho: "Pour Nadia",
        ctaLabel: "Je commence",
    },
};

export const LongTitle: Story = {
    args: {
        tags: ["30 min", "À domicile"],
        title: "Faites le point sur les aides à domicile disponibles près de chez vous.",
        forWho: "Pour vous",
        ctaLabel: "Je commence",
    },
};

export const HorizontalScroll: Story = {
    render: () => (
        <div style={{ display: "flex", gap: 12, overflowX: "auto", padding: "0 16px" }}>
            <OTaskCard
                tags={["Moins de 10 min", "Médecin traitant"]}
                title="Demandez une prescription pour des examens de prévention."
                forWho="Pour vous"
                ctaLabel="Je commence"
            />
            <OTaskCard
                tags={["Moins de 10 min", "En ligne"]}
                title="Vérifiez l'éligibilité et les démarches pour obtenir l'APA."
                forWho="Pour Nadia"
                ctaLabel="Je commence"
            />
            <OTaskCard
                tags={["30 min", "À domicile"]}
                title="Faites le point sur les aides à domicile disponibles."
                forWho="Pour vous"
                ctaLabel="Je commence"
            />
        </div>
    ),
};
