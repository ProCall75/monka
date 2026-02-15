import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { RecoCard } from './RecoCard';
import { Coffee, Leaf } from '@phosphor-icons/react';
import React from 'react';

const meta = {
    title: 'Molecules/RecoCard',
    component: RecoCard,
    tags: ['autodocs'],
    argTypes: {
        title: { control: 'text' },
        description: { control: 'text' },
        iconBg: { control: 'color' },
        defaultAdded: { control: 'boolean' },
    },
} satisfies Meta<typeof RecoCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NotAdded: Story = {
    args: {
        icon: <Coffee size={24} weight="fill" className="text-[#8F6B22]" />,
        iconBg: '#FDF3D8',
        title: 'Micro-pause sociale',
        description: "Appelez un ami pendant 10 minutes aujourd'hui pour rompre l'isolement.",
    },
};
export const Added: Story = {
    args: {
        icon: <Leaf size={24} weight="fill" className="text-[#165C38]" />,
        iconBg: '#E0F5E9',
        title: 'Sortie au grand air',
        description: 'Une promenade de 20 min dans un lieu fréquenté stimule le moral.',
        defaultAdded: true,
    },
};
