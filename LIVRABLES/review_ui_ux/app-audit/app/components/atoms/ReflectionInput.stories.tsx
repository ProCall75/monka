import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ReflectionInput } from './ReflectionInput';

const meta = {
    title: 'Atoms/ReflectionInput',
    component: ReflectionInput,
    tags: ['autodocs'],
    argTypes: {
        variant: { control: 'select', options: ['warm', 'cream'] },
        placeholder: { control: 'text' },
    },
} satisfies Meta<typeof ReflectionInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Warm: Story = { args: { variant: 'warm' } };
export const Cream: Story = { args: { variant: 'cream' } };
export const CustomPlaceholder: Story = {
    args: { variant: 'warm', placeholder: 'Décrivez votre journée…' },
};
