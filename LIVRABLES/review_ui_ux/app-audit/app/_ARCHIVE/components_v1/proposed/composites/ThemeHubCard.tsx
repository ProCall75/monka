"use client";

import React from "react";
import { motion } from "framer-motion";
import { monka } from "../monka-design-tokens";
import ProgressRing from "../atoms/ProgressRing";

// ─── Types ────────────────────────────────────────────────────────
export interface ThemeHubCardProps {
    /** Theme title */
    title: string;
    /** Short description */
    subtitle: string;
    /** Personalized for whom */
    forWho?: string;
    /** Theme accent color */
    color: string;
    /** Progress 0–100 */
    progress: number;
    /** Number of pending actions */
    pendingActions: number;
    /** Icon node */
    icon: React.ReactNode;
    /** Click handler */
    onPress?: () => void;
}

// ─── Component ────────────────────────────────────────────────────
const ThemeHubCard: React.FC<ThemeHubCardProps> = ({
    title,
    subtitle,
    forWho,
    color,
    progress,
    pendingActions,
    icon,
    onPress,
}) => {
    return (
        <motion.button
            onClick={onPress}
            whileTap={{ scale: 0.97 }}
            whileHover={{ y: -2 }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                padding: 0,
                margin: 0,
                border: "none",
                borderRadius: monka.radius.card,
                overflow: "hidden",
                background: monka.colors.bgCard,
                boxShadow: monka.shadow.card,
                cursor: "pointer",
                textAlign: "left",
                fontFamily: monka.font.family,
            }}
        >
            {/* Color accent strip */}
            <div style={{ height: 2, background: `linear-gradient(90deg, ${color}, ${color}80)` }} />

            <div
                style={{
                    padding: `${monka.spacing.lg}px`,
                    display: "flex",
                    gap: monka.spacing.md,
                    alignItems: "flex-start",
                }}
            >
                {/* Left: Ring */}
                <ProgressRing
                    value={progress}
                    size={40}
                    strokeWidth={3}
                    color={color}
                    label={`${Math.round(progress)}%`}
                    delay={0.1}
                />

                {/* Right: Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: monka.spacing.xs }}>
                        <span style={{ color, display: "flex" }}>{icon}</span>
                        <span
                            style={{
                                fontSize: monka.font.size.subhead,
                                fontWeight: monka.font.weight.bold,
                                color: monka.colors.textDark,
                                lineHeight: 1.2,
                            }}
                        >
                            {title}
                        </span>
                    </div>

                    {forWho && (
                        <span
                            style={{
                                fontSize: monka.font.size.caption,
                                color,
                                fontWeight: monka.font.weight.medium,
                                display: "block",
                                marginTop: 2,
                            }}
                        >
                            Pour {forWho}
                        </span>
                    )}

                    <span
                        style={{
                            fontSize: monka.font.size.footnote,
                            color: monka.colors.textMuted,
                            display: "block",
                            marginTop: monka.spacing.xs,
                            lineHeight: 1.4,
                        }}
                    >
                        {subtitle}
                    </span>

                    {/* Pending actions pill */}
                    {pendingActions > 0 && (
                        <div
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 4,
                                marginTop: monka.spacing.sm,
                                padding: `3px ${monka.spacing.sm}px`,
                                borderRadius: monka.radius.pill,
                                background: `${color}12`,
                                border: `1px solid ${color}20`,
                            }}
                        >
                            <span
                                style={{
                                    width: 6,
                                    height: 6,
                                    borderRadius: 3,
                                    background: color,
                                }}
                            />
                            <span
                                style={{
                                    fontSize: monka.font.size.caption,
                                    fontWeight: monka.font.weight.semibold,
                                    color: color,
                                }}
                            >
                                {pendingActions} action{pendingActions > 1 ? "s" : ""} en cours
                            </span>
                        </div>
                    )}
                </div>

                {/* Chevron */}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 4 }}>
                    <path d="M6 4l4 4-4 4" stroke={monka.colors.textMuted} strokeWidth="1.5" strokeLinecap="round" />
                </svg>
            </div>
        </motion.button>
    );
};

export default ThemeHubCard;
