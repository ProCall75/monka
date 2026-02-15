import type { Meta, StoryObj } from "@storybook/react";
import OThemeSection from "./OThemeSection";
import type { ThemeAction } from "./OThemeSection";
import { monka } from "../monka-design-tokens";
import { IconHealth, IconClipboard, IconCheck } from "../foundation/MonkaIcons";

const meta: Meta<typeof OThemeSection> = {
    title: "Organisms/OThemeSection",
    component: OThemeSection,
    decorators: [
        (Story) => (
            <div style={{ maxWidth: 390, margin: "0 auto", padding: 16, background: monka.colors.bgPrimary, minHeight: 500, fontFamily: monka.font.family }}>
                <Story />
            </div>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof OThemeSection>;

const santeActions: ThemeAction[] = [
    { id: "s1", type: "SEC", title: "Consultez un médecin pour la chute récente", forWho: "Francine", deadline: "Cette semaine" },
    { id: "s2", type: "STRUC", title: "Identifiez le médecin traitant de Francine", forWho: "Francine" },
    { id: "s3", type: "ORGA", title: "Prenez RDV chez le kinésithérapeute", forWho: "Francine" },
    { id: "s4", type: "MED", title: "Bilan sanguin trimestriel", forWho: "Francine", deadline: "Ce mois-ci" },
    { id: "s5", type: "INFO", title: "L'APA finance l'aide à domicile", forWho: "Francine", description: "L'Allocation Personnalisée d'Autonomie peut couvrir jusqu'à 1 800 par mois." },
    { id: "s6", type: "ORGA", title: "Renouveler l'ordonnance de Francine", forWho: "Francine" },
    { id: "s7", type: "INFO", title: "Le médecin traitant coordonne le parcours de soins", forWho: "Francine" },
    { id: "s8", type: "STRUC", title: "Mettre en place le dossier APA", forWho: "Francine" },
];

const demarchesActions: ThemeAction[] = [
    { id: "d1", type: "STRUC", title: "Contactez le CCAS de votre commune", forWho: "Francine" },
    { id: "d2", type: "ORGA", title: "Constituer le dossier d'aide sociale", forWho: "Francine" },
    { id: "d3", type: "INFO", title: "La CAF propose des aides complémentaires", forWho: "Francine", description: "Aide au logement, allocation de soutien familial..." },
    { id: "d4", type: "ORGA", title: "RDV avec l'assistante sociale", forWho: "Francine" },
];

export const Sante: Story = {
    args: {
        icon: <IconHealth size={20} color={monka.colors.tabGreen} />,
        title: "Santé de Francine",
        accentColor: monka.colors.tabGreen,
        actions: santeActions,
        maxVisible: 3,
        defaultOpen: true,
    },
};

export const DemarchesAvecProgression: Story = {
    args: {
        icon: <IconClipboard size={20} color={monka.colors.tabMint} />,
        title: "Démarches administratives",
        accentColor: monka.colors.tabMint,
        actions: demarchesActions.map((a, i) => ({
            ...a,
            completed: i === 0,
        })),
        maxVisible: 3,
        defaultOpen: true,
    },
};

export const ToutComplete: Story = {
    args: {
        icon: <IconCheck size={20} color={monka.colors.checkGreen} />,
        title: "Bien-être",
        accentColor: monka.colors.checkGreen,
        actions: [
            { id: "b1", type: "INFO", title: "Pensez à prendre soin de vous aussi", completed: true },
            { id: "b2", type: "ORGA", title: "Rejoindre un groupe de soutien aidants", completed: true },
        ],
        defaultOpen: true,
    },
};

export const MultipleSections: Story = {
    render: () => (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <OThemeSection
                icon={<IconHealth size={20} color={monka.colors.tabGreen} />}
                title="Santé de Francine"
                accentColor={monka.colors.tabGreen}
                actions={santeActions}
                maxVisible={3}
                defaultOpen={true}
            />
            <OThemeSection
                icon={<IconClipboard size={20} color={monka.colors.tabMint} />}
                title="Démarches administratives"
                accentColor={monka.colors.tabMint}
                actions={demarchesActions}
                maxVisible={3}
                defaultOpen={false}
            />
        </div>
    ),
};
