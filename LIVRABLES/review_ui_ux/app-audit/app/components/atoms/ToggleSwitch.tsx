"use client";

import React from 'react';

interface ToggleSwitchProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    id?: string;
}

export const ToggleSwitch = ({ checked, onChange, id = 'toggle' }: ToggleSwitchProps) => {
    return (
        <button
            role="switch"
            aria-checked={checked}
            id={id}
            onClick={() => onChange(!checked)}
            className="relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none"
            style={{ backgroundColor: checked ? '#1A1A1A' : '#e5e7eb' }}
        >
            <span
                className="inline-block h-5 w-5 rounded-full bg-white shadow-md transition-transform duration-200 ease-in-out"
                style={{ transform: checked ? 'translateX(24px)' : 'translateX(4px)' }}
            />
        </button>
    );
};
