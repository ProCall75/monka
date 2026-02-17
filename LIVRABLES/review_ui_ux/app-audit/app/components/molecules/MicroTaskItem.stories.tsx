import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { MicroTaskItem } from './MicroTaskItem';
import type { MicroTask } from '../../data/kernel-types';
import React from 'react';

const meta = {
  title: 'Moteur — Micro-Tâche/Item',
  component: MicroTaskItem,
  tags: ['autodocs'],
} satisfies Meta<typeof MicroTaskItem>;
export default meta;
type Story = StoryObj<typeof meta>;

const contributiveTask: MicroTask = {
  id: 'mt-1',
  text: 'Prendre rendez-vous avec le médecin traitant pour un bilan complet.',
  type: 'MED',
  isContributive: true,
  isCompleted: false,
  actor: 'Dr. Martin',
};

const infoTask: MicroTask = {
  id: 'mt-2',
  text: "L'APA (Allocation Personnalisée d'Autonomie) peut financer jusqu'à 1 800€/mois d'aides.",
  type: 'INFO',
  isContributive: false,
  isCompleted: false,
};

const completedTask: MicroTask = {
  id: 'mt-3',
  text: 'Demander le dossier APA auprès du Conseil Départemental.',
  type: 'STRUC',
  isContributive: true,
  isCompleted: true,
};

export const ActionPrioritaire: Story = { args: { task: contributiveTask } };
export const BonASavoir: Story = { args: { task: infoTask } };
export const Completed: Story = { args: { task: completedTask } };

export const TaskList: Story = {
  args: { task: contributiveTask },
  render: () => (
    <div className="flex flex-col gap-2">
      <MicroTaskItem task={contributiveTask} />
      <MicroTaskItem task={infoTask} />
      <MicroTaskItem task={completedTask} />
    </div>
  ),
};
