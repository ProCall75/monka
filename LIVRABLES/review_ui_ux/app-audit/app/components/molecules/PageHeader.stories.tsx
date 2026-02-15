import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { PageHeader } from './PageHeader';
import { Badge } from '../atoms/Badge';
import React from 'react';

const meta = {
    title: 'Molecules/PageHeader',
    component: PageHeader,
    tags: ['autodocs'],
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithBadge: Story = {
    args: { badge: <Badge variant="vigilance" /> },
    decorators: [
        (Story) => (
            <div className="bg-[#FFEAC2] rounded-[24px] overflow-hidden">
                <Story />
            </div>
        ),
    ],
};
export const WithoutBadge: Story = {
    args: {},
    decorators: [
        (Story) => (
            <div className="bg-[#F3EAE3] rounded-[24px] overflow-hidden">
                <Story />
            </div>
        ),
    ],
};
