import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { MTag } from './MTag';
import React from 'react';

const meta = {
    title: 'Atoms/MTag',
    component: MTag,
    tags: ['autodocs'],
    argTypes: {
        label: { control: 'text' },
        domain: { control: 'select', options: [undefined, 'R', 'A', 'S', 'F', 'M'] },
        size: { control: 'select', options: ['sm', 'md'] },
    },
} satisfies Meta<typeof MTag>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Social: Story = { args: { label: 'Vie sociale', domain: 'R' } };
export const Demarches: Story = { args: { label: 'Démarches', domain: 'A' } };
export const Sante: Story = { args: { label: 'Santé', domain: 'S' } };
export const Proche: Story = { args: { label: 'Votre proche', domain: 'F' } };
export const Soins: Story = { args: { label: 'Parcours soins', domain: 'M' } };
export const Custom: Story = { args: { label: 'CCAS', color: '#6B7280', bgColor: 'rgba(107,114,128,0.08)' } };
export const AllDomains: Story = {
    args: { label: 'All' },
    render: () => (
        <div className="flex flex-wrap gap-2">
            <MTag label="Vie sociale" domain="R" />
            <MTag label="Démarches" domain="A" />
            <MTag label="Santé" domain="S" />
            <MTag label="Votre proche" domain="F" />
            <MTag label="Parcours soins" domain="M" />
        </div>
    ),
};
