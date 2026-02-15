"use client";

import { useState } from "react";
import { monka } from "./monka-design-tokens";
import BottomTabBar from "./BottomTabBar";

/**
 * Monka "Mes informations" — Pixel-perfect from IMG_3717-3719
 *
 * Features:
 * - "Vous et votre proche" section with info cards
 * - "Mes Contacts" sub-page with tabs (Santé/Démarches/Services)
 * - Expandable "Pour Moi" / "Pour Mon Proche" sections
 * - Bottom sheet contact type picker
 * - Mint background for contacts screens
 */

type View = "main" | "contacts";

const userInfo = {
    name: "Marwane",
    age: "35 ans",
    role: "Aidant",
};

const procheInfo = {
    name: "Nadia",
    age: "78 ans",
    lien: "Mère",
    situation: "Perte d'autonomie",
};

const CONTACT_TABS = [
    { id: "sante", label: "Santé" },
    { id: "demarches", label: "Démarches" },
    { id: "services", label: "Services" },
];

const contactTypes = [
    "Assistante sociale",
    "Associations",
    "CAF",
    "CARSAT",
    "CCAS",
    "Conseil départemental",
    "CPAM",
    "MDPH",
    "MSA",
    "Point info autonomie (CLIC)",
    "Tribunal",
];

const sampleContacts = {
    sante: [
        { name: "Dr. Martin", type: "Médecin traitant", phone: "04 78 XX XX XX" },
        { name: "Cabinet Kiné Lyon", type: "Kinésithérapeute", phone: "04 72 XX XX XX" },
    ],
    demarches: [
        { name: "CCAS Lyon 3ème", type: "CCAS", phone: "04 78 XX XX XX" },
    ],
    services: [
        { name: "Aide à Domicile 69", type: "Service à domicile", phone: "04 37 XX XX XX" },
    ],
};

export default function MesInformations() {
    const [view, setView] = useState<View>("main");
    const [activeContactTab, setActiveContactTab] = useState("sante");
    const [expandedSection, setExpandedSection] = useState<string | null>("pour-moi");
    const [showBottomSheet, setShowBottomSheet] = useState(false);

    if (view === "contacts") {
        return (
            <div
                style={{
                    minHeight: "100%",
                    display: "flex",
                    flexDirection: "column",
                    fontFamily: monka.font.family,
                    background: monka.colors.bgPrimary,
                }}
            >
                {/* Header */}
                <div
                    style={{
                        background: `linear-gradient(135deg, ${monka.colors.tabMint}30, ${monka.colors.bgPrimary})`,
                        padding: "12px 16px 0",
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                        <button
                            onClick={() => setView("main")}
                            style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}
                        >
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                                <path d="M15 19l-7-7 7-7" stroke={monka.colors.textDark} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        <h2
                            style={{
                                fontSize: monka.font.size.title3,
                                fontWeight: monka.font.weight.bold,
                                color: monka.colors.textDark,
                                margin: 0,
                            }}
                        >
                            Mes Contacts
                        </h2>
                    </div>

                    {/* Contact tabs */}
                    <div style={{ display: "flex", gap: 0, borderBottom: `1px solid ${monka.colors.separator}` }}>
                        {CONTACT_TABS.map((tab) => {
                            const isActive = activeContactTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveContactTab(tab.id)}
                                    style={{
                                        flex: 1,
                                        background: "none",
                                        border: "none",
                                        borderBottom: isActive ? `3px solid ${monka.colors.tabMint}` : "3px solid transparent",
                                        padding: "10px 4px",
                                        fontSize: monka.font.size.body,
                                        fontWeight: isActive ? monka.font.weight.semibold : monka.font.weight.regular,
                                        color: isActive ? monka.colors.textDark : monka.colors.textMuted,
                                        cursor: "pointer",
                                        fontFamily: monka.font.family,
                                    }}
                                >
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Expandable sections */}
                <div style={{ flex: 1, padding: 16, overflowY: "auto" }}>
                    {["pour-moi", "pour-mon-proche"].map((sectionId) => {
                        const isExpanded = expandedSection === sectionId;
                        const label = sectionId === "pour-moi" ? "Pour Moi" : "Pour Mon Proche";
                        const contacts = sampleContacts[activeContactTab as keyof typeof sampleContacts] || [];

                        return (
                            <div key={sectionId} style={{ marginBottom: 12 }}>
                                <button
                                    onClick={() => setExpandedSection(isExpanded ? null : sectionId)}
                                    style={{
                                        width: "100%",
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        padding: "14px 16px",
                                        background: monka.colors.bgCard,
                                        borderRadius: isExpanded ? `${monka.radius.card}px ${monka.radius.card}px 0 0` : monka.radius.card,
                                        border: "none",
                                        cursor: "pointer",
                                        fontFamily: monka.font.family,
                                    }}
                                >
                                    <span
                                        style={{
                                            fontSize: monka.font.size.subhead,
                                            fontWeight: monka.font.weight.semibold,
                                            color: monka.colors.textDark,
                                        }}
                                    >
                                        {label}
                                    </span>
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        style={{
                                            transform: isExpanded ? "rotate(180deg)" : "rotate(0)",
                                            transition: "transform 0.2s",
                                        }}
                                    >
                                        <path d="M6 9l6 6 6-6" stroke={monka.colors.textMuted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>

                                {isExpanded && (
                                    <div
                                        style={{
                                            background: monka.colors.bgCard,
                                            borderRadius: `0 0 ${monka.radius.card}px ${monka.radius.card}px`,
                                            padding: "0 16px 16px",
                                        }}
                                    >
                                        {contacts.map((contact, i) => (
                                            <div
                                                key={i}
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: 12,
                                                    padding: "12px 0",
                                                    borderBottom: i < contacts.length - 1 ? `1px solid ${monka.colors.separator}` : "none",
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        width: 40,
                                                        height: 40,
                                                        borderRadius: monka.radius.full,
                                                        background: `${monka.colors.tabMint}25`,
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        flexShrink: 0,
                                                    }}
                                                >
                                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                                        <circle cx="12" cy="8" r="4" stroke={monka.colors.tabMint} strokeWidth="1.8" />
                                                        <path d="M4 20c0-3.31 3.58-6 8-6s8 2.69 8 6" stroke={monka.colors.tabMint} strokeWidth="1.8" strokeLinecap="round" />
                                                    </svg>
                                                </div>
                                                <div style={{ flex: 1 }}>
                                                    <p style={{ fontSize: monka.font.size.body, fontWeight: monka.font.weight.semibold, color: monka.colors.textDark, margin: 0 }}>
                                                        {contact.name}
                                                    </p>
                                                    <p style={{ fontSize: monka.font.size.footnote, color: monka.colors.textMuted, margin: "2px 0 0" }}>
                                                        {contact.type} · {contact.phone}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}

                                        {/* Add contact button */}
                                        <button
                                            onClick={() => setShowBottomSheet(true)}
                                            style={{
                                                width: "100%",
                                                padding: "12px",
                                                borderRadius: monka.radius.button,
                                                background: "transparent",
                                                border: `1.5px dashed ${monka.colors.ctaPrimary}`,
                                                color: monka.colors.ctaPrimary,
                                                fontSize: monka.font.size.body,
                                                fontWeight: monka.font.weight.medium,
                                                cursor: "pointer",
                                                fontFamily: monka.font.family,
                                                marginTop: 12,
                                            }}
                                        >
                                            + Ajouter un contact
                                        </button>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                <BottomTabBar activeTab="mes-informations" />

                {/* Bottom sheet overlay */}
                {showBottomSheet && (
                    <>
                        <div
                            onClick={() => setShowBottomSheet(false)}
                            style={{
                                position: "fixed",
                                inset: 0,
                                background: monka.colors.overlayDark,
                                zIndex: 200,
                            }}
                        />
                        <div
                            style={{
                                position: "fixed",
                                bottom: 0,
                                left: 0,
                                right: 0,
                                background: monka.colors.bgCard,
                                borderRadius: `${monka.radius.bottomSheet}px ${monka.radius.bottomSheet}px 0 0`,
                                padding: "20px 16px 32px",
                                zIndex: 201,
                                maxHeight: "60vh",
                                overflowY: "auto",
                            }}
                        >
                            {/* Handle */}
                            <div style={{ width: 40, height: 4, borderRadius: 2, background: monka.colors.separator, margin: "0 auto 16px" }} />
                            <p style={{ fontSize: monka.font.size.title3, fontWeight: monka.font.weight.bold, color: monka.colors.textDark, margin: "0 0 16px" }}>
                                Type de contact
                            </p>
                            {contactTypes.map((type, i) => (
                                <button
                                    key={i}
                                    onClick={() => setShowBottomSheet(false)}
                                    style={{
                                        width: "100%",
                                        textAlign: "left",
                                        padding: "14px 0",
                                        borderBottom: i < contactTypes.length - 1 ? `1px solid ${monka.colors.separator}` : "none",
                                        background: "none",
                                        border: "none",
                                        borderBottomWidth: i < contactTypes.length - 1 ? 1 : 0,
                                        borderBottomStyle: "solid",
                                        borderBottomColor: monka.colors.separator,
                                        fontSize: monka.font.size.subhead,
                                        color: monka.colors.textDark,
                                        cursor: "pointer",
                                        fontFamily: monka.font.family,
                                    }}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </>
                )}
            </div>
        );
    }

    // ── Main view ──
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
            {/* Header */}
            <div style={{ padding: "16px 16px 8px" }}>
                <h1
                    style={{
                        fontSize: monka.font.size.title2,
                        fontWeight: monka.font.weight.bold,
                        color: monka.colors.textDark,
                        margin: 0,
                    }}
                >
                    Mes informations
                </h1>
            </div>

            {/* Content */}
            <div style={{ flex: 1, overflowY: "auto", padding: "8px 16px" }}>
                {/* Vous et votre proche */}
                <p
                    style={{
                        fontSize: monka.font.size.subhead,
                        fontWeight: monka.font.weight.semibold,
                        color: monka.colors.textBody,
                        margin: "0 0 12px",
                    }}
                >
                    Vous et votre proche
                </p>

                {/* User card */}
                <div
                    style={{
                        background: monka.colors.bgCard,
                        borderRadius: monka.radius.card,
                        padding: "16px",
                        marginBottom: 10,
                        boxShadow: monka.shadow.subtle,
                    }}
                >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                            <div
                                style={{
                                    width: 44,
                                    height: 44,
                                    borderRadius: monka.radius.full,
                                    background: `${monka.colors.ctaPrimary}20`,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                                    <circle cx="12" cy="8" r="4" stroke={monka.colors.ctaPrimary} strokeWidth="1.8" />
                                    <path d="M4 20c0-3.31 3.58-6 8-6s8 2.69 8 6" stroke={monka.colors.ctaPrimary} strokeWidth="1.8" strokeLinecap="round" />
                                </svg>
                            </div>
                            <div>
                                <p style={{ fontSize: monka.font.size.subhead, fontWeight: monka.font.weight.bold, color: monka.colors.textDark, margin: 0 }}>
                                    {userInfo.name}
                                </p>
                                <p style={{ fontSize: monka.font.size.footnote, color: monka.colors.textMuted, margin: "2px 0 0" }}>
                                    {userInfo.age} · {userInfo.role}
                                </p>
                            </div>
                        </div>
                        <button
                            style={{
                                background: "none",
                                border: "none",
                                color: monka.colors.ctaPrimary,
                                fontSize: monka.font.size.body,
                                fontWeight: monka.font.weight.semibold,
                                cursor: "pointer",
                                fontFamily: monka.font.family,
                            }}
                        >
                            Modifier
                        </button>
                    </div>
                </div>

                {/* Proche card */}
                <div
                    style={{
                        background: monka.colors.bgCard,
                        borderRadius: monka.radius.card,
                        padding: "16px",
                        marginBottom: 20,
                        boxShadow: monka.shadow.subtle,
                    }}
                >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                            <div
                                style={{
                                    width: 44,
                                    height: 44,
                                    borderRadius: monka.radius.full,
                                    background: `${monka.colors.tabMint}25`,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                                    <circle cx="12" cy="8" r="4" stroke={monka.colors.tabMint} strokeWidth="1.8" />
                                    <path d="M4 20c0-3.31 3.58-6 8-6s8 2.69 8 6" stroke={monka.colors.tabMint} strokeWidth="1.8" strokeLinecap="round" />
                                </svg>
                            </div>
                            <div>
                                <p style={{ fontSize: monka.font.size.subhead, fontWeight: monka.font.weight.bold, color: monka.colors.textDark, margin: 0 }}>
                                    {procheInfo.name}
                                </p>
                                <p style={{ fontSize: monka.font.size.footnote, color: monka.colors.textMuted, margin: "2px 0 0" }}>
                                    {procheInfo.age} · {procheInfo.lien} · {procheInfo.situation}
                                </p>
                            </div>
                        </div>
                        <button
                            style={{
                                background: "none",
                                border: "none",
                                color: monka.colors.ctaPrimary,
                                fontSize: monka.font.size.body,
                                fontWeight: monka.font.weight.semibold,
                                cursor: "pointer",
                                fontFamily: monka.font.family,
                            }}
                        >
                            Modifier
                        </button>
                    </div>
                </div>

                {/* Quick links */}
                {[
                    { iconType: "clipboard", label: "Mon historique", sub: "Voir mes actions passées" },
                    { iconType: "phone", label: "Mes contacts", sub: "Soignants, interlocuteurs", onClick: () => setView("contacts") },
                    { iconType: "document", label: "Mes documents", sub: "Ordonnances, bilans" },
                    { iconType: "settings", label: "Paramètres", sub: "Notifications, langue" },
                ].map((item, i) => (
                    <button
                        key={i}
                        onClick={item.onClick}
                        style={{
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            gap: 14,
                            padding: "14px 16px",
                            background: monka.colors.bgCard,
                            borderRadius: monka.radius.card,
                            marginBottom: 8,
                            border: "none",
                            cursor: "pointer",
                            boxShadow: monka.shadow.subtle,
                            fontFamily: monka.font.family,
                            textAlign: "left",
                        }}
                    >
                        <div style={{ width: 36, height: 36, borderRadius: 10, background: `${monka.colors.ctaPrimary}10`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            {item.iconType === "clipboard" && (
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                    <rect x="5" y="3" width="14" height="18" rx="2" stroke={monka.colors.ctaPrimary} strokeWidth="1.8" />
                                    <path d="M9 3V1h6v2" stroke={monka.colors.ctaPrimary} strokeWidth="1.8" strokeLinecap="round" />
                                    <line x1="8" y1="9" x2="16" y2="9" stroke={monka.colors.ctaPrimary} strokeWidth="1.5" strokeLinecap="round" />
                                    <line x1="8" y1="13" x2="14" y2="13" stroke={monka.colors.ctaPrimary} strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                            )}
                            {item.iconType === "phone" && (
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke={monka.colors.ctaPrimary} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            )}
                            {item.iconType === "document" && (
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke={monka.colors.ctaPrimary} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                    <polyline points="14,2 14,8 20,8" stroke={monka.colors.ctaPrimary} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            )}
                            {item.iconType === "settings" && (
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                    <circle cx="12" cy="12" r="3" stroke={monka.colors.ctaPrimary} strokeWidth="1.8" />
                                    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" stroke={monka.colors.ctaPrimary} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            )}
                        </div>
                        <div style={{ flex: 1 }}>
                            <p style={{ fontSize: monka.font.size.body, fontWeight: monka.font.weight.semibold, color: monka.colors.textDark, margin: 0 }}>
                                {item.label}
                            </p>
                            <p style={{ fontSize: monka.font.size.footnote, color: monka.colors.textMuted, margin: "2px 0 0" }}>
                                {item.sub}
                            </p>
                        </div>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M9 5l7 7-7 7" stroke={monka.colors.textMuted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                ))}
            </div>

            <BottomTabBar activeTab="mes-informations" />
        </div>
    );
}
