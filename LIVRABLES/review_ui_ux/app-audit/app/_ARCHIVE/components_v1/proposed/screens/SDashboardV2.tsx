"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { monka } from "../monka-design-tokens";

// ─── Organisms
import OWeeklySnapshot from "../organisms/OWeeklySnapshot";
import OTodayFocus from "../organisms/OTodayFocus";
import OThemeHub from "../organisms/OThemeHub";
import OResourceCarousel from "../organisms/OResourceCarousel";

// ─── Composites
import IDECQuickContact from "../composites/IDECQuickContact";
import WeeklyRecapCard from "../composites/WeeklyRecapCard";

// ─── Atoms
import PhaseBadge from "../atoms/PhaseBadge";

// ─── Icons
import {
    IconMedical,
    IconClipboard,
    IconHeart,
    IconTarget,
    IconStar,
    IconBell,
    IconInfo,
} from "../foundation/MonkaIcons";

// ─── Props ────────────────────────────────────────────────────────
export interface SDashboardV2Props {
    /** Called when a theme card is tapped */
    onThemeTap?: (theme: "sante" | "admin" | "bienetre") => void;
    /** Called when the focus CTA is tapped */
    onFocusCta?: () => void;
    /** Called when the notification bell is tapped */
    onNotificationPress?: () => void;
    /** Called when IDEC contact is tapped */
    onIdecPress?: () => void;
    /** Called when the "skip" / "plus tard" is tapped */
    onSkipFocus?: () => void;
    /** Whether the main task has been completed */
    taskCompleted?: boolean;
}

const THEME_KEYS: ("sante" | "admin" | "bienetre")[] = ["sante", "admin", "bienetre"];

// ─── Component ────────────────────────────────────────────────────
const SDashboardV2: React.FC<SDashboardV2Props> = ({ onThemeTap, onFocusCta, onNotificationPress, onIdecPress, onSkipFocus, taskCompleted = false }) => {
    const [showRecap, setShowRecap] = useState(false);

    return (
        <div
            style={{
                background: monka.colors.bgPrimary,
                minHeight: "100%",
                fontFamily: monka.font.family,
                overflowX: "hidden",
            }}
        >


            {/* ═══ Header ═══ */}
            <motion.header
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                    padding: `${monka.spacing.md}px ${monka.spacing.xl}px`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <div>
                    <span
                        style={{
                            fontSize: monka.font.size.title2,
                            fontWeight: monka.font.weight.bold,
                            color: monka.colors.textDark,
                            lineHeight: 1.1,
                            display: "block",
                        }}
                    >
                        Bonjour, Amel
                    </span>
                    <span
                        style={{
                            fontSize: monka.font.size.body,
                            color: monka.colors.textBody,
                            display: "block",
                            marginTop: 4,
                        }}
                    >
                        Accompagnement de Nadia
                    </span>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: monka.spacing.md }}>
                    {/* Notification bell */}
                    <motion.button
                        whileTap={{ scale: 0.92 }}
                        onClick={onNotificationPress}
                        style={{
                            position: "relative",
                            width: 36,
                            height: 36,
                            borderRadius: monka.radius.full,
                            background: monka.colors.bgCard,
                            border: "none",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            boxShadow: monka.shadow.subtle,
                        }}
                    >
                        <IconBell size={18} color={monka.colors.textDark} />
                        {/* Badge */}
                        <div
                            style={{
                                position: "absolute",
                                top: 6,
                                right: 6,
                                width: 8,
                                height: 8,
                                borderRadius: 4,
                                background: "#DC2626",
                                border: `2px solid ${monka.colors.bgPrimary}`,
                            }}
                        />
                    </motion.button>
                </div>
            </motion.header>

            {/* ═══ Content ═══ */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: monka.spacing.xl,
                    padding: `0 ${monka.spacing.xl}px`,
                    paddingBottom: 80,
                }}
            >
                {/* ─── Section 1: Weekly Snapshot ─── */}
                <OWeeklySnapshot
                    domains={[
                        { label: "Santé", value: taskCompleted ? 75 : 65, color: monka.colors.themeSante },
                        { label: "Admin", value: 35, color: monka.colors.themeAdmin },
                        { label: "Bien-être", value: 80, color: monka.colors.themeBienEtre },
                    ]}
                    streak={taskCompleted ? 6 : 5}
                    phase={2}
                    forWho="Nadia"
                />

                {/* ─── Section 2: Today's Focus ─── */}
                <OTodayFocus
                    title={taskCompleted ? "Bilan sanguin annuel" : "Renouveler l'ordonnance"}
                    description={taskCompleted
                        ? "Le prochain bilan de Nadia est prévu dans 2 mois. Contactez le laboratoire pour réserver un créneau."
                        : "L'ordonnance de Nadia expire le 18 février. Prenez rendez-vous avec le Dr. Martin ou utilisez la téléconsultation."
                    }
                    whyItMatters={taskCompleted
                        ? "Un bilan sanguin régulier permet de surveiller l'évolution de la santé de Nadia."
                        : "Sans renouvellement, les médicaments habituels ne pourront plus être délivrés à la pharmacie."
                    }
                    theme="Santé"
                    themeColor={monka.colors.themeSante}
                    forWho="Nadia"
                    priority={taskCompleted ? "recommended" : "urgent"}
                    icon={<IconMedical size={20} color={monka.colors.themeSante} />}
                    ctaLabel={taskCompleted ? "Contacter le labo" : "Prendre RDV"}
                    onCta={onFocusCta}
                />

                {/* ─── Section 3: IDEC Quick Contact ─── */}
                <IDECQuickContact
                    name="Sophie"
                    role="Votre IDEC"
                    isOnline
                    onPress={onIdecPress}
                />

                {/* ─── Section 4: Theme Hub ─── */}
                <OThemeHub
                    themes={[
                        {
                            title: "Santé",
                            subtitle: "Suivi médical, traitements et rendez-vous",
                            forWho: "Nadia",
                            color: monka.colors.themeSante,
                            progress: taskCompleted ? 75 : 65,
                            pendingActions: taskCompleted ? 2 : 3,
                            icon: <IconTarget size={16} />,
                        },
                        {
                            title: "Démarches",
                            subtitle: "Aide financière, droits, MDPH, CAF",
                            forWho: "Nadia",
                            color: monka.colors.themeAdmin,
                            progress: 35,
                            pendingActions: 5,
                            icon: <IconClipboard size={16} />,
                        },
                        {
                            title: "Bien-être",
                            subtitle: "Prendre soin de vous aussi",
                            color: monka.colors.themeBienEtre,
                            progress: 80,
                            pendingActions: 1,
                            icon: <IconStar size={16} />,
                        },
                    ]}
                    onThemePress={(i) => onThemeTap?.(THEME_KEYS[i])}
                />

                {/* ─── Section 5: Weekly Recap Toggle ─── */}
                <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowRecap((v) => !v)}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: monka.spacing.sm,
                        padding: monka.spacing.md,
                        borderRadius: monka.radius.button,
                        background: showRecap ? `${monka.colors.ctaPrimary}08` : monka.colors.bgCard,
                        border: `1px solid ${showRecap ? monka.colors.ctaPrimary + "20" : monka.colors.separator}`,
                        cursor: "pointer",
                        fontFamily: monka.font.family,
                        fontSize: monka.font.size.body,
                        fontWeight: monka.font.weight.medium,
                        color: showRecap ? monka.colors.ctaPrimary : monka.colors.textBody,
                        width: "100%",
                    }}
                >
                    {showRecap ? "Masquer le récap" : <><svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ display: "inline", verticalAlign: "-2px" }}><rect x="2" y="8" width="3" height="6" rx="0.5" fill="currentColor" opacity={0.5} /><rect x="6.5" y="4" width="3" height="10" rx="0.5" fill="currentColor" opacity={0.7} /><rect x="11" y="6" width="3" height="8" rx="0.5" fill="currentColor" /></svg>{" "}Voir le récap de la semaine</>}
                </motion.button>

                <AnimatePresence>
                    {showRecap && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            style={{ overflow: "hidden" }}
                        >
                            <WeeklyRecapCard
                                actionsCompleted={4}
                                actionsTotal={9}
                                rdvCount={1}
                                articlesRead={2}
                                streak={5}
                                forWho="Nadia"
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* ─── Section 6: Resource Carousel ─── */}
                <div style={{ margin: `0 -${monka.spacing.xl}px` }}>
                    <OResourceCarousel
                        title="Articles recommandés"
                        subtitle="Sélectionnés pour votre situation"
                        resources={[
                            {
                                title: "Le renouvellement d'ordonnance : guide pratique",
                                readingTime: "3 min",
                                category: "Santé",
                                categoryColor: monka.colors.themeSante,
                                icon: <IconTarget size={20} color={monka.colors.themeSante} />,
                            },
                            {
                                title: "Aide financière : connaître vos droits",
                                readingTime: "5 min",
                                category: "Démarches",
                                categoryColor: monka.colors.themeAdmin,
                                icon: <IconClipboard size={20} color={monka.colors.themeAdmin} />,
                            },
                            {
                                title: "Prendre soin de soi quand on est aidant",
                                readingTime: "4 min",
                                category: "Bien-être",
                                categoryColor: monka.colors.themeBienEtre,
                                icon: <IconHeart size={20} color={monka.colors.themeBienEtre} />,
                            },
                            {
                                title: "Comprendre les troubles cognitifs",
                                readingTime: "6 min",
                                category: "Santé",
                                categoryColor: monka.colors.themeSante,
                                icon: <IconInfo size={20} color={monka.colors.themeSante} />,
                            },
                        ]}
                    />
                </div>
            </div>
        </div>
    );
};

export default SDashboardV2;
