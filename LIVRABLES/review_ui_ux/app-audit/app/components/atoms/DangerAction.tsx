"use client";

import React from 'react';

interface DangerActionProps {
    label: string;
    icon?: React.ReactNode;
    onClick?: () => void;
}

export const DangerAction = ({ label, icon, onClick }: DangerActionProps) => {
    return (
        <div className="bg-[#FFE5E5] rounded-[32px] p-2">
            <button
                onClick={onClick}
                className="w-full px-6 py-4 flex items-center gap-3 text-[#8F2222] font-semibold transition-opacity hover:opacity-80 active:scale-[0.98]"
            >
                {icon || (
                    <svg width="22" height="22" viewBox="0 0 256 256" fill="#8F2222">
                        <path d="M120,216a8,8,0,0,1-8,8H48a8,8,0,0,1,0-16h64A8,8,0,0,1,120,216ZM228.92,93.67a7.93,7.93,0,0,1-2.2,4.41l-120,120a8,8,0,0,1-11.32-11.32l120-120a8,8,0,0,1,13.53,6.91Z" />
                    </svg>
                )}
                <span>{label}</span>
            </button>
        </div>
    );
};
