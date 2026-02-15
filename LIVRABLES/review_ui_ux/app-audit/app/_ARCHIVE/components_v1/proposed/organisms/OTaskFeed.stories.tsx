import type { Meta, StoryObj } from "@storybook/react";
import OTaskFeed from "./OTaskFeed";
import type { ThemeGroup } from "./OTaskFeed";
import { monka } from "../monka-design-tokens";
import { IconHealth, IconClipboard, IconPeople } from "../foundation/MonkaIcons";

const meta: Meta<typeof OTaskFeed> = {
    title: "Organisms/OTaskFeed",
    component: OTaskFeed,
    decorators: [
        (Story) => (
            <div style={{ maxWidth: 390, margin: "0 auto", padding: 16, background: monka.colors.bgPrimary, minHeight: 700, fontFamily: monka.font.family }}>
                <Story />
            </div>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof OTaskFeed>;

const mockThemes: ThemeGroup[] = [
    {
        id: "sante",
        icon: <IconHealth size={20} color={monka.colors.tabGreen} />,
        title: "Santé de Francine",
        accentColor: monka.colors.tabGreen,
        actions: [
            { id: "s1", type: "SEC", title: "Consultez un médecin pour la chute récente", forWho: "Francine", deadline: "Cette semaine" },
            { id: "s2", type: "STRUC", title: "Identifiez le médecin traitant de Francine", forWho: "Francine" },
            { id: "s3", type: "ORGA", title: "Prenez RDV chez le kinésithérapeute", forWho: "Francine" },
            { id: "s4", type: "MED", title: "Bilan sanguin trimestriel", forWho: "Francine", deadline: "Ce mois-ci" },
            { id: "s5", type: "INFO", title: "L'APA finance l'aide à domicile jusqu'à 1 800 par mois" },
        ],
    },
    {
        id: "demarches",
        icon: <IconClipboard size={20} color={monka.colors.tabMint} />,
        title: "Démarches administratives",
        accentColor: monka.colors.tabMint,
        actions: [
            { id: "d1", type: "STRUC", title: "Contactez le CCAS de votre commune", forWho: "Francine" },
            { id: "d2", type: "ORGA", title: "Constituer le dossier d'aide sociale", forWho: "Francine" },
            { id: "d3", type: "INFO", title: "La CAF propose des aides complémentaires : aide logement, soutien familial" },
        ],
    },
    {
        id: "social",
        icon: <IconPeople size={20} color={monka.colors.tabOrange} />,
        title: "Lien social",
        accentColor: monka.colors.tabOrange,
        actions: [
            { id: "l1", type: "ORGA", title: "Inscrire Francine au club senior", forWho: "Francine" },
            { id: "l2", type: "INFO", title: "L'isolement augmente les risques de dépression chez les personnes âgées" },
        ],
    },
];

export const FeedComplet: Story = {
    args: {
        forWho: "Francine",
        themes: mockThemes,
        subtitle: "Voici vos priorités pour aujourd'hui.",
    },
};

export const FeedSansUrgence: Story = {
    args: {
        forWho: "Francine",
        themes: mockThemes.map((t) => ({
            ...t,
            actions: t.actions.filter((a) => a.type !== "SEC"),
        })),
        greeting: "Bonjour, Marwane",
        subtitle: "Tout va bien pour Francine aujourd'hui.",
    },
};
