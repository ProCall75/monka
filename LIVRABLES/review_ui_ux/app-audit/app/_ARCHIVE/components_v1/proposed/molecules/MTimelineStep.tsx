import React from "react";
import MIcon from "../atoms/MIcon";
import { monka } from "./monka-design-tokens";

export interface MTimelineStepProps {
    title: string;
    subtitle?: string;
    completed?: boolean;
    active?: boolean;
    isLast?: boolean;
}

export default function MTimelineStep({
    title,
    subtitle,
    completed = false,
    active = false,
    isLast = false,
}: MTimelineStepProps) {
    return (
        <div style={{ display: "flex", gap: 12, fontFamily: monka.font.family }}>
            {/* Timeline dot + line */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 28 }}>
                <div
                    style={{
                        width: 24,
                        height: 24,
                        borderRadius: 12,
                        background: completed
                            ? monka.colors.checkGreen
                            : active
                                ? monka.colors.ctaPrimary
                                : monka.colors.progressInactive,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                    }}
                >
                    {completed ? (
                        <MIcon name="check" size={14} color="#fff" />
                    ) : (
                        <div
                            style={{
                                width: 8,
                                height: 8,
                                borderRadius: 4,
                                background: active ? "#fff" : "transparent",
                            }}
                        />
                    )}
                </div>
                {!isLast && (
                    <div
                        style={{
                            width: 2,
                            flex: 1,
                            minHeight: 24,
                            background: completed ? monka.colors.checkGreen : monka.colors.progressInactive,
                        }}
                    />
                )}
            </div>

            {/* Content */}
            <div style={{ flex: 1, paddingBottom: isLast ? 0 : 20 }}>
                <div
                    style={{
                        fontSize: monka.font.size.body,
                        fontWeight: active || completed ? monka.font.weight.semibold : monka.font.weight.regular,
                        color: completed || active ? monka.colors.textDark : monka.colors.textMuted,
                        lineHeight: 1.4,
                    }}
                >
                    {title}
                </div>
                {subtitle && (
                    <div
                        style={{
                            fontSize: monka.font.size.footnote,
                            color: monka.colors.textMuted,
                            marginTop: 3,
                        }}
                    >
                        {subtitle}
                    </div>
                )}
            </div>
        </div>
    );
}
