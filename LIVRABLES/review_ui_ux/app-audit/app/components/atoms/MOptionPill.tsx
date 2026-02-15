"use client";

import React from 'react';
import { Check } from '@phosphor-icons/react';

export interface MOptionPillProps {
    label: string;
    isSelected?: boolean;
    variant?: 'radio' | 'multi';
    onClick?: () => void;
}

export const MOptionPill = ({
    label,
    isSelected = false,
    variant = 'radio',
    onClick,
}: MOptionPillProps) => {
    return (
        <button
            onClick={onClick}
            className={`
        w-full px-5 py-4 rounded-[20px] text-left
        transition-all duration-200 border-2
        active:scale-[0.98]
        ${isSelected
                    ? 'bg-[#2D2A26] text-white border-[#2D2A26] shadow-md'
                    : 'bg-white text-[#2D2A26] border-[#EDE8E1] hover:border-[#B8B3AB] hover:shadow-sm'
                }
      `}
            aria-pressed={isSelected}
            role={variant === 'radio' ? 'radio' : 'checkbox'}
        >
            <div className="flex items-center justify-between">
                <span
                    className="text-[15px] font-medium leading-snug"
                    style={{ fontFamily: "'Outfit', 'Inter', sans-serif" }}
                >
                    {label}
                </span>
                {isSelected && (
                    <Check size={20} weight="bold" className="flex-shrink-0 ml-3" />
                )}
            </div>
        </button>
    );
};
