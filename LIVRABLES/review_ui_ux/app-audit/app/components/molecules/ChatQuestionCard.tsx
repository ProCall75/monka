"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { QuestionBubble } from '../atoms/QuestionBubble';
import { AnswerBubble } from '../atoms/AnswerBubble';
import { MOptionPill } from '../atoms/MOptionPill';
import type { VulnerabilityDomain } from '../../data/kernel-types';
import type { MockQuestion } from '../../data/questionnaire-mock-data';

export interface ChatQuestionCardProps {
    question: MockQuestion;
    domain: VulnerabilityDomain;
    onAnswer?: (value: string) => void;
    isAnswered?: boolean;
    answeredValue?: string;
    animated?: boolean;
    animDelay?: number;
    /** e.g. "2 / 15" */
    questionIndex?: string;
}

export const ChatQuestionCard = ({
    question,
    domain,
    onAnswer,
    isAnswered = false,
    answeredValue,
    animated = true,
    animDelay = 0,
    questionIndex,
}: ChatQuestionCardProps) => {
    const [selected, setSelected] = useState<string | null>(answeredValue ?? null);
    const [phase, setPhase] = useState<'asking' | 'collapsing' | 'collapsed'>(
        isAnswered ? 'collapsed' : 'asking'
    );
    const [showOptions, setShowOptions] = useState(!animated);

    useEffect(() => {
        if (!animated) return;
        // Options appear after bubble text reveal completes
        const t = setTimeout(() => setShowOptions(true), animDelay + 1800);
        return () => clearTimeout(t);
    }, [animated, animDelay]);

    const handleSelect = useCallback((option: string) => {
        if (phase !== 'asking') return;
        setSelected(option);
        setPhase('collapsing');
        onAnswer?.(option);
        // Smooth collapse: wait for selection feedback, then collapse
        setTimeout(() => setPhase('collapsed'), 700);
    }, [phase, onAnswer]);

    // Collapsed state
    if (phase === 'collapsed' && selected) {
        return (
            <div className="space-y-3">
                {questionIndex && (
                    <span
                        className="text-[11px] font-semibold tracking-wide ml-[52px]"
                        style={{ color: '#B8B3AB', fontFamily: "'Outfit', sans-serif" }}
                    >
                        Q{questionIndex}
                    </span>
                )}
                <QuestionBubble text={question.text} domain={domain} animated={false} />
                <AnswerBubble text={selected} isConfirmed animated={animated} />
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {/* Question counter */}
            {questionIndex && (
                <span
                    className="text-[11px] font-semibold tracking-wide ml-[52px]"
                    style={{
                        color: '#B8B3AB',
                        fontFamily: "'Outfit', sans-serif",
                        animation: animated ? 'cqc-fadeIn 0.3s ease-out' : 'none',
                    }}
                >
                    Q{questionIndex}
                </span>
            )}

            <QuestionBubble
                text={question.text}
                domain={domain}
                sensClinique={question.sensClinique}
                animated={animated}
                animDelay={animDelay}
            />

            {/* Options — staggered with aligned left margin */}
            {showOptions && phase === 'asking' && (
                <div className="space-y-2" style={{ marginLeft: 52 }}>
                    {question.options.map((opt, i) => (
                        <div
                            key={opt}
                            style={{
                                animation: animated
                                    ? `cqc-optionIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.06}s both`
                                    : 'none',
                            }}
                        >
                            <MOptionPill
                                label={opt}
                                isSelected={selected === opt}
                                variant={question.responseType === 'multi' ? 'multi' : 'radio'}
                                onClick={() => handleSelect(opt)}
                            />
                        </div>
                    ))}
                </div>
            )}

            {/* Collapsing: show selected option fading */}
            {phase === 'collapsing' && selected && (
                <div style={{ marginLeft: 52, animation: 'cqc-fadeOut 0.5s ease-in forwards' }}>
                    <MOptionPill label={selected} isSelected variant="radio" />
                </div>
            )}

            <style jsx>{`
                @keyframes cqc-optionIn {
                    from { opacity: 0; transform: translateY(10px) scale(0.97); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
                @keyframes cqc-fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes cqc-fadeOut {
                    from { opacity: 1; transform: scale(1); }
                    to { opacity: 0; transform: scale(0.95) translateY(-4px); }
                }
            `}</style>
        </div>
    );
};
