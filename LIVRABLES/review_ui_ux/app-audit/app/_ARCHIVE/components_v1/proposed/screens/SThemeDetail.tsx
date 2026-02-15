"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { monka } from "../monka-design-tokens";

// Organisms
import OProgressJourney from "../organisms/OProgressJourney";
import OResourceCarousel from "../organisms/OResourceCarousel";

// Composites
import AchievementCard from "../composites/AchievementCard";
import ActorCard from "../composites/ActorCard";

// Icons
import { IconArrowRight, IconTarget, IconClipboard, IconStar, IconInfo } from "../foundation/MonkaIcons";

// ─── Types ────────────────────────────────────────────────────────
export interface SThemeDetailProps {
    theme?: "sante" | "admin" | "bienetre";
    /** Navigation callback — called when back button is tapped */
    onBack?: () => void;
}

// ─── Theme Configs ────────────────────────────────────────────────
const THEME_CONFIG = {
    sante: {
        title: "Santé",
        subtitle: "Suivi médical et traitements",
        color: monka.colors.themeSante,
        forWho: "Nadia",
        milestones: [
            { title: "Identifier le médecin traitant", description: "Contacté et premier RDV pris", status: "done" as const, date: "5 fév." },
            { title: "Renouveler l'ordonnance", description: "Prochain renouvellement le 18 fév.", status: "current" as const },
            { title: "Bilan sanguin annuel", description: "Laboratoire d'analyses à contacter", status: "locked" as const },
            { title: "Évaluation gériatrique", description: "Consultation spécialisée", status: "locked" as const },
        ],
        achievements: [
            { title: "Premier RDV pris", description: "Premier rendez-vous médecin organisé", date: "Il y a 5 jours", unlocked: true },
            { title: "Dossier médical complété", description: "Tous les antécédents renseignés", unlocked: false },
        ],
        actors: [
            { name: "Dr. Martin Dupont", specialty: "Medecin generaliste", type: "medecin" as const, distance: "1.2 km", available: true, phone: "01 23 45 67 89" },
            { name: "Pharmacie du Parc", specialty: "Pharmacie", type: "pharmacie" as const, distance: "200 m", available: true },
            { name: "Laboratoire BioSante", specialty: "Analyses medicales", type: "labo" as const, distance: "1.5 km", available: true },
        ],
    },
    admin: {
        title: "Démarches",
        subtitle: "Aide financière et droits",
        color: monka.colors.themeAdmin,
        forWho: "Nadia",
        milestones: [
            { title: "Créer un dossier MDPH", status: "done" as const, date: "1 fév." },
            { title: "Rassembler les justificatifs", description: "Certificats, bilans, CNI", status: "current" as const },
            { title: "Déposer le dossier", status: "locked" as const },
            { title: "Simuler les aides", status: "locked" as const },
        ],
        achievements: [
            { title: "Dossier MDPH créé", description: "Première étape administrative franchie", date: "Il y a 10 jours", unlocked: true },
            { title: "Tous les justificatifs", description: "Réunir l'ensemble des documents", unlocked: false },
        ],
        actors: [
            { name: "CCAS Paris 13", specialty: "Centre communal d'action sociale", type: "ccas" as const, distance: "800 m", available: true },
            { name: "CAF Paris", specialty: "Allocations familiales", type: "caf" as const, distance: "3 km" },
            { name: "MDPH Paris", specialty: "Maison departementale", type: "mdph" as const, distance: "2.1 km", available: true },
        ],
    },
    bienetre: {
        title: "Bien-être",
        subtitle: "Prendre soin de vous aussi",
        color: monka.colors.themeBienEtre,
        forWho: undefined,
        milestones: [
            { title: "Découvrir les ressources répit", status: "done" as const, date: "3 fév." },
            { title: "Premier moment pour vous", description: "Planifier du temps personnel", status: "done" as const, date: "7 fév." },
            { title: "Contact groupe de parole", description: "Échanger avec d'autres aidants", status: "current" as const },
            { title: "Routine bien-être", description: "Installer des habitudes durables", status: "locked" as const },
        ],
        achievements: [
            { title: "Premier article lu", description: "Vous avez consulté une ressource bien-être", date: "Il y a 8 jours", unlocked: true },
            { title: "3 moments pour vous", description: "Prendre du temps 3 fois cette semaine", unlocked: false },
        ],
        actors: [
            { name: "Association Aide et Presence", specialty: "Aide a domicile", type: "aide-domicile" as const, distance: "2.5 km" },
            { name: "Groupe de parole Aidants", specialty: "Soutien psychologique", type: "psy" as const, distance: "1.8 km", available: true },
            { name: "Centre de Repit Les Oliviers", specialty: "Accueil temporaire", type: "repit" as const, distance: "4 km" },
        ],
    },
};

// ─── Tabs ────────────────────────────────────────────────────────
type TabId = "parcours" | "acteurs" | "success";
const TABS: { id: TabId; label: string }[] = [
    { id: "parcours", label: "Parcours" },
    { id: "acteurs", label: "Contacts utiles" },
    { id: "success", label: "Succès" },
];

// ─── Component ────────────────────────────────────────────────────
const SThemeDetail: React.FC<SThemeDetailProps> = ({ theme = "sante", onBack }) => {
    const [activeTab, setActiveTab] = useState<TabId>("parcours");
    const config = THEME_CONFIG[theme];

    return (
        <div
            style={{
                background: monka.colors.bgPrimary,
                minHeight: "100vh",
                fontFamily: monka.font.family,
            }}
        >
            {/* Status bar spacer */}
            <div style={{ height: monka.safeArea.top }} />

            {/* ═══ Header ═══ */}
            <motion.header
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                    padding: `${monka.spacing.md}px ${monka.spacing.xl}px`,
                }}
            >
                {/* Back */}
                <motion.button
                    whileTap={{ scale: 0.92 }}
                    onClick={() => onBack?.()}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        fontFamily: monka.font.family,
                        fontSize: monka.font.size.body,
                        color: monka.colors.ctaPrimary,
                        fontWeight: monka.font.weight.medium,
                        padding: 0,
                        marginBottom: monka.spacing.lg,
                    }}
                >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M10 4L6 8l4 4" stroke={monka.colors.ctaPrimary} strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    Retour
                </motion.button>

                {/* Title */}
                <div style={{ display: "flex", alignItems: "center", gap: monka.spacing.md }}>
                    <div
                        style={{
                            width: 44,
                            height: 44,
                            borderRadius: 14,
                            background: `linear-gradient(135deg, ${config.color}20, ${config.color}08)`,
                            border: `1px solid ${config.color}20`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <IconTarget size={22} color={config.color} />
                    </div>
                    <div>
                        <h1
                            style={{
                                fontSize: monka.font.size.title2,
                                fontWeight: monka.font.weight.bold,
                                color: monka.colors.textDark,
                                margin: 0,
                                lineHeight: 1.1,
                            }}
                        >
                            {config.title}
                        </h1>
                        <span
                            style={{
                                fontSize: monka.font.size.footnote,
                                color: monka.colors.textMuted,
                                display: "block",
                                marginTop: 2,
                            }}
                        >
                            {config.subtitle}
                            {config.forWho && ` · Pour ${config.forWho}`}
                        </span>
                    </div>
                </div>
            </motion.header>

            {/* ═══ Tabs ═══ */}
            <div
                style={{
                    display: "flex",
                    gap: 2,
                    padding: `0 ${monka.spacing.xl}px`,
                    marginTop: monka.spacing.md,
                    marginBottom: monka.spacing.xl,
                    borderBottom: `1px solid ${monka.colors.separator}`,
                }}
            >
                {TABS.map((tab) => (
                    <motion.button
                        key={tab.id}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setActiveTab(tab.id)}
                        style={{
                            flex: 1,
                            padding: `${monka.spacing.md}px ${monka.spacing.sm}px`,
                            fontSize: monka.font.size.footnote,
                            fontWeight: activeTab === tab.id ? monka.font.weight.bold : monka.font.weight.medium,
                            color: activeTab === tab.id ? config.color : monka.colors.textMuted,
                            background: "none",
                            border: "none",
                            borderBottom: activeTab === tab.id ? `2px solid ${config.color}` : "2px solid transparent",
                            cursor: "pointer",
                            fontFamily: monka.font.family,
                            marginBottom: -1,
                        }}
                    >
                        {tab.label}
                    </motion.button>
                ))}
            </div>

            {/* ═══ Tab Content ═══ */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.2 }}
                    style={{
                        padding: `0 ${monka.spacing.xl}px`,
                        paddingBottom: 100,
                    }}
                >
                    {activeTab === "parcours" && (
                        <div style={{ display: "flex", flexDirection: "column", gap: monka.spacing.xl }}>
                            <OProgressJourney
                                theme={config.title}
                                themeColor={config.color}
                                milestones={config.milestones}
                            />

                            {/* Related articles */}
                            <div style={{ margin: `0 -${monka.spacing.xl}px` }}>
                                <OResourceCarousel
                                    title="En lien avec ce thème"
                                    resources={[
                                        {
                                            title: `Guide ${config.title.toLowerCase()} pour les aidants`,
                                            readingTime: "4 min",
                                            category: config.title,
                                            categoryColor: config.color,
                                            icon: <IconInfo size={28} color={config.color} />,
                                        },
                                        {
                                            title: `Questions fréquentes ${config.title.toLowerCase()}`,
                                            readingTime: "3 min",
                                            category: config.title,
                                            categoryColor: config.color,
                                            icon: <IconTarget size={28} color={config.color} />,
                                        },
                                    ]}
                                />
                            </div>
                        </div>
                    )}

                    {activeTab === "acteurs" && (
                        <div style={{ display: "flex", flexDirection: "column", gap: monka.spacing.sm + 2 }}>
                            <span
                                style={{
                                    fontSize: monka.font.size.caption,
                                    fontWeight: monka.font.weight.semibold,
                                    color: monka.colors.textMuted,
                                    textTransform: "uppercase" as const,
                                    letterSpacing: 0.8,
                                    marginBottom: monka.spacing.xs,
                                }}
                            >
                                Professionnels proches de vous
                            </span>
                            {config.actors.map((actor) => (
                                <ActorCard key={actor.name} {...actor} />
                            ))}
                        </div>
                    )}

                    {activeTab === "success" && (
                        <div style={{ display: "flex", flexDirection: "column", gap: monka.spacing.sm + 2 }}>
                            <span
                                style={{
                                    fontSize: monka.font.size.caption,
                                    fontWeight: monka.font.weight.semibold,
                                    color: monka.colors.textMuted,
                                    textTransform: "uppercase" as const,
                                    letterSpacing: 0.8,
                                    marginBottom: monka.spacing.xs,
                                }}
                            >
                                Vos accomplissements
                            </span>
                            {config.achievements.map((ach) => (
                                <AchievementCard
                                    key={ach.title}
                                    title={ach.title}
                                    description={ach.description}
                                    date={ach.date}
                                    icon={<IconStar size={22} color={ach.unlocked ? monka.colors.achievementGold : monka.colors.textMuted} />}
                                    unlocked={ach.unlocked}
                                />
                            ))}
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default SThemeDetail;
