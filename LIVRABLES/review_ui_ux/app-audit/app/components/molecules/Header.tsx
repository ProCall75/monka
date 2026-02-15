"use client";

import React from 'react';

interface HeaderProps {
    name: string;
    subtitle?: string;
    notificationCount?: number;
    avatar?: string;
    variant?: 'design1' | 'design2';
    onNotificationPress?: () => void;
    onAvatarPress?: () => void;
}

export const Header = ({
    name,
    subtitle = 'Résumé quotidien',
    notificationCount = 0,
    avatar,
    variant = 'design2',
    onNotificationPress,
    onAvatarPress,
}: HeaderProps) => {
    if (variant === 'design1') {
        // Design 1: Bonjour,\nMarie with avatar + notification on right
        return (
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-[#8E8E93] text-sm font-medium mb-1">{subtitle}</p>
                    <h1 className="text-3xl font-bold text-[#1A1A2E] leading-tight">
                        Bonjour, <br />{name}
                    </h1>
                </div>
                <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-[#FFD8C7] p-0.5 border-2 border-white shadow-sm overflow-hidden">
                        {avatar ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={avatar} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full bg-[#E0C3FC] flex items-center justify-center text-[#5B2A86] font-bold text-lg rounded-full">
                                {name[0]}
                            </div>
                        )}
                    </div>
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-[#FDF6F0] rounded-full" />
                </div>
            </div>
        );
    }

    // Design 2: Bonjour, below with bell + avatar column on right
    return (
        <div className="flex justify-between items-start">
            <div>
                <p className="text-[#8E8E93] text-lg font-medium mb-1">Bonjour,</p>
                <h1 className="text-4xl font-bold tracking-tight text-[#1A1A2E]">{name}</h1>
            </div>
            <div className="relative flex flex-col items-center gap-3">
                <button onClick={onNotificationPress} className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors relative">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700">
                        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                    </svg>
                    {notificationCount > 0 && (
                        <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-[#FF6B6B] rounded-full border-2 border-white" />
                    )}
                </button>
                <button onClick={onAvatarPress} className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm cursor-pointer hover:ring-2 hover:ring-[#2C8C99] transition-all">
                    {avatar ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={avatar} alt="Profile" className="w-full h-full object-cover rounded-full" />
                    ) : (
                        <div className="w-full h-full bg-[#E0C3FC] flex items-center justify-center text-[#5B2A86] font-bold text-lg">
                            {name[0]}
                        </div>
                    )}
                </button>
            </div>
        </div>
    );
};
