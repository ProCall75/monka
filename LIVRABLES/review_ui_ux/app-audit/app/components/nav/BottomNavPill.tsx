"use client";

import React from 'react';
import {
    House,
    CalendarBlank,
    UsersThree,
    BookOpenText,
    GearSix,
} from '@phosphor-icons/react';

interface BottomNavPillProps {
    activeTab?: string;
    onTabChange?: (tab: string) => void;
}

const navItems = [
    { id: 'home', label: 'Accueil', Icon: House },
    { id: 'calendar', label: 'Agenda', Icon: CalendarBlank },
    { id: 'community', label: 'Mes Pros', Icon: UsersThree },
    { id: 'resources', label: 'Ressources', Icon: BookOpenText },
    { id: 'settings', label: 'Réglages', Icon: GearSix },
];

export const BottomNavPill = ({ activeTab = 'home', onTabChange }: BottomNavPillProps) => {
    return (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-[90%] z-50">
            <nav
                className="rounded-full px-1.5 py-1.5 flex justify-between items-center shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-white/50"
                style={{
                    backdropFilter: 'blur(12px)',
                    background: 'rgba(255, 255, 255, 0.85)',
                }}
            >
                {navItems.map((item) => {
                    const isActive = activeTab === item.id;
                    return (
                        <button
                            key={item.id}
                            data-tour-tab={item.id}
                            onClick={() => onTabChange?.(item.id)}
                            className="w-11 h-11 rounded-full flex items-center justify-center relative"
                            style={{
                                backgroundColor: isActive ? '#1A1A1A' : 'transparent',
                                color: isActive ? '#FFFFFF' : '#9CA3AF',
                                transform: isActive ? 'scale(1.05)' : 'scale(1)',
                                boxShadow: isActive ? '0 4px 12px rgba(0,0,0,0.1)' : 'none',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            }}
                        >
                            <item.Icon
                                size={20}
                                weight={isActive ? 'fill' : 'bold'}
                            />
                        </button>
                    );
                })}
            </nav>
        </div>
    );
};
