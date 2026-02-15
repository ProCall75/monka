"use client";

import React from "react";
import { motion } from "framer-motion";
import { monka } from "../monka-design-tokens";
import OThemeSection from "./OThemeSection";
import ActionCard from "../composites/ActionCard";
import type { ThemeAction } from "./OThemeSection";
import { IconInfo } from "../foundation/MonkaIcons";

// ─── Types ────────────────────────────────────────────────────────
export interface ThemeGroup {
    id: string;
    icon: React.ReactNode;
    title: string;
    accentColor: string;
    actions: ThemeAction[];
}

export interface OTaskFeedProps {
    /** Name of the person we're caring for */
    forWho: string;
    /** All theme groups with their actions */
    themes: ThemeGroup[];
    /** SectionIntro title override */
    greeting?: string;
    /** Optional subtitle */
    subtitle?: string;
    /** Callback when drill-down is pressed */
    onViewAll?: (themeId: string) => void;
    /** Callback when an action is completed */
    onActionComplete?: (themeId: string, actionId: string) => void;
}

// ─── Component ────────────────────────────────────────────────────
const OTaskFeed: React.FC<OTaskFeedProps> = ({
    forWho,
    themes,
    greeting,
    subtitle,
    onViewAll,
    onActionComplete,
}) => {
    // Extract urgent actions (SEC/MED) from all themes
    const urgentActions: (ThemeAction & { themeId: string })[] = [];
    const infoActions: ThemeAction[] = [];

    themes.forEach((theme) => {
        theme.actions.forEach((action) => {
            if (
                (action.type === "SEC" || (action.type === "MED" && action.deadline)) &&
                !action.completed
            ) {
                urgentActions.push({ ...action, themeId: theme.id });
            }
            if (action.type === "INFO" && !action.completed) {
                infoActions.push(action);
            }
        });
    });

    // Theme sections without urgent/info (they're shown separately)
    const themeSections = themes.map((theme) => ({
        ...theme,
        actions: theme.actions.filter(
            (a) =>
                a.type !== "INFO" &&
                !(
                    (a.type === "SEC" || (a.type === "MED" && a.deadline)) &&
                    !a.completed
                )
        ),
    }));

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: monka.spacing.lg,
                fontFamily: monka.font.family,
            }}
        >
            {/* ── Section Intro ────────────────────────────── */}
            <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                style={{ padding: `0 ${monka.spacing.xs}px` }}
            >
                <h2
                    style={{
                        margin: 0,
                        fontSize: monka.font.size.title2,
                        fontWeight: monka.font.weight.bold,
                        color: monka.colors.textDark,
                    }}
                >
                    {greeting || `Aujourd'hui pour ${forWho}`}
                </h2>
                {subtitle && (
                    <p
                        style={{
                            margin: "4px 0 0",
                            fontSize: monka.font.size.body,
                            color: monka.colors.textMuted,
                        }}
                    >
                        {subtitle}
                    </p>
                )}
            </motion.div>

            {/* ── 1. Urgent actions (SEC/MED) at top ────────── */}
            {urgentActions.length > 0 && (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: monka.spacing.sm,
                    }}
                >
                    {urgentActions.map((action, i) => (
                        <ActionCard
                            key={action.id}
                            type={action.type}
                            title={action.title}
                            forWho={action.forWho}
                            deadline={action.deadline}
                            ctaLabel={action.ctaLabel}
                            onCtaPress={action.onCtaPress}
                            onComplete={() =>
                                onActionComplete?.(action.themeId, action.id)
                            }
                            index={i}
                        />
                    ))}
                </div>
            )}

            {/* ── 2. Theme sections ─────────────────────────── */}
            {themeSections
                .filter((t) => t.actions.length > 0)
                .map((theme, i) => (
                    <OThemeSection
                        key={theme.id}
                        icon={theme.icon}
                        title={theme.title}
                        accentColor={theme.accentColor}
                        actions={theme.actions}
                        maxVisible={3}
                        defaultOpen={i === 0}
                        onViewAll={() => onViewAll?.(theme.id)}
                        onActionComplete={(actionId) =>
                            onActionComplete?.(theme.id, actionId)
                        }
                    />
                ))}

            {/* ── 3. Conseils (INFO) at bottom ──────────────── */}
            {infoActions.length > 0 && (
                <div>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: monka.spacing.sm,
                            padding: `${monka.spacing.md}px 0`,
                        }}
                    >
                        <IconInfo size={18} color="#F59E0B" />
                        <span
                            style={{
                                fontSize: monka.font.size.subhead,
                                fontWeight: monka.font.weight.semibold,
                                color: monka.colors.textDark,
                            }}
                        >
                            Conseils pour vous
                        </span>
                    </div>

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: monka.spacing.xs,
                        }}
                    >
                        {infoActions.slice(0, 3).map((action, i) => (
                            <motion.div
                                key={action.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: i * 0.05, duration: 0.3 }}
                                style={{
                                    background: monka.colors.bgCard,
                                    borderRadius: monka.radius.card,
                                    padding: `${monka.spacing.md}px ${monka.spacing.lg}px`,
                                    borderLeft: "3px solid #F59E0B",
                                    boxShadow: monka.shadow.subtle,
                                }}
                            >
                                <p
                                    style={{
                                        margin: 0,
                                        fontSize: monka.font.size.body,
                                        color: monka.colors.textBody,
                                        lineHeight: 1.4,
                                    }}
                                >
                                    {action.title}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default OTaskFeed;
