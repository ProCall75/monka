"use client";

import React from 'react';

interface DotGridProps {
    filled: number;   // 0-20 (how many dots are filled)
    total?: number;    // default 20 (5x4)
    cols?: number;     // default 5
}

export const DotGrid = ({ filled, total = 20, cols = 5 }: DotGridProps) => {
    return (
        <div
            className="grid gap-1.5 opacity-80"
            style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
        >
            {Array.from({ length: total }).map((_, i) => {
                let dotClass: string;
                if (i < filled) {
                    // Strong filled
                    dotClass = 'bg-[#A8C6A3]';
                } else if (i < filled + Math.ceil((total - filled) * 0.3)) {
                    // Light filled (transition)
                    dotClass = 'bg-[#D4E5D1]';
                } else {
                    // Empty
                    dotClass = 'bg-white border border-gray-100';
                }
                return (
                    <div
                        key={i}
                        className={`w-3 h-3 rounded-full ${dotClass}`}
                    />
                );
            })}
        </div>
    );
};
