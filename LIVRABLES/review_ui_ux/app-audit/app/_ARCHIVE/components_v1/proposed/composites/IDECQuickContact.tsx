"use client";

import React from "react";
import { motion } from "framer-motion";
import { monka } from "../monka-design-tokens";

// ─── Types ────────────────────────────────────────────────────────
export interface IDECQuickContactProps {
    /** IDEC name */
    name: string;
    /** IDEC role/title */
    role: string;
    /** Whether IDEC is currently available */
    isOnline?: boolean;
    /** Avatar initials fallback */
    initials?: string;
    /** Click handler */
    onPress?: () => void;
}

// ─── Component ────────────────────────────────────────────────────
const IDECQuickContact: React.FC<IDECQuickContactProps> = ({
    name,
    role,
    isOnline = true,
    initials,
    onPress,
}) => {
    return (
        <motion.button
            onClick={onPress}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            style={{
                display: "flex",
                alignItems: "center",
                gap: monka.spacing.md,
                padding: `${monka.spacing.md}px ${monka.spacing.lg}px`,
                borderRadius: monka.radius.card,
                background: `linear-gradient(135deg, ${monka.colors.ctaPrimary}08, ${monka.colors.ctaPrimary}03)`,
                border: `1px solid ${monka.colors.ctaPrimary}15`,
                cursor: "pointer",
                fontFamily: monka.font.family,
                textAlign: "left",
                width: "100%",
                margin: 0,
            }}
        >
            {/* Avatar with presence dot */}
            <div style={{ position: "relative" }}>
                <div
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: monka.radius.full,
                        background: `linear-gradient(135deg, ${monka.colors.ctaPrimary}30, ${monka.colors.ctaPrimary}15)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <span
                        style={{
                            fontSize: monka.font.size.body,
                            fontWeight: monka.font.weight.bold,
                            color: monka.colors.ctaPrimary,
                        }}
                    >
                        {initials || name.charAt(0).toUpperCase()}
                    </span>
                </div>

                {/* Presence indicator */}
                <motion.div
                    animate={isOnline ? { scale: [1, 1.2, 1] } : {}}
                    transition={isOnline ? { repeat: Infinity, duration: 3, ease: "easeInOut" } : {}}
                    style={{
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        width: 12,
                        height: 12,
                        borderRadius: 6,
                        background: isOnline ? monka.colors.checkGreen : monka.colors.textMuted,
                        border: `2px solid ${monka.colors.bgCard}`,
                    }}
                />
            </div>

            {/* Name & role */}
            <div style={{ flex: 1, minWidth: 0 }}>
                <span
                    style={{
                        fontSize: monka.font.size.body,
                        fontWeight: monka.font.weight.semibold,
                        color: monka.colors.textDark,
                        display: "block",
                        lineHeight: 1.3,
                    }}
                >
                    {name}
                </span>
                <span
                    style={{
                        fontSize: monka.font.size.footnote,
                        color: isOnline ? monka.colors.checkGreen : monka.colors.textMuted,
                        fontWeight: monka.font.weight.medium,
                        display: "block",
                        marginTop: 1,
                    }}
                >
                    {isOnline ? "Disponible" : role}
                </span>
            </div>

            {/* CTA */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    padding: `${monka.spacing.xs + 2}px ${monka.spacing.md}px`,
                    borderRadius: monka.radius.pill,
                    background: monka.colors.ctaPrimary,
                }}
            >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M2 3h12v8H5l-3 3V3z" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
                <span
                    style={{
                        fontSize: monka.font.size.footnote,
                        fontWeight: monka.font.weight.semibold,
                        color: "white",
                    }}
                >
                    Écrire
                </span>
            </div>
        </motion.button>
    );
};

export default IDECQuickContact;
