import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { WeekChart } from './WeekChart';

const meta = {
    title: 'Molecules/WeekChart',
    component: WeekChart,
    tags: ['autodocs'],
    argTypes: {
        activeDay: { control: { type: 'range', min: 0, max: 6 } },
        accentColor: { control: 'color' },
        barColor: { control: 'color' },
    },
} satisfies Meta<typeof WeekChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: {} };
export const MondayActive: Story = { args: { activeDay: 0 } };
export const CustomColors: Story = {
    args: { accentColor: '#EC4899', barColor: '#FCE7F3' },
};
