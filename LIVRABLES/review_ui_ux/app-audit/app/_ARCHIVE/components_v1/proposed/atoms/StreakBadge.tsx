"use client";

import React from "react";
import { motion } from "framer-motion";
import { monka } from "../monka-design-tokens";

// ─── Types ────────────────────────────────────────────────────────
export interface StreakBadgeProps {
    /** Number of consecutive active days */
    count: number;
    /** Whether the streak is currently active (used today) */
    isActive?: boolean;
}

// ─── Flame Icon ───────────────────────────────────────────────────
const FlameIcon: React.FC<{ size: number; color: string }> = ({ size, color }) => (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
        <path
            d="M10 2C10 2 6 6.5 6 10.5C6 13 7.8 15 10 15C12.2 15 14 13 14 10.5C14 6.5 10 2 10 2Z"
            fill={color}
            opacity={0.2}
        />
        <path
            d="M10 2C10 2 6 6.5 6 10.5C6 13 7.8 15 10 15C12.2 15 14 13 14 10.5C14 6.5 10 2 10 2Z"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M10 8C10 8 8.5 10 8.5 11.5C8.5 12.9 9.2 13.5 10 13.5C10.8 13.5 11.5 12.9 11.5 11.5C11.5 10 10 8 10 8Z"
            fill={color}
            opacity={0.6}
        />
    </svg>
);

// ─── Component ────────────────────────────────────────────────────
const StreakBadge: React.FC<StreakBadgeProps> = ({ count, isActive = true }) => {
    const color = isActive ? monka.colors.streakActive : monka.colors.streakInactive;
    const bgColor = isActive ? `${monka.colors.streakActive}15` : `${monka.colors.streakInactive}10`;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            style={{
                display: "inline-flex",
                alignItems: "center",
                gap: monka.spacing.xs + 2,
                padding: `${monka.spacing.xs + 2}px ${monka.spacing.md}px`,
                borderRadius: monka.radius.pill,
                background: bgColor,
                border: `1px solid ${color}25`,
                fontFamily: monka.font.family,
            }}
        >
            <motion.div
                animate={isActive ? { scale: [1, 1.15, 1] } : {}}
                transition={isActive ? { repeat: Infinity, duration: 2, ease: "easeInOut" } : {}}
            >
                <FlameIcon size={16} color={color} />
            </motion.div>

            <span
                style={{
                    fontSize: monka.font.size.footnote,
                    fontWeight: monka.font.weight.bold,
                    color: isActive ? monka.colors.textDark : monka.colors.textMuted,
                    lineHeight: 1,
                }}
            >
                {count > 0 ? `${count} jour${count > 1 ? "s" : ""}` : "Reprendre"}
            </span>
        </motion.div>
    );
};

export default StreakBadge;
