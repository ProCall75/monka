"use client";

import React from "react";
import { monka } from "./monka-design-tokens";

// ═══════════════════════════════════════
// ParcoursCard — Resolves C01 (flat depth) + MP invisible
// Shows a micro-parcours as a visible, actionable card
// with progress, ASR milestone, and drill-down CTA
// ═══════════════════════════════════════

export interface ParcoursCardProps {
    /** Micro-parcours title — e.g. "Santé de l'aidant (S3)" */
    title: string;
    /** Human-readable description */
    description: string;
    /** Vulnerability category */
    category: "social" | "fragilite" | "sante" | "medical" | "administratif";
    /** Current ASR milestone name */
    currentMilestone?: string;
    /** Progress */
    tasksCompleted: number;
    tasksTotal: number;
    /** Whether this parcours is active */
    isActive?: boolean;
    /** Drill-down handler — the key to C01 resolution */
    onPress?: () => void;
}

const CATEGORY_CONFIG: Record<string, { color: string; bg: string; label: string }> = {
    social: { color: "#3A7BD5", bg: "#EBF2FC", label: "Social & Relationnel" },
    fragilite: { color: "#D97706", bg: "#FEF3C7", label: "Fragilité du Proche" },
    sante: { color: "#2E8B57", bg: "#E8F5E9", label: "Santé de l'Aidant" },
    medical: { color: "#8B5CF6", bg: "#EDE9FE", label: "Parcours Médical" },
    administratif: { color: "#E67E22", bg: "#FFF3E0", label: "Administratif" },
};

export default function ParcoursCard({
    title,
    description,
    category,
    currentMilestone,
    tasksCompleted,
    tasksTotal,
    isActive = true,
    onPress,
}: ParcoursCardProps) {
    const config = CATEGORY_CONFIG[category];
    const progressPercent = tasksTotal > 0 ? Math.round((tasksCompleted / tasksTotal) * 100) : 0;

    return (
        <button
            onClick={onPress}
            style={{
                width: "100%",
                background: monka.colors.bgCard,
                border: `1px solid ${isActive ? config.color + "30" : monka.colors.separator}`,
                borderRadius: monka.radius.card,
                padding: "16px",
                cursor: onPress ? "pointer" : "default",
                textAlign: "left",
                display: "block",
                position: "relative",
                overflow: "hidden",
                transition: "all 0.2s ease",
            }}
        >
            {/* Accent bar */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: 3,
                    height: "100%",
                    background: config.color,
                    borderRadius: "3px 0 0 3px",
                }}
            />

            {/* Category tag */}
            <span
                style={{
                    display: "inline-block",
                    fontSize: monka.font.size.caption,
                    fontWeight: monka.font.weight.semibold,
                    color: config.color,
                    background: config.bg,
                    padding: "3px 8px",
                    borderRadius: monka.radius.pill,
                    marginBottom: 8,
                    letterSpacing: "0.2px",
                }}
            >
                {config.label}
            </span>

            {/* Title + Description */}
            <h4
                style={{
                    fontSize: monka.font.size.subhead,
                    fontWeight: monka.font.weight.semibold,
                    color: monka.colors.textDark,
                    margin: "0 0 4px",
                    lineHeight: 1.3,
                }}
            >
                {title}
            </h4>
            <p
                style={{
                    fontSize: monka.font.size.footnote,
                    color: monka.colors.textMuted,
                    margin: "0 0 12px",
                    lineHeight: 1.4,
                }}
            >
                {description}
            </p>

            {/* Current milestone */}
            {currentMilestone && (
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        marginBottom: 10,
                        fontSize: monka.font.size.footnote,
                        color: monka.colors.textBody,
                    }}
                >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2l2.09 6.26L20 9.27l-4.91 3.82L16.18 20 12 16.77 7.82 20l1.09-6.91L4 9.27l5.91-1.01L12 2z" stroke={config.color} strokeWidth="2" fill="none" />
                    </svg>
                    <span style={{ fontWeight: monka.font.weight.medium }}>Prochain jalon :</span> {currentMilestone}
                </div>
            )}

            {/* Progress */}
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ flex: 1, height: 4, borderRadius: 2, background: monka.colors.separator, overflow: "hidden" }}>
                    <div
                        style={{
                            width: `${progressPercent}%`,
                            height: "100%",
                            borderRadius: 2,
                            background: config.color,
                            transition: "width 0.3s ease",
                        }}
                    />
                </div>
                <span style={{ fontSize: monka.font.size.caption, color: monka.colors.textMuted, fontWeight: monka.font.weight.medium, flexShrink: 0 }}>
                    {tasksCompleted}/{tasksTotal}
                </span>
            </div>

            {/* Drill-down arrow */}
            {onPress && (
                <div style={{ position: "absolute", top: 16, right: 14 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M9 18l6-6-6-6" stroke={monka.colors.textMuted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            )}
        </button>
    );
}
