import type { Meta, StoryObj } from "@storybook/react";
import AchievementCard from "./AchievementCard";
import { IconTarget, IconClipboard, IconStar, IconChart } from "../foundation/MonkaIcons";
import { monka } from "../monka-design-tokens";

const meta: Meta<typeof AchievementCard> = {
    title: "Composites/AchievementCard",
    component: AchievementCard,
    parameters: { layout: "centered" },
    decorators: [(Story) => <div style={{ width: 340 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof AchievementCard>;

export const Unlocked: Story = {
    args: {
        title: "Premier RDV médecin",
        description: "Vous avez pris le premier rendez-vous pour Francine.",
        date: "Il y a 3 jours",
        icon: <IconTarget size={22} color={monka.colors.achievementGold} />,
        unlocked: true,
    },
};

export const Locked: Story = {
    args: {
        title: "Dossier MDPH lancé",
        description: "Déposez une première demande auprès de la MDPH.",
        icon: <IconClipboard size={22} color={monka.colors.textMuted} />,
        unlocked: false,
    },
};

export const AllAchievements: Story = {
    render: () => (
        <div style={{ display: "flex", flexDirection: "column", gap: 10, width: 340 }}>
            <AchievementCard
                title="Premier RDV médecin"
                description="Vous avez pris le premier rendez-vous pour Francine."
                date="Il y a 3 jours"
                icon={<IconTarget size={22} color={monka.colors.achievementGold} />}
                unlocked
            />
            <AchievementCard
                title="3 thèmes explorés"
                description="Vous avez consulté les thèmes Santé, Admin et Bien-être."
                date="Hier"
                icon={<IconChart size={22} color={monka.colors.achievementGold} />}
                unlocked
            />
            <AchievementCard
                title="Dossier MDPH lancé"
                description="Déposez une première demande auprès de la MDPH."
                icon={<IconClipboard size={22} color={monka.colors.textMuted} />}
                unlocked={false}
            />
            <AchievementCard
                title="Semaine parfaite"
                description="Complétez toutes les actions d'une semaine."
                icon={<IconStar size={22} color={monka.colors.textMuted} />}
                unlocked={false}
            />
        </div>
    ),
};
