import React from "react";
import MTag from "../atoms/MTag";
import MIcon from "../atoms/MIcon";
import type { IconName } from "../atoms/MIcon";
import type { MTagProps } from "../atoms/MTag";
import { monka } from "./monka-design-tokens";

export interface MActionCardProps {
    title: string;
    subtitle?: string;
    tags?: Array<{ label: string; color: MTagProps["color"] }>;
    icon?: IconName;
    iconColor?: string;
    ctaLabel?: string;
    onPress?: () => void;
}

export default function MActionCard({
    title,
    subtitle,
    tags = [],
    icon,
    iconColor = monka.colors.ctaPrimary,
    ctaLabel = "Je commence",
    onPress,
}: MActionCardProps) {
    return (
        <div
            style={{
                background: monka.colors.bgCard,
                borderRadius: monka.radius.card,
                padding: 16,
                boxShadow: monka.shadow.card,
                display: "flex",
                flexDirection: "column",
                gap: 10,
                minWidth: 260,
                fontFamily: monka.font.family,
            }}
        >
            {/* Tags row */}
            {tags.length > 0 && (
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {tags.map((tag, i) => (
                        <MTag key={i} label={tag.label} color={tag.color} />
                    ))}
                </div>
            )}

            {/* Title + icon */}
            <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                {icon && (
                    <div
                        style={{
                            width: 36,
                            height: 36,
                            borderRadius: 10,
                            background: `${iconColor}15`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                        }}
                    >
                        <MIcon name={icon} size={20} color={iconColor} />
                    </div>
                )}
                <div style={{ flex: 1 }}>
                    <div
                        style={{
                            fontSize: monka.font.size.body,
                            fontWeight: monka.font.weight.semibold,
                            color: monka.colors.textDark,
                            lineHeight: 1.3,
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

            {/* CTA */}
            <button
                onClick={onPress}
                style={{
                    alignSelf: "flex-start",
                    padding: "8px 18px",
                    borderRadius: monka.radius.button,
                    background: "transparent",
                    color: monka.colors.ctaPrimary,
                    border: `1.5px solid ${monka.colors.ctaPrimary}`,
                    fontSize: monka.font.size.body,
                    fontWeight: monka.font.weight.semibold,
                    fontFamily: monka.font.family,
                    cursor: "pointer",
                }}
            >
                {ctaLabel}
            </button>
        </div>
    );
}
