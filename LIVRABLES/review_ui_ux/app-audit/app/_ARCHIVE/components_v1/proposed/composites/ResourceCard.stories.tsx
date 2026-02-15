import type { Meta, StoryObj } from "@storybook/react";
import ResourceCard from "./ResourceCard";
import { monka } from "../monka-design-tokens";
import { IconClipboard, IconStar, IconTarget } from "../foundation/MonkaIcons";

const meta: Meta<typeof ResourceCard> = {
    title: "Composites/ResourceCard",
    component: ResourceCard,
    parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof ResourceCard>;

export const Default: Story = {
    args: {
        title: "Les objectifs de la plateforme de répit",
        readingTime: "3 min",
        category: "Santé",
        categoryColor: monka.colors.themeSante,
        icon: <IconTarget size={28} color={monka.colors.themeSante} />,
    },
};

export const Admin: Story = {
    args: {
        title: "Comment contacter la CAF pour une aide financière",
        readingTime: "5 min",
        category: "Démarches",
        categoryColor: monka.colors.themeAdmin,
        icon: <IconClipboard size={28} color={monka.colors.themeAdmin} />,
    },
};

export const Carousel: Story = {
    render: () => (
        <div style={{ display: "flex", gap: 12, overflow: "auto", padding: "8px 0" }}>
            <ResourceCard
                title="Les objectifs de la plateforme de répit"
                readingTime="3 min"
                category="Santé"
                categoryColor={monka.colors.themeSante}
                icon={<IconTarget size={28} color={monka.colors.themeSante} />}
            />
            <ResourceCard
                title="Comment contacter la CAF"
                readingTime="5 min"
                category="Démarches"
                categoryColor={monka.colors.themeAdmin}
                icon={<IconClipboard size={28} color={monka.colors.themeAdmin} />}
            />
            <ResourceCard
                title="Prendre soin de soi en tant qu'aidant"
                readingTime="4 min"
                category="Bien-être"
                categoryColor={monka.colors.themeBienEtre}
                icon={<IconStar size={28} color={monka.colors.themeBienEtre} />}
            />
        </div>
    ),
};
