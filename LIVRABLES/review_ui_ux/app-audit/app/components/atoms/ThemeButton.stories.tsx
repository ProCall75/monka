import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ThemeButton } from './ThemeButton';

const meta = {
    title: 'Moteur — Vulnérabilité/Bouton thème',
    component: ThemeButton,
    tags: ['autodocs'],
    argTypes: {
        domain: {
            control: 'select',
            options: ['R', 'A', 'S', 'F', 'M'],
            description: 'Vulnerability domain from kernel-types.ts',
        },
        isSelected: { control: 'boolean' },
        showLabel: { control: 'boolean' },
        size: { control: 'select', options: ['sm', 'md', 'lg'] },
    },
} satisfies Meta<typeof ThemeButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Social: Story = { args: { domain: 'R', showLabel: true } };
export const Demarches: Story = { args: { domain: 'A', showLabel: true } };
export const Sante: Story = { args: { domain: 'S', showLabel: true } };
export const Proche: Story = { args: { domain: 'F', showLabel: true } };
export const Soins: Story = { args: { domain: 'M', showLabel: true } };
export const Selected: Story = { args: { domain: 'R', isSelected: true, showLabel: true } };
export const Small: Story = { args: { domain: 'S', size: 'sm', showLabel: false } };
export const Large: Story = { args: { domain: 'F', size: 'lg', showLabel: true } };

export const AllDomains: Story = {
    args: { domain: 'R' },
    render: () => (
        <div className="flex gap-4">
            {(['R', 'A', 'S', 'F', 'M'] as const).map((d) => (
                <ThemeButton key={d} domain={d} showLabel />
            ))}
        </div>
    ),
};
