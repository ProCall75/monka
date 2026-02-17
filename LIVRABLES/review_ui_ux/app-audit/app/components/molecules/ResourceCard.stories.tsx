import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ResourceCard } from './ResourceCard';

const meta = {
    title: 'Moteur — Recommandation/Ressource',
    component: ResourceCard,
    tags: ['autodocs'],
    argTypes: {
        domain: { control: 'select', options: [undefined, 'R', 'A', 'S', 'F', 'M'] },
        readingTime: { control: { type: 'number', min: 1, max: 30 } },
    },
} satisfies Meta<typeof ResourceCard>;
export default meta;
type Story = StoryObj<typeof meta>;

export const WithImage: Story = {
    args: {
        title: "Comment éviter l'épuisement de l'aidant",
        description: "Des stratégies concrètes pour préserver votre énergie au quotidien.",
        readingTime: 5,
        domain: 'S',
        category: 'Santé',
        imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop',
    },
};
export const NoImage: Story = {
    args: {
        title: "Guide APA : vos droits expliqués simplement",
        description: "Tout savoir sur l'Allocation Personnalisée d'Autonomie.",
        readingTime: 8,
        domain: 'A',
        category: 'Démarches',
    },
};
export const Short: Story = {
    args: {
        title: "3 exercices de respiration pour se détendre",
        readingTime: 2,
        category: 'Bien-être',
    },
};
