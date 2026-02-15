import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { DangerAction } from './DangerAction';

const meta = {
    title: 'Atoms/DangerAction',
    component: DangerAction,
    tags: ['autodocs'],
    argTypes: {
        label: { control: 'text' },
    },
} satisfies Meta<typeof DangerAction>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { label: 'Déconnexion' } };
export const DeleteAccount: Story = { args: { label: 'Supprimer mon compte' } };
