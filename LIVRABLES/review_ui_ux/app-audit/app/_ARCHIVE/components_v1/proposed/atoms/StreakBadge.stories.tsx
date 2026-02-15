import type { Meta, StoryObj } from "@storybook/react";
import StreakBadge from "./StreakBadge";

const meta: Meta<typeof StreakBadge> = {
    title: "Primitives/StreakBadge",
    component: StreakBadge,
    parameters: { layout: "centered" },
    argTypes: {
        count: { control: { type: "range", min: 0, max: 30 } },
    },
};

export default meta;
type Story = StoryObj<typeof StreakBadge>;

export const Active: Story = {
    args: { count: 5, isActive: true },
};

export const LongStreak: Story = {
    args: { count: 14, isActive: true },
};

export const FirstDay: Story = {
    args: { count: 1, isActive: true },
};

export const Broken: Story = {
    args: { count: 0, isActive: false },
};

export const AllStates: Story = {
    render: () => (
        <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
            <StreakBadge count={0} isActive={false} />
            <StreakBadge count={1} isActive={true} />
            <StreakBadge count={5} isActive={true} />
            <StreakBadge count={14} isActive={true} />
        </div>
    ),
};
