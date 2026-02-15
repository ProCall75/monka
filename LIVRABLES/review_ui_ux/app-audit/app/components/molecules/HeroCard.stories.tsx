import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { HeroCard } from './HeroCard';
import React from 'react';

const meta = {
    title: 'Molecules/HeroCard',
    component: HeroCard,
    tags: ['autodocs'],
    argTypes: {
        domain: { control: 'select', options: ['R', 'A', 'S', 'F', 'M'] },
        title: { control: 'text' },
        subtitle: { control: 'text' },
        targetPerson: { control: 'text' },
        taskCount: { control: { type: 'number', min: 0, max: 20 } },
    },
} satisfies Meta<typeof HeroCard>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Social: Story = {
    args: {
        domain: 'R',
        title: 'Retrouver du lien social',
        subtitle: 'Rompre l\'isolement et maintenir des relations de qualité.',
        targetPerson: 'Francine',
        taskCount: 3,
    },
};
export const Sante: Story = {
    args: {
        domain: 'S',
        title: 'Prendre soin de vous',
        subtitle: 'Votre santé physique et mentale est essentielle.',
        targetPerson: 'Vous',
        taskCount: 5,
    },
};
export const Soins: Story = {
    args: {
        domain: 'M',
        title: 'Parcours de soins coordonné',
        subtitle: 'Suivi médical et coordination des intervenants.',
        taskCount: 2,
    },
};
