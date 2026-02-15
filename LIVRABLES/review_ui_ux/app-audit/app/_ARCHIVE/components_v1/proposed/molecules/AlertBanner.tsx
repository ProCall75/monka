"use client";

import React from "react";
import { monka } from "./monka-design-tokens";

// ═══════════════════════════════════════
// AlertBanner — Resolves CCC invisible
// Shows composite alerts with explanation of WHY it's triggered
// ═══════════════════════════════════════

export type AlertSeverity = "critical" | "warning" | "info";

export interface AlertBannerProps {
    severity: AlertSeverity;
    /** Main message */
    title: string;
    /** Explanation of why this alert was triggered (CCC logic) */
    description?: string;
    /** CTA */
    action?: { label: string; onClick?: () => void };
    /** Dismiss handler */
    onDismiss?: () => void;
}

const SEVERITY_CONFIG: Record<AlertSeverity, { bg: string; border: string; color: string; iconBg: string }> = {
    critical: {
        bg: "#FEF2F2",
        border: "#FECACA",
        color: "#991B1B",
        iconBg: "#FEE2E2",
    },
    warning: {
        bg: "#FFFBEB",
        border: "#FDE68A",
        color: "#92400E",
        iconBg: "#FEF3C7",
    },
    info: {
        bg: "#EFF6FF",
        border: "#BFDBFE",
        color: "#1E40AF",
        iconBg: "#DBEAFE",
    },
};

function AlertIcon({ severity }: { severity: AlertSeverity }) {
    const color = SEVERITY_CONFIG[severity].color;
    if (severity === "critical") {
        return (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        );
    }
    if (severity === "warning") {
        return (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" />
                <path d="M12 8v4M12 16h.01" stroke={color} strokeWidth="2" strokeLinecap="round" />
            </svg>
        );
    }
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" />
            <path d="M12 16v-4M12 8h.01" stroke={color} strokeWidth="2" strokeLinecap="round" />
        </svg>
    );
}

export default function AlertBanner({ severity, title, description, action, onDismiss }: AlertBannerProps) {
    const config = SEVERITY_CONFIG[severity];

    return (
        <div
            style={{
                background: config.bg,
                border: `1px solid ${config.border}`,
                borderRadius: monka.radius.card,
                padding: "12px 14px",
                margin: "0 16px",
            }}
        >
            <div style={{ display: "flex", gap: 10 }}>
                <div
                    style={{
                        width: 28,
                        height: 28,
                        borderRadius: 8,
                        background: config.iconBg,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                    }}
                >
                    <AlertIcon severity={severity} />
                </div>
                <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <p
                            style={{
                                fontSize: monka.font.size.body,
                                fontWeight: monka.font.weight.semibold,
                                color: config.color,
                                margin: 0,
                                lineHeight: 1.3,
                            }}
                        >
                            {title}
                        </p>
                        {onDismiss && (
                            <button
                                onClick={onDismiss}
                                style={{
                                    background: "none",
                                    border: "none",
                                    padding: "2px",
                                    cursor: "pointer",
                                    color: config.color,
                                    opacity: 0.5,
                                    fontSize: 16,
                                    lineHeight: 1,
                                }}
                            >
                                ×
                            </button>
                        )}
                    </div>
                    {description && (
                        <p
                            style={{
                                fontSize: monka.font.size.footnote,
                                fontWeight: monka.font.weight.regular,
                                color: config.color,
                                opacity: 0.85,
                                margin: "4px 0 0",
                                lineHeight: 1.5,
                            }}
                        >
                            {description}
                        </p>
                    )}
                    {action && (
                        <button
                            onClick={action.onClick}
                            style={{
                                background: config.color,
                                color: "#fff",
                                border: "none",
                                borderRadius: monka.radius.button,
                                padding: "6px 14px",
                                marginTop: 10,
                                fontSize: monka.font.size.footnote,
                                fontWeight: monka.font.weight.semibold,
                                cursor: "pointer",
                            }}
                        >
                            {action.label}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
