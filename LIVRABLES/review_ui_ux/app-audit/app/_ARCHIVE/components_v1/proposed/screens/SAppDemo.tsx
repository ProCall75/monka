"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { monka } from "../monka-design-tokens";

// ─── Screens
import SDashboardV2 from "./SDashboardV2";
import SThemeDetail from "./SThemeDetail";
import OBottomTabBar from "../organisms/OBottomTabBar";

// ─── Navigation Types ─────────────────────────────────────────────
type Screen =
    | { id: "dashboard" }
    | { id: "theme"; theme: "sante" | "admin" | "bienetre" }
    | { id: "ressources" }
    | { id: "messagerie" }
    | { id: "infos" };

type TabId = "pour-moi" | "ressources" | "messagerie" | "mes-informations";

// ─── Toast Type ───────────────────────────────────────────────────
interface Toast {
    message: string;
    subtitle?: string;
    visible: boolean;
    type?: "success" | "info" | "warning";
}

// ─── Inline SVG icons for toast ───────────────────────────────────
function ToastIcon({ type }: { type: "success" | "info" | "warning" }) {
    if (type === "success") return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
            <circle cx="10" cy="10" r="9" stroke="white" strokeWidth="1.5" fill="rgba(255,255,255,0.2)" />
            <path d="M6 10l3 3 5-6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
    if (type === "info") return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
            <circle cx="10" cy="10" r="9" stroke="white" strokeWidth="1.5" fill="rgba(255,255,255,0.2)" />
            <path d="M10 9v4M10 7h.01" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
    );
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
            <circle cx="10" cy="10" r="9" stroke="white" strokeWidth="1.5" fill="rgba(255,255,255,0.2)" />
            <path d="M10 7v4M10 13h.01" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
    );
}

// ─── Transition variants ──────────────────────────────────────────
const slideVariants = {
    enter: (direction: "forward" | "back") => ({
        x: direction === "forward" ? "100%" : "-30%",
        opacity: 0.6,
    }),
    center: {
        x: 0,
        opacity: 1,
    },
    exit: (direction: "forward" | "back") => ({
        x: direction === "forward" ? "-30%" : "100%",
        opacity: 0.6,
    }),
};

const springTransition = {
    type: "spring" as const,
    stiffness: 300,
    damping: 30,
};

// ─── Toast color map ──────────────────────────────────────────────
const TOAST_COLORS = {
    success: "#10B981",
    info: monka.colors.ctaPrimary,
    warning: "#F59E0B",
};

// ─── Placeholder Screens ──────────────────────────────────────────
function ResourcesScreen() {
    const resources = [
        { title: "Le renouvellement d'ordonnance : guide pratique", category: "Sante", time: "3 min", color: monka.colors.themeSante },
        { title: "Aide financiere : vos droits en tant qu'aidant", category: "Demarches", time: "5 min", color: monka.colors.themeAdmin },
        { title: "Prendre soin de soi quand on est aidant", category: "Bien-etre", time: "4 min", color: monka.colors.themeBienEtre },
        { title: "Comprendre les troubles cognitifs", category: "Sante", time: "6 min", color: monka.colors.themeSante },
        { title: "Demander l'APA : etapes et documents", category: "Demarches", time: "7 min", color: monka.colors.themeAdmin },
        { title: "Groupes de parole pour les proches aidants", category: "Bien-etre", time: "3 min", color: monka.colors.themeBienEtre },
    ];

    return (
        <div style={{
            background: monka.colors.bgPrimary,
            minHeight: "100%",
            fontFamily: monka.font.family,
            padding: `${monka.spacing.xl}px`,
            paddingBottom: 80,
        }}>
            <h1 style={{
                fontSize: monka.font.size.title2,
                fontWeight: monka.font.weight.bold,
                color: monka.colors.textDark,
                margin: 0,
                marginBottom: monka.spacing.sm,
            }}>
                Ressources
            </h1>
            <p style={{
                fontSize: monka.font.size.body,
                color: monka.colors.textMuted,
                margin: `0 0 ${monka.spacing.xl}px`,
            }}>
                Articles et guides pour vous accompagner
            </p>

            {/* Search bar */}
            <div style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: `${monka.spacing.md}px ${monka.spacing.lg}px`,
                borderRadius: monka.radius.button,
                background: monka.colors.bgCard,
                border: `1px solid ${monka.colors.separator}`,
                marginBottom: monka.spacing.xl,
            }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="7" cy="7" r="5" stroke={monka.colors.textMuted} strokeWidth="1.5" />
                    <path d="M11 11l3 3" stroke={monka.colors.textMuted} strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <span style={{
                    fontSize: monka.font.size.body,
                    color: monka.colors.textMuted,
                }}>
                    Rechercher un article...
                </span>
            </div>

            {/* Resource list */}
            <div style={{ display: "flex", flexDirection: "column", gap: monka.spacing.sm + 2 }}>
                {resources.map((r, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        style={{
                            padding: `${monka.spacing.lg}px`,
                            borderRadius: monka.radius.card,
                            background: monka.colors.bgCard,
                            boxShadow: monka.shadow.subtle,
                            cursor: "pointer",
                        }}
                    >
                        <div style={{ display: "flex", gap: monka.spacing.md, alignItems: "flex-start" }}>
                            <div style={{
                                width: 36, height: 36, borderRadius: 10,
                                background: `${r.color}12`,
                                display: "flex", alignItems: "center", justifyContent: "center",
                                flexShrink: 0,
                            }}>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M2 2h5v6H2zM9 2h5v4H9zM2 10h5v4H2zM9 8h5v6H9z" stroke={r.color} strokeWidth="1.2" strokeLinecap="round" />
                                </svg>
                            </div>
                            <div style={{ flex: 1 }}>
                                <p style={{
                                    fontSize: monka.font.size.body,
                                    fontWeight: monka.font.weight.semibold,
                                    color: monka.colors.textDark,
                                    margin: 0,
                                    lineHeight: 1.3,
                                }}>
                                    {r.title}
                                </p>
                                <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
                                    <span style={{
                                        fontSize: monka.font.size.caption,
                                        color: r.color,
                                        fontWeight: monka.font.weight.medium,
                                    }}>{r.category}</span>
                                    <span style={{ fontSize: monka.font.size.caption, color: monka.colors.textMuted }}>
                                        {r.time} de lecture
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

function MessagerieScreen() {
    const conversations = [
        { name: "Sophie", role: "IDEC", lastMsg: "N'hesitez pas si vous avez d'autres questions !", time: "Il y a 2h", unread: true },
        { name: "Dr. Martin", role: "Medecin traitant", lastMsg: "L'ordonnance est prete a retirer.", time: "Hier", unread: false },
        { name: "Monka", role: "Assistant", lastMsg: "Votre recap hebdomadaire est disponible.", time: "Lun.", unread: false },
    ];

    return (
        <div style={{
            background: monka.colors.bgPrimary,
            minHeight: "100%",
            fontFamily: monka.font.family,
            paddingBottom: 80,
        }}>
            <div style={{ padding: `${monka.spacing.xl}px` }}>
                <h1 style={{
                    fontSize: monka.font.size.title2,
                    fontWeight: monka.font.weight.bold,
                    color: monka.colors.textDark,
                    margin: 0,
                    marginBottom: monka.spacing.xl,
                }}>
                    Messagerie
                </h1>
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
                {conversations.map((c, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08 }}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: monka.spacing.md,
                            padding: `${monka.spacing.lg}px ${monka.spacing.xl}px`,
                            borderBottom: `1px solid ${monka.colors.separator}`,
                            cursor: "pointer",
                            background: c.unread ? `${monka.colors.ctaPrimary}04` : "transparent",
                        }}
                    >
                        <div style={{
                            width: 44, height: 44, borderRadius: monka.radius.full,
                            background: `linear-gradient(135deg, ${monka.colors.ctaPrimary}25, ${monka.colors.ctaPrimary}10)`,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            flexShrink: 0,
                        }}>
                            <span style={{
                                fontSize: monka.font.size.body,
                                fontWeight: monka.font.weight.bold,
                                color: monka.colors.ctaPrimary,
                            }}>
                                {c.name.charAt(0)}
                            </span>
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <span style={{
                                    fontSize: monka.font.size.body,
                                    fontWeight: c.unread ? monka.font.weight.bold : monka.font.weight.medium,
                                    color: monka.colors.textDark,
                                }}>
                                    {c.name}
                                </span>
                                <span style={{
                                    fontSize: monka.font.size.caption,
                                    color: c.unread ? monka.colors.ctaPrimary : monka.colors.textMuted,
                                    fontWeight: c.unread ? monka.font.weight.semibold : monka.font.weight.regular,
                                }}>
                                    {c.time}
                                </span>
                            </div>
                            <span style={{
                                fontSize: monka.font.size.footnote,
                                color: monka.colors.textMuted,
                                display: "block",
                                marginTop: 2,
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}>
                                {c.role} : {c.lastMsg}
                            </span>
                        </div>
                        {c.unread && (
                            <div style={{
                                width: 8, height: 8, borderRadius: 4,
                                background: monka.colors.ctaPrimary, flexShrink: 0,
                            }} />
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

function InfosScreen() {
    const menuItems = [
        { iconType: "user", label: "Mon profil", sub: "Amel, 38 ans, aidante" },
        { iconType: "users", label: "Mon proche", sub: "Nadia, 71 ans" },
        { iconType: "clipboard", label: "Mon historique", sub: "Voir mes actions passees" },
        { iconType: "phone", label: "Mes contacts", sub: "Soignants, interlocuteurs" },
        { iconType: "document", label: "Mes documents", sub: "Ordonnances, bilans" },
        { iconType: "settings", label: "Parametres", sub: "Notifications, langue" },
    ];

    function InfoIcon({ type }: { type: string }) {
        const c = monka.colors.ctaPrimary;
        if (type === "user") return (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="8" r="4" stroke={c} strokeWidth="1.8" />
                <path d="M4 20c0-3.31 3.58-6 8-6s8 2.69 8 6" stroke={c} strokeWidth="1.8" strokeLinecap="round" />
            </svg>
        );
        if (type === "users") return (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <circle cx="9" cy="8" r="3.5" stroke={c} strokeWidth="1.6" />
                <circle cx="16" cy="9" r="2.5" stroke={c} strokeWidth="1.4" opacity={0.6} />
                <path d="M2 20c0-3 3-5.5 7-5.5s7 2.5 7 5.5" stroke={c} strokeWidth="1.6" strokeLinecap="round" />
            </svg>
        );
        if (type === "clipboard") return (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <rect x="5" y="3" width="14" height="18" rx="2" stroke={c} strokeWidth="1.8" />
                <path d="M9 3V1h6v2" stroke={c} strokeWidth="1.8" strokeLinecap="round" />
                <line x1="8" y1="9" x2="16" y2="9" stroke={c} strokeWidth="1.4" strokeLinecap="round" />
                <line x1="8" y1="13" x2="14" y2="13" stroke={c} strokeWidth="1.4" strokeLinecap="round" />
            </svg>
        );
        if (type === "phone") return (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.8 19.8 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        );
        if (type === "document") return (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                <polyline points="14,2 14,8 20,8" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        );
        return (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="3" stroke={c} strokeWidth="1.8" />
                <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" stroke={c} strokeWidth="1.5" />
            </svg>
        );
    }

    return (
        <div style={{
            background: monka.colors.bgPrimary,
            minHeight: "100%",
            fontFamily: monka.font.family,
            padding: `${monka.spacing.xl}px`,
            paddingBottom: 80,
        }}>
            <h1 style={{
                fontSize: monka.font.size.title2,
                fontWeight: monka.font.weight.bold,
                color: monka.colors.textDark,
                margin: 0,
                marginBottom: monka.spacing.xl,
            }}>
                Mes informations
            </h1>

            <div style={{ display: "flex", flexDirection: "column", gap: monka.spacing.sm }}>
                {menuItems.map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.04 }}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 14,
                            padding: `${monka.spacing.lg}px`,
                            background: monka.colors.bgCard,
                            borderRadius: monka.radius.card,
                            boxShadow: monka.shadow.subtle,
                            cursor: "pointer",
                        }}
                    >
                        <div style={{
                            width: 36, height: 36, borderRadius: 10,
                            background: `${monka.colors.ctaPrimary}10`,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            flexShrink: 0,
                        }}>
                            <InfoIcon type={item.iconType} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <p style={{
                                fontSize: monka.font.size.body,
                                fontWeight: monka.font.weight.semibold,
                                color: monka.colors.textDark,
                                margin: 0,
                            }}>{item.label}</p>
                            <p style={{
                                fontSize: monka.font.size.footnote,
                                color: monka.colors.textMuted,
                                margin: "2px 0 0",
                            }}>{item.sub}</p>
                        </div>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M9 5l7 7-7 7" stroke={monka.colors.textMuted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

// ─── Main Component ───────────────────────────────────────────────
const SAppDemo: React.FC = () => {
    // Navigation state
    const [screen, setScreen] = useState<Screen>({ id: "dashboard" });
    const [history, setHistory] = useState<Screen[]>([]);
    const [direction, setDirection] = useState<"forward" | "back">("forward");
    const [activeTab, setActiveTab] = useState<TabId>("pour-moi");

    // Task completion state
    const [taskCompleted, setTaskCompleted] = useState(false);
    const [toast, setToast] = useState<Toast>({ message: "", visible: false });

    // ─── Generic toast ────────────────────────────────────────────
    const showToast = useCallback((message: string, subtitle?: string, type: Toast["type"] = "success") => {
        setToast({ message, subtitle, visible: true, type });
        setTimeout(() => {
            setToast((t) => ({ ...t, visible: false }));
        }, 2500);
    }, []);

    // ─── Navigation ───────────────────────────────────────────────
    const push = useCallback(
        (next: Screen) => {
            setDirection("forward");
            setHistory((prev) => [...prev, screen]);
            setScreen(next);
        },
        [screen]
    );

    const pop = useCallback(() => {
        const prev = history[history.length - 1];
        if (prev) {
            setDirection("back");
            setHistory((h) => h.slice(0, -1));
            setScreen(prev);
        }
    }, [history]);

    // ─── Tab navigation ───────────────────────────────────────────
    const handleTabChange = useCallback((tab: TabId) => {
        setActiveTab(tab);
        setHistory([]);
        setDirection("forward");
        switch (tab) {
            case "pour-moi":
                setScreen({ id: "dashboard" });
                break;
            case "ressources":
                setScreen({ id: "ressources" });
                break;
            case "messagerie":
                setScreen({ id: "messagerie" });
                break;
            case "mes-informations":
                setScreen({ id: "infos" });
                break;
        }
    }, []);

    // ─── Dashboard handlers ────────────────────────────────────────
    const handleFocusCta = useCallback(() => {
        if (taskCompleted) return;
        setTaskCompleted(true);
        showToast("RDV note avec le Dr. Martin", "Il sera notifie de votre demande. Vous recevrez une confirmation.");
    }, [taskCompleted, showToast]);

    const handleThemeTap = useCallback(
        (theme: "sante" | "admin" | "bienetre") => {
            push({ id: "theme", theme });
        },
        [push]
    );

    const handleNotificationPress = useCallback(() => {
        showToast("2 nouvelles notifications", "Renouvellement ordonnance + message IDEC", "info");
    }, [showToast]);

    const handleIdecPress = useCallback(() => {
        showToast("Message envoye a Sophie", "Votre IDEC vous repondra dans les plus brefs delais.", "success");
    }, [showToast]);

    const handleSkipFocus = useCallback(() => {
        showToast("Reporte a demain", "Cette tache sera dans votre focus de demain.", "info");
    }, [showToast]);

    // ─── Detect if on a detail screen (hide tab bar) ──────────────
    const isDetailScreen = screen.id === "theme";

    // ─── Render ───────────────────────────────────────────────────
    return (
        <div
            style={{
                position: "relative",
                width: "100%",
                height: "100%",
                overflow: "hidden",
                background: monka.colors.bgPrimary,
                display: "flex",
                flexDirection: "column",
            }}
        >
            {/* ═══ Screen Content ═══ */}
            <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
                <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                        key={screen.id + (screen.id === "theme" ? `-${screen.theme}` : "")}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={springTransition}
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            overflow: "auto",
                            WebkitOverflowScrolling: "touch",
                        }}
                    >
                        {screen.id === "dashboard" && (
                            <SDashboardV2
                                onThemeTap={handleThemeTap}
                                onFocusCta={handleFocusCta}
                                onNotificationPress={handleNotificationPress}
                                onIdecPress={handleIdecPress}
                                onSkipFocus={handleSkipFocus}
                                taskCompleted={taskCompleted}
                            />
                        )}

                        {screen.id === "theme" && (
                            <SThemeDetail
                                theme={screen.theme}
                                onBack={pop}
                            />
                        )}

                        {screen.id === "ressources" && <ResourcesScreen />}
                        {screen.id === "messagerie" && <MessagerieScreen />}
                        {screen.id === "infos" && <InfosScreen />}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* ═══ Bottom Tab Bar ═══ */}
            {!isDetailScreen && (
                <OBottomTabBar
                    activeTab={activeTab}
                    onTabChange={handleTabChange}
                />
            )}

            {/* ═══ Toast Overlay ═══ */}
            <AnimatePresence>
                {toast.visible && (
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        style={{
                            position: "absolute",
                            bottom: isDetailScreen ? 24 : 70,
                            left: 16,
                            right: 16,
                            zIndex: 1000,
                            background: TOAST_COLORS[toast.type || "success"],
                            borderRadius: monka.radius.card,
                            padding: `${monka.spacing.lg}px ${monka.spacing.xl}px`,
                            boxShadow: `0 8px 32px ${TOAST_COLORS[toast.type || "success"]}50`,
                            display: "flex",
                            alignItems: "flex-start",
                            gap: monka.spacing.md,
                        }}
                    >
                        <ToastIcon type={toast.type || "success"} />
                        <div>
                            <span
                                style={{
                                    fontSize: monka.font.size.body,
                                    fontWeight: monka.font.weight.bold,
                                    color: "white",
                                    fontFamily: monka.font.family,
                                    display: "block",
                                }}
                            >
                                {toast.message}
                            </span>
                            {toast.subtitle && (
                                <span
                                    style={{
                                        fontSize: monka.font.size.footnote,
                                        color: "rgba(255,255,255,0.85)",
                                        fontFamily: monka.font.family,
                                        display: "block",
                                        marginTop: 4,
                                        lineHeight: 1.4,
                                    }}
                                >
                                    {toast.subtitle}
                                </span>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SAppDemo;
