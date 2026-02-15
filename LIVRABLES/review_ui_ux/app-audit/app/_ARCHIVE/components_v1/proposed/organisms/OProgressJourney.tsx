"use client";

import React from "react";
import { motion } from "framer-motion";
import { monka } from "../monka-design-tokens";

// ─── Types ────────────────────────────────────────────────────────
export type MilestoneStatus = "done" | "current" | "locked";

export interface MilestoneItem {
    title: string;
    description?: string;
    status: MilestoneStatus;
    date?: string;
}

export interface OProgressJourneyProps {
    /** Theme name */
    theme: string;
    /** Theme color */
    themeColor: string;
    /** Milestones in order */
    milestones: MilestoneItem[];
}

// ─── Status Config ─────────────────────────────────────────────────
const getStatusStyle = (status: MilestoneStatus, color: string) => {
    switch (status) {
        case "done":
            return {
                dotColor: monka.colors.checkGreen,
                dotBg: monka.colors.checkGreenBg,
                textColor: monka.colors.textBody,
                lineColor: monka.colors.checkGreen,
            };
        case "current":
            return {
                dotColor: color,
                dotBg: `${color}15`,
                textColor: monka.colors.textDark,
                lineColor: monka.colors.separator,
            };
        case "locked":
            return {
                dotColor: monka.colors.textMuted,
                dotBg: `${monka.colors.separator}60`,
                textColor: monka.colors.textMuted,
                lineColor: monka.colors.separator,
            };
    }
};

// ─── Component ────────────────────────────────────────────────────
const OProgressJourney: React.FC<OProgressJourneyProps> = ({
    theme,
    themeColor,
    milestones,
}) => {
    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            style={{
                borderRadius: monka.radius.card,
                background: monka.colors.bgCard,
                boxShadow: monka.shadow.card,
                padding: monka.spacing.xl,
                fontFamily: monka.font.family,
            }}
        >
            {/* Header */}
            <div style={{ marginBottom: monka.spacing.lg }}>
                <span
                    style={{
                        fontSize: monka.font.size.caption,
                        fontWeight: monka.font.weight.semibold,
                        color: themeColor,
                        textTransform: "uppercase" as const,
                        letterSpacing: 0.8,
                    }}
                >
                    {theme}
                </span>
                <h3
                    style={{
                        fontSize: monka.font.size.subhead,
                        fontWeight: monka.font.weight.bold,
                        color: monka.colors.textDark,
                        margin: `4px 0 0`,
                    }}
                >
                    Votre parcours
                </h3>
            </div>

            {/* Timeline */}
            <div style={{ position: "relative" }}>
                {milestones.map((m, i) => {
                    const style = getStatusStyle(m.status, themeColor);
                    const isLast = i === milestones.length - 1;

                    return (
                        <motion.div
                            key={m.title}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1, duration: 0.3 }}
                            style={{
                                display: "flex",
                                gap: monka.spacing.md,
                                position: "relative",
                                paddingBottom: isLast ? 0 : monka.spacing.xl,
                            }}
                        >
                            {/* Dot + Line */}
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    flexShrink: 0,
                                    width: 24,
                                }}
                            >
                                {/* Dot */}
                                <motion.div
                                    animate={m.status === "current" ? { scale: [1, 1.2, 1] } : {}}
                                    transition={m.status === "current" ? { repeat: Infinity, duration: 2 } : {}}
                                    style={{
                                        width: m.status === "current" ? 20 : 16,
                                        height: m.status === "current" ? 20 : 16,
                                        borderRadius: monka.radius.full,
                                        background: style.dotBg,
                                        border: `2px solid ${style.dotColor}`,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        zIndex: 1,
                                    }}
                                >
                                    {m.status === "done" && (
                                        <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
                                            <path d="M4 8l3 3 5-6" stroke={monka.colors.checkGreen} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    )}
                                    {m.status === "current" && (
                                        <div style={{ width: 6, height: 6, borderRadius: 3, background: themeColor }} />
                                    )}
                                </motion.div>

                                {/* Line */}
                                {!isLast && (
                                    <div
                                        style={{
                                            width: 2,
                                            flex: 1,
                                            background: style.lineColor,
                                            marginTop: 4,
                                            borderRadius: 1,
                                            opacity: 0.5,
                                        }}
                                    />
                                )}
                            </div>

                            {/* Content */}
                            <div style={{ flex: 1, paddingTop: m.status === "current" ? 0 : 0 }}>
                                <span
                                    style={{
                                        fontSize: monka.font.size.body,
                                        fontWeight: m.status === "current" ? monka.font.weight.bold : monka.font.weight.semibold,
                                        color: style.textColor,
                                        lineHeight: 1.3,
                                        display: "block",
                                        textDecoration: m.status === "done" ? "none" : "none",
                                    }}
                                >
                                    {m.title}
                                </span>

                                {m.description && (
                                    <span
                                        style={{
                                            fontSize: monka.font.size.footnote,
                                            color: monka.colors.textMuted,
                                            lineHeight: 1.4,
                                            display: "block",
                                            marginTop: 2,
                                        }}
                                    >
                                        {m.description}
                                    </span>
                                )}

                                {m.date && m.status === "done" && (
                                    <span
                                        style={{
                                            fontSize: monka.font.size.caption,
                                            color: monka.colors.checkGreen,
                                            fontWeight: monka.font.weight.medium,
                                            display: "block",
                                            marginTop: 4,
                                        }}
                                    >
                                        {m.date}
                                    </span>
                                )}
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </motion.section>
    );
};

export default OProgressJourney;
