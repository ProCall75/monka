import { useState } from "react";
import { monka } from "./monka-design-tokens";

/**
 * OQuestionnaireScreen — Single questionnaire step layout
 *
 * Extracted from Onboarding.tsx. Renders one question at a time with:
 * - Back/close navigation
 * - Optional section badge (number + title)
 * - Question text + optional subtitle
 * - Progress dots
 * - Options zone with selectable pills (single or multi)
 * - "Continuer" CTA for multi-select
 *
 * Screenshots: IMG_3689, IMG_3691, IMG_3698, IMG_3732, IMG_3760
 */

export interface QuestionData {
    /** Section header info (shown when transitioning between sections) */
    section?: { number: number; title: string };
    /** Question text */
    question: string;
    /** Optional subtitle / helper text */
    subtitle?: string;
    /** Answer options */
    options: string[];
    /** If true, multiple options can be selected */
    multi?: boolean;
}

export interface OQuestionnaireScreenProps {
    /** Current question data */
    question: QuestionData;
    /** Total number of progress dots */
    totalDots?: number;
    /** Number of filled dots (current progress) */
    filledDots: number;
    /** Currently selected option indices */
    selectedOptions: Set<number>;
    /** Can navigate back */
    canGoBack?: boolean;
    /** Called when an option is tapped */
    onOptionTap: (optionIndex: number) => void;
    /** Called when "Continuer" is tapped (multi-select) */
    onContinue?: () => void;
    /** Called when back arrow is tapped */
    onBack?: () => void;
    /** Called when close button is tapped */
    onClose?: () => void;
}

export default function OQuestionnaireScreen({
    question: q,
    totalDots = 14,
    filledDots,
    selectedOptions,
    canGoBack = true,
    onOptionTap,
    onContinue,
    onBack,
    onClose,
}: OQuestionnaireScreenProps) {
    return (
        <div
            style={{
                background: monka.colors.bgPrimary,
                minHeight: "100%",
                display: "flex",
                flexDirection: "column",
                fontFamily: monka.font.family,
            }}
        >
            {/* ── Top bar: back arrow + close ── */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "12px 16px 8px",
                }}
            >
                <button
                    onClick={onBack}
                    style={{
                        background: "none",
                        border: "none",
                        cursor: canGoBack ? "pointer" : "default",
                        padding: 4,
                        opacity: canGoBack ? 1 : 0.3,
                    }}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M15 19l-7-7 7-7" stroke={monka.colors.textDark} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
                {q.section && (
                    <button
                        onClick={onClose}
                        style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            padding: 4,
                        }}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M18 6L6 18M6 6l12 12" stroke={monka.colors.textDark} strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </button>
                )}
            </div>

            {/* ── Divider ── */}
            <div style={{ height: 1, background: monka.colors.separator, marginLeft: 16, marginRight: 16 }} />

            {/* ── Section header (if present) ── */}
            {q.section && (
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "16px 20px 4px",
                    }}
                >
                    <div
                        style={{
                            width: 32,
                            height: 32,
                            borderRadius: monka.radius.full,
                            background: monka.colors.bgPrimary,
                            border: `2px solid ${monka.colors.separator}`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: monka.font.size.body,
                            fontWeight: monka.font.weight.semibold,
                            color: monka.colors.textDark,
                            flexShrink: 0,
                        }}
                    >
                        {q.section.number}
                    </div>
                    <span
                        style={{
                            fontSize: monka.font.size.body,
                            color: monka.colors.textBody,
                            fontWeight: monka.font.weight.regular,
                        }}
                    >
                        {q.section.title}
                    </span>
                </div>
            )}

            {/* ── Question text ── */}
            <div style={{ padding: "16px 20px 0" }}>
                <h1
                    style={{
                        fontSize: monka.font.size.title2,
                        fontWeight: monka.font.weight.bold,
                        color: monka.colors.textDark,
                        lineHeight: 1.3,
                        margin: 0,
                        marginBottom: q.subtitle ? 12 : 8,
                    }}
                >
                    {q.question}
                </h1>
                {q.subtitle && (
                    <p
                        style={{
                            fontSize: monka.font.size.body,
                            color: monka.colors.textMuted,
                            lineHeight: 1.5,
                            margin: 0,
                            marginBottom: 8,
                        }}
                    >
                        {q.subtitle}
                    </p>
                )}
            </div>

            {/* ── Progress dots ── */}
            <div
                style={{
                    display: "flex",
                    gap: 6,
                    padding: "12px 20px 20px",
                    flexWrap: "wrap",
                }}
            >
                {Array.from({ length: totalDots }).map((_, i) => (
                    <div
                        key={i}
                        style={{
                            width: i < filledDots ? 18 : 14,
                            height: 6,
                            borderRadius: 3,
                            background: i < filledDots ? monka.colors.progressActive : monka.colors.progressInactive,
                            transition: "all 0.3s ease",
                        }}
                    />
                ))}
            </div>

            {/* ── Options zone (icy-blue background) ── */}
            <div
                style={{
                    flex: 1,
                    background: monka.colors.bgOptionsZone,
                    borderRadius: `${monka.radius.card}px ${monka.radius.card}px 0 0`,
                    padding: "24px 16px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                }}
            >
                {/* Options */}
                <div style={{ display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
                    {q.options.map((opt, i) => {
                        const isSelected = selectedOptions.has(i);
                        return (
                            <button
                                key={i}
                                onClick={() => onOptionTap(i)}
                                style={{
                                    width: "100%",
                                    background: monka.colors.bgCard,
                                    border: isSelected
                                        ? `2px solid ${monka.colors.ctaPrimary}`
                                        : "2px solid transparent",
                                    borderRadius: monka.radius.option,
                                    padding: "16px 18px",
                                    textAlign: "left",
                                    fontSize: monka.font.size.subhead,
                                    fontWeight: monka.font.weight.regular,
                                    color: monka.colors.textDark,
                                    fontFamily: monka.font.family,
                                    cursor: "pointer",
                                    transition: "all 0.2s ease",
                                    boxShadow: isSelected ? monka.shadow.card : "none",
                                }}
                            >
                                {opt}
                            </button>
                        );
                    })}
                </div>

                {/* Continuer button (for multi-select questions) */}
                {q.multi && (
                    <button
                        onClick={onContinue}
                        disabled={selectedOptions.size === 0}
                        style={{
                            width: "100%",
                            padding: "16px",
                            borderRadius: monka.radius.button,
                            background: selectedOptions.size > 0
                                ? monka.colors.ctaPrimary
                                : monka.colors.ctaMuted,
                            color: monka.colors.textWhite,
                            fontSize: monka.font.size.subhead,
                            fontWeight: monka.font.weight.semibold,
                            fontFamily: monka.font.family,
                            border: "none",
                            cursor: selectedOptions.size > 0 ? "pointer" : "default",
                            transition: "background 0.2s ease",
                            marginTop: 8,
                        }}
                    >
                        Continuer
                    </button>
                )}
            </div>
        </div>
    );
}
