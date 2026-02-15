"use client";

import React from 'react';

interface ProfileCardProps {
    name: string;
    email: string;
    avatarUrl?: string;
    onEditAvatar?: () => void;
}

export const ProfileCard = ({
    name,
    email,
    avatarUrl,
    onEditAvatar,
}: ProfileCardProps) => {
    const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2);
    const fallbackUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=FFD8B5&color=A65D03&bold=true`;

    return (
        <div
            className="bg-white rounded-[32px] p-6 flex items-center gap-4"
            style={{ boxShadow: '0 10px 30px -10px rgba(166, 146, 128, 0.15)' }}
        >
            <div className="relative">
                <img
                    src={avatarUrl || fallbackUrl}
                    alt={name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-[#F3EAE3]"
                />
                <button
                    onClick={onEditAvatar}
                    className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#1A1A1A] text-white rounded-full flex items-center justify-center border-2 border-white"
                >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M22.7,1.3a4.2,4.2,0,0,0-5.6,0L3.5,14.9a2,2,0,0,0-.5.9l-1,4a1,1,0,0,0,1,1.2h.2l4-1a2,2,0,0,0,.9-.5L21.7,5.9l1-1A4,4,0,0,0,22.7,1.3Z" />
                    </svg>
                </button>
            </div>
            <div>
                <h2 className="text-lg font-bold text-[#1A1A1A]">{name}</h2>
                <p className="text-sm text-[#8C8C8C]">{email}</p>
            </div>
        </div>
    );
};
