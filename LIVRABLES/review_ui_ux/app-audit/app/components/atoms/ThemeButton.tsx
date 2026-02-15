"use client";

import React from 'react';
import {
    UsersThree,
    FileText,
    Heartbeat,
    HandHeart,
    FirstAid,
} from '@phosphor-icons/react';
import { ThemeColors, type VulnerabilityDomain } from '../../data/kernel-types';

// Map each domain to a Phosphor icon component
const DomainIcons: Record<VulnerabilityDomain, React.ElementType> = {
    R: UsersThree,
    A: FileText,
    S: Heartbeat,
    F: HandHeart,
    M: FirstAid,
};

// Soft backgrounds (slightly transparent version of the theme color)
const DomainBg: Record<VulnerabilityDomain, string> = {
    R: '#F3EFF8',
    A: '#EEF2FF',
    S: '#FDF2F4',
    F: '#FEF7EC',
    M: '#ECFDF5',
};

export interface ThemeButtonProps {
    domain: VulnerabilityDomain;
    isSelected?: boolean;
    showLabel?: boolean;
    size?: 'sm' | 'md' | 'lg';
    onClick?: () => void;
}

export const ThemeButton = ({
    domain,
    isSelected = false,
    showLabel = false,
    size = 'md',
    onClick,
}: ThemeButtonProps) => {
    const theme = ThemeColors[domain];
    const Icon = DomainIcons[domain];
    const bg = DomainBg[domain];

    const sizeMap = {
        sm: { button: 'w-11 h-11', icon: 20, label: 'text-[10px]' },
        md: { button: 'w-14 h-14', icon: 26, label: 'text-[11px]' },
        lg: { button: 'w-[4.5rem] h-[4.5rem]', icon: 32, label: 'text-xs' },
    };

    const s = sizeMap[size];

    return (
        <button
            onClick={onClick}
            className={`
        flex-shrink-0 flex flex-col items-center gap-1.5
        transition-all duration-200
        ${isSelected ? 'scale-105' : 'hover:scale-105'}
      `}
            aria-label={theme.label}
            aria-pressed={isSelected}
        >
            <div
                className={`
          ${s.button} rounded-full flex items-center justify-center
          transition-all duration-200
          ${isSelected
                        ? 'ring-[2.5px] ring-offset-2 ring-offset-[#F8F4EF] shadow-md'
                        : 'shadow-sm hover:shadow-md'
                    }
        `}
                style={{
                    backgroundColor: bg,
                    ...(isSelected ? { ringColor: theme.color, boxShadow: `0 0 0 2.5px ${theme.color}` } : {}),
                }}
            >
                <Icon size={s.icon} weight="duotone" color={theme.color} />
            </div>
            {showLabel && (
                <span
                    className={`
            ${s.label} font-semibold leading-tight text-center max-w-[5rem]
            ${isSelected ? 'text-[#2D2A26]' : 'text-[#8A857E]'}
          `}
                >
                    {theme.label}
                </span>
            )}
        </button>
    );
};
