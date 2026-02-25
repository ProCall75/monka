"use client";

import React, { useState, useEffect, useRef } from 'react';
import { ThemeButton } from './ThemeButton';
import type { VulnerabilityDomain } from '../../data/kernel-types';
import { ThemeColors } from '../../data/kernel-types';
import { Info } from '@phosphor-icons/react';

export interface QuestionBubbleProps {
    text: string;
    domain: VulnerabilityDomain;
    sensClinique?: string;
    animDelay?: number;
    animated?: boolean;
}

export const QuestionBubble = ({
    text,
    domain,
    sensClinique,
    animDelay = 0,
    animated = true,
}: QuestionBubbleProps) => {
    const [phase, setPhase] = useState<'hidden' | 'typing' | 'reveal' | 'done'>(
        animated ? 'hidden' : 'done'
    );
    const [revealedChars, setRevealedChars] = useState(animated ? 0 : text.length);
    const [showTooltip, setShowTooltip] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const domainColor = ThemeColors[domain]?.color ?? '#8A857E';

    useEffect(() => {
        if (!animated) return;
        const t1 = setTimeout(() => setPhase('typing'), animDelay);
        const t2 = setTimeout(() => {
            setPhase('reveal');
            // Character-by-character reveal
            let i = 0;
            intervalRef.current = setInterval(() => {
                i += 2; // 2 chars at a time for speed
                setRevealedChars(Math.min(i, text.length));
                if (i >= text.length) {
                    clearInterval(intervalRef.current!);
                    setPhase('done');
                }
            }, 18);
        }, animDelay + 900);
        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [animDelay, animated, text.length]);

    return (
        <div
            className="flex gap-3 items-start max-w-[90%]"
            style={{ opacity: phase === 'hidden' ? 0 : 1, transition: 'opacity 0.2s ease-out' }}
        >
            {/* Avatar with subtle ring */}
            <div
                className="flex-shrink-0 mt-0.5"
                style={{
                    filter: phase === 'done' ? 'none' : 'saturate(0.6)',
                    transition: 'filter 0.6s ease-out',
                }}
            >
                <ThemeButton domain={domain} size="sm" />
            </div>

            <div className="flex flex-col gap-1.5 min-w-0">
                {/* Typing indicator */}
                {phase === 'typing' && (
                    <div
                        className="rounded-[20px] rounded-bl-[4px] px-5 py-3.5 inline-flex gap-2 items-center w-fit"
                        style={{
                            background: `linear-gradient(135deg, #F8F4EF 0%, #F3EDE6 100%)`,
                            border: '1px solid #EDE8E1',
                            animation: 'qb-fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                        }}
                    >
                        {[0, 1, 2].map(i => (
                            <div
                                key={i}
                                className="w-[6px] h-[6px] rounded-full"
                                style={{
                                    backgroundColor: domainColor,
                                    opacity: 0.6,
                                    animation: `qb-typingDot 1s ease-in-out ${i * 0.15}s infinite`,
                                }}
                            />
                        ))}
                    </div>
                )}

                {/* Question bubble with text reveal */}
                {(phase === 'reveal' || phase === 'done') && (
                    <div
                        className="rounded-[20px] rounded-bl-[4px] px-5 py-4"
                        style={{
                            background: `linear-gradient(135deg, #F8F4EF 0%, #F3EDE6 100%)`,
                            border: '1px solid #EDE8E1',
                            boxShadow: '0 2px 12px rgba(0,0,0,0.04), 0 0.5px 1px rgba(0,0,0,0.03)',
                            animation: phase === 'reveal' ? 'qb-bubbleIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
                        }}
                    >
                        <p
                            className="text-[14.5px] text-[#2D2A26] leading-[1.55] font-medium"
                            style={{ fontFamily: "'Outfit', 'Inter', sans-serif" }}
                        >
                            <span>{text.slice(0, revealedChars)}</span>
                            {phase === 'reveal' && (
                                <span
                                    className="inline-block w-[2px] h-[14px] ml-0.5 rounded-full align-middle"
                                    style={{
                                        backgroundColor: domainColor,
                                        animation: 'qb-cursorBlink 0.6s ease-in-out infinite',
                                    }}
                                />
                            )}
                        </p>

                        {/* Sens clinique — accessible tooltip */}
                        {sensClinique && phase === 'done' && (
                            <div
                                className="mt-2.5"
                                style={{ animation: 'qb-fadeIn 0.4s ease-out 0.2s both' }}
                            >
                                <button
                                    onClick={() => setShowTooltip(!showTooltip)}
                                    className="flex items-center gap-1.5 text-[12px] font-medium transition-all duration-200 rounded-lg px-1.5 py-0.5 -ml-1.5"
                                    style={{
                                        color: showTooltip ? domainColor : '#8A857E',
                                        backgroundColor: showTooltip ? `${domainColor}10` : 'transparent',
                                    }}
                                >
                                    <Info size={14} weight="fill" style={{ opacity: 0.7 }} />
                                    <span className="underline decoration-dotted underline-offset-2">
                                        Pourquoi cette question ?
                                    </span>
                                </button>
                                {showTooltip && (
                                    <div
                                        className="mt-2 rounded-[14px] px-3.5 py-3 text-[12px] leading-relaxed"
                                        style={{
                                            color: '#5C574F',
                                            backgroundColor: 'white',
                                            border: '1px solid #EDE8E1',
                                            boxShadow: '0 4px 20px rgba(0,0,0,0.06), 0 0.5px 1px rgba(0,0,0,0.04)',
                                            animation: 'qb-tooltipIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                                            fontFamily: "'Outfit', 'Inter', sans-serif",
                                        }}
                                    >
                                        {sensClinique}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>

            <style jsx>{`
                @keyframes qb-bubbleIn {
                    from { opacity: 0; transform: translateY(8px) scale(0.97); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
                @keyframes qb-fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes qb-typingDot {
                    0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
                    30% { transform: translateY(-5px); opacity: 1; }
                }
                @keyframes qb-cursorBlink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }
                @keyframes qb-tooltipIn {
                    from { opacity: 0; transform: translateY(-4px) scale(0.98); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
            `}</style>
        </div>
    );
};
