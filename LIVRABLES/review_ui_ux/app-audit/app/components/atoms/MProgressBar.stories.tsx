import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { MProgressBar } from './MProgressBar';

const meta = {
    title: 'Atoms/MProgressBar',
    component: MProgressBar,
    tags: ['autodocs'],
    argTypes: {
        progress: { control: { type: 'range', min: 0, max: 100 } },
        color: { control: 'color' },
        height: { control: { type: 'range', min: 4, max: 20 } },
        animated: { control: 'boolean' },
        label: { control: 'text' },
    },
} satisfies Meta<typeof MProgressBar>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { progress: 65 } };
export const WithLabel: Story = { args: { progress: 42, label: 'Analyse en cours…' } };
export const Complete: Story = { args: { progress: 100, color: '#10B981', label: 'Terminé !' } };
export const Thin: Story = { args: { progress: 30, height: 4 } };
