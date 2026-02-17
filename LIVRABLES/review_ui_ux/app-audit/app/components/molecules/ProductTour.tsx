"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";

interface ProductTourProps {
    onComplete: () => void;
    switchTab: (tab: string) => void;
}

/*
 * Custom Onboarding Tour — Phase 1 (overview) + Phase 2 (guided first steps)
 *
 * Phase 2 guides the user through:
 *   Step A: Tap a theme card → navigates to ThemeDetail
 *   Step B: Tap a programme → navigates to ProgramDetail
 *   Step C: Tap a recommendation → navigates to RecoDetail
 *   Step D: Check a micro-task → celebration!
 *
 * Detection: polls for data-tour markers that appear on each screen.
 */

// ── Phase 1: Overview steps ──
interface OverviewStep {
    tab: string;
    title: string;
    description: string;
    label: string;
    accent: string;
}

const OVERVIEW_STEPS: OverviewStep[] = [
    {
        tab: "home",
        title: "Votre espace Monka",
        description:
            "Tout est ici : votre progression, les thématiques d'accompagnement de Francine, et des actions concrètes.",
        label: "Accueil",
        accent: "#2C8C99",
    },
    {
        tab: "monsuivi",
        title: "Votre plan d'action",
        description:
            "Actions classées par priorité et agenda partagé avec votre cercle d'aidants.",
        label: "Mon suivi",
        accent: "#059669",
    },
    {
        tab: "chat",
        title: "Votre IDEC",
        description:
            "Un·e infirmier·e coordinateur·ice pour répondre à vos questions.",
        label: "Chat",
        accent: "#7C3AED",
    },
    {
        tab: "community",
        title: "Vos professionnels",
        description:
            "Les pros de votre territoire : répit, social, accueil de jour.",
        label: "Annuaire",
        accent: "#EA580C",
    },
    {
        tab: "resources",
        title: "Vos ressources",
        description: "Articles et guides adaptés à votre situation.",
        label: "Ressources",
        accent: "#2563EB",
    },
];

// ── Phase 2: Guided steps ──
interface GuideStep {
    id: string;
    title: string;
    description: string;
    accent: string;
    // CSS selector for the pulsing target
    pulseSelector: string;
    // data-tour marker that indicates user has navigated past this step
    completionMarker: string;
    skipLabel?: string;
}

const GUIDE_STEPS: GuideStep[] = [
    {
        id: "tap-theme",
        title: "Explorons ensemble",
        description:
            "Appuyez sur la première thématique pour découvrir ce que Monka a préparé pour Francine.",
        accent: "#2C8C99",
        pulseSelector: '[data-tour="dashboard-hero-first"] > *:first-child',
        completionMarker: '[data-tour="theme-programs"]',
    },
    {
        id: "tap-program",
        title: "Les programmes d'action",
        description:
            "Chaque thème contient des programmes concrets. Appuyez sur le premier pour aller plus loin.",
        accent: "#2C8C99",
        pulseSelector: '[data-tour="theme-programs"] > *:first-child',
        completionMarker: '[data-tour="program-recos"]',
    },
    {
        id: "tap-reco",
        title: "Les recommandations",
        description:
            "Voici les actions recommandées pour cette situation. Appuyez sur la première.",
        accent: "#2C8C99",
        pulseSelector: '[data-tour="program-recos"] > *:first-child',
        completionMarker: '[data-tour="reco-tasks"]',
    },
    {
        id: "open-guide",
        title: "Votre mode d'emploi",
        description:
            "Vous voyez le bouton « Voir le guide » ? Appuyez dessus. On vous a tout préparé, étape par étape.",
        accent: "#1A6B5A",
        pulseSelector: '[data-tour="guide-button"]',
        completionMarker: "__GUIDE_EXPANDED__",
    },
    {
        id: "reassure-check",
        title: "Tout est détaillé pour vous",
        description:
            "Chaque action vient avec son guide pas-à-pas. Pas besoin de chercher, on a mâché le travail. Maintenant, cochez la tâche pour valider votre premier pas.",
        accent: "#059669",
        pulseSelector: '[data-tour="reco-tasks"] > *:first-child > button:first-child',
        completionMarker: "__TASK_TOGGLED__",
    },
    {
        id: "tap-location",
        title: "Localisez vos interlocuteurs",
        description:
            "Vous voyez le bouton 📍 ? Appuyez dessus pour repérer où se trouve l'assistante sociale sur la carte.",
        accent: "#EA580C",
        pulseSelector: '[data-tour="contact-location"]',
        completionMarker: "__TAB_COMMUNITY__",
    },
];

export const ProductTour = ({ onComplete, switchTab }: ProductTourProps) => {
    const [phase, setPhase] = useState<"overview" | "guide" | "celebration">("overview");
    const [overviewStep, setOverviewStep] = useState(0);
    const [guideStep, setGuideStep] = useState(0);
    const [visible, setVisible] = useState(false);
    const [cardVisible, setCardVisible] = useState(false);
    const pollRef = useRef<NodeJS.Timeout | null>(null);

    const step = OVERVIEW_STEPS[overviewStep];
    const guide = GUIDE_STEPS[guideStep];
    const isLastOverview = overviewStep === OVERVIEW_STEPS.length - 1;
    const isFirstOverview = overviewStep === 0;

    // Fade in
    useEffect(() => {
        const t1 = setTimeout(() => setVisible(true), 50);
        const t2 = setTimeout(() => setCardVisible(true), 200);
        return () => { clearTimeout(t1); clearTimeout(t2); };
    }, []);

    // Navigate to correct tab during overview
    useEffect(() => {
        if (phase === "overview") switchTab(step.tab);
    }, [overviewStep, step.tab, switchTab, phase]);

    // ── Phase 2: Poll for completion markers ──
    useEffect(() => {
        if (phase !== "guide") return;
        if (pollRef.current) clearInterval(pollRef.current);

        const currentGuide = GUIDE_STEPS[guideStep];

        // Special case: guide expansion detection
        if (currentGuide.completionMarker === "__GUIDE_EXPANDED__") {
            const taskContainer = document.querySelector('[data-tour="reco-tasks"]');
            if (!taskContainer) return;

            // The first task item: when guide expands, a second child div appears (the guide section)
            const observer = new MutationObserver(() => {
                const firstTask = taskContainer.querySelector(':scope > *:first-child');
                if (firstTask && firstTask.children.length > 1) {
                    observer.disconnect();
                    setCardVisible(false);
                    setTimeout(() => {
                        setGuideStep(s => s + 1);
                        setCardVisible(true);
                    }, 400);
                }
            });
            observer.observe(taskContainer, { childList: true, subtree: true });
            return () => observer.disconnect();
        }

        // Special case: task toggle detection
        if (currentGuide.completionMarker === "__TASK_TOGGLED__") {
            // Watch for checkbox state change via MutationObserver
            const taskContainer = document.querySelector('[data-tour="reco-tasks"]');
            if (!taskContainer) return;

            const observer = new MutationObserver(() => {
                // Check if any completed indicator appeared (bg-color change, checkmark, etc.)
                const checked = taskContainer.querySelector('[data-completed="true"], .line-through, [style*="line-through"]');
                if (checked) {
                    observer.disconnect();
                    setCardVisible(false);
                    setTimeout(() => {
                        if (guideStep < GUIDE_STEPS.length - 1) {
                            setGuideStep(s => s + 1);
                            setCardVisible(true);
                        } else {
                            setPhase("celebration");
                            setCardVisible(true);
                        }
                    }, 400);
                }
            });
            observer.observe(taskContainer, { childList: true, subtree: true, attributes: true, attributeFilter: ['class', 'style', 'data-completed'] });
            return () => observer.disconnect();
        }

        // Special case: tab community detection (location step)
        if (currentGuide.completionMarker === "__TAB_COMMUNITY__") {
            pollRef.current = setInterval(() => {
                const communityHeader = document.querySelector('[data-tour="community-header"]');
                if (communityHeader) {
                    clearInterval(pollRef.current!);
                    setCardVisible(false);
                    setTimeout(() => {
                        setPhase("celebration");
                        setCardVisible(true);
                    }, 400);
                }
            }, 300);
            return () => { if (pollRef.current) clearInterval(pollRef.current); };
        }

        // Normal case: poll for completion marker element
        pollRef.current = setInterval(() => {
            const marker = document.querySelector(currentGuide.completionMarker);
            if (marker) {
                clearInterval(pollRef.current!);
                setCardVisible(false);
                setTimeout(() => {
                    if (guideStep < GUIDE_STEPS.length - 1) {
                        setGuideStep(s => s + 1);
                    }
                    setCardVisible(true);
                }, 350);
            }
        }, 300);

        return () => { if (pollRef.current) clearInterval(pollRef.current); };
    }, [phase, guideStep]);

    // ── Phase 2: Apply pulse animation to target ──
    useEffect(() => {
        if (phase !== "guide") return;
        const currentGuide = GUIDE_STEPS[guideStep];

        // Wait for element to appear then add pulse class + scroll into view
        const applyPulse = () => {
            const el = document.querySelector(currentGuide.pulseSelector) as HTMLElement;
            if (el) {
                el.style.animation = "monka-guide-pulse 1.5s ease-in-out infinite";
                el.style.borderRadius = "20px";
                el.style.outline = "3px solid rgba(44,140,153,0.6)";
                el.style.outlineOffset = "4px";
                el.style.position = "relative";
                el.style.zIndex = "50";
                // Scroll the element into view so the instruction card doesn't cover it
                setTimeout(() => {
                    el.scrollIntoView({ behavior: "smooth", block: "center" });
                }, 150);
                return el;
            }
            return null;
        };

        let el = applyPulse();
        const retryInterval = !el ? setInterval(() => {
            el = applyPulse();
            if (el && retryInterval) clearInterval(retryInterval);
        }, 200) : undefined;

        return () => {
            if (retryInterval) clearInterval(retryInterval);
            if (el) {
                el.style.animation = "";
                el.style.outline = "";
                el.style.outlineOffset = "";
                el.style.zIndex = "";
            }
        };
    }, [phase, guideStep]);

    // ── Navigation handlers ──
    const goNextOverview = useCallback(() => {
        if (isLastOverview) {
            setCardVisible(false);
            setTimeout(() => {
                switchTab("home");
                setPhase("guide");
                setTimeout(() => setCardVisible(true), 300);
            }, 250);
            return;
        }
        setCardVisible(false);
        setTimeout(() => {
            setOverviewStep(s => s + 1);
            setCardVisible(true);
        }, 200);
    }, [isLastOverview, switchTab]);

    const goPrevOverview = useCallback(() => {
        if (isFirstOverview) return;
        setCardVisible(false);
        setTimeout(() => {
            setOverviewStep(s => s - 1);
            setCardVisible(true);
        }, 200);
    }, [isFirstOverview]);

    const finish = useCallback(() => {
        setVisible(false);
        setCardVisible(false);
        setTimeout(() => {
            switchTab("home");
            onComplete();
        }, 300);
    }, [switchTab, onComplete]);

    // ── Shared card wrapper ──
    const GuideCard = ({ children, bottom }: { children: React.ReactNode; bottom?: string }) => (
        <div
            className={`absolute ${bottom || "bottom-24 sm:bottom-28"} left-0 right-0 z-[60] mx-3`}
            style={{
                opacity: cardVisible ? 1 : 0,
                transform: cardVisible ? "translateY(0)" : "translateY(12px)",
                transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
                pointerEvents: cardVisible ? "auto" : "none",
            }}
        >
            {children}
        </div>
    );

    const CardShell = ({ accent, children }: { accent: string; children: React.ReactNode }) => (
        <div
            className="rounded-[18px] overflow-hidden"
            style={{
                background: "rgba(255,255,255,0.97)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.10), 0 0 0 1px rgba(0,0,0,0.04)",
            }}
        >
            <div className="h-[3px]" style={{ background: `linear-gradient(90deg, ${accent}, ${accent}88)` }} />
            <div className="px-5 pt-4 pb-4">
                {children}
            </div>
        </div>
    );

    // ── PHASE: Celebration ──
    if (phase === "celebration") {
        return (
            <>
                <style>{`
                    @keyframes monka-confetti { 
                        0% { transform: scale(0.8); opacity: 0; }
                        50% { transform: scale(1.05); opacity: 1; }
                        100% { transform: scale(1); opacity: 1; }
                    }
                `}</style>
                <GuideCard>
                    <CardShell accent="#059669">
                        <div className="text-center py-2">
                            <div
                                className="text-[32px] mb-2"
                                style={{ animation: "monka-confetti 0.5s ease-out" }}
                            >
                                🎉
                            </div>
                            <h3
                                className="text-[16px] font-bold text-[#1A1A2E] mb-1.5"
                                style={{ fontFamily: "'Outfit', sans-serif", letterSpacing: "-0.01em" }}
                            >
                                Bravo, c'est votre premier pas !
                            </h3>
                            <p
                                className="text-[12.5px] text-[#5A5A6E] leading-relaxed mb-4"
                                style={{ fontFamily: "'Outfit', sans-serif" }}
                            >
                                Vous venez de compléter votre première action. Monka est là pour vous guider, un pas après l'autre.
                            </p>
                            <button
                                onClick={finish}
                                className="w-full py-3 rounded-[14px] text-[13px] font-semibold text-white"
                                style={{
                                    fontFamily: "'Outfit', sans-serif",
                                    background: "linear-gradient(135deg, #059669, #047857)",
                                    boxShadow: "0 4px 16px rgba(5,150,105,0.3)",
                                }}
                            >
                                Continuer l'exploration
                            </button>
                        </div>
                    </CardShell>
                </GuideCard>
            </>
        );
    }

    // ── PHASE 2: Guided steps ──
    if (phase === "guide") {
        return (
            <>
                <style>{`
                    @keyframes monka-guide-pulse {
                        0% { box-shadow: 0 0 0 0 rgba(44,140,153,0.50), 0 0 20px 0 rgba(44,140,153,0.15); transform: scale(1); }
                        50% { box-shadow: 0 0 0 12px rgba(44,140,153,0.25), 0 0 30px 8px rgba(44,140,153,0.10); transform: scale(1.03); }
                        100% { box-shadow: 0 0 0 0 rgba(44,140,153,0.50), 0 0 20px 0 rgba(44,140,153,0.15); transform: scale(1); }
                    }
                `}</style>
                <GuideCard>
                    <CardShell accent={guide.accent}>
                        {/* Step indicator */}
                        <div className="flex items-center justify-between mb-2">
                            <span
                                className="text-[10px] font-semibold uppercase tracking-[0.08em] px-2 py-0.5 rounded-full"
                                style={{ background: `${guide.accent}12`, color: guide.accent }}
                            >
                                Premier pas
                            </span>
                            <span className="text-[10px] text-[#C0C0CA] font-medium">
                                {guideStep + 1}/{GUIDE_STEPS.length}
                            </span>
                        </div>

                        <h3
                            className="text-[15px] font-bold text-[#1A1A2E] leading-snug mb-1"
                            style={{ fontFamily: "'Outfit', sans-serif", letterSpacing: "-0.01em" }}
                        >
                            {guide.title}
                        </h3>
                        <p
                            className="text-[12.5px] text-[#5A5A6E] leading-relaxed mb-3"
                            style={{ fontFamily: "'Outfit', sans-serif" }}
                        >
                            {guide.description}
                        </p>

                        {/* Progress dots */}
                        <div className="flex gap-1 mb-3 justify-center">
                            {GUIDE_STEPS.map((_, i) => (
                                <div
                                    key={i}
                                    className="h-[2.5px] rounded-full transition-all duration-300"
                                    style={{
                                        width: i === guideStep ? "16px" : "5px",
                                        background: i === guideStep ? guide.accent
                                            : i < guideStep ? `${guide.accent}40`
                                                : "#E5E7EB",
                                    }}
                                />
                            ))}
                        </div>

                        <button
                            onClick={finish}
                            className="w-full text-[11px] text-[#C0C0CA] font-medium transition-colors hover:text-[#8E8E93]"
                            style={{ fontFamily: "'Outfit', sans-serif" }}
                        >
                            Je découvrirai par moi-même
                        </button>
                    </CardShell>
                </GuideCard>
            </>
        );
    }

    // ── PHASE 1: Overview ──
    return (
        <div
            className="absolute inset-0 z-[60] flex items-end justify-center"
            style={{
                background: visible ? "rgba(26, 26, 46, 0.25)" : "transparent",
                transition: "background 0.4s ease",
                pointerEvents: visible ? "auto" : "none",
            }}
        >
            <div
                className="w-full mx-3 mb-24 sm:mb-28"
                style={{
                    opacity: cardVisible ? 1 : 0,
                    transform: cardVisible ? "translateY(0)" : "translateY(16px)",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
            >
                <CardShell accent={step.accent}>
                    {/* Label + counter */}
                    <div className="flex items-center justify-between mb-2">
                        <span
                            className="text-[10px] font-semibold uppercase tracking-[0.08em] px-2 py-0.5 rounded-full"
                            style={{ background: `${step.accent}12`, color: step.accent }}
                        >
                            {step.label}
                        </span>
                        <span className="text-[10px] text-[#C0C0CA] font-medium">
                            {overviewStep + 1}/{OVERVIEW_STEPS.length}
                        </span>
                    </div>

                    <h3
                        className="text-[15px] font-bold text-[#1A1A2E] leading-snug mb-1"
                        style={{ fontFamily: "'Outfit', sans-serif", letterSpacing: "-0.01em" }}
                    >
                        {step.title}
                    </h3>
                    <p
                        className="text-[12.5px] text-[#5A5A6E] leading-relaxed mb-3"
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                        {step.description}
                    </p>

                    {/* Progress dots */}
                    <div className="flex gap-1 mb-3 justify-center">
                        {OVERVIEW_STEPS.map((_, i) => (
                            <div
                                key={i}
                                className="h-[2.5px] rounded-full transition-all duration-300"
                                style={{
                                    width: i === overviewStep ? "16px" : "5px",
                                    background: i === overviewStep ? step.accent
                                        : i < overviewStep ? `${step.accent}40`
                                            : "#E5E7EB",
                                }}
                            />
                        ))}
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-2.5">
                        {!isFirstOverview && (
                            <button
                                onClick={goPrevOverview}
                                className="py-2.5 px-5 rounded-[12px] text-[12px] font-semibold"
                                style={{ fontFamily: "'Outfit', sans-serif", color: "#8E8E93", background: "#F3F4F6" }}
                            >
                                Retour
                            </button>
                        )}
                        <button
                            onClick={goNextOverview}
                            className="flex-1 py-2.5 rounded-[12px] text-[12px] font-semibold text-white"
                            style={{
                                fontFamily: "'Outfit', sans-serif",
                                background: `linear-gradient(135deg, ${step.accent}, ${step.accent}CC)`,
                                boxShadow: `0 3px 12px ${step.accent}25`,
                            }}
                        >
                            Suivant
                        </button>
                    </div>

                    <button
                        onClick={finish}
                        className="w-full mt-2 text-[11px] text-[#C0C0CA] font-medium transition-colors hover:text-[#8E8E93]"
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                        Passer l'introduction
                    </button>
                </CardShell>
            </div>
        </div>
    );
};
