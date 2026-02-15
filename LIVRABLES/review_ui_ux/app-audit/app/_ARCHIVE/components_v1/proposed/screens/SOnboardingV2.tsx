"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { monka } from "../monka-design-tokens";
import MProgressBar from "../atoms/MProgressBar";
import MButton from "../atoms/MButton";
import { IconTarget, IconHeart, IconClipboard, IconStar, IconArrowRight, IconCheck } from "../foundation/MonkaIcons";

// ─── Onboarding Steps ─────────────────────────────────────────────
interface OnboardingStep {
    id: string;
    type: "welcome" | "choice" | "input" | "multi-select" | "summary";
    title: string;
    subtitle?: string;
    icon: React.ReactNode;
    options?: { id: string; label: string; icon?: React.ReactNode }[];
    inputPlaceholder?: string;
}

const STEPS: OnboardingStep[] = [
    {
        id: "welcome",
        type: "welcome",
        title: "Bienvenue sur Monka",
        subtitle: "L'application qui vous accompagne au quotidien dans votre rôle d'aidant.",
        icon: <IconStar size={48} color={monka.colors.ctaPrimary} />,
    },
    {
        id: "relationship",
        type: "choice",
        title: "Quel est votre lien avec votre proche ?",
        subtitle: "Cela nous aide à personnaliser votre accompagnement.",
        icon: <IconHeart size={32} color={monka.colors.ctaPrimary} />,
        options: [
            { id: "parent", label: "Mon parent (père/mère)" },
            { id: "conjoint", label: "Mon conjoint(e)" },
            { id: "enfant", label: "Mon enfant" },
            { id: "grandparent", label: "Mon grand-parent" },
            { id: "autre", label: "Autre proche" },
        ],
    },
    {
        id: "prenom",
        type: "input",
        title: "Comment s'appelle votre proche ?",
        subtitle: "Son prénom nous permettra de personnaliser vos recommandations.",
        icon: <IconTarget size={32} color={monka.colors.ctaPrimary} />,
        inputPlaceholder: "Prénom de votre proche",
    },
    {
        id: "situation",
        type: "choice",
        title: "Quelle est la situation de votre proche ?",
        subtitle: "Sélectionnez ce qui correspond le mieux.",
        icon: <IconClipboard size={32} color={monka.colors.ctaPrimary} />,
        options: [
            { id: "dependance", label: "Perte d'autonomie" },
            { id: "alzheimer", label: "Alzheimer / Troubles cognitifs" },
            { id: "handicap", label: "Handicap" },
            { id: "maladie", label: "Maladie chronique" },
            { id: "vieillissement", label: "Vieillissement naturel" },
        ],
    },
    {
        id: "besoins",
        type: "multi-select",
        title: "Quels sont vos principaux besoins ?",
        subtitle: "Sélectionnez tout ce qui s'applique.",
        icon: <IconTarget size={32} color={monka.colors.ctaPrimary} />,
        options: [
            { id: "sante", label: "Suivi santé & rendez-vous" },
            { id: "admin", label: "Démarches administratives" },
            { id: "droits", label: "Connaître mes droits" },
            { id: "repit", label: "Trouver du répit" },
            { id: "soutien", label: "Soutien psychologique" },
            { id: "contacts", label: "Contacts professionnels locaux" },
        ],
    },
    {
        id: "summary",
        type: "summary",
        title: "Votre espace est prêt !",
        subtitle: "Nous avons personnalisé votre accompagnement.",
        icon: <IconCheck size={48} color={monka.colors.checkGreen} />,
    },
];

// ─── Option Pill ──────────────────────────────────────────────────
const OptionPill: React.FC<{
    label: string;
    selected: boolean;
    onPress: () => void;
    delay: number;
}> = ({ label, selected, onPress, delay }) => (
    <motion.button
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.2 }}
        whileTap={{ scale: 0.97 }}
        onClick={onPress}
        style={{
            width: "100%",
            padding: `${monka.spacing.lg}px`,
            borderRadius: monka.radius.option,
            background: selected ? `${monka.colors.ctaPrimary}10` : monka.colors.bgCard,
            border: `1.5px solid ${selected ? monka.colors.ctaPrimary : monka.colors.separator}`,
            cursor: "pointer",
            fontFamily: monka.font.family,
            fontSize: monka.font.size.body,
            fontWeight: selected ? monka.font.weight.semibold : monka.font.weight.regular,
            color: selected ? monka.colors.ctaPrimary : monka.colors.textBody,
            textAlign: "left",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
        }}
    >
        {label}
        {selected && (
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 15 }}
            >
                <IconCheck size={18} color={monka.colors.ctaPrimary} />
            </motion.div>
        )}
    </motion.button>
);

// ─── Component ────────────────────────────────────────────────────
const SOnboardingV2: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState<Record<string, string[]>>({});
    const [inputValue, setInputValue] = useState("");

    const step = STEPS[currentStep];
    const progress = ((currentStep + 1) / STEPS.length) * 100;

    const handleSelect = useCallback(
        (optionId: string) => {
            setSelectedOptions((prev) => {
                const key = step.id;
                if (step.type === "multi-select") {
                    const current = prev[key] || [];
                    return {
                        ...prev,
                        [key]: current.includes(optionId)
                            ? current.filter((id) => id !== optionId)
                            : [...current, optionId],
                    };
                }
                return { ...prev, [key]: [optionId] };
            });
        },
        [step.id, step.type]
    );

    const canProceed =
        step.type === "welcome" ||
        step.type === "summary" ||
        (step.type === "choice" && (selectedOptions[step.id]?.length || 0) > 0) ||
        (step.type === "multi-select" && (selectedOptions[step.id]?.length || 0) > 0) ||
        (step.type === "input" && inputValue.trim().length > 0);

    const handleNext = () => {
        if (currentStep < STEPS.length - 1) {
            setCurrentStep((s) => s + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep((s) => s - 1);
        }
    };

    return (
        <div
            style={{
                background: monka.colors.bgPrimary,
                minHeight: "100vh",
                fontFamily: monka.font.family,
                display: "flex",
                flexDirection: "column",
            }}
        >
            {/* Status bar spacer */}
            <div style={{ height: monka.safeArea.top }} />

            {/* ═══ Top bar ═══ */}
            <div
                style={{
                    padding: `${monka.spacing.md}px ${monka.spacing.xl}px`,
                    display: "flex",
                    alignItems: "center",
                    gap: monka.spacing.md,
                }}
            >
                {currentStep > 0 && (
                    <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleBack}
                        style={{
                            width: 32,
                            height: 32,
                            borderRadius: monka.radius.full,
                            background: monka.colors.bgCard,
                            border: "none",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M10 4L6 8l4 4" stroke={monka.colors.textDark} strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                    </motion.button>
                )}
                <MProgressBar progress={progress} height={4} color={monka.colors.ctaPrimary} />
                <span
                    style={{
                        fontSize: monka.font.size.caption,
                        color: monka.colors.textMuted,
                        fontWeight: monka.font.weight.medium,
                        whiteSpace: "nowrap",
                    }}
                >
                    {currentStep + 1}/{STEPS.length}
                </span>
            </div>

            {/* ═══ Content ═══ */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    style={{
                        flex: 1,
                        padding: `${monka.spacing.xxl}px ${monka.spacing.xl}px`,
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    {/* Icon */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 20 }}
                        style={{
                            width: step.type === "welcome" || step.type === "summary" ? 80 : 56,
                            height: step.type === "welcome" || step.type === "summary" ? 80 : 56,
                            borderRadius: step.type === "welcome" || step.type === "summary" ? 24 : 16,
                            background: `linear-gradient(135deg, ${monka.colors.ctaPrimary}15, ${monka.colors.ctaPrimary}05)`,
                            border: `1px solid ${monka.colors.ctaPrimary}15`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginBottom: monka.spacing.xl,
                        }}
                    >
                        {step.icon}
                    </motion.div>

                    {/* Title */}
                    <h1
                        style={{
                            fontSize: step.type === "welcome" || step.type === "summary"
                                ? monka.font.size.largeTitle
                                : monka.font.size.title2,
                            fontWeight: monka.font.weight.bold,
                            color: monka.colors.textDark,
                            lineHeight: 1.15,
                            margin: 0,
                        }}
                    >
                        {step.title}
                    </h1>

                    {step.subtitle && (
                        <p
                            style={{
                                fontSize: monka.font.size.body,
                                color: monka.colors.textBody,
                                lineHeight: 1.5,
                                margin: `${monka.spacing.sm}px 0 0`,
                            }}
                        >
                            {step.subtitle}
                        </p>
                    )}

                    {/* Options */}
                    {(step.type === "choice" || step.type === "multi-select") && step.options && (
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: monka.spacing.sm,
                                marginTop: monka.spacing.xxl,
                            }}
                        >
                            {step.options.map((opt, i) => (
                                <OptionPill
                                    key={opt.id}
                                    label={opt.label}
                                    selected={selectedOptions[step.id]?.includes(opt.id) || false}
                                    onPress={() => handleSelect(opt.id)}
                                    delay={i * 0.05}
                                />
                            ))}
                        </div>
                    )}

                    {/* Input */}
                    {step.type === "input" && (
                        <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15 }}
                            style={{ marginTop: monka.spacing.xxl }}
                        >
                            <input
                                type="text"
                                placeholder={step.inputPlaceholder}
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                style={{
                                    width: "100%",
                                    padding: `${monka.spacing.lg}px`,
                                    borderRadius: monka.radius.option,
                                    background: monka.colors.bgCard,
                                    border: `1.5px solid ${inputValue ? monka.colors.ctaPrimary : monka.colors.separator}`,
                                    fontSize: monka.font.size.title3,
                                    fontFamily: monka.font.family,
                                    fontWeight: monka.font.weight.medium,
                                    color: monka.colors.textDark,
                                    outline: "none",
                                    boxSizing: "border-box",
                                    transition: "border-color 0.2s",
                                }}
                                autoFocus
                            />
                        </motion.div>
                    )}

                    {/* Summary checkmarks */}
                    {step.type === "summary" && (
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: monka.spacing.md,
                                marginTop: monka.spacing.xxl,
                            }}
                        >
                            {[
                                { label: `Suivi personnalisé pour ${inputValue || "votre proche"}`, delay: 0.2 },
                                { label: "Actions adaptées à votre situation", delay: 0.35 },
                                { label: "Contacts professionnels proches de vous", delay: 0.5 },
                                { label: "Ressources et articles sélectionnés", delay: 0.65 },
                            ].map((item) => (
                                <motion.div
                                    key={item.label}
                                    initial={{ opacity: 0, x: -8 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: item.delay, duration: 0.3 }}
                                    style={{
                                        display: "flex",
                                        alignItems: "flex-start",
                                        gap: monka.spacing.md,
                                    }}
                                >
                                    <div
                                        style={{
                                            width: 24,
                                            height: 24,
                                            borderRadius: 12,
                                            background: monka.colors.checkGreenBg,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            flexShrink: 0,
                                        }}
                                    >
                                        <IconCheck size={14} color={monka.colors.checkGreen} />
                                    </div>
                                    <span
                                        style={{
                                            fontSize: monka.font.size.body,
                                            color: monka.colors.textBody,
                                            lineHeight: 1.4,
                                        }}
                                    >
                                        {item.label}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    )}

                    {/* Spacer */}
                    <div style={{ flex: 1, minHeight: monka.spacing.xxl }} />
                </motion.div>
            </AnimatePresence>

            {/* ═══ CTA ═══ */}
            <div
                style={{
                    padding: `${monka.spacing.lg}px ${monka.spacing.xl}px`,
                    paddingBottom: monka.safeArea.bottom + monka.spacing.lg,
                }}
            >
                <MButton
                    label={
                        currentStep === STEPS.length - 1
                            ? "Accéder à Monka"
                            : step.type === "welcome"
                                ? "Commencer"
                                : "Continuer"
                    }
                    variant="primary"
                    fullWidth
                    disabled={!canProceed}
                    onPress={handleNext}
                />
            </div>
        </div>
    );
};

export default SOnboardingV2;
