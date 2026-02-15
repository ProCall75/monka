import type { Meta, StoryObj } from "@storybook/react";
import ActionCard from "./ActionCard";

const meta: Meta<typeof ActionCard> = {
    title: "Composites/ActionCard",
    component: ActionCard,
    parameters: {
        layout: "padded",
        backgrounds: { default: "monka", values: [{ name: "monka", value: "#E8F4F8" }] },
    },
    argTypes: {
        type: {
            control: "select",
            options: ["INFO", "ORGA", "STRUC", "SEC", "MED"],
        },
    },
};

export default meta;
type Story = StoryObj<typeof ActionCard>;

// ─── INFO — Carte Conseil ──────────────────────────────────────
export const Info: Story = {
    args: {
        type: "INFO",
        title: "Saviez-vous que le CCAS peut vous aider pour le portage de repas ?",
        forWho: "Francine",
        description: "Le CCAS de votre commune propose des services d'aide à domicile, incluant le portage de repas, l'aide ménagère et l'accompagnement social.",
        index: 0,
    },
};

// ─── ORGA — Carte Action Planifiable ───────────────────────────
export const Orga: Story = {
    args: {
        type: "ORGA",
        title: "Prenez RDV chez le médecin traitant de Francine",
        forWho: "Francine",
        ctaLabel: "Planifier",
        index: 1,
    },
};

// ─── STRUC — Carte Action Importante ───────────────────────────
export const Struc: Story = {
    args: {
        type: "STRUC",
        title: "Contactez le CCAS de votre commune pour Francine",
        forWho: "Francine",
        ctaLabel: "Je commence",
        index: 2,
    },
};

// ─── SEC — Carte Urgence ────────────────────────────────────────
export const Sec: Story = {
    args: {
        type: "SEC",
        title: "Consultez un médecin pour la chute de Francine",
        forWho: "Francine",
        deadline: "Cette semaine",
        ctaLabel: "Agir maintenant",
        index: 3,
    },
};

// ─── MED — Carte Médicale ───────────────────────────────────────
export const Med: Story = {
    args: {
        type: "MED",
        title: "Bilan sanguin trimestriel pour Francine",
        forWho: "Francine",
        deadline: "Ce mois-ci",
        ctaLabel: "Prendre RDV",
        index: 4,
    },
};

// ─── Les 5 variantes côte à côte ────────────────────────────────
export const AllVariants: Story = {
    render: () => (
        <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 380 }}>
            <ActionCard
                type="SEC"
                title="Consultez un médecin pour la chute de Francine"
                forWho="Francine"
                deadline="Cette semaine"
                index={0}
            />
            <ActionCard
                type="STRUC"
                title="Contactez le CCAS de votre commune"
                forWho="Francine"
                index={1}
            />
            <ActionCard
                type="MED"
                title="Bilan sanguin trimestriel"
                forWho="Francine"
                deadline="Ce mois-ci"
                index={2}
            />
            <ActionCard
                type="ORGA"
                title="Prenez RDV chez le kinésithérapeute"
                forWho="Francine"
                index={3}
            />
            <ActionCard
                type="INFO"
                title="Le CCAS peut vous aider pour le portage de repas"
                forWho="Francine"
                description="Services d'aide à domicile incluant portage repas, aide ménagère et accompagnement social."
                index={4}
            />
        </div>
    ),
};
