"use client";

import React from "react";
import { motion } from "framer-motion";
import { monka } from "../monka-design-tokens";

// ─── Types ────────────────────────────────────────────────────────
export type PhaseLevel = 1 | 2 | 3;

export interface PhaseBadgeProps {
    /** Phase level 1–3 */
    phase: PhaseLevel;
    /** Whether to show the full label or compact */
    compact?: boolean;
}

// ─── Phase Config ─────────────────────────────────────────────────
const PHASES: Record<PhaseLevel, {
    label: string;
    color: string;
    icon: React.ReactNode;
    description: string;
}> = {
    1: {
        label: "Découverte",
        color: monka.colors.phaseDecouverte,
        description: "Vous apprenez à accompagner",
        icon: (
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
                <path d="M8 5v3l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        ),
    },
    2: {
        label: "Autonomie",
        color: monka.colors.phaseAutonomie,
        description: "Vous gérez avec confiance",
        icon: (
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M8 3v10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
            </svg>
        ),
    },
    3: {
        label: "Sérénité",
        color: monka.colors.phaseSerenite,
        description: "Vous êtes en maîtrise",
        icon: (
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M4 8.5l3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
            </svg>
        ),
    },
};

// ─── Component ────────────────────────────────────────────────────
const PhaseBadge: React.FC<PhaseBadgeProps> = ({ phase, compact = false }) => {
    const p = PHASES[phase];

    return (
        <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            style={{
                display: "inline-flex",
                alignItems: "center",
                gap: monka.spacing.xs + 2,
                padding: compact
                    ? `${monka.spacing.xs}px ${monka.spacing.sm + 2}px`
                    : `${monka.spacing.xs + 2}px ${monka.spacing.md}px`,
                borderRadius: monka.radius.pill,
                background: `linear-gradient(135deg, ${p.color}18, ${p.color}08)`,
                border: `1px solid ${p.color}30`,
                color: p.color,
                fontFamily: monka.font.family,
            }}
        >
            {p.icon}

            <span
                style={{
                    fontSize: compact ? monka.font.size.caption : monka.font.size.footnote,
                    fontWeight: monka.font.weight.semibold,
                    lineHeight: 1,
                }}
            >
                {p.label}
            </span>

            {!compact && (
                <>
                    <span
                        style={{
                            width: 1,
                            height: 12,
                            background: `${p.color}30`,
                        }}
                    />
                    {/* Phase dots */}
                    <div style={{ display: "flex", gap: 3 }}>
                        {[1, 2, 3].map((i) => (
                            <div
                                key={i}
                                style={{
                                    width: 6,
                                    height: 6,
                                    borderRadius: 3,
                                    background: i <= phase ? p.color : `${p.color}25`,
                                    transition: "background 300ms",
                                }}
                            />
                        ))}
                    </div>
                </>
            )}
        </motion.div>
    );
};

export default PhaseBadge;
