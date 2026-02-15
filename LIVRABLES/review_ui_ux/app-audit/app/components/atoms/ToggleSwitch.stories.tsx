import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ToggleSwitch } from './ToggleSwitch';

const meta = {
    title: 'Atoms/ToggleSwitch',
    component: ToggleSwitch,
    tags: ['autodocs'],
    argTypes: {
        checked: { control: 'boolean' },
    },
} satisfies Meta<typeof ToggleSwitch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Off: Story = { args: { checked: false, onChange: () => { } } };
export const On: Story = { args: { checked: true, onChange: () => { } } };
