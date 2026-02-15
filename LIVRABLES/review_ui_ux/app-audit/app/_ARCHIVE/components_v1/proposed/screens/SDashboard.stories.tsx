import type { Meta, StoryObj } from "@storybook/react";
import SDashboard from "./SDashboard";
import type { ThemeGroup } from "../organisms/OTaskFeed";
import { monka } from "../monka-design-tokens";
import { IconHealth, IconClipboard, IconPeople } from "../foundation/MonkaIcons";

const meta: Meta<typeof SDashboard> = {
    title: "Screens/SDashboard",
    component: SDashboard,
    parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof SDashboard>;

const themes: ThemeGroup[] = [
    {
        id: "sante",
        icon: <IconHealth size={20} color={monka.colors.tabGreen} />,
        title: "Santé de Francine",
        accentColor: monka.colors.tabGreen,
        actions: [
            { id: "s1", type: "SEC", title: "Consultez un médecin pour la chute récente", forWho: "Francine", deadline: "Cette semaine" },
            { id: "s2", type: "STRUC", title: "Identifiez son médecin traitant", forWho: "Francine" },
            { id: "s3", type: "ORGA", title: "Prenez RDV chez le kinésithérapeute", forWho: "Francine" },
            { id: "s4", type: "MED", title: "Bilan sanguin trimestriel", forWho: "Francine", deadline: "Ce mois-ci" },
            { id: "s5", type: "INFO", title: "L'APA finance l'aide à domicile" },
        ],
    },
    {
        id: "demarches",
        icon: <IconClipboard size={20} color={monka.colors.tabMint} />,
        title: "Démarches administratives",
        accentColor: monka.colors.tabMint,
        actions: [
            { id: "d1", type: "STRUC", title: "Contactez le CCAS", forWho: "Francine" },
            { id: "d2", type: "ORGA", title: "Constituer le dossier d'aide sociale", forWho: "Francine" },
        ],
    },
    {
        id: "social",
        icon: <IconPeople size={20} color={monka.colors.tabOrange} />,
        title: "Lien social",
        accentColor: monka.colors.tabOrange,
        actions: [
            { id: "l1", type: "ORGA", title: "Inscrire Francine au club senior", forWho: "Francine" },
        ],
    },
];

export const Default: Story = {
    args: { userName: "Marwane", forWho: "Francine", themes, notifCount: 2 },
};

export const Subscribed: Story = {
    args: { userName: "Marwane", forWho: "Francine", themes, isSubscribed: true, notifCount: 0 },
};

export const Progress: Story = {
    args: {
        userName: "Marwane", forWho: "Francine", notifCount: 0,
        themes: themes.map((t) => ({
            ...t,
            actions: t.actions.map((a, i) => ({ ...a, completed: i < 2 })),
        })),
    },
};
