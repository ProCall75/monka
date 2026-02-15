import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { MAvatar } from './MAvatar';
import React from 'react';

const meta = {
    title: 'Atoms/MAvatar',
    component: MAvatar,
    tags: ['autodocs'],
    argTypes: {
        name: { control: 'text' },
        size: { control: 'select', options: ['sm', 'md', 'lg'] },
        bgColor: { control: 'color' },
    },
} satisfies Meta<typeof MAvatar>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { name: 'Marie Dupont' } };
export const WithImage: Story = {
    args: { name: 'Marwane', src: 'https://ui-avatars.com/api/?name=MW&background=8B5CF6&color=fff&bold=true' },
};
export const Small: Story = { args: { name: 'Dr. Martin', size: 'sm' } };
export const Large: Story = { args: { name: 'Francine Dupont', size: 'lg' } };
export const Group: Story = {
    args: { name: 'Group' },
    render: () => (
        <div className="flex -space-x-2">
            <MAvatar name="Marie D" />
            <MAvatar name="Dr. Martin" />
            <MAvatar name="Infirmière Claire" />
        </div>
    ),
};
