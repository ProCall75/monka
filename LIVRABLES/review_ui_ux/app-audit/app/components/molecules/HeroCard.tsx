"use client";

import React from 'react';
import { ArrowRight } from '@phosphor-icons/react';
import { ThemeColors, type VulnerabilityDomain } from '../../data/kernel-types';
import { MTag } from '../atoms/MTag';

export interface HeroCardProps {
  domain: VulnerabilityDomain;
  title: string;
  subtitle?: string;
  targetPerson?: string;
  taskCount?: number;
  /** Nombre de micro-parcours actifs dans cette vulnérabilité */
  activeMP?: number;
  /** Nombre total de micro-parcours */
  totalMP?: number;
  onPress?: () => void;
}

export const HeroCard = ({
  domain,
  title,
  subtitle,
  targetPerson,
  taskCount,
  activeMP,
  totalMP,
  onPress,
}: HeroCardProps) => {
  const theme = ThemeColors[domain];

  return (
    <button
      onClick={onPress}
      className={`
        w-full rounded-[24px] p-6 text-left
        transition-all duration-200
        hover:shadow-lg active:scale-[0.98]
        relative overflow-hidden
      `}
      style={{
        background: `linear-gradient(135deg, ${theme.color}15 0%, ${theme.color}08 100%)`,
        border: `1px solid ${theme.color}20`,
      }}
    >
      {/* Decorative gradient circle */}
      <div
        className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-20"
        style={{ backgroundColor: theme.color }}
      />

      <div className="relative z-10">
        <MTag label={theme.label} domain={domain} size="sm" />

        <h3
          className="mt-3 text-[18px] font-bold text-[#1A1A2E] leading-tight"
          style={{ fontFamily: "'Outfit', 'Inter', sans-serif" }}
        >
          {title}
        </h3>

        {subtitle && (
          <p className="mt-1.5 text-[14px] text-[#8E8E93] leading-relaxed">
            {subtitle}
          </p>
        )}

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            {targetPerson && (
              <span className="text-[13px] text-[#C8CCD0] font-medium">
                Pour {targetPerson}
              </span>
            )}
            {activeMP !== undefined && totalMP !== undefined ? (
              <span
                className="text-[12px] font-semibold px-2.5 py-1 rounded-full inline-flex items-center gap-1.5"
                style={{
                  color: theme.color,
                  backgroundColor: `${theme.color}12`,
                }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14">
                  <circle cx="7" cy="7" r="5.5" fill="none" stroke={`${theme.color}30`} strokeWidth="2" />
                  <circle cx="7" cy="7" r="5.5" fill="none" stroke={theme.color} strokeWidth="2"
                    strokeDasharray={`${(activeMP / totalMP) * 34.56} 34.56`}
                    strokeLinecap="round" transform="rotate(-90 7 7)" />
                </svg>
                {activeMP}/{totalMP} programmes
              </span>
            ) : taskCount !== undefined ? (
              <span
                className="text-[12px] font-semibold px-2 py-0.5 rounded-full"
                style={{
                  color: theme.color,
                  backgroundColor: `${theme.color}15`,
                }}
              >
                {taskCount} action{taskCount > 1 ? 's' : ''}
              </span>
            ) : null}
          </div>
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ backgroundColor: theme.color }}
          >
            <ArrowRight size={16} weight="bold" className="text-white" />
          </div>
        </div>
      </div>
    </button>
  );
};
