"use client";

import React from "react";
import { motion } from "framer-motion";
import { monka } from "../monka-design-tokens";

// ─── Types ────────────────────────────────────────────────────────
export type ActionPriority = "urgent" | "recommended" | "optional";

export interface OTodayFocusProps {
    /** Single priority action title */
    title: string;
    /** Brief explanation */
    description: string;
    /** Why this action matters */
    whyItMatters?: string;
    /** Theme this belongs to */
    theme: string;
    /** Theme color */
    themeColor: string;
    /** For whom */
    forWho?: string;
    /** Priority level */
    priority: ActionPriority;
    /** Icon */
    icon: React.ReactNode;
    /** CTA label */
    ctaLabel?: string;
    /** CTA handler */
    onCta?: () => void;
    /** Skip handler */
    onSkip?: () => void;
}

// ─── Priority Config ──────────────────────────────────────────────
const PRIORITY_LABELS: Record<ActionPriority, { label: string; emoji: string }> = {
    urgent: { label: "Prioritaire", emoji: "!" },
    recommended: { label: "Recommandé", emoji: "→" },
    optional: { label: "Quand vous pouvez", emoji: "~" },
};

// ─── Component ────────────────────────────────────────────────────
const OTodayFocus: React.FC<OTodayFocusProps> = ({
    title,
    description,
    whyItMatters,
    theme,
    themeColor,
    forWho,
    priority,
    icon,
    ctaLabel = "Commencer",
    onCta,
    onSkip,
}) => {
    const prio = PRIORITY_LABELS[priority];

    return (
        <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            style={{
                borderRadius: monka.radius.card,
                overflow: "hidden",
                fontFamily: monka.font.family,
                boxShadow: monka.shadow.elevated,
            }}
        >
            {/* Gradient header */}
            <div
                style={{
                    background: `linear-gradient(135deg, ${themeColor}18, ${themeColor}06)`,
                    padding: `${monka.spacing.lg}px ${monka.spacing.xl}px`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderBottom: `1px solid ${themeColor}15`,
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: monka.spacing.sm }}>
                    <span
                        style={{
                            fontSize: monka.font.size.caption,
                            fontWeight: monka.font.weight.bold,
                            color: themeColor,
                            textTransform: "uppercase" as const,
                            letterSpacing: 0.8,
                        }}
                    >
                        Focus du jour
                    </span>
                    <span
                        style={{
                            fontSize: 10,
                            fontWeight: monka.font.weight.semibold,
                            color: priority === "urgent" ? "#DC2626" : themeColor,
                            background: priority === "urgent" ? "#DC262610" : `${themeColor}12`,
                            padding: "2px 8px",
                            borderRadius: monka.radius.pill,
                            border: `1px solid ${priority === "urgent" ? "#DC262620" : `${themeColor}20`}`,
                        }}
                    >
                        {prio.label}
                    </span>
                </div>
                <span
                    style={{
                        fontSize: monka.font.size.caption,
                        color: themeColor,
                        fontWeight: monka.font.weight.medium,
                    }}
                >
                    {theme}
                </span>
            </div>

            {/* Body */}
            <div
                style={{
                    background: monka.colors.bgCard,
                    padding: `${monka.spacing.xl}px`,
                }}
            >
                {/* Icon + Title */}
                <div style={{ display: "flex", gap: monka.spacing.md, alignItems: "flex-start" }}>
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.2 }}
                        style={{
                            width: 48,
                            height: 48,
                            borderRadius: 14,
                            background: `linear-gradient(135deg, ${themeColor}15, ${themeColor}05)`,
                            border: `1px solid ${themeColor}20`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                            color: themeColor,
                        }}
                    >
                        {icon}
                    </motion.div>

                    <div style={{ flex: 1 }}>
                        <h3
                            style={{
                                fontSize: monka.font.size.title3,
                                fontWeight: monka.font.weight.bold,
                                color: monka.colors.textDark,
                                lineHeight: 1.3,
                                margin: 0,
                            }}
                        >
                            {title}
                        </h3>
                        {forWho && (
                            <span
                                style={{
                                    fontSize: monka.font.size.footnote,
                                    color: themeColor,
                                    fontWeight: monka.font.weight.medium,
                                    display: "block",
                                    marginTop: 2,
                                }}
                            >
                                Pour {forWho}
                            </span>
                        )}
                    </div>
                </div>

                {/* Description */}
                <p
                    style={{
                        fontSize: monka.font.size.body,
                        color: monka.colors.textBody,
                        lineHeight: 1.5,
                        margin: `${monka.spacing.md}px 0 0`,
                    }}
                >
                    {description}
                </p>

                {/* WhyCard */}
                {whyItMatters && (
                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        style={{
                            marginTop: monka.spacing.md,
                            padding: monka.spacing.md,
                            borderRadius: monka.radius.option,
                            background: `${themeColor}06`,
                            border: `1px solid ${themeColor}12`,
                            borderLeft: `3px solid ${themeColor}`,
                        }}
                    >
                        <span
                            style={{
                                fontSize: monka.font.size.caption,
                                fontWeight: monka.font.weight.bold,
                                color: themeColor,
                                textTransform: "uppercase" as const,
                                letterSpacing: 0.5,
                                display: "block",
                                marginBottom: 4,
                            }}
                        >
                            Pourquoi c'est important
                        </span>
                        <span
                            style={{
                                fontSize: monka.font.size.footnote,
                                color: monka.colors.textBody,
                                lineHeight: 1.5,
                            }}
                        >
                            {whyItMatters}
                        </span>
                    </motion.div>
                )}

                {/* Actions */}
                <div
                    style={{
                        display: "flex",
                        gap: monka.spacing.sm,
                        marginTop: monka.spacing.xl,
                    }}
                >
                    <motion.button
                        whileTap={{ scale: 0.97 }}
                        onClick={onCta}
                        style={{
                            flex: 1,
                            padding: `${monka.spacing.md}px`,
                            borderRadius: monka.radius.button,
                            background: themeColor,
                            border: "none",
                            color: "white",
                            fontSize: monka.font.size.body,
                            fontWeight: monka.font.weight.bold,
                            fontFamily: monka.font.family,
                            cursor: "pointer",
                        }}
                    >
                        {ctaLabel}
                    </motion.button>

                    <motion.button
                        whileTap={{ scale: 0.97 }}
                        onClick={onSkip}
                        style={{
                            padding: `${monka.spacing.md}px ${monka.spacing.lg}px`,
                            borderRadius: monka.radius.button,
                            background: "transparent",
                            border: `1px solid ${monka.colors.separator}`,
                            color: monka.colors.textMuted,
                            fontSize: monka.font.size.footnote,
                            fontWeight: monka.font.weight.medium,
                            fontFamily: monka.font.family,
                            cursor: "pointer",
                        }}
                    >
                        Plus tard
                    </motion.button>
                </div>
            </div>
        </motion.section>
    );
};

export default OTodayFocus;
