"use client";

import React from "react";
import { motion } from "framer-motion";
import * as Progress from "@radix-ui/react-progress";
import { Toaster, toast } from "sonner";
import { monka } from "../monka-design-tokens";
import OTaskFeed from "../organisms/OTaskFeed";
import type { ThemeGroup } from "../organisms/OTaskFeed";
import { IconBell, IconLock, IconSparkle, IconHeart, IconBook, IconChat, IconPerson } from "../foundation/MonkaIcons";

// ─── Types ────────────────────────────────────────────────────────
export interface SDashboardProps {
    userName: string;
    forWho: string;
    themes: ThemeGroup[];
    isSubscribed?: boolean;
    notifCount?: number;
    onSubscribe?: () => void;
    onNotif?: () => void;
}

// ─── Helpers ──────────────────────────────────────────────────────
function computeProgress(themes: ThemeGroup[]) {
    let done = 0, total = 0;
    themes.forEach((t) => t.actions.forEach((a) => { total++; if (a.completed) done++; }));
    return { done, total };
}

// ─── Component ────────────────────────────────────────────────────
const SDashboard: React.FC<SDashboardProps> = ({
    userName, forWho, themes,
    isSubscribed = false, notifCount = 0,
    onSubscribe, onNotif,
}) => {
    const { done, total } = computeProgress(themes);
    const pct = total > 0 ? (done / total) * 100 : 0;

    const msg = done === 0 ? `Voici vos priorités pour ${forWho}.`
        : done < total / 2 ? `Bien commencé ! ${done}/${total} faites.`
            : done < total ? `Plus que ${total - done} ! Vous y êtes presque.`
                : `Bravo, tout est fait pour ${forWho} !`;

    const handleComplete = (_tid: string, _aid: string) => {
        toast.success("Étape franchie !", {
            description: `Action complétée pour ${forWho}`,
            duration: 2000,
            style: {
                background: monka.colors.checkGreenBg,
                border: `1px solid ${monka.colors.checkGreen}`,
                borderRadius: monka.radius.card,
                fontFamily: monka.font.family,
            },
        });
    };

    return (
        <div style={{ background: monka.colors.bgPrimary, minHeight: "100vh", fontFamily: monka.font.family }}>
            <Toaster position="top-center" />

            {/* ── Sticky Header ──────────────────────────── */}
            <div style={{
                background: monka.colors.headerBg,
                paddingTop: monka.safeArea.top,
                paddingLeft: monka.spacing.lg, paddingRight: monka.spacing.lg,
                paddingBottom: monka.spacing.md,
                position: "sticky", top: 0, zIndex: 10,
            }}>
                {/* Top row */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: monka.spacing.md }}>
                    <span style={{ fontSize: monka.font.size.title3, fontWeight: monka.font.weight.bold, color: monka.colors.ctaPrimary, letterSpacing: -0.3 }}>
                        monka
                    </span>
                    <div style={{ display: "flex", alignItems: "center", gap: monka.spacing.sm }}>
                        {!isSubscribed && (
                            <motion.button whileTap={{ scale: 0.95 }} onClick={onSubscribe} style={{
                                background: `${monka.colors.ctaPrimary}12`, color: monka.colors.ctaPrimary,
                                border: "none", borderRadius: monka.radius.pill,
                                padding: "6px 12px", fontSize: monka.font.size.footnote,
                                fontWeight: monka.font.weight.semibold, cursor: "pointer", fontFamily: monka.font.family,
                                display: "flex", alignItems: "center", gap: 4,
                            }}>
                                S&apos;abonner <IconLock size={12} color={monka.colors.ctaPrimary} />
                            </motion.button>
                        )}
                        <motion.button whileTap={{ scale: 0.9 }} onClick={onNotif} style={{ background: "none", border: "none", cursor: "pointer", position: "relative", padding: 4 }}>
                            <IconBell size={22} color={monka.colors.textDark} />
                            {notifCount > 0 && (
                                <span style={{ position: "absolute", top: 0, right: 0, width: 16, height: 16, borderRadius: "50%", background: "#DC2626", color: "#fff", fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    {notifCount}
                                </span>
                            )}
                        </motion.button>
                    </div>
                </div>

                {/* Greeting */}
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.3 }}>
                    <h1 style={{ margin: 0, fontSize: monka.font.size.title2, fontWeight: monka.font.weight.bold, color: monka.colors.textDark }}>
                        Bonjour, {userName}
                    </h1>
                    <p style={{ margin: "4px 0 12px", fontSize: monka.font.size.body, color: monka.colors.textMuted }}>
                        {msg}
                    </p>
                </motion.div>

                {/* Global progress */}
                <div style={{ display: "flex", alignItems: "center", gap: monka.spacing.sm }}>
                    <Progress.Root value={pct} style={{ flex: 1, height: 6, borderRadius: 3, background: monka.colors.separator, overflow: "hidden" }}>
                        <Progress.Indicator asChild>
                            <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }}
                                transition={{ duration: 0.8, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number] }}
                                style={{ height: "100%", borderRadius: 3, background: monka.colors.ctaPrimary }}
                            />
                        </Progress.Indicator>
                    </Progress.Root>
                    <span style={{ fontSize: monka.font.size.footnote, color: monka.colors.textMuted, fontWeight: monka.font.weight.medium, minWidth: 32 }}>
                        {done}/{total}
                    </span>
                </div>
            </div>

            {/* ── Feed ───────────────────────────────────── */}
            <div style={{ padding: `${monka.spacing.lg}px ${monka.spacing.lg}px ${monka.safeArea.bottom + 80}px` }}>
                <OTaskFeed
                    forWho={forWho} themes={themes}
                    greeting={`Aujourd'hui pour ${forWho}`}
                    subtitle={`${total - done} actions restantes`}
                    onActionComplete={handleComplete}
                />
            </div>

            {/* ── Tab Bar ─────────────────────────────────── */}
            <div style={{
                position: "fixed", bottom: 0, left: 0, right: 0,
                background: "rgba(255,255,255,0.95)", backdropFilter: "blur(20px)",
                borderTop: `${monka.hairline}px solid ${monka.colors.separator}`,
                display: "flex", justifyContent: "space-around",
                padding: `${monka.spacing.sm}px 0 ${monka.safeArea.bottom}px`,
            }}>
                {[
                    { icon: <IconHeart size={20} color={monka.colors.ctaPrimary} />, label: "Pour Moi", active: true },
                    { icon: <IconBook size={20} color={monka.colors.iconGray} />, label: "Ressources", active: false },
                    { icon: <IconChat size={20} color={monka.colors.iconGray} />, label: "Messagerie", active: false },
                    { icon: <IconPerson size={20} color={monka.colors.iconGray} />, label: "Profil", active: false },
                ].map((tab) => (
                    <button key={tab.label} style={{
                        background: "none", border: "none", cursor: "pointer",
                        display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
                        padding: `${monka.spacing.xs}px ${monka.spacing.sm}px`,
                    }}>
                        {tab.icon}
                        <span style={{
                            fontSize: 10,
                            fontWeight: tab.active ? monka.font.weight.semibold : monka.font.weight.regular,
                            color: tab.active ? monka.colors.ctaPrimary : monka.colors.iconGray,
                        }}>{tab.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SDashboard;
