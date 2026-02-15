import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { BottomNavPill } from './BottomNavPill';
import React from 'react';

const meta = {
    title: 'Navigation/BottomNavPill',
    component: BottomNavPill,
    tags: ['autodocs'],
    argTypes: {
        activeTab: {
            control: 'select',
            options: ['home', 'clipboard', 'chat', 'community', 'settings'],
        },
    },
    decorators: [
        (Story: React.ComponentType) => (
            <div className="relative rounded-[24px] overflow-hidden bg-[#F3EAE3]" style={{ height: 100 }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof BottomNavPill>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Home: Story = { args: { activeTab: 'home' } };
export const Chat: Story = { args: { activeTab: 'chat' } };
export const Settings: Story = { args: { activeTab: 'settings' } };
