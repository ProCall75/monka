import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { TimelineStep } from './TimelineStep';
import React from 'react';

const meta = {
  title: 'Molecules/TimelineStep',
  component: TimelineStep,
  tags: ['autodocs'],
  argTypes: {
    status: { control: 'select', options: ['done', 'active', 'pending'] },
    isLast: { control: 'boolean' },
  },
} satisfies Meta<typeof TimelineStep>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Done: Story = {
  args: { label: 'Questionnaire complété', description: 'Analyse de vos réponses', status: 'done' },
};
export const Active: Story = {
  args: { label: 'Votre plan personnalisé', description: 'En cours de création…', status: 'active' },
};
export const Pending: Story = {
  args: { label: 'Suivi régulier', description: 'Bientôt disponible', status: 'pending', isLast: true },
};
export const FullTimeline: Story = {
  args: { label: 'Timeline', status: 'done' as const },
  render: () => (
    <div>
      <TimelineStep label="Questionnaire" description="Complété" status="done" />
      <TimelineStep label="Analyse" description="En cours…" status="active" />
      <TimelineStep label="Plan d'actions" description="Vos recommandations" status="pending" />
      <TimelineStep label="Suivi" description="Accompagnement continu" status="pending" isLast />
    </div>
  ),
};
