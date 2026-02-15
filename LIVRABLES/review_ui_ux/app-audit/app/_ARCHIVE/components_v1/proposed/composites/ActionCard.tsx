"use client";

import React from "react";
import { motion } from "framer-motion";
import { monka } from "../monka-design-tokens";
import { getActionIcon, IconArrowRight } from "../foundation/MonkaIcons";

// ─── Types ────────────────────────────────────────────────────────
export type ActionType = "INFO" | "ORGA" | "STRUC" | "SEC" | "MED";

export interface ActionCardProps {
    /** The micro-task type determines colors, icon, CTA style */
    type: ActionType;
    /** Main action title */
    title: string;
    /** Who this action is for */
    forWho?: string;
    /** Optional deadline text ("Cette semaine", "Ce mois-ci") */
    deadline?: string;
    /** CTA button text */
    ctaLabel?: string;
    /** CTA callback */
    onCtaPress?: () => void;
    /** Swipe-to-complete callback */
    onComplete?: () => void;
    /** Optional description for INFO type */
    description?: string;
    /** Animation stagger index (for feed ordering) */
    index?: number;
}

// ─── Variant Config ───────────────────────────────────────────────
const VARIANTS: Record<
    ActionType,
    {
        iconBg: string;
        accentColor: string;
        cardBg: string;
        borderColor: string;
        ctaStyle: "filled" | "outline" | "link";
        defaultCta: string;
    }
> = {
    INFO: {
        iconBg: "#FEF3C7",
        accentColor: "#F59E0B",
        cardBg: "#FFFBEB",
        borderColor: "#FDE68A",
        ctaStyle: "link",
        defaultCta: "En savoir plus",
    },
    ORGA: {
        iconBg: "#DBEAFE",
        accentColor: monka.colors.ctaPrimary,
        cardBg: monka.colors.bgCard,
        borderColor: monka.colors.separator,
        ctaStyle: "outline",
        defaultCta: "Planifier",
    },
    STRUC: {
        iconBg: "#E0F4F4",
        accentColor: monka.colors.ctaPrimary,
        cardBg: monka.colors.bgCard,
        borderColor: `${monka.colors.ctaPrimary}30`,
        ctaStyle: "filled",
        defaultCta: "Je commence",
    },
    SEC: {
        iconBg: "#FEE2E2",
        accentColor: "#DC2626",
        cardBg: "#FEF2F2",
        borderColor: "#FECACA",
        ctaStyle: "filled",
        defaultCta: "Agir maintenant",
    },
    MED: {
        iconBg: "#EDE9FE",
        accentColor: "#8B5CF6",
        cardBg: "#F5F3FF",
        borderColor: "#DDD6FE",
        ctaStyle: "outline",
        defaultCta: "Prendre RDV",
    },
};

// ─── Animations ───────────────────────────────────────────────────
const cardVariants = {
    hidden: { opacity: 0, y: 12, scale: 0.98 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            delay: i * 0.05,
            duration: 0.35,
            ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
        },
    }),
    exit: {
        opacity: 0,
        x: -100,
        scale: 0.95,
        transition: { duration: 0.3, ease: "easeInOut" as const },
    },
};

// ─── Component ────────────────────────────────────────────────────
const ActionCard: React.FC<ActionCardProps> = ({
    type,
    title,
    forWho,
    deadline,
    ctaLabel,
    onCtaPress,
    description,
    index = 0,
}) => {
    const v = VARIANTS[type];
    const cta = ctaLabel || v.defaultCta;

    // ─── CTA Style Resolver ─────────────────────────────────────
    const ctaStyles: React.CSSProperties = (() => {
        switch (v.ctaStyle) {
            case "filled":
                return {
                    background: v.accentColor,
                    color: "#FFFFFF",
                    border: "none",
                    padding: "6px 12px",
                    borderRadius: monka.radius.button,
                    fontWeight: monka.font.weight.semibold,
                    fontSize: monka.font.size.footnote,
                    cursor: "pointer",
                    fontFamily: monka.font.family,
                };
            case "outline":
                return {
                    background: "transparent",
                    color: v.accentColor,
                    border: `1.5px solid ${v.accentColor}`,
                    padding: "6px 12px",
                    borderRadius: monka.radius.button,
                    fontWeight: monka.font.weight.semibold,
                    fontSize: monka.font.size.footnote,
                    cursor: "pointer",
                    fontFamily: monka.font.family,
                };
            case "link":
                return {
                    background: "transparent",
                    color: v.accentColor,
                    border: "none",
                    padding: 0,
                    fontWeight: monka.font.weight.medium,
                    fontSize: monka.font.size.footnote,
                    cursor: "pointer",
                    fontFamily: monka.font.family,
                };
        }
    })();

    return (
        <motion.div
            custom={index}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            whileTap={{ scale: 0.98 }}
            layout
            style={{
                background: v.cardBg,
                borderRadius: monka.radius.card,
                border: `1px solid ${v.borderColor}`,
                borderLeft: `3px solid ${v.accentColor}`,
                boxShadow: monka.shadow.subtle,
                padding: monka.spacing.lg,
                fontFamily: monka.font.family,
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Hover halo — Aceternity-inspired spotlight */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `radial-gradient(150px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${v.accentColor}08, transparent 60%)`,
                    pointerEvents: "none",
                    borderRadius: monka.radius.card,
                }}
            />

            {/* Header: Icon + Title */}
            <div
                style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: monka.spacing.md,
                    marginBottom: monka.spacing.sm,
                }}
            >
                {/* Icon badge */}
                <div
                    style={{
                        width: 28,
                        height: 28,
                        borderRadius: 8,
                        background: v.iconBg,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                    }}
                >
                    {getActionIcon(type, 14, v.accentColor)}
                </div>

                {/* Title + optional deadline */}
                <div style={{ flex: 1, minWidth: 0 }}>
                    <p
                        style={{
                            margin: 0,
                            fontSize: monka.font.size.body,
                            fontWeight: monka.font.weight.semibold,
                            color: monka.colors.textDark,
                            lineHeight: 1.35,
                        }}
                    >
                        {title}
                    </p>
                    {deadline && (
                        <p
                            style={{
                                margin: "4px 0 0",
                                fontSize: monka.font.size.footnote,
                                color: type === "SEC" ? v.accentColor : monka.colors.textMuted,
                                fontWeight:
                                    type === "SEC"
                                        ? monka.font.weight.semibold
                                        : monka.font.weight.regular,
                            }}
                        >
                            {deadline}
                        </p>
                    )}
                </div>

                {/* SEC pulse dot */}
                {type === "SEC" && (
                    <motion.div
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                        style={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            background: v.accentColor,
                            marginTop: 6,
                            flexShrink: 0,
                        }}
                    />
                )}
            </div>

            {/* Description (INFO only) */}
            {description && type === "INFO" && (
                <p
                    style={{
                        margin: `0 0 ${monka.spacing.sm}px`,
                        paddingLeft: 36,
                        fontSize: monka.font.size.footnote,
                        color: monka.colors.textBody,
                        lineHeight: 1.45,
                    }}
                >
                    {description}
                </p>
            )}

            {/* Footer: forWho + CTA */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: monka.spacing.sm,
                    paddingLeft: 36,
                }}
            >
                {forWho && (
                    <span
                        style={{
                            fontSize: monka.font.size.footnote,
                            color: monka.colors.textMuted,
                            fontWeight: monka.font.weight.regular,
                        }}
                    >
                        Pour {forWho}
                    </span>
                )}

                <button onClick={onCtaPress} style={{ ...ctaStyles, display: "flex", alignItems: "center", gap: 4 }}>
                    {cta} {v.ctaStyle === "link" && <IconArrowRight size={12} color={v.accentColor} />}
                </button>
            </div>
        </motion.div>
    );
};

export default ActionCard;
