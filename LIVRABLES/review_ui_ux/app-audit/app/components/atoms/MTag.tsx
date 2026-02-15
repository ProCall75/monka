"use client";

import React from 'react';
import { ThemeColors, type VulnerabilityDomain } from '../../data/kernel-types';

export interface MTagProps {
    label: string;
    domain?: VulnerabilityDomain;
    color?: string;
    bgColor?: string;
    size?: 'sm' | 'md';
}

export const MTag = ({
    label,
    domain,
    color: customColor,
    bgColor: customBg,
    size = 'sm',
}: MTagProps) => {
    // If domain is provided, derive colors from kernel themes
    const themeColor = domain ? ThemeColors[domain].color : customColor ?? '#8A857E';
    const themeBg = domain ? ThemeColors[domain].softBg : customBg ?? 'rgba(138,133,126,0.08)';

    const sizeClasses = {
        sm: 'px-2.5 py-1 text-[11px]',
        md: 'px-3 py-1.5 text-[12px]',
    };

    return (
        <span
            className={`
        inline-flex items-center rounded-full font-semibold tracking-wide
        ${sizeClasses[size]}
      `}
            style={{
                color: themeColor,
                backgroundColor: themeBg,
                fontFamily: "'Outfit', 'Inter', sans-serif",
            }}
        >
            {label}
        </span>
    );
};
