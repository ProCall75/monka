"use client";

import React, { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { monka } from "../monka-design-tokens";
import { IconClipboard, IconChat, IconChart } from "../foundation/MonkaIcons";

// ─── Types ────────────────────────────────────────────────────────
export interface OnboardingSlide {
    icon: React.ReactNode;
    title: string;
    description: string;
}

export interface SOnboardingProps {
    slides?: OnboardingSlide[];
    onComplete?: () => void;
}

// ─── Default slides matching design-methods.md §9 ─────────────────
const DEFAULT_SLIDES: OnboardingSlide[] = [
    {
        icon: <IconClipboard size={44} color={monka.colors.ctaPrimary} />,
        title: "Vos actions pour Francine",
        description:
            "L'app organise tout en actions simples, triées par priorité. Vous n'avez qu'à suivre, étape par étape.",
    },
    {
        icon: <IconChat size={44} color={monka.colors.ctaPrimary} />,
        title: "Sophie vous accompagne",
        description:
            "Une infirmière coordinatrice à votre écoute. Écrivez-lui pour toute question, elle répond sous 24h.",
    },
    {
        icon: <IconChart size={44} color={monka.colors.ctaPrimary} />,
        title: "Chaque action compte",
        description:
            "Plus vous avancez, plus la situation de Francine s'améliore. Suivez votre progression thème par thème.",
    },
];

// ─── Animations ───────────────────────────────────────────────────
const iconSpring = {
    type: "spring" as const,
    stiffness: 260,
    damping: 18,
};

const textFadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: 0.15, duration: 0.4 },
};

const descFadeIn = {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: 0.3, duration: 0.4 },
};

// ─── Component ────────────────────────────────────────────────────
const SOnboarding: React.FC<SOnboardingProps> = ({
    slides = DEFAULT_SLIDES,
    onComplete,
}) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: false,
        dragFree: false,
        align: "center",
    });
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [canScrollNext, setCanScrollNext] = useState(true);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
        setCanScrollNext(emblaApi.canScrollNext());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on("select", onSelect);
        return () => {
            emblaApi.off("select", onSelect);
        };
    }, [emblaApi, onSelect]);

    const handleNext = () => {
        if (canScrollNext) {
            emblaApi?.scrollNext();
        } else {
            onComplete?.();
        }
    };

    const isLast = selectedIndex === slides.length - 1;

    return (
        <div
            style={{
                background: monka.colors.bgPrimary,
                minHeight: "100vh",
                fontFamily: monka.font.family,
                display: "flex",
                flexDirection: "column",
                paddingTop: monka.safeArea.top + 24,
                paddingBottom: monka.safeArea.bottom + 20,
            }}
        >
            {/* ── Top bar: logo + Skip ────────────────────── */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: `0 ${monka.spacing.lg}px`,
                    marginBottom: monka.spacing.xl,
                }}
            >
                <span
                    style={{
                        fontSize: monka.font.size.title3,
                        fontWeight: monka.font.weight.bold,
                        color: monka.colors.ctaPrimary,
                        letterSpacing: -0.3,
                    }}
                >
                    monka
                </span>
                <button
                    onClick={onComplete}
                    style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: monka.colors.textMuted,
                        fontSize: monka.font.size.body,
                        fontFamily: monka.font.family,
                        fontWeight: monka.font.weight.medium,
                    }}
                >
                    Passer
                </button>
            </div>

            {/* ── Embla Carousel ─────────────────────────── */}
            <div ref={emblaRef} style={{ overflow: "hidden", flex: 1 }}>
                <div style={{ display: "flex", height: "100%" }}>
                    {slides.map((slide, i) => (
                        <div
                            key={i}
                            style={{
                                flex: "0 0 100%",
                                minWidth: 0,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                padding: `0 ${monka.spacing.xxl}px`,
                            }}
                        >
                            <AnimatePresence mode="wait">
                                {selectedIndex === i && (
                                    <motion.div
                                        key={`slide-${i}`}
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            textAlign: "center",
                                            width: "100%",
                                            maxWidth: 320,
                                        }}
                                    >
                                        {/* Icon container — larger, elevated */}
                                        <motion.div
                                            initial={{ scale: 0, rotate: -15 }}
                                            animate={{ scale: 1, rotate: 0 }}
                                            transition={iconSpring}
                                            style={{
                                                width: 96,
                                                height: 96,
                                                borderRadius: 24,
                                                background: `linear-gradient(135deg, ${monka.colors.ctaPrimary}15, ${monka.colors.ctaPrimary}08)`,
                                                border: `1.5px solid ${monka.colors.ctaPrimary}20`,
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                marginBottom: monka.spacing.xxl,
                                                boxShadow: `0 8px 32px ${monka.colors.ctaPrimary}15`,
                                            }}
                                        >
                                            {slide.icon}
                                        </motion.div>

                                        {/* Text bubble — card style per spec §9 */}
                                        <motion.div
                                            {...textFadeIn}
                                            style={{
                                                background: monka.colors.bgCard,
                                                borderRadius: monka.radius.card,
                                                padding: `${monka.spacing.xl}px ${monka.spacing.lg}px`,
                                                boxShadow: monka.shadow.elevated,
                                                width: "100%",
                                            }}
                                        >
                                            <h2
                                                style={{
                                                    margin: "0 0 10px",
                                                    fontSize: monka.font.size.title2,
                                                    fontWeight: monka.font.weight.bold,
                                                    color: monka.colors.textDark,
                                                    lineHeight: 1.25,
                                                }}
                                            >
                                                {slide.title}
                                            </h2>
                                            <motion.p
                                                {...descFadeIn}
                                                style={{
                                                    margin: 0,
                                                    fontSize: monka.font.size.subhead,
                                                    color: monka.colors.textBody,
                                                    lineHeight: 1.55,
                                                }}
                                            >
                                                {slide.description}
                                            </motion.p>
                                        </motion.div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Bottom: Dots + CTA ─────────────────────── */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: monka.spacing.xl,
                    padding: `0 ${monka.spacing.lg}px`,
                }}
            >
                {/* Pagination dots — smooth morph per spec */}
                <div style={{ display: "flex", gap: monka.spacing.sm }}>
                    {slides.map((_, i) => (
                        <motion.div
                            key={i}
                            animate={{
                                width: i === selectedIndex ? 28 : 8,
                                background:
                                    i === selectedIndex
                                        ? monka.colors.ctaPrimary
                                        : monka.colors.progressInactive,
                            }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            style={{ height: 8, borderRadius: 4 }}
                        />
                    ))}
                </div>

                {/* CTA button — outline → filled on last slide */}
                <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={handleNext}
                    animate={{
                        background: isLast ? monka.colors.ctaPrimary : "transparent",
                        color: isLast ? monka.colors.textWhite : monka.colors.ctaPrimary,
                        boxShadow: isLast
                            ? `0 6px 20px ${monka.colors.ctaPrimary}40`
                            : "0 0 0 transparent",
                    }}
                    transition={{ duration: 0.3 }}
                    style={{
                        width: "100%",
                        maxWidth: 320,
                        padding: "15px 24px",
                        border: isLast ? "none" : `1.5px solid ${monka.colors.ctaPrimary}`,
                        borderRadius: monka.radius.button,
                        fontSize: monka.font.size.subhead,
                        fontWeight: monka.font.weight.bold,
                        cursor: "pointer",
                        fontFamily: monka.font.family,
                    }}
                >
                    {isLast ? "C'est parti !" : "Suivant"}
                </motion.button>
            </div>
        </div>
    );
};

export default SOnboarding;
