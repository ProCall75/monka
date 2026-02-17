"use client";

import React from 'react';
import { CaretRight, CheckCircle } from '@phosphor-icons/react';
import { UrgencyConfig, ThemeColors, type Criticality } from '../../data/kernel-types';
import { MTag } from '../atoms/MTag';
import type { VulnerabilityDomain } from '../../data/kernel-types';

export interface TaskCardProps {
    title: string;
    description?: string;
    criticality: Criticality;
    domain?: VulnerabilityDomain;
    targetPerson?: string;
    /** Progression ASR 0-100 (% de MT contributives complétées) */
    asrProgress?: number;
    /** Nombre de MT contributives complétées */
    asrDone?: number;
    /** Nombre total de MT contributives */
    asrTotal?: number;
    /** false = MP prévention (grisé, non cliquable) */
    isActivated?: boolean;
    onPress?: () => void;
}

export const TaskCard = ({
    title,
    description,
    criticality,
    domain,
    targetPerson,
    asrProgress,
    asrDone,
    asrTotal,
    isActivated = true,
    onPress,
}: TaskCardProps) => {
    const urgency = UrgencyConfig[criticality];
    const themeColor = domain ? ThemeColors[domain]?.color : undefined;

    // Prevention variant
    if (!isActivated) {
        return (
            <div
                className="
                    w-full rounded-[20px] text-left bg-[#FAFAF8] overflow-hidden
                    border border-[#E8E6E2] border-dashed
                    opacity-75
                "
            >
                <div className="p-4">
                    <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold text-[#9CA3AF] bg-[#F3F4F6]">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#9CA3AF]" /> Prévention
                                </span>
                                {domain && <MTag label="" domain={domain} size="sm" />}
                            </div>
                            <h4
                                className="text-[15px] font-semibold text-[#8E8E93] leading-snug"
                                style={{ fontFamily: "'Outfit', 'Inter', sans-serif" }}
                            >
                                {title}
                            </h4>
                            {description && (
                                <p className="mt-1 text-[13px] text-[#B8B3AB] leading-relaxed line-clamp-2">
                                    {description}
                                </p>
                            )}
                            {/* ASR secured badge */}
                            <div className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#10B981]">
                                <CheckCircle size={14} weight="fill" />
                                Objectif atteint — parcours sécurisé
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Activated variant (default)
    return (
        <button
            onClick={onPress}
            className="
                w-full rounded-[20px] text-left bg-white overflow-hidden
                border border-[#E5E5EA]
                shadow-[0_2px_8px_rgba(26,26,46,0.04)]
                transition-all duration-200
                hover:shadow-[0_4px_16px_rgba(26,26,46,0.08)]
                active:scale-[0.98]
            "
        >
            <div className="flex">
                {/* Domain color accent bar */}
                {themeColor && (
                    <div
                        className="w-1 min-h-full flex-shrink-0 rounded-l-[20px]"
                        style={{ backgroundColor: themeColor }}
                    />
                )}

                <div className="flex-1 p-4">
                    <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                            {/* Urgency + Domain tags */}
                            <div className="flex items-center gap-2 mb-2">
                                <span
                                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold"
                                    style={{
                                        color: urgency.color,
                                        backgroundColor: urgency.softColor,
                                    }}
                                >
                                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: urgency.color }} /> {urgency.userLabel}
                                </span>
                                {domain && <MTag label="" domain={domain} size="sm" />}
                            </div>

                            {/* Title */}
                            <h4
                                className="text-[15px] font-semibold text-[#1A1A2E] leading-snug"
                                style={{ fontFamily: "'Outfit', 'Inter', sans-serif" }}
                            >
                                {title}
                            </h4>

                            {/* Description */}
                            {description && (
                                <p className="mt-1 text-[13px] text-[#8E8E93] leading-relaxed line-clamp-2">
                                    {description}
                                </p>
                            )}

                            {/* Target person */}
                            {targetPerson && (
                                <p className="mt-2 text-[12px] text-[#C8CCD0] font-medium">
                                    Pour {targetPerson}
                                </p>
                            )}

                            {/* ASR gauge */}
                            {(asrDone !== undefined || asrProgress !== undefined) && (
                                <div className="mt-3 space-y-1.5">
                                    {/* ASR progress bar */}
                                    {asrProgress !== undefined && (
                                        <div className="flex items-center gap-2">
                                            <div className="flex-1 h-[4px] rounded-full bg-[#F0F0F3] overflow-hidden">
                                                <div
                                                    className="h-full rounded-full transition-all duration-500"
                                                    style={{
                                                        width: `${asrProgress}%`,
                                                        backgroundColor: asrProgress === 100 ? '#10B981' : (themeColor || '#8E8E93'),
                                                    }}
                                                />
                                            </div>
                                            <span className="text-[10px] font-bold text-[#8E8E93] flex-shrink-0">
                                                {asrProgress}%
                                            </span>
                                        </div>
                                    )}

                                    {/* ASR count label */}
                                    {asrDone !== undefined && asrTotal !== undefined && (
                                        <span
                                            className="inline-flex items-center gap-1 text-[11px] font-semibold"
                                            style={{ color: themeColor || '#8E8E93' }}
                                        >
                                            {asrDone}/{asrTotal} actions prioritaires
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>

                        <CaretRight size={20} weight="bold" className="text-[#C8CCD0] flex-shrink-0 mt-1" />
                    </div>
                </div>
            </div>
        </button>
    );
};

