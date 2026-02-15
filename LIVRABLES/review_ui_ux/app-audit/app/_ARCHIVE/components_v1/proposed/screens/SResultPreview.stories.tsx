import type { Meta, StoryObj } from "@storybook/react";
import SResultPreview from "./SResultPreview";
import { monka } from "../monka-design-tokens";
import { IconHealth, IconClipboard, IconPeople } from "../foundation/MonkaIcons";

const meta: Meta<typeof SResultPreview> = {
    title: "Screens/SResultPreview",
    component: SResultPreview,
    parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof SResultPreview>;

export const Default: Story = {
    args: {
        userName: "Marwane",
        forWho: "Francine",
        activatedThemes: [
            { icon: <IconHealth size={14} color={monka.colors.tabGreen} />, label: "Santé" },
            { icon: <IconClipboard size={14} color={monka.colors.tabMint} />, label: "Administratif" },
            { icon: <IconPeople size={14} color={monka.colors.tabOrange} />, label: "Lien social" },
        ],
        freeAction: {
            title: "Consultez un médecin pour la chute récente",
            description: "Suite à la chute de Francine, un examen médical rapide est recommandé pour écarter tout risque.",
        },
        hiddenCount: 12,
        hiddenFeatures: [
            "Identifier le médecin traitant",
            "Monter le dossier APA",
            "Bilan mémoire auprès du neurologue",
            "Contacter le CCAS",
        ],
    },
};
