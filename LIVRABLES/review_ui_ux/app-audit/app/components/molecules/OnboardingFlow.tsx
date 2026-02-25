"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
    CheckCircle, ClipboardText, Users as UsersIcon, ShieldCheck,
    AppleLogo, GoogleLogo, EnvelopeSimple, CaretRight, Eye, EyeSlash,
    ChatDots, Clock, Sparkle, ArrowRight, CalendarCheck, FirstAid,
} from '@phosphor-icons/react';
import { QuestionBubble } from '../atoms/QuestionBubble';
import { AnswerBubble } from '../atoms/AnswerBubble';
import { MOptionPill } from '../atoms/MOptionPill';
import { ThemeButton } from '../atoms/ThemeButton';
import { ThemeColors, type VulnerabilityDomain } from '../../data/kernel-types';
import {
    MOCK_TRIGGERS, MOCK_VULNERABILITIES, MOCK_RECAP_DATA,
    type MockQuestion, type MockVulnerability,
} from '../../data/questionnaire-mock-data';

/* ═══════════════════════════════════════════════════════
   DOMAIN LABELS — human-friendly names
═══════════════════════════════════════════════════════ */
const DOMAIN_LABELS: Record<VulnerabilityDomain, string> = {
    R: 'Vie sociale', A: 'Démarches', S: 'Santé', F: 'Votre proche', M: 'Parcours de soins',
};

const VULN_INTRO_DATA: Record<VulnerabilityDomain, { image: string; title: string; description: string; benefit: string }> = {
    R: {
        image: '/intro_vie_sociale.png',
        title: 'Votre vie sociale et relationnelle',
        description: 'Être aidant peut isoler. Comprendre votre entourage et vos liens sociaux nous permet de vous orienter vers les bonnes ressources.',
        benefit: 'Vous débloquerez des actions concrètes pour maintenir et renforcer votre réseau de soutien.',
    },
    A: {
        image: '/intro_demarches.png',
        title: 'Vos démarches administratives',
        description: 'APA, MDPH, aides financières… Le parcours administratif est souvent un casse-tête. Ces questions nous aident à comprendre où vous en êtes.',
        benefit: 'Vous recevrez un guide pas à pas pour les aides auxquelles vous avez droit.',
    },
    S: {
        image: '/intro_sante.png',
        title: 'Votre santé à vous',
        description: '48% des aidants déclarent des problèmes de santé liés à leur rôle. Prendre soin de vous n\'est pas un luxe — c\'est une nécessité.',
        benefit: 'Des actions de prévention et de bien-être adaptées à VOTRE quotidien.',
    },
    F: {
        image: '/intro_proche.png',
        title: 'La situation de votre proche',
        description: 'Mieux comprendre l\'état de santé et l\'autonomie de votre proche nous permet de vous proposer les dispositifs les plus adaptés.',
        benefit: 'Un plan d\'accompagnement personnalisé pour le quotidien de votre proche.',
    },
    M: {
        image: '/intro_parcours_soins.png',
        title: 'Le parcours de soins',
        description: 'Médecin traitant, spécialistes, suivi médical… Comprendre comment les soins sont organisés nous aide à identifier les points de friction.',
        benefit: 'Une coordination simplifiée entre tous les professionnels de santé impliqués.',
    },
};

const LEVEL_COLORS: Record<string, { dot: string; bg: string; label: string }> = {
    critical: { dot: '#EF4444', bg: '#FEF2F2', label: 'Prioritaire' },
    ccc: { dot: '#F59E0B', bg: '#FFFBEB', label: 'Important' },
    standard: { dot: '#10B981', bg: '#ECFDF5', label: 'Recommandé' },
    prevention: { dot: '#8B5CF6', bg: '#F5F3FF', label: 'Conseillé' },
};

/* ═══════════════════════════════════════════════════════
   TYPES
═══════════════════════════════════════════════════════ */

type FlowPhase =
    | 'welcome'
    | 'signup'
    | 'trigger-intro'
    | 'triggers'
    | 'theme-hub'
    | 'vuln-intro'
    | 'vuln-questions'
    | 'vuln-recap'
    | 'analysis'
    | 'idec-rdv';

interface FlowProps {
    onComplete: () => void;
    mode?: 'welcome' | 'questionnaire';
}

/* ═══════════════════════════════════════════════════════
   WELCOME SLIDES
═══════════════════════════════════════════════════════ */

const WELCOME_SLIDES = [
    {
        image: '/onboarding_welcome.png',
        title: 'Bienvenue sur Monka',
        subtitle: 'Votre compagnon au quotidien',
        description: 'Monka vous accompagne pas à pas dans votre rôle d\'aidant — démarches, soins, bien-être, organisation du quotidien.',
        highlight: 'Vous n\'êtes plus seul·e.',
    },
    {
        image: '/onboarding_idec.png',
        title: 'Votre IDEC, c\'est quoi ?',
        subtitle: 'Infirmier·e De Coordination',
        description: 'Un·e professionnel·le de santé qui coordonne tout le parcours de soins de votre proche — médecins, spécialistes, aides à domicile.',
        highlight: 'Monka met cette coordination à portée de main.',
    },
    {
        image: '/onboarding_benefits.png',
        title: 'Ce que Monka vous apporte',
        subtitle: 'Un accompagnement complet',
        description: '',
        benefits: [
            { icon: <CheckCircle size={24} weight="fill" color="#2C8C99" />, text: 'Des actions concrètes, étape par étape, adaptées à votre situation' },
            { icon: <ClipboardText size={24} weight="fill" color="#7C4DFF" />, text: 'Un suivi personnalisé qui évolue avec vos besoins' },
            { icon: <UsersIcon size={24} weight="fill" color="#E5793B" />, text: 'Un cercle d\'aidants pour avancer ensemble' },
        ],
        highlight: 'Prêt·e à découvrir ?',
    },
];

/* ═══════════════════════════════════════════════════════
   SPIDER CHART — Profile Analysis (self-contained)
═══════════════════════════════════════════════════════ */

const SPIDER_DOMAINS = [
    { label: 'Santé', target: 72 },
    { label: 'Vie sociale', target: 45 },
    { label: 'Famille', target: 88 },
    { label: 'Administratif', target: 35 },
    { label: 'Suivi médical', target: 60 },
];

/** Maps vuln index (ALL_VULNS order: R,A,S,F,M) → SPIDER_DOMAINS index */
const VULN_TO_SPIDER = [1, 3, 0, 2, 4]; // R→Vie sociale, A→Admin, S→Santé, F→Famille, M→Suivi

const ProfileAnalysis = ({ active, onReady }: { active: boolean; onReady?: () => void }) => {
    const [values, setValues] = useState(SPIDER_DOMAINS.map(() => 0));
    const [phase, setPhase] = useState<'scanning' | 'building' | 'done'>('scanning');
    const [revealedAxes, setRevealedAxes] = useState(0);
    const [revealedDots, setRevealedDots] = useState(0);
    const [glowPulse, setGlowPulse] = useState(false);

    useEffect(() => {
        if (!active) return;
        setPhase('scanning');
        setValues(SPIDER_DOMAINS.map(() => 0));
        setRevealedAxes(0);
        setRevealedDots(0);

        const buildStart = setTimeout(() => {
            setPhase('building');
            SPIDER_DOMAINS.forEach((_, i) => {
                setTimeout(() => setRevealedAxes(prev => Math.max(prev, i + 1)), i * 300);
            });
            setTimeout(() => {
                const startTime = Date.now();
                const duration = 2000;
                const animate = () => {
                    const elapsed = Date.now() - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 4);
                    setValues(SPIDER_DOMAINS.map(d => d.target * eased));
                    if (progress < 1) requestAnimationFrame(animate);
                };
                requestAnimationFrame(animate);
                SPIDER_DOMAINS.forEach((_, i) => {
                    setTimeout(() => setRevealedDots(prev => Math.max(prev, i + 1)), 400 + i * 350);
                });
            }, SPIDER_DOMAINS.length * 300 + 200);
        }, 1200);

        const doneTimer = setTimeout(() => {
            setPhase('done');
            setGlowPulse(true);
            onReady?.();
        }, 1200 + SPIDER_DOMAINS.length * 300 + 200 + 2200);

        return () => { clearTimeout(buildStart); clearTimeout(doneTimer); };
    }, [active, onReady]);

    const svgSize = 280;
    const cx = svgSize / 2, cy = svgSize / 2;
    const maxR = 90;
    const n = SPIDER_DOMAINS.length;
    const angleStep = (2 * Math.PI) / n;
    const startAngle = -Math.PI / 2;

    const getPoint = (i: number, pct: number) => {
        const angle = startAngle + i * angleStep;
        const r = (pct / 100) * maxR;
        return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
    };

    const dataPoints = values.map((v, i) => getPoint(i, v));
    const dataPolygon = dataPoints.map(p => `${p.x},${p.y}`).join(' ');
    const labelPoints = SPIDER_DOMAINS.map((_, i) => getPoint(i, 130));

    return (
        <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 mb-2">
                {phase === 'scanning' ? (
                    <>
                        <div className="w-4 h-4 rounded-full border-2 border-[#2C8C99] border-t-transparent" style={{ animation: 'spin 0.8s linear infinite' }} />
                        <span className="text-[13px] text-[#8E8E93] font-medium">Analyse en cours…</span>
                    </>
                ) : phase === 'done' ? (
                    <>
                        <CheckCircle size={18} weight="fill" color="#2C8C99" />
                        <span className="text-[13px] font-semibold text-[#2C8C99]" style={{ animation: 'fadeIn 0.5s ease' }}>Profil analysé</span>
                    </>
                ) : (
                    <>
                        <div className="w-1.5 h-1.5 rounded-full bg-[#2C8C99] animate-pulse" />
                        <span className="text-[12px] text-[#8E8E93] font-medium animate-pulse">Construction du profil…</span>
                    </>
                )}
            </div>

            <svg width="100%" height="auto" viewBox={`0 0 ${svgSize} ${svgSize}`} style={{ maxWidth: 280, aspectRatio: '1/1' }}>
                <defs>
                    <radialGradient id="spiderGlow"><stop offset="0%" stopColor="#2C8C99" stopOpacity="0.08" /><stop offset="100%" stopColor="#2C8C99" stopOpacity="0" /></radialGradient>
                    <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#2C8C99" stopOpacity="0.18" /><stop offset="100%" stopColor="#2C8C99" stopOpacity="0.04" /></linearGradient>
                </defs>
                {glowPulse && <circle cx={cx} cy={cy} r={maxR + 20} fill="url(#spiderGlow)" style={{ animation: 'pulse 2s ease-in-out infinite' }} />}
                {[25, 50, 75, 100].map(pct => (
                    <polygon key={pct} points={SPIDER_DOMAINS.map((_, i) => { const p = getPoint(i, pct); return `${p.x},${p.y}`; }).join(' ')} fill="none" stroke="#E5E5EA" strokeWidth={pct === 100 ? 1.5 : 0.5} strokeDasharray={pct === 100 ? 'none' : '3,3'} opacity={0.5} />
                ))}
                {SPIDER_DOMAINS.map((_, i) => {
                    const p = getPoint(i, 100);
                    return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="#E5E5EA" strokeWidth={0.5} opacity={revealedAxes > i ? 1 : 0} style={{ transition: 'opacity 0.3s ease' }} />;
                })}
                <polygon points={dataPolygon} fill="url(#areaFill)" stroke="#2C8C99" strokeWidth={2} strokeLinejoin="round" opacity={phase !== 'scanning' ? 1 : 0} style={{ transition: 'opacity 0.4s ease' }} />
                {dataPoints.map((p, i) => (
                    <circle key={i} cx={p.x} cy={p.y} r={4} fill="white" stroke="#2C8C99" strokeWidth={2} opacity={revealedDots > i ? 1 : 0} style={{ transition: 'opacity 0.3s ease', filter: 'drop-shadow(0 1px 3px rgba(44,140,153,0.3))' }} />
                ))}
                {SPIDER_DOMAINS.map((d, i) => {
                    const lp = labelPoints[i];
                    return (
                        <text key={i} x={lp.x} y={lp.y} textAnchor="middle" dominantBaseline="central" className="text-[11px] font-semibold" fill={revealedDots > i ? '#1A1A2E' : '#C8CCD0'} style={{ transition: 'fill 0.3s ease', fontFamily: "'Outfit', sans-serif" }}>
                            {d.label}
                        </text>
                    );
                })}
            </svg>
        </div>
    );
};

/* ═══════════════════════════════════════════════════════
   RECAP RADAR — Animated progressive radar chart
═══════════════════════════════════════════════════════ */

const RECAP_SVG = 300;
const RECAP_CX = RECAP_SVG / 2, RECAP_CY = RECAP_SVG / 2;
const RECAP_MAX_R = 80;
const RECAP_ANGLE_STEP = (2 * Math.PI) / SPIDER_DOMAINS.length;
const RECAP_START_ANGLE = -Math.PI / 2;

function recapGetPoint(i: number, pct: number) {
    const angle = RECAP_START_ANGLE + i * RECAP_ANGLE_STEP;
    const r = (pct / 100) * RECAP_MAX_R;
    return { x: RECAP_CX + r * Math.cos(angle), y: RECAP_CY + r * Math.sin(angle) };
}

function RecapRadar({ targetValues, visibleVulns, domainColor }: {
    targetValues: number[];
    visibleVulns: Set<number>;
    domainColor: string;
}) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let start: number | null = null;
        const duration = 900;
        const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
        const animate = (ts: number) => {
            if (!start) start = ts;
            const elapsed = ts - start;
            const p = Math.min(elapsed / duration, 1);
            setProgress(easeOut(p));
            if (p < 1) requestAnimationFrame(animate);
        };
        const timer = setTimeout(() => requestAnimationFrame(animate), 400);
        return () => clearTimeout(timer);
    }, []);

    const animatedValues = targetValues.map(v => v * progress);
    const dataPoints = animatedValues.map((v, i) => recapGetPoint(i, v));
    const dataPolygon = dataPoints.map(p => `${p.x},${p.y}`).join(' ');
    const labelPoints = SPIDER_DOMAINS.map((_, i) => recapGetPoint(i, 140));

    const uid = 'rcr-' + domainColor.replace('#', '');

    return (
        <div className="mb-4" style={{ animation: 'ob-fadeIn 0.3s ease-out 300ms both' }}>
            <svg width="100%" height="auto" viewBox={`0 0 ${RECAP_SVG} ${RECAP_SVG}`} style={{ maxWidth: 280, aspectRatio: '1/1' }}>
                <defs>
                    <radialGradient id={`${uid}-glow`}>
                        <stop offset="0%" stopColor={domainColor} stopOpacity="0.12" />
                        <stop offset="100%" stopColor={domainColor} stopOpacity="0" />
                    </radialGradient>
                    <linearGradient id={`${uid}-fill`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={domainColor} stopOpacity="0.25" />
                        <stop offset="100%" stopColor={domainColor} stopOpacity="0.05" />
                    </linearGradient>
                </defs>

                {/* Background glow */}
                <circle cx={RECAP_CX} cy={RECAP_CY} r={RECAP_MAX_R + 10} fill={`url(#${uid}-glow)`} />

                {/* Grid rings */}
                {[33, 66, 100].map(pct => (
                    <polygon
                        key={pct}
                        points={SPIDER_DOMAINS.map((_, i) => { const p = recapGetPoint(i, pct); return `${p.x},${p.y}`; }).join(' ')}
                        fill="none"
                        stroke={pct === 100 ? '#D1D5DB' : '#E5E7EB'}
                        strokeWidth={pct === 100 ? 1 : 0.5}
                        strokeDasharray={pct === 100 ? 'none' : '4,4'}
                        opacity={0.5}
                    />
                ))}

                {/* Axes */}
                {SPIDER_DOMAINS.map((_, i) => {
                    const p = recapGetPoint(i, 100);
                    const vulnIdx = VULN_TO_SPIDER.indexOf(i);
                    const isActive = vulnIdx !== -1 && visibleVulns.has(vulnIdx);
                    return (
                        <line
                            key={i}
                            x1={RECAP_CX} y1={RECAP_CY} x2={p.x} y2={p.y}
                            stroke={isActive ? '#9CA3AF' : '#E5E7EB'}
                            strokeWidth={isActive ? 0.8 : 0.4}
                            opacity={isActive ? Math.min(progress * 2, 1) : 0.3}
                        />
                    );
                })}

                {/* Data polygon — animated */}
                <polygon
                    points={dataPolygon}
                    fill={`url(#${uid}-fill)`}
                    stroke={domainColor}
                    strokeWidth={2}
                    strokeLinejoin="round"
                    opacity={Math.min(progress * 1.5, 1)}
                />

                {/* Data dots with pulse effect */}
                {dataPoints.map((p, i) => {
                    const vulnIdx = VULN_TO_SPIDER.indexOf(i);
                    const isActive = vulnIdx !== -1 && visibleVulns.has(vulnIdx);
                    if (!isActive || progress < 0.1) return null;
                    return (
                        <g key={i}>
                            {/* Outer glow pulse */}
                            <circle
                                cx={p.x} cy={p.y} r={6}
                                fill={domainColor}
                                opacity={0.15 * progress}
                            >
                                <animate attributeName="r" from="4" to="8" dur="2s" repeatCount="indefinite" />
                                <animate attributeName="opacity" from="0.2" to="0" dur="2s" repeatCount="indefinite" />
                            </circle>
                            {/* Main dot */}
                            <circle
                                cx={p.x} cy={p.y} r={3.5}
                                fill="white"
                                stroke={domainColor}
                                strokeWidth={2}
                                style={{ filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.15))' }}
                            />
                        </g>
                    );
                })}

                {/* Labels */}
                {SPIDER_DOMAINS.map((d, i) => {
                    const lp = labelPoints[i];
                    const vulnIdx = VULN_TO_SPIDER.indexOf(i);
                    const isActive = vulnIdx !== -1 && visibleVulns.has(vulnIdx);
                    return (
                        <text
                            key={i} x={lp.x} y={lp.y}
                            textAnchor="middle"
                            dominantBaseline="central"
                            className="text-[9px] font-semibold"
                            fill={isActive ? '#374151' : '#D1D5DB'}
                            opacity={isActive ? Math.min(progress * 2, 1) : 0.6}
                            style={{ fontFamily: "'Outfit', sans-serif", transition: 'fill 0.3s, opacity 0.3s' }}
                        >
                            {d.label}
                        </text>
                    );
                })}
            </svg>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════
   MAIN ONBOARDING FLOW
═══════════════════════════════════════════════════════ */

// All 5 vulnerabilities available in theme hub
const ALL_VULNS = MOCK_VULNERABILITIES;

export const OnboardingFlow = ({ onComplete, mode = 'welcome' }: FlowProps) => {
    const [phase, setPhase] = useState<FlowPhase>(mode === 'questionnaire' ? 'trigger-intro' : 'welcome');
    const [welcomeStep, setWelcomeStep] = useState(0);
    const [triggerIndex, setTriggerIndex] = useState(0);
    const [triggerAnswers, setTriggerAnswers] = useState<string[]>([]);
    const [vulnIndex, setVulnIndex] = useState(0);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [questionAnswers, setQuestionAnswers] = useState<string[]>([]);
    const [completedVulns, setCompletedVulns] = useState<Set<number>>(new Set());
    const [analysisReady, setAnalysisReady] = useState(false);
    const [cguChecked, setCguChecked] = useState(false);
    const [animKey, setAnimKey] = useState(0);
    const [isAnswering, setIsAnswering] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    const currentVuln = ALL_VULNS[vulnIndex] ?? ALL_VULNS[0];
    const currentRecap = MOCK_RECAP_DATA[currentVuln.id];

    const goTo = useCallback((nextPhase: FlowPhase) => {
        setAnimKey(k => k + 1);
        setPhase(nextPhase);
        scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    // Auto-trigger analysisReady after entering analysis phase
    useEffect(() => {
        if (phase === 'analysis') {
            const t = setTimeout(() => setAnalysisReady(true), 2000);
            return () => clearTimeout(t);
        }
    }, [phase]);

    // ─── Welcome ───
    const handleWelcomeNext = () => {
        if (welcomeStep < WELCOME_SLIDES.length - 1) {
            setWelcomeStep(s => s + 1);
            setAnimKey(k => k + 1);
        } else {
            // Skip signup — go straight to ProductTour
            if (mode === 'welcome') {
                onComplete();
            } else {
                goTo('trigger-intro');
            }
        }
    };

    // ─── Signup → next step depends on mode ───
    const handleSignupComplete = useCallback(() => {
        if (mode === 'welcome') {
            onComplete(); // → ProductTour
        } else {
            goTo('trigger-intro');
        }
    }, [mode, onComplete, goTo]);

    // ─── Trigger answer ───
    const handleTriggerAnswer = (value: string) => {
        setIsAnswering(true);
        const newAnswers = [...triggerAnswers, value];
        setTriggerAnswers(newAnswers);
        setTimeout(() => {
            setIsAnswering(false);
            if (triggerIndex < MOCK_TRIGGERS.length - 1) {
                setTriggerIndex(i => i + 1);
                setAnimKey(k => k + 1);
            } else {
                // After all triggers → theme hub
                goTo('theme-hub');
            }
        }, 800);
    };

    // ─── Vuln question answer ───
    const handleVulnAnswer = (value: string) => {
        setIsAnswering(true);
        const newAnswers = [...questionAnswers, value];
        setQuestionAnswers(newAnswers);
        setTimeout(() => {
            setIsAnswering(false);
            const qs = currentVuln.questions;
            if (questionIndex < qs.length - 1) {
                setQuestionIndex(i => i + 1);
                setAnimKey(k => k + 1);
            } else {
                // All questions for this V done → recap
                goTo('vuln-recap');
            }
        }, 800);
    };

    // ─── After recap: mark completed → back to hub ───
    const handleRecapContinue = () => {
        const newCompleted = new Set(completedVulns);
        newCompleted.add(vulnIndex);
        setCompletedVulns(newCompleted);

        if (newCompleted.size >= ALL_VULNS.length) {
            // All themes done → analysis
            goTo('analysis');
        } else {
            // Back to hub
            goTo('theme-hub');
        }
    };

    // ─── Hub: pick a theme ───
    const handlePickTheme = (index: number) => {
        setVulnIndex(index);
        setQuestionIndex(0);
        setQuestionAnswers([]);
        goTo('vuln-intro');
    };

    return (
        <div
            className="absolute inset-0 z-[60] flex flex-col overflow-hidden"
            style={{
                background: 'linear-gradient(180deg, #E8F4F8 0%, #D6EDF0 100%)',
                fontFamily: "'Outfit', 'Inter', sans-serif",
            }}
        >
            {/* Top bar */}
            <div className="flex items-center justify-between px-6 pt-14 pb-2 z-10 flex-shrink-0">
                <div className="flex items-center">
                    <img src="/monka-logo.png" alt="Monka" className="h-8 object-contain" />
                </div>
                {phase !== 'analysis' && (
                    <button
                        onClick={onComplete}
                        className="text-[13px] text-[#8E8E93] font-medium hover:text-[#1A1A2E] transition-colors"
                    >
                        Passer
                    </button>
                )}
            </div>

            {/* Content area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto no-scrollbar">
                <div
                    key={animKey}
                    className="px-6 pb-8"
                    style={{ animation: 'ob-fadeIn 0.35s cubic-bezier(0.16, 1, 0.3, 1)' }}
                >
                    {/* ═══ WELCOME ═══ */}
                    {phase === 'welcome' && (() => {
                        const slide = WELCOME_SLIDES[welcomeStep];
                        return (
                            <div className="flex flex-col items-center text-center pt-8">
                                <div
                                    className="w-[120px] h-[120px] rounded-[28px] bg-white flex items-center justify-center mb-6 overflow-hidden"
                                    style={{ boxShadow: '0 8px 32px rgba(44,140,153,0.10)' }}
                                >
                                    <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                                </div>
                                <h1 className="text-[24px] font-bold text-[#1A1A2E] mb-1 leading-tight">{slide.title}</h1>
                                <p className="text-[14px] font-semibold text-[#2C8C99] mb-5">{slide.subtitle}</p>
                                {slide.description && (
                                    <p className="text-[15px] text-[#4A4A5A] leading-relaxed max-w-[280px] mb-4">{slide.description}</p>
                                )}
                                {slide.benefits && (
                                    <div className="space-y-3 mb-4 w-full max-w-[280px]">
                                        {slide.benefits.map((b, i) => (
                                            <div key={i} className="flex items-start gap-3 bg-white rounded-[16px] p-4 text-left" style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                                                <div className="mt-0.5 flex-shrink-0">{b.icon}</div>
                                                <p className="text-[13px] text-[#1A1A2E] font-medium leading-snug">{b.text}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <p className="text-[14px] font-semibold text-[#2C8C99] mt-2">{slide.highlight}</p>
                            </div>
                        );
                    })()}

                    {/* ═══ SIGNUP ═══ */}
                    {phase === 'signup' && (
                        <div className="flex flex-col items-center pt-6">
                            <div
                                className="w-[80px] h-[80px] rounded-[24px] bg-white flex items-center justify-center mb-5 overflow-hidden"
                                style={{ boxShadow: '0 8px 32px rgba(44,140,153,0.10)' }}
                            >
                                <img src="/monka-logo.png" alt="Monka" className="w-12 h-12 object-contain" />
                            </div>
                            <h1 className="text-[22px] font-bold text-[#1A1A2E] mb-1">Créez votre compte</h1>
                            <p className="text-[13px] text-[#8E8E93] mb-6">Pour sauvegarder votre parcours</p>

                            <div className="w-full max-w-[340px] space-y-3">
                                {/* Google */}
                                <button
                                    onClick={handleSignupComplete}
                                    className="w-full flex items-center gap-3 py-3.5 px-5 rounded-[16px] bg-white text-[14px] font-semibold text-[#1A1A2E] transition-all hover:shadow-md active:scale-[0.98]"
                                    style={{ border: '1.5px solid #E5E5EA', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
                                >
                                    <GoogleLogo size={22} weight="bold" />
                                    <span className="flex-1">Continuer avec Google</span>
                                    <CaretRight size={16} className="text-[#C8CCD0]" />
                                </button>

                                {/* Apple */}
                                <button
                                    onClick={handleSignupComplete}
                                    className="w-full flex items-center gap-3 py-3.5 px-5 rounded-[16px] text-[14px] font-semibold text-white transition-all hover:shadow-md active:scale-[0.98]"
                                    style={{ background: '#1A1A2E', boxShadow: '0 4px 16px rgba(0,0,0,0.12)' }}
                                >
                                    <AppleLogo size={22} weight="fill" />
                                    <span className="flex-1">Continuer avec Apple</span>
                                    <CaretRight size={16} className="text-white/40" />
                                </button>

                                {/* Divider */}
                                <div className="flex items-center gap-3 py-2">
                                    <div className="flex-1 h-px bg-[#E5E5EA]" />
                                    <span className="text-[11px] text-[#C8CCD0] font-medium uppercase tracking-wider">ou</span>
                                    <div className="flex-1 h-px bg-[#E5E5EA]" />
                                </div>

                                {/* Email */}
                                <div className="space-y-2.5">
                                    <div className="relative">
                                        <EnvelopeSimple size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C8CCD0]" />
                                        <input
                                            type="email"
                                            placeholder="votre@email.com"
                                            className="w-full py-3.5 pl-11 pr-4 rounded-[14px] bg-white text-[14px] text-[#1A1A2E] placeholder-[#C8CCD0] outline-none transition-all focus:ring-2 focus:ring-[#2C8C99]/20"
                                            style={{ border: '1.5px solid #E5E5EA' }}
                                        />
                                    </div>
                                    <div className="relative">
                                        <ShieldCheck size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C8CCD0]" />
                                        <input
                                            type="password"
                                            placeholder="Mot de passe"
                                            className="w-full py-3.5 pl-11 pr-4 rounded-[14px] bg-white text-[14px] text-[#1A1A2E] placeholder-[#C8CCD0] outline-none transition-all focus:ring-2 focus:ring-[#2C8C99]/20"
                                            style={{ border: '1.5px solid #E5E5EA' }}
                                        />
                                    </div>
                                </div>

                                {/* CGU */}
                                <label className="flex items-start gap-3 pt-2 cursor-pointer">
                                    <button
                                        onClick={() => setCguChecked(!cguChecked)}
                                        className="mt-0.5 w-5 h-5 rounded-[6px] flex items-center justify-center flex-shrink-0 transition-all"
                                        style={{
                                            backgroundColor: cguChecked ? '#2C8C99' : 'white',
                                            border: `1.5px solid ${cguChecked ? '#2C8C99' : '#D1D5DB'}`,
                                        }}
                                    >
                                        {cguChecked && (
                                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                                <path d="M2.5 6L5 8.5L9.5 3.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        )}
                                    </button>
                                    <span className="text-[12px] text-[#8E8E93] leading-relaxed">
                                        J'accepte les <span className="text-[#2C8C99] font-semibold underline">conditions d'utilisation</span> et la <span className="text-[#2C8C99] font-semibold underline">politique de confidentialité</span>
                                    </span>
                                </label>

                                {/* Email CTA */}
                                <button
                                    onClick={handleSignupComplete}
                                    className="w-full py-3.5 rounded-[14px] text-[14px] font-bold text-white transition-all active:scale-[0.97]"
                                    style={{
                                        background: 'linear-gradient(135deg, #2C8C99 0%, #1A6B75 100%)',
                                        boxShadow: '0 4px 16px rgba(44,140,153,0.25)',
                                        opacity: cguChecked ? 1 : 0.5,
                                    }}
                                >
                                    Créer mon compte
                                </button>
                            </div>
                        </div>
                    )}

                    {/* ═══ TRIGGER INTRO ═══ */}
                    {phase === 'trigger-intro' && (
                        <div className="flex flex-col items-center text-center pt-4">
                            {/* Illustration */}
                            <div
                                className="max-w-[200px] w-full aspect-square mb-5 flex items-center justify-center rounded-[28px] overflow-hidden bg-white"
                                style={{ animation: 'ob-bounceIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)', boxShadow: '0 8px 32px rgba(44,140,153,0.10)' }}
                            >
                                <img
                                    src="/intro_personalize.png"
                                    alt="Personnalisation"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <h1 className="text-[22px] font-bold text-[#1A1A2E] mb-2"
                                style={{ animation: 'ob-fadeIn 0.4s ease-out 200ms both' }}
                            >Apprenons à vous connaître</h1>

                            <p className="text-[14px] text-[#4A4A5A] leading-relaxed max-w-[280px] mb-4"
                                style={{ animation: 'ob-fadeIn 0.4s ease-out 350ms both' }}
                            >
                                Quelques questions rapides pour que Monka s'adapte à votre situation — qui est votre proche, quelle est sa pathologie, votre quotidien.
                            </p>

                            {/* Benefit */}
                            <div
                                className="flex items-start gap-2.5 text-left px-4 py-3 rounded-[14px] mb-4 w-full"
                                style={{
                                    backgroundColor: '#ECFDF5',
                                    animation: 'ob-fadeIn 0.4s ease-out 500ms both',
                                }}
                            >
                                <CheckCircle size={18} weight="fill" className="text-[#10B981] flex-shrink-0 mt-0.5" />
                                <span className="text-[13px] text-[#065F46] leading-snug">
                                    Vos recommandations seront personnalisées dès le départ.
                                </span>
                            </div>

                            {/* Meta */}
                            <div className="flex items-center gap-3 mb-6"
                                style={{ animation: 'ob-fadeIn 0.4s ease-out 650ms both' }}
                            >
                                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white" style={{ border: '1px solid #E5E5EA' }}>
                                    <ChatDots size={14} weight="fill" className="text-[#2C8C99] opacity-70" />
                                    <span className="text-[12px] font-semibold text-[#2C8C99]">3 questions</span>
                                </div>
                                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white" style={{ border: '1px solid #E5E5EA' }}>
                                    <Clock size={14} weight="fill" className="text-[#8E8E93] opacity-70" />
                                    <span className="text-[12px] font-semibold text-[#8E8E93]">~1 min</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ═══ TRIGGERS ═══ */}
                    {phase === 'triggers' && (
                        <div className="pt-4 space-y-6">
                            {/* Progress label */}
                            <div className="flex items-center gap-2 mb-2">
                                <div className="flex-1 h-1 rounded-full bg-[#E5E5EA] overflow-hidden">
                                    <div
                                        className="h-full rounded-full transition-all duration-500"
                                        style={{
                                            width: `${((triggerIndex) / MOCK_TRIGGERS.length) * 100}%`,
                                            background: 'linear-gradient(90deg, #2C8C99, #1A6B75)',
                                        }}
                                    />
                                </div>
                                <span className="text-[11px] font-semibold text-[#8E8E93]">
                                    {triggerIndex + 1}/{MOCK_TRIGGERS.length}
                                </span>
                            </div>

                            {/* Answered triggers */}
                            {triggerAnswers.map((ans, i) => (
                                <div key={i} className="space-y-3">
                                    <QuestionBubble text={MOCK_TRIGGERS[i].text} domain="R" animated={false} />
                                    <AnswerBubble text={ans} isConfirmed animated={false} />
                                </div>
                            ))}

                            {/* Current trigger — hidden during answer transition to prevent duplication */}
                            {triggerIndex < MOCK_TRIGGERS.length && !isAnswering && (
                                <div className="space-y-3">
                                    <QuestionBubble
                                        text={MOCK_TRIGGERS[triggerIndex].text}
                                        domain="R"
                                        animated
                                        animDelay={triggerAnswers.length > 0 ? 200 : 400}
                                    />
                                    {MOCK_TRIGGERS[triggerIndex].hint && (
                                        <p
                                            className="text-[11.5px] text-[#8E8E93] italic ml-[52px] -mt-1 mb-1"
                                            style={{ animation: 'ob-fadeIn 0.4s ease-out 1200ms both' }}
                                        >
                                            {MOCK_TRIGGERS[triggerIndex].hint}
                                        </p>
                                    )}
                                    <div className="space-y-2" style={{ marginLeft: 52 }}>
                                        {MOCK_TRIGGERS[triggerIndex].options.map((opt, i) => (
                                            <div
                                                key={opt}
                                                style={{ animation: `ob-optionIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) ${1800 + i * 60}ms both` }}
                                            >
                                                <MOptionPill
                                                    label={opt}
                                                    onClick={() => handleTriggerAnswer(opt)}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* ═══ THEME HUB ═══ */}
                    {phase === 'theme-hub' && (
                        <div className="flex flex-col pt-6">
                            <div className="text-center mb-6">
                                <h1 className="text-[22px] font-bold text-[#1A1A2E] mb-2">Personnalisons votre espace</h1>
                                <p className="text-[14px] text-[#4A4A5A] leading-relaxed max-w-[280px] mx-auto">
                                    Choisissez un thème pour commencer. Vous pouvez les faire dans l'ordre que vous voulez.
                                </p>
                                <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white" style={{ border: '1px solid #E5E5EA' }}>
                                    <CheckCircle size={14} weight="fill" className="text-[#10B981]" />
                                    <span className="text-[12px] font-semibold text-[#4A4A5A]">
                                        {completedVulns.size}/{ALL_VULNS.length} thèmes complétés
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                {ALL_VULNS.map((v, i) => {
                                    const isCompleted = completedVulns.has(i);
                                    const domainColor = ThemeColors[v.domain]?.color ?? '#8E8E93';
                                    return (
                                        <button
                                            key={v.id}
                                            onClick={() => !isCompleted && handlePickTheme(i)}
                                            className="w-full flex items-center gap-4 rounded-[18px] px-4 py-4 text-left transition-all active:scale-[0.98]"
                                            style={{
                                                backgroundColor: isCompleted ? '#F0FDF4' : 'rgba(255,255,255,0.8)',
                                                backdropFilter: 'blur(8px)',
                                                border: isCompleted ? '1.5px solid #BBF7D0' : '1.5px solid #E5E5EA',
                                                boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                                                opacity: isCompleted ? 0.85 : 1,
                                                animation: `ob-optionIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) ${i * 80}ms both`,
                                            }}
                                        >
                                            <ThemeButton domain={v.domain} size="sm" />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-[14px] font-semibold text-[#1A1A2E]">{v.name}</p>
                                                <p className="text-[11.5px] text-[#8E8E93] mt-0.5">
                                                    {v.questions.length} questions · ~{v.estimatedMinutes} min
                                                </p>
                                            </div>
                                            {isCompleted ? (
                                                <CheckCircle size={22} weight="fill" className="text-[#10B981] flex-shrink-0" />
                                            ) : (
                                                <ArrowRight size={16} weight="bold" style={{ color: domainColor }} className="flex-shrink-0" />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>

                            {completedVulns.size >= ALL_VULNS.length && (
                                <button
                                    onClick={() => goTo('analysis')}
                                    className="w-full py-4 rounded-[16px] text-[15px] font-bold text-white transition-all active:scale-[0.97] mt-6"
                                    style={{
                                        background: 'linear-gradient(135deg, #2C8C99 0%, #1A6B75 100%)',
                                        boxShadow: '0 6px 24px rgba(44,140,153,0.3)',
                                        animation: 'ob-fadeIn 0.5s ease-out',
                                    }}
                                >
                                    Découvrir mes recommandations
                                </button>
                            )}

                            {/* Demo skip — complete all themes at once */}
                            {completedVulns.size < ALL_VULNS.length && (
                                <button
                                    onClick={() => {
                                        const allDone = new Set(ALL_VULNS.map((_, i) => i));
                                        setCompletedVulns(allDone);
                                        goTo('analysis');
                                    }}
                                    className="text-[13px] font-medium text-[#8E8E93] hover:text-[#4A4A5A] transition-colors mt-4"
                                    style={{ animation: 'ob-fadeIn 0.4s ease-out 400ms both' }}
                                >
                                    Compléter tous les thèmes →
                                </button>
                            )}
                        </div>
                    )}

                    {/* ═══ VULN INTRO ═══ */}
                    {phase === 'vuln-intro' && (() => {
                        const domainColor = ThemeColors[currentVuln.domain]?.color ?? '#2C8C99';
                        const introData = VULN_INTRO_DATA[currentVuln.domain];
                        return (
                            <div className="flex flex-col items-center text-center pt-2">
                                {/* Progress across all Vs */}
                                <div className="flex items-center gap-2 mb-4 w-full">
                                    {ALL_VULNS.map((v: MockVulnerability, i: number) => (
                                        <div key={v.id} className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: '#E5E5EA' }}>
                                            <div
                                                className="h-full rounded-full transition-all duration-500"
                                                style={{
                                                    width: i < vulnIndex ? '100%' : i === vulnIndex ? '10%' : '0%',
                                                    backgroundColor: ThemeColors[v.domain]?.color ?? '#8E8E93',
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>

                                {/* Illustration */}
                                <div
                                    className="max-w-[200px] w-full aspect-square mb-4 flex items-center justify-center rounded-[28px] overflow-hidden bg-white"
                                    style={{ animation: 'ob-bounceIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)', boxShadow: '0 8px 32px rgba(44,140,153,0.10)' }}
                                >
                                    <img
                                        src={introData.image}
                                        alt={introData.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Domain tag */}
                                <span
                                    className="text-[12px] font-semibold px-3 py-1 rounded-full mb-2"
                                    style={{
                                        color: domainColor,
                                        backgroundColor: `${domainColor}10`,
                                        animation: 'ob-fadeIn 0.4s ease-out 150ms both',
                                    }}
                                >
                                    {DOMAIN_LABELS[currentVuln.domain]}
                                </span>

                                {/* Title */}
                                <h1
                                    className="text-[22px] font-bold text-[#1A1A2E] mb-2"
                                    style={{ animation: 'ob-fadeIn 0.4s ease-out 250ms both' }}
                                >{introData.title}</h1>

                                {/* Description */}
                                <p
                                    className="text-[14px] text-[#4A4A5A] leading-relaxed max-w-[280px] mb-4"
                                    style={{ animation: 'ob-fadeIn 0.4s ease-out 400ms both' }}
                                >
                                    {introData.description}
                                </p>

                                {/* Benefit callout */}
                                <div
                                    className="flex items-start gap-2.5 text-left px-4 py-3 rounded-[14px] mb-4 w-full"
                                    style={{
                                        backgroundColor: '#ECFDF5',
                                        animation: 'ob-fadeIn 0.4s ease-out 550ms both',
                                    }}
                                >
                                    <CheckCircle size={18} weight="fill" className="text-[#10B981] flex-shrink-0 mt-0.5" />
                                    <span className="text-[13px] text-[#065F46] leading-snug">
                                        {introData.benefit}
                                    </span>
                                </div>

                                {/* Meta — question count + time */}
                                <div className="flex items-center gap-3 mb-4"
                                    style={{ animation: 'ob-fadeIn 0.4s ease-out 700ms both' }}
                                >
                                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white" style={{ border: '1px solid #E5E5EA' }}>
                                        <ChatDots size={14} weight="fill" style={{ color: domainColor, opacity: 0.7 }} />
                                        <span className="text-[12px] font-semibold" style={{ color: domainColor }}>
                                            {currentVuln.questions.length} questions
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white" style={{ border: '1px solid #E5E5EA' }}>
                                        <Clock size={14} weight="fill" className="text-[#8E8E93] opacity-70" />
                                        <span className="text-[12px] font-semibold text-[#8E8E93]">~2 min</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })()}

                    {/* ═══ VULN QUESTIONS ═══ */}
                    {phase === 'vuln-questions' && (
                        <div className="pt-4 space-y-6">
                            {/* Progress — domain-colored with label */}
                            <div className="flex items-center gap-2 mb-2">
                                <ThemeButton domain={currentVuln.domain} size="sm" />
                                <div className="flex-1 h-1 rounded-full bg-[#E5E5EA] overflow-hidden">
                                    <div
                                        className="h-full rounded-full transition-all duration-500"
                                        style={{
                                            width: `${((questionIndex) / currentVuln.questions.length) * 100}%`,
                                            backgroundColor: ThemeColors[currentVuln.domain]?.color ?? '#8E8E93',
                                        }}
                                    />
                                </div>
                                <span className="text-[11px] font-semibold text-[#8E8E93]">
                                    {questionIndex + 1}/{currentVuln.questions.length}
                                </span>
                            </div>

                            {/* Answered Qs */}
                            {questionAnswers.map((ans, i) => (
                                <div key={i} className="space-y-3">
                                    <QuestionBubble text={currentVuln.questions[i].text} domain={currentVuln.domain} animated={false} />
                                    <AnswerBubble text={ans} isConfirmed animated={false} />
                                </div>
                            ))}

                            {/* Current Q — with hint when relevant (hidden during answer transition to prevent duplication) */}
                            {questionIndex < currentVuln.questions.length && !isAnswering && (
                                <div className="space-y-3">
                                    <QuestionBubble
                                        text={currentVuln.questions[questionIndex].text}
                                        domain={currentVuln.domain}
                                        animated
                                        animDelay={questionAnswers.length > 0 ? 200 : 400}
                                    />
                                    {currentVuln.questions[questionIndex].hint && (
                                        <p
                                            className="text-[11.5px] text-[#8E8E93] italic ml-[52px] -mt-1 mb-1"
                                            style={{ animation: 'ob-fadeIn 0.4s ease-out 1200ms both' }}
                                        >
                                            {currentVuln.questions[questionIndex].hint}
                                        </p>
                                    )}
                                    <div className="space-y-2" style={{ marginLeft: 52 }}>
                                        {currentVuln.questions[questionIndex].options.map((opt, i) => (
                                            <div
                                                key={opt}
                                                style={{ animation: `ob-optionIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) ${1800 + i * 60}ms both` }}
                                            >
                                                <MOptionPill
                                                    label={opt}
                                                    onClick={() => handleVulnAnswer(opt)}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* ═══ VULN RECAP — premium progressive radar ═══ */}
                    {phase === 'vuln-recap' && currentRecap && (() => {
                        const domainColor = ThemeColors[currentVuln.domain]?.color ?? '#2C8C99';
                        const visibleVulns = new Set([...completedVulns, vulnIndex]);
                        const targetValues = SPIDER_DOMAINS.map((d, si) => {
                            const vulnIdx = VULN_TO_SPIDER.indexOf(si);
                            return vulnIdx !== -1 && visibleVulns.has(vulnIdx) ? d.target : 0;
                        });

                        const completedAfterThis = completedVulns.size + 1;
                        const introData = VULN_INTRO_DATA[currentVuln.domain];

                        return (
                            <div className="flex flex-col items-center text-center pt-3">
                                {/* Completion badge */}
                                <div
                                    className="flex items-center gap-2 mb-3 px-4 py-2 rounded-full"
                                    style={{ backgroundColor: '#ECFDF5', animation: 'ob-fadeIn 0.4s ease-out' }}
                                >
                                    <Sparkle size={16} weight="fill" className="text-[#10B981]" />
                                    <span className="text-[13px] font-bold text-[#10B981]">Thème complété !</span>
                                </div>

                                {/* Domain + title — using intro data */}
                                <div className="flex items-center gap-2.5 mb-1" style={{ animation: 'ob-fadeIn 0.3s ease-out 100ms both' }}>
                                    <ThemeButton domain={currentVuln.domain} size="sm" />
                                    <h2 className="text-[18px] font-bold text-[#1A1A2E]">{introData.title}</h2>
                                </div>

                                {/* Progress counter */}
                                <p className="text-[12px] text-[#8E8E93] mb-3" style={{ animation: 'ob-fadeIn 0.3s ease-out 200ms both' }}>
                                    {completedAfterThis}/{ALL_VULNS.length} thèmes analysés
                                </p>

                                {/* Section header for chart */}
                                <p className="text-[10px] font-bold text-[#C8CCD0] uppercase tracking-[0.15em] mb-2"
                                    style={{ animation: 'ob-fadeIn 0.3s ease-out 300ms both' }}
                                >
                                    Votre profil
                                </p>

                                {/* Animated progressive radar chart */}
                                <RecapRadar
                                    targetValues={targetValues}
                                    visibleVulns={visibleVulns}
                                    domainColor={domainColor}
                                />

                                {/* Activated paths */}
                                <div className="w-full space-y-2 mb-4">
                                    <p className="text-[11px] font-bold text-[#8E8E93] uppercase tracking-[0.1em] text-left mb-3">Parcours débloqués pour vous</p>
                                    {currentRecap.activatedMPs.map((mp, i) => {
                                        const lc = LEVEL_COLORS[mp.level] ?? LEVEL_COLORS.standard;
                                        return (
                                            <div
                                                key={mp.id}
                                                className="flex items-center gap-3 rounded-[14px] px-4 py-3 text-left"
                                                style={{
                                                    backgroundColor: lc.bg,
                                                    animation: `ob-optionIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) ${800 + i * 100}ms both`,
                                                }}
                                            >
                                                <div className="w-[8px] h-[8px] rounded-full flex-shrink-0" style={{ backgroundColor: lc.dot }} />
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-[13px] font-semibold text-[#1A1A2E]">{mp.name}</p>
                                                    <p className="text-[11px] text-[#8E8E93] mt-0.5">{mp.taskCount} action{mp.taskCount > 1 ? 's' : ''} · {lc.label}</p>
                                                </div>
                                                <ArrowRight size={14} weight="bold" className="text-[#C8CCD0] flex-shrink-0" />
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* CTA */}
                                <button
                                    onClick={handleRecapContinue}
                                    className="w-full py-4 rounded-[16px] text-[15px] font-bold text-white transition-all active:scale-[0.97] mt-2"
                                    style={{
                                        background: 'linear-gradient(135deg, #2C8C99 0%, #1A6B75 100%)',
                                        boxShadow: '0 6px 24px rgba(44,140,153,0.3)',
                                        animation: `ob-fadeIn 0.4s ease-out ${800 + currentRecap.activatedMPs.length * 100 + 200}ms both`,
                                    }}
                                >
                                    {completedAfterThis < ALL_VULNS.length
                                        ? 'Retour aux thèmes →'
                                        : 'Voir mes recommandations →'
                                    }
                                </button>

                                {/* Skip button for demo */}
                                {completedAfterThis >= 2 && completedAfterThis < ALL_VULNS.length && (
                                    <button
                                        onClick={() => {
                                            const newCompleted = new Set(completedVulns);
                                            newCompleted.add(vulnIndex);
                                            setCompletedVulns(newCompleted);
                                            goTo('analysis');
                                        }}
                                        className="text-[13px] font-medium text-[#8E8E93] hover:text-[#4A4A5A] transition-colors mt-3"
                                        style={{ animation: `ob-fadeIn 0.4s ease-out ${1000 + currentRecap.activatedMPs.length * 100}ms both` }}
                                    >
                                        Passer à l'analyse complète →
                                    </button>
                                )}
                            </div>
                        );
                    })()}

                    {/* ═══ ANALYSIS — enriched final screen ═══ */}
                    {phase === 'analysis' && (() => {
                        const allTargetValues = SPIDER_DOMAINS.map(d => d.target);
                        const allVisibleVulns = new Set(ALL_VULNS.map((_, i) => i));

                        // Domain summaries for the recap
                        const domainSummaries: { domain: string; label: string; color: string; priority: string }[] = [
                            { domain: 'R', label: 'Vie sociale', color: '#F59E0B', priority: 'Rompre l\'isolement' },
                            { domain: 'A', label: 'Démarches', color: '#8B5CF6', priority: 'Accéder à vos droits' },
                            { domain: 'S', label: 'Santé', color: '#10B981', priority: 'Prendre soin de vous' },
                            { domain: 'F', label: 'Votre proche', color: '#F97316', priority: 'Sécuriser le quotidien' },
                            { domain: 'M', label: 'Parcours soins', color: '#2C8C99', priority: 'Coordonner les soins' },
                        ];

                        return (
                            <div className="flex flex-col items-center text-center pt-2">
                                {/* Title */}
                                <h1
                                    className="text-[22px] font-bold text-[#1A1A2E] mb-1 leading-tight"
                                    style={{ animation: 'ob-fadeIn 0.4s ease-out 200ms both' }}
                                >
                                    Votre profil est prêt
                                </h1>
                                <p
                                    className="text-[13px] text-[#4A4A5A] leading-relaxed max-w-[280px] mb-3"
                                    style={{ animation: 'ob-fadeIn 0.4s ease-out 400ms both' }}
                                >
                                    Grâce à vos réponses, Monka a identifié vos priorités dans chaque domaine.
                                </p>

                                {/* Full radar — all domains visible */}
                                <div style={{ animation: 'ob-fadeIn 0.5s ease-out 600ms both' }}>
                                    <RecapRadar
                                        targetValues={allTargetValues}
                                        visibleVulns={allVisibleVulns}
                                        domainColor="#2C8C99"
                                    />
                                </div>

                                {/* Domain breakdown with ThemeButton icons */}
                                <div
                                    className="w-full rounded-[18px] p-4 mt-1"
                                    style={{
                                        backgroundColor: 'rgba(255,255,255,0.8)',
                                        border: '1.5px solid #E5E5EA',
                                        animation: 'ob-fadeIn 0.4s ease-out 1000ms both',
                                    }}
                                >
                                    <p className="text-[11px] font-bold text-[#8E8E93] uppercase tracking-wider mb-3">Ce que Monka a préparé pour vous</p>
                                    <div className="space-y-3">
                                        {domainSummaries.map((ds, i) => (
                                            <div
                                                key={ds.domain}
                                                className="flex items-center gap-3"
                                                style={{ animation: `ob-optionIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) ${1100 + i * 80}ms both` }}
                                            >
                                                <ThemeButton domain={ds.domain as VulnerabilityDomain} size="sm" />
                                                <div className="flex-1 text-left">
                                                    <p className="text-[12.5px] font-semibold text-[#1A1A2E]">{ds.label}</p>
                                                    <p className="text-[10.5px] text-[#8E8E93]">{ds.priority}</p>
                                                </div>
                                                <CheckCircle size={16} weight="fill" className="text-[#10B981] flex-shrink-0" />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Benefit callout */}
                                <div
                                    className="flex items-start gap-2 mt-3 px-4 py-3 rounded-[14px] text-left"
                                    style={{
                                        backgroundColor: '#ECFDF5',
                                        border: '1px solid #D1FAE5',
                                        animation: 'ob-fadeIn 0.4s ease-out 1600ms both',
                                    }}
                                >
                                    <CheckCircle size={16} weight="fill" className="text-[#10B981] mt-0.5 flex-shrink-0" />
                                    <p className="text-[12px] text-[#065F46] leading-relaxed">
                                        Un parcours personnalisé avec des actions concrètes vous attend — adapté à votre rythme.
                                    </p>
                                </div>
                            </div>
                        );
                    })()}

                    {/* ═══ IDEC RDV — Monka style ═══ */}
                    {phase === 'idec-rdv' && (
                        <div className="flex flex-col items-center text-center pt-4">
                            {/* Monka-style illustration container */}
                            <div
                                className="w-[100px] h-[100px] rounded-[28px] overflow-hidden bg-white flex items-center justify-center mb-5"
                                style={{
                                    boxShadow: '0 8px 32px rgba(44,140,153,0.10)',
                                    animation: 'ob-bounceIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both',
                                }}
                            >
                                <CalendarCheck size={44} weight="duotone" className="text-[#2C8C99]" />
                            </div>
                            <h1
                                className="text-[22px] font-bold text-[#1A1A2E] mb-1 leading-tight"
                                style={{ animation: 'ob-fadeIn 0.3s ease-out 200ms both' }}
                            >
                                Échangez avec un professionnel
                            </h1>
                            <p
                                className="text-[13px] text-[#4A4A5A] leading-relaxed max-w-[280px] mb-5"
                                style={{ animation: 'ob-fadeIn 0.3s ease-out 350ms both' }}
                            >
                                Un·e Infirmier·e de Coordination fait le point avec vous sur votre situation et vos prochaines étapes.
                            </p>

                            {/* Card */}
                            <div
                                className="w-full rounded-[18px] p-4 mb-4"
                                style={{
                                    backgroundColor: 'rgba(255,255,255,0.85)',
                                    backdropFilter: 'blur(8px)',
                                    border: '1.5px solid #E5E5EA',
                                    animation: 'ob-fadeIn 0.4s ease-out 500ms both',
                                }}
                            >
                                {/* Header */}
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-9 h-9 rounded-[10px] flex items-center justify-center" style={{ backgroundColor: '#E6F7F8' }}>
                                        <FirstAid size={18} weight="duotone" className="text-[#2C8C99]" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-[14px] font-semibold text-[#1A1A2E]">Premier bilan gratuit</p>
                                        <p className="text-[11px] text-[#8E8E93]">30 min · À distance, gratuit</p>
                                    </div>
                                </div>

                                {/* Benefits */}
                                <div className="space-y-2 mb-4">
                                    {[
                                        'Comprendre votre situation ensemble',
                                        'Identifier vos priorités d\'accompagnement',
                                        'Vous orienter vers les bonnes aides',
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-start gap-2 text-left">
                                            <CheckCircle size={14} weight="fill" className="text-[#2C8C99] mt-0.5 flex-shrink-0" />
                                            <span className="text-[12px] text-[#4A4A5A]">{item}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* CTA — Monka teal */}
                                <a
                                    href="https://calendly.com/monka-rdv/premier-bilan"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-[14px] text-[15px] font-bold text-white transition-all active:scale-[0.97]"
                                    style={{
                                        background: 'linear-gradient(135deg, #2C8C99 0%, #1A6B75 100%)',
                                        boxShadow: '0 4px 16px rgba(44,140,153,0.3)',
                                    }}
                                >
                                    <CalendarCheck size={18} weight="bold" />
                                    Prendre rendez-vous
                                </a>
                            </div>

                            <button
                                onClick={onComplete}
                                className="text-[13px] font-medium text-[#8E8E93] hover:text-[#4A4A5A] transition-colors mt-1"
                                style={{ animation: 'ob-fadeIn 0.4s ease-out 800ms both' }}
                            >
                                Peut-être plus tard
                            </button>
                        </div>
                    )}
                </div>
            </div >

            {/* Bottom bar */}
            < div className="pb-6 px-6 flex flex-col items-center gap-4 flex-shrink-0" >
                {/* Dots for welcome */}
                {
                    phase === 'welcome' && (
                        <div className="flex gap-2">
                            {WELCOME_SLIDES.map((_, i) => (
                                <div
                                    key={i}
                                    className="h-[6px] rounded-full transition-all duration-300"
                                    style={{
                                        width: i === welcomeStep ? 24 : 6,
                                        backgroundColor: i === welcomeStep ? '#2C8C99' : '#C8CCD0',
                                    }}
                                />
                            ))}
                        </div>
                    )
                }

                {/* CTA for welcome */}
                {
                    phase === 'welcome' && (
                        <button
                            onClick={handleWelcomeNext}
                            className="w-full py-4 rounded-[16px] text-[16px] font-bold text-white transition-all active:scale-[0.97]"
                            style={{
                                background: 'linear-gradient(135deg, #2C8C99 0%, #1A6B75 100%)',
                                boxShadow: '0 6px 24px rgba(44,140,153,0.3)',
                            }}
                        >
                            {welcomeStep === WELCOME_SLIDES.length - 1 ? 'C\'est parti !' : 'Suivant'}
                        </button>
                    )
                }

                {/* CTA for trigger intro */}
                {
                    phase === 'trigger-intro' && (
                        <button
                            onClick={() => goTo('triggers')}
                            className="w-full py-4 rounded-[16px] text-[16px] font-bold text-white transition-all active:scale-[0.97]"
                            style={{
                                background: 'linear-gradient(135deg, #2C8C99 0%, #1A6B75 100%)',
                                boxShadow: '0 6px 24px rgba(44,140,153,0.3)',
                            }}
                        >
                            Commencer
                        </button>
                    )
                }

                {/* CTA for vuln intro */}
                {
                    phase === 'vuln-intro' && (
                        <button
                            onClick={() => {
                                setQuestionIndex(0);
                                setQuestionAnswers([]);
                                goTo('vuln-questions');
                            }}
                            className="w-full py-4 rounded-[16px] text-[16px] font-bold text-white transition-all active:scale-[0.97]"
                            style={{
                                background: 'linear-gradient(135deg, #2C8C99 0%, #1A6B75 100%)',
                                boxShadow: '0 6px 24px rgba(44,140,153,0.3)',
                            }}
                        >
                            Commencer
                        </button>
                    )
                }

                {/* CTA for analysis done */}
                {
                    phase === 'analysis' && analysisReady && (
                        <button
                            onClick={() => goTo('idec-rdv')}
                            className="w-full py-4 rounded-[16px] text-[16px] font-bold text-white transition-all active:scale-[0.97]"
                            style={{
                                background: 'linear-gradient(135deg, #2C8C99 0%, #1A6B75 100%)',
                                boxShadow: '0 6px 24px rgba(44,140,153,0.3)',
                                animation: 'ob-fadeIn 0.5s ease-out',
                            }}
                        >
                            Continuer
                        </button>
                    )
                }
            </div >

            {/* Animations */}
            < style jsx > {`
                @keyframes ob-fadeIn {
                    from { opacity: 0; transform: translateY(8px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes ob-bounceIn {
                    from { opacity: 0; transform: scale(0.4) translateY(16px); }
                    to { opacity: 1; transform: scale(1) translateY(0); }
                }
                @keyframes ob-optionIn {
                    from { opacity: 0; transform: translateY(10px) scale(0.97); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes pulse {
                    0%, 100% { opacity: 0.5; }
                    50% { opacity: 1; }
                }
            `}</style >
        </div >
    );
};
