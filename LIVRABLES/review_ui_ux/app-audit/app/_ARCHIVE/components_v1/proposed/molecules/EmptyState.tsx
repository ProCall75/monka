"use client";

import React from "react";
import { motion } from "framer-motion";
import { monka } from "./monka-design-tokens";

// ═══════════════════════════════════════
// EmptyState — Resolves N04 (empty history)
// Positive empty states with spring animations
// ═══════════════════════════════════════

export interface EmptyStateProps {
    /** Title — encouraging, not blaming */
    title: string;
    /** Explanation — what happened and what to do next */
    description: string;
    /** Optional CTA */
    action?: { label: string; onClick?: () => void };
    /** Optional illustration (icon or svg) */
    icon?: React.ReactNode;
    /** Compact mode — smaller padding, for inline use */
    compact?: boolean;
}

export default function EmptyState({ title, description, action, icon, compact = false }: EmptyStateProps) {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: compact ? "24px 16px" : "48px 32px",
                textAlign: "center",
                fontFamily: monka.font.family,
            }}
        >
            {/* Icon with spring bounce */}
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0 }}
            >
                {icon ? (
                    <div style={{ marginBottom: 16 }}>{icon}</div>
                ) : (
                    <div
                        style={{
                            width: compact ? 48 : 64,
                            height: compact ? 48 : 64,
                            borderRadius: compact ? 12 : 16,
                            background: monka.colors.bgOptionsZone,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginBottom: 16,
                        }}
                    >
                        <svg width={compact ? 24 : 28} height={compact ? 24 : 28} viewBox="0 0 24 24" fill="none">
                            <path d="M20 7H4a1 1 0 00-1 1v10a1 1 0 001 1h16a1 1 0 001-1V8a1 1 0 00-1-1z" stroke={monka.colors.ctaPrimary} strokeWidth="1.5" />
                            <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" stroke={monka.colors.ctaPrimary} strokeWidth="1.5" />
                            <path d="M12 12v4M10 14h4" stroke={monka.colors.ctaPrimary} strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                    </div>
                )}
            </motion.div>

            {/* Title — fade in with delay */}
            <motion.h4
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                style={{
                    fontSize: compact ? monka.font.size.body : monka.font.size.title3,
                    fontWeight: monka.font.weight.semibold,
                    color: monka.colors.textDark,
                    margin: "0 0 6px",
                }}
            >
                {title}
            </motion.h4>

            {/* Description */}
            <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.35 }}
                style={{
                    fontSize: monka.font.size.body,
                    fontWeight: monka.font.weight.regular,
                    color: monka.colors.textMuted,
                    margin: 0,
                    maxWidth: 280,
                    lineHeight: 1.5,
                }}
            >
                {description}
            </motion.p>

            {/* CTA — appears last */}
            {action && (
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={action.onClick}
                    style={{
                        marginTop: 16,
                        background: monka.colors.ctaPrimary,
                        color: monka.colors.textWhite,
                        border: "none",
                        borderRadius: monka.radius.button,
                        padding: "10px 20px",
                        fontSize: monka.font.size.body,
                        fontWeight: monka.font.weight.semibold,
                        cursor: "pointer",
                        fontFamily: monka.font.family,
                    }}
                >
                    {action.label}
                </motion.button>
            )}
        </div>
    );
}

