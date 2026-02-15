"use client";

import React, { useState } from 'react';

interface WeekChartProps {
    data?: { day: string; value: number }[];
    activeDay?: number;
    accentColor?: string;
    barColor?: string;
}

const DEFAULT_DATA = [
    { day: 'Lun', value: 60 },
    { day: 'Mar', value: 75 },
    { day: 'Mer', value: 45 },
    { day: 'Jeu', value: 62 },
    { day: 'Ven', value: 55 },
    { day: 'Sam', value: 80 },
    { day: 'Dim', value: 70 },
];

export const WeekChart = ({
    data = DEFAULT_DATA,
    activeDay = 3,
    accentColor = '#8F6B22',
    barColor = '#FAE0A8',
}: WeekChartProps) => {
    const [selectedPeriod, setSelectedPeriod] = useState('Cette semaine');
    const maxVal = Math.max(...data.map((d) => d.value));

    return (
        <div
            className="bg-white/80 rounded-[32px] p-6"
            style={{ boxShadow: '0 10px 30px -10px rgba(143, 107, 34, 0.1)' }}
        >
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg text-[#1A1A1A]">Évolution 7 jours</h3>
                <select
                    className="bg-transparent text-sm font-semibold text-[#8C8C8C] border-none focus:ring-0 cursor-pointer"
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                >
                    <option>Cette semaine</option>
                    <option>Mois dernier</option>
                    <option>3 derniers mois</option>
                </select>
            </div>

            <div className="flex items-end justify-between h-32 gap-2 px-1">
                {data.map((item, i) => {
                    const isActive = i === activeDay;
                    const heightPct = `${(item.value / maxVal) * 100}%`;
                    return (
                        <div key={item.day} className="flex flex-col items-center gap-2 flex-1">
                            <div
                                className="w-full rounded-t-lg transition-all duration-300"
                                style={{
                                    height: heightPct,
                                    backgroundColor: isActive ? accentColor : barColor,
                                }}
                            />
                            <span
                                className={`text-[10px] font-bold uppercase ${isActive ? 'opacity-80' : 'opacity-40'
                                    }`}
                            >
                                {item.day}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
