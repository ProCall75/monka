'use client';

import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import ReactFlow, {
    Background,
    Controls,
    MiniMap,
    type Node,
    type Edge,
    type NodeProps,
    Position,
    MarkerType,
    Handle,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { ArrowLeft, Warning, CheckCircle, XCircle, MapPin, ArrowsOut, ArrowsIn, PencilSimple, List, ArrowUp, ArrowDown, DotsSixVertical } from '@phosphor-icons/react';
import Link from 'next/link';

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */
type AnnotationType = 'positive' | 'warning' | 'critical';

interface PhoneNodeData {
    label: string;
    screenshot: string;
    stepNumber: number;
    annotation?: AnnotationType;
    annotationText?: string;
    verbatim?: string;
    verbatimSeverity?: 'bloquant' | 'majeur' | 'mineur';
}

/* ─────────────────────────────────────────────
   Annotation Styles
───────────────────────────────────────────── */
const ANNOTATION_CONFIG: Record<AnnotationType, { bg: string; border: string; text: string; icon: React.ReactNode; label: string }> = {
    positive: {
        bg: '#ECFDF5',
        border: '#6EE7B7',
        text: '#065F46',
        icon: <CheckCircle size={14} weight="fill" color="#059669" />,
        label: 'OK',
    },
    warning: {
        bg: '#FFFBEB',
        border: '#FCD34D',
        text: '#92400E',
        icon: <Warning size={14} weight="fill" color="#D97706" />,
        label: 'Friction',
    },
    critical: {
        bg: '#FEF2F2',
        border: '#FCA5A5',
        text: '#991B1B',
        icon: <XCircle size={14} weight="fill" color="#DC2626" />,
        label: 'Bloquant',
    },
};

/* ─────────────────────────────────────────────
   Custom Phone Node
───────────────────────────────────────────── */
const PhoneNode = ({ data }: NodeProps<PhoneNodeData>) => {
    const cfg = data.annotation ? ANNOTATION_CONFIG[data.annotation] : null;

    return (
        <div
            style={{ cursor: 'grab' }}
        >
            <Handle type="target" position={Position.Left} style={{ background: '#94A3B8', width: 8, height: 8 }} />
            <Handle type="source" position={Position.Right} style={{ background: '#94A3B8', width: 8, height: 8 }} />

            {/* Step badge */}
            <div style={{
                position: 'absolute',
                top: -12,
                left: -12,
                width: 28,
                height: 28,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #1E293B, #334155)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 12,
                fontWeight: 700,
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                zIndex: 10,
            }}>
                {data.stepNumber}
            </div>

            {/* Phone frame */}
            <div style={{
                width: 140,
                background: '#1a1a1a',
                borderRadius: 20,
                padding: 4,
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            }}>
                {/* Notch */}
                <div style={{
                    width: 50,
                    height: 6,
                    background: '#1a1a1a',
                    borderRadius: 3,
                    margin: '4px auto 2px',
                    zIndex: 5,
                }} />
                {/* Screen */}
                <div style={{
                    borderRadius: 16,
                    overflow: 'hidden',
                    background: '#fff',
                }}>
                    <img
                        src={data.screenshot}
                        alt={data.label}
                        style={{
                            width: '100%',
                            height: 260,
                            objectFit: 'cover',
                            objectPosition: 'top',
                            display: 'block',
                        }}
                    />
                </div>
                {/* Home bar */}
                <div style={{
                    width: 40,
                    height: 4,
                    background: '#555',
                    borderRadius: 2,
                    margin: '5px auto 3px',
                }} />
            </div>

            {/* Label */}
            <div style={{
                textAlign: 'center',
                marginTop: 10,
                maxWidth: 140,
            }}>
                <p style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: '#1E293B',
                    lineHeight: 1.3,
                    marginBottom: 4,
                    fontFamily: "'Outfit', sans-serif",
                }}>{data.label}</p>

                {/* Annotation badge */}
                {cfg && (
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 4,
                        padding: '3px 8px',
                        borderRadius: 20,
                        background: cfg.bg,
                        border: `1px solid ${cfg.border}`,
                        fontSize: 10,
                        fontWeight: 600,
                        color: cfg.text,
                        fontFamily: "'Outfit', sans-serif",
                    }}>
                        {cfg.icon}
                        {cfg.label}
                    </div>
                )}
            </div>

            {/* Verbatim quote from Amal */}
            {data.verbatim && (
                <div style={{
                    marginTop: 8,
                    maxWidth: 160,
                    padding: '8px 10px',
                    borderRadius: 12,
                    background: data.verbatimSeverity === 'bloquant'
                        ? 'linear-gradient(135deg, #FEF2F2, #FEE2E2)'
                        : data.verbatimSeverity === 'majeur'
                            ? 'linear-gradient(135deg, #FFFBEB, #FEF3C7)'
                            : 'linear-gradient(135deg, #F9FAFB, #F3F4F6)',
                    border: `1px solid ${data.verbatimSeverity === 'bloquant' ? '#FCA5A5' : data.verbatimSeverity === 'majeur' ? '#FCD34D' : '#D1D5DB'}`,
                    fontSize: 9,
                    lineHeight: 1.4,
                    color: data.verbatimSeverity === 'bloquant' ? '#991B1B' : data.verbatimSeverity === 'majeur' ? '#92400E' : '#4B5563',
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 500,
                    fontStyle: 'italic',
                    position: 'relative',
                }}>
                    <span style={{ fontSize: 12, fontWeight: 700, fontStyle: 'normal', opacity: 0.5 }}>«</span>{' '}
                    {data.verbatim}
                    {' '}<span style={{ fontSize: 12, fontWeight: 700, fontStyle: 'normal', opacity: 0.5 }}>»</span>
                    <div style={{ fontSize: 8, fontWeight: 700, marginTop: 4, fontStyle: 'normal', opacity: 0.6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>— Amal</div>
                </div>
            )}


        </div>
    );
};

const nodeTypes = { phoneNode: PhoneNode };

/* ─────────────────────────────────────────────
   Journey Definitions
───────────────────────────────────────────── */
const X_SPACING = 220;
const Y_BASE = 60;

function makeNodes(
    screens: { img: string; label: string; annotation?: AnnotationType; annotationText?: string; verbatim?: string; verbatimSeverity?: 'bloquant' | 'majeur' | 'mineur' }[],
    perRow: number = 5
): Node<PhoneNodeData>[] {
    return screens.map((s, i) => ({
        id: `n${i}`,
        type: 'phoneNode',
        position: {
            x: (i % perRow) * X_SPACING + 40,
            y: Math.floor(i / perRow) * 480 + Y_BASE,
        },
        data: {
            label: s.label,
            screenshot: `/screenshots/${s.img}.PNG`,
            stepNumber: i + 1,
            annotation: s.annotation,
            annotationText: s.annotationText,
            verbatim: s.verbatim,
            verbatimSeverity: s.verbatimSeverity,
        },
    }));
}

function makeEdges(count: number, color: string): Edge[] {
    const edges: Edge[] = [];
    for (let i = 0; i < count - 1; i++) {
        edges.push({
            id: `e${i}-${i + 1}`,
            source: `n${i}`,
            target: `n${i + 1}`,
            type: 'smoothstep',
            animated: true,
            style: { stroke: color, strokeWidth: 2 },
            markerEnd: { type: MarkerType.ArrowClosed, color },
        });
    }
    return edges;
}

/* ── Parcours 1 : Questionnaire initial ── */
const JOURNEY_1_SCREENS = [
    { img: 'question_1', label: 'Q1 — Activité professionnelle' },
    { img: 'question_2', label: 'Q2 — Lien de parenté' },
    { img: 'question_3', label: 'Q3 — Sexe biologique de l\'aidé' },
    { img: 'question_4', label: 'Q4 — Lieu de vie de l\'aidé' },
    { img: 'question_5', label: 'Q5 — Prise en charge spécialisée' },
    { img: 'question_6', label: 'Q6 — Besoins complémentaires' },
    { img: 'question_7', label: 'Q7 — Priorité principale', verbatim: 'C\'est une question à choix unique. On ne peut pas faire de choix, ça voudrait dire qu\'on met notre personne avant notre aidé. Il faudrait des choix multiples.', verbatimSeverity: 'bloquant' as const },
    { img: 'question_8', label: 'Q8 — Contact infirmière Monka', verbatim: 'Directement dire qu\'on peut avoir l\'accompagnement d\'une infirmière, ce n\'est pas la meilleure chose. Ce serait mieux de dire professionnel de santé.', verbatimSeverity: 'majeur' as const },
    { img: 'question_9', label: 'Q9 — Durée d\'aide', verbatim: 'La question d\'avant parlait de l\'infirmière coordinatrice par rapport à nous, et ensuite : depuis combien de temps l\'aidez-vous ? Il y a un problème de verbe et de sujet.', verbatimSeverity: 'mineur' as const },
    { img: 'question_10', label: 'Essai 7 jours', verbatim: 'Les vieux ont peur d\'abonnement. Il faut préciser que c\'est sans engagement. Bénéficier d\'une période d\'essai ou s\'abonner, il faut un choix.', verbatimSeverity: 'bloquant' as const },
    { img: 'question_11', label: 'Pricing — Découverte', verbatim: 'On me demande direct de payer après avoir rempli un questionnaire. Je ne sais même pas ce que ça va m\'apporter.', verbatimSeverity: 'bloquant' as const },
    { img: 'question_12', label: 'Pricing — Essentiel', verbatim: 'Les cartes de pricing ne sont pas uniformes. Les tons ne sont pas uniformes.', verbatimSeverity: 'majeur' as const },
    { img: 'question_13', label: 'Pricing — Sérénité', verbatim: 'Il n\'y a pas de formule intermédiaire. De 7€ ça passe à 60€. Je peux mettre 15€ ? À ce stade j\'ai pas envie de m\'abonner.', verbatimSeverity: 'bloquant' as const },
];

/* ── Parcours 2 : Découverte de l'application ── */
const JOURNEY_2_SCREENS = [
    { img: 'decouverte_1', label: 'Dashboard — À la une', verbatim: 'La première chose que je vois c\'est un simple « faites-vous aider » alors que c\'est exactement ce que j\'attends de l\'appli.', verbatimSeverity: 'bloquant' as const },
    { img: 'decouverte_2', label: 'Dashboard — Scroll / Offres', verbatim: 'C\'est un fouillis d\'informations qui ne sont pas catégorisées, pas structurées. C\'est une tâche ou une info, une ressource ? On ne sait pas.', verbatimSeverity: 'bloquant' as const },
    { img: 'decouverte_3', label: 'Onglet Services', verbatim: 'C\'est la 3e fois que je vois un conseil qui me dit de demander de l\'aide. Je pensais que c\'était l\'appli qui allait m\'aider.', verbatimSeverity: 'bloquant' as const },
    { img: 'decouverte_4', label: 'Onglet Démarches' },
    { img: 'decouverte_5', label: 'Onglet Santé' },
    { img: 'decouverte_6', label: 'Ressources', verbatim: 'Les articles « pour moi » et « pour mon proche » sont exactement les mêmes. Je ne vois pas la personnalisation.', verbatimSeverity: 'bloquant' as const },
    { img: 'decouverte_7', label: 'Article — CCAS', verbatim: 'Le format ça va pas du tout là.', verbatimSeverity: 'bloquant' as const },
];



/* ─────────────────────────────────────────────
   Journey Config
───────────────────────────────────────────── */
interface ScreenData {
    img: string;
    label: string;
    annotation?: AnnotationType;
    annotationText?: string;
    verbatim?: string;
    verbatimSeverity?: 'bloquant' | 'majeur' | 'mineur';
}

interface JourneyConfig {
    id: string;
    title: string;
    subtitle: string;
    emoji: string;
    color: string;
    colorLight: string;
    screens: ScreenData[];
}

const JOURNEYS: JourneyConfig[] = [
    {
        id: 'questionnaire',
        title: 'Questionnaire initial',
        subtitle: 'Amal répond au questionnaire pour la première fois',
        emoji: '🟢',
        color: '#059669',
        colorLight: '#ECFDF5',
        screens: JOURNEY_1_SCREENS,
    },
    {
        id: 'decouverte',
        title: 'Découverte de l\'application',
        subtitle: 'Premier contact avec l\'app après le questionnaire',
        emoji: '🔵',
        color: '#2563EB',
        colorLight: '#EFF6FF',
        screens: JOURNEY_2_SCREENS,
    },
];

/* ─────────────────────────────────────────────
   Page Component
───────────────────────────────────────────── */
export default function ParcoursPage() {
    const [activeJourney, setActiveJourney] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [journeyScreens, setJourneyScreens] = useState<ScreenData[][]>(
        JOURNEYS.map(j => [...j.screens])
    );
    const [dragIdx, setDragIdx] = useState<number | null>(null);
    const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);
    const canvasRef = useRef<HTMLDivElement>(null);
    const flowInstanceRef = useRef<any>(null);
    const journey = JOURNEYS[activeJourney];
    const currentScreens = journeyScreens[activeJourney];

    const moveScreen = useCallback((fromIdx: number, toIdx: number) => {
        setJourneyScreens(prev => {
            const next = prev.map(arr => [...arr]);
            const [moved] = next[activeJourney].splice(fromIdx, 1);
            next[activeJourney].splice(toIdx, 0, moved);
            return next;
        });
    }, [activeJourney]);

    const nodes = useMemo(() => makeNodes(currentScreens), [currentScreens]);
    const edges = useMemo(() => makeEdges(currentScreens.length, journey.color), [currentScreens, journey.color]);

    const onInit = useCallback((instance: any) => {
        flowInstanceRef.current = instance;
        setTimeout(() => instance.fitView({ padding: 0.15 }), 100);
    }, []);

    // Track fullscreen state changes + re-fit the flow
    useEffect(() => {
        const onFsChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
            // After fullscreen transition, give the browser time to resize then re-fit
            setTimeout(() => {
                flowInstanceRef.current?.fitView({ padding: 0.15, duration: 300 });
            }, 200);
        };
        document.addEventListener('fullscreenchange', onFsChange);
        return () => document.removeEventListener('fullscreenchange', onFsChange);
    }, []);

    const toggleFullscreen = useCallback(() => {
        if (!canvasRef.current) return;
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            canvasRef.current.requestFullscreen();
        }
    }, []);

    // Stats
    const stats = useMemo(() => {
        const s = { positive: 0, warning: 0, critical: 0 };
        currentScreens.forEach((sc) => { if (sc.annotation) s[sc.annotation]++; });
        return s;
    }, [currentScreens]);

    // Re-fit flow when screens change
    useEffect(() => {
        setTimeout(() => {
            flowInstanceRef.current?.fitView({ padding: 0.15, duration: 300 });
        }, 100);
    }, [currentScreens]);

    return (
        <div style={{
            width: '100vw',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            background: '#0F172A',
            fontFamily: "'Outfit', sans-serif",
        }}>
            {/* ── Top Bar ── */}
            <div style={{
                padding: '16px 24px',
                display: 'flex',
                alignItems: 'center',
                gap: 20,
                background: 'linear-gradient(180deg, #1E293B, #0F172A)',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                flexShrink: 0,
            }}>
                <Link href="/" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    color: '#94A3B8',
                    textDecoration: 'none',
                    fontSize: 13,
                    fontWeight: 500,
                    transition: 'color 0.2s',
                }}>
                    <ArrowLeft size={18} />
                    Retour
                </Link>

                <div style={{ width: 1, height: 24, background: 'rgba(255,255,255,0.1)' }} />

                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <MapPin size={20} weight="fill" color={journey.color} />
                    <h1 style={{ color: '#F1F5F9', fontSize: 16, fontWeight: 700, margin: 0 }}>
                        Parcours Utilisateur
                    </h1>
                </div>

                {/* Spacer */}
                <div style={{ flex: 1 }} />

                {/* Stats pills */}
                <div style={{ display: 'flex', gap: 8 }}>
                    <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 4,
                        padding: '4px 10px',
                        borderRadius: 20,
                        background: 'rgba(5,150,105,0.15)',
                        color: '#6EE7B7',
                        fontSize: 11,
                        fontWeight: 600,
                    }}>
                        <CheckCircle size={13} weight="fill" /> {stats.positive} OK
                    </span>
                    <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 4,
                        padding: '4px 10px',
                        borderRadius: 20,
                        background: 'rgba(217,119,6,0.15)',
                        color: '#FCD34D',
                        fontSize: 11,
                        fontWeight: 600,
                    }}>
                        <Warning size={13} weight="fill" /> {stats.warning} Frictions
                    </span>
                    <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 4,
                        padding: '4px 10px',
                        borderRadius: 20,
                        background: 'rgba(220,38,38,0.15)',
                        color: '#FCA5A5',
                        fontSize: 11,
                        fontWeight: 600,
                    }}>
                        <XCircle size={13} weight="fill" /> {stats.critical} Bloquants
                    </span>
                </div>
            </div>

            {/* ── Journey Selector ── */}
            <div style={{
                padding: '12px 24px',
                display: 'flex',
                gap: 10,
                background: '#0F172A',
                flexShrink: 0,
            }}>
                {JOURNEYS.map((j, idx) => (
                    <button
                        key={j.id}
                        onClick={() => setActiveJourney(idx)}
                        style={{
                            padding: '10px 20px',
                            borderRadius: 14,
                            border: idx === activeJourney ? `2px solid ${j.color}` : '2px solid rgba(255,255,255,0.08)',
                            background: idx === activeJourney
                                ? `linear-gradient(135deg, ${j.color}22, ${j.color}11)`
                                : 'rgba(255,255,255,0.03)',
                            color: idx === activeJourney ? '#F1F5F9' : '#64748B',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 10,
                            fontFamily: "'Outfit', sans-serif",
                            transition: 'all 0.3s ease',
                            flexShrink: 0,
                        }}
                    >
                        <span style={{ fontSize: 18 }}>{j.emoji}</span>
                        <div style={{ textAlign: 'left' }}>
                            <div style={{ fontSize: 13, fontWeight: 700 }}>{j.title}</div>
                            <div style={{ fontSize: 10, opacity: 0.7, fontWeight: 400 }}>{j.subtitle}</div>
                        </div>
                        <span style={{
                            marginLeft: 6,
                            padding: '2px 8px',
                            borderRadius: 10,
                            background: idx === activeJourney ? j.color : 'rgba(255,255,255,0.06)',
                            color: idx === activeJourney ? '#fff' : '#64748B',
                            fontSize: 11,
                            fontWeight: 700,
                        }}>
                            {journeyScreens[idx].length}
                        </span>
                    </button>
                ))}

                {/* Spacer */}
                <div style={{ flex: 1 }} />

                {/* Edit mode toggle */}
                <button
                    onClick={() => setIsEditMode(!isEditMode)}
                    style={{
                        padding: '10px 16px',
                        borderRadius: 14,
                        border: isEditMode ? '2px solid #8B5CF6' : '2px solid rgba(255,255,255,0.08)',
                        background: isEditMode
                            ? 'linear-gradient(135deg, #8B5CF622, #8B5CF611)'
                            : 'rgba(255,255,255,0.03)',
                        color: isEditMode ? '#C4B5FD' : '#64748B',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        fontFamily: "'Outfit', sans-serif",
                        transition: 'all 0.3s ease',
                        flexShrink: 0,
                        fontSize: 13,
                        fontWeight: 600,
                    }}
                >
                    <PencilSimple size={16} weight="bold" />
                    {isEditMode ? 'Fermer' : 'Réorganiser'}
                </button>
            </div>

            {/* ── Main Content Area ── */}
            <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>

                {/* ── Edit Sidebar ── */}
                {isEditMode && (
                    <div style={{
                        width: 320,
                        flexShrink: 0,
                        background: '#1E293B',
                        borderRight: '1px solid rgba(255,255,255,0.08)',
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden',
                    }}>
                        <div style={{
                            padding: '16px 16px 12px',
                            borderBottom: '1px solid rgba(255,255,255,0.06)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8,
                        }}>
                            <List size={16} color="#8B5CF6" weight="bold" />
                            <span style={{ color: '#E2E8F0', fontSize: 13, fontWeight: 700 }}>Ordre des écrans</span>
                            <span style={{ color: '#64748B', fontSize: 11, marginLeft: 'auto' }}>{currentScreens.length} écrans</span>
                        </div>
                        <div style={{
                            flex: 1,
                            overflowY: 'auto',
                            padding: '8px',
                        }}>
                            {currentScreens.map((screen, idx) => {
                                const cfg = screen.annotation ? ANNOTATION_CONFIG[screen.annotation] : null;
                                const isDragging = dragIdx === idx;
                                const isDragOver = dragOverIdx === idx;
                                return (
                                    <div
                                        key={`${screen.img}-${idx}`}
                                        draggable
                                        onDragStart={(e) => {
                                            setDragIdx(idx);
                                            e.dataTransfer.effectAllowed = 'move';
                                            e.dataTransfer.setData('text/plain', String(idx));
                                        }}
                                        onDragOver={(e) => {
                                            e.preventDefault();
                                            e.dataTransfer.dropEffect = 'move';
                                            setDragOverIdx(idx);
                                        }}
                                        onDragLeave={() => {
                                            if (dragOverIdx === idx) setDragOverIdx(null);
                                        }}
                                        onDrop={(e) => {
                                            e.preventDefault();
                                            const from = parseInt(e.dataTransfer.getData('text/plain'));
                                            if (!isNaN(from) && from !== idx) {
                                                moveScreen(from, idx);
                                            }
                                            setDragIdx(null);
                                            setDragOverIdx(null);
                                        }}
                                        onDragEnd={() => {
                                            setDragIdx(null);
                                            setDragOverIdx(null);
                                        }}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 10,
                                            padding: '10px 12px',
                                            marginBottom: 4,
                                            borderRadius: 12,
                                            background: isDragging
                                                ? 'rgba(139,92,246,0.15)'
                                                : isDragOver
                                                    ? 'rgba(139,92,246,0.08)'
                                                    : 'rgba(255,255,255,0.02)',
                                            border: isDragOver
                                                ? '2px dashed #8B5CF6'
                                                : isDragging
                                                    ? '2px solid #8B5CF644'
                                                    : '2px solid transparent',
                                            cursor: 'grab',
                                            transition: 'all 0.15s ease',
                                            opacity: isDragging ? 0.5 : 1,
                                            userSelect: 'none',
                                        }}
                                        onMouseEnter={e => {
                                            if (!isDragging && !isDragOver) {
                                                e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                                            }
                                        }}
                                        onMouseLeave={e => {
                                            if (!isDragging && !isDragOver) {
                                                e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                                            }
                                        }}
                                    >
                                        <DotsSixVertical size={16} color="#475569" weight="bold" style={{ flexShrink: 0 }} />
                                        <span style={{
                                            width: 22,
                                            height: 22,
                                            borderRadius: '50%',
                                            background: 'linear-gradient(135deg, #334155, #475569)',
                                            color: '#fff',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: 10,
                                            fontWeight: 700,
                                            flexShrink: 0,
                                        }}>{idx + 1}</span>
                                        {/* Thumbnail */}
                                        <div style={{
                                            width: 32,
                                            height: 56,
                                            borderRadius: 6,
                                            overflow: 'hidden',
                                            background: '#0F172A',
                                            flexShrink: 0,
                                            border: cfg ? `1.5px solid ${cfg.border}` : '1.5px solid #475569',
                                        }}>
                                            <img
                                                src={`/screenshots/${screen.img}.PNG`}
                                                alt={screen.label}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            />
                                        </div>
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <div style={{
                                                color: '#E2E8F0',
                                                fontSize: 11,
                                                fontWeight: 600,
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                            }}>{screen.label}</div>
                                            <div style={{
                                                color: '#64748B',
                                                fontSize: 9,
                                                marginTop: 2,
                                            }}>{screen.img}</div>
                                        </div>
                                        <div style={{
                                            width: 8,
                                            height: 8,
                                            borderRadius: '50%',
                                            background: cfg?.border || '#475569',
                                            flexShrink: 0,
                                        }} />
                                    </div>
                                );
                            })}
                        </div>
                        <div style={{
                            padding: '12px 16px',
                            borderTop: '1px solid rgba(255,255,255,0.06)',
                            color: '#64748B',
                            fontSize: 10,
                            textAlign: 'center',
                            lineHeight: 1.4,
                        }}>
                            ↕ Glissez-déposez pour réorganiser
                        </div>
                    </div>
                )}

                {/* ── React Flow Canvas ── */}
                <div ref={canvasRef} style={{ flex: 1, position: 'relative', minHeight: 0 }} className="react-flow-fullscreen-container">
                    <ReactFlow
                        key={activeJourney}
                        nodes={nodes}
                        edges={edges}
                        nodeTypes={nodeTypes}
                        onInit={onInit}
                        fitView
                        minZoom={0.2}
                        maxZoom={2}
                        defaultEdgeOptions={{
                            type: 'smoothstep',
                            animated: true,
                        }}
                        proOptions={{ hideAttribution: true }}
                        style={{ background: '#0F172A' }}
                    >
                        <Background
                            color="rgba(255,255,255,0.03)"
                            gap={20}
                            size={1}
                        />
                        <Controls
                            style={{
                                background: '#1E293B',
                                borderRadius: 12,
                                border: '1px solid rgba(255,255,255,0.08)',
                                overflow: 'hidden',
                            }}
                        />
                        <MiniMap
                            nodeColor={() => journey.color}
                            maskColor="rgba(15,23,42,0.85)"
                            style={{
                                background: '#1E293B',
                                borderRadius: 12,
                                border: '1px solid rgba(255,255,255,0.08)',
                            }}
                        />
                    </ReactFlow>

                    {/* ── Fullscreen toggle ── */}
                    <button
                        onClick={toggleFullscreen}
                        title={isFullscreen ? 'Quitter le plein écran' : 'Plein écran'}
                        style={{
                            position: 'absolute',
                            top: 16,
                            left: 16,
                            width: 36,
                            height: 36,
                            borderRadius: 10,
                            background: 'rgba(30,41,59,0.95)',
                            backdropFilter: 'blur(12px)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#94A3B8',
                            cursor: 'pointer',
                            zIndex: 10,
                            transition: 'all 0.2s',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.color = '#F1F5F9'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
                        onMouseLeave={e => { e.currentTarget.style.color = '#94A3B8'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
                    >
                        {isFullscreen ? <ArrowsIn size={18} weight="bold" /> : <ArrowsOut size={18} weight="bold" />}
                    </button>

                    {/* ── Floating Legend ── */}
                    <div style={{
                        position: 'absolute',
                        bottom: 20,
                        left: 20,
                        background: 'rgba(30,41,59,0.95)',
                        backdropFilter: 'blur(12px)',
                        borderRadius: 16,
                        padding: '14px 18px',
                        border: '1px solid rgba(255,255,255,0.08)',
                        display: 'flex',
                        gap: 16,
                        alignItems: 'center',
                        zIndex: 10,
                    }}>
                        <span style={{ color: '#64748B', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>
                            Légende
                        </span>
                        {Object.entries(ANNOTATION_CONFIG).map(([key, cfg]) => (
                            <div key={key} style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 5,
                                padding: '3px 10px',
                                borderRadius: 20,
                                background: cfg.bg,
                                border: `1px solid ${cfg.border}`,
                            }}>
                                {cfg.icon}
                                <span style={{ fontSize: 10, fontWeight: 600, color: cfg.text }}>{cfg.label}</span>
                            </div>
                        ))}
                    </div>



                </div>
            </div> {/* end flex row */}
        </div>
    );
}
