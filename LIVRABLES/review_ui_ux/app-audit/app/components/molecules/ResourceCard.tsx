"use client";

import React from 'react';
import { Clock, ArrowRight } from '@phosphor-icons/react';
import { MTag } from '../atoms/MTag';
import type { VulnerabilityDomain } from '../../data/kernel-types';

export interface ResourceCardProps {
    title: string;
    description?: string;
    imageUrl?: string;
    readingTime?: number; // minutes
    category?: string;
    domain?: VulnerabilityDomain;
    onPress?: () => void;
}

export const ResourceCard = ({
    title,
    description,
    imageUrl,
    readingTime,
    category,
    domain,
    onPress,
}: ResourceCardProps) => {
    return (
        <button
            onClick={onPress}
            className="
        w-full rounded-[20px] bg-white overflow-hidden
        border border-[#E5E5EA]
        shadow-[0_2px_8px_rgba(26,26,46,0.04)]
        transition-all duration-200
        hover:shadow-[0_4px_16px_rgba(26,26,46,0.06)]
        active:scale-[0.98]
        text-left
      "
        >
            {/* Image */}
            {imageUrl && (
                <div className="h-[140px] w-full overflow-hidden bg-[#E5E5EA]">
                    <img
                        src={imageUrl}
                        alt={title}
                        className="w-full h-full object-cover"
                    />
                </div>
            )}

            <div className="p-4">
                {/* Tags row */}
                <div className="flex items-center gap-2 mb-2">
                    {domain && <MTag label={category || ''} domain={domain} size="sm" />}
                    {!domain && category && (
                        <span className="text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wide">
                            {category}
                        </span>
                    )}
                    {readingTime && (
                        <span className="flex items-center gap-1 text-[11px] text-[#C8CCD0]">
                            <Clock size={12} weight="bold" />
                            {readingTime} min
                        </span>
                    )}
                </div>

                {/* Title */}
                <h4
                    className="text-[15px] font-semibold text-[#1A1A2E] leading-snug line-clamp-2"
                    style={{ fontFamily: "'Outfit', 'Inter', sans-serif" }}
                >
                    {title}
                </h4>

                {/* Description */}
                {description && (
                    <p className="mt-1.5 text-[13px] text-[#8E8E93] leading-relaxed line-clamp-2">
                        {description}
                    </p>
                )}

                {/* CTA */}
                <div className="flex items-center gap-1 mt-3 text-[13px] font-semibold text-[#1A1A2E]">
                    Lire <ArrowRight size={14} weight="bold" />
                </div>
            </div>
        </button>
    );
};
