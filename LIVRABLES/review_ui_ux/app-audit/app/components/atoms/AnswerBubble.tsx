"use client";

import React, { useState, useEffect } from 'react';
import { Check } from '@phosphor-icons/react';

export interface AnswerBubbleProps {
    text: string;
    isConfirmed?: boolean;
    animated?: boolean;
    animDelay?: number;
}

export const AnswerBubble = ({
    text,
    isConfirmed = false,
    animated = true,
    animDelay = 0,
}: AnswerBubbleProps) => {
    const [visible, setVisible] = useState(!animated);
    const [settled, setSettled] = useState(!animated);

    useEffect(() => {
        if (!animated) return;
        const t1 = setTimeout(() => setVisible(true), animDelay + 80);
        const t2 = setTimeout(() => setSettled(true), animDelay + 500);
        return () => { clearTimeout(t1); clearTimeout(t2); };
    }, [animated, animDelay]);

    if (!visible) return null;

    return (
        <div className="flex justify-end">
            <div
                className="max-w-[80%] rounded-[20px] rounded-br-[4px] px-5 py-3.5 flex items-center gap-2.5"
                style={{
                    background: 'linear-gradient(135deg, #2D2A26 0%, #1A1714 100%)',
                    animation: animated ? 'ab-slideIn 0.45s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
                    boxShadow: settled
                        ? '0 2px 12px rgba(45,42,38,0.12), 0 0.5px 1px rgba(0,0,0,0.08)'
                        : '0 8px 32px rgba(45,42,38,0.25), 0 2px 4px rgba(0,0,0,0.1)',
                    transition: 'box-shadow 0.6s ease-out',
                }}
            >
                <p
                    className="text-[14.5px] text-white leading-snug font-medium flex-1"
                    style={{ fontFamily: "'Outfit', 'Inter', sans-serif" }}
                >
                    {text}
                </p>
                {isConfirmed && (
                    <div
                        className="flex-shrink-0 w-[22px] h-[22px] rounded-full flex items-center justify-center"
                        style={{
                            backgroundColor: 'rgba(255,255,255,0.15)',
                            backdropFilter: 'blur(4px)',
                        }}
                    >
                        <Check size={12} weight="bold" className="text-white/90" />
                    </div>
                )}
            </div>

            <style jsx>{`
                @keyframes ab-slideIn {
                    0% { opacity: 0; transform: translateX(24px) scale(0.92); }
                    60% { opacity: 1; transform: translateX(-3px) scale(1.01); }
                    100% { opacity: 1; transform: translateX(0) scale(1); }
                }
            `}</style>
        </div>
    );
};
