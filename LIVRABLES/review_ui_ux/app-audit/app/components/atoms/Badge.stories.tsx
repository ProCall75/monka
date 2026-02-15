import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Badge } from './Badge';

const meta = {
    title: 'Atoms/Badge',
    component: Badge,
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['critique', 'vigilance', 'standard'],
        },
        label: { control: 'text' },
    },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Critique: Story = { args: { variant: 'critique' } };
export const Vigilance: Story = { args: { variant: 'vigilance' } };
export const Standard: Story = { args: { variant: 'standard' } };
export const CustomLabel: Story = { args: { variant: 'critique', label: 'Urgent !' } };
