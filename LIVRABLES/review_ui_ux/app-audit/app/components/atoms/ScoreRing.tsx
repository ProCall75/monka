"use client";

import React from 'react';

interface ScoreRingProps {
    score: number;
    size?: number;
    strokeWidth?: number;
    color?: string;
    label?: string;
    showLabel?: boolean;
}

export const ScoreRing = ({
    score,
    size = 192,
    strokeWidth,
    color = '#2C8C99',
    label = 'complété',
    showLabel,
}: ScoreRingProps) => {
    // Adaptive stroke width based on size
    const sw = strokeWidth ?? Math.max(4, size * 0.06);
    const padding = 2;
    const svgSize = size + padding * 2;
    const radius = (size - sw) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;
    const center = svgSize / 2;

    // Auto-hide label on small rings unless explicitly set
    const shouldShowLabel = showLabel !== undefined ? showLabel : size >= 100;

    return (
        <div className="relative flex justify-center items-center" style={{ width: size, height: size }}>
            <svg
                width={svgSize}
                height={svgSize}
                style={{
                    margin: -padding,
                }}
            >
                {/* Track */}
                <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    stroke="#F0F0F3"
                    strokeWidth={sw}
                    fill="transparent"
                />

                {/* Progress arc */}
                <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    stroke={color}
                    strokeWidth={sw}
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    style={{
                        transition: 'stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                        transform: 'rotate(-90deg)',
                        transformOrigin: '50% 50%',
                    }}
                />
            </svg>

            {/* Center content */}
            <div className="absolute flex flex-col items-center">
                <span
                    className="font-bold text-[#1A1A2E]"
                    style={{
                        fontSize: size * 0.26,
                        fontFamily: "'Outfit', 'Inter', sans-serif",
                        letterSpacing: '-0.02em',
                        lineHeight: 1,
                    }}
                >
                    {score}
                    <span style={{ fontSize: size * 0.14, color: '#C8CCD0', fontWeight: 600 }}>%</span>
                </span>
                {shouldShowLabel && (
                    <span
                        className="font-medium text-[#B0B5BD]"
                        style={{
                            fontSize: Math.max(9, size * 0.065),
                            fontFamily: "'Outfit', 'Inter', sans-serif",
                            letterSpacing: '0.04em',
                            marginTop: size * 0.02,
                        }}
                    >
                        {label}
                    </span>
                )}
            </div>
        </div>
    );
};
