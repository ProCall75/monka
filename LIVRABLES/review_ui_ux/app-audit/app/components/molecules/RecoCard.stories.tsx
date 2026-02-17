import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { RecoCard } from './RecoCard';
import React from 'react';

const meta = {
    title: 'Moteur — Recommandation/Carte reco',
    component: RecoCard,
    tags: ['autodocs'],
    argTypes: {
        title: { control: 'text' },
        domain: { control: 'select', options: ['R', 'A', 'S', 'F', 'M'] },
        urgency: { control: 'select', options: ['critical', 'ccc', 'standard', 'prevention'] },
    },
} satisfies Meta<typeof RecoCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Critical: Story = {
    args: {
        title: 'Identifier une plateforme de répit près de chez vous',
        domain: 'S',
        urgency: 'critical',
    },
};

export const Standard: Story = {
    args: {
        title: 'Micro-pause sociale quotidienne',
        domain: 'R',
        urgency: 'standard',
    },
};

export const Prevention: Story = {
    args: {
        title: 'Organiser un relais familial',
        domain: 'F',
        urgency: 'prevention',
    },
};

export const CCC: Story = {
    args: {
        title: 'Adapter le logement pour la sécurité',
        domain: 'A',
        urgency: 'ccc',
    },
};
