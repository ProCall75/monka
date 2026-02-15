"use client";

import React from 'react';

const bubbles = [
    { label: 'Gratitude', color: '#8ECAE6', size: 144, top: 8, right: -10, animate: true },
    { label: 'Calme', color: '#A3B18A', size: 128, top: 80, left: -10, animate: false },
    { label: 'Amour', color: '#E5989B', size: 112, bottom: -10, left: 80, border: true },
    { label: 'Tristesse', color: '#F2C4B3', size: 96, top: -10, right: 60, opacity: 0.8, textDark: true },
    { label: 'Stress', color: '#C5D1F7', size: 64, bottom: 40, left: 8, textDark: true },
];

export const StatsBubbles = () => {
    return (
        <div className="bg-white rounded-[32px] p-6 relative overflow-hidden shadow-sm" style={{ height: '16rem' }}>
            <p className="text-sm font-semibold text-gray-500 mb-4 z-10 relative">
                Basé sur vos enquêtes quotidiennes
            </p>

            {bubbles.map((b) => (
                <div
                    key={b.label}
                    className={`absolute rounded-full flex items-center justify-center ${b.animate ? 'animate-pulse' : ''} ${b.border ? 'border-4 border-white shadow-md z-20' : ''}`}
                    style={{
                        backgroundColor: b.color,
                        width: `${b.size}px`,
                        height: `${b.size}px`,
                        top: b.top !== undefined ? `${b.top}px` : undefined,
                        bottom: b.bottom !== undefined ? `${b.bottom}px` : undefined,
                        left: b.left !== undefined ? `${b.left}px` : undefined,
                        right: b.right !== undefined ? `${b.right}px` : undefined,
                        opacity: b.opacity || 1,
                    }}
                >
                    <span
                        className={`font-medium ${b.size > 100 ? 'text-sm' : 'text-[10px]'} ${b.textDark ? 'text-[#1A1A1A]' : 'text-white'
                            }`}
                    >
                        {b.label}
                    </span>
                </div>
            ))}
        </div>
    );
};
