"use client";

import React from "react";
import { motion } from "framer-motion";
import { monka } from "../monka-design-tokens";
import ProgressRing from "../atoms/ProgressRing";
import StreakBadge from "../atoms/StreakBadge";
import PhaseBadge, { PhaseLevel } from "../atoms/PhaseBadge";

// ─── Types ────────────────────────────────────────────────────────
export interface DomainProgress {
    label: string;
    value: number;
    color: string;
}

export interface OWeeklySnapshotProps {
    /** 3 domain progress values */
    domains: [DomainProgress, DomainProgress, DomainProgress];
    /** Active streak count */
    streak: number;
    /** Current phase level */
    phase: PhaseLevel;
    /** Name of the aidé */
    forWho?: string;
}

// ─── Component ────────────────────────────────────────────────────
const OWeeklySnapshot: React.FC<OWeeklySnapshotProps> = ({
    domains,
    streak,
    phase,
    forWho,
}) => {
    return (
        <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={{
                borderRadius: monka.radius.card,
                background: monka.colors.bgCard,
                boxShadow: monka.shadow.elevated,
                padding: `${monka.spacing.xl}px`,
                fontFamily: monka.font.family,
            }}
        >
            {/* Header */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: monka.spacing.xl,
                }}
            >
                <div>
                    <span
                        style={{
                            fontSize: monka.font.size.caption,
                            fontWeight: monka.font.weight.semibold,
                            color: monka.colors.ctaPrimary,
                            textTransform: "uppercase" as const,
                            letterSpacing: 0.8,
                        }}
                    >
                        Votre progression
                    </span>
                    {forWho && (
                        <span
                            style={{
                                fontSize: monka.font.size.footnote,
                                color: monka.colors.textMuted,
                                display: "block",
                                marginTop: 2,
                            }}
                        >
                            Accompagnement de {forWho}
                        </span>
                    )}
                </div>
                <PhaseBadge phase={phase} compact />
            </div>

            {/* 3 Rings */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "flex-end",
                    marginBottom: monka.spacing.xl,
                }}
            >
                {domains.map((d, i) => (
                    <ProgressRing
                        key={d.label}
                        value={d.value}
                        size={72}
                        strokeWidth={5}
                        color={d.color}
                        label={`${Math.round(d.value)}%`}
                        subLabel={d.label}
                        delay={i * 0.15}
                    />
                ))}
            </div>

            {/* Divider */}
            <div
                style={{
                    height: monka.hairline,
                    background: monka.colors.separator,
                    margin: `0 -${monka.spacing.xl}px`,
                }}
            />

            {/* Bottom row */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingTop: monka.spacing.md,
                }}
            >
                <StreakBadge count={streak} isActive={streak > 0} />

                <span
                    style={{
                        fontSize: monka.font.size.caption,
                        color: monka.colors.textMuted,
                        fontWeight: monka.font.weight.medium,
                    }}
                >
                    {Math.round(domains.reduce((s, d) => s + d.value, 0) / domains.length)}% global
                </span>
            </div>
        </motion.section>
    );
};

export default OWeeklySnapshot;
