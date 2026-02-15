"use client";

import React from "react";
import { motion } from "framer-motion";
import { monka } from "../monka-design-tokens";
import ProgressRing from "../atoms/ProgressRing";
import StreakBadge from "../atoms/StreakBadge";

// ─── Types ────────────────────────────────────────────────────────
export interface WeeklyRecapCardProps {
    /** Number of actions completed this week */
    actionsCompleted: number;
    /** Total actions for the week */
    actionsTotal: number;
    /** Number of RDV taken */
    rdvCount: number;
    /** Number of articles read */
    articlesRead: number;
    /** Streak count */
    streak: number;
    /** Custom message */
    message?: string;
    /** Name of the aidé */
    forWho?: string;
}

// ─── Stat Item ────────────────────────────────────────────────────
const StatItem: React.FC<{
    value: number;
    label: string;
    color: string;
    delay: number;
}> = ({ value, label, color, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.3 }}
        style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            flex: 1,
        }}
    >
        <span
            style={{
                fontSize: monka.font.size.title2,
                fontWeight: monka.font.weight.heavy,
                color,
                lineHeight: 1,
            }}
        >
            {value}
        </span>
        <span
            style={{
                fontSize: monka.font.size.caption,
                color: monka.colors.textMuted,
                fontWeight: monka.font.weight.medium,
                textAlign: "center",
                lineHeight: 1.2,
            }}
        >
            {label}
        </span>
    </motion.div>
);

// ─── Component ────────────────────────────────────────────────────
const WeeklyRecapCard: React.FC<WeeklyRecapCardProps> = ({
    actionsCompleted,
    actionsTotal,
    rdvCount,
    articlesRead,
    streak,
    message,
    forWho,
}) => {
    const progress = actionsTotal > 0 ? Math.round((actionsCompleted / actionsTotal) * 100) : 0;

    const defaultMsg =
        actionsCompleted === 0
            ? `Une nouvelle semaine commence${forWho ? ` pour ${forWho}` : ""}.`
            : actionsCompleted < actionsTotal / 2
                ? "Bien commencé ! Continuez à ce rythme."
                : actionsCompleted < actionsTotal
                    ? "Presque tout fait, bravo !"
                    : "Semaine parfaite ! Vous gérez.";

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 250, damping: 25 }}
            style={{
                borderRadius: monka.radius.card,
                background: monka.colors.bgCard,
                boxShadow: monka.shadow.elevated,
                overflow: "hidden",
                fontFamily: monka.font.family,
            }}
        >
            {/* Header gradient */}
            <div
                style={{
                    background: `linear-gradient(135deg, ${monka.colors.ctaPrimary}12, ${monka.colors.themeBienEtre}08)`,
                    padding: `${monka.spacing.lg}px ${monka.spacing.lg}px ${monka.spacing.md}px`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
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
                        Récap de la semaine
                    </span>
                    <span
                        style={{
                            fontSize: monka.font.size.body,
                            color: monka.colors.textBody,
                            display: "block",
                            marginTop: 4,
                            lineHeight: 1.4,
                        }}
                    >
                        {message || defaultMsg}
                    </span>
                </div>
                <StreakBadge count={streak} isActive={streak > 0} />
            </div>

            {/* Stats row */}
            <div
                style={{
                    padding: `${monka.spacing.lg}px`,
                    display: "flex",
                    alignItems: "center",
                    gap: monka.spacing.lg,
                }}
            >
                <ProgressRing
                    value={progress}
                    size={64}
                    strokeWidth={5}
                    color={monka.colors.ctaPrimary}
                    label={`${actionsCompleted}/${actionsTotal}`}
                    delay={0.2}
                />

                <div
                    style={{
                        flex: 1,
                        display: "flex",
                        gap: monka.spacing.sm,
                    }}
                >
                    <StatItem value={actionsCompleted} label="Actions" color={monka.colors.themeSante} delay={0.3} />
                    <div style={{ width: 1, background: monka.colors.separator, alignSelf: "stretch", margin: "4px 0" }} />
                    <StatItem value={rdvCount} label="RDV" color={monka.colors.themeAdmin} delay={0.4} />
                    <div style={{ width: 1, background: monka.colors.separator, alignSelf: "stretch", margin: "4px 0" }} />
                    <StatItem value={articlesRead} label="Articles" color={monka.colors.themeBienEtre} delay={0.5} />
                </div>
            </div>
        </motion.div>
    );
};

export default WeeklyRecapCard;
