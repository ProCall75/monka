import type { Meta, StoryObj } from "@storybook/react";
import OWeeklySnapshot from "./OWeeklySnapshot";
import { monka } from "../monka-design-tokens";

const meta: Meta<typeof OWeeklySnapshot> = {
    title: "Organisms/OWeeklySnapshot",
    component: OWeeklySnapshot,
    parameters: { layout: "centered" },
    decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof OWeeklySnapshot>;

export const Default: Story = {
    args: {
        domains: [
            { label: "Santé", value: 75, color: monka.colors.themeSante },
            { label: "Admin", value: 40, color: monka.colors.themeAdmin },
            { label: "Bien-être", value: 90, color: monka.colors.themeBienEtre },
        ],
        streak: 5,
        phase: 2,
        forWho: "Francine",
    },
};

export const Beginner: Story = {
    args: {
        domains: [
            { label: "Santé", value: 10, color: monka.colors.themeSante },
            { label: "Admin", value: 5, color: monka.colors.themeAdmin },
            { label: "Bien-être", value: 15, color: monka.colors.themeBienEtre },
        ],
        streak: 1,
        phase: 1,
        forWho: "Francine",
    },
};

export const Advanced: Story = {
    args: {
        domains: [
            { label: "Santé", value: 95, color: monka.colors.themeSante },
            { label: "Admin", value: 80, color: monka.colors.themeAdmin },
            { label: "Bien-être", value: 100, color: monka.colors.themeBienEtre },
        ],
        streak: 14,
        phase: 3,
        forWho: "Francine",
    },
};
