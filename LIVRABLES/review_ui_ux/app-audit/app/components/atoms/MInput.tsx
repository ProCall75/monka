"use client";

import React, { useState, useId } from 'react';

export interface MInputProps {
    label: string;
    type?: 'text' | 'email' | 'password' | 'tel';
    value?: string;
    placeholder?: string;
    error?: string;
    disabled?: boolean;
    onChange?: (value: string) => void;
}

export const MInput = ({
    label,
    type = 'text',
    value: controlledValue,
    placeholder = '',
    error,
    disabled = false,
    onChange,
}: MInputProps) => {
    const [internalValue, setInternalValue] = useState(controlledValue ?? '');
    const [isFocused, setIsFocused] = useState(false);
    const id = useId();
    const val = controlledValue ?? internalValue;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInternalValue(e.target.value);
        onChange?.(e.target.value);
    };

    const isFloating = isFocused || val.length > 0;

    return (
        <div className="w-full">
            <div
                className={`
          relative rounded-[16px] border-2 transition-all duration-200
          ${error
                        ? 'border-[#EF4444] bg-[#FEF2F2]'
                        : isFocused
                            ? 'border-[#2D2A26] bg-white shadow-sm'
                            : 'border-[#EDE8E1] bg-[#F8F4EF] hover:border-[#B8B3AB]'
                    }
          ${disabled ? 'opacity-40 pointer-events-none' : ''}
        `}
            >
                <label
                    htmlFor={id}
                    className={`
            absolute left-4 transition-all duration-200 pointer-events-none
            ${isFloating
                            ? 'top-2 text-[11px] font-medium'
                            : 'top-1/2 -translate-y-1/2 text-[14px]'
                        }
            ${error ? 'text-[#EF4444]' : isFocused ? 'text-[#2D2A26]' : 'text-[#B8B3AB]'}
          `}
                    style={{ fontFamily: "'Outfit', 'Inter', sans-serif" }}
                >
                    {label}
                </label>
                <input
                    id={id}
                    type={type}
                    value={val}
                    placeholder={isFloating ? placeholder : ''}
                    disabled={disabled}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onChange={handleChange}
                    className={`
            w-full bg-transparent outline-none text-[14px] text-[#2D2A26]
            px-4 pt-6 pb-2 rounded-[16px]
          `}
                    style={{ fontFamily: "'Outfit', 'Inter', sans-serif" }}
                />
            </div>
            {error && (
                <p className="mt-1.5 ml-1 text-[12px] text-[#EF4444] font-medium">{error}</p>
            )}
        </div>
    );
};
