import type { Meta, StoryObj } from "@storybook/react";
import OThemeHub from "./OThemeHub";
import { monka } from "../monka-design-tokens";
import { IconTarget, IconClipboard, IconStar } from "../foundation/MonkaIcons";

const meta: Meta<typeof OThemeHub> = {
    title: "Organisms/OThemeHub",
    component: OThemeHub,
    parameters: { layout: "centered" },
    decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof OThemeHub>;

export const Default: Story = {
    args: {
        themes: [
            {
                title: "Santé",
                subtitle: "Suivi médical, traitements, rendez-vous",
                forWho: "Francine",
                color: monka.colors.themeSante,
                progress: 65,
                pendingActions: 3,
                icon: <IconTarget size={18} />,
            },
            {
                title: "Démarches administratives",
                subtitle: "Aide financière, droits, MDPH",
                forWho: "Francine",
                color: monka.colors.themeAdmin,
                progress: 30,
                pendingActions: 5,
                icon: <IconClipboard size={18} />,
            },
            {
                title: "Bien-être de l'aidant",
                subtitle: "Répit, soutien psychologique, auto-soin",
                color: monka.colors.themeBienEtre,
                progress: 90,
                pendingActions: 1,
                icon: <IconStar size={18} />,
            },
        ],
    },
};
