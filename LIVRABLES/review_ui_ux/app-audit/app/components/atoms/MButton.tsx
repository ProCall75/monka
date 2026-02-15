"use client";

import React from 'react';

export interface MButtonProps {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
    disabled?: boolean;
    onClick?: () => void;
    icon?: React.ReactNode;
}

export const MButton = ({
    children,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    disabled = false,
    onClick,
    icon,
}: MButtonProps) => {
    const baseClasses = `
    inline-flex items-center justify-center gap-2 font-semibold
    rounded-full transition-all duration-200
    active:scale-[0.97] disabled:opacity-40 disabled:pointer-events-none
    ${fullWidth ? 'w-full' : ''}
  `;

    const sizeClasses = {
        sm: 'px-4 py-2 text-[13px] min-h-[36px]',
        md: 'px-6 py-3 text-[15px] min-h-[48px]',
        lg: 'px-8 py-4 text-[16px] min-h-[56px]',
    };

    const variantClasses = {
        primary: 'bg-[#2D2A26] text-white hover:bg-[#1A1A1A] shadow-sm hover:shadow-md',
        secondary: 'bg-transparent text-[#2D2A26] border-2 border-[#2D2A26] hover:bg-[#2D2A26]/5',
        ghost: 'bg-transparent text-[#8A857E] hover:text-[#2D2A26] hover:bg-[#2D2A26]/5',
        danger: 'bg-[#EF4444]/10 text-[#DC2626] hover:bg-[#EF4444]/20',
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]}`}
            style={{ fontFamily: "'Outfit', 'Inter', sans-serif" }}
        >
            {icon && <span className="flex-shrink-0">{icon}</span>}
            {children}
        </button>
    );
};
