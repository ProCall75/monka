"use client";

import React from "react";
import { motion } from "framer-motion";
import { monka } from "../monka-design-tokens";

// ─── Types ────────────────────────────────────────────────────────
export interface ProgressRingProps {
    /** Progress value 0–100 */
    value: number;
    /** Ring diameter in px */
    size?: number;
    /** Ring stroke width */
    strokeWidth?: number;
    /** Ring color */
    color?: string;
    /** Track (background) color */
    trackColor?: string;
    /** Label shown in center (e.g. "75%") */
    label?: string;
    /** Sub-label below the ring */
    subLabel?: string;
    /** Animation delay in seconds */
    delay?: number;
}

// ─── Component ────────────────────────────────────────────────────
const ProgressRing: React.FC<ProgressRingProps> = ({
    value,
    size = 80,
    strokeWidth = 6,
    color = monka.colors.ctaPrimary,
    trackColor = monka.colors.separator,
    label,
    subLabel,
    delay = 0,
}) => {
    const clampedValue = Math.min(100, Math.max(0, value));
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (clampedValue / 100) * circumference;

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: monka.spacing.xs,
            }}
        >
            <div style={{ position: "relative", width: size, height: size }}>
                <svg
                    width={size}
                    height={size}
                    viewBox={`0 0 ${size} ${size}`}
                    style={{ transform: "rotate(-90deg)" }}
                >
                    {/* Track */}
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        fill="none"
                        stroke={trackColor}
                        strokeWidth={strokeWidth}
                    />
                    {/* Progress */}
                    <motion.circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        fill="none"
                        stroke={color}
                        strokeWidth={strokeWidth}
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset }}
                        transition={{
                            duration: 1.2,
                            delay,
                            ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
                        }}
                    />
                </svg>

                {/* Center label */}
                {label && (
                    <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: delay + 0.4, duration: 0.3 }}
                        style={{
                            position: "absolute",
                            inset: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: size > 60 ? monka.font.size.subhead : monka.font.size.footnote,
                            fontWeight: monka.font.weight.bold,
                            color: monka.colors.textDark,
                            fontFamily: monka.font.family,
                        }}
                    >
                        {label}
                    </motion.span>
                )}
            </div>

            {subLabel && (
                <span
                    style={{
                        fontSize: monka.font.size.caption,
                        fontWeight: monka.font.weight.medium,
                        color: monka.colors.textMuted,
                        fontFamily: monka.font.family,
                        textAlign: "center",
                        lineHeight: 1.2,
                    }}
                >
                    {subLabel}
                </span>
            )}
        </div>
    );
};

export default ProgressRing;
