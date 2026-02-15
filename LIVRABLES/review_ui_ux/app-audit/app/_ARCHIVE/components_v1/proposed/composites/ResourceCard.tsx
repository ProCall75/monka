"use client";

import React from "react";
import { motion } from "framer-motion";
import { monka } from "../monka-design-tokens";

// ─── Types ────────────────────────────────────────────────────────
export interface ResourceCardProps {
    /** Article title */
    title: string;
    /** Reading time */
    readingTime: string;
    /** Category label */
    category: string;
    /** Category color */
    categoryColor?: string;
    /** Thumbnail placeholder color */
    thumbnailColor?: string;
    /** Icon for the article */
    icon?: React.ReactNode;
    /** Click handler */
    onPress?: () => void;
}

// ─── Component ────────────────────────────────────────────────────
const ResourceCard: React.FC<ResourceCardProps> = ({
    title,
    readingTime,
    category,
    categoryColor = monka.colors.ctaPrimary,
    thumbnailColor,
    icon,
    onPress,
}) => {
    const bgGradient = thumbnailColor || categoryColor;

    return (
        <motion.button
            onClick={onPress}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
                display: "flex",
                flexDirection: "column",
                width: 160,
                flexShrink: 0,
                border: "none",
                borderRadius: monka.radius.card,
                overflow: "hidden",
                background: monka.colors.bgCard,
                boxShadow: monka.shadow.card,
                cursor: "pointer",
                textAlign: "left",
                fontFamily: monka.font.family,
                padding: 0,
            }}
        >
            {/* Thumbnail area */}
            <div
                style={{
                    height: 90,
                    background: `linear-gradient(135deg, ${bgGradient}20, ${bgGradient}08)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                }}
            >
                {icon ? (
                    <div style={{ color: bgGradient, opacity: 0.7 }}>{icon}</div>
                ) : (
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" opacity={0.4}>
                        <path d="M4 4h16v16H4z" stroke={bgGradient} strokeWidth="1.5" rx="2" />
                        <path d="M4 14l4-4 3 3 2-2 7 7" stroke={bgGradient} strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                )}

                {/* Category pill */}
                <span
                    style={{
                        position: "absolute",
                        top: monka.spacing.sm,
                        left: monka.spacing.sm,
                        fontSize: 10,
                        fontWeight: monka.font.weight.semibold,
                        color: categoryColor,
                        background: `${categoryColor}15`,
                        padding: "2px 8px",
                        borderRadius: monka.radius.pill,
                        border: `1px solid ${categoryColor}20`,
                    }}
                >
                    {category}
                </span>
            </div>

            {/* Content */}
            <div style={{ padding: monka.spacing.md, flex: 1, display: "flex", flexDirection: "column" }}>
                <span
                    style={{
                        fontSize: monka.font.size.footnote,
                        fontWeight: monka.font.weight.semibold,
                        color: monka.colors.textDark,
                        lineHeight: 1.35,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical" as const,
                        overflow: "hidden",
                        flex: 1,
                    }}
                >
                    {title}
                </span>

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        marginTop: monka.spacing.sm,
                    }}
                >
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                        <circle cx="8" cy="8" r="6" stroke={monka.colors.textMuted} strokeWidth="1.2" />
                        <path d="M8 5v3.5l2 1" stroke={monka.colors.textMuted} strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                    <span
                        style={{
                            fontSize: monka.font.size.caption,
                            color: monka.colors.textMuted,
                        }}
                    >
                        {readingTime}
                    </span>
                </div>
            </div>
        </motion.button>
    );
};

export default ResourceCard;
