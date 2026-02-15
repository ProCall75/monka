"use client";

import React from 'react';

interface MoodButtonProps {
    emoji: React.ReactNode;
    color: string;
    isSelected?: boolean;
    onClick?: () => void;
}

export const MoodButton = ({ emoji, color, isSelected = false, onClick }: MoodButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={`
        flex-shrink-0 w-[3.5rem] h-[3.5rem] rounded-full flex items-center justify-center
        hover:scale-110 transition-transform shadow-sm
        ${isSelected ? 'ring-2 ring-[#1A1A1A] ring-offset-2 ring-offset-[#F3EAE3]' : ''}
      `}
            style={{ backgroundColor: color }}
        >
            {emoji}
        </button>
    );
};

/* Emoji SVG icons matching the reference */
export const HappyEmoji = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#6B5B35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <line x1="9" y1="9" x2="9.01" y2="9" />
        <line x1="15" y1="9" x2="15.01" y2="9" />
    </svg>
);

export const CalmEmoji = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2F4F2F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="9" y1="9" x2="9.01" y2="9" />
        <line x1="15" y1="9" x2="15.01" y2="9" />
        <path d="M9 15h6" />
    </svg>
);

export const AngryEmoji = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#7A3E3E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M9 9L10 10" />
        <path d="M14 9L15 10" />
        <path d="M9 15s1.5-1 4-1 4 1 4 1" />
    </svg>
);

export const SadEmoji = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2B4668" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M9 16s1.5-2 4-2 4 2 4 2" />
        <line x1="9" y1="10" x2="9.01" y2="10" />
        <line x1="15" y1="10" x2="15.01" y2="10" />
    </svg>
);

export const NeutralEmoji = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="8" y1="15" x2="16" y2="15" />
        <line x1="9" y1="9" x2="9.01" y2="9" />
        <line x1="15" y1="9" x2="15.01" y2="9" />
    </svg>
);

export const AnxiousEmoji = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#483D6B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M9 10h.01" />
        <path d="M15 10h.01" />
        <path d="M12 15a2 2 0 0 1-2-2" />
    </svg>
);
