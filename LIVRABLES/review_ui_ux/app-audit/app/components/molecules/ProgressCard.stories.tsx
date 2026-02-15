import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ProgressCard } from './ProgressCard';

const meta = {
    title: 'Molecules/ProgressCard',
    component: ProgressCard,
    tags: ['autodocs'],
    argTypes: {
        percentage: { control: { type: 'range', min: 0, max: 100 } },
        variant: { control: 'select', options: ['hero', 'compact'] },
        label: { control: 'text' },
    },
} satisfies Meta<typeof ProgressCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Hero: Story = { args: { percentage: 89, variant: 'hero' } };
export const Compact: Story = { args: { percentage: 65, variant: 'compact' } };
export const Starting: Story = { args: { percentage: 12, variant: 'hero' } };
export const Complete: Story = { args: { percentage: 100, variant: 'hero' } };
