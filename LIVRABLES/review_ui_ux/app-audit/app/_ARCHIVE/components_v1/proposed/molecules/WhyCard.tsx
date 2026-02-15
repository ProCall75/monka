"use client";

import React from "react";
import { monka } from "./monka-design-tokens";

// ═══════════════════════════════════════
// WhyCard — Resolves C07 (no pedagogy/context)
// Contextual explanation card: "Why this task matters"
// ═══════════════════════════════════════

export interface WhyCardProps {
    /** The question it answers — e.g. "Pourquoi contacter le CCAS ?" */
    question: string;
    /** The contextual explanation */
    answer: string;
    /** Optional: link to a resource */
    learnMoreLabel?: string;
    onLearnMore?: () => void;
    /** Optional: accent color */
    accentColor?: string;
}

export default function WhyCard({
    question,
    answer,
    learnMoreLabel = "En savoir plus",
    onLearnMore,
    accentColor = monka.colors.ctaPrimary,
}: WhyCardProps) {
    return (
        <div
            style={{
                background: `${accentColor}08`,
                border: `1px solid ${accentColor}20`,
                borderRadius: monka.radius.card,
                padding: "14px 16px",
                margin: "0 16px",
            }}
        >
            <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                {/* Icon */}
                <div
                    style={{
                        width: 24,
                        height: 24,
                        borderRadius: 6,
                        background: `${accentColor}15`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        marginTop: 1,
                    }}
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke={accentColor} strokeWidth="2" />
                        <path d="M12 16v-4M12 8h.01" stroke={accentColor} strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </div>
                <div style={{ flex: 1 }}>
                    <p
                        style={{
                            fontSize: monka.font.size.body,
                            fontWeight: monka.font.weight.semibold,
                            color: monka.colors.textDark,
                            margin: "0 0 4px",
                            lineHeight: 1.3,
                        }}
                    >
                        {question}
                    </p>
                    <p
                        style={{
                            fontSize: monka.font.size.body,
                            fontWeight: monka.font.weight.regular,
                            color: monka.colors.textBody,
                            margin: 0,
                            lineHeight: 1.5,
                        }}
                    >
                        {answer}
                    </p>
                    {onLearnMore && (
                        <button
                            onClick={onLearnMore}
                            style={{
                                background: "none",
                                border: "none",
                                padding: 0,
                                marginTop: 8,
                                fontSize: monka.font.size.footnote,
                                fontWeight: monka.font.weight.medium,
                                color: accentColor,
                                cursor: "pointer",
                            }}
                        >
                            {learnMoreLabel} →
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
