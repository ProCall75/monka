import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ScoreRing } from './ScoreRing';

const meta = {
    title: 'Moteur — Questionnaire/Score Ring',
    component: ScoreRing,
    tags: ['autodocs'],
    argTypes: {
        score: { control: { type: 'range', min: 0, max: 100 } },
        size: { control: { type: 'range', min: 64, max: 256 } },
        strokeWidth: { control: { type: 'range', min: 4, max: 20 } },
        color: { control: 'color' },
        label: { control: 'text' },
    },
} satisfies Meta<typeof ScoreRing>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { score: 62, size: 160, color: '#8F6B22' } };
export const Small: Story = { args: { score: 85, size: 96, color: '#10B981' } };
export const Large: Story = { args: { score: 42, size: 208, color: '#EC4899' } };
export const Full: Story = { args: { score: 100, size: 160, color: '#8B5CF6' } };
export const Empty: Story = { args: { score: 0, size: 160, color: '#9CA3AF' } };
