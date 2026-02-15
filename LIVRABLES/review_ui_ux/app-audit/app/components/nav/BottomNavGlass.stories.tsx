import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { BottomNavGlass } from './BottomNav';
import React from 'react';

const meta = {
    title: 'Navigation/BottomNavGlass',
    component: BottomNavGlass,
    tags: ['autodocs'],
    decorators: [
        (Story: React.ComponentType) => (
            <div className="relative rounded-[24px] overflow-hidden bg-[#FDF6F0]" style={{ height: 140 }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof BottomNavGlass>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
