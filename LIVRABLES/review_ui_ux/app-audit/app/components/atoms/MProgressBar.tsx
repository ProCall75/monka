"use client";

import React, { useEffect, useState } from 'react';

export interface MProgressBarProps {
    progress: number; // 0–100
    color?: string;
    bgColor?: string;
    height?: number;
    animated?: boolean;
    label?: string;
}

export const MProgressBar = ({
    progress,
    color = '#2D2A26',
    bgColor = '#EDE8E1',
    height = 8,
    animated = true,
    label,
}: MProgressBarProps) => {
    const [width, setWidth] = useState(animated ? 0 : progress);

    useEffect(() => {
        if (animated) {
            const timer = setTimeout(() => setWidth(Math.min(100, Math.max(0, progress))), 100);
            return () => clearTimeout(timer);
        }
        setWidth(Math.min(100, Math.max(0, progress)));
    }, [progress, animated]);

    return (
        <div className="w-full">
            {label && (
                <div className="flex justify-between items-center mb-2">
                    <span className="text-[13px] text-[#8A857E] font-medium">{label}</span>
                    <span className="text-[13px] text-[#2D2A26] font-semibold">{Math.round(progress)}%</span>
                </div>
            )}
            <div
                className="w-full rounded-full overflow-hidden"
                style={{ height, backgroundColor: bgColor }}
                role="progressbar"
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
            >
                <div
                    className="h-full rounded-full"
                    style={{
                        width: `${width}%`,
                        backgroundColor: color,
                        transition: animated ? 'width 0.8s ease-out' : 'none',
                    }}
                />
            </div>
        </div>
    );
};
