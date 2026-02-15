"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { monka } from "../monka-design-tokens";
import MTimelineStep from "../molecules/MTimelineStep";

// ─── Types ────────────────────────────────────────────────────────
export interface OPaywallSheetProps {
    /** Whether the sheet is visible */
    isOpen: boolean;
    /** Close handler */
    onClose?: () => void;
    /** CTA handler */
    onSubscribe?: () => void;
    /** Secondary CTA handler */
    onViewPlans?: () => void;
}

// ─── Component ────────────────────────────────────────────────────
const OPaywallSheet: React.FC<OPaywallSheetProps> = ({
    isOpen,
    onClose,
    onSubscribe,
    onViewPlans,
}) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        style={{
                            position: "fixed",
                            inset: 0,
                            background: monka.colors.overlayDark,
                            zIndex: 50,
                        }}
                    />

                    {/* Sheet */}
                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        style={{
                            position: "fixed",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            zIndex: 51,
                            borderRadius: `${monka.radius.bottomSheet}px ${monka.radius.bottomSheet}px 0 0`,
                            background: monka.colors.bgCard,
                            boxShadow: "0 -8px 32px rgba(0,0,0,0.15)",
                            fontFamily: monka.font.family,
                            maxHeight: "85vh",
                            overflow: "auto",
                        }}
                    >
                        {/* Handle */}
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                paddingTop: monka.spacing.sm,
                                paddingBottom: monka.spacing.xs,
                            }}
                        >
                            <div
                                style={{
                                    width: 36,
                                    height: 4,
                                    borderRadius: 2,
                                    background: monka.colors.separator,
                                }}
                            />
                        </div>

                        <div style={{ padding: `${monka.spacing.lg}px ${monka.spacing.xl}px ${monka.spacing.xxxl}px` }}>
                            {/* Badge */}
                            <div
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 6,
                                    padding: `${monka.spacing.xs + 2}px ${monka.spacing.md}px`,
                                    borderRadius: monka.radius.pill,
                                    background: `${monka.colors.ctaPrimary}10`,
                                    border: `1px solid ${monka.colors.ctaPrimary}20`,
                                    marginBottom: monka.spacing.lg,
                                }}
                            >
                                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                                    <path d="M8 1l2 3 3.5.5-2.5 2.5.5 3.5L8 9l-3.5 1.5.5-3.5L2.5 4.5 6 4l2-3z" fill={monka.colors.ctaPrimary} />
                                </svg>
                                <span
                                    style={{
                                        fontSize: monka.font.size.footnote,
                                        fontWeight: monka.font.weight.bold,
                                        color: monka.colors.ctaPrimary,
                                    }}
                                >
                                    Monka Essentiel
                                </span>
                            </div>

                            {/* Title */}
                            <h2
                                style={{
                                    fontSize: monka.font.size.title2,
                                    fontWeight: monka.font.weight.bold,
                                    color: monka.colors.textDark,
                                    margin: `0 0 ${monka.spacing.sm}px`,
                                    lineHeight: 1.2,
                                }}
                            >
                                Votre essai gratuit de 7 jours
                            </h2>

                            <p
                                style={{
                                    fontSize: monka.font.size.body,
                                    color: monka.colors.textBody,
                                    lineHeight: 1.5,
                                    margin: `0 0 ${monka.spacing.xl}px`,
                                }}
                            >
                                Découvrez toutes les fonctionnalités de Monka sans engagement.
                                Annulez à tout moment.
                            </p>

                            {/* Timeline */}
                            <div style={{ marginBottom: monka.spacing.xl }}>
                                <MTimelineStep
                                    title="Aujourd'hui"
                                    subtitle="Accès complet à toutes les fonctionnalités"
                                    completed
                                />
                                <MTimelineStep
                                    title="Dans 5 jours"
                                    subtitle="Rappel avant la fin de l'essai"
                                    active
                                />
                                <MTimelineStep
                                    title="Dans 7 jours"
                                    subtitle="Vous choisissez si vous continuez"
                                    isLast
                                />
                            </div>

                            {/* CTAs */}
                            <div style={{ display: "flex", flexDirection: "column", gap: monka.spacing.sm }}>
                                <motion.button
                                    whileTap={{ scale: 0.98 }}
                                    onClick={onSubscribe}
                                    style={{
                                        width: "100%",
                                        padding: `${monka.spacing.lg}px`,
                                        borderRadius: monka.radius.button,
                                        background: monka.colors.ctaPrimary,
                                        border: "none",
                                        color: "white",
                                        fontSize: monka.font.size.title3,
                                        fontWeight: monka.font.weight.bold,
                                        fontFamily: monka.font.family,
                                        cursor: "pointer",
                                    }}
                                >
                                    Commencer l'essai gratuit
                                </motion.button>

                                <motion.button
                                    whileTap={{ scale: 0.98 }}
                                    onClick={onViewPlans}
                                    style={{
                                        width: "100%",
                                        padding: `${monka.spacing.md}px`,
                                        borderRadius: monka.radius.button,
                                        background: "transparent",
                                        border: `1px solid ${monka.colors.separator}`,
                                        color: monka.colors.textBody,
                                        fontSize: monka.font.size.body,
                                        fontWeight: monka.font.weight.medium,
                                        fontFamily: monka.font.family,
                                        cursor: "pointer",
                                    }}
                                >
                                    Voir les abonnements
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default OPaywallSheet;
