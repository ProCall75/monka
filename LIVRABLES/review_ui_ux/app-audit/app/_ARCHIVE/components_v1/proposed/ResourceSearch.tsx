"use client";

import { useState } from "react";
import { monka } from "./monka-design-tokens";
import BottomTabBar from "./BottomTabBar";

/**
 * Monka Ressources — Pixel-perfect from IMG_3708, IMG_3701
 *
 * Features:
 * - Search bar
 * - Category filter pills
 * - Article cards with illustrations and category tags
 * - Proper icy-blue background
 */

const categories = [
    { id: "tous", label: "Tous" },
    { id: "sante", label: "Santé" },
    { id: "demarches", label: "Démarches" },
    { id: "droits", label: "Droits" },
    { id: "bien-etre", label: "Bien-être" },
];

const articles = [
    {
        title: "Comment obtenir l'APA pour votre proche ?",
        category: "Démarches",
        readTime: "5 min",
        categoryColor: monka.colors.tabMint,
        bgColor: "#E8F8F5",
    },
    {
        title: "Comprendre le rôle de l'infirmier coordinateur",
        category: "Santé",
        readTime: "3 min",
        categoryColor: monka.colors.tabGreen,
        bgColor: "#EBF5FB",
    },
    {
        title: "Les aides financières pour les aidants",
        category: "Droits",
        readTime: "7 min",
        categoryColor: monka.colors.tabBlue,
        bgColor: "#F0E6FA",
    },
    {
        title: "Prendre soin de soi quand on est aidant",
        category: "Bien-être",
        readTime: "4 min",
        categoryColor: monka.colors.tabOrange,
        bgColor: "#FEF9E7",
    },
    {
        title: "Les droits au répit des aidants familiaux",
        category: "Droits",
        readTime: "6 min",
        categoryColor: monka.colors.tabBlue,
        bgColor: "#F0E6FA",
    },
    {
        title: "Guide pratique : adaptation du logement",
        category: "Démarches",
        readTime: "8 min",
        categoryColor: monka.colors.tabMint,
        bgColor: "#E8F8F5",
    },
];

export default function ProposedResourceSearch() {
    const [activeCategory, setActiveCategory] = useState("tous");
    const [searchFocused, setSearchFocused] = useState(false);

    const filteredArticles = activeCategory === "tous"
        ? articles
        : articles.filter((a) => a.category.toLowerCase().includes(activeCategory));

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
            {/* ── Header ── */}
            <div style={{ padding: "16px 16px 8px" }}>
                <h1
                    style={{
                        fontSize: monka.font.size.title2,
                        fontWeight: monka.font.weight.bold,
                        color: monka.colors.textDark,
                        margin: "0 0 14px",
                    }}
                >
                    Ressources
                </h1>

                {/* Search bar */}
                <div
                    style={{
                        background: monka.colors.bgCard,
                        borderRadius: monka.radius.card,
                        padding: "12px 14px",
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        border: searchFocused ? `1.5px solid ${monka.colors.ctaPrimary}` : `1.5px solid ${monka.colors.separator}`,
                        transition: "border-color 0.2s",
                    }}
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <circle cx="11" cy="11" r="7" stroke={monka.colors.textMuted} strokeWidth="1.8" />
                        <path d="M16 16l4 4" stroke={monka.colors.textMuted} strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                    <input
                        placeholder="Rechercher un article, un sujet..."
                        onFocus={() => setSearchFocused(true)}
                        onBlur={() => setSearchFocused(false)}
                        style={{
                            border: "none",
                            outline: "none",
                            background: "none",
                            fontSize: monka.font.size.body,
                            color: monka.colors.textDark,
                            fontFamily: monka.font.family,
                            width: "100%",
                        }}
                    />
                </div>
            </div>

            {/* ── Category pills ── */}
            <div
                style={{
                    display: "flex",
                    gap: 8,
                    padding: "12px 16px",
                    overflowX: "auto",
                }}
            >
                {categories.map((cat) => {
                    const isActive = activeCategory === cat.id;
                    return (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            style={{
                                padding: "8px 16px",
                                borderRadius: monka.radius.pill,
                                background: isActive ? monka.colors.ctaPrimary : monka.colors.bgCard,
                                color: isActive ? monka.colors.textWhite : monka.colors.textBody,
                                border: isActive ? "none" : `1px solid ${monka.colors.separator}`,
                                fontSize: monka.font.size.footnote,
                                fontWeight: monka.font.weight.medium,
                                cursor: "pointer",
                                fontFamily: monka.font.family,
                                whiteSpace: "nowrap",
                                flexShrink: 0,
                            }}
                        >
                            {cat.label}
                        </button>
                    );
                })}
            </div>

            {/* ── Article list ── */}
            <div style={{ flex: 1, padding: "4px 16px 16px", overflowY: "auto" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {filteredArticles.map((article, i) => (
                        <div
                            key={i}
                            style={{
                                background: monka.colors.bgCard,
                                borderRadius: monka.radius.card,
                                overflow: "hidden",
                                boxShadow: monka.shadow.subtle,
                                cursor: "pointer",
                            }}
                        >
                            {/* Illustration area */}
                            <div
                                style={{
                                    height: 100,
                                    background: article.bgColor,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    position: "relative",
                                }}
                            >
                                {/* Decorative shapes */}
                                <svg width="120" height="80" viewBox="0 0 120 80" fill="none">
                                    <circle cx="30" cy="40" r="25" fill={`${article.categoryColor}30`} />
                                    <circle cx="85" cy="30" r="18" fill={`${article.categoryColor}20`} />
                                    <rect x="50" y="35" width="40" height="30" rx="6" fill={`${article.categoryColor}40`} />
                                    {/* Page icon */}
                                    <rect x="58" y="20" width="24" height="32" rx="3" fill="white" stroke={article.categoryColor} strokeWidth="1" />
                                    <line x1="62" y1="28" x2="78" y2="28" stroke={article.categoryColor} strokeWidth="1" opacity="0.5" />
                                    <line x1="62" y1="33" x2="74" y2="33" stroke={article.categoryColor} strokeWidth="1" opacity="0.5" />
                                    <line x1="62" y1="38" x2="76" y2="38" stroke={article.categoryColor} strokeWidth="1" opacity="0.5" />
                                </svg>
                            </div>

                            {/* Content */}
                            <div style={{ padding: "14px 16px" }}>
                                <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                                    <span
                                        style={{
                                            fontSize: 11,
                                            fontWeight: monka.font.weight.medium,
                                            color: article.categoryColor,
                                            background: `${article.categoryColor}15`,
                                            padding: "3px 10px",
                                            borderRadius: 6,
                                        }}
                                    >
                                        {article.category}
                                    </span>
                                    <span
                                        style={{
                                            fontSize: 11,
                                            color: monka.colors.textMuted,
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 3,
                                        }}
                                    >
                                        ⏱ {article.readTime}
                                    </span>
                                </div>
                                <p
                                    style={{
                                        fontSize: monka.font.size.body,
                                        fontWeight: monka.font.weight.semibold,
                                        color: monka.colors.textDark,
                                        lineHeight: 1.4,
                                        margin: 0,
                                    }}
                                >
                                    {article.title}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <BottomTabBar activeTab="ressources" />
        </div>
    );
}
