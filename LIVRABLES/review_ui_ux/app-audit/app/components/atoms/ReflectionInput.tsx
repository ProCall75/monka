"use client";

import React from 'react';

interface ReflectionInputProps {
    placeholder?: string;
    variant?: 'cream' | 'warm';
}

export const ReflectionInput = ({
    placeholder = "Notez votre réflexion...",
    variant = 'warm'
}: ReflectionInputProps) => {
    const bgClass = variant === 'cream' ? 'bg-[#F3E6DE]' : 'bg-[#EBE0D6]';

    return (
        <div className="relative">
            <input
                type="text"
                placeholder={placeholder}
                className={`w-full ${bgClass} placeholder-[#8C8C8C] text-[#1A1A1A] py-4 px-6 rounded-[24px] outline-none focus:ring-2 focus:ring-[#D4C5B5] transition-all pr-16`}
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 bg-[#1A1A1A] rounded-[20px] flex items-center justify-center text-white hover:scale-105 transition-transform">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                </svg>
            </button>
        </div>
    );
};
