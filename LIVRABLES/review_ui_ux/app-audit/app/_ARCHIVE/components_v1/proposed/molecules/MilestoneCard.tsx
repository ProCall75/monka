"use client";

import React from "react";
import { monka } from "./monka-design-tokens";

// ═══════════════════════════════════════
// MilestoneCard — Resolves ASR invisible
// Shows ASR (Actions Structurantes de Référence) as visible milestones
// States: locked → active → achieved
// ═══════════════════════════════════════

export type MilestoneStatus = "locked" | "active" | "achieved";

export interface MilestoneCardProps {
    /** ASR title — e.g. "Médecin traitant identifié" */
    title: string;
    /** Description of what this milestone represents */
    description?: string;
    /** Current status */
    status: MilestoneStatus;
    /** Optional: contributing tasks progress */
    tasksCompleted?: number;
    tasksTotal?: number;
    /** Related micro-parcours label */
    parcoursLabel?: string;
}

export default function MilestoneCard({
    title,
    description,
    status,
    tasksCompleted = 0,
    tasksTotal = 0,
    parcoursLabel,
}: MilestoneCardProps) {
    const isAchieved = status === "achieved";
    const isLocked = status === "locked";
    const progressPercent = tasksTotal > 0 ? Math.round((tasksCompleted / tasksTotal) * 100) : 0;

    return (
        <div
            style={{
                background: isAchieved ? "#F0FDF4" : monka.colors.bgCard,
                border: `1px solid ${isAchieved ? "#BBF7D0" : monka.colors.separator}`,
                borderRadius: monka.radius.card,
                padding: "14px 16px",
                opacity: isLocked ? 0.55 : 1,
                position: "relative",
            }}
        >
            <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                {/* Status icon */}
                <div
                    style={{
                        width: 36,
                        height: 36,
                        borderRadius: 10,
                        background: isAchieved ? "#DCFCE7" : isLocked ? "#F3F4F6" : `${monka.colors.ctaPrimary}12`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                    }}
                >
                    {isAchieved ? (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                            <path d="M20 6L9 17l-5-5" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    ) : isLocked ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <rect x="3" y="11" width="18" height="11" rx="2" stroke="#9CA3AF" strokeWidth="2" />
                            <path d="M7 11V7a5 5 0 0110 0v4" stroke="#9CA3AF" strokeWidth="2" />
                        </svg>
                    ) : (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="10" stroke={monka.colors.ctaPrimary} strokeWidth="2" />
                            <path d="M12 8v4l3 3" stroke={monka.colors.ctaPrimary} strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    )}
                </div>

                <div style={{ flex: 1 }}>
                    {/* Parcours label */}
                    {parcoursLabel && (
                        <span
                            style={{
                                fontSize: monka.font.size.caption,
                                fontWeight: monka.font.weight.medium,
                                color: monka.colors.ctaPrimary,
                                textTransform: "uppercase",
                                letterSpacing: "0.3px",
                            }}
                        >
                            {parcoursLabel}
                        </span>
                    )}

                    {/* Title */}
                    <h4
                        style={{
                            fontSize: monka.font.size.body,
                            fontWeight: monka.font.weight.semibold,
                            color: isAchieved ? "#15803D" : monka.colors.textDark,
                            margin: parcoursLabel ? "2px 0 0" : 0,
                            lineHeight: 1.3,
                            textDecoration: isAchieved ? "none" : "none",
                        }}
                    >
                        {title}
                    </h4>

                    {/* Description */}
                    {description && !isLocked && (
                        <p
                            style={{
                                fontSize: monka.font.size.footnote,
                                color: monka.colors.textMuted,
                                margin: "4px 0 0",
                                lineHeight: 1.4,
                            }}
                        >
                            {description}
                        </p>
                    )}

                    {/* Progress bar for active */}
                    {status === "active" && tasksTotal > 0 && (
                        <div style={{ marginTop: 10 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                                <span style={{ fontSize: monka.font.size.caption, color: monka.colors.textMuted }}>
                                    {tasksCompleted}/{tasksTotal} tâches
                                </span>
                                <span style={{ fontSize: monka.font.size.caption, color: monka.colors.ctaPrimary, fontWeight: monka.font.weight.semibold }}>
                                    {progressPercent}%
                                </span>
                            </div>
                            <div style={{ height: 4, borderRadius: 2, background: monka.colors.separator, overflow: "hidden" }}>
                                <div
                                    style={{
                                        width: `${progressPercent}%`,
                                        height: "100%",
                                        borderRadius: 2,
                                        background: monka.colors.ctaPrimary,
                                        transition: "width 0.3s ease",
                                    }}
                                />
                            </div>
                        </div>
                    )}

                    {/* Achieved badge */}
                    {isAchieved && (
                        <span
                            style={{
                                display: "inline-block",
                                marginTop: 8,
                                fontSize: monka.font.size.caption,
                                fontWeight: monka.font.weight.semibold,
                                color: "#16A34A",
                                background: "#DCFCE7",
                                padding: "3px 8px",
                                borderRadius: monka.radius.pill,
                            }}
                        >
                            ✓ Jalon atteint
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}
