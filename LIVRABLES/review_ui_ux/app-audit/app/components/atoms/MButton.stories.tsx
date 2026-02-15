import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { MButton } from './MButton';
import { ArrowRight, Plus, Trash } from '@phosphor-icons/react';
import React from 'react';

const meta = {
    title: 'Atoms/MButton',
    component: MButton,
    tags: ['autodocs'],
    argTypes: {
        variant: { control: 'select', options: ['primary', 'secondary', 'ghost', 'danger'] },
        size: { control: 'select', options: ['sm', 'md', 'lg'] },
        fullWidth: { control: 'boolean' },
        disabled: { control: 'boolean' },
    },
} satisfies Meta<typeof MButton>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = { args: { children: "C'est parti !" } };
export const Secondary: Story = { args: { variant: 'secondary', children: 'En savoir plus' } };
export const Ghost: Story = { args: { variant: 'ghost', children: 'Passer' } };
export const Danger: Story = { args: { variant: 'danger', children: 'Supprimer' } };
export const WithIcon: Story = {
    args: { children: 'Commencer', icon: <ArrowRight size={18} weight="bold" /> },
};
export const FullWidth: Story = { args: { children: "C'est fait !", fullWidth: true, size: 'lg' } };
export const Small: Story = { args: { children: 'Ajouter', size: 'sm', icon: <Plus size={16} weight="bold" /> } };
export const Disabled: Story = { args: { children: 'Indisponible', disabled: true } };
