import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ProfileCard } from './ProfileCard';

const meta = {
    title: 'Molecules/ProfileCard',
    component: ProfileCard,
    tags: ['autodocs'],
    argTypes: {
        name: { control: 'text' },
        email: { control: 'text' },
        avatarUrl: { control: 'text' },
    },
} satisfies Meta<typeof ProfileCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: { name: 'Marie Dupont', email: 'marie.d@email.com' },
};
export const WithAvatar: Story = {
    args: {
        name: 'Marwane',
        email: 'marwane@monka.care',
        avatarUrl: 'https://ui-avatars.com/api/?name=Marwane&background=8B5CF6&color=fff',
    },
};
