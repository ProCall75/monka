"use client";

import React from 'react';

type BadgeVariant = 'critique' | 'vigilance' | 'standard';

interface BadgeProps {
    variant: BadgeVariant;
    label?: string;
}

const badgeStyles: Record<BadgeVariant, { bg: string; text: string; label: string }> = {
    critique: {
        bg: 'bg-[#E57373]',
        text: 'text-white',
        label: 'Critique',
    },
    vigilance: {
        bg: 'bg-[#FBC02D]',
        text: 'text-[#5D4037]',
        label: 'Vigilance',
    },
    standard: {
        bg: 'bg-[#66BB6A]',
        text: 'text-white',
        label: 'Standard',
    },
};

export const Badge = ({ variant, label }: BadgeProps) => {
    const s = badgeStyles[variant];
    return (
        <span
            className={`${s.bg} ${s.text} text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wide inline-flex items-center`}
        >
            {label || s.label}
        </span>
    );
};
