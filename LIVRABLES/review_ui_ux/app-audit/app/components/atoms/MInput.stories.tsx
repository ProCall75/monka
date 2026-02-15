import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { MInput } from './MInput';

const meta = {
    title: 'Atoms/MInput',
    component: MInput,
    tags: ['autodocs'],
    argTypes: {
        label: { control: 'text' },
        type: { control: 'select', options: ['text', 'email', 'password', 'tel'] },
        placeholder: { control: 'text' },
        error: { control: 'text' },
        disabled: { control: 'boolean' },
    },
} satisfies Meta<typeof MInput>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { label: 'Votre nom' } };
export const Email: Story = { args: { label: 'Adresse email', type: 'email', placeholder: 'marie@monka.care' } };
export const WithError: Story = { args: { label: 'Mot de passe', type: 'password', error: 'Minimum 8 caractères' } };
export const Disabled: Story = { args: { label: 'Code postal', disabled: true, value: '75001' } };
