import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { StatCard } from './StatCard';
import { Heart, Users, Brain } from '@phosphor-icons/react';
import React from 'react';

const meta = {
    title: 'Molecules/StatCard',
    component: StatCard,
    tags: ['autodocs'],
    argTypes: {
        title: { control: 'text' },
        value: { control: 'text' },
        trend: { control: 'select', options: ['up', 'down', 'stable'] },
        trendValue: { control: 'text' },
    },
} satisfies Meta<typeof StatCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TrendUp: Story = {
    args: { title: 'Interactions', value: '12/sem', trend: 'up', trendValue: '+15%', icon: <Users size={24} weight="bold" /> },
};
export const TrendDown: Story = {
    args: { title: 'Stress', value: 'Faible', trend: 'down', trendValue: '-12%', icon: <Heart size={24} weight="bold" /> },
};
export const Stable: Story = {
    args: { title: 'Qualité', value: 'Bonne', trend: 'stable', trendValue: 'Stable', icon: <Brain size={24} weight="bold" /> },
};
