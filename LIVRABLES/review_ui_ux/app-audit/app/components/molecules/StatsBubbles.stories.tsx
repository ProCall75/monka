import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { StatsBubbles } from './StatsBubbles';

const meta = {
    title: 'Molecules/StatsBubbles',
    component: StatsBubbles,
    tags: ['autodocs'],
} satisfies Meta<typeof StatsBubbles>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
