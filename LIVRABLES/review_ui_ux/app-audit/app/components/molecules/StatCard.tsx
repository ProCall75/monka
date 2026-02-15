"use client";

import React from 'react';
import {
    TrendUp,
    TrendDown,
    Equals,
    Users,
    Heart,
    Brain,
} from '@phosphor-icons/react';

type TrendDirection = 'up' | 'down' | 'stable';

interface StatCardProps {
    icon?: React.ReactNode;
    title: string;
    value: string;
    trend: TrendDirection;
    trendValue: string;
}

const trendConfig: Record<TrendDirection, { color: string; Icon: typeof TrendUp }> = {
    up: { color: '#16A34A', Icon: TrendUp },
    down: { color: '#DC2626', Icon: TrendDown },
    stable: { color: '#8F6B22', Icon: Equals },
};

export const StatCard = ({ icon, title, value, trend, trendValue }: StatCardProps) => {
    const t = trendConfig[trend];

    return (
        <div className="bg-white/60 p-5 rounded-[28px] border border-white/40">
            <div className="text-[#8C8C8C] mb-2">
                {icon || <Heart size={24} weight="bold" />}
            </div>
            <h4 className="text-[10px] font-bold text-[#8C8C8C] uppercase tracking-wide">{title}</h4>
            <p className="text-2xl font-bold text-[#1A1A1A] mt-1">{value}</p>
            <div className="flex items-center gap-1 mt-1" style={{ color: t.color }}>
                <t.Icon size={12} weight="bold" />
                <span className="text-[10px] font-bold">{trendValue}</span>
            </div>
        </div>
    );
};

// Pre-configured icon exports for convenience
export const StatIcons = { Users, Heart, Brain };
