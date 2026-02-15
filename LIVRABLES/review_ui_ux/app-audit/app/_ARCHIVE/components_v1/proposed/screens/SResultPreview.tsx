"use client";

import React from "react";
import { motion } from "framer-motion";
import { monka } from "../monka-design-tokens";
import { IconSparkle, IconStar } from "../foundation/MonkaIcons";

// ─── Types ────────────────────────────────────────────────────────
export interface ResultItem {
    icon: React.ReactNode;
    label: string;
}

export interface SResultPreviewProps {
    userName: string;
    forWho: string;
    /** Themes that were activated */
    activatedThemes: ResultItem[];
    /** First free action */
    freeAction: { title: string; description: string };
    /** Number of hidden actions behind paywall */
    hiddenCount: number;
    /** Hidden features teased in blur */
    hiddenFeatures: string[];
    /** CTA callback */
    onSubscribe?: () => void;
    /** Free action callback */
    onFreeAction?: () => void;
}

// ─── Component ────────────────────────────────────────────────────
const SResultPreview: React.FC<SResultPreviewProps> = ({
    userName, forWho,
    activatedThemes, freeAction, hiddenCount, hiddenFeatures,
    onSubscribe, onFreeAction,
}) => {
    return (
        <div style={{
            background: monka.colors.bgPrimary, minHeight: "100vh",
            fontFamily: monka.font.family,
            padding: `${monka.safeArea.top + 20}px ${monka.spacing.lg}px ${monka.safeArea.bottom + 20}px`,
            display: "flex", flexDirection: "column", gap: monka.spacing.xl,
        }}>
            {/* ── Header ─────────────────────────────────── */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                <h1 style={{
                    margin: 0, fontSize: monka.font.size.title2,
                    fontWeight: monka.font.weight.bold, color: monka.colors.textDark,
                }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 6 }}><IconSparkle size={20} color={monka.colors.ctaPrimary} /> Votre situation, {userName}</span>
                </h1>
                <p style={{ margin: "8px 0 0", fontSize: monka.font.size.body, color: monka.colors.textMuted, lineHeight: 1.5 }}>
                    Pour {forWho}, nous avons identifié :
                </p>
            </motion.div>

            {/* ── Visible: Activated themes ──────────────── */}
            <motion.div
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.4 }}
                style={{
                    background: monka.colors.bgCard, borderRadius: monka.radius.card,
                    padding: monka.spacing.lg, boxShadow: monka.shadow.card,
                }}
            >
                <p style={{
                    margin: "0 0 12px", fontSize: monka.font.size.body,
                    fontWeight: monka.font.weight.semibold, color: monka.colors.textDark,
                }}>
                    {activatedThemes.length} thèmes activés pour {forWho}
                </p>
                <div style={{ display: "flex", gap: monka.spacing.sm, flexWrap: "wrap" }}>
                    {activatedThemes.map((t, i) => (
                        <span key={i} style={{
                            background: `${monka.colors.ctaPrimary}12`, color: monka.colors.ctaPrimary,
                            borderRadius: monka.radius.pill, padding: "6px 12px",
                            fontSize: monka.font.size.footnote, fontWeight: monka.font.weight.medium,
                        }}>
                            <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                                {t.icon} {t.label}
                            </span>
                        </span>
                    ))}
                </div>
            </motion.div>

            {/* ── Visible: First free action ─────────────── */}
            <motion.div
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                style={{
                    background: monka.colors.bgCard, borderRadius: monka.radius.card,
                    padding: monka.spacing.lg, boxShadow: monka.shadow.card,
                    borderLeft: `3px solid ${monka.colors.ctaPrimary}`,
                }}
            >
                <p style={{
                    margin: "0 0 6px", fontSize: monka.font.size.footnote,
                    fontWeight: monka.font.weight.semibold, color: monka.colors.ctaPrimary,
                }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 4 }}><IconStar size={14} color={monka.colors.ctaPrimary} /> 1ère action recommandée :</span>
                </p>
                <p style={{
                    margin: 0, fontSize: monka.font.size.body,
                    fontWeight: monka.font.weight.semibold, color: monka.colors.textDark, lineHeight: 1.4,
                }}>
                    {freeAction.title}
                </p>
                <p style={{
                    margin: "6px 0 0", fontSize: monka.font.size.body,
                    color: monka.colors.textBody, lineHeight: 1.4,
                }}>
                    {freeAction.description}
                </p>
            </motion.div>

            {/* ── Blurred: Hidden premium content ────────── */}
            <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                style={{ position: "relative", overflow: "hidden", borderRadius: monka.radius.card }}
            >
                {/* Blurred cards */}
                <div style={{
                    filter: "blur(8px)", pointerEvents: "none",
                    display: "flex", flexDirection: "column", gap: monka.spacing.sm,
                    padding: monka.spacing.lg,
                    background: monka.colors.bgCard,
                }}>
                    {hiddenFeatures.map((f, i) => (
                        <div key={i} style={{
                            background: monka.colors.bgPrimary, borderRadius: monka.radius.card,
                            padding: `${monka.spacing.md}px ${monka.spacing.lg}px`,
                            borderLeft: `3px solid ${monka.colors.ctaPrimary}`,
                        }}>
                            <p style={{ margin: 0, fontSize: monka.font.size.body, color: monka.colors.textBody }}>{f}</p>
                        </div>
                    ))}
                </div>

                {/* Gradient overlay */}
                <div style={{
                    position: "absolute", inset: 0,
                    background: `linear-gradient(180deg, transparent 0%, ${monka.colors.bgPrimary}E6 60%, ${monka.colors.bgPrimary} 100%)`,
                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                    gap: monka.spacing.md,
                }}>
                    <p style={{
                        fontSize: monka.font.size.subhead, fontWeight: monka.font.weight.semibold,
                        color: monka.colors.textMuted, textAlign: "center",
                    }}>
                        et {hiddenCount} autres actions personnalisées
                    </p>
                </div>
            </motion.div>

            {/* ── CTA Paywall ────────────────────────────── */}
            <motion.div
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.4 }}
                style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: monka.spacing.sm }}
            >
                <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={onSubscribe}
                    style={{
                        width: "100%", padding: "14px 24px",
                        background: monka.colors.ctaPrimary, color: monka.colors.textWhite,
                        border: "none", borderRadius: monka.radius.button,
                        fontSize: monka.font.size.subhead, fontWeight: monka.font.weight.bold,
                        cursor: "pointer", fontFamily: monka.font.family,
                        boxShadow: `0 4px 16px ${monka.colors.ctaPrimary}40`,
                    }}
                >
                    Débloquer tout — 7 jours gratuits
                </motion.button>
                <button
                    onClick={onFreeAction}
                    style={{
                        background: "none", border: "none",
                        color: monka.colors.ctaPrimary, fontSize: monka.font.size.footnote,
                        fontWeight: monka.font.weight.medium, cursor: "pointer", fontFamily: monka.font.family,
                    }}
                >
                    Déjà 1 action disponible gratuitement
                </button>
            </motion.div>
        </div>
    );
};

export default SResultPreview;
