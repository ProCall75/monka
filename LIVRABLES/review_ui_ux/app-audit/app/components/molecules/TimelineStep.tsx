"use client";

import React from 'react';
import { Check } from '@phosphor-icons/react';

export interface TimelineStepProps {
    label: string;
    description?: string;
    status: 'done' | 'active' | 'pending';
    isLast?: boolean;
}

export const TimelineStep = ({
    label,
    description,
    status,
    isLast = false,
}: TimelineStepProps) => {
    const dotStyles = {
        done: 'bg-[#10B981]',
        active: 'bg-[#2D2A26] ring-4 ring-[#2D2A26]/15',
        pending: 'bg-[#EDE8E1]',
    };

    const lineColor = status === 'done' ? '#10B981' : '#EDE8E1';

    return (
        <div className="flex gap-4">
            {/* Dot + Line */}
            <div className="flex flex-col items-center">
                <div
                    className={`
            w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0
            ${dotStyles[status]}
          `}
                >
                    {status === 'done' && <Check size={12} weight="bold" className="text-white" />}
                    {status === 'active' && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
                {!isLast && (
                    <div
                        className="w-0.5 flex-1 min-h-[32px]"
                        style={{ backgroundColor: lineColor }}
                    />
                )}
            </div>

            {/* Content */}
            <div className={`pb-6 ${isLast ? '' : ''}`}>
                <p
                    className={`
            text-[14px] font-semibold leading-snug
            ${status === 'pending' ? 'text-[#B8B3AB]' : 'text-[#2D2A26]'}
          `}
                    style={{ fontFamily: "'Outfit', 'Inter', sans-serif" }}
                >
                    {label}
                </p>
                {description && (
                    <p
                        className={`
              mt-1 text-[13px] leading-relaxed
              ${status === 'pending' ? 'text-[#D1CCC5]' : 'text-[#8A857E]'}
            `}
                    >
                        {description}
                    </p>
                )}
            </div>
        </div>
    );
};
