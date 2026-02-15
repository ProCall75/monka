"use client";

import { monka } from "./monka-design-tokens";
import BottomTabBar from "./BottomTabBar";

/**
 * Monka Messagerie — Pixel-perfect from IMG_3709-3710
 *
 * Features:
 * - Header with back arrow + "Messagerie" title
 * - Conversation list with IDEC nurse
 * - Subscription paywall overlay
 * - Chat bubbles when "unlocked" (for demo purposes)
 */

const conversations = [
    {
        name: "Sophie, IDEC",
        role: "Infirmière coordinatrice",
        lastMessage: "N'hésitez pas si vous avez d'autres questions 🙂",
        time: "10:35",
        unread: 1,
        avatar: "S",
    },
    {
        name: "Support Monka",
        role: "Assistance",
        lastMessage: "Bienvenue sur Monka ! Nous sommes là pour vous aider.",
        time: "Hier",
        unread: 0,
        avatar: "M",
    },
];

export default function ProposedChatIDEC() {
    return (
        <div
            style={{
                background: monka.colors.bgPrimary,
                minHeight: "100%",
                display: "flex",
                flexDirection: "column",
                fontFamily: monka.font.family,
                position: "relative",
            }}
        >
            {/* ── Header ── */}
            <div
                style={{
                    background: monka.colors.bgCard,
                    padding: "12px 16px",
                    borderBottom: `1px solid ${monka.colors.separator}`,
                }}
            >
                <h2
                    style={{
                        fontSize: monka.font.size.title2,
                        fontWeight: monka.font.weight.bold,
                        color: monka.colors.textDark,
                        margin: 0,
                    }}
                >
                    Messagerie
                </h2>
            </div>

            {/* ── Conversation list ── */}
            <div style={{ flex: 1, position: "relative" }}>
                <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 8 }}>
                    {conversations.map((conv, i) => (
                        <div
                            key={i}
                            style={{
                                background: monka.colors.bgCard,
                                borderRadius: monka.radius.card,
                                padding: "14px 16px",
                                display: "flex",
                                alignItems: "center",
                                gap: 12,
                                boxShadow: monka.shadow.subtle,
                                cursor: "pointer",
                            }}
                        >
                            {/* Avatar */}
                            <div
                                style={{
                                    width: 44,
                                    height: 44,
                                    borderRadius: monka.radius.full,
                                    background: monka.colors.ctaPrimary,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: monka.colors.textWhite,
                                    fontSize: monka.font.size.title3,
                                    fontWeight: monka.font.weight.bold,
                                    flexShrink: 0,
                                }}
                            >
                                {conv.avatar}
                            </div>
                            <div style={{ flex: 1, overflow: "hidden" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <p style={{ fontSize: monka.font.size.body, fontWeight: monka.font.weight.semibold, color: monka.colors.textDark, margin: 0 }}>
                                        {conv.name}
                                    </p>
                                    <span style={{ fontSize: monka.font.size.caption, color: monka.colors.textMuted }}>
                                        {conv.time}
                                    </span>
                                </div>
                                <p style={{ fontSize: monka.font.size.footnote, color: monka.colors.textMuted, margin: "2px 0 0" }}>
                                    {conv.role}
                                </p>
                                <p
                                    style={{
                                        fontSize: monka.font.size.footnote,
                                        color: monka.colors.textBody,
                                        margin: "4px 0 0",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    {conv.lastMessage}
                                </p>
                            </div>
                            {conv.unread > 0 && (
                                <div
                                    style={{
                                        width: 22,
                                        height: 22,
                                        borderRadius: monka.radius.full,
                                        background: monka.colors.ctaPrimary,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        color: monka.colors.textWhite,
                                        fontSize: 11,
                                        fontWeight: monka.font.weight.bold,
                                        flexShrink: 0,
                                    }}
                                >
                                    {conv.unread}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* ── Subscription paywall overlay ── */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        background: "rgba(232, 244, 248, 0.92)",
                        backdropFilter: "blur(6px)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: 32,
                    }}
                >
                    {/* Lock icon */}
                    <div
                        style={{
                            width: 64,
                            height: 64,
                            borderRadius: monka.radius.full,
                            background: `${monka.colors.ctaPrimary}15`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginBottom: 20,
                        }}
                    >
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                            <rect x="5" y="11" width="14" height="10" rx="2" stroke={monka.colors.ctaPrimary} strokeWidth="2" />
                            <path d="M8 11V7a4 4 0 018 0v4" stroke={monka.colors.ctaPrimary} strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </div>

                    <h3
                        style={{
                            fontSize: monka.font.size.title3,
                            fontWeight: monka.font.weight.bold,
                            color: monka.colors.textDark,
                            textAlign: "center",
                            margin: "0 0 8px",
                        }}
                    >
                        Messagerie Premium
                    </h3>
                    <p
                        style={{
                            fontSize: monka.font.size.body,
                            color: monka.colors.textBody,
                            textAlign: "center",
                            lineHeight: 1.5,
                            margin: "0 0 24px",
                            maxWidth: 260,
                        }}
                    >
                        Abonnez-vous pour échanger directement avec votre infirmière coordinatrice.
                    </p>

                    <button
                        style={{
                            width: "100%",
                            maxWidth: 240,
                            padding: "14px",
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
                        Voir les abonnements
                    </button>
                </div>
            </div>

            <BottomTabBar activeTab="messagerie" />
        </div>
    );
}
