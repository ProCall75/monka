import React, { useState } from "react";
import { monka } from "./monka-design-tokens";

export interface MInputProps {
    placeholder?: string;
    value?: string;
    onChange?: (val: string) => void;
    icon?: React.ReactNode;
    error?: string;
    disabled?: boolean;
}

export default function MInput({
    placeholder = "Rechercher...",
    value = "",
    onChange,
    icon,
    error,
    disabled = false,
}: MInputProps) {
    const [focused, setFocused] = useState(false);

    const borderColor = error
        ? "#FF3B30"
        : focused
            ? monka.colors.ctaPrimary
            : monka.colors.separator;

    return (
        <div style={{ width: "100%" }}>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    background: disabled ? "#F2F2F7" : monka.colors.bgCard,
                    borderRadius: monka.radius.card,
                    padding: "12px 14px",
                    border: `1.5px solid ${borderColor}`,
                    transition: "border-color 0.15s ease",
                    opacity: disabled ? 0.6 : 1,
                }}
            >
                {icon && (
                    <span style={{ display: "flex", flexShrink: 0, color: monka.colors.textMuted }}>
                        {icon}
                    </span>
                )}
                <input
                    type="text"
                    value={value}
                    placeholder={placeholder}
                    disabled={disabled}
                    onChange={(e) => onChange?.(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    style={{
                        flex: 1,
                        border: "none",
                        outline: "none",
                        background: "transparent",
                        fontSize: monka.font.size.body,
                        fontFamily: monka.font.family,
                        color: monka.colors.textDark,
                        lineHeight: 1.4,
                    }}
                />
            </div>
            {error && (
                <span
                    style={{
                        display: "block",
                        marginTop: 4,
                        fontSize: monka.font.size.footnote,
                        color: "#FF3B30",
                        fontFamily: monka.font.family,
                    }}
                >
                    {error}
                </span>
            )}
        </div>
    );
}
