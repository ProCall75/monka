"use client";

import { useState } from "react";
import { monka } from "./monka-design-tokens";
import BottomTabBar from "./BottomTabBar";

/**
 * Monka Dashboard "Pour Moi" — Pixel-perfect from IMG_3702-3707, IMG_3762
 *
 * Features:
 * - Header: monka logo + "S'abonner" pill + notification bell
 * - Greeting: "Bonjour, Marwane" + subtitle
 * - Progress bar: thin line + "0/66" counter
 * - 4 horizontal tabs: À la une | Santé | Démarches | Services
 * - Action cards: horizontal scroll, white cards with tags
 * - Section cards: "Vos premières démarches" with illustrations
 * - Bottom tab bar
 */

const SUB_TABS = [
    { id: "a-la-une", label: "À la une", color: monka.colors.tabBlue },
    { id: "sante", label: "Santé", color: monka.colors.tabGreen },
    { id: "demarches", label: "Démarches", color: monka.colors.tabMint },
    { id: "services", label: "Services", color: monka.colors.tabOrange },
];

const actionCards = [
    {
        tags: ["Moins de 10 min", "Médecin traitant (ou g..."],
        title: "Demandez une prescription pour des examens de prévention.",
        forWho: "Pour vous",
        cta: "Je commence",
    },
    {
        tags: ["Moins de 10 min", "En ligne"],
        title: "Demandez une prescription pour des examens de prévention.",
        forWho: "Pour Francine",
        cta: "Je commence",
    },
    {
        tags: ["30 min", "À domicile"],
        title: "Faites le point sur les aides à domicile disponibles près de chez vous.",
        forWho: "Pour vous",
        cta: "Je commence",
    },
];

const demarcheCards = [
    {
        title: "Bilan infirmier.e",
        subtitle: "Obtenez des informations sur l'état de santé de votre proche",
        color: "#EBF5FB",
        accent: "#3A7BD5",
    },
    {
        title: "APA à domicile",
        subtitle: "Vérifiez l'éligibilité et les démarches pour obtenir l'APA",
        color: "#FEF9E7",
        accent: "#E67E22",
    },
    {
        title: "Aide ménagère",
        subtitle: "Trouvez un service d'aide à domicile adapté",
        color: "#E8F8F5",
        accent: "#2E8B57",
    },
];

export default function ProposedDashboard() {
    const [activeSubTab, setActiveSubTab] = useState("a-la-une");

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
            {/* ── Header bar ── */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "12px 16px 8px",
                }}
            >
                {/* Monka logo text */}
                <span
                    style={{
                        fontSize: 20,
                        fontWeight: monka.font.weight.heavy,
                        color: monka.colors.textDark,
                        letterSpacing: "-0.3px",
                    }}
                >
                    m<span style={{ color: monka.colors.ctaPrimary }}>o</span>nka
                </span>

                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    {/* S'abonner pill */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 4,
                            padding: "6px 12px",
                            borderRadius: monka.radius.pill,
                            border: `1.5px solid ${monka.colors.separator}`,
                            fontSize: 12,
                            fontWeight: monka.font.weight.medium,
                            color: monka.colors.textBody,
                            cursor: "pointer",
                        }}
                    >
                        S&apos;abonner
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                            <rect x="5" y="11" width="14" height="10" rx="2" stroke={monka.colors.textBody} strokeWidth="1.8" />
                            <path d="M8 11V7a4 4 0 018 0v4" stroke={monka.colors.textBody} strokeWidth="1.8" strokeLinecap="round" />
                        </svg>
                    </div>
                    {/* Notification bell */}
                    <div style={{ cursor: "pointer", position: "relative" }}>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                            <path d="M12 2C10.34 2 9 3.34 9 5v1.29C6.89 7.38 5.5 9.54 5.5 12v4.5L4 18v1h16v-1l-1.5-1.5V12c0-2.46-1.39-4.62-3.5-5.71V5c0-1.66-1.34-3-3-3z"
                                stroke={monka.colors.textBody} strokeWidth="1.5" fill="none" />
                            <path d="M10 20c0 1.1.9 2 2 2s2-.9 2-2" stroke={monka.colors.textBody} strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                        <div
                            style={{
                                position: "absolute",
                                top: -2,
                                right: -2,
                                width: 8,
                                height: 8,
                                borderRadius: monka.radius.full,
                                background: "#E74C3C",
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* ── Greeting ── */}
            <div style={{ padding: "12px 16px 4px" }}>
                <h1
                    style={{
                        fontSize: monka.font.size.largeTitle,
                        fontWeight: monka.font.weight.bold,
                        color: monka.colors.textDark,
                        margin: "0 0 4px",
                        lineHeight: 1.2,
                    }}
                >
                    Bonjour, Marwane
                </h1>
                <p
                    style={{
                        fontSize: monka.font.size.subhead,
                        fontWeight: monka.font.weight.semibold,
                        color: monka.colors.textDark,
                        margin: "0 0 12px",
                    }}
                >
                    Voici vos actions clés du mois.
                </p>
            </div>

            {/* ── Progress bar ── */}
            <div style={{ padding: "0 16px 16px", display: "flex", alignItems: "center", gap: 8 }}>
                <div
                    style={{
                        flex: 1,
                        height: 4,
                        borderRadius: 2,
                        background: monka.colors.separator,
                        overflow: "hidden",
                    }}
                >
                    <div
                        style={{
                            width: "0%",
                            height: "100%",
                            borderRadius: 2,
                            background: monka.colors.ctaPrimary,
                        }}
                    />
                </div>
                <span
                    style={{
                        fontSize: monka.font.size.footnote,
                        color: monka.colors.textMuted,
                        fontWeight: monka.font.weight.medium,
                        flexShrink: 0,
                    }}
                >
                    0/66
                </span>
            </div>

            {/* ── Sub-tabs ── */}
            <div
                style={{
                    display: "flex",
                    gap: 0,
                    padding: "0 16px",
                    borderBottom: `1px solid ${monka.colors.separator}`,
                }}
            >
                {SUB_TABS.map((tab) => {
                    const isActive = activeSubTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveSubTab(tab.id)}
                            style={{
                                flex: 1,
                                background: "none",
                                border: "none",
                                borderBottom: isActive ? `3px solid ${tab.color}` : "3px solid transparent",
                                padding: "10px 4px",
                                fontSize: monka.font.size.body,
                                fontWeight: isActive ? monka.font.weight.semibold : monka.font.weight.regular,
                                color: isActive ? monka.colors.textDark : monka.colors.textMuted,
                                cursor: "pointer",
                                transition: "all 0.2s",
                                fontFamily: monka.font.family,
                            }}
                        >
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            {/* ── Content area ── */}
            <div style={{ flex: 1, overflowY: "auto" }}>
                {/* Options zone background */}
                <div
                    style={{
                        background: monka.colors.bgOptionsZone,
                        padding: "20px 0",
                        borderRadius: `${monka.radius.card}px ${monka.radius.card}px 0 0`,
                        marginTop: 4,
                    }}
                >
                    {/* ── Vos priorités santé ── */}
                    <p
                        style={{
                            fontSize: monka.font.size.subhead,
                            fontWeight: monka.font.weight.regular,
                            color: monka.colors.textBody,
                            margin: "0 0 14px",
                            padding: "0 16px",
                        }}
                    >
                        Vos priorités santé
                    </p>

                    {/* Horizontal scroll action cards */}
                    <div
                        style={{
                            display: "flex",
                            gap: 12,
                            overflowX: "auto",
                            padding: "0 16px 8px",
                            scrollSnapType: "x mandatory",
                        }}
                    >
                        {actionCards.map((card, i) => (
                            <div
                                key={i}
                                style={{
                                    background: monka.colors.bgCard,
                                    borderRadius: monka.radius.card,
                                    padding: "16px",
                                    minWidth: 260,
                                    maxWidth: 280,
                                    flexShrink: 0,
                                    scrollSnapAlign: "start",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    boxShadow: monka.shadow.subtle,
                                }}
                            >
                                {/* Tags */}
                                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
                                    {card.tags.map((tag, j) => (
                                        <span
                                            key={j}
                                            style={{
                                                fontSize: 11,
                                                color: monka.colors.ctaPrimary,
                                                background: `${monka.colors.ctaPrimary}12`,
                                                padding: "3px 8px",
                                                borderRadius: 6,
                                                fontWeight: monka.font.weight.medium,
                                            }}
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Title */}
                                <p
                                    style={{
                                        fontSize: monka.font.size.body,
                                        fontWeight: monka.font.weight.semibold,
                                        color: monka.colors.textDark,
                                        lineHeight: 1.4,
                                        margin: "0 0 16px",
                                        flex: 1,
                                    }}
                                >
                                    {card.title}
                                </p>

                                {/* Footer: "Pour vous" + CTA */}
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                    }}
                                >
                                    <span
                                        style={{
                                            fontSize: monka.font.size.footnote,
                                            color: monka.colors.textMuted,
                                            fontWeight: monka.font.weight.regular,
                                        }}
                                    >
                                        {card.forWho}
                                    </span>
                                    <button
                                        style={{
                                            background: `${monka.colors.ctaPrimary}15`,
                                            border: `1px solid ${monka.colors.ctaPrimary}`,
                                            borderRadius: monka.radius.button,
                                            padding: "6px 14px",
                                            fontSize: 12,
                                            fontWeight: monka.font.weight.medium,
                                            color: monka.colors.ctaPrimary,
                                            cursor: "pointer",
                                            fontFamily: monka.font.family,
                                        }}
                                    >
                                        {card.cta}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* ── Vos premières démarches ── */}
                    <p
                        style={{
                            fontSize: monka.font.size.subhead,
                            fontWeight: monka.font.weight.regular,
                            color: monka.colors.textBody,
                            margin: "24px 0 14px",
                            padding: "0 16px",
                        }}
                    >
                        Vos premières démarches
                    </p>

                    <div style={{ padding: "0 16px", display: "flex", flexDirection: "column", gap: 10 }}>
                        {demarcheCards.map((card, i) => (
                            <div
                                key={i}
                                style={{
                                    background: card.color,
                                    borderRadius: monka.radius.card,
                                    padding: "16px 18px",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 14,
                                    cursor: "pointer",
                                }}
                            >
                                {/* Illustration placeholder */}
                                <div
                                    style={{
                                        width: 56,
                                        height: 56,
                                        borderRadius: 12,
                                        background: `${card.accent}20`,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexShrink: 0,
                                    }}
                                >
                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                                        <path d="M9 12l2 2 4-4" stroke={card.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <rect x="3" y="3" width="18" height="18" rx="4" stroke={card.accent} strokeWidth="1.5" />
                                    </svg>
                                </div>
                                <div style={{ flex: 1 }}>
                                    <p
                                        style={{
                                            fontSize: monka.font.size.subhead,
                                            fontWeight: monka.font.weight.bold,
                                            color: monka.colors.textDark,
                                            margin: "0 0 2px",
                                        }}
                                    >
                                        {card.title}
                                    </p>
                                    <p
                                        style={{
                                            fontSize: monka.font.size.footnote,
                                            color: monka.colors.textBody,
                                            margin: 0,
                                            lineHeight: 1.3,
                                        }}
                                    >
                                        {card.subtitle}
                                    </p>
                                </div>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                    <path d="M9 5l7 7-7 7" stroke={monka.colors.textMuted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Bottom Tab Bar ── */}
            <BottomTabBar activeTab="pour-moi" />
        </div>
    );
}
