"use client";

import React from "react";
import { monka } from "./monka-design-tokens";

// ═══════════════════════════════════════
// PriorityBadge — Resolves C12, Priorisation invisible
// Makes the 3-level priority system (Critique/CCC/Standard) VISIBLE
// ═══════════════════════════════════════

export type PriorityLevel = "critical" | "ccc" | "standard";

export interface PriorityBadgeProps {
    level: PriorityLevel;
    /** Optional: show deadline text */
    showDeadline?: boolean;
    /** Compact mode: just the dot + label */
    compact?: boolean;
}

const PRIORITY_CONFIG: Record<PriorityLevel, { color: string; bg: string; label: string; deadline: string; icon: string }> = {
    critical: {
        color: "#DC2626",
        bg: "#FEE2E2",
        label: "Urgent",
        deadline: "Sous 7 jours",
        icon: "🔴",
    },
    ccc: {
        color: "#D97706",
        bg: "#FEF3C7",
        label: "Ce mois-ci",
        deadline: "Sous 30 jours",
        icon: "🟠",
    },
    standard: {
        color: monka.colors.ctaPrimary,
        bg: "#E0F4F4",
        label: "À planifier",
        deadline: "Sous 90 jours",
        icon: "🟢",
    },
};

export default function PriorityBadge({ level, showDeadline = false, compact = false }: PriorityBadgeProps) {
    const config = PRIORITY_CONFIG[level];

    if (compact) {
        return (
            <span
                style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                    fontSize: monka.font.size.caption,
                    fontWeight: monka.font.weight.semibold,
                    color: config.color,
                }}
            >
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: config.color, flexShrink: 0 }} />
                {config.label}
            </span>
        );
    }

    return (
        <span
            style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "4px 10px",
                borderRadius: monka.radius.pill,
                background: config.bg,
                fontSize: monka.font.size.footnote,
                fontWeight: monka.font.weight.semibold,
                color: config.color,
                lineHeight: 1,
            }}
        >
            <span style={{ fontSize: 8 }}>{config.icon}</span>
            {config.label}
            {showDeadline && (
                <span style={{ fontWeight: monka.font.weight.regular, opacity: 0.8 }}>
                    · {config.deadline}
                </span>
            )}
        </span>
    );
}
