import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { MProgressDots } from './MProgressDots';

const meta = {
    title: 'Atoms/MProgressDots',
    component: MProgressDots,
    tags: ['autodocs'],
    argTypes: {
        total: { control: { type: 'range', min: 2, max: 8 } },
        current: { control: { type: 'range', min: 0, max: 7 } },
        accentColor: { control: 'color' },
    },
} satisfies Meta<typeof MProgressDots>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Step1: Story = { args: { total: 5, current: 0 } };
export const Step3: Story = { args: { total: 5, current: 2 } };
export const Complete: Story = { args: { total: 5, current: 4 } };
export const CustomColor: Story = { args: { total: 4, current: 1, accentColor: '#8B5CF6' } };
