"use client";

import React from 'react';
import { DotGrid } from '../atoms/DotGrid';

interface ProgressCardProps {
    percentage: number;
    label?: string;
    variant?: 'compact' | 'hero';
}

export const ProgressCard = ({
    percentage,
    label = "du plan hebdomadaire complété",
    variant = 'hero',
}: ProgressCardProps) => {
    const filledDots = Math.round((percentage / 100) * 20);

    return (
        <div className="bg-white rounded-[32px] p-6 shadow-sm flex flex-row items-center justify-between">
            <div>
                <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-sm text-[#1A1A2E]">Votre progression</h3>
                </div>
                <div className="flex items-end gap-3">
                    <span
                        className={`font-medium text-[#1A1A2E] leading-none tracking-tighter ${variant === 'hero' ? 'text-[64px]' : 'text-[48px]'
                            }`}
                    >
                        {Math.round(percentage)}%
                    </span>
                    <span className="text-xs text-gray-500 font-medium mb-1.5 w-24 leading-tight">
                        {label}
                    </span>
                </div>
            </div>

            <DotGrid filled={filledDots} />
        </div>
    );
};
