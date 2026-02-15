"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as Accordion from "@radix-ui/react-accordion";
import * as Progress from "@radix-ui/react-progress";
import { monka } from "../monka-design-tokens";
import ActionCard from "../composites/ActionCard";
import type { ActionCardProps } from "../composites/ActionCard";
import { IconArrowRight } from "../foundation/MonkaIcons";

// ─── Types ────────────────────────────────────────────────────────
export interface ThemeAction extends Omit<ActionCardProps, "index"> {
    id: string;
    completed?: boolean;
}

export interface OThemeSectionProps {
    /** Theme icon (ReactNode — use MonkaIcons) */
    icon: React.ReactNode;
    /** Theme title (e.g. "Santé de Francine") */
    title: string;
    /** Theme accent color */
    accentColor?: string;
    /** Actions within this theme */
    actions: ThemeAction[];
    /** Max visible actions before "voir tout" */
    maxVisible?: number;
    /** Callback when "voir tout" is pressed */
    onViewAll?: () => void;
    /** Callback when an action is completed */
    onActionComplete?: (actionId: string) => void;
    /** Whether section is initially open */
    defaultOpen?: boolean;
}

// ─── Animations ───────────────────────────────────────────────────
const sectionVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
    },
};

// ─── Component ────────────────────────────────────────────────────
const OThemeSection: React.FC<OThemeSectionProps> = ({
    icon,
    title,
    accentColor = monka.colors.ctaPrimary,
    actions,
    maxVisible = 3,
    onViewAll,
    onActionComplete,
    defaultOpen = true,
}) => {
    const [completedIds, setCompletedIds] = useState<Set<string>>(
        new Set(actions.filter((a) => a.completed).map((a) => a.id))
    );

    const activeActions = actions.filter((a) => !completedIds.has(a.id));
    const completedCount = completedIds.size;
    const totalCount = actions.length;
    const progressPercent = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
    const visibleActions = activeActions.slice(0, maxVisible);
    const remainingCount = activeActions.length - visibleActions.length;

    const handleComplete = (id: string) => {
        setCompletedIds((prev) => new Set([...prev, id]));
        onActionComplete?.(id);
    };

    return (
        <motion.div variants={sectionVariants} initial="hidden" animate="visible">
            <Accordion.Root
                type="single"
                collapsible
                defaultValue={defaultOpen ? "theme" : undefined}
            >
                <Accordion.Item value="theme" style={{ border: "none" }}>
                    {/* ── Header ─────────────────────────────────── */}
                    <Accordion.Trigger
                        style={{
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            gap: monka.spacing.sm,
                            padding: `${monka.spacing.md}px 0`,
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            fontFamily: monka.font.family,
                        }}
                    >
                        {/* Icon */}
                        <span style={{ display: "flex", alignItems: "center" }}>{icon}</span>

                        {/* Title + count */}
                        <span
                            style={{
                                flex: 1,
                                textAlign: "left",
                                fontSize: monka.font.size.subhead,
                                fontWeight: monka.font.weight.semibold,
                                color: monka.colors.textDark,
                            }}
                        >
                            {title}
                        </span>

                        {/* Counter */}
                        <span
                            style={{
                                fontSize: monka.font.size.footnote,
                                color: monka.colors.textMuted,
                                fontWeight: monka.font.weight.medium,
                            }}
                        >
                            {completedCount}/{totalCount}
                        </span>

                        {/* Arrow */}
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            style={{
                                transition: "transform 200ms",
                                color: monka.colors.textMuted,
                            }}
                        >
                            <path
                                d="M6 4l4 4-4 4"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </Accordion.Trigger>

                    {/* ── Progress bar ────────────────────────────── */}
                    <Progress.Root
                        value={progressPercent}
                        style={{
                            height: 4,
                            borderRadius: 2,
                            background: monka.colors.separator,
                            overflow: "hidden",
                            marginBottom: monka.spacing.md,
                        }}
                    >
                        <Progress.Indicator asChild>
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${progressPercent}%` }}
                                transition={{
                                    duration: 0.6,
                                    ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number], // overshoot
                                }}
                                style={{
                                    height: "100%",
                                    borderRadius: 2,
                                    background: accentColor,
                                }}
                            />
                        </Progress.Indicator>
                    </Progress.Root>

                    {/* ── Content: Action cards ────────────────────── */}
                    <Accordion.Content
                        style={{
                            overflow: "hidden",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: monka.spacing.sm + 2,
                                paddingBottom: monka.spacing.md,
                            }}
                        >
                            <AnimatePresence mode="popLayout">
                                {visibleActions.map((action, i) => (
                                    <ActionCard
                                        key={action.id}
                                        type={action.type}
                                        title={action.title}
                                        forWho={action.forWho}
                                        deadline={action.deadline}
                                        ctaLabel={action.ctaLabel}
                                        description={action.description}
                                        onCtaPress={action.onCtaPress}
                                        onComplete={() => handleComplete(action.id)}
                                        index={i}
                                    />
                                ))}
                            </AnimatePresence>

                            {/* "voir tout" link */}
                            {remainingCount > 0 && (
                                <button
                                    onClick={onViewAll}
                                    style={{
                                        background: "none",
                                        border: "none",
                                        cursor: "pointer",
                                        padding: `${monka.spacing.sm}px 0`,
                                        textAlign: "center",
                                        fontSize: monka.font.size.body,
                                        color: accentColor,
                                        fontWeight: monka.font.weight.medium,
                                        fontFamily: monka.font.family,
                                    }}
                                >
                                    voir tout ({activeActions.length}) <IconArrowRight size={12} color={accentColor} />
                                </button>
                            )}
                        </div>
                    </Accordion.Content>
                </Accordion.Item>
            </Accordion.Root>
        </motion.div>
    );
};

export default OThemeSection;
