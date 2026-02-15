import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { SettingsRow, SettingsSection } from './SettingsRow';
import { Bell, Moon, Eye } from '@phosphor-icons/react';
import React from 'react';

const meta = {
    title: 'Molecules/SettingsRow',
    component: SettingsRow,
    tags: ['autodocs'],
    argTypes: {
        label: { control: 'text' },
        action: { control: 'select', options: ['chevron', 'toggle', 'label'] },
        checked: { control: 'boolean' },
        actionLabel: { control: 'text' },
        isFirst: { control: 'boolean' },
        isLast: { control: 'boolean' },
    },
} satisfies Meta<typeof SettingsRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Chevron: Story = {
    args: {
        icon: <Bell size={22} weight="bold" className="text-[#3C4A6B]" />,
        iconBg: '#E4E9F4',
        label: 'Notifications',
        action: 'chevron',
        isFirst: true,
        isLast: true,
    },
};

export const Toggle: Story = {
    args: {
        icon: <Moon size={22} weight="bold" className="text-[#8F6B22]" />,
        iconBg: '#FDF3D8',
        label: 'Mode Sombre',
        action: 'toggle',
        checked: false,
    },
};

export const Label: Story = {
    args: {
        icon: <Eye size={22} weight="bold" className="text-[#165C38]" />,
        iconBg: '#E0F5E9',
        label: 'Accessibilité',
        action: 'label',
        actionLabel: 'Standard',
    },
};

export const FullSection: Story = {
    args: { label: 'Section', action: 'chevron' as const, icon: <Bell size={22} weight="bold" className="text-[#3C4A6B]" />, iconBg: '#E4E9F4' },
    render: () => (
        <SettingsSection title="Préférences">
            <SettingsRow
                icon={<Bell size={22} weight="bold" className="text-[#3C4A6B]" />}
                iconBg="#E4E9F4"
                label="Notifications"
                action="chevron"
                isFirst
            />
            <SettingsRow
                icon={<Moon size={22} weight="bold" className="text-[#8F6B22]" />}
                iconBg="#FDF3D8"
                label="Mode Sombre"
                action="toggle"
                checked={false}
            />
            <SettingsRow
                icon={<Eye size={22} weight="bold" className="text-[#165C38]" />}
                iconBg="#E0F5E9"
                label="Accessibilité"
                action="label"
                actionLabel="Standard"
                isLast
            />
        </SettingsSection>
    ),
};
