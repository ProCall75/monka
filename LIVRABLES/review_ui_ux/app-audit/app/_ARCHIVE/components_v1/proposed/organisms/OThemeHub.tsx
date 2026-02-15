"use client";

import React from "react";
import { motion } from "framer-motion";
import { monka } from "../monka-design-tokens";
import ThemeHubCard from "../composites/ThemeHubCard";
import type { ThemeHubCardProps } from "../composites/ThemeHubCard";

// ─── Types ────────────────────────────────────────────────────────
export interface OThemeHubProps {
    /** Theme cards to display */
    themes: Omit<ThemeHubCardProps, "onPress">[];
    /** Click handler receiving theme index */
    onThemePress?: (index: number) => void;
}

// ─── Component ────────────────────────────────────────────────────
const OThemeHub: React.FC<OThemeHubProps> = ({ themes, onThemePress }) => {
    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            style={{ fontFamily: monka.font.family }}
        >
            {/* Section header */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: monka.spacing.md,
                }}
            >
                <span
                    style={{
                        fontSize: monka.font.size.subhead,
                        fontWeight: monka.font.weight.bold,
                        color: monka.colors.textDark,
                    }}
                >
                    Vos thèmes
                </span>
                <span
                    style={{
                        fontSize: monka.font.size.caption,
                        color: monka.colors.textMuted,
                        fontWeight: monka.font.weight.medium,
                    }}
                >
                    {themes.length} thème{themes.length > 1 ? "s" : ""}
                </span>
            </div>

            {/* Theme cards */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: monka.spacing.sm + 2,
                }}
            >
                {themes.map((theme, i) => (
                    <motion.div
                        key={theme.title}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08, duration: 0.3 }}
                    >
                        <ThemeHubCard
                            {...theme}
                            onPress={() => onThemePress?.(i)}
                        />
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
};

export default OThemeHub;
