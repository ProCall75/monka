import React from "react";
import { monka } from "./monka-design-tokens";

export interface MButtonProps {
    label: string;
    variant?: "primary" | "secondary" | "ghost" | "outline";
    size?: "sm" | "md" | "lg";
    disabled?: boolean;
    fullWidth?: boolean;
    icon?: React.ReactNode;
    onPress?: () => void;
}

export default function MButton({
    label,
    variant = "primary",
    size = "md",
    disabled = false,
    fullWidth = false,
    icon,
    onPress,
}: MButtonProps) {
    const sizes = {
        sm: { height: 36, minHeight: 44, fontSize: monka.font.size.footnote, px: 10, iconSize: 14 },
        md: { height: 40, minHeight: 44, fontSize: monka.font.size.body, px: 14, iconSize: 16 },
        lg: { height: 48, minHeight: 44, fontSize: monka.font.size.title3, px: 18, iconSize: 18 },
    };

    const variants = {
        primary: {
            bg: disabled ? monka.colors.ctaMuted : monka.colors.ctaPrimary,
            color: monka.colors.textWhite,
            border: "none",
        },
        secondary: {
            bg: disabled ? "#F2F2F7" : monka.colors.bgCard,
            color: disabled ? monka.colors.textMuted : monka.colors.textDark,
            border: `1px solid ${monka.colors.separator}`,
        },
        ghost: {
            bg: "transparent",
            color: disabled ? monka.colors.textMuted : monka.colors.ctaPrimary,
            border: "none",
        },
        outline: {
            bg: "transparent",
            color: disabled ? monka.colors.textMuted : monka.colors.ctaPrimary,
            border: `1.5px solid ${disabled ? monka.colors.ctaMuted : monka.colors.ctaOutline}`,
        },
    };

    const s = sizes[size];
    const v = variants[variant];

    return (
        <button
            onClick={disabled ? undefined : onPress}
            disabled={disabled}
            style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                height: s.height,
                minHeight: s.minHeight,
                padding: `0 ${s.px}px`,
                width: fullWidth ? "100%" : undefined,
                background: v.bg,
                color: v.color,
                border: v.border,
                borderRadius: monka.radius.button,
                fontSize: s.fontSize,
                fontWeight: monka.font.weight.semibold,
                fontFamily: monka.font.family,
                cursor: disabled ? "not-allowed" : "pointer",
                opacity: disabled ? 0.6 : 1,
                transition: "all 0.15s ease",
                outline: "none",
                WebkitTapHighlightColor: "transparent",
            }}
        >
            {icon && <span style={{ display: "flex", flexShrink: 0 }}>{icon}</span>}
            {label}
        </button>
    );
}
