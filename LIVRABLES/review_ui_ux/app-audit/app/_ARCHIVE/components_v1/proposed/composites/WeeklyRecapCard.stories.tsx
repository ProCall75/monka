import type { Meta, StoryObj } from "@storybook/react";
import WeeklyRecapCard from "./WeeklyRecapCard";

const meta: Meta<typeof WeeklyRecapCard> = {
    title: "Composites/WeeklyRecapCard",
    component: WeeklyRecapCard,
    parameters: { layout: "centered" },
    decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof WeeklyRecapCard>;

export const InProgress: Story = {
    args: {
        actionsCompleted: 3,
        actionsTotal: 7,
        rdvCount: 1,
        articlesRead: 2,
        streak: 5,
        forWho: "Francine",
    },
};

export const JustStarted: Story = {
    args: {
        actionsCompleted: 0,
        actionsTotal: 5,
        rdvCount: 0,
        articlesRead: 0,
        streak: 0,
        forWho: "Francine",
    },
};

export const PerfectWeek: Story = {
    args: {
        actionsCompleted: 7,
        actionsTotal: 7,
        rdvCount: 2,
        articlesRead: 3,
        streak: 14,
        forWho: "Francine",
        message: "Semaine parfaite ! Tout est fait pour Francine.",
    },
};
