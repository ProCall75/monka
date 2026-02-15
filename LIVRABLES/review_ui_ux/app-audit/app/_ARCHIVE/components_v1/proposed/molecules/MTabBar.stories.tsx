import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import MTabBar from "./MTabBar";

const meta: Meta<typeof MTabBar> = {
    title: "Composites/MTabBar",
    component: MTabBar,
    argTypes: {
        activeTab: { control: "select", options: ["pour-moi", "ressources", "messagerie", "mes-informations"] },
    },
};
export default meta;
type Story = StoryObj<typeof MTabBar>;

export const PourMoi: Story = { args: { activeTab: "pour-moi" } };
export const Ressources: Story = { args: { activeTab: "ressources" } };
export const Messagerie: Story = { args: { activeTab: "messagerie" } };
export const MesInfos: Story = { args: { activeTab: "mes-informations" } };

export const Interactive: Story = {
    render: () => {
        const [tab, setTab] = useState<"pour-moi" | "ressources" | "messagerie" | "mes-informations">("pour-moi");
        return <MTabBar activeTab={tab} onTabChange={setTab} />;
    },
};
