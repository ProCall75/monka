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
import { ArrowLeft, Warning, CheckCircle, XCircle, MapPin, ArrowsOut, ArrowsIn } from '@phosphor-icons/react';
import Link from 'next/link';

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */
type AnnotationType = 'positive' | 'warning' | 'critical';

interface PhoneNodeData {
    label: string;
    screenshot: string;
    stepNumber: number;
    annotation: AnnotationType;
    annotationText: string;
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
    const cfg = ANNOTATION_CONFIG[data.annotation];

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
    screens: { img: string; label: string; annotation: AnnotationType; annotationText: string; verbatim?: string; verbatimSeverity?: 'bloquant' | 'majeur' | 'mineur' }[],
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

/* ── Parcours 1 : Onboarding ── */
const JOURNEY_1_SCREENS = [
    { img: 'IMG_3689', label: 'Questionnaire — Sexe', annotation: 'positive' as const, annotationText: 'Entrée claire et accueillante', verbatim: "Pourquoi on nous demande notre sexe biologique alors que c'est nous l'aidant, pas le patient ?", verbatimSeverity: 'majeur' as const },
    { img: 'IMG_3691', label: 'Questionnaire — Âge', annotation: 'positive' as const, annotationText: 'Question simple, bonne UX' },
    { img: 'IMG_3698', label: 'Services domicile', annotation: 'warning' as const, annotationText: 'Termes techniques confus', verbatim: "Solliciter la CARSAT, contacter la CPAM… je ne sais même pas ce que c'est.", verbatimSeverity: 'bloquant' as const },
    { img: 'IMG_3760', label: 'Humeur du proche', annotation: 'positive' as const, annotationText: 'Question empathique et bien formulée' },
    { img: 'IMG_3700', label: 'Analyse en cours', annotation: 'warning' as const, annotationText: 'Pas de barre de progression ni de durée estimée', verbatim: "J'ai passé 30 min sur le questionnaire. Un clic sur retour m'a tout fait recommencer.", verbatimSeverity: 'bloquant' as const },
    { img: 'IMG_3701', label: 'Paywall — Essai 7j', annotation: 'critical' as const, annotationText: 'Paywall immédiat après onboarding = friction majeure', verbatim: "On me propose de m'abonner juste après 30 min de questionnaire — je n'ai vu aucune valeur.", verbatimSeverity: 'bloquant' as const },
    { img: 'IMG_3702', label: 'Dashboard À la une', annotation: 'warning' as const, annotationText: 'Hiérarchie confuse, « 0/12 » non expliqué', verbatim: "Je ne sais pas par quoi commencer.", verbatimSeverity: 'bloquant' as const },
    { img: 'IMG_3703', label: 'Plan d\'action', annotation: 'warning' as const, annotationText: 'Écran dense sans guidage', verbatim: "On ne sait pas pourquoi je suis censée faire cette tâche.", verbatimSeverity: 'bloquant' as const },
    { img: 'IMG_3704', label: 'Articles & Services', annotation: 'positive' as const, annotationText: 'Contenu utile et bien structuré' },
    { img: 'IMG_3762', label: 'Post-bilan (0/66)', annotation: 'critical' as const, annotationText: '66 tâches affichées = surcharge cognitive massive', verbatim: "M'aider, c'est me soulager d'une tâche. Là, on m'en rajoute alors que je suis déjà débordée.", verbatimSeverity: 'bloquant' as const },
];

/* ── Parcours 2 : Navigation Dashboard ── */
const JOURNEY_2_SCREENS = [
    { img: 'IMG_3705', label: 'Onglet Santé', annotation: 'positive' as const, annotationText: 'Card sombre lisible, bonne hiérarchie' },
    { img: 'IMG_3706', label: 'Santé — scroll', annotation: 'warning' as const, annotationText: 'Tâche « Discutez des difficultés » trop vague', verbatim: "Vérifier, ça veut dire tu me donnes encore une tâche. Si tu me trouves la réponse directe, ça oui, ça m'aiderait.", verbatimSeverity: 'bloquant' as const },
    { img: 'IMG_3707', label: 'Onglet Démarches', annotation: 'positive' as const, annotationText: 'Bonne contextualisation CAF jeune aidant' },
    { img: 'IMG_3708', label: 'Démarches — scroll', annotation: 'warning' as const, annotationText: 'Trop de cartes, scroll long et fatigant' },
    { img: 'IMG_3709', label: 'Onglet Services', annotation: 'positive' as const, annotationText: 'CCAS / mairie bien identifiés' },
    { img: 'IMG_3710', label: 'Services — scroll', annotation: 'warning' as const, annotationText: 'Actions aidant/aidé mélangées sans distinction', verbatim: "C'est une tâche ou c'est une info, c'est une ressource ? On ne sait pas.", verbatimSeverity: 'bloquant' as const },
    { img: 'IMG_3711', label: 'Ressources', annotation: 'warning' as const, annotationText: 'Contenu générique, pas assez personnalisé', verbatim: "On ne voit pas clairement quelle est la personnalisation. 'Demander des aides financières', c'est trop générique.", verbatimSeverity: 'bloquant' as const },
    { img: 'IMG_3712', label: 'Messagerie IDEC', annotation: 'critical' as const, annotationText: 'Paywall bloquant + « IDEC » = terme inconnu', verbatim: "Si quelqu'un sait que la personne n'a pas besoin d'une infirmière, il va quitter l'appli.", verbatimSeverity: 'bloquant' as const },
];

/* ── Parcours 3 : Profil & Contacts ── */
const JOURNEY_3_SCREENS = [
    { img: 'IMG_3713', label: 'Profil — Vue d\'ensemble', annotation: 'warning' as const, annotationText: 'Section historique vide, layout peu engageant' },
    { img: 'IMG_3717', label: 'Vous et votre proche', annotation: 'positive' as const, annotationText: 'Informations lisibles et bien organisées' },
    { img: 'IMG_3718', label: 'Mes soignants', annotation: 'warning' as const, annotationText: 'Listes vides sans onboarding ni aide contextuelle' },
    { img: 'IMG_3719', label: 'Ajout interlocuteur', annotation: 'warning' as const, annotationText: 'Liste trop longue sans barre de recherche' },
];

/* ─────────────────────────────────────────────
   Journey Config
───────────────────────────────────────────── */
interface ScreenData {
    img: string;
    label: string;
    annotation: AnnotationType;
    annotationText: string;
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
        id: 'onboarding',
        title: 'Onboarding + Découverte',
        subtitle: 'Amal découvre Monka pour la première fois',
        emoji: '🟢',
        color: '#059669',
        colorLight: '#ECFDF5',
        screens: JOURNEY_1_SCREENS,
    },
    {
        id: 'dashboard',
        title: 'Navigation Dashboard',
        subtitle: 'Explorer les 4 catégories d\'actions',
        emoji: '🔵',
        color: '#2563EB',
        colorLight: '#EFF6FF',
        screens: JOURNEY_2_SCREENS,
    },
    {
        id: 'profil',
        title: 'Profil & Contacts',
        subtitle: 'Gérer ses informations et soignants',
        emoji: '🟠',
        color: '#EA580C',
        colorLight: '#FFF7ED',
        screens: JOURNEY_3_SCREENS,
    },
];

/* ─────────────────────────────────────────────
   Page Component
───────────────────────────────────────────── */
export default function ParcoursPage() {
    const [activeJourney, setActiveJourney] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const canvasRef = useRef<HTMLDivElement>(null);
    const flowInstanceRef = useRef<any>(null);
    const journey = JOURNEYS[activeJourney];

    const nodes = useMemo(() => makeNodes(journey.screens), [activeJourney]);
    const edges = useMemo(() => makeEdges(journey.screens.length, journey.color), [activeJourney]);

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
        journey.screens.forEach((sc) => s[sc.annotation]++);
        return s;
    }, [activeJourney]);

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
                            {j.screens.length}
                        </span>
                    </button>
                ))}
            </div>

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

                {/* ── Journey info panel ── */}
                <div style={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    background: 'rgba(30,41,59,0.95)',
                    backdropFilter: 'blur(12px)',
                    borderRadius: 16,
                    padding: '16px 20px',
                    border: '1px solid rgba(255,255,255,0.08)',
                    maxWidth: 280,
                    zIndex: 10,
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                        <div style={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            background: journey.color,
                            boxShadow: `0 0 8px ${journey.color}88`,
                        }} />
                        <span style={{ color: '#F1F5F9', fontSize: 13, fontWeight: 700 }}>
                            {journey.title}
                        </span>
                    </div>
                    <p style={{
                        color: '#94A3B8',
                        fontSize: 11,
                        lineHeight: 1.5,
                        margin: 0,
                    }}>
                        {journey.subtitle}
                        {' • '}
                        <span style={{ color: journey.color, fontWeight: 600 }}>{journey.screens.length} écrans</span>
                    </p>

                </div>
            </div>
        </div>
    );
}
