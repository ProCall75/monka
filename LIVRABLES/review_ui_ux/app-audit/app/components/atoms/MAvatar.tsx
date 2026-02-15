"use client";

import React from 'react';

export interface MAvatarProps {
    name: string;
    src?: string;
    size?: 'sm' | 'md' | 'lg';
    bgColor?: string;
}

const getInitials = (name: string) => {
    return name
        .split(' ')
        .map((w) => w[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();
};

// Generate a consistent warm color from the name
const nameToColor = (name: string) => {
    const colors = ['#8B5CF6', '#3B82F6', '#EC4899', '#F59E0B', '#10B981'];
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
    return colors[Math.abs(hash) % colors.length];
};

export const MAvatar = ({
    name,
    src,
    size = 'md',
    bgColor,
}: MAvatarProps) => {
    const sizeMap = {
        sm: { container: 'w-8 h-8', text: 'text-[11px]' },
        md: { container: 'w-10 h-10', text: 'text-[13px]' },
        lg: { container: 'w-14 h-14', text: 'text-[16px]' },
    };

    const s = sizeMap[size];
    const color = bgColor ?? nameToColor(name);

    if (src) {
        return (
            <img
                src={src}
                alt={name}
                className={`${s.container} rounded-full object-cover`}
            />
        );
    }

    return (
        <div
            className={`${s.container} rounded-full flex items-center justify-center`}
            style={{ backgroundColor: color }}
            aria-label={name}
        >
            <span
                className={`${s.text} font-bold text-white`}
                style={{ fontFamily: "'Outfit', 'Inter', sans-serif" }}
            >
                {getInitials(name)}
            </span>
        </div>
    );
};
