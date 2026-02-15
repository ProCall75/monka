"use client";

import React from "react";
import { motion } from "framer-motion";
import { monka } from "../monka-design-tokens";
import ResourceCard from "../composites/ResourceCard";
import type { ResourceCardProps } from "../composites/ResourceCard";

// ─── Types ────────────────────────────────────────────────────────
export interface OResourceCarouselProps {
    /** Section title */
    title: string;
    /** Subtitle */
    subtitle?: string;
    /** Resources to display */
    resources: Omit<ResourceCardProps, "onPress">[];
    /** Card press handler */
    onCardPress?: (index: number) => void;
}

// ─── Component ────────────────────────────────────────────────────
const OResourceCarousel: React.FC<OResourceCarouselProps> = ({
    title,
    subtitle,
    resources,
    onCardPress,
}) => {
    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            style={{ fontFamily: monka.font.family }}
        >
            {/* Header */}
            <div
                style={{
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "space-between",
                    marginBottom: monka.spacing.md,
                    padding: `0 ${monka.spacing.xl}px`,
                }}
            >
                <div>
                    <span
                        style={{
                            fontSize: monka.font.size.subhead,
                            fontWeight: monka.font.weight.bold,
                            color: monka.colors.textDark,
                            display: "block",
                        }}
                    >
                        {title}
                    </span>
                    {subtitle && (
                        <span
                            style={{
                                fontSize: monka.font.size.footnote,
                                color: monka.colors.textMuted,
                                display: "block",
                                marginTop: 2,
                            }}
                        >
                            {subtitle}
                        </span>
                    )}
                </div>
                <motion.button
                    whileTap={{ scale: 0.97 }}
                    style={{
                        fontSize: monka.font.size.footnote,
                        fontWeight: monka.font.weight.semibold,
                        color: monka.colors.ctaPrimary,
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        fontFamily: monka.font.family,
                        padding: 0,
                    }}
                >
                    Tout voir →
                </motion.button>
            </div>

            {/* Horizontal scroll */}
            <div
                style={{
                    display: "flex",
                    gap: monka.spacing.md,
                    overflowX: "auto",
                    padding: `${monka.spacing.xs}px ${monka.spacing.xl}px ${monka.spacing.md}px`,
                    scrollSnapType: "x mandatory",
                    WebkitOverflowScrolling: "touch",
                    msOverflowStyle: "none",
                    scrollbarWidth: "none",
                }}
            >
                {resources.map((res, i) => (
                    <motion.div
                        key={res.title}
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08, duration: 0.3 }}
                        style={{ scrollSnapAlign: "start", flexShrink: 0 }}
                    >
                        <ResourceCard
                            {...res}
                            onPress={() => onCardPress?.(i)}
                        />
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
};

export default OResourceCarousel;
