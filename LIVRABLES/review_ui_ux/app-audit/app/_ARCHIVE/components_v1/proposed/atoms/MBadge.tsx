import React from "react";
import { monka } from "./monka-design-tokens";

export interface MBadgeProps {
    count?: number;
    color?: "primary" | "alert" | "success" | "muted";
    dot?: boolean;
}

const BADGE_COLORS = {
    primary: monka.colors.ctaPrimary,
    alert: "#FF3B30",
    success: monka.colors.checkGreen,
    muted: monka.colors.textMuted,
};

export default function MBadge({ count, color = "alert", dot = false }: MBadgeProps) {
    const bg = BADGE_COLORS[color];

    if (dot) {
        return (
            <span
                style={{
                    display: "inline-block",
                    width: 8,
                    height: 8,
                    borderRadius: monka.radius.full,
                    background: bg,
                    flexShrink: 0,
                }}
            />
        );
    }

    if (count === undefined || count <= 0) return null;

    const label = count > 99 ? "99+" : String(count);

    return (
        <span
            style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                minWidth: 20,
                height: 20,
                padding: "0 6px",
                borderRadius: monka.radius.full,
                background: bg,
                color: monka.colors.textWhite,
                fontSize: 11,
                fontWeight: monka.font.weight.bold,
                fontFamily: monka.font.family,
                lineHeight: 1,
                flexShrink: 0,
            }}
        >
            {label}
        </span>
    );
}
