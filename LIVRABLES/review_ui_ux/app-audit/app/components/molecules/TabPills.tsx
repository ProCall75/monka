"use client";

import React from 'react';

interface TabPillsProps {
    tabs: string[];
    activeIndex?: number;
    onTabChange?: (index: number) => void;
}

export const TabPills = ({ tabs, activeIndex = 0, onTabChange }: TabPillsProps) => {
    return (
        <div className="flex gap-3 overflow-x-auto no-scrollbar">
            {tabs.map((tab, i) => (
                <button
                    key={tab}
                    onClick={() => onTabChange?.(i)}
                    className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${i === activeIndex
                            ? 'bg-[#1A1A1A] text-white'
                            : 'bg-white text-[#8C8C8C] border border-transparent hover:border-gray-200'
                        }`}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
};
