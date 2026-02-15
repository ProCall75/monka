"use client";

import React from 'react';

interface PageHeaderProps {
    badge?: React.ReactNode;
    onBack?: () => void;
    onAction?: () => void;
    actionIcon?: React.ReactNode;
}

export const PageHeader = ({
    badge,
    onBack,
    onAction,
    actionIcon,
}: PageHeaderProps) => {
    return (
        <header className="pt-12 px-6 flex justify-between items-center">
            <button
                onClick={onBack}
                className="w-10 h-10 rounded-full bg-white/50 flex items-center justify-center transition-colors hover:bg-white"
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6" />
                </svg>
            </button>
            {badge && <div className="flex flex-col items-center">{badge}</div>}
            <button
                onClick={onAction}
                className="w-10 h-10 rounded-full bg-white/50 flex items-center justify-center transition-colors hover:bg-white"
            >
                {actionIcon || (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
                        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                    </svg>
                )}
            </button>
        </header>
    );
};
