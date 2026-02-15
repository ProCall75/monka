"use client";

import { useState, useEffect } from "react";
import { monka } from "./monka-design-tokens";

/**
 * Monka Analysis Loading Screen — Pixel-perfect from IMG_3700
 *
 * Shows animated progress while "analyzing" user questionnaire responses.
 * Features:
 * - Centered illustration (SVG placeholder)
 * - Animated progress bar (teal gradient)
 * - "Analyse en cours..." heading
 * - Animated checklist with progressive green checkmarks
 */

const checklistItems = [
    "Analyse de vos besoins",
    "Liste d'actions personnalisées",
    "Ressources recommandées",
    "Mise en place",
];

export default function AnalysisLoading({ onComplete }: { onComplete?: () => void }) {
    const [progress, setProgress] = useState(0);
    const [completedItems, setCompletedItems] = useState(0);

    useEffect(() => {
        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                return prev + 0.8;
            });
        }, 50);

        return () => clearInterval(progressInterval);
    }, []);

    useEffect(() => {
        const thresholds = [20, 45, 70, 95];
        const newCompleted = thresholds.filter((t) => progress >= t).length;
        setCompletedItems(newCompleted);

        if (progress >= 100 && onComplete) {
            const timeout = setTimeout(onComplete, 800);
            return () => clearTimeout(timeout);
        }
    }, [progress, onComplete]);

    return (
        <div
            style={{
                background: monka.colors.bgCard,
                minHeight: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                fontFamily: monka.font.family,
                paddingTop: 40,
            }}
        >
            {/* ── Illustration placeholder ── */}
            <div
                style={{
                    width: 280,
                    height: 260,
                    marginBottom: 24,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                }}
            >
                <svg viewBox="0 0 280 260" width="280" height="260" fill="none">
                    {/* Background circle */}
                    <circle cx="140" cy="120" r="100" fill="#F0F4F8" />
                    {/* Abstract leaf shapes */}
                    <ellipse cx="90" cy="140" rx="45" ry="80" fill="#7C9CBF" opacity="0.7" transform="rotate(-15 90 140)" />
                    <ellipse cx="80" cy="150" rx="30" ry="60" fill="#A5C4E0" opacity="0.6" transform="rotate(-20 80 150)" />
                    {/* Small yellow accent */}
                    <ellipse cx="120" cy="160" rx="20" ry="15" fill="#F5C563" opacity="0.8" />
                    {/* Person silhouette */}
                    <circle cx="145" cy="130" r="14" fill="#FADBD8" />
                    <path d="M130 155 Q145 145 160 155 L158 200 Q145 195 132 200 Z" fill="#E8D5E0" />
                    <rect x="132" y="195" width="26" height="30" rx="4" fill="#2C3E80" opacity="0.7" />
                    {/* Gear icon */}
                    <g transform="translate(180, 60)">
                        <circle cx="30" cy="30" r="25" fill="#F5A623" />
                        <circle cx="30" cy="30" r="14" fill="#F0F4F8" />
                        {/* Gear teeth */}
                        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                            <rect
                                key={angle}
                                x="26"
                                y="2"
                                width="8"
                                height="10"
                                rx="2"
                                fill="#E8941A"
                                transform={`rotate(${angle} 30 30)`}
                            />
                        ))}
                    </g>
                    {/* Decorative lines on leaves */}
                    <path d="M70 100 Q85 130 75 180" stroke="white" strokeWidth="1" opacity="0.4" fill="none" />
                    <path d="M60 110 Q75 140 65 185" stroke="white" strokeWidth="0.8" opacity="0.3" fill="none" />
                </svg>
            </div>

            {/* ── Progress bar ── */}
            <div
                style={{
                    width: "calc(100% - 40px)",
                    height: 6,
                    borderRadius: 3,
                    background: monka.colors.bgPrimary,
                    marginBottom: 32,
                    overflow: "hidden",
                }}
            >
                <div
                    style={{
                        width: `${Math.min(progress, 100)}%`,
                        height: "100%",
                        borderRadius: 3,
                        background: `linear-gradient(90deg, ${monka.colors.ctaPrimary}, ${monka.colors.tabMint})`,
                        transition: "width 0.1s linear",
                    }}
                />
            </div>

            {/* ── Text ── */}
            <h2
                style={{
                    fontSize: monka.font.size.title2,
                    fontWeight: monka.font.weight.bold,
                    color: monka.colors.textDark,
                    margin: "0 0 12px",
                    textAlign: "center",
                }}
            >
                Analyse en cours...
            </h2>
            <p
                style={{
                    fontSize: monka.font.size.body,
                    fontWeight: monka.font.weight.semibold,
                    color: monka.colors.textBody,
                    margin: "0 0 28px",
                    textAlign: "center",
                    padding: "0 30px",
                    lineHeight: 1.5,
                }}
            >
                Nous vous concoctons un programme sur mesure pour vous et votre proche
            </p>

            {/* ── Animated checklist ── */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 14,
                    paddingLeft: 40,
                    paddingRight: 40,
                    width: "100%",
                }}
            >
                {checklistItems.map((item, i) => {
                    const isComplete = i < completedItems;
                    return (
                        <div
                            key={i}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 12,
                                transition: "opacity 0.3s ease",
                            }}
                        >
                            {/* Check circle */}
                            <div
                                style={{
                                    width: 24,
                                    height: 24,
                                    borderRadius: monka.radius.full,
                                    border: isComplete ? "none" : `2px solid ${monka.colors.progressInactive}`,
                                    background: isComplete ? monka.colors.checkGreen : "transparent",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    transition: "all 0.4s ease",
                                    flexShrink: 0,
                                }}
                            >
                                {isComplete && (
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                                        <path d="M5 12l5 5L19 7" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                )}
                            </div>
                            <span
                                style={{
                                    fontSize: monka.font.size.subhead,
                                    color: isComplete ? monka.colors.textDark : monka.colors.textMuted,
                                    fontWeight: monka.font.weight.regular,
                                    transition: "color 0.3s ease",
                                }}
                            >
                                {item}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
