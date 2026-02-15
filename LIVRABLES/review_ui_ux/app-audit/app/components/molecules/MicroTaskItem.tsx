"use client";

import React from 'react';
import { Check, MapPin, Lightbulb, ArrowSquareOut } from '@phosphor-icons/react';
import type { MicroTask } from '../../data/kernel-types';
import type { ActionableAdvice } from '../../data/actionable-advice-data';

export interface MicroTaskItemProps {
    task: MicroTask;
    onToggle?: (taskId: string) => void;
    guidedAction?: ActionableAdvice;
    onNavigateToGuide?: (guide: ActionableAdvice) => void;
    onNavigateToResources?: () => void;
}

export const MicroTaskItem = ({ task, onToggle, guidedAction, onNavigateToGuide, onNavigateToResources }: MicroTaskItemProps) => {
    const badge = task.isContributive
        ? { icon: MapPin, label: 'Action prioritaire', color: '#2D2A26', bg: '#2D2A26' }
        : { icon: Lightbulb, label: 'Bon à savoir', color: '#8A857E', bg: '#8A857E' };

    const BadgeIcon = badge.icon;
    const hasGuide = !!guidedAction;

    // First contact for location display
    const firstContact = guidedAction?.contacts?.[0];

    return (
        <div className={`rounded-[16px] overflow-hidden transition-all duration-200 ${task.isCompleted
            ? 'border border-[#10B981]/20'
            : 'border border-[#EDE8E1]'
            }`}>
            {/* Main task row */}
            <button
                onClick={() => onToggle?.(task.id)}
                className={`
                    w-full flex items-start gap-3 p-4
                    text-left transition-all duration-200
                    ${task.isCompleted
                        ? 'bg-[#F0FDEE]'
                        : 'bg-white hover:bg-[#FAFAF8]'
                    }
                `}
            >
                {/* Checkbox */}
                <div
                    className={`
                        w-6 h-6 rounded-[8px] flex-shrink-0 flex items-center justify-center
                        transition-all duration-200 mt-0.5
                        ${task.isCompleted
                            ? 'bg-[#10B981]'
                            : 'border-2 border-[#B8B3AB]'
                        }
                    `}
                >
                    {task.isCompleted && <Check size={14} weight="bold" className="text-white" />}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <span
                            className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide"
                            style={{ color: badge.color }}
                        >
                            <BadgeIcon size={12} weight="bold" />
                            {badge.label}
                        </span>
                        {hasGuide && (
                            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-[#E8F4F8] text-[9px] font-bold text-[#1A6B5A] uppercase tracking-wider">
                                📋 Guide
                            </span>
                        )}
                    </div>
                    <p
                        className={`
                            text-[14px] leading-relaxed
                            ${task.isCompleted ? 'text-[#8A857E] line-through' : 'text-[#2D2A26]'}
                        `}
                        style={{ fontFamily: "'Outfit', 'Inter', sans-serif" }}
                    >
                        {task.text}
                    </p>
                    {task.actor && (
                        <p className="mt-1 text-[12px] text-[#B8B3AB]">
                            Intervenant : {task.actor}
                        </p>
                    )}

                    {/* ═══ Compact guide links (below task text) ═══ */}
                    {hasGuide && (
                        <div className="flex flex-wrap gap-2 mt-2.5">
                            {/* Link to guide */}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onNavigateToGuide?.(guidedAction);
                                }}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#E8F4F8] text-[#1A6B5A] rounded-full text-[11px] font-semibold hover:bg-[#D6EDF0] active:scale-95 transition-all"
                            >
                                📋 Voir le guide
                                <ArrowSquareOut size={11} weight="bold" />
                            </button>

                            {/* Location / first contact — navigates to Resources */}
                            {firstContact && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onNavigateToResources?.();
                                    }}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FFF7ED] text-[#EA580C] rounded-full text-[11px] font-semibold hover:bg-[#FFEDD5] active:scale-95 transition-all"
                                >
                                    📍 {firstContact.name}
                                    <ArrowSquareOut size={11} weight="bold" />
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </button>
        </div>
    );
};
