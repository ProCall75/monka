import type { Meta, StoryObj } from "@storybook/react";
import IPhoneMockup from "../../storybook/IPhoneMockup";
import OBottomTabBar from "./OBottomTabBar";

const meta: Meta<typeof OBottomTabBar> = {
    title: "Organisms/OBottomTabBar",
    component: OBottomTabBar,
    parameters: {
        layout: "fullscreen",
    },
    argTypes: {
        activeTab: {
            control: "select",
            options: ["pour-moi", "ressources", "messagerie", "mes-informations"],
        },
    },
    decorators: [
        (Story) => (
            <div style={{ minHeight: 200, display: "flex", flexDirection: "column", justifyContent: "flex-end", background: "#E8F4F8" }}>
                <Story />
            </div>
        ),
    ],
};
export default meta;
type Story = StoryObj<typeof OBottomTabBar>;

export const PourMoi: Story = {
    args: {
        activeTab: "pour-moi",
    },
};

export const Ressources: Story = {
    args: {
        activeTab: "ressources",
    },
};

export const Messagerie: Story = {
    args: {
        activeTab: "messagerie",
    },
};

export const MesInformations: Story = {
    args: {
        activeTab: "mes-informations",
    },
};
