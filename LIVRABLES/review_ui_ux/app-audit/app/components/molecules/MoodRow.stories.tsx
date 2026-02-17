import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { MoodRow } from './MoodRow';

const meta = {
    title: 'Moteur — Questionnaire/Humeur',
    component: MoodRow,
    tags: ['autodocs'],
} satisfies Meta<typeof MoodRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
