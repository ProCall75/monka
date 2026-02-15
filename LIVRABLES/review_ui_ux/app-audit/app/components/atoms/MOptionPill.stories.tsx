import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { MOptionPill } from './MOptionPill';
import React from 'react';

const meta = {
    title: 'Atoms/MOptionPill',
    component: MOptionPill,
    tags: ['autodocs'],
    argTypes: {
        label: { control: 'text' },
        isSelected: { control: 'boolean' },
        variant: { control: 'select', options: ['radio', 'multi'] },
    },
} satisfies Meta<typeof MOptionPill>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Unselected: Story = { args: { label: 'Oui, régulièrement' } };
export const Selected: Story = { args: { label: 'Oui, régulièrement', isSelected: true } };
export const QuestionnaireExample: Story = {
    args: { label: 'Example' },
    render: () => (
        <div className="flex flex-col gap-3">
            <MOptionPill label="Oui, régulièrement" isSelected />
            <MOptionPill label="Parfois, quand j'en ressens le besoin" />
            <MOptionPill label="Rarement" />
            <MOptionPill label="Non, jamais" />
        </div>
    ),
};
