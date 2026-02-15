import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import MProgressDots from "./MProgressDots";

const meta: Meta<typeof MProgressDots> = {
    title: "Primitives/MProgressDots",
    component: MProgressDots,
    argTypes: {
        current: { control: { type: "number", min: 0, max: 10 } },
        total: { control: { type: "number", min: 1, max: 15 } },
    },
};
export default meta;
type Story = StoryObj<typeof MProgressDots>;

export const Step1: Story = { args: { current: 0, total: 11 } };
export const Step5: Story = { args: { current: 4, total: 11 } };
export const Step11: Story = { args: { current: 10, total: 11 } };
export const ThreeSteps: Story = { args: { current: 1, total: 3 } };
