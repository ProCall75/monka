"use client";

import React from 'react';
import { CaretRight } from '@phosphor-icons/react';
import { ThemeColors, UrgencyConfig, type VulnerabilityDomain, type Criticality } from '../../data/kernel-types';

interface RecoCardProps {
    /** Titre de la recommandation */
    title: string;
    /** Domaine de vulnérabilité (R, A, S, F, M) — détermine la couleur */
    domain: VulnerabilityDomain;
    /** Criticité de la recommandation — affiche le badge d'urgence */
    urgency: Criticality;
    /** Callback au clic — navigue vers le détail / déplie la reco */
    onClick?: () => void;
}

export const RecoCard = ({
    title,
    domain,
    urgency,
    onClick,
}: RecoCardProps) => {
    const theme = ThemeColors[domain];
    const urg = UrgencyConfig[urgency];

    return (
        <button
            onClick={onClick}
            className="w-full text-left rounded-[16px] px-4 py-3.5 border transition-all active:scale-[0.99] hover:shadow-md group"
            style={{
                backgroundColor: 'white',
                borderColor: '#E5E5EA',
                borderLeftWidth: 4,
                borderLeftColor: theme.color,
                boxShadow: '0 2px 8px -3px rgba(0,0,0,0.05)',
            }}
        >
            <div className="flex items-center gap-3">
                {/* Left content */}
                <div className="flex-1 min-w-0">
                    {/* Urgency badge + theme label */}
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span
                            className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider"
                            style={{ backgroundColor: urg.softColor, color: urg.color }}
                        >
                            {urg.userLabel}
                        </span>
                        <span
                            className="text-[10px] font-medium"
                            style={{ color: theme.color }}
                        >
                            {theme.label}
                        </span>
                    </div>

                    {/* Title */}
                    <h4
                        className="text-[14px] font-semibold leading-snug text-[#1A1A2E]"
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                        {title}
                    </h4>
                </div>

                {/* Right chevron */}
                <CaretRight
                    size={16}
                    weight="bold"
                    className="text-[#C8CCD0] group-hover:text-[#8E8E93] flex-shrink-0 transition-colors"
                />
            </div>
        </button>
    );
};
