import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { TaskCard } from './TaskCard';
import React from 'react';

const meta = {
  title: 'Moteur — Micro-Tâche/Carte action',
  component: TaskCard,
  tags: ['autodocs'],
  argTypes: {
    criticality: { control: 'select', options: ['critical', 'ccc', 'standard', 'prevention'] },
    domain: { control: 'select', options: [undefined, 'R', 'A', 'S', 'F', 'M'] },
    targetPerson: { control: 'text' },
  },
} satisfies Meta<typeof TaskCard>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Critical: Story = {
  args: {
    title: 'Consulter votre médecin traitant',
    description: 'Un rendez-vous cette semaine pour faire le point sur votre fatigue.',
    criticality: 'critical',
    domain: 'S',
    targetPerson: 'Vous',
  },
};
export const Important: Story = {
  args: {
    title: 'Contacter le CCAS',
    description: 'Demander une évaluation APA pour mise en place d\'aides à domicile.',
    criticality: 'ccc',
    domain: 'A',
    targetPerson: 'Francine',
  },
};
export const Standard: Story = {
  args: {
    title: 'Rejoindre un groupe de parole',
    description: 'Un espace d\'écoute bienveillant pour partager votre vécu.',
    criticality: 'standard',
    domain: 'R',
  },
};
export const Prevention: Story = {
  args: {
    title: 'Découvrir le répit à domicile',
    description: 'Des solutions pour souffler au quotidien.',
    criticality: 'prevention',
    domain: 'F',
  },
};
