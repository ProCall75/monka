"use client";

import React, { useState, useRef, useEffect } from 'react';
import { ThemeButton } from '../atoms/ThemeButton';
import { MOptionPill } from '../atoms/MOptionPill';
import {
    ArrowLeft, CalendarCheck,
} from '@phosphor-icons/react';
import type { VulnerabilityDomain } from '../../data/kernel-types';
import { ThemeColors } from '../../data/kernel-types';
import { MOCK_SUIVI, type MockSuiviQuestion } from '../../data/questionnaire-mock-data';

export interface SuiviPromptCardProps {
    questions?: MockSuiviQuestion[];
    onComplete?: (answers: Record<string, string>) => void;
}

const DOMAIN_LABELS: Record<VulnerabilityDomain, string> = {
    R: 'Vie sociale',
    A: 'Démarches',
    S: 'Santé',
    F: 'Votre proche',
    M: 'Parcours de soins',
};

export const SuiviPromptCard = ({
    questions = MOCK_SUIVI,
    onComplete,
}: SuiviPromptCardProps) => {
    const [currentLevel, setCurrentLevel] = useState<'root' | 'vulnerability' | 'mp'>('root');
    const [selectedDomain, setSelectedDomain] = useState<VulnerabilityDomain | null>(null);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [breadcrumbs, setBreadcrumbs] = useState<{ label: string; level: string }[]>([
        { label: 'Point de situation', level: 'root' }
    ]);
    const [slideDirection, setSlideDirection] = useState<'forward' | 'back'>('forward');
    const [animKey, setAnimKey] = useState(0);
    const contentRef = useRef<HTMLDivElement>(null);

    const rootQ = questions.find(q => q.level === 'root');
    const vulnQuestions = questions.filter(q => q.level === 'vulnerability');
    const mpQuestions = questions.filter(q => q.level === 'mp' && q.domain === selectedDomain);

    const triggerTransition = (direction: 'forward' | 'back') => {
        setSlideDirection(direction);
        setAnimKey(k => k + 1);
    };

    const handleRootAnswer = (value: string) => {
        setAnswers(prev => ({ ...prev, root: value }));
        if (value === 'yes') {
            triggerTransition('forward');
            setCurrentLevel('vulnerability');
            setBreadcrumbs(prev => [...prev, { label: 'Thème', level: 'vulnerability' }]);
        } else {
            onComplete?.({ root: 'no' });
        }
    };

    const handleVulnSelect = (domain: VulnerabilityDomain) => {
        setSelectedDomain(domain);
        setAnswers(prev => ({ ...prev, [`vuln_${domain}`]: 'yes' }));
        triggerTransition('forward');
        setCurrentLevel('mp');
        setBreadcrumbs(prev => [...prev, { label: DOMAIN_LABELS[domain], level: 'mp' }]);
    };

    const handleMPAnswer = (mpId: string, value: string) => {
        setAnswers(prev => ({ ...prev, [`mp_${mpId}`]: value }));
    };

    const goBack = () => {
        triggerTransition('back');
        if (currentLevel === 'mp') {
            setCurrentLevel('vulnerability');
            setSelectedDomain(null);
            setBreadcrumbs(prev => prev.slice(0, -1));
        } else if (currentLevel === 'vulnerability') {
            setCurrentLevel('root');
            setAnswers(prev => { const { root, ...rest } = prev; return rest; });
            setBreadcrumbs([{ label: 'Point de situation', level: 'root' }]);
        }
    };

    const accentColor = selectedDomain ? ThemeColors[selectedDomain]?.color : '#2C8C99';

    return (
        <div
            className="rounded-[28px] overflow-hidden relative"
            style={{
                background: '#FAFAF8',
                border: '1px solid #EDE8E1',
                boxShadow: '0 4px 24px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)',
                fontFamily: "'Outfit', 'Inter', sans-serif",
            }}
        >
            {/* Accent bar — transitions color by domain */}
            <div
                className="absolute top-0 left-0 right-0 h-[3px] rounded-t-[28px]"
                style={{
                    background: accentColor,
                    transition: 'background 0.4s ease-out',
                }}
            />

            {/* Header */}
            <div className="flex items-center gap-3 px-6 pt-6 pb-4">
                {currentLevel !== 'root' && (
                    <button
                        onClick={goBack}
                        className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
                        style={{
                            backgroundColor: '#F3EAE3',
                        }}
                    >
                        <ArrowLeft size={16} weight="bold" className="text-[#2D2A26]" />
                    </button>
                )}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                        <CalendarCheck size={18} weight="fill" style={{ color: accentColor, transition: 'color 0.4s' }} />
                        <h2 className="text-[16px] font-bold text-[#2D2A26]">Faisons le point</h2>
                    </div>
                    {/* Breadcrumbs */}
                    <div className="flex items-center gap-1 mt-1 flex-wrap">
                        {breadcrumbs.map((b, i) => (
                            <React.Fragment key={i}>
                                {i > 0 && <span className="text-[10px] text-[#D4D4D4]">›</span>}
                                <span
                                    className="text-[11px] transition-colors duration-200"
                                    style={{
                                        color: i === breadcrumbs.length - 1 ? '#2D2A26' : '#B8B3AB',
                                        fontWeight: i === breadcrumbs.length - 1 ? 600 : 400,
                                    }}
                                >
                                    {b.label}
                                </span>
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>

            <div className="border-t border-[#EDE8E1]" />

            {/* Content with slide transition */}
            <div
                ref={contentRef}
                key={animKey}
                className="px-6 py-6"
                style={{
                    animation: `spc-slide${slideDirection === 'forward' ? 'Left' : 'Right'} 0.3s cubic-bezier(0.16, 1, 0.3, 1)`,
                }}
            >
                {/* Level: Root */}
                {currentLevel === 'root' && rootQ && (
                    <div className="space-y-4">
                        <p className="text-[15px] text-[#2D2A26] font-medium leading-relaxed">
                            {rootQ.questionText}
                        </p>
                        <div className="space-y-2">
                            {rootQ.options.map((opt, i) => (
                                <div
                                    key={opt.value}
                                    style={{
                                        animation: `spc-fadeUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.06}s both`,
                                    }}
                                >
                                    <MOptionPill
                                        label={opt.label}
                                        isSelected={answers.root === opt.value}
                                        onClick={() => handleRootAnswer(opt.value)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Level: Vulnerability selection */}
                {currentLevel === 'vulnerability' && (
                    <div className="space-y-4">
                        <p className="text-[15px] text-[#2D2A26] font-medium leading-relaxed">
                            Dans quel domaine y a-t-il eu du changement ?
                        </p>
                        <div className="grid grid-cols-1 gap-2.5">
                            {vulnQuestions.map((vq, i) => {
                                const vColors = vq.domain ? ThemeColors[vq.domain] : null;
                                return (
                                    <button
                                        key={vq.id}
                                        onClick={() => vq.domain && handleVulnSelect(vq.domain)}
                                        className="flex items-center gap-3.5 rounded-[16px] px-4 py-4 transition-all duration-200 hover:shadow-sm active:scale-[0.98]"
                                        style={{
                                            backgroundColor: 'white',
                                            border: `1.5px solid ${vColors?.color ?? '#EDE8E1'}20`,
                                            animation: `spc-fadeUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.05}s both`,
                                        }}
                                    >
                                        {vq.domain && <ThemeButton domain={vq.domain} size="sm" />}
                                        <span className="text-[14px] font-semibold text-[#2D2A26] flex-1 text-left">
                                            {vq.domain && DOMAIN_LABELS[vq.domain]}
                                        </span>
                                        <ArrowLeft size={14} weight="bold" className="text-[#D4D4D4] rotate-180" />
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Level: MP detail */}
                {currentLevel === 'mp' && (
                    <div className="space-y-4">
                        <p className="text-[15px] text-[#2D2A26] font-medium leading-relaxed">
                            Plus précisément, quel aspect a évolué ?
                        </p>
                        {mpQuestions.length > 0 ? (
                            <div className="space-y-4">
                                {mpQuestions.map((mq, qi) => (
                                    <div
                                        key={mq.id}
                                        className="space-y-2.5"
                                        style={{
                                            animation: `spc-fadeUp 0.3s ease-out ${qi * 0.08}s both`,
                                        }}
                                    >
                                        <p className="text-[13px] font-semibold text-[#8A857E]">{mq.questionText}</p>
                                        <div className="space-y-1.5">
                                            {mq.options.map(opt => (
                                                <MOptionPill
                                                    key={opt.value}
                                                    label={opt.label}
                                                    isSelected={answers[`mp_${mq.mpId}`] === opt.value}
                                                    onClick={() => mq.mpId && handleMPAnswer(mq.mpId, opt.value)}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                ))}
                                <div className="pt-3">
                                    <button
                                        onClick={() => onComplete?.(answers)}
                                        className="w-full py-4 rounded-[16px] text-[15px] font-bold text-white transition-all duration-200 active:scale-[0.97]"
                                        style={{
                                            background: `linear-gradient(135deg, ${accentColor} 0%, ${accentColor}CC 100%)`,
                                            boxShadow: `0 4px 16px ${accentColor}30`,
                                        }}
                                    >
                                        Mettre à jour mon parcours
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div
                                className="text-center py-6 rounded-[16px]"
                                style={{ backgroundColor: '#F8F4EF' }}
                            >
                                <p className="text-[13px] text-[#8A857E]">
                                    Aucun micro-parcours de suivi disponible pour ce thème.
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <style jsx>{`
                @keyframes spc-slideLeft {
                    from { opacity: 0; transform: translateX(20px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                @keyframes spc-slideRight {
                    from { opacity: 0; transform: translateX(-20px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                @keyframes spc-fadeUp {
                    from { opacity: 0; transform: translateY(8px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
};
