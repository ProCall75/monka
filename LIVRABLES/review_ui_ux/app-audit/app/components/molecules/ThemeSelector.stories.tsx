import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ThemeSelector } from './ThemeSelector';

const meta = {
    title: 'Moteur — Vulnérabilité/Sélecteur de thèmes',
    component: ThemeSelector,
    tags: ['autodocs'],
    argTypes: {
        title: { control: 'text' },
        showLabels: { control: 'boolean' },
        defaultSelected: {
            control: 'select',
            options: [null, 'R', 'A', 'S', 'F', 'M'],
        },
    },
} satisfies Meta<typeof ThemeSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: {} };
export const WithPreselection: Story = { args: { defaultSelected: 'S' } };
export const NoLabels: Story = { args: { showLabels: false } };
export const CustomTitle: Story = { args: { title: 'Explorez vos thèmes' } };
