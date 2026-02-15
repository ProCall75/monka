import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { TabPills } from './TabPills';

const meta = {
    title: 'Molecules/TabPills',
    component: TabPills,
    tags: ['autodocs'],
    argTypes: {
        tabs: { control: 'object' },
        activeIndex: { control: { type: 'number', min: 0, max: 5 } },
    },
} satisfies Meta<typeof TabPills>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: { tabs: ['Mes Aides', 'Contacts', 'Questionnaire', 'Historique'], activeIndex: 0 },
};
export const SecondActive: Story = {
    args: { tabs: ['Mes Aides', 'Contacts', 'Questionnaire', 'Historique'], activeIndex: 1 },
};
export const ThemesTabs: Story = {
    args: { tabs: ['À la une', 'Santé', 'Démarches', 'Services'], activeIndex: 0 },
};
