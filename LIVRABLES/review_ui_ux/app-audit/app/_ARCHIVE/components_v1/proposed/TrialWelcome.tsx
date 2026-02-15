"use client";

import { monka } from "./monka-design-tokens";

/**
 * Monka Trial Welcome Screen — Pixel-perfect from IMG_3701
 *
 * Shown after analysis completes. Displays:
 * - Small illustration
 * - "Votre essai de 7 jours Monka Essentiel a commencé !"
 * - 3-step vertical timeline
 * - "Commencer" + "Voir les abonnements" buttons
 */

const timelineSteps = [
    {
        number: 1,
        title: "Aujourd'hui",
        description: "Découvrez nos recommandations pour vous",
    },
    {
        number: 2,
        title: "Dans 5 jours",
        description: "Vous serez alerté.e de la fin de votre essai",
    },
    {
        number: 3,
        title: "Dans 7 jours",
        description: "Conservez les fonctionnalités essentielles en vous abonnant",
    },
];

export default function TrialWelcome({ onStart }: { onStart?: () => void }) {
    return (
        <div
            style={{
                background: monka.colors.bgPrimary,
                minHeight: "100%",
                display: "flex",
                flexDirection: "column",
                fontFamily: monka.font.family,
                padding: "40px 24px 24px",
            }}
        >
            {/* ── Small illustration ── */}
            <div style={{ marginBottom: 20 }}>
                <svg width="64" height="56" viewBox="0 0 64 56" fill="none">
                    <circle cx="24" cy="28" r="24" fill="#E8F4F8" />
                    <circle cx="20" cy="22" r="8" fill="#FADBD8" />
                    <path d="M12 38 Q20 32 28 38 L26 50 Q20 48 14 50 Z" fill="#A5C4E0" />
                    <circle cx="44" cy="22" r="7" fill="#FADBD8" />
                    <path d="M37 36 Q44 30 51 36 L49 47 Q44 45 39 47 Z" fill="#F5C563" opacity="0.8" />
                    <circle cx="50" cy="10" r="6" fill="#F5A623" opacity="0.3" />
                </svg>
            </div>

            {/* ── Title ── */}
            <h1
                style={{
                    fontSize: monka.font.size.title2,
                    fontWeight: monka.font.weight.bold,
                    color: monka.colors.textDark,
                    lineHeight: 1.3,
                    margin: "0 0 32px",
                }}
            >
                Votre essai de 7 jours Monka Essentiel a commencé !
            </h1>

            {/* ── Timeline ── */}
            <div
                style={{
                    background: monka.colors.bgOptionsZone,
                    borderRadius: monka.radius.card,
                    padding: "24px 20px",
                    flex: 1,
                    marginBottom: 24,
                }}
            >
                {timelineSteps.map((step, i) => (
                    <div
                        key={step.number}
                        style={{
                            display: "flex",
                            gap: 16,
                            marginBottom: i < timelineSteps.length - 1 ? 0 : 0,
                        }}
                    >
                        {/* Left column: number circle + connecting line */}
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                width: 32,
                                flexShrink: 0,
                            }}
                        >
                            <div
                                style={{
                                    width: 32,
                                    height: 32,
                                    borderRadius: monka.radius.full,
                                    background: monka.colors.bgPrimary,
                                    border: `2px solid ${monka.colors.ctaPrimary}`,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: monka.font.size.body,
                                    fontWeight: monka.font.weight.semibold,
                                    color: monka.colors.ctaPrimary,
                                    flexShrink: 0,
                                }}
                            >
                                {step.number}
                            </div>
                            {i < timelineSteps.length - 1 && (
                                <div
                                    style={{
                                        width: 2,
                                        flex: 1,
                                        minHeight: 40,
                                        background: monka.colors.ctaMuted,
                                    }}
                                />
                            )}
                        </div>

                        {/* Right column: content card */}
                        <div
                            style={{
                                background: monka.colors.bgCard,
                                borderRadius: monka.radius.card,
                                padding: "16px 18px",
                                flex: 1,
                                marginBottom: i < timelineSteps.length - 1 ? 12 : 0,
                            }}
                        >
                            <p
                                style={{
                                    fontSize: monka.font.size.subhead,
                                    fontWeight: monka.font.weight.bold,
                                    color: monka.colors.textDark,
                                    margin: "0 0 4px",
                                }}
                            >
                                {step.title}
                            </p>
                            <p
                                style={{
                                    fontSize: monka.font.size.footnote,
                                    color: monka.colors.textBody,
                                    lineHeight: 1.4,
                                    margin: 0,
                                }}
                            >
                                {step.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* ── CTAs ── */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <button
                    onClick={onStart}
                    style={{
                        width: "100%",
                        padding: "16px",
                        borderRadius: monka.radius.button,
                        background: monka.colors.ctaPrimary,
                        color: monka.colors.textWhite,
                        fontSize: monka.font.size.subhead,
                        fontWeight: monka.font.weight.semibold,
                        fontFamily: monka.font.family,
                        border: "none",
                        cursor: "pointer",
                    }}
                >
                    Commencer
                </button>
                <button
                    style={{
                        width: "100%",
                        padding: "16px",
                        borderRadius: monka.radius.button,
                        background: "transparent",
                        color: monka.colors.ctaPrimary,
                        fontSize: monka.font.size.subhead,
                        fontWeight: monka.font.weight.semibold,
                        fontFamily: monka.font.family,
                        border: `1.5px solid ${monka.colors.ctaPrimary}`,
                        cursor: "pointer",
                    }}
                >
                    Voir les abonnements
                </button>
            </div>
        </div>
    );
}
