import React from "react";
import { monka } from "./monka-design-tokens";

export interface MProgressBarProps {
    progress: number; // 0-100
    color?: string;
    height?: number;
    showLabel?: boolean;
}

export default function MProgressBar({
    progress,
    color = monka.colors.ctaPrimary,
    height = 8,
    showLabel = false,
}: MProgressBarProps) {
    const clamped = Math.max(0, Math.min(100, progress));

    return (
        <div style={{ width: "100%" }}>
            {showLabel && (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: 4,
                        fontSize: monka.font.size.footnote,
                        fontFamily: monka.font.family,
                        color: monka.colors.textMuted,
                    }}
                >
                    <span>Progression</span>
                    <span style={{ fontWeight: monka.font.weight.semibold, color: monka.colors.textDark }}>
                        {Math.round(clamped)}%
                    </span>
                </div>
            )}
            <div
                style={{
                    width: "100%",
                    height,
                    borderRadius: height / 2,
                    background: monka.colors.progressInactive,
                    overflow: "hidden",
                }}
            >
                <div
                    style={{
                        width: `${clamped}%`,
                        height: "100%",
                        borderRadius: height / 2,
                        background: color,
                        transition: "width 0.4s ease",
                    }}
                />
            </div>
        </div>
    );
}
