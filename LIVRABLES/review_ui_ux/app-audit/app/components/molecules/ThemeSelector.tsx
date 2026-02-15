"use client";

import React, { useState } from 'react';
import { ThemeButton } from '../atoms/ThemeButton';
import type { VulnerabilityDomain } from '../../data/kernel-types';

const DOMAINS: VulnerabilityDomain[] = ['R', 'A', 'S', 'F', 'M'];

export interface ThemeSelectorProps {
    title?: string;
    showLabels?: boolean;
    defaultSelected?: VulnerabilityDomain | null;
    onSelect?: (domain: VulnerabilityDomain) => void;
}

export const ThemeSelector = ({
    title = 'Vos thèmes de vie',
    showLabels = true,
    defaultSelected = null,
    onSelect,
}: ThemeSelectorProps) => {
    const [selected, setSelected] = useState<VulnerabilityDomain | null>(defaultSelected);

    const handleSelect = (domain: VulnerabilityDomain) => {
        setSelected(domain);
        onSelect?.(domain);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h3
                    className="font-semibold text-[11px] uppercase tracking-[0.06em] text-[#B8B3AB]"
                    style={{ fontFamily: "'Outfit', 'Inter', sans-serif" }}
                >
                    {title}
                </h3>
            </div>
            <div className="flex justify-between gap-1 overflow-x-auto pb-2 no-scrollbar">
                {DOMAINS.map((d) => (
                    <ThemeButton
                        key={d}
                        domain={d}
                        isSelected={selected === d}
                        showLabel={showLabels}
                        onClick={() => handleSelect(d)}
                    />
                ))}
            </div>
        </div>
    );
};
