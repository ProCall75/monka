"use client";

import React from "react";
import { motion } from "framer-motion";
import { monka } from "../monka-design-tokens";

// ─── Types ────────────────────────────────────────────────────────
export interface AchievementCardProps {
    /** Achievement title */
    title: string;
    /** Achievement description */
    description: string;
    /** Date achieved */
    date?: string;
    /** Icon node */
    icon: React.ReactNode;
    /** Whether this achievement is unlocked */
    unlocked?: boolean;
}

// ─── Star Icon ────────────────────────────────────────────────────
const StarIcon: React.FC<{ color: string }> = ({ color }) => (
    <svg width="12" height="12" viewBox="0 0 16 16" fill={color}>
        <path d="M8 1l2.2 4.5L15 6.3l-3.5 3.4.8 4.8L8 12.3 3.7 14.5l.8-4.8L1 6.3l4.8-.8L8 1z" />
    </svg>
);

// ─── Component ────────────────────────────────────────────────────
const AchievementCard: React.FC<AchievementCardProps> = ({
    title,
    description,
    date,
    icon,
    unlocked = true,
}) => {
    const goldColor = monka.colors.achievementGold;
    const bgColor = unlocked ? monka.colors.achievementBg : `${monka.colors.separator}40`;
    const borderColor = unlocked ? `${goldColor}30` : monka.colors.separator;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            style={{
                display: "flex",
                gap: monka.spacing.md,
                padding: monka.spacing.lg,
                borderRadius: monka.radius.card,
                background: bgColor,
                border: `1px solid ${borderColor}`,
                fontFamily: monka.font.family,
                opacity: unlocked ? 1 : 0.6,
            }}
        >
            {/* Icon container */}
            <motion.div
                animate={unlocked ? { rotate: [0, -5, 5, 0] } : {}}
                transition={unlocked ? { duration: 0.5, delay: 0.3 } : {}}
                style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: unlocked
                        ? `linear-gradient(135deg, ${goldColor}20, ${goldColor}08)`
                        : monka.colors.separator,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    border: `1px solid ${unlocked ? `${goldColor}25` : "transparent"}`,
                }}
            >
                {icon}
            </motion.div>

            {/* Text */}
            <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span
                        style={{
                            fontSize: monka.font.size.body,
                            fontWeight: monka.font.weight.bold,
                            color: unlocked ? monka.colors.textDark : monka.colors.textMuted,
                            lineHeight: 1.3,
                        }}
                    >
                        {title}
                    </span>
                    {unlocked && (
                        <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.4, type: "spring", stiffness: 500, damping: 15 }}
                        >
                            <StarIcon color={goldColor} />
                        </motion.span>
                    )}
                </div>

                <span
                    style={{
                        fontSize: monka.font.size.footnote,
                        color: monka.colors.textMuted,
                        lineHeight: 1.4,
                        display: "block",
                        marginTop: 2,
                    }}
                >
                    {description}
                </span>

                {date && unlocked && (
                    <span
                        style={{
                            fontSize: monka.font.size.caption,
                            color: goldColor,
                            fontWeight: monka.font.weight.medium,
                            display: "block",
                            marginTop: monka.spacing.xs,
                        }}
                    >
                        {date}
                    </span>
                )}
            </div>

            {/* Checkmark or lock */}
            {unlocked ? (
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    style={{
                        width: 24,
                        height: 24,
                        borderRadius: 12,
                        background: monka.colors.checkGreen,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        alignSelf: "center",
                    }}
                >
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                        <path d="M4 8l3 3 5-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </motion.div>
            ) : (
                <div
                    style={{
                        width: 24,
                        height: 24,
                        borderRadius: 12,
                        background: monka.colors.separator,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        alignSelf: "center",
                    }}
                >
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                        <rect x="5" y="7" width="6" height="5" rx="1" stroke={monka.colors.textMuted} strokeWidth="1.5" />
                        <path d="M6.5 7V5.5a1.5 1.5 0 013 0V7" stroke={monka.colors.textMuted} strokeWidth="1.5" />
                    </svg>
                </div>
            )}
        </motion.div>
    );
};

export default AchievementCard;
