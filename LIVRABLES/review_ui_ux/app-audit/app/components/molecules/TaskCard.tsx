"use client";

import React from 'react';
import { CaretRight } from '@phosphor-icons/react';
import { UrgencyConfig, ThemeColors, type Criticality } from '../../data/kernel-types';
import { MTag } from '../atoms/MTag';
import type { VulnerabilityDomain } from '../../data/kernel-types';

export interface TaskCardProps {
    title: string;
    description?: string;
    criticality: Criticality;
    domain?: VulnerabilityDomain;
    targetPerson?: string;
    onPress?: () => void;
}

export const TaskCard = ({
    title,
    description,
    criticality,
    domain,
    targetPerson,
    onPress,
}: TaskCardProps) => {
    const urgency = UrgencyConfig[criticality];
    const themeColor = domain ? ThemeColors[domain]?.color : undefined;
    const themeSoftBg = domain ? ThemeColors[domain]?.softBg : undefined;

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
                        </div>

                        <CaretRight size={20} weight="bold" className="text-[#C8CCD0] flex-shrink-0 mt-1" />
                    </div>
                </div>
            </div>
        </button>
    );
};
