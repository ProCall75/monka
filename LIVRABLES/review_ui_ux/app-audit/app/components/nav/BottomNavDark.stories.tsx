import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { BottomNavDark, BottomNavGlass } from './BottomNav';
import React from 'react';

const metaDark = {
    title: 'Navigation/BottomNavDark',
    component: BottomNavDark,
    tags: ['autodocs'],
    decorators: [
        (Story: React.ComponentType) => (
            <div className="relative rounded-[24px] overflow-hidden bg-[#F3EAE3]" style={{ height: 120 }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof BottomNavDark>;

export default metaDark;
type Story = StoryObj<typeof metaDark>;

export const Default: Story = {};
