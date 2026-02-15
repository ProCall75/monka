import type { Meta, StoryObj } from "@storybook/react";
import IPhoneMockup from "../../storybook/IPhoneMockup";
import ODashboardHeader from "./ODashboardHeader";

const meta: Meta<typeof ODashboardHeader> = {
    title: "Organisms/ODashboardHeader",
    component: ODashboardHeader,
    decorators: [(Story) => (<div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", padding: 24 }}><IPhoneMockup><Story /></IPhoneMockup></div>)],
    parameters: {
        layout: "fullscreen",
    },
    argTypes: {
        userName: { control: "text" },
        progressCount: { control: { type: "number", min: 0, max: 100 } },
        progressTotal: { control: { type: "number", min: 1, max: 100 } },
        subtitle: { control: "text" },
        showSubscribe: { control: "boolean" },
        hasNotification: { control: "boolean" },
    },
};
export default meta;
type Story = StoryObj<typeof ODashboardHeader>;

export const Default: Story = {
    args: {
        userName: "Marwane",
        progressCount: 0,
        progressTotal: 66,
        subtitle: "Voici vos actions clés du mois.",
        showSubscribe: true,
        hasNotification: true,
    },
};

export const WithProgress: Story = {
    args: {
        userName: "Marwane",
        progressCount: 12,
        progressTotal: 66,
        subtitle: "Voici vos actions clés du mois.",
        showSubscribe: true,
        hasNotification: false,
    },
};

export const Subscribed: Story = {
    args: {
        userName: "Sophie",
        progressCount: 45,
        progressTotal: 66,
        subtitle: "Continuez votre parcours.",
        showSubscribe: false,
        hasNotification: true,
    },
};
