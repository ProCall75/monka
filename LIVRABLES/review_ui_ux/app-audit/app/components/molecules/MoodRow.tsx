"use client";

import React, { useState } from 'react';
import {
    MoodButton,
    HappyEmoji,
    CalmEmoji,
    AngryEmoji,
    SadEmoji,
    NeutralEmoji,
    AnxiousEmoji,
} from '../atoms/MoodButton';

const moods = [
    { id: 'happy', color: '#FFE5A5', emoji: <HappyEmoji /> },
    { id: 'calm', color: '#A8C6A3', emoji: <CalmEmoji /> },
    { id: 'angry', color: '#EAB4A8', emoji: <AngryEmoji /> },
    { id: 'sad', color: '#AECBEB', emoji: <SadEmoji /> },
    { id: 'neutral', color: '#EAEAEA', emoji: <NeutralEmoji /> },
    { id: 'anxious', color: '#C7C0E4', emoji: <AnxiousEmoji /> },
];

interface MoodRowProps {
    title?: string;
    onSelect?: (moodId: string) => void;
}

export const MoodRow = ({ title = "Humeur du jour", onSelect }: MoodRowProps) => {
    const [selected, setSelected] = useState<string | null>(null);

    const handleSelect = (id: string) => {
        setSelected(id);
        onSelect?.(id);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-sm uppercase tracking-wider text-[#1A1A1A]">{title}</h3>
                <button className="text-gray-400 hover:text-gray-600">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" />
                    </svg>
                </button>
            </div>
            <div className="flex justify-between gap-2 overflow-x-auto pb-2 no-scrollbar">
                {moods.map((m) => (
                    <MoodButton
                        key={m.id}
                        emoji={m.emoji}
                        color={m.color}
                        isSelected={selected === m.id}
                        onClick={() => handleSelect(m.id)}
                    />
                ))}
            </div>
        </div>
    );
};
