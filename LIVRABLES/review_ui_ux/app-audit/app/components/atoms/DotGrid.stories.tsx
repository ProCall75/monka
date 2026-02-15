import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { DotGrid } from './DotGrid';

const meta = {
    title: 'Atoms/DotGrid',
    component: DotGrid,
    tags: ['autodocs'],
    argTypes: {
        filled: { control: { type: 'range', min: 0, max: 20 } },
        total: { control: { type: 'range', min: 1, max: 30 } },
    },
} satisfies Meta<typeof DotGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { filled: 12, total: 20 } };
export const Empty: Story = { args: { filled: 0, total: 20 } };
export const Full: Story = { args: { filled: 20, total: 20 } };
export const HalfFilled: Story = { args: { filled: 10, total: 20 } };
