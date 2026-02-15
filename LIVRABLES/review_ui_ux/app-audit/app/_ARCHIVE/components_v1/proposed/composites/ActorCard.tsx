"use client";

import React from "react";
import { motion } from "framer-motion";
import { monka } from "../monka-design-tokens";

// ─── Types ────────────────────────────────────────────────────────
export type ActorType = "medecin" | "ccas" | "caf" | "aide-domicile" | "kine" | "pharmacie" | "labo" | "mdph" | "psy" | "repit" | "other";

export interface ActorCardProps {
    /** Actor name */
    name: string;
    /** Actor specialty or type label */
    specialty: string;
    /** Actor type for icon selection */
    type: ActorType;
    /** Distance */
    distance?: string;
    /** Address */
    address?: string;
    /** Whether actor accepts new patients */
    available?: boolean;
    /** Phone number */
    phone?: string;
    /** Click handler */
    onPress?: () => void;
}

// ─── Actor Type Config ────────────────────────────────────────────
const ACTOR_CONFIG: Record<ActorType, { color: string; icon: React.ReactNode }> = {
    medecin: {
        color: monka.colors.themeSante,
        icon: (
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
        ),
    },
    ccas: {
        color: monka.colors.themeAdmin,
        icon: (
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <path d="M3 17V8l7-5 7 5v9H3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                <rect x="8" y="12" width="4" height="5" stroke="currentColor" strokeWidth="1.5" />
            </svg>
        ),
    },
    caf: {
        color: monka.colors.themeAdmin,
        icon: (
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <rect x="3" y="5" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
                <path d="M3 9h14" stroke="currentColor" strokeWidth="1.5" />
            </svg>
        ),
    },
    "aide-domicile": {
        color: monka.colors.themeBienEtre,
        icon: (
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <path d="M10 3a4 4 0 014 4c0 3-4 6-4 6s-4-3-4-6a4 4 0 014-4z" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="10" cy="7" r="1.5" fill="currentColor" />
            </svg>
        ),
    },
    kine: {
        color: monka.colors.themeSante,
        icon: (
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="6" r="3" stroke="currentColor" strokeWidth="1.5" />
                <path d="M5 17c0-2.8 2.2-5 5-5s5 2.2 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        ),
    },
    pharmacie: {
        color: monka.colors.checkGreen,
        icon: (
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" />
            </svg>
        ),
    },
    labo: {
        color: monka.colors.themeSante,
        icon: (
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <path d="M8 3v5l-4 8h12l-4-8V3" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                <line x1="7" y1="3" x2="13" y2="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        ),
    },
    mdph: {
        color: monka.colors.themeAdmin,
        icon: (
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <rect x="3" y="6" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
                <path d="M6 6V4.5a4 4 0 018 0V6" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="10" cy="11" r="2" stroke="currentColor" strokeWidth="1.5" />
            </svg>
        ),
    },
    psy: {
        color: monka.colors.themeBienEtre,
        icon: (
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <path d="M10 3a4 4 0 014 4c0 3-4 6-4 6s-4-3-4-6a4 4 0 014-4z" stroke="currentColor" strokeWidth="1.5" />
                <path d="M8 7c0-1.1.9-2 2-2s2 .9 2 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
        ),
    },
    repit: {
        color: monka.colors.themeBienEtre,
        icon: (
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <path d="M3 17V8l7-5 7 5v9H3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M7 17v-4h6v4" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="10" cy="10" r="1.5" fill="currentColor" />
            </svg>
        ),
    },
    other: {
        color: monka.colors.ctaPrimary,
        icon: (
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="10" cy="10" r="2" fill="currentColor" />
            </svg>
        ),
    },
};

// ─── Component ────────────────────────────────────────────────────
const ActorCard: React.FC<ActorCardProps> = ({
    name,
    specialty,
    type,
    distance,
    address,
    available,
    phone,
    onPress,
}) => {
    const config = ACTOR_CONFIG[type] || ACTOR_CONFIG.other;

    return (
        <motion.button
            onClick={onPress}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
                display: "flex",
                gap: monka.spacing.md,
                padding: monka.spacing.lg,
                borderRadius: monka.radius.card,
                background: monka.colors.bgCard,
                border: `1px solid ${monka.colors.separator}`,
                boxShadow: monka.shadow.subtle,
                cursor: "pointer",
                textAlign: "left",
                fontFamily: monka.font.family,
                width: "100%",
                margin: 0,
            }}
        >
            {/* Icon */}
            <div
                style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: `${config.color}12`,
                    border: `1px solid ${config.color}20`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    color: config.color,
                }}
            >
                {config.icon}
            </div>

            {/* Content */}
            <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span
                        style={{
                            fontSize: monka.font.size.body,
                            fontWeight: monka.font.weight.bold,
                            color: monka.colors.textDark,
                            lineHeight: 1.3,
                        }}
                    >
                        {name}
                    </span>
                    {available !== undefined && (
                        <span
                            style={{
                                width: 7,
                                height: 7,
                                borderRadius: 4,
                                background: available ? monka.colors.checkGreen : monka.colors.textMuted,
                                flexShrink: 0,
                            }}
                        />
                    )}
                </div>

                <span
                    style={{
                        fontSize: monka.font.size.footnote,
                        color: config.color,
                        fontWeight: monka.font.weight.medium,
                        display: "block",
                        marginTop: 2,
                    }}
                >
                    {specialty}
                </span>

                {(address || distance) && (
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                            marginTop: monka.spacing.xs,
                        }}
                    >
                        <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                            <path d="M8 2a4.5 4.5 0 014.5 4.5C12.5 9.5 8 14 8 14S3.5 9.5 3.5 6.5A4.5 4.5 0 018 2z" stroke={monka.colors.textMuted} strokeWidth="1.2" />
                            <circle cx="8" cy="6.5" r="1.5" fill={monka.colors.textMuted} />
                        </svg>
                        <span style={{ fontSize: monka.font.size.caption, color: monka.colors.textMuted }}>
                            {distance && <span style={{ fontWeight: monka.font.weight.semibold }}>{distance}</span>}
                            {distance && address && " · "}
                            {address}
                        </span>
                    </div>
                )}
            </div>

            {/* Actions */}
            <div style={{ display: "flex", flexDirection: "column", gap: 6, flexShrink: 0, alignItems: "flex-end" }}>
                {phone && (
                    <div
                        style={{
                            width: 32,
                            height: 32,
                            borderRadius: monka.radius.full,
                            background: `${monka.colors.checkGreen}12`,
                            border: `1px solid ${monka.colors.checkGreen}20`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                            <path d="M6 2.5C6 2.5 7 4.5 7 5.5S5.5 7 5.5 7s1 2.5 3.5 3.5c0 0 1-1 2-1s3 1 3 1v-2.5c0-.5-1-2-3-2" stroke={monka.colors.checkGreen} strokeWidth="1.2" strokeLinecap="round" />
                        </svg>
                    </div>
                )}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginTop: "auto" }}>
                    <path d="M6 4l4 4-4 4" stroke={monka.colors.textMuted} strokeWidth="1.5" strokeLinecap="round" />
                </svg>
            </div>
        </motion.button>
    );
};

export default ActorCard;
