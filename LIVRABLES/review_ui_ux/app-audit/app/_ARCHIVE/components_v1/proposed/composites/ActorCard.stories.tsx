import type { Meta, StoryObj } from "@storybook/react";
import ActorCard from "./ActorCard";

const meta: Meta<typeof ActorCard> = {
    title: "Composites/ActorCard",
    component: ActorCard,
    parameters: { layout: "centered" },
    decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof ActorCard>;

export const Medecin: Story = {
    args: {
        name: "Dr. Martin Dupont",
        specialty: "Médecin généraliste",
        type: "medecin",
        distance: "1.2 km",
        address: "12 rue de la Santé, 75013",
        available: true,
        phone: "01 23 45 67 89",
    },
};

export const CCAS: Story = {
    args: {
        name: "CCAS Paris 13",
        specialty: "Centre communal d'action sociale",
        type: "ccas",
        distance: "800 m",
        address: "1 place d'Italie, 75013",
        available: true,
    },
};

export const AideDomicile: Story = {
    args: {
        name: "Association Aide et Présence",
        specialty: "Aide à domicile",
        type: "aide-domicile",
        distance: "2.5 km",
        address: "34 avenue des Gobelins, 75005",
        phone: "01 98 76 54 32",
    },
};

export const AllTypes: Story = {
    render: () => (
        <div style={{ display: "flex", flexDirection: "column", gap: 10, width: 360 }}>
            <ActorCard name="Dr. Martin Dupont" specialty="Médecin généraliste" type="medecin" distance="1.2 km" available={true} phone="01 23 45 67 89" />
            <ActorCard name="CCAS Paris 13" specialty="Centre communal d'action sociale" type="ccas" distance="800 m" available={true} />
            <ActorCard name="CAF Paris" specialty="Allocations familiales" type="caf" distance="3 km" />
            <ActorCard name="Mme Leblanc" specialty="Kinésithérapeute" type="kine" distance="500 m" available={true} phone="01 11 22 33 44" />
            <ActorCard name="Pharmacie du Parc" specialty="Pharmacie" type="pharmacie" distance="200 m" available={true} />
        </div>
    ),
};
