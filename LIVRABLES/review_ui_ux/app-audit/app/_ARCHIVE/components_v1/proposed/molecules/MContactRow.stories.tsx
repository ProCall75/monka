import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import MContactRow from "./MContactRow";

const meta: Meta<typeof MContactRow> = {
    title: "Composites/MContactRow",
    component: MContactRow,
    argTypes: {
        name: { control: "text" },
        type: { control: "text" },
        phone: { control: "text" },
        showSeparator: { control: "boolean" },
    },
};
export default meta;
type Story = StoryObj<typeof MContactRow>;

export const Default: Story = { args: { name: "Dr. Martin", type: "Médecin traitant", phone: "01 23 45 67 89" } };
export const NoPhone: Story = { args: { name: "CPAM Paris", type: "Organisme" } };

export const ContactList: Story = {
    render: () => (
        <div style={{ background: "#fff", borderRadius: 16 }}>
            <MContactRow name="Dr. Martin" type="Médecin traitant" phone="01 23 45 67 89" />
            <MContactRow name="Dr. Dupont" type="Dentiste" phone="01 98 76 54 32" />
            <MContactRow name="CPAM Paris" type="Organisme" />
            <MContactRow name="Pharmacie Centrale" type="Pharmacie" phone="01 11 22 33 44" showSeparator={false} />
        </div>
    ),
};
