import type { Meta, StoryObj } from "@storybook/react";
import IPhoneMockup from "../../storybook/IPhoneMockup";
import OQuestionnaireScreen from "./OQuestionnaireScreen";

const meta: Meta<typeof OQuestionnaireScreen> = {
    title: "Organisms/OQuestionnaireScreen",
    component: OQuestionnaireScreen,
    decorators: [(Story) => (<div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", padding: 24 }}><IPhoneMockup><Story /></IPhoneMockup></div>)],
    parameters: {
        layout: "fullscreen",
    },
    argTypes: {
        totalDots: { control: { type: "number", min: 4, max: 20 } },
        filledDots: { control: { type: "number", min: 0, max: 20 } },
        canGoBack: { control: "boolean" },
    },
};
export default meta;
type Story = StoryObj<typeof OQuestionnaireScreen>;

export const SingleSelect: Story = {
    args: {
        question: {
            question: "Quel est votre sexe biologique ?",
            subtitle: "Cette précision est utilisée pour vous communiquer des informations médicales spécifiques à votre sexe biologique",
            options: ["Homme", "Femme"],
        },
        totalDots: 14,
        filledDots: 1,
        selectedOptions: new Set<number>(),
        canGoBack: false,
    },
};

export const WithSection: Story = {
    args: {
        question: {
            section: { number: 3, title: "Vos besoins en tant qu'aidant" },
            question: "Quels sont vos principaux besoins aujourd'hui ?",
            subtitle: "plusieurs réponses possibles",
            options: [
                "Être accompagné(e)",
                "Trouver des aides financières",
                "Organiser le quotidien",
                "Trouver du répit",
                "Comprendre la maladie",
                "Trouver des professionnels",
            ],
            multi: true,
        },
        totalDots: 14,
        filledDots: 9,
        selectedOptions: new Set([0, 3]),
        canGoBack: true,
    },
};

export const ManyOptions: Story = {
    args: {
        question: {
            section: { number: 4, title: "Précisons quelques éléments sur sa situation" },
            question: "Quels sont les professionnels qui interviennent déjà au domicile ?",
            subtitle: "plusieurs réponses possibles",
            options: [
                "Service à domicile (SAD) / auxiliaire de vie",
                "Service à domicile (SAD) / aide ménagère",
                "Service de soins infirmiers à domicile (SSIAD)",
                "Infirmier libéral",
                "Masseur kinésithérapeute",
                "Télé-assistance",
                "Portage de repas",
                "Aucun",
            ],
            multi: true,
        },
        totalDots: 14,
        filledDots: 12,
        selectedOptions: new Set([0, 2, 3]),
        canGoBack: true,
    },
};

export const AgeQuestion: Story = {
    args: {
        question: {
            question: "Quel âge a la personne aidée ?",
            subtitle: "(Sachez que la majorité numérique est atteinte dès 15 ans.)",
            options: ["Moins de 18 ans", "Entre 18 et 25 ans", "Entre 26 et 59 ans", "Entre 60 et 75 ans", "Plus de 75 ans"],
        },
        totalDots: 14,
        filledDots: 2,
        selectedOptions: new Set<number>(),
        canGoBack: true,
    },
};
