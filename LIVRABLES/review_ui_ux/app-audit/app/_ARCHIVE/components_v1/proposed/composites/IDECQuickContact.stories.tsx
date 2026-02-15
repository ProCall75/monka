import type { Meta, StoryObj } from "@storybook/react";
import IDECQuickContact from "./IDECQuickContact";

const meta: Meta<typeof IDECQuickContact> = {
    title: "Composites/IDECQuickContact",
    component: IDECQuickContact,
    parameters: { layout: "centered" },
    decorators: [(Story) => <div style={{ width: 340 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof IDECQuickContact>;

export const Online: Story = {
    args: {
        name: "Sophie",
        role: "Votre IDEC",
        isOnline: true,
        initials: "S",
    },
};

export const Offline: Story = {
    args: {
        name: "Sophie",
        role: "Votre IDEC",
        isOnline: false,
        initials: "S",
    },
};
