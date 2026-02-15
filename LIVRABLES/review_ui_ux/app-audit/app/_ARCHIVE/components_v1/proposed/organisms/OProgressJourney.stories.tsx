import type { Meta, StoryObj } from "@storybook/react";
import OProgressJourney from "./OProgressJourney";
import { monka } from "../monka-design-tokens";

const meta: Meta<typeof OProgressJourney> = {
    title: "Organisms/OProgressJourney",
    component: OProgressJourney,
    parameters: { layout: "centered" },
    decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof OProgressJourney>;

export const SanteJourney: Story = {
    args: {
        theme: "Santé",
        themeColor: monka.colors.themeSante,
        milestones: [
            { title: "Identifier le médecin traitant", description: "Contacté et premier RDV pris", status: "done", date: "5 fév." },
            { title: "Renouveler l'ordonnance", description: "Visite de suivi planifiée", status: "done", date: "8 fév." },
            { title: "Bilan sanguin annuel", description: "Laboratoire d'analyses à contacter", status: "current" },
            { title: "Évaluation gériatrique", description: "Consultation spécialisée recommandée", status: "locked" },
            { title: "Plan de soins personnalisé", description: "Synthèse avec le médecin coordonnateur", status: "locked" },
        ],
    },
};

export const AdminJourney: Story = {
    args: {
        theme: "Démarches",
        themeColor: monka.colors.themeAdmin,
        milestones: [
            { title: "Créer un dossier MDPH", status: "done", date: "1 fév." },
            { title: "Rassembler les justificatifs", description: "Certificats médicaux, bilans, CNI", status: "current" },
            { title: "Déposer le dossier", status: "locked" },
            { title: "Simuler les aides financières", status: "locked" },
        ],
    },
};
