import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import MOptionPill from "./MOptionPill";

const meta: Meta<typeof MOptionPill> = {
    title: "Composites/MOptionPill",
    component: MOptionPill,
    argTypes: {
        label: { control: "text" },
        selected: { control: "boolean" },
        multi: { control: "boolean" },
    },
};
export default meta;
type Story = StoryObj<typeof MOptionPill>;

export const Unselected: Story = { args: { label: "Je suis salarié(e)" } };
export const Selected: Story = { args: { label: "Je suis salarié(e)", selected: true } };
export const Multi: Story = { args: { label: "Santé dentaire", selected: true, multi: true } };

export const QuestionnaireDemo: Story = {
    render: () => {
        const options = ["Salarié(e)", "Indépendant(e)", "Étudiant(e)", "Retraité(e)", "Sans emploi"];
        const [selected, setSelected] = useState("Salarié(e)");
        return (
            <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 8 }}>
                <p style={{ fontSize: 17, fontWeight: 600, color: "#1A1A2E", margin: "0 0 8px" }}>
                    Quel est votre statut ?
                </p>
                {options.map((opt) => (
                    <MOptionPill
                        key={opt}
                        label={opt}
                        selected={selected === opt}
                        onPress={() => setSelected(opt)}
                    />
                ))}
            </div>
        );
    },
};
