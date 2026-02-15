import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import MTimelineStep from "./MTimelineStep";

const meta: Meta<typeof MTimelineStep> = {
    title: "Composites/MTimelineStep",
    component: MTimelineStep,
    argTypes: {
        title: { control: "text" },
        subtitle: { control: "text" },
        completed: { control: "boolean" },
        active: { control: "boolean" },
        isLast: { control: "boolean" },
    },
};
export default meta;
type Story = StoryObj<typeof MTimelineStep>;

export const Active: Story = { args: { title: "Remplir le questionnaire", subtitle: "En cours", active: true } };
export const Completed: Story = { args: { title: "Créer mon compte", subtitle: "Terminé", completed: true } };
export const Inactive: Story = { args: { title: "Prendre rendez-vous", isLast: true } };

export const FullTimeline: Story = {
    render: () => (
        <div style={{ padding: 16 }}>
            <MTimelineStep title="Créer mon compte" subtitle="Terminé" completed />
            <MTimelineStep title="Remplir le questionnaire" subtitle="5 min restantes" active />
            <MTimelineStep title="Analyser mes droits" />
            <MTimelineStep title="Prendre rendez-vous" isLast />
        </div>
    ),
};
