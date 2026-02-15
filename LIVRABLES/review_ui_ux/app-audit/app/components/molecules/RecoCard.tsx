"use client";

import React, { useState } from 'react';

interface RecoCardProps {
    icon: React.ReactNode;
    iconBg?: string;
    title: string;
    description: string;
    defaultAdded?: boolean;
    onToggle?: (added: boolean) => void;
}

export const RecoCard = ({
    icon,
    iconBg = '#FDF3D8',
    title,
    description,
    defaultAdded = false,
    onToggle,
}: RecoCardProps) => {
    const [added, setAdded] = useState(defaultAdded);

    const handleToggle = () => {
        const next = !added;
        setAdded(next);
        onToggle?.(next);
    };

    return (
        <div className="bg-white rounded-[24px] p-5 flex items-start gap-4 transition-transform active:scale-[0.98]"
            style={{ boxShadow: '0 4px 20px -6px rgba(0,0,0,0.06)' }}
        >
            <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: iconBg }}
            >
                {icon}
            </div>
            <div className="flex-1 min-w-0">
                <h4 className="font-bold text-sm text-[#1A1A1A]">{title}</h4>
                <p className="text-xs text-[#8C8C8C] mt-1 leading-relaxed">{description}</p>
            </div>
            <button onClick={handleToggle} className="flex-shrink-0 mt-0.5 transition-colors">
                {added ? (
                    <svg width="28" height="28" viewBox="0 0 256 256" fill="#16A34A">
                        <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm45.66,85.66-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z" />
                    </svg>
                ) : (
                    <svg width="28" height="28" viewBox="0 0 256 256" fill="#8F6B22">
                        <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm40-88a8,8,0,0,1-8,8H136v24a8,8,0,0,1-16,0V136H96a8,8,0,0,1,0-16h24V96a8,8,0,0,1,16,0v24h24A8,8,0,0,1,168,128Z" />
                    </svg>
                )}
            </button>
        </div>
    );
};
