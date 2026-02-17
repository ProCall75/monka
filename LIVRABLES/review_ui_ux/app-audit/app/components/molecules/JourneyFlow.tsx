'use client';

import React, { useState, useCallback, useMemo } from 'react';
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
import { Eye, Warning, CheckCircle, XCircle, MapPin, ArrowsOut } from '@phosphor-icons/react';
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
        <div style={{ cursor: 'grab' }}>
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
                width: 170,
                background: '#1a1a1a',
                borderRadius: 22,
                padding: 4,
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                transition: 'all 0.3s ease',
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
                            height: 320,
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
                maxWidth: 170,
            }}>
                <p style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: '#F1F5F9',
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


        </div>
    );
};

const nodeTypes = { phoneNode: PhoneNode };

/* ─────────────────────────────────────────────
   Journey Definitions
───────────────────────────────────────────── */
const X_SPACING = 250;
const Y_BASE = 60;

function makeNodes(
    screens: { img: string; label: string; annotation?: AnnotationType; annotationText?: string }[],
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
    { img: 'question_7', label: 'Q7 — Priorité principale' },
    { img: 'question_8', label: 'Q8 — Contact infirmière Monka' },
    { img: 'question_9', label: 'Q9 — Durée d\'aide' },
    { img: 'question_10', label: 'Essai 7 jours' },
    { img: 'question_11', label: 'Pricing — Découverte' },
    { img: 'question_12', label: 'Pricing — Essentiel' },
    { img: 'question_13', label: 'Pricing — Sérénité' },
];

/* ── Parcours 2 : Découverte de l'application ── */
const JOURNEY_2_SCREENS = [
    { img: 'decouverte_1', label: 'Dashboard — À la une' },
    { img: 'decouverte_2', label: 'Dashboard — Scroll / Offres' },
    { img: 'decouverte_3', label: 'Onglet Services' },
    { img: 'decouverte_4', label: 'Onglet Démarches' },
    { img: 'decouverte_5', label: 'Onglet Santé' },
    { img: 'decouverte_6', label: 'Ressources' },
];



/* ─────────────────────────────────────────────
   Journey Config
───────────────────────────────────────────── */
interface ScreenData {
    img: string;
    label: string;
    annotation?: AnnotationType;
    annotationText?: string;
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
   Embedded JourneyFlow Component
───────────────────────────────────────────── */
export default function JourneyFlow() {
    const [activeJourney, setActiveJourney] = useState(0);
    const journey = JOURNEYS[activeJourney];

    const nodes = useMemo(() => makeNodes(journey.screens), [activeJourney]);
    const edges = useMemo(() => makeEdges(journey.screens.length, journey.color), [activeJourney]);

    const onInit = useCallback((instance: any) => {
        setTimeout(() => instance.fitView({ padding: 0.15 }), 100);
    }, []);

    // Stats
    const stats = useMemo(() => {
        const s = { positive: 0, warning: 0, critical: 0 };
        journey.screens.forEach((sc) => { if (sc.annotation) s[sc.annotation]++; });
        return s;
    }, [activeJourney]);

    return (
        <div style={{
            borderRadius: 28,
            overflow: 'hidden',
            background: '#0F172A',
            fontFamily: "'Outfit', sans-serif",
            boxShadow: '0 8px 40px rgba(0,0,0,0.2)',
        }}>
            {/* ── Top Bar ── */}
            <div style={{
                padding: '14px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                background: 'linear-gradient(180deg, #1E293B, #0F172A)',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                flexShrink: 0,
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <MapPin size={18} weight="fill" color={journey.color} />
                    <h3 style={{ color: '#F1F5F9', fontSize: 14, fontWeight: 700, margin: 0 }}>
                        Parcours Utilisateur
                    </h3>
                </div>

                {/* Spacer */}
                <div style={{ flex: 1 }} />

                {/* Stats pills */}
                <div style={{ display: 'flex', gap: 6 }}>
                    <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 4,
                        padding: '3px 8px',
                        borderRadius: 20,
                        background: 'rgba(5,150,105,0.15)',
                        color: '#6EE7B7',
                        fontSize: 10,
                        fontWeight: 600,
                    }}>
                        <CheckCircle size={12} weight="fill" /> {stats.positive} OK
                    </span>
                    <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 4,
                        padding: '3px 8px',
                        borderRadius: 20,
                        background: 'rgba(217,119,6,0.15)',
                        color: '#FCD34D',
                        fontSize: 10,
                        fontWeight: 600,
                    }}>
                        <Warning size={12} weight="fill" /> {stats.warning} Frictions
                    </span>
                    <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 4,
                        padding: '3px 8px',
                        borderRadius: 20,
                        background: 'rgba(220,38,38,0.15)',
                        color: '#FCA5A5',
                        fontSize: 10,
                        fontWeight: 600,
                    }}>
                        <XCircle size={12} weight="fill" /> {stats.critical} Bloquants
                    </span>
                </div>
            </div>

            {/* ── Journey Selector ── */}
            <div style={{
                padding: '10px 20px',
                display: 'flex',
                gap: 8,
                background: '#0F172A',
                flexShrink: 0,
                overflowX: 'auto',
            }}>
                {JOURNEYS.map((j, idx) => (
                    <button
                        key={j.id}
                        onClick={() => setActiveJourney(idx)}
                        style={{
                            padding: '8px 16px',
                            borderRadius: 12,
                            border: idx === activeJourney ? `2px solid ${j.color}` : '2px solid rgba(255,255,255,0.08)',
                            background: idx === activeJourney
                                ? `linear-gradient(135deg, ${j.color}22, ${j.color}11)`
                                : 'rgba(255,255,255,0.03)',
                            color: idx === activeJourney ? '#F1F5F9' : '#64748B',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8,
                            fontFamily: "'Outfit', sans-serif",
                            transition: 'all 0.3s ease',
                            flexShrink: 0,
                        }}
                    >
                        <span style={{ fontSize: 14 }}>{j.emoji}</span>
                        <div style={{ textAlign: 'left' }}>
                            <div style={{ fontSize: 12, fontWeight: 700 }}>{j.title}</div>
                            <div style={{ fontSize: 9, opacity: 0.7, fontWeight: 400 }}>{j.subtitle}</div>
                        </div>
                        <span style={{
                            marginLeft: 4,
                            padding: '2px 6px',
                            borderRadius: 8,
                            background: idx === activeJourney ? j.color : 'rgba(255,255,255,0.06)',
                            color: idx === activeJourney ? '#fff' : '#64748B',
                            fontSize: 10,
                            fontWeight: 700,
                        }}>
                            {j.screens.length}
                        </span>
                    </button>
                ))}
            </div>

            {/* ── React Flow Canvas ── */}
            <div style={{ height: 650, position: 'relative' }}>
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

                {/* ── Floating "Plein écran" button ── */}
                <Link
                    href="/parcours"
                    target="_blank"
                    style={{
                        position: 'absolute',
                        bottom: 56,
                        left: 12,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                        padding: '8px 14px',
                        borderRadius: 12,
                        background: 'rgba(30,41,59,0.95)',
                        backdropFilter: 'blur(12px)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: '#F1F5F9',
                        fontSize: 12,
                        fontWeight: 600,
                        textDecoration: 'none',
                        cursor: 'pointer',
                        fontFamily: "'Outfit', sans-serif",
                        zIndex: 10,
                        boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                    }}
                >
                    <ArrowsOut size={16} weight="bold" />
                    Plein écran
                </Link>

                {/* ── Floating Legend ── */}
                <div style={{
                    position: 'absolute',
                    bottom: 16,
                    right: 16,
                    background: 'rgba(30,41,59,0.95)',
                    backdropFilter: 'blur(12px)',
                    borderRadius: 14,
                    padding: '10px 14px',
                    border: '1px solid rgba(255,255,255,0.08)',
                    display: 'flex',
                    gap: 12,
                    alignItems: 'center',
                    zIndex: 10,
                }}>
                    <span style={{ color: '#64748B', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>
                        Légende
                    </span>
                    {Object.entries(ANNOTATION_CONFIG).map(([key, cfg]) => (
                        <div key={key} style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 4,
                            padding: '2px 8px',
                            borderRadius: 20,
                            background: cfg.bg,
                            border: `1px solid ${cfg.border}`,
                        }}>
                            {cfg.icon}
                            <span style={{ fontSize: 9, fontWeight: 600, color: cfg.text }}>{cfg.label}</span>
                        </div>
                    ))}
                </div>


            </div>
        </div>
    );
}
