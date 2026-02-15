"use client";

import React from 'react';

interface NavItem {
    id: string;
    icon: React.ReactNode;
    iconActive: React.ReactNode;
    isActive?: boolean;
}

const navItems: NavItem[] = [
    {
        id: 'home',
        icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>),
        iconActive: (<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-white"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>),
        isActive: true,
    },
    {
        id: 'grid',
        icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>),
        iconActive: (<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-white"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>),
    },
    {
        id: 'docs',
        icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>),
        iconActive: (<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-white"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /></svg>),
    },
    {
        id: 'profile',
        icon: (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>),
        iconActive: (<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-white"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>),
    },
];

/* Design 2 — Dark pill nav floating bottom */
export const BottomNavDark = () => {
    return (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] bg-[#1A1A1A] rounded-[32px] px-8 py-5 flex justify-between items-center shadow-2xl z-20">
            {navItems.map((item) => (
                <button key={item.id} className="flex flex-col items-center gap-1 group">
                    <div className={
                        item.isActive
                            ? "w-12 h-12 bg-[#1A1A1A] rounded-[20px] flex items-center justify-center text-white"
                            : "w-12 h-12 rounded-[20px] flex items-center justify-center group-hover:bg-gray-800 transition-colors"
                    }>
                        {item.isActive ? item.iconActive : item.icon}
                    </div>
                    {item.isActive && <div className="w-1 h-1 bg-white rounded-full mt-1" />}
                </button>
            ))}
        </div>
    );
};

/* Design 1 — White glass nav with dark active button */
export const BottomNavGlass = () => {
    return (
        <div className="absolute bottom-0 w-full z-30">
            {/* Fade gradient */}
            <div className="h-16 bg-gradient-to-t from-[#FDF6F0] to-transparent pointer-events-none" />
            {/* Glass bar */}
            <div className="bg-white/90 backdrop-blur-xl border-t border-white/50 px-8 pb-8 pt-4 rounded-t-[32px] shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
                <div className="flex justify-between items-center max-w-xs mx-auto">
                    {navItems.map((item) => (
                        <button key={item.id} className="flex flex-col items-center gap-1.5 w-14 group">
                            <div className={
                                item.isActive
                                    ? "w-12 h-12 bg-[#1A1A1A] rounded-[20px] flex items-center justify-center text-white shadow-lg shadow-black/20 transition-transform group-hover:scale-105"
                                    : "w-12 h-12 rounded-[20px] flex items-center justify-center text-gray-400 group-hover:bg-gray-50 group-hover:text-[#1A1A1A] transition-colors"
                            }>
                                {item.isActive ? item.iconActive : item.icon}
                            </div>
                            <div className={`w-1 h-1 rounded-full ${item.isActive ? 'bg-[#1A1A1A]' : 'bg-transparent group-hover:bg-gray-300'}`} />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};
