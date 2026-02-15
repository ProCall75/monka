"use client";

import { useState } from "react";
import { monka } from "./monka-design-tokens";

/**
 * Monka Onboarding Questionnaire — Pixel-perfect from screenshots
 * IMG_3689 (sex), IMG_3691 (age), IMG_3698 (professionals), IMG_3760 (mood)
 *
 * Features:
 * - Back arrow + optional close button
 * - Step number in circle + section title
 * - Bold question text
 * - Progress dots (filled/unfilled)
 * - Light icy-blue options zone with white pills
 * - Single-select (tap to advance) and multi-select (with "Continuer" CTA)
 */

interface Question {
    section?: { number: number; title: string };
    question: string;
    subtitle?: string;
    options: string[];
    multi?: boolean;
}

const questions: Question[] = [
    {
        question: "Quel est votre sexe biologique ?",
        subtitle: "Cette précision est utilisée pour vous communiquer des informations médicales spécifiques à votre sexe biologique",
        options: ["Homme", "Femme"],
    },
    {
        question: "Quel âge la personne aidée ?",
        subtitle: "(Sachez que la majorité numérique est atteinte dès 15 ans. Le consentement est alors requis pour le traitement des données personnelles).",
        options: ["Moins de 18 ans", "Entre 18 et 25 ans", "Entre 26 et 59 ans", "Entre 60 et 75 ans", "Plus de 75 ans"],
    },
    {
        question: "Quel est le lien entre la personne aidée et vous ?",
        options: ["Mon père", "Ma mère", "Mon conjoint(e)", "Mon enfant", "Un autre proche"],
    },
    {
        question: "La personne aidée vit-elle seule ?",
        options: ["Oui, seule", "Non, avec quelqu'un", "En établissement"],
    },
    {
        question: "Quelle est la situation actuelle de la personne aidée ?",
        subtitle: "plusieurs réponses possibles",
        options: ["Perte d'autonomie", "Maladie chronique", "Handicap", "Troubles cognitifs", "Vieillissement", "Hospitalisation récente"],
        multi: true,
    },
    {
        question: "Qui est le médecin traitant de la personne aidée ?",
        options: ["Médecin généraliste", "Pas de médecin traitant", "Je ne sais pas"],
    },
    {
        question: "La personne aidée bénéficie-t-elle de l'APA ?",
        subtitle: "(Allocation Personnalisée d'Autonomie)",
        options: ["Oui", "Non", "Demande en cours", "Je ne sais pas"],
    },
    {
        question: "La personne aidée a-t-elle une mutuelle santé ?",
        options: ["Oui", "Non", "Je ne sais pas"],
    },
    {
        section: { number: 3, title: "Vos besoins en tant qu'aidant" },
        question: "Quels sont vos principaux besoins aujourd'hui ?",
        subtitle: "plusieurs réponses possibles",
        options: ["Être accompagné(e)", "Trouver des aides financières", "Organiser le quotidien", "Trouver du répit", "Comprendre la maladie", "Trouver des professionnels"],
        multi: true,
    },
    {
        section: { number: 4, title: "Précisons quelques éléments sur sa situation" },
        question: "Quels sont les professionnels, ou services qui interviennent déjà au domicile de la personne aidée ?",
        subtitle: "plusieurs réponses possibles",
        options: [
            "Service à domicile (SAD) / auxiliaire de vie",
            "Service à domicile (SAD) / aide ménagère",
            "Service de soins infirmiers à domicile (SSIAD)",
            "Infirmier libéral",
            "Masseur kinésithérapeute",
            "Aide physique adaptée (APA)",
            "Télé-assistance",
            "Portage de repas",
            "Aucun",
        ],
        multi: true,
    },
    {
        section: { number: 4, title: "Précisons quelques éléments sur sa situation" },
        question: "Selon vous, en ce moment, diriez-vous de la personne aidée qu'elle est :",
        options: ["D'humeur normale", "Parfois anxieuxe ou triste", "Déprimée"],
    },
];

const TOTAL_DOTS = 14;

export default function ProposedOnboarding() {
    const [currentStep, setCurrentStep] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState<Set<number>>(new Set());

    const q = questions[currentStep];
    const filledDots = Math.min(Math.round(((currentStep + 1) / questions.length) * TOTAL_DOTS), TOTAL_DOTS);

    const handleOptionTap = (optionIndex: number) => {
        if (q.multi) {
            setSelectedOptions((prev) => {
                const next = new Set(prev);
                if (next.has(optionIndex)) {
                    next.delete(optionIndex);
                } else {
                    next.add(optionIndex);
                }
                return next;
            });
        } else {
            // Single select — advance immediately
            if (currentStep < questions.length - 1) {
                setSelectedOptions(new Set());
                setCurrentStep(currentStep + 1);
            }
        }
    };

    const handleContinue = () => {
        if (currentStep < questions.length - 1) {
            setSelectedOptions(new Set());
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setSelectedOptions(new Set());
            setCurrentStep(currentStep - 1);
        }
    };

    return (
        <div
            style={{
                background: monka.colors.bgPrimary,
                minHeight: "100%",
                display: "flex",
                flexDirection: "column",
                fontFamily: monka.font.family,
            }}
        >
            {/* ── Top bar: back arrow + close ── */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "12px 16px 8px",
                }}
            >
                <button
                    onClick={handleBack}
                    style={{
                        background: "none",
                        border: "none",
                        cursor: currentStep > 0 ? "pointer" : "default",
                        padding: 4,
                        opacity: currentStep > 0 ? 1 : 0.3,
                    }}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M15 19l-7-7 7-7" stroke={monka.colors.textDark} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
                {q.section && (
                    <button
                        style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            padding: 4,
                        }}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M18 6L6 18M6 6l12 12" stroke={monka.colors.textDark} strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </button>
                )}
            </div>

            {/* ── Divider ── */}
            <div style={{ height: 1, background: monka.colors.separator, marginLeft: 16, marginRight: 16 }} />

            {/* ── Section header (if present) ── */}
            {q.section && (
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "16px 20px 4px",
                    }}
                >
                    <div
                        style={{
                            width: 32,
                            height: 32,
                            borderRadius: monka.radius.full,
                            background: monka.colors.bgPrimary,
                            border: `2px solid ${monka.colors.separator}`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: monka.font.size.body,
                            fontWeight: monka.font.weight.semibold,
                            color: monka.colors.textDark,
                            flexShrink: 0,
                        }}
                    >
                        {q.section.number}
                    </div>
                    <span
                        style={{
                            fontSize: monka.font.size.body,
                            color: monka.colors.textBody,
                            fontWeight: monka.font.weight.regular,
                        }}
                    >
                        {q.section.title}
                    </span>
                </div>
            )}

            {/* ── Question text ── */}
            <div style={{ padding: "16px 20px 0" }}>
                <h1
                    style={{
                        fontSize: monka.font.size.title2,
                        fontWeight: monka.font.weight.bold,
                        color: monka.colors.textDark,
                        lineHeight: 1.3,
                        margin: 0,
                        marginBottom: q.subtitle ? 12 : 8,
                    }}
                >
                    {q.question}
                </h1>
                {q.subtitle && (
                    <p
                        style={{
                            fontSize: monka.font.size.body,
                            color: monka.colors.textMuted,
                            lineHeight: 1.5,
                            margin: 0,
                            marginBottom: 8,
                        }}
                    >
                        {q.subtitle}
                    </p>
                )}
            </div>

            {/* ── Progress dots ── */}
            <div
                style={{
                    display: "flex",
                    gap: 6,
                    padding: "12px 20px 20px",
                    flexWrap: "wrap",
                }}
            >
                {Array.from({ length: TOTAL_DOTS }).map((_, i) => (
                    <div
                        key={i}
                        style={{
                            width: i < filledDots ? 18 : 14,
                            height: 6,
                            borderRadius: 3,
                            background: i < filledDots ? monka.colors.progressActive : monka.colors.progressInactive,
                            transition: "all 0.3s ease",
                        }}
                    />
                ))}
            </div>

            {/* ── Options zone (icy-blue background) ── */}
            <div
                style={{
                    flex: 1,
                    background: monka.colors.bgOptionsZone,
                    borderRadius: `${monka.radius.card}px ${monka.radius.card}px 0 0`,
                    padding: "24px 16px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                }}
            >
                {/* Options */}
                <div style={{ display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
                    {q.options.map((opt, i) => {
                        const isSelected = selectedOptions.has(i);
                        return (
                            <button
                                key={i}
                                onClick={() => handleOptionTap(i)}
                                style={{
                                    width: "100%",
                                    background: monka.colors.bgCard,
                                    border: isSelected
                                        ? `2px solid ${monka.colors.ctaPrimary}`
                                        : "2px solid transparent",
                                    borderRadius: monka.radius.option,
                                    padding: "16px 18px",
                                    textAlign: "left",
                                    fontSize: monka.font.size.subhead,
                                    fontWeight: monka.font.weight.regular,
                                    color: monka.colors.textDark,
                                    fontFamily: monka.font.family,
                                    cursor: "pointer",
                                    transition: "all 0.2s ease",
                                    boxShadow: isSelected ? monka.shadow.card : "none",
                                }}
                            >
                                {opt}
                            </button>
                        );
                    })}
                </div>

                {/* Continuer button (for multi-select questions) */}
                {q.multi && (
                    <button
                        onClick={handleContinue}
                        disabled={selectedOptions.size === 0}
                        style={{
                            width: "100%",
                            padding: "16px",
                            borderRadius: monka.radius.button,
                            background: selectedOptions.size > 0
                                ? monka.colors.ctaPrimary
                                : monka.colors.ctaMuted,
                            color: monka.colors.textWhite,
                            fontSize: monka.font.size.subhead,
                            fontWeight: monka.font.weight.semibold,
                            fontFamily: monka.font.family,
                            border: "none",
                            cursor: selectedOptions.size > 0 ? "pointer" : "default",
                            transition: "background 0.2s ease",
                            marginTop: 8,
                        }}
                    >
                        Continuer
                    </button>
                )}
            </div>
        </div>
    );
}
