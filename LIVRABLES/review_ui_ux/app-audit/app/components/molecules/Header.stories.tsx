import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Header } from './Header';

const meta = {
    title: 'Molecules/Header',
    component: Header,
    tags: ['autodocs'],
    argTypes: {
        name: { control: 'text' },
        variant: { control: 'select', options: ['design1', 'design2'] },
        notificationCount: { control: { type: 'number', min: 0, max: 20 } },
        subtitle: { control: 'text' },
    },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Design2: Story = {
    args: { name: 'Marie', variant: 'design2', notificationCount: 3 },
};
export const Design1: Story = {
    args: { name: 'Marie', variant: 'design1', subtitle: 'Résumé quotidien' },
};
export const NoNotifications: Story = {
    args: { name: 'Marwane', variant: 'design2', notificationCount: 0 },
};
