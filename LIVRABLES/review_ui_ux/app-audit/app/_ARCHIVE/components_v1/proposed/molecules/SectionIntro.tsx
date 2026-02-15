"use client";

import React from "react";
import { monka } from "./monka-design-tokens";

// ═══════════════════════════════════════
// SectionIntro — Resolves C07 (no pedagogy/context)
// Every section now starts with WHY before WHAT
// ═══════════════════════════════════════

export interface SectionIntroProps {
    /** Section title */
    title: string;
    /** The "why" — explains why this section matters for the caregiver */
    subtitle: string;
    /** Optional icon to the left of the title */
    icon?: React.ReactNode;
    /** Optional accent color for the icon container */
    accentColor?: string;
    /** Optional action on the right */
    action?: { label: string; onClick?: () => void };
}

export default function SectionIntro({ title, subtitle, icon, accentColor = monka.colors.ctaPrimary, action }: SectionIntroProps) {
    return (
        <div style={{ padding: "16px 16px 12px" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                {icon && (
                    <div
                        style={{
                            width: 32,
                            height: 32,
                            borderRadius: 8,
                            background: `${accentColor}12`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                            marginTop: 2,
                        }}
                    >
                        {icon}
                    </div>
                )}
                <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <h3
                            style={{
                                fontSize: monka.font.size.subhead,
                                fontWeight: monka.font.weight.semibold,
                                color: monka.colors.textDark,
                                margin: 0,
                                lineHeight: 1.3,
                            }}
                        >
                            {title}
                        </h3>
                        {action && (
                            <button
                                onClick={action.onClick}
                                style={{
                                    background: "none",
                                    border: "none",
                                    fontSize: monka.font.size.footnote,
                                    fontWeight: monka.font.weight.medium,
                                    color: monka.colors.ctaPrimary,
                                    cursor: "pointer",
                                    padding: "4px 0",
                                }}
                            >
                                {action.label}
                            </button>
                        )}
                    </div>
                    <p
                        style={{
                            fontSize: monka.font.size.body,
                            fontWeight: monka.font.weight.regular,
                            color: monka.colors.textMuted,
                            margin: "4px 0 0",
                            lineHeight: 1.5,
                        }}
                    >
                        {subtitle}
                    </p>
                </div>
            </div>
        </div>
    );
}
