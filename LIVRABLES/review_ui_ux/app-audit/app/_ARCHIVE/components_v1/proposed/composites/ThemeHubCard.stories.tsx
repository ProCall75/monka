import type { Meta, StoryObj } from "@storybook/react";
import ThemeHubCard from "./ThemeHubCard";
import { monka } from "../monka-design-tokens";
import { IconTarget, IconClipboard, IconStar } from "../foundation/MonkaIcons";

const meta: Meta<typeof ThemeHubCard> = {
    title: "Composites/ThemeHubCard",
    component: ThemeHubCard,
    parameters: { layout: "centered", backgrounds: { default: "monka-light" } },
    decorators: [(Story) => <div style={{ width: 340 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof ThemeHubCard>;

export const Sante: Story = {
    args: {
        title: "Santé",
        subtitle: "Suivi médical et traitements",
        forWho: "Francine",
        color: monka.colors.themeSante,
        progress: 65,
        pendingActions: 3,
        icon: <IconTarget size={18} />,
    },
};

export const Admin: Story = {
    args: {
        title: "Démarches",
        subtitle: "Aide financière et droits",
        forWho: "Francine",
        color: monka.colors.themeAdmin,
        progress: 30,
        pendingActions: 5,
        icon: <IconClipboard size={18} />,
    },
};

export const BienEtre: Story = {
    args: {
        title: "Bien-être",
        subtitle: "Prendre soin de vous aussi",
        color: monka.colors.themeBienEtre,
        progress: 90,
        pendingActions: 1,
        icon: <IconStar size={18} />,
    },
};

export const AllThemes: Story = {
    render: () => (
        <div style={{ display: "flex", flexDirection: "column", gap: 12, width: 340 }}>
            <ThemeHubCard
                title="Santé"
                subtitle="Suivi médical et traitements"
                forWho="Francine"
                color={monka.colors.themeSante}
                progress={65}
                pendingActions={3}
                icon={<IconTarget size={18} />}
            />
            <ThemeHubCard
                title="Démarches"
                subtitle="Aide financière et droits"
                forWho="Francine"
                color={monka.colors.themeAdmin}
                progress={30}
                pendingActions={5}
                icon={<IconClipboard size={18} />}
            />
            <ThemeHubCard
                title="Bien-être"
                subtitle="Prendre soin de vous aussi"
                color={monka.colors.themeBienEtre}
                progress={90}
                pendingActions={1}
                icon={<IconStar size={18} />}
            />
        </div>
    ),
};
