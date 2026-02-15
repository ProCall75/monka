"use client";

import React from 'react';
import { ToggleSwitch } from '../atoms/ToggleSwitch';

export type SettingsRowAction = 'chevron' | 'toggle' | 'label';

interface SettingsRowProps {
    icon: React.ReactNode;
    iconBg: string;
    iconColor?: string;
    label: string;
    action?: SettingsRowAction;
    actionLabel?: string;
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    onClick?: () => void;
    isFirst?: boolean;
    isLast?: boolean;
}

export const SettingsRow = ({
    icon,
    iconBg,
    label,
    action = 'chevron',
    actionLabel,
    checked = false,
    onCheckedChange,
    onClick,
    isFirst = false,
    isLast = false,
}: SettingsRowProps) => {
    const Wrapper = action === 'toggle' ? 'div' : 'button';

    return (
        <Wrapper
            className={`w-full px-6 py-4 flex items-center justify-between transition-colors ${action !== 'toggle' ? 'hover:bg-stone-50 cursor-pointer' : ''
                } ${!isLast ? 'border-b border-stone-50' : ''}`}
            onClick={action !== 'toggle' ? onClick : undefined}
        >
            <div className="flex items-center gap-3">
                <div
                    className="w-10 h-10 rounded-2xl flex items-center justify-center"
                    style={{ backgroundColor: iconBg }}
                >
                    {icon}
                </div>
                <span className="font-medium text-[#1A1A1A]">{label}</span>
            </div>

            {action === 'chevron' && (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4D4D4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                </svg>
            )}
            {action === 'toggle' && (
                <ToggleSwitch checked={checked} onChange={onCheckedChange || (() => { })} />
            )}
            {action === 'label' && (
                <span className="text-xs text-[#8C8C8C] font-medium uppercase">{actionLabel}</span>
            )}
        </Wrapper>
    );
};

/* Section wrapper — groups rows into a white card */
export const SettingsSection = ({
    title,
    children,
}: {
    title?: string;
    children: React.ReactNode;
}) => (
    <section>
        {title && (
            <h3 className="text-[10px] font-bold text-[#8C8C8C] uppercase tracking-[0.12em] mb-3 px-2">
                {title}
            </h3>
        )}
        <div
            className="bg-white rounded-[32px] overflow-hidden"
            style={{ boxShadow: '0 10px 30px -10px rgba(166, 146, 128, 0.15)' }}
        >
            {children}
        </div>
    </section>
);
