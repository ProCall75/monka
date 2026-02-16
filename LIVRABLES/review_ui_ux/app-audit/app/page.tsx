"use client";

import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, EyeSlash, Compass, PaintBrush, Lock, Robot, Package, ArrowSquareOut, DeviceMobile, CheckCircle, Warning, Lightbulb } from '@phosphor-icons/react';
import { QRCodeSVG } from 'qrcode.react';

import JourneyFlow from './components/molecules/JourneyFlow';


// ── Real components rendered in Acte 2 ──
import { ThemeSelector } from './components/molecules/ThemeSelector';
import { HeroCard } from './components/molecules/HeroCard';
import { ProgressCard } from './components/molecules/ProgressCard';
import { ScoreRing } from './components/atoms/ScoreRing';
import { TaskCard } from './components/molecules/TaskCard';
import { MicroTaskItem } from './components/molecules/MicroTaskItem';
import { RecoCard } from './components/molecules/RecoCard';

// ── Mock data ──
import { mockVulnerabilities } from './data/kernel-mock';

// ── Old Monka components (their current storybook) ──
import { MProgressBar } from './components/atoms/MProgressBar';
import { MTag } from './components/atoms/MTag';
import { MOptionPill } from './components/atoms/MOptionPill';
import { MProgressDots } from './components/atoms/MProgressDots';
import { MButton } from './components/atoms/MButton';
import { Badge } from './components/atoms/Badge';

// ── Kernel data ──
import { UrgencyConfig, type Criticality, type MicroTask } from './data/kernel-types';

/* ═══════════════════════════════════════════════════════════════
   1. DATA — Critiques (from audit_visuel.html)
═══════════════════════════════════════════════════════════════ */

interface CritiqueItem {
    id: string;
    title: string;
    severity: 'bloquant' | 'majeur' | 'mineur';
    screenshots: string[];
    positive: string;
    negative: string;
    proposal: string;
}

const CRITIQUES: CritiqueItem[] = [
    {
        id: 'C01',
        title: 'Navigation à un seul niveau',
        severity: 'bloquant',
        screenshots: ['/screenshots/IMG_3702.PNG', '/screenshots/IMG_3705.PNG'],
        positive: 'Le dashboard accueille l\'utilisateur par son prénom, ce qui crée un premier lien.',
        negative: 'Les 4 onglets partagent la même structure visuelle. L\'absence de sous-navigation peut compliquer l\'accès aux contenus spécifiques et entraîner une dégradation de l\'expérience utilisateur.',
        proposal: 'Nous proposons une architecture en profondeur : ThèmeSelector → HeroCard → TaskCards → MicroTasks cochables.',
    },
    {
        id: 'N01',
        title: 'Séquence de découverte interrompue',
        severity: 'bloquant',
        screenshots: ['/screenshots/IMG_3700.PNG', '/screenshots/IMG_3701.PNG'],
        positive: 'L\'essai gratuit 7 jours est proposé, ce qui facilite l\'adoption.',
        negative: 'Après avoir répondu à 11 questions, l\'utilisateur rencontre l\'écran de paiement avant de voir son profil personnalisé. Cette séquence peut réduire le taux de conversion et rendre l\'adoption plus difficile.',
        proposal: 'Nous proposons de déplacer le paywall après la découverte du profil personnalisé, pour démontrer la valeur avant la conversion.',
    },
    {
        id: 'C06',
        title: 'Personnalisation à renforcer',
        severity: 'majeur',
        screenshots: ['/screenshots/IMG_3702.PNG', '/screenshots/IMG_3711.PNG'],
        positive: '« Pour Francine » apparaît sur certaines task cards, montrant que le socle existe.',
        negative: 'Les hero cards restent génériques (« Renseignez-vous auprès de la CAF »). L\'aidant peut percevoir un décalage entre la promesse de personnalisation et ce qu\'il voit à l\'écran.',
        proposal: 'Nous proposons une personnalisation systématique : « Réservez un RDV pour Francine » sur l\'ensemble des composants.',
    },
    {
        id: 'C07',
        title: 'Contextualisation des recommandations',
        severity: 'majeur',
        screenshots: ['/screenshots/IMG_3702.PNG', '/screenshots/IMG_3708.PNG'],
        positive: 'Des tâches concrètes sont proposées, ce qui oriente l\'aidant vers l\'action.',
        negative: 'Les recommandations sont présentées sans explication du « pourquoi ». L\'aidant peut ne plus comprendre la raison d\'une action, ce qui freine l\'engagement.',
        proposal: 'Nous proposons d\'ajouter un « Pourquoi ? » contextuel sous chaque recommandation.',
    },
    {
        id: 'N03',
        title: 'Structure de navigation uniforme',
        severity: 'majeur',
        screenshots: ['/screenshots/IMG_3705.PNG', '/screenshots/IMG_3709.PNG'],
        positive: 'Les domaines sont clairement identifiés (Santé, Démarches, Services).',
        negative: 'L\'expérience reste identique d\'un onglet à l\'autre — seule la couleur de fond change. Cette uniformité peut limiter la perception de richesse du contenu disponible.',
        proposal: 'Nous proposons 5 thèmes de vie distincts, chacun ouvrant plusieurs micro-parcours personnalisés (24 au total) avec leurs recommandations spécifiques.',
    },
    {
        id: 'C13',
        title: 'Harmonisation éditoriale',
        severity: 'mineur',
        screenshots: ['/screenshots/IMG_3717.PNG', '/screenshots/IMG_3760.PNG'],
        positive: 'Le ton général est respectueux et bienveillant.',
        negative: 'Quelques coquilles subsistent ("Modifer", "anxieuxe") et les formules d\'adresse varient ("Pour vous", "Pour Moi", "Pour Francine"). Cette inconsistance peut altérer la perception de qualité.',
        proposal: 'Nous proposons une charte copywriting unifiée avec un ton bienveillant et cohérent sur l\'ensemble de l\'application.',
    },
];

const SEVERITY_STYLES = {
    bloquant: { text: '#991B1B', bg: '#FEE2E2', border: '#EF4444', label: 'Bloquant', dotColor: '#EF4444' },
    majeur: { text: '#92400E', bg: '#FEF3C7', border: '#F59E0B', label: 'Majeur', dotColor: '#F59E0B' },
    mineur: { text: '#6B7280', bg: '#F3F4F6', border: '#9CA3AF', label: 'Mineur', dotColor: '#9CA3AF' },
};

/* ═══════════════════════════════════════════════════════════════
   2. DATA — 5 Problems (Slide 2)
═══════════════════════════════════════════════════════════════ */

const FIVE_PROBLEMS = [
    { icon: Compass, label: 'Profondeur de navigation', desc: 'L\'architecture actuelle reste à un seul niveau' },
    { icon: PaintBrush, label: 'Hiérarchie visuelle', desc: 'Le regard n\'est pas guidé vers les éléments essentiels' },
    { icon: Lock, label: 'Séquence de conversion', desc: 'La valeur mériterait d\'être démontrée avant la conversion' },
    { icon: Robot, label: 'Tonalité éditoriale', desc: 'Le vocabulaire peut être perçu comme technique ou administratif' },
    { icon: Package, label: 'Mise en forme du contenu', desc: 'Les articles gagneraient à être adaptés au format mobile' },
];

/* ═══════════════════════════════════════════════════════════════
   3. DATA — Paradoxe (Slide 3)
═══════════════════════════════════════════════════════════════ */

const PARADOX_ROWS = [
    { engine: '5 vulnérabilités détectées par le questionnaire', user: 'Une liste sans hiérarchie visuelle' },
    { engine: '3 niveaux de criticité par reco (≤7j, ≤30j, ≤90j)', user: 'Aucun signal de priorité affiché' },
    { engine: '24 micro-parcours avec objectifs mesurables (ASR)', user: '« Mes aides » sans contexte ni progression' },
    { engine: 'Micro-tâches catégorisées (contributives / non-contributives)', user: 'Actions non surfacées dans l\'interface' },
];

/* ═══════════════════════════════════════════════════════════════
   4. DATA — Demo micro-tasks for Acte 2
═══════════════════════════════════════════════════════════════ */

const DEMO_TASKS: MicroTask[] = [
    { id: 'mt1', text: 'Faciliter la prise de contact avec l\'assistante sociale du secteur', type: 'SEC', isContributive: true, isCompleted: false },
    { id: 'mt2', text: 'Renseignez-vous sur vos droits en tant qu\'aidant (congé, AJPA, répit)', type: 'INFO', isContributive: false, isCompleted: true },
];

/* ═══════════════════════════════════════════════════════════════
   5. SUBCOMPONENTS
═══════════════════════════════════════════════════════════════ */

const SectionTag = ({ children, color }: { children: string; color?: string }) => (
    <div className="flex items-center gap-2 mb-3">
        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color || '#B8B3AB' }} />
        <p className="text-[11px] font-bold tracking-[3px] uppercase" style={{ color: color || '#B8B3AB' }}>
            {children}
        </p>
    </div>
);

const SectionTitle = ({ children, gradient }: { children: React.ReactNode; gradient?: boolean }) => (
    <h2 className={`text-[36px] font-extrabold leading-[1.1] tracking-[-0.02em] mb-3 ${gradient ? 'gradient-text' : ''}`} style={gradient ? undefined : { color: '#2D2A26', fontFamily: "'Outfit', sans-serif" }}>
        {children}
    </h2>
);

const SectionSubtitle = ({ children }: { children: string }) => (
    <p className="text-[15px] leading-relaxed max-w-xl mb-10" style={{ color: '#8A857E' }}>
        {children}
    </p>
);

/* ── Critique Card — Redesigned with realistic phone & professional icons ── */
const CritiqueCard = ({ c }: { c: CritiqueItem }) => {
    const sev = SEVERITY_STYLES[c.severity];
    return (
        <div className="bg-white rounded-[32px] p-8 flex flex-col md:flex-row gap-10 items-start" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>

            {/* Left: Realistic Phone Mockup */}
            <div className="flex-shrink-0 relative mx-auto md:mx-0">
                <div className="relative z-10 bg-white rounded-[40px] overflow-hidden border-[8px] border-[#2D2A26] shadow-xl" style={{ width: '260px' }}>
                    {/* Top Notch Area (simulated) */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-[#2D2A26] rounded-b-xl z-20"></div>

                    {/* Screen Content */}
                    <div className="flex flex-col">
                        {c.screenshots.map((src, i) => (
                            <img key={i} src={src} alt={`${c.id} visual ${i + 1}`} className="w-full h-auto block" loading="lazy" />
                        ))}
                    </div>
                </div>
                {/* Shadow reflection beneath */}
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-[220px] h-4 bg-black/20 blur-xl rounded-full"></div>
            </div>

            {/* Right: Content */}
            <div className="flex-1 min-w-0 pt-2">
                {/* Header */}
                <div className="flex items-center gap-3 mb-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold" style={{ color: sev.text, backgroundColor: sev.bg }}>
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: sev.dotColor || sev.border }} />
                        {sev.label}
                    </span>
                    <span className="text-[12px] font-bold" style={{ color: '#B8B3AB' }}>{c.id}</span>
                </div>

                <h3 className="text-[24px] font-extrabold mb-8 leading-tight" style={{ color: '#2D2A26' }}>{c.title}</h3>

                {/* Verdict Section — Clean & Professional */}
                <div className="space-y-6">
                    {/* Positive */}
                    <div className="flex gap-4">
                        <div className="mt-1 flex-shrink-0">
                            <CheckCircle size={24} weight="fill" style={{ color: '#166534' }} />
                        </div>
                        <div>
                            <p className="text-[11px] font-bold uppercase tracking-wider mb-1" style={{ color: '#166534', opacity: 0.8 }}>Ce qui fonctionne</p>
                            <p className="text-[15px] leading-relaxed" style={{ color: '#166534' }}>{c.positive}</p>
                        </div>
                    </div>

                    {/* Negative */}
                    <div className="flex gap-4">
                        <div className="mt-1 flex-shrink-0">
                            <Warning size={24} weight="fill" style={{ color: '#B45309' }} />
                        </div>
                        <div>
                            <p className="text-[11px] font-bold uppercase tracking-wider mb-1" style={{ color: '#B45309', opacity: 0.8 }}>Point de friction</p>
                            <p className="text-[15px] leading-relaxed" style={{ color: '#92400E' }}>{c.negative}</p>
                        </div>
                    </div>

                    {/* Proposal */}
                    <div className="flex gap-4 p-5 rounded-2xl" style={{ backgroundColor: '#F5F3FF', border: '1px solid #E9D5FF' }}>
                        <div className="mt-1 flex-shrink-0">
                            <Lightbulb size={24} weight="fill" style={{ color: '#7C3AED' }} />
                        </div>
                        <div>
                            <p className="text-[11px] font-bold uppercase tracking-wider mb-1" style={{ color: '#7C3AED' }}>Notre proposition</p>
                            <p className="text-[15px] leading-relaxed font-medium" style={{ color: '#5B21B6' }}>{c.proposal}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

/* ── Flow Card (engine element → live component + why) ── */
const FlowCard = ({ engine, why, hidden, beforeSrc, children }: {
    engine: { title: string; detail: string; color: string };
    why: string;
    hidden?: boolean;
    beforeSrc?: string;
    children: React.ReactNode;
}) => (
    <div className={`transition-all ${hidden ? 'opacity-40' : ''}`}>
        {/* Engine label — inline, not boxed */}
        <div className="flex items-center gap-3 mb-3">
            <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: engine.color }} />
            <span className="text-[13px] font-bold" style={{ color: '#2D2A26' }}>{engine.title}</span>
            <span className="text-[11px]" style={{ color: '#B8B3AB' }}>— {engine.detail}</span>
        </div>

        {beforeSrc ? (
            /* ── Before / After layout — flat, parallel, no nested boxes ── */
            <div className="grid grid-cols-[1fr_40px_1.2fr] items-start gap-0">
                {/* Before — screenshot displayed large */}
                <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider mb-2 pl-1" style={{ color: '#EF4444' }}>Actuellement</p>
                    <div className="rounded-[16px] overflow-hidden border" style={{ borderColor: '#EDE8E1' }}>
                        <img src={beforeSrc} alt="Écran actuel" className="w-full h-auto block" loading="lazy" />
                    </div>
                    <p className="text-[10px] mt-1.5 pl-1" style={{ color: '#B8B3AB' }}>Ce que l'aidant voit aujourd'hui</p>
                </div>

                {/* Arrow — centered vertically */}
                <div className="flex items-center justify-center h-full pt-8">
                    <ArrowRight size={20} weight="bold" style={{ color: engine.color }} />
                </div>

                {/* After — live component, no box wrapping */}
                <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider mb-2 pl-1" style={{ color: engine.color }}>Notre proposition</p>
                    <div className="rounded-[20px] p-4" style={{ backgroundColor: '#FFFFFF', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
                        {children}
                    </div>
                    <p className="text-[10px] mt-1.5 pl-1" style={{ color: '#B8B3AB' }}>Ce que l'aidant verrait</p>
                </div>
            </div>
        ) : (
            /* ── No before — just show the component ── */
            <div className="rounded-[24px] p-5 overflow-hidden" style={{ backgroundColor: '#FFFFFF', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
                {children}
            </div>
        )}

        {/* Why annotation */}
        <p className="text-[11px] mt-3 pl-1 leading-relaxed" style={{ color: '#B8B3AB' }}>
            ↳ {why}
        </p>
    </div>
);

/* ── Tone translation row ── */
const ToneRow = ({ before, after }: { before: string; after: string }) => (
    <div className="flex items-center gap-4">
        <div className="flex-1 text-right">
            <span className="text-[15px] line-through" style={{ color: '#B8B3AB' }}>{before}</span>
        </div>
        <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#EDE8E1' }}>
            <ArrowRight size={14} style={{ color: '#8C8C8C' }} />
        </div>
        <div className="flex-1">
            <span className="text-[17px] font-bold" style={{ color: '#2D2A26' }}>
                {after}
            </span>
        </div>
    </div>
);

/* ═══════════════════════════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════════════════════════ */

type Chapter = 'constat' | 'mapping' | 'preuve';

export default function ReviewPage() {
    const [activeChapter, setActiveChapter] = useState<Chapter>('constat');
    const [toggledTasks, setToggledTasks] = useState<Record<string, boolean>>({ mt1: false, mt2: true });

    const handleToggle = (id: string) => setToggledTasks(prev => ({ ...prev, [id]: !prev[id] }));
    const tasksForDisplay = DEMO_TASKS.map(t => ({ ...t, isCompleted: toggledTasks[t.id] ?? t.isCompleted }));

    const chapters = [
        { id: 'constat' as const, label: 'Constat' },
        { id: 'mapping' as const, label: 'Défi' },
        { id: 'preuve' as const, label: 'Preuve' },
    ];

    // ── IntersectionObserver: highlight active chapter on scroll ──
    useEffect(() => {
        const sectionIds = ['constat', 'mapping', 'preuve'];
        const observers: IntersectionObserver[] = [];
        sectionIds.forEach(id => {
            const el = document.getElementById(id);
            if (!el) return;
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            setActiveChapter(id as Chapter);
                        }
                    });
                },
                { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
            );
            observer.observe(el);
            observers.push(observer);
        });
        return () => observers.forEach(o => o.disconnect());
    }, []);

    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <div className="min-h-screen" style={{ backgroundColor: '#F3EAE3', fontFamily: "'Outfit', sans-serif" }}>

            {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
               HEADER STICKY
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            <header className="sticky top-0 z-50 border-b" style={{ backgroundColor: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(20px)', borderColor: '#EDE8E1' }}>
                <div className="max-w-5xl mx-auto px-8 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-bold text-sm" style={{ backgroundColor: '#2D2A26' }}>M</div>
                        <div>
                            <h1 className="font-bold text-[14px]" style={{ color: '#2D2A26' }}>Monka — Review UI/UX</h1>
                            <p className="text-[10px] font-medium" style={{ color: '#B8B3AB' }}>Pragma · Février 2026 · Confidentiel</p>
                        </div>
                    </div>
                    <nav className="flex gap-1">
                        {chapters.map(ch => (
                            <button
                                key={ch.id}
                                onClick={() => scrollTo(ch.id)}
                                className="px-4 py-2 rounded-full text-[13px] font-medium transition-all duration-300"
                                style={{
                                    backgroundColor: activeChapter === ch.id ? '#2D2A26' : 'transparent',
                                    color: activeChapter === ch.id ? '#FFFFFF' : '#8A857E',
                                }}
                            >
                                {ch.label}
                            </button>
                        ))}
                    </nav>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-8 py-12">

                {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                   HERO — Grande accroche visuelle
                ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
                <div className="text-center py-16 mb-12">
                    <p className="text-[11px] font-bold tracking-[4px] uppercase mb-4" style={{ color: '#B8B3AB' }}>Pragma · Audit UX · Février 2026</p>
                    <h1 className="text-[52px] font-extrabold leading-[1.05] tracking-[-0.03em] mb-5 gradient-text" style={{ fontFamily: "'Outfit', sans-serif" }}>
                        Review UI/UX
                    </h1>
                    <p className="text-[17px] leading-relaxed max-w-lg mx-auto" style={{ color: '#8A857E' }}>
                        Analyse complète de l'interface Monka — constats, propositions concrètes,<br />et un prototype fonctionnel.
                    </p>
                </div>

                {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                   ACTE 1 — LE CONSTAT
                ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
                <section id="constat" className="scroll-mt-20">

                    {/* ── Intro méthode ── */}
                    <div className="mb-10 rounded-[24px] px-8 py-6" style={{ backgroundColor: '#FFFFFF', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                        <SectionTag color="#7C3AED">Notre méthode</SectionTag>
                        <p className="text-[15px] leading-relaxed" style={{ color: '#2D2A26' }}>
                            Nous avons demandé à <strong>une vraie aidante</strong> de naviguer dans l'app Monka pendant <strong>30+ minutes</strong>, sans guidage.
                            Chaque verbatim ci-dessous est une citation exacte. Chaque capture d'écran est réelle.
                        </p>
                    </div>

                    {/* ── 1a. Persona Amal — Card with gradient border ── */}
                    <div className="rounded-[32px] p-[2px] mb-10" style={{ background: 'linear-gradient(135deg, #E8D6FF 0%, #C4B5FD 50%, #A78BFA 100%)' }}>
                        <div className="bg-white rounded-[30px] p-8 flex items-center gap-6">
                            <div className="w-24 h-24 rounded-full flex-shrink-0 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #E8D6FF, #C4B5FD)' }}>
                                <span className="text-[32px] font-bold" style={{ color: '#7C3AED' }}>A</span>
                            </div>
                            <div>
                                <SectionTag color="#7C3AED">Test utilisateur réel</SectionTag>
                                <h3 className="text-[24px] font-extrabold mb-1" style={{ color: '#2D2A26' }}>Amal, 57 ans</h3>
                                <p className="text-[14px] leading-relaxed" style={{ color: '#8A857E' }}>
                                    Aidante de sa mère <strong style={{ color: '#2D2A26' }}>Fatima, 78 ans</strong> — handicap physique, autonomie réduite.
                                    À l'aise avec son smartphone au quotidien, mais n'a pas de patience pour les interfaces mal pensées.
                                    <br />Son angoisse principale : <strong style={{ color: '#2D2A26' }}>la sécurité de Fatima quand elle ne répond pas au téléphone</strong>.
                                    <br />Elle cherche <strong style={{ color: '#2D2A26' }}>une app qui la soulage, pas qui lui donne des tâches en plus</strong>.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* ── 1b. Parcours d'Amal — Inline JourneyFlow ── */}
                    <div className="mb-10">
                        <JourneyFlow />
                    </div>

                    {/* ── Verdict d'Amal — Après le parcours ── */}
                    <div className="rounded-[24px] px-8 py-8 mb-10" style={{ backgroundColor: '#FAFAF8', border: '1px solid #F0EDE8' }}>
                        <p className="text-[11px] font-bold uppercase tracking-[2px] mb-4" style={{ color: '#EF4444' }}>Verdict d&apos;Amal</p>
                        <p className="text-[18px] font-bold leading-relaxed" style={{ color: '#2D2A26' }}>
                            « Je ne sais pas ce que ça va m&apos;apporter. Est-ce que ça va vraiment m&apos;aider ?
                            <br /><span style={{ color: '#8A857E' }}>M&apos;aider, c&apos;est me soulager d&apos;une tâche ou d&apos;une angoisse.</span>
                            <br />Là, on me donne <span style={{ color: '#EF4444' }}>encore plus de tâches</span> alors que je suis <span style={{ color: '#EF4444' }}>déjà débordée</span>. »
                        </p>
                    </div>

                    {/* ── Pédagogie UI / UX / Copywriting ── */}
                    <div className="mb-12 rounded-[28px] p-8" style={{ backgroundColor: '#FFFFFF', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
                        <SectionTag color="#8B5CF6">Avant de commencer</SectionTag>
                        <h3 className="text-[22px] font-extrabold mb-2" style={{ color: '#2D2A26' }}>Trois axes, trois métiers</h3>
                        <p className="text-[13px] mb-6" style={{ color: '#8A857E' }}>Pour chaque critique, on identifie si le problème relève de l'UI, de l'UX, ou du Copywriting.</p>
                        <div className="grid grid-cols-3 gap-5">
                            {[
                                {
                                    icon: '🎨',
                                    title: 'UI — Interface',
                                    def: 'L\'apparence visuelle : couleurs, typographie, espacement, icônes.',
                                    impact: 'Première impression, crédibilité, confiance immédiate.',
                                    color: '#3B82F6',
                                    bg: '#EFF6FF',
                                    borderColor: '#BFDBFE',
                                },
                                {
                                    icon: '🧭',
                                    title: 'UX — Expérience',
                                    def: 'Le parcours utilisateur : navigation, friction, fluidité, architecture.',
                                    impact: 'Rétention, conversion, satisfaction à long terme.',
                                    color: '#F59E0B',
                                    bg: '#FFFBEB',
                                    borderColor: '#FDE68A',
                                },
                                {
                                    icon: '✍️',
                                    title: 'Copywriting',
                                    def: 'Les mots utilisés : ton, clarté, jargon, cohérence éditoriale.',
                                    impact: 'Compréhension, engagement, passage à l\'action.',
                                    color: '#EC4899',
                                    bg: '#FDF2F8',
                                    borderColor: '#FBCFE8',
                                },
                            ].map((p, i) => (
                                <div key={i} className="rounded-[20px] p-5" style={{ backgroundColor: p.bg, border: `1px solid ${p.borderColor}` }}>
                                    <span className="text-[28px] block mb-3">{p.icon}</span>
                                    <h4 className="text-[15px] font-extrabold mb-2" style={{ color: p.color }}>{p.title}</h4>
                                    <p className="text-[12px] leading-relaxed mb-3" style={{ color: '#2D2A26' }}>{p.def}</p>
                                    <div className="rounded-xl px-3 py-2" style={{ backgroundColor: 'rgba(255,255,255,0.7)' }}>
                                        <p className="text-[11px] font-semibold" style={{ color: p.color }}>Impact business : {p.impact}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── 1c. Résumé des points critiques — par thème ── */}
                    <SectionTag color="#EF4444">Le Constat</SectionTag>
                    <SectionTitle>
                        6 points critiques identifiés,<br />3 thèmes à travailler.
                    </SectionTitle>
                    <SectionSubtitle>
                        Chaque constat pointe vers un axe de travail précis dans la construction de l&apos;application.
                    </SectionSubtitle>

                    {/* Theme legend */}
                    <div className="flex gap-3 mb-6 flex-wrap">
                        {[
                            { emoji: '🎨', label: 'Interface (UI)', color: '#3B82F6', bg: '#EFF6FF' },
                            { emoji: '✍️', label: 'Copywriting', color: '#EC4899', bg: '#FDF2F8' },
                            { emoji: '🧭', label: 'Expérience (UX)', color: '#F59E0B', bg: '#FFFBEB' },
                        ].map((t, i) => (
                            <div key={i} className="flex items-center gap-2 px-3.5 py-2 rounded-full text-[12px] font-bold" style={{ color: t.color, backgroundColor: t.bg }}>
                                <span>{t.emoji}</span> {t.label}
                            </div>
                        ))}
                    </div>

                    {/* Critique cards — compact with theme tags */}
                    <div className="space-y-3 mb-16">
                        {[
                            { title: 'Navigation à un seul niveau', severity: 'bloquant' as const, theme: '🎨 UI', themeColor: '#3B82F6', themeBg: '#EFF6FF', desc: 'Les 4 onglets partagent la même structure — seule la couleur change.', proposal: 'Architecture en profondeur : Thèmes → Parcours → Actions' },
                            { title: 'Séquence de découverte interrompue', severity: 'bloquant' as const, theme: '🧭 UX', themeColor: '#F59E0B', themeBg: '#FFFBEB', desc: 'Paywall après 30 min de questionnaire, avant de voir la valeur.', proposal: 'Montrer le profil personnalisé avant la conversion' },
                            { title: 'Personnalisation à renforcer', severity: 'majeur' as const, theme: '🧭 UX', themeColor: '#F59E0B', themeBg: '#FFFBEB', desc: 'Hero cards génériques malgré les données du moteur.', proposal: 'Personnalisation systématique : « Pour Francine » partout' },
                            { title: 'Contextualisation des recommandations', severity: 'majeur' as const, theme: '🎨 UI', themeColor: '#3B82F6', themeBg: '#EFF6FF', desc: 'Les recommandations n\'expliquent pas le « pourquoi ».', proposal: 'Ajouter un contexte sous chaque recommandation' },
                            { title: 'Structure de navigation uniforme', severity: 'majeur' as const, theme: '🎨 UI', themeColor: '#3B82F6', themeBg: '#EFF6FF', desc: 'Expérience identique d\'un onglet à l\'autre, contenu perçu comme pauvre.', proposal: '5 thèmes distincts ouvrant 24 micro-parcours' },
                            { title: 'Harmonisation éditoriale', severity: 'mineur' as const, theme: '✍️ Copy', themeColor: '#EC4899', themeBg: '#FDF2F8', desc: 'Coquilles, formules d\'adresse incohérentes, vocabulaire trop technique.', proposal: 'Charte copywriting unifiée, ton bienveillant' },
                        ].map((item, i) => {
                            const sev = SEVERITY_STYLES[item.severity];
                            return (
                                <div key={i} className="bg-white rounded-[20px] p-5 flex gap-4" style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}>
                                    {/* Number */}
                                    <span className="flex-shrink-0 text-[20px] font-extrabold mt-0.5" style={{ color: '#EDE8E1' }}>
                                        {String(i + 1).padStart(2, '0')}
                                    </span>
                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                                            <h4 className="text-[14px] font-bold" style={{ color: '#2D2A26' }}>{item.title}</h4>
                                            <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider" style={{ color: sev.text, backgroundColor: sev.bg }}>
                                                {sev.label}
                                            </span>
                                            <span className="px-2 py-0.5 rounded-full text-[9px] font-bold" style={{ color: item.themeColor, backgroundColor: item.themeBg }}>
                                                {item.theme}
                                            </span>
                                        </div>
                                        <p className="text-[12px] leading-relaxed mb-2" style={{ color: '#8A857E' }}>{item.desc}</p>
                                        <div className="flex items-start gap-2">
                                            <ArrowRight size={12} weight="bold" className="flex-shrink-0 mt-0.5" style={{ color: '#059669' }} />
                                            <p className="text-[11px] font-semibold" style={{ color: '#059669' }}>{item.proposal}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* ── 1d. Le Paradoxe — Visual split layout ── */}
                    <SectionTag color="#10B981">Ce qu'on a observé</SectionTag>
                    <SectionTitle gradient>Un moteur puissant,<br />une interface qui ne l'exploite pas encore.</SectionTitle>
                    <div className="grid grid-cols-2 gap-0 rounded-[28px] overflow-hidden mb-6" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
                        {/* Left column header — Engine */}
                        <div className="px-6 py-4" style={{ backgroundColor: '#ECFDF5' }}>
                            <p className="text-[11px] font-bold uppercase tracking-wider" style={{ color: '#065F46' }}>🔬 Ce que le moteur sait</p>
                        </div>
                        {/* Right column header — User */}
                        <div className="px-6 py-4" style={{ backgroundColor: '#FFFBEB' }}>
                            <p className="text-[11px] font-bold uppercase tracking-wider" style={{ color: '#92400E' }}>👁️ Ce que l'aidant voit</p>
                        </div>
                        {/* Rows */}
                        {PARADOX_ROWS.map((row, i) => (
                            <React.Fragment key={i}>
                                <div className="px-6 py-4 flex items-center gap-3 bg-white" style={{ borderBottom: '1px solid #F3EAE3' }}>
                                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#10B981' }} />
                                    <p className="text-[14px] font-medium" style={{ color: '#2D2A26' }}>{row.engine}</p>
                                </div>
                                <div className="px-6 py-4 flex items-center gap-3 bg-white" style={{ borderBottom: '1px solid #F3EAE3', borderLeft: '2px solid #F59E0B' }}>
                                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#F59E0B' }} />
                                    <p className="text-[14px]" style={{ color: '#8A857E' }}>{row.user}</p>
                                </div>
                            </React.Fragment>
                        ))}
                    </div>


                </section>

                {/* ── Section divider ── */}
                <div className="my-20 flex items-center gap-6">
                    <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, #DDD5CC)' }} />
                    <div className="flex items-center gap-3 px-5 py-2.5 rounded-full" style={{ backgroundColor: '#FFFFFF', boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}>
                        <span className="text-[16px]">📋</span>
                        <span className="text-[11px] font-bold tracking-[3px] uppercase" style={{ color: '#B8B3AB' }}>Chapitre suivant</span>
                    </div>
                    <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, #DDD5CC, transparent)' }} />
                </div>

                {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                   ACTE 2 — LE DÉFI
                ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
                <section id="mapping" className="scroll-mt-20">

                    <SectionTag color="#3B82F6">Le Défi</SectionTag>
                    <SectionTitle>
                        Un moteur riche mérite<br />une app à sa hauteur.
                    </SectionTitle>
                    <SectionSubtitle>
                        Le défi : retranscrire cette richesse clinique en une application mobile simple, intuitive et humaine — pour que les aidants s&apos;en servent vraiment.
                    </SectionSubtitle>

                    {/* ── Intro: 3 piliers ── */}
                    <div className="grid grid-cols-3 gap-4 mb-16">
                        {[
                            { emoji: '🎨', title: 'Interface', subtitle: 'Comment on affiche les données du moteur', color: '#3B82F6', bg: '#EFF6FF' },
                            { emoji: '✍️', title: 'Copywriting', subtitle: 'Comment on parle à l\'aidant', color: '#EC4899', bg: '#FDF2F8' },
                            { emoji: '🧭', title: 'Expérience', subtitle: 'Comment on organise l\'app', color: '#F59E0B', bg: '#FFFBEB' },
                        ].map((p, i) => (
                            <div key={i} className="rounded-[20px] p-5 text-center" style={{ backgroundColor: p.bg }}>
                                <span className="text-[28px] block mb-2">{p.emoji}</span>
                                <h4 className="text-[14px] font-bold mb-1" style={{ color: p.color }}>{p.title}</h4>
                                <p className="text-[11px]" style={{ color: '#8A857E' }}>{p.subtitle}</p>
                            </div>
                        ))}
                    </div>

                    {/* ╔══════════════════════════════════════╗
                       ║  🎨 SOUS-SECTION: INTERFACE (UI)     ║
                       ╚══════════════════════════════════════╝ */}
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center text-[20px]" style={{ backgroundColor: '#EFF6FF' }}>🎨</div>
                        <div>
                            <h3 className="text-[20px] font-extrabold" style={{ color: '#2D2A26' }}>Interface</h3>
                            <p className="text-[12px]" style={{ color: '#8A857E' }}>Chaque concept du moteur a un composant dédié</p>
                        </div>
                    </div>

                    {/* ── Mapping : Moteur → Notre composant ── */}
                    <div className="space-y-8 mb-16">
                        {/* Column Headers */}
                        <div className="grid grid-cols-[1fr_60px_1.2fr] items-center gap-0 px-2">
                            <p className="text-[10px] font-bold uppercase tracking-[2px]" style={{ color: '#8A857E' }}>Concept moteur (Kernel V5)</p>
                            <div />
                            <p className="text-[10px] font-bold uppercase tracking-[2px]" style={{ color: '#059669' }}>Composant</p>
                        </div>

                        {/* Row 1: Vulnérabilité */}
                        <div className="grid grid-cols-[1fr_60px_1.2fr] items-stretch gap-0">
                            {/* Engine block */}
                            <div className="rounded-[20px] p-5 flex flex-col justify-center" style={{ backgroundColor: '#FBF9F7', border: '1px solid #EDE8E1', borderLeft: '4px solid #8B5CF6' }}>
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: '#8B5CF6' }} />
                                    <span className="text-[14px] font-bold" style={{ color: '#2D2A26' }}>Vulnérabilité</span>
                                </div>
                                <p className="text-[11px] leading-relaxed" style={{ color: '#8A857E' }}>
                                    V1 → V5<br />
                                    5 domaines de risque<br />
                                    <span className="font-semibold" style={{ color: '#8B5CF6' }}>Intensité par vulnérabilité</span>
                                </p>
                                <div className="flex gap-1 mt-3 flex-wrap">
                                    <MTag label="Social" domain="R" size="sm" />
                                    <MTag label="Admin" domain="A" size="sm" />
                                    <MTag label="Santé" domain="S" size="sm" />
                                    <MTag label="Proche" domain="F" size="sm" />
                                    <MTag label="Médical" domain="M" size="sm" />
                                </div>
                            </div>

                            {/* Big Arrow */}
                            <div className="flex items-center justify-center">
                                <div className="flex flex-col items-center gap-1">
                                    <ArrowRight size={32} weight="bold" style={{ color: '#059669' }} />
                                </div>
                            </div>

                            {/* Component block */}
                            <div className="rounded-[20px] p-5" style={{ backgroundColor: '#FFFFFF', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', border: '1px solid #E8F5E9' }}>
                                <p className="text-[9px] font-bold uppercase tracking-wider mb-3" style={{ color: '#059669' }}>« Thème de vie »</p>
                                <HeroCard domain="S" title="Prendre soin de votre santé" subtitle="3 actions personnalisées" taskCount={3} targetPerson="Francine" />
                            </div>
                        </div>

                        {/* Row 2: Micro-Parcours */}
                        <div className="grid grid-cols-[1fr_60px_1.2fr] items-stretch gap-0">
                            {/* Engine block */}
                            <div className="rounded-[20px] p-5 flex flex-col justify-center" style={{ backgroundColor: '#FBF9F7', border: '1px solid #EDE8E1', borderLeft: '4px solid #3B82F6' }}>
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: '#3B82F6' }} />
                                    <span className="text-[14px] font-bold" style={{ color: '#2D2A26' }}>Micro-Parcours</span>
                                </div>
                                <p className="text-[11px] leading-relaxed" style={{ color: '#8A857E' }}>
                                    24 parcours (K9 : 1 MP = 1 ASR)<br />
                                    Objectifs mesurables<br />
                                    <span className="font-semibold" style={{ color: '#3B82F6' }}>Progression par domaine</span>
                                </p>
                            </div>

                            {/* Big Arrow */}
                            <div className="flex items-center justify-center">
                                <div className="flex flex-col items-center gap-1">
                                    <ArrowRight size={32} weight="bold" style={{ color: '#059669' }} />
                                </div>
                            </div>

                            {/* Component block */}
                            <div className="rounded-[20px] p-5" style={{ backgroundColor: '#FFFFFF', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', border: '1px solid #E8F5E9' }}>
                                <p className="text-[9px] font-bold uppercase tracking-wider mb-3" style={{ color: '#059669' }}>« Parcours »</p>
                                <div className="flex items-center gap-4">
                                    <div className="flex-1">
                                        <ProgressCard percentage={72} variant="compact" label="de votre parcours complété" />
                                    </div>
                                    <ScoreRing score={72} size={80} strokeWidth={7} color="#3B82F6" label="Objectif" />
                                </div>
                            </div>
                        </div>

                        {/* Row 3: Recommandation */}
                        <div className="grid grid-cols-[1fr_60px_1.2fr] items-stretch gap-0">
                            {/* Engine block */}
                            <div className="rounded-[20px] p-5 flex flex-col justify-center" style={{ backgroundColor: '#FBF9F7', border: '1px solid #EDE8E1', borderLeft: '4px solid #EC4899' }}>
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: '#EC4899' }} />
                                    <span className="text-[14px] font-bold" style={{ color: '#2D2A26' }}>Recommandation</span>
                                </div>
                                <p className="text-[11px] leading-relaxed" style={{ color: '#8A857E' }}>
                                    Organisées par catégorie (K17)<br />
                                    3 niveaux de criticité (K2)<br />
                                    <span className="font-semibold" style={{ color: '#EC4899' }}>🔴 Critique · 🟠 CCC · 🟢 Standard</span>
                                </p>
                                <div className="flex gap-1 mt-3 flex-wrap">
                                    <Badge variant="critique" />
                                    <Badge variant="vigilance" />
                                    <Badge variant="standard" />
                                </div>
                            </div>

                            {/* Big Arrow */}
                            <div className="flex items-center justify-center">
                                <div className="flex flex-col items-center gap-1">
                                    <ArrowRight size={32} weight="bold" style={{ color: '#059669' }} />
                                </div>
                            </div>

                            {/* Component block */}
                            <div className="rounded-[20px] p-5" style={{ backgroundColor: '#FFFFFF', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', border: '1px solid #E8F5E9' }}>
                                <p className="text-[9px] font-bold uppercase tracking-wider mb-3" style={{ color: '#059669' }}>« Conseil »</p>
                                <div className="space-y-3">
                                    <TaskCard title="Se faire accompagner" description="Évaluer votre situation et accéder aux aides disponibles." criticality="ccc" domain="R" targetPerson="Francine" />
                                    <TaskCard title="Faire la demande d'APA" description="Rassembler les justificatifs et contacter le département." criticality="critical" domain="A" />
                                </div>
                            </div>
                        </div>

                        {/* Row 4: Micro-Tâche */}
                        <div className="grid grid-cols-[1fr_60px_1.2fr] items-stretch gap-0">
                            {/* Engine block */}
                            <div className="rounded-[20px] p-5 flex flex-col justify-center" style={{ backgroundColor: '#FBF9F7', border: '1px solid #EDE8E1', borderLeft: '4px solid #F59E0B' }}>
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: '#F59E0B' }} />
                                    <span className="text-[14px] font-bold" style={{ color: '#2D2A26' }}>Micro-Tâche</span>
                                </div>
                                <p className="text-[11px] leading-relaxed" style={{ color: '#8A857E' }}>
                                    Actions concrètes (K20)<br />
                                    📍 Contributives / 💡 Non-contributives<br />
                                    <span className="font-semibold" style={{ color: '#F59E0B' }}>Cochables — font avancer l&apos;ASR</span>
                                </p>
                            </div>

                            {/* Big Arrow */}
                            <div className="flex items-center justify-center">
                                <div className="flex flex-col items-center gap-1">
                                    <ArrowRight size={32} weight="bold" style={{ color: '#059669' }} />
                                </div>
                            </div>

                            {/* Component block */}
                            <div className="rounded-[20px] p-5" style={{ backgroundColor: '#FFFFFF', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', border: '1px solid #E8F5E9' }}>
                                <p className="text-[9px] font-bold uppercase tracking-wider mb-3" style={{ color: '#059669' }}>« Action »</p>
                                <div className="space-y-3">
                                    {tasksForDisplay.map(task => (
                                        <MicroTaskItem key={task.id} task={task} onToggle={handleToggle} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ╔══════════════════════════════════════════╗
                       ║  ✍️ SOUS-SECTION: COPYWRITING            ║
                       ╚══════════════════════════════════════════╝ */}
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center text-[20px]" style={{ backgroundColor: '#FDF2F8' }}>✍️</div>
                        <div>
                            <h3 className="text-[20px] font-extrabold" style={{ color: '#2D2A26' }}>Copywriting</h3>
                            <p className="text-[12px]" style={{ color: '#8A857E' }}>L&apos;aidant n&apos;est pas un patient — il est accompagné</p>
                        </div>
                    </div>

                    {/* ── Principes copywriting — Conseils actionnables ── */}
                    <div className="bg-white rounded-[32px] p-8 space-y-5 mb-4" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
                        <p className="text-[10px] font-bold uppercase tracking-[2px] mb-1" style={{ color: '#EC4899' }}>Charte éditoriale — 4 principes</p>
                        <p className="text-[11px] mb-4" style={{ color: '#8A857E' }}>Chaque principe est illustré par un problème réel identifié dans l&apos;app Monka.</p>

                        {/* Principe 1: Ton uniforme */}
                        <div className="rounded-[20px] p-5" style={{ backgroundColor: '#FDF2F8', border: '1px solid #FBCFE8' }}>
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-7 h-7 rounded-full flex items-center justify-center text-[13px] font-extrabold" style={{ backgroundColor: '#EC4899', color: '#fff' }}>1</div>
                                <span className="text-[15px] font-extrabold" style={{ color: '#2D2A26' }}>Ton uniforme sur toute l&apos;app</span>
                            </div>
                            <p className="text-[13px] leading-relaxed mb-3" style={{ color: '#4B5563' }}>
                                Choisir <strong>un seul registre</strong> (vouvoiement bienveillant) et s&apos;y tenir. Actuellement, l&apos;app alterne entre tutoiement, vouvoiement, et ton impersonnel d&apos;un écran à l&apos;autre.
                            </p>
                            <div className="flex items-center gap-3 rounded-[12px] px-4 py-3" style={{ backgroundColor: '#fff', border: '1px solid #F3EAE3' }}>
                                <span className="text-[11px]" style={{ color: '#EF4444' }}>❌</span>
                                <span className="text-[12px] italic" style={{ color: '#8A857E' }}>« En 7 jours vous y voyez plus clair » / « Chaque mois on refait le point » / « On s&apos;en occupe »</span>
                            </div>
                        </div>

                        {/* Principe 2: Vocabulaire accessible */}
                        <div className="rounded-[20px] p-5" style={{ backgroundColor: '#FDF2F8', border: '1px solid #FBCFE8' }}>
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-7 h-7 rounded-full flex items-center justify-center text-[13px] font-extrabold" style={{ backgroundColor: '#EC4899', color: '#fff' }}>2</div>
                                <span className="text-[15px] font-extrabold" style={{ color: '#2D2A26' }}>Vocabulaire accessible, zéro jargon</span>
                            </div>
                            <p className="text-[13px] leading-relaxed mb-3" style={{ color: '#4B5563' }}>
                                Remplacer <strong>chaque acronyme et terme médical</strong> par son équivalent compréhensible. L&apos;aidant n&apos;est pas un professionnel de santé.
                            </p>
                            <div className="grid grid-cols-2 gap-2">
                                <div className="rounded-[12px] px-4 py-3" style={{ backgroundColor: '#FEE2E2', border: '1px solid #FECACA' }}>
                                    <p className="text-[10px] font-bold mb-1" style={{ color: '#EF4444' }}>Actuellement</p>
                                    <p className="text-[12px]" style={{ color: '#991B1B' }}>« Solliciter la CARSAT » · « IDEC » · « Résidence sérieuse »</p>
                                </div>
                                <div className="rounded-[12px] px-4 py-3" style={{ backgroundColor: '#ECFDF5', border: '1px solid #A7F3D0' }}>
                                    <p className="text-[10px] font-bold mb-1" style={{ color: '#059669' }}>Recommandé</p>
                                    <p className="text-[12px]" style={{ color: '#065F46' }}>« Vos droits retraite » · « Votre coordinateur santé » · « Résidence autonomie »</p>
                                </div>
                            </div>
                        </div>

                        {/* Principe 3: Boutons actionnables */}
                        <div className="rounded-[20px] p-5" style={{ backgroundColor: '#FDF2F8', border: '1px solid #FBCFE8' }}>
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-7 h-7 rounded-full flex items-center justify-center text-[13px] font-extrabold" style={{ backgroundColor: '#EC4899', color: '#fff' }}>3</div>
                                <span className="text-[15px] font-extrabold" style={{ color: '#2D2A26' }}>Boutons et CTA explicites</span>
                            </div>
                            <p className="text-[13px] leading-relaxed mb-3" style={{ color: '#4B5563' }}>
                                Chaque bouton doit dire <strong>exactement ce qu&apos;il fait</strong>. « C&apos;est fait » sur une page info ne veut rien dire — « J&apos;ai compris » ou « Étape suivante » donne le contrôle à l&apos;aidant.
                            </p>
                            <div className="grid grid-cols-2 gap-2">
                                <div className="rounded-[12px] px-4 py-3" style={{ backgroundColor: '#FEE2E2', border: '1px solid #FECACA' }}>
                                    <p className="text-[10px] font-bold mb-1" style={{ color: '#EF4444' }}>Actuellement</p>
                                    <p className="text-[12px]" style={{ color: '#991B1B' }}>« C&apos;est fait » · « Faites-vous aider » · « C&apos;est parti »</p>
                                </div>
                                <div className="rounded-[12px] px-4 py-3" style={{ backgroundColor: '#ECFDF5', border: '1px solid #A7F3D0' }}>
                                    <p className="text-[10px] font-bold mb-1" style={{ color: '#059669' }}>Recommandé</p>
                                    <p className="text-[12px]" style={{ color: '#065F46' }}>« J&apos;ai compris » · « Voir les ressources » · « Commencer le questionnaire »</p>
                                </div>
                            </div>
                        </div>

                        {/* Principe 4: Questions cohérentes */}
                        <div className="rounded-[20px] p-5" style={{ backgroundColor: '#FDF2F8', border: '1px solid #FBCFE8' }}>
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-7 h-7 rounded-full flex items-center justify-center text-[13px] font-extrabold" style={{ backgroundColor: '#EC4899', color: '#fff' }}>4</div>
                                <span className="text-[15px] font-extrabold" style={{ color: '#2D2A26' }}>Questions bien formulées</span>
                            </div>
                            <p className="text-[13px] leading-relaxed mb-3" style={{ color: '#4B5563' }}>
                                Cohérence sujet/verbe, orthographe vérifiée, et <strong>les réponses doivent correspondre à la question posée</strong>. « Quelle activité exercez-vous ? » avec des réponses qui sont des situations, pas des activités.
                            </p>
                            <div className="flex items-center gap-3 rounded-[12px] px-4 py-3" style={{ backgroundColor: '#fff', border: '1px solid #F3EAE3' }}>
                                <span className="text-[11px]" style={{ color: '#EF4444' }}>❌</span>
                                <span className="text-[12px] italic" style={{ color: '#8A857E' }}>« quel âge la personne » (manque « a ») · « Modifer » (manque « i ») · « anxieuxe »</span>
                            </div>
                        </div>
                    </div>



                    {/* ── Double wording : IDEC vs Utilisateur (K6/K19) — REDESIGNED ── */}
                    <div className="bg-white rounded-[32px] p-8 mb-16" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
                        <p className="text-[10px] font-bold uppercase tracking-[2px] mb-2" style={{ color: '#EC4899' }}>Niveaux de criticité — Double wording</p>
                        <p className="text-[13px] mb-6" style={{ color: '#8A857E' }}>L&apos;IDEC et l&apos;aidant voient les mêmes recommandations — seul le wording change selon le destinataire.</p>

                        {/* Header row */}
                        <div className="grid grid-cols-[180px_1fr_1fr] gap-4 mb-4 px-2">
                            <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: '#B8B3AB' }}>Niveau</span>
                            <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: '#6B7280' }}>Ce que l&apos;IDEC voit</span>
                            <span className="text-[11px] font-bold uppercase tracking-wider" style={{ color: '#6B7280' }}>Ce que l&apos;aidant voit</span>
                        </div>

                        {/* Level cards */}
                        <div className="space-y-3">
                            {[
                                { label: 'Critique', delay: '≤ 7 jours', idec: 'Intervention urgente requise', user: 'À faire cette semaine', color: '#EF4444', bg: '#FEE2E2', borderColor: '#FECACA' },
                                { label: 'CCC', delay: '≤ 30 jours', idec: 'Vigilance renforcée — signaux combinés', user: 'Important ce mois-ci', color: '#F59E0B', bg: '#FEF3C7', borderColor: '#FDE68A' },
                                { label: 'Standard', delay: '≤ 90 jours', idec: 'Suivi de routine', user: 'À votre rythme', color: '#10B981', bg: '#ECFDF5', borderColor: '#A7F3D0' },
                                { label: 'Prévention', delay: '—', idec: 'Aucune activation', user: 'Tout va bien', color: '#9CA3AF', bg: '#F9FAFB', borderColor: '#E5E7EB' },
                            ].map((row, i) => (
                                <div key={i} className="grid grid-cols-[180px_1fr_1fr] gap-4 items-center rounded-[18px] px-5 py-4" style={{ backgroundColor: row.bg, border: `1.5px solid ${row.borderColor}`, borderLeft: `5px solid ${row.color}` }}>
                                    <div className="flex items-center gap-3">
                                        <div className="w-4 h-4 rounded-full flex-shrink-0" style={{ backgroundColor: row.color }} />
                                        <div>
                                            <span className="text-[14px] font-extrabold block" style={{ color: row.color }}>{row.label}</span>
                                            <span className="text-[11px]" style={{ color: '#8A857E' }}>{row.delay}</span>
                                        </div>
                                    </div>
                                    <p className="text-[13px] font-medium leading-snug" style={{ color: '#2D2A26' }}>{row.idec}</p>
                                    <p className="text-[13px] font-bold leading-snug" style={{ color: row.color }}>{row.user}</p>
                                </div>
                            ))}
                        </div>

                        <div className="flex items-start gap-3 mt-5 rounded-[16px] px-5 py-4" style={{ backgroundColor: '#FDF2F8', border: '1px solid #FBCFE8' }}>
                            <Lightbulb size={20} weight="bold" className="flex-shrink-0 mt-0.5" style={{ color: '#EC4899' }} />
                            <p className="text-[12px] leading-relaxed" style={{ color: '#6B7280' }}>
                                <strong style={{ color: '#EC4899' }}>CCC = Condition Critique Composite</strong> — se déclenche quand 2+ signaux cliniques se combinent (ex : épuisé + isolé). Les délais sont des objectifs d&apos;intervention pour l&apos;IDEC, jamais affichés à l&apos;aidant.
                            </p>
                        </div>
                    </div>

                    {/* ╔══════════════════════════════════════════╗
                       ║  🧭 SOUS-SECTION: EXPÉRIENCE (UX)       ║
                       ╚══════════════════════════════════════════╝ */}
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center text-[20px]" style={{ backgroundColor: '#FFFBEB' }}>🧭</div>
                        <div>
                            <h3 className="text-[20px] font-extrabold" style={{ color: '#2D2A26' }}>Expérience</h3>
                            <p className="text-[12px]" style={{ color: '#8A857E' }}>Comment organiser l&apos;app pour séparer les thèmes et guider l&apos;aidant</p>
                        </div>
                    </div>

                    {/* ── Profondeur d'app : 1 niveau → 4 niveaux ── */}
                    <div className="bg-white rounded-[32px] p-8 mb-8" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
                        <p className="text-[10px] font-bold uppercase tracking-[2px] mb-5" style={{ color: '#F59E0B' }}>Profondeur de navigation</p>
                        <div className="grid grid-cols-2 gap-6">
                            {/* Avant */}
                            <div className="rounded-[20px] p-5" style={{ backgroundColor: '#FDF6F0', border: '2px dashed #EDE8E1' }}>
                                <p className="text-[11px] font-bold uppercase tracking-wider mb-4" style={{ color: '#EF4444' }}>Actuellement — 1 niveau</p>
                                <div className="space-y-2">
                                    {['À la une', 'Santé', 'Démarches', 'Services'].map((tab, i) => (
                                        <div key={i} className="flex items-center gap-2 px-3 py-2.5 rounded-xl" style={{ backgroundColor: '#FFFFFF', border: '1px solid #EDE8E1' }}>
                                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#D4D4D4' }} />
                                            <span className="text-[12px]" style={{ color: '#8A857E' }}>{tab}</span>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-[10px] italic mt-3 text-center" style={{ color: '#B8B3AB' }}>Même structure partout, pas de hiérarchie</p>
                            </div>
                            {/* Après */}
                            <div className="rounded-[20px] p-5" style={{ backgroundColor: '#FFFFFF', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
                                <p className="text-[11px] font-bold uppercase tracking-wider mb-4" style={{ color: '#059669' }}>Notre proposition — 4 niveaux</p>
                                <div className="space-y-1.5">
                                    <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl" style={{ backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE' }}>
                                        <span className="text-[11px] font-bold" style={{ color: '#3B82F6' }}>1.</span>
                                        <span className="text-[12px] font-bold" style={{ color: '#2D2A26' }}>Thèmes de vie</span>
                                        <span className="text-[9px] ml-auto" style={{ color: '#8A857E' }}>Santé, Droits, Répit…</span>
                                    </div>
                                    <div className="flex items-center justify-center">
                                        <ArrowRight size={12} weight="bold" style={{ color: '#D4D4D4', transform: 'rotate(90deg)' }} />
                                    </div>
                                    <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl" style={{ backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0' }}>
                                        <span className="text-[11px] font-bold" style={{ color: '#059669' }}>2.</span>
                                        <span className="text-[12px] font-bold" style={{ color: '#2D2A26' }}>Micro-Parcours</span>
                                        <span className="text-[9px] ml-auto" style={{ color: '#8A857E' }}>24 parcours guidés</span>
                                    </div>
                                    <div className="flex items-center justify-center">
                                        <ArrowRight size={12} weight="bold" style={{ color: '#D4D4D4', transform: 'rotate(90deg)' }} />
                                    </div>
                                    <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl" style={{ backgroundColor: '#FDF2F8', border: '1px solid #FBCFE8' }}>
                                        <span className="text-[11px] font-bold" style={{ color: '#EC4899' }}>3.</span>
                                        <span className="text-[12px] font-bold" style={{ color: '#2D2A26' }}>Recommandations</span>
                                        <span className="text-[9px] ml-auto" style={{ color: '#8A857E' }}>Conseils adaptés au profil</span>
                                    </div>
                                    <div className="flex items-center justify-center">
                                        <ArrowRight size={12} weight="bold" style={{ color: '#D4D4D4', transform: 'rotate(90deg)' }} />
                                    </div>
                                    <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl" style={{ backgroundColor: '#FFFBEB', border: '1px solid #FDE68A' }}>
                                        <span className="text-[11px] font-bold" style={{ color: '#F59E0B' }}>4.</span>
                                        <span className="text-[12px] font-bold" style={{ color: '#2D2A26' }}>Micro-Tâches</span>
                                        <span className="text-[9px] ml-auto" style={{ color: '#8A857E' }}>Actions cochables par parcours</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── Use Cases principaux — Grille 3×2 ── */}
                    <div className="bg-white rounded-[32px] p-8 mb-8" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
                        <p className="text-[10px] font-bold uppercase tracking-[2px] mb-2" style={{ color: '#F59E0B' }}>Use cases principaux</p>
                        <p className="text-[13px] mb-6" style={{ color: '#8A857E' }}>Les 6 situations concrètes que l&apos;app doit couvrir pour un aidant.</p>
                        <div className="grid grid-cols-3 gap-4">
                            {[
                                {
                                    title: 'Check-in du matin', color: '#F59E0B',
                                    desc: 'Voir ses 2-3 actions prioritaires du jour et cocher ce qui est fait.',
                                },
                                {
                                    title: 'Découverte post-questionnaire', color: '#3B82F6',
                                    desc: 'Premier lancement : découvrir ses thèmes de vie et comprendre par où commencer.',
                                },
                                {
                                    title: 'Trouver un professionnel', color: '#10B981',
                                    desc: 'Chercher un pro par spécialité et proximité, sauvegarder le contact.',
                                },
                                {
                                    title: 'Se renseigner sur un sujet', color: '#8B5CF6',
                                    desc: 'Lire un article adapté à son contexte, comprendre ses droits.',
                                },
                                {
                                    title: 'Chercher du soutien', color: '#EC4899',
                                    desc: 'Identifier la bonne ressource (asso, pro, ligne d\'écoute) en 2 taps.',
                                },
                                {
                                    title: 'Demander de l\'aide / Parler à l\'IDEC', color: '#EF4444',
                                    desc: 'Contacter son IDEC référent, poser une question, demander un accompagnement.',
                                },
                            ].map((uc, i) => (
                                <div key={i} className="rounded-[18px] p-5 flex flex-col" style={{ backgroundColor: '#FAFAF8', border: '1px solid #F0EDE8' }}>
                                    <div className="flex items-center gap-2.5 mb-3">
                                        <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: uc.color }} />
                                        <h5 className="text-[13px] font-bold" style={{ color: '#2D2A26' }}>{uc.title}</h5>
                                    </div>
                                    <p className="text-[11px] leading-relaxed" style={{ color: '#8A857E' }}>{uc.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── 2.1 Audit des écrans codés + 2.2 Arborescence ── */}
                    <div className="bg-white rounded-[32px] p-8 mb-8" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
                        <p className="text-[10px] font-bold uppercase tracking-[2px] mb-2" style={{ color: '#F59E0B' }}>Arborescence du prototype</p>
                        <p className="text-[13px] mb-6" style={{ color: '#8A857E' }}>Inventaire complet des écrans codés dans le prototype fonctionnel — 15 composants, navigation complète.</p>

                        {/* Arbre de parcours — top-down journey tree */}
                        <div className="rounded-[20px] p-8 mb-6 flex flex-col items-center" style={{ backgroundColor: '#FAFAF8', border: '1px solid #F0EDE8' }}>
                            {/* Root — Onboarding */}
                            <div className="rounded-[14px] px-5 py-2.5 text-center font-bold text-[13px] text-white" style={{ backgroundColor: '#8B5CF6' }}>Onboarding · Questionnaire</div>
                            <div className="w-px h-5" style={{ backgroundColor: '#D4D4D4' }} />

                            {/* Dashboard */}
                            <div className="rounded-[14px] px-5 py-2.5 text-center font-bold text-[13px] text-white" style={{ backgroundColor: '#3B82F6' }}>Dashboard</div>
                            <div className="w-px h-5" style={{ backgroundColor: '#D4D4D4' }} />

                            {/* Pages — horizontal branches from Dashboard */}
                            <div className="relative w-full max-w-[750px] mb-6">
                                <div className="absolute top-0 left-[8%] right-[8%] h-px" style={{ backgroundColor: '#D4D4D4' }} />
                                <div className="grid grid-cols-5 gap-2">
                                    {[
                                        { label: 'Programme', icon: '📋', sub: 'Thèmes · Parcours' },
                                        { label: 'Calendrier', icon: '📅', sub: 'Agenda semaine' },
                                        { label: 'Ressources', icon: '📚', sub: 'Articles · Guides' },
                                        { label: 'Communauté', icon: '👥', sub: 'Annuaire Pro' },
                                        { label: 'Chat IDEC', icon: '💬', sub: 'Messagerie' },
                                    ].map((p, i) => (
                                        <div key={i} className="flex flex-col items-center">
                                            <div className="w-px h-4" style={{ backgroundColor: '#D4D4D4' }} />
                                            <div className="rounded-[12px] px-2 py-2.5 text-center w-full" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5EA', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
                                                <p className="text-[14px] mb-0.5">{p.icon}</p>
                                                <p className="text-[11px] font-bold" style={{ color: '#2D2A26' }}>{p.label}</p>
                                                <p className="text-[9px] mt-0.5" style={{ color: '#B8B3AB' }}>{p.sub}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Focus on Programme branch — engine hierarchy */}
                            <div className="rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider" style={{ backgroundColor: '#EFF6FF', color: '#3B82F6', border: '1px solid #BFDBFE' }}>Zoom : Programme → Parcours moteur</div>
                            <div className="w-px h-4" style={{ backgroundColor: '#D4D4D4' }} />

                            {/* Thèmes branch label */}
                            <div className="rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider mb-2" style={{ backgroundColor: '#FFF7ED', color: '#F59E0B', border: '1px solid #FDE68A' }}>5 thèmes de vie identifiés</div>
                            <div className="w-px h-4" style={{ backgroundColor: '#D4D4D4' }} />

                            {/* Thèmes branches */}
                            <div className="relative w-full max-w-[700px]">
                                <div className="absolute top-0 left-[10%] right-[10%] h-px" style={{ backgroundColor: '#D4D4D4' }} />
                                <div className="grid grid-cols-5 gap-2">
                                    {[
                                        { label: 'Votre vie sociale', color: '#8B5CF6', domain: 'R' },
                                        { label: 'Votre santé', color: '#EC4899', domain: 'S' },
                                        { label: 'Parcours de soins', color: '#10B981', domain: 'M' },
                                        { label: 'Vos démarches', color: '#3B82F6', domain: 'A' },
                                        { label: 'Votre proche', color: '#F59E0B', domain: 'F' },
                                    ].map((t, i) => (
                                        <div key={i} className="flex flex-col items-center">
                                            <div className="w-px h-5" style={{ backgroundColor: '#D4D4D4' }} />
                                            <div className="rounded-[12px] px-3 py-2 text-center w-full" style={{ backgroundColor: `${t.color}10`, border: `1px solid ${t.color}30` }}>
                                                <p className="text-[10px] font-bold" style={{ color: t.color }}>{t.domain}</p>
                                                <p className="text-[11px] font-semibold mt-0.5" style={{ color: '#2D2A26' }}>{t.label}</p>
                                            </div>
                                            <div className="w-px h-4" style={{ backgroundColor: '#D4D4D4' }} />
                                            <div className="rounded-[10px] px-2 py-1.5 text-center w-full" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5EA' }}>
                                                <p className="text-[9px]" style={{ color: '#8A857E' }}>Micro-Parcours</p>
                                            </div>
                                            <div className="w-px h-3" style={{ backgroundColor: '#D4D4D4' }} />
                                            <div className="rounded-[10px] px-2 py-1.5 text-center w-full" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5EA' }}>
                                                <p className="text-[9px]" style={{ color: '#8A857E' }}>Recommandations</p>
                                            </div>
                                            <div className="w-px h-3" style={{ backgroundColor: '#D4D4D4' }} />
                                            <div className="rounded-[10px] px-2 py-1.5 text-center w-full" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5EA' }}>
                                                <p className="text-[9px]" style={{ color: '#8A857E' }}>Micro-Tâches ✓</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Convergence */}
                            <div className="w-px h-5 mt-2" style={{ backgroundColor: '#D4D4D4' }} />
                            <div className="rounded-[14px] px-5 py-2.5 text-center font-bold text-[12px]" style={{ backgroundColor: '#ECFDF5', color: '#059669', border: '1px solid #A7F3D0' }}>
                                Progression globale • Célébration • Suivi
                            </div>
                        </div>

                        {/* Audit cards */}
                        <div className="grid grid-cols-3 gap-3">
                            {[
                                { name: 'Onboarding', count: '4 slides', status: 'done' },
                                { name: 'Dashboard', count: '1 écran', status: 'done' },
                                { name: 'ThemeDetail', count: '5 thèmes', status: 'done' },
                                { name: 'ProgramDetail', count: 'template', status: 'done' },
                                { name: 'Calendrier', count: '1 écran', status: 'done' },
                                { name: 'Chat', count: '1 écran', status: 'done' },
                                { name: 'Ressources', count: '3 sous-tabs', status: 'done' },
                                { name: 'Communauté', count: 'Annuaire Pro', status: 'done' },
                                { name: 'Réglages', count: '1 écran', status: 'done' },
                                { name: 'Article Reader', count: 'template', status: 'done' },
                                { name: 'Guide Detail', count: 'template', status: 'done' },
                                { name: 'Celebration', count: 'overlay', status: 'done' },
                            ].map((page, i) => (
                                <div key={i} className="flex items-center gap-3 rounded-[14px] px-4 py-3" style={{ backgroundColor: '#FAFAF8', border: '1px solid #F0EDE8' }}>
                                    <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#10B981' }} />
                                    <div>
                                        <p className="text-[12px] font-bold" style={{ color: '#2D2A26' }}>{page.name}</p>
                                        <p className="text-[10px]" style={{ color: '#B8B3AB' }}>{page.count}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-5 rounded-[16px] px-5 py-3.5 text-center" style={{ backgroundColor: '#ECFDF5', border: '1px solid #A7F3D0' }}>
                            <p className="text-[13px] font-bold" style={{ color: '#059669' }}>
                                15 écrans fonctionnels codés • Navigation complète • Composants réutilisables
                            </p>
                        </div>
                    </div>

                </section>

                {/* ── Section divider ── */}
                <div className="my-20 flex items-center gap-6">
                    <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, #DDD5CC)' }} />
                    <div className="flex items-center gap-3 px-5 py-2.5 rounded-full" style={{ backgroundColor: '#FFFFFF', boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}>
                        <span className="text-[16px]">🎯</span>
                        <span className="text-[11px] font-bold tracking-[3px] uppercase" style={{ color: '#B8B3AB' }}>Chapitre final</span>
                    </div>
                    <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, #DDD5CC, transparent)' }} />
                </div>

                {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                   ACTE 3 — LA PREUVE
                ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
                <section id="preuve" className="scroll-mt-20">

                    <SectionTag color="#10B981">La Preuve</SectionTag>
                    <SectionTitle gradient>
                        On l'a prototypé.<br />Voyez par vous-même.
                    </SectionTitle>

                    {/* ── 3b. QR Code Démo ── */}
                    <div className="bg-white rounded-[32px] p-10 mb-10 flex flex-col items-center text-center" style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
                        <div className="flex items-center gap-2 mb-4">
                            <DeviceMobile size={24} weight="bold" color="#2D2A26" />
                            <h4 className="text-[20px] font-bold" style={{ color: '#2D2A26' }}>Essayez la démo</h4>
                        </div>
                        <p className="text-[14px] leading-relaxed mb-6 max-w-md" style={{ color: '#8A857E' }}>
                            Flashez ce QR code avec votre téléphone pour explorer le dashboard d&apos;Amal — exactement comme un aidant le verrait.
                        </p>
                        <div className="p-5 rounded-[24px] mb-5" style={{ backgroundColor: '#FAFAF8', border: '2px solid #F0EDE8' }}>
                            <QRCodeSVG
                                value="https://review-ui-ux-monka.vercel.app/demo"
                                size={220}
                                bgColor="#FAFAF8"
                                fgColor="#2D2A26"
                                level="M"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: '#10B981' }} />
                            <span className="text-[11px] font-medium" style={{ color: '#10B981' }}>En ligne — prêt à tester</span>
                        </div>
                    </div>

                    {/* ── 3b. Notre méthode de construction ── */}
                    <div className="bg-white rounded-[32px] p-8 mb-10" style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}>
                        <SectionTag color="#8B5CF6">Ce que le prototype démontre</SectionTag>
                        <h4 className="text-[20px] font-extrabold mb-6" style={{ color: '#2D2A26' }}>
                            Chaque choix de design est ancré dans le moteur.
                        </h4>
                        <div className="grid grid-cols-4 gap-3">
                            {[
                                { step: '01', title: 'Navigation', desc: '5 thèmes de vie comme points d\'entrée, pas des onglets génériques', color: '#8B5CF6', bg: '#F5F3FF' },
                                { step: '02', title: 'Profondeur', desc: '4 niveaux : Thème → Parcours → Conseil → Action', color: '#3B82F6', bg: '#EFF6FF' },
                                { step: '03', title: 'Contexte', desc: 'Criticité visible, personnalisation « Pour Francine », pourquoi affiché', color: '#10B981', bg: '#ECFDF5' },
                                { step: '04', title: 'Ton', desc: 'Wording adapté aidant vs IDEC, vocabulaire humain, zéro jargon', color: '#F59E0B', bg: '#FFFBEB' },
                            ].map((s, i) => (
                                <div key={i} className="rounded-[16px] p-4" style={{ backgroundColor: s.bg }}>
                                    <span className="text-[10px] font-bold" style={{ color: s.color }}>{s.step}</span>
                                    <h5 className="text-[14px] font-bold mt-1 mb-1" style={{ color: '#2D2A26' }}>{s.title}</h5>
                                    <p className="text-[11px] leading-relaxed" style={{ color: '#8A857E' }}>{s.desc}</p>
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center gap-3 mt-4 rounded-[14px] px-5 py-3" style={{ backgroundColor: '#FAFAF8', border: '1px solid #F0EDE8' }}>
                            <Lightbulb size={18} weight="bold" color="#F59E0B" />
                            <p className="text-[12px]" style={{ color: '#8A857E' }}>
                                <strong style={{ color: '#2D2A26' }}>Tout est manipulable</strong> dans le prototype ci-dessus — composants réels, données du moteur, interactions fonctionnelles.
                            </p>
                        </div>
                    </div>



                </section>

            </main>

            {/* ── Footer minimal ── */}
            <footer className="text-center py-8">
                <p className="text-[10px] font-bold uppercase tracking-[3px]" style={{ color: '#B8B3AB' }}>
                    Pragma · Confidentiel · Février 2026
                </p>
            </footer>

        </div>
    );
}
