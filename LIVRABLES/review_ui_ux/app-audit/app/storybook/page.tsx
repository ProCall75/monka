"use client";

import React, { useState } from 'react';
import {
    Bell, Moon, Eye, ShieldCheck, Lock, SignOut,
    Coffee, Leaf, Heart, Users as UsersIcon, Lightning,
} from '@phosphor-icons/react';

// ── Atoms ──
import { Badge } from '../components/atoms/Badge';
import { MoodButton, HappyEmoji, CalmEmoji, AngryEmoji, SadEmoji, NeutralEmoji, AnxiousEmoji } from '../components/atoms/MoodButton';
import { DotGrid } from '../components/atoms/DotGrid';
import { ReflectionInput } from '../components/atoms/ReflectionInput';
import { ScoreRing } from '../components/atoms/ScoreRing';
import { ToggleSwitch } from '../components/atoms/ToggleSwitch';
import { DangerAction } from '../components/atoms/DangerAction';
import { ThemeButton } from '../components/atoms/ThemeButton';
import type { VulnerabilityDomain } from '../data/kernel-types';

// ── Molecules ──
import { Header } from '../components/molecules/Header';
import { MoodRow } from '../components/molecules/MoodRow';
import { ProgressCard } from '../components/molecules/ProgressCard';
import { HeroCard } from '../components/molecules/HeroCard';
import { TabPills } from '../components/molecules/TabPills';
import { StatsBubbles } from '../components/molecules/StatsBubbles';
import { WeekChart } from '../components/molecules/WeekChart';
import { StatCard } from '../components/molecules/StatCard';
import { RecoCard } from '../components/molecules/RecoCard';
import { TaskCard } from '../components/molecules/TaskCard';
import { MicroTaskItem } from '../components/molecules/MicroTaskItem';
import { actionableAdvices } from '../data/actionable-advice-data';
import { SettingsRow, SettingsSection } from '../components/molecules/SettingsRow';
import { ProfileCard } from '../components/molecules/ProfileCard';
import { PageHeader } from '../components/molecules/PageHeader';
import { PricingCard, PricingSection, MONKA_PLANS } from '../components/molecules/PricingCard';
import type { Criticality } from '../data/kernel-types';

// ── Nav ──
import { BottomNavDark, BottomNavGlass } from '../components/nav/BottomNav';
import { BottomNavPill } from '../components/nav/BottomNavPill';

/* ═══════════════════════════════════════════
   STORYBOOK LAYOUT COMPONENTS
═══════════════════════════════════════════ */

const COMPONENT_GROUPS = [
    {
        id: 'kernel',
        label: '🏗️ Architecture Kernel',
        items: [
            { id: 'k-c1-herocard', label: 'C1 — Thème de vie' },
            { id: 'k-c2-taskcard', label: 'C2 — Programme' },
            { id: 'k-c3-recocard', label: 'C3 — Recommandation' },
            { id: 'k-c4-microtask', label: 'C4 — Micro-Tâche' },
        ],
    },
    {
        id: 'questionnaire',
        label: '📋 Questionnaire',
        items: [
            { id: 'mood-row', label: 'Humeur (MoodRow)' },
            { id: 'mood-button', label: 'Bouton humeur' },
            { id: 'score-ring', label: 'Score Ring' },
            { id: 'reflection-input', label: 'Saisie réflexion' },
        ],
    },
    {
        id: 'dashboard',
        label: '📊 Dashboard',
        items: [
            { id: 'hero-card', label: 'Carte thème (HeroCard)' },
            { id: 'theme-button', label: 'Bouton thème' },
            { id: 'progress-card', label: 'Progression' },
            { id: 'reco-card', label: 'Carte reco' },
            { id: 'header', label: 'Header' },
            { id: 'page-header', label: 'PageHeader' },
            { id: 'tab-pills', label: 'TabPills' },
            { id: 'stats-bubbles', label: 'StatsBubbles' },
            { id: 'week-chart', label: 'WeekChart' },
            { id: 'stat-card', label: 'StatCard' },
        ],
    },
    {
        id: 'settings',
        label: '⚙️ Réglages & Profil',
        items: [
            { id: 'profile-card', label: 'ProfileCard' },
            { id: 'settings-row', label: 'SettingsRow' },
            { id: 'toggle-switch', label: 'ToggleSwitch' },
            { id: 'danger-action', label: 'DangerAction' },
            { id: 'pricing-card', label: 'PricingCard' },
        ],
    },
    {
        id: 'ui',
        label: '🧩 Atomes UI',
        items: [
            { id: 'badge', label: 'Badge' },
            { id: 'dot-grid', label: 'DotGrid' },
        ],
    },
    {
        id: 'nav',
        label: '🧭 Navigation',
        items: [
            { id: 'bottom-nav-dark', label: 'BottomNavDark' },
            { id: 'bottom-nav-glass', label: 'BottomNavGlass' },
            { id: 'bottom-nav-pill', label: 'BottomNavPill' },
        ],
    },
];

/* ── Documented component wrapper ── */
const ComponentDoc = ({
    id,
    name,
    description,
    props,
    children,
}: {
    id: string;
    name: string;
    description: string;
    props?: { name: string; type: string; default?: string; description: string }[];
    children: React.ReactNode;
}) => (
    <section id={id} className="scroll-mt-16">
        <div className="mb-4">
            <h2 className="text-2xl font-bold text-[#1A1A1A]">{name}</h2>
            <p className="text-sm text-[#8C8C8C] mt-1 leading-relaxed">{description}</p>
        </div>

        {/* Live preview */}
        <div className="bg-[#F3EAE3] rounded-[24px] p-6 border border-[#EBE0D6]">
            {children}
        </div>

        {/* Props table */}
        {props && props.length > 0 && (
            <div className="mt-4 overflow-x-auto">
                <table className="w-full text-xs">
                    <thead>
                        <tr className="text-left border-b border-[#EBE0D6]">
                            <th className="py-2 pr-4 font-bold text-[#1A1A1A]">Prop</th>
                            <th className="py-2 pr-4 font-bold text-[#1A1A1A]">Type</th>
                            <th className="py-2 pr-4 font-bold text-[#1A1A1A]">Défaut</th>
                            <th className="py-2 font-bold text-[#1A1A1A]">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.map((p) => (
                            <tr key={p.name} className="border-b border-[#F3EAE3]">
                                <td className="py-2 pr-4 font-mono text-[#8F6B22]">{p.name}</td>
                                <td className="py-2 pr-4 text-[#8C8C8C]">{p.type}</td>
                                <td className="py-2 pr-4 text-[#8C8C8C]">{p.default || '—'}</td>
                                <td className="py-2 text-[#8C8C8C]">{p.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )}

        <div className="border-b border-[#EBE0D6] mt-10 mb-10" />
    </section>
);

/* ── Controls ── */
const ControlRow = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div className="flex items-center justify-between gap-4 py-2">
        <span className="text-xs font-bold text-[#8C8C8C] uppercase tracking-wide whitespace-nowrap">{label}</span>
        <div className="flex items-center gap-2">{children}</div>
    </div>
);

const ControlButton = ({
    active,
    onClick,
    children,
}: {
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
}) => (
    <button
        onClick={onClick}
        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${active ? 'bg-[#1A1A1A] text-white' : 'bg-white text-[#8C8C8C] border border-[#EBE0D6] hover:border-[#8C8C8C]'
            }`}
    >
        {children}
    </button>
);

/* ═══════════════════════════════════════════
   STORYBOOK PAGE
═══════════════════════════════════════════ */

export default function StorybookPage() {
    const [activeComponentId, setActiveComponentId] = useState('badge');
    const [sidebarOpen, setSidebarOpen] = useState(true);

    // ── Interactive states ──
    const [toggleState, setToggleState] = useState(false);
    const [scoreValue, setScoreValue] = useState(62);
    const [ringSize, setRingSize] = useState<'sm' | 'md' | 'lg'>('md');
    const [ringColor, setRingColor] = useState('#8F6B22');
    const [headerVariant, setHeaderVariant] = useState<'design1' | 'design2'>('design2');
    const [progressVariant, setProgressVariant] = useState<'hero' | 'compact'>('hero');
    const [heroDomain, setHeroDomain] = useState<VulnerabilityDomain>('S');
    const [activeTab, setActiveTab] = useState(0);
    const [activeNavTab, setActiveNavTab] = useState('home');
    const [inputVariant, setInputVariant] = useState<'warm' | 'cream'>('warm');
    const [darkModeDemo, setDarkModeDemo] = useState(false);
    const [dotFilled, setDotFilled] = useState(16);
    const [themeSize, setThemeSize] = useState<'sm' | 'md' | 'lg'>('md');
    const [selectedDomain, setSelectedDomain] = useState<VulnerabilityDomain>('R');
    const [themeShowLabel, setThemeShowLabel] = useState(true);

    // ── Kernel Architecture states ──
    const [kDomain, setKDomain] = useState<VulnerabilityDomain>('R');
    const [kCriticality, setKCriticality] = useState<Criticality>('ccc');
    const [kActivated, setKActivated] = useState(true);
    const [kMtCompleted, setKMtCompleted] = useState(false);

    const ringSizes = { sm: 96, md: 160, lg: 208 };

    const scrollTo = (id: string) => {
        setActiveComponentId(id);
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <div className="flex h-screen bg-[#FDF6F0] overflow-hidden" style={{ fontFamily: "'Outfit', sans-serif" }}>
            {/* ═══ SIDEBAR ═══ */}
            <aside
                className={`${sidebarOpen ? 'w-64' : 'w-0'
                    } bg-white border-r border-[#EBE0D6] flex flex-col transition-all duration-300 overflow-hidden flex-shrink-0`}
            >
                {/* Logo */}
                <div className="p-6 border-b border-[#EBE0D6]">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#1A1A1A] rounded-xl flex items-center justify-center text-white font-bold text-sm">M</div>
                        <div>
                            <h1 className="font-bold text-[#1A1A1A] text-sm">Monka Design</h1>
                            <p className="text-[10px] text-[#8C8C8C] font-medium">Storybook · v2.0</p>
                        </div>
                    </div>
                </div>

                {/* Nav groups */}
                <nav className="flex-1 overflow-y-auto py-4 no-scrollbar">
                    {COMPONENT_GROUPS.map((group) => (
                        <div key={group.id} className="mb-4">
                            <h3 className="px-6 text-[10px] font-bold text-[#8C8C8C] uppercase tracking-[0.12em] mb-2">
                                {group.label}
                            </h3>
                            {group.items.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => scrollTo(item.id)}
                                    className={`w-full text-left px-6 py-2 text-sm transition-colors ${activeComponentId === item.id
                                        ? 'bg-[#F3EAE3] text-[#1A1A1A] font-semibold border-r-2 border-[#8F6B22]'
                                        : 'text-[#8C8C8C] hover:text-[#1A1A1A] hover:bg-[#FDF6F0]'
                                        }`}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    ))}
                </nav>

                {/* Footer */}
                <div className="p-4 border-t border-[#EBE0D6]">
                    <p className="text-[10px] text-[#D4D4D4] text-center uppercase tracking-wide">
                        25 composants · Monka
                    </p>
                </div>
            </aside>

            {/* ═══ MAIN CONTENT ═══ */}
            <main className="flex-1 overflow-y-auto">
                {/* Toolbar */}
                <div className="sticky top-0 bg-white/80 backdrop-blur-xl border-b border-[#EBE0D6] px-8 py-4 flex items-center justify-between z-30">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="w-8 h-8 rounded-lg bg-[#F3EAE3] flex items-center justify-center hover:bg-[#EBE0D6] transition-colors"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2">
                                <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
                            </svg>
                        </button>
                        <h2 className="text-lg font-bold text-[#1A1A1A]">Composants</h2>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#8C8C8C]">
                        <span className="bg-[#C8E6C9] text-[#1B5E20] px-2 py-0.5 rounded-full font-bold text-[10px]">
                            LIVE
                        </span>
                        <span>25 composants</span>
                    </div>
                </div>

                {/* Content */}
                <div className="max-w-3xl mx-auto px-8 py-10">

                    {/* ═══════ ATOMS ═══════ */}

                    {/* Badge */}
                    <ComponentDoc
                        id="badge"
                        name="Badge"
                        description="Pastilles de statut avec 3 variantes sémantiques. Utilisées dans les VulnerabilityCards et PageHeaders."
                        props={[
                            { name: 'variant', type: "'critique' | 'vigilance' | 'standard'", default: "'standard'", description: 'Couleur sémantique du badge' },
                            { name: 'label', type: 'string', description: 'Texte custom (sinon texte par défaut du variant)' },
                        ]}
                    >
                        <div className="flex gap-3 flex-wrap">
                            <Badge variant="critique" />
                            <Badge variant="vigilance" />
                            <Badge variant="standard" />
                            <Badge variant="critique" label="Urgent !" />
                            <Badge variant="vigilance" label="En cours" />
                            <Badge variant="standard" label="Terminé" />
                        </div>
                    </ComponentDoc>

                    {/* MoodButton */}
                    <ComponentDoc
                        id="mood-button"
                        name="MoodButton"
                        description="Bouton émoji pour la sélection d'humeur. 6 émojis SVG originaux avec ring de sélection. Taille relative (3.5rem)."
                        props={[
                            { name: 'emoji', type: 'ReactNode', description: 'Composant SVG de l\'emoji' },
                            { name: 'color', type: 'string', description: 'Couleur de fond (pastel)' },
                            { name: 'isSelected', type: 'boolean', default: 'false', description: 'Affiche le ring de sélection' },
                            { name: 'onSelect', type: '() => void', description: 'Handler de sélection' },
                        ]}
                    >
                        <div className="space-y-4">
                            <p className="text-xs font-bold text-[#8C8C8C] uppercase tracking-wide">6 émojis — Cliquez pour sélectionner</p>
                            <div className="flex gap-3">
                                <MoodButton emoji={<HappyEmoji />} color="#FFE5A5" />
                                <MoodButton emoji={<CalmEmoji />} color="#A8C6A3" isSelected />
                                <MoodButton emoji={<AngryEmoji />} color="#EAB4A8" />
                                <MoodButton emoji={<SadEmoji />} color="#AECBEB" />
                                <MoodButton emoji={<NeutralEmoji />} color="#EAEAEA" />
                                <MoodButton emoji={<AnxiousEmoji />} color="#C7C0E4" />
                            </div>
                        </div>
                    </ComponentDoc>

                    {/* DotGrid */}
                    <ComponentDoc
                        id="dot-grid"
                        name="DotGrid"
                        description="Grille de points 5×4 visualisant la progression. Points sage-green remplis, light-green en transition, blanc avec bordure pour vides."
                        props={[
                            { name: 'filled', type: 'number', default: '12', description: 'Nombre de points remplis (0-20)' },
                            { name: 'total', type: 'number', default: '20', description: 'Nombre total de points' },
                        ]}
                    >
                        <div className="space-y-4">
                            <ControlRow label="Filled">
                                <input
                                    type="range"
                                    min={0}
                                    max={20}
                                    value={dotFilled}
                                    onChange={(e) => setDotFilled(+e.target.value)}
                                    className="w-32 accent-[#8F6B22]"
                                />
                                <span className="text-xs font-mono text-[#1A1A1A] w-6 text-right">{dotFilled}</span>
                            </ControlRow>
                            <DotGrid filled={dotFilled} />
                        </div>
                    </ComponentDoc>

                    {/* ReflectionInput */}
                    <ComponentDoc
                        id="reflection-input"
                        name="ReflectionInput"
                        description="Champ de saisie pour la réflexion quotidienne avec bouton d'envoi. Deux variantes : warm (fond chaud) et cream (fond crème)."
                        props={[
                            { name: 'variant', type: "'warm' | 'cream'", default: "'warm'", description: 'Variante de couleur' },
                            { name: 'placeholder', type: 'string', description: 'Texte placeholder' },
                        ]}
                    >
                        <div className="space-y-4">
                            <ControlRow label="Variant">
                                <ControlButton active={inputVariant === 'warm'} onClick={() => setInputVariant('warm')}>warm</ControlButton>
                                <ControlButton active={inputVariant === 'cream'} onClick={() => setInputVariant('cream')}>cream</ControlButton>
                            </ControlRow>
                            <ReflectionInput variant={inputVariant} />
                        </div>
                    </ComponentDoc>

                    {/* ScoreRing */}
                    <ComponentDoc
                        id="score-ring"
                        name="ScoreRing"
                        description="Grand anneau SVG circulaire avec score central. Taille, couleur et stroke configurables. Transition animée du fill."
                        props={[
                            { name: 'score', type: 'number', description: 'Score 0-100' },
                            { name: 'size', type: 'number', default: '192', description: 'Taille en px' },
                            { name: 'strokeWidth', type: 'number', default: '12', description: 'Épaisseur du trait' },
                            { name: 'color', type: 'string', default: "'#8F6B22'", description: 'Couleur de l\'arc' },
                            { name: 'label', type: 'string', default: "'Score actuel'", description: 'Texte sous le score' },
                        ]}
                    >
                        <div className="space-y-4">
                            <ControlRow label="Score">
                                <input
                                    type="range"
                                    min={0}
                                    max={100}
                                    value={scoreValue}
                                    onChange={(e) => setScoreValue(+e.target.value)}
                                    className="w-32 accent-[#8F6B22]"
                                />
                                <span className="text-xs font-mono text-[#1A1A1A] w-8 text-right">{scoreValue}</span>
                            </ControlRow>
                            <ControlRow label="Taille">
                                <ControlButton active={ringSize === 'sm'} onClick={() => setRingSize('sm')}>S (96)</ControlButton>
                                <ControlButton active={ringSize === 'md'} onClick={() => setRingSize('md')}>M (160)</ControlButton>
                                <ControlButton active={ringSize === 'lg'} onClick={() => setRingSize('lg')}>L (208)</ControlButton>
                            </ControlRow>
                            <ControlRow label="Couleur">
                                {['#8F6B22', '#D35D6E', '#5C6BC0', '#2E7D32', '#F9A825'].map((c) => (
                                    <button
                                        key={c}
                                        onClick={() => setRingColor(c)}
                                        className={`w-6 h-6 rounded-full border-2 transition-transform ${ringColor === c ? 'scale-125 border-[#1A1A1A]' : 'border-transparent'}`}
                                        style={{ backgroundColor: c }}
                                    />
                                ))}
                            </ControlRow>
                            <div className="flex justify-center py-4">
                                <ScoreRing score={scoreValue} size={ringSizes[ringSize]} color={ringColor} />
                            </div>
                        </div>
                    </ComponentDoc>

                    {/* ToggleSwitch */}
                    <ComponentDoc
                        id="toggle-switch"
                        name="ToggleSwitch"
                        description="Toggle ON/OFF accessible avec rôle switch. État sombre quand actif, gris quand inactif."
                        props={[
                            { name: 'checked', type: 'boolean', description: 'État du toggle' },
                            { name: 'onChange', type: '(checked: boolean) => void', description: 'Handler de changement' },
                        ]}
                    >
                        <div className="flex items-center gap-6">
                            <ToggleSwitch checked={toggleState} onChange={setToggleState} />
                            <span className="text-sm font-medium text-[#1A1A1A]">
                                {toggleState ? '✓ Activé' : '○ Désactivé'}
                            </span>
                        </div>
                    </ComponentDoc>

                    {/* DangerAction */}
                    <ComponentDoc
                        id="danger-action"
                        name="DangerAction"
                        description="Bouton rouge pour actions destructives (déconnexion, suppression). Fond #FFE5E5, texte #8F2222."
                        props={[
                            { name: 'label', type: 'string', description: 'Texte du bouton' },
                            { name: 'icon', type: 'ReactNode', description: 'Icône personnalisée' },
                            { name: 'onClick', type: '() => void', description: 'Handler de clic' },
                        ]}
                    >
                        <div className="max-w-xs">
                            <DangerAction label="Déconnexion" onClick={() => alert('Déconnecté !')} />
                        </div>
                    </ComponentDoc>

                    {/* ThemeButton */}
                    <ComponentDoc
                        id="theme-button"
                        name="ThemeButton"
                        description="Cercle thème de vie avec icône Phosphor duotone. Représente les 5 domaines de vulnérabilité (Réseau social, Administratif, Santé, Famille/Proche, Médical). 3 tailles, label optionnel, ring de sélection coloré."
                        props={[
                            { name: 'domain', type: "'R' | 'A' | 'S' | 'F' | 'M'", description: 'Domaine de vulnérabilité du kernel' },
                            { name: 'isSelected', type: 'boolean', default: 'false', description: 'Affiche le ring coloré de sélection' },
                            { name: 'showLabel', type: 'boolean', default: 'false', description: 'Affiche le label sous le cercle' },
                            { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Taille du bouton (44px / 56px / 72px)' },
                            { name: 'onClick', type: '() => void', description: 'Handler de clic' },
                        ]}
                    >
                        <div className="space-y-6">
                            {/* Controls */}
                            <ControlRow label="Taille">
                                <ControlButton active={themeSize === 'sm'} onClick={() => setThemeSize('sm')}>S (44)</ControlButton>
                                <ControlButton active={themeSize === 'md'} onClick={() => setThemeSize('md')}>M (56)</ControlButton>
                                <ControlButton active={themeSize === 'lg'} onClick={() => setThemeSize('lg')}>L (72)</ControlButton>
                            </ControlRow>
                            <ControlRow label="Label">
                                <ControlButton active={themeShowLabel} onClick={() => setThemeShowLabel(true)}>Visible</ControlButton>
                                <ControlButton active={!themeShowLabel} onClick={() => setThemeShowLabel(false)}>Masqué</ControlButton>
                            </ControlRow>

                            {/* All 5 domains */}
                            <div>
                                <p className="text-xs font-bold text-[#8C8C8C] uppercase tracking-wide mb-3">5 domaines — Cliquez pour sélectionner</p>
                                <div className="flex gap-4 items-end">
                                    {(['R', 'A', 'S', 'F', 'M'] as VulnerabilityDomain[]).map((d) => (
                                        <ThemeButton
                                            key={d}
                                            domain={d}
                                            size={themeSize}
                                            showLabel={themeShowLabel}
                                            isSelected={selectedDomain === d}
                                            onClick={() => setSelectedDomain(d)}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Composition: ThemeButton + ScoreRing */}
                            <div>
                                <p className="text-xs font-bold text-[#8C8C8C] uppercase tracking-wide mb-3">Composition — Cercle thème + anneau de progression</p>
                                <div className="flex gap-6 items-center">
                                    {(['R', 'S', 'M'] as VulnerabilityDomain[]).map((d, i) => {
                                        const scores = [72, 45, 88];
                                        const colors = ['#8B5CF6', '#EF4444', '#10B981'];
                                        return (
                                            <div key={d} className="flex flex-col items-center gap-2">
                                                <div className="relative">
                                                    <ScoreRing score={scores[i]} size={64} color={colors[i]} showLabel={false} />
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <ThemeButton domain={d} size="sm" />
                                                    </div>
                                                </div>
                                                <span className="text-[10px] font-semibold text-[#8A857E]">
                                                    {d === 'R' ? 'Réseau' : d === 'S' ? 'Santé' : 'Médical'}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </ComponentDoc>

                    {/* ═══════ MOLECULES ═══════ */}

                    {/* Header */}
                    < ComponentDoc
                        id="header"
                        name="Header"
                        description="En-tête de page d'accueil avec salutation personnalisée. 2 variantes : design1 (avatar inline) et design2 (bell + avatar empilé)."
                        props={[
                            { name: 'name', type: 'string', description: "Prénom de l'utilisateur" },
                            { name: 'variant', type: "'design1' | 'design2'", default: "'design2'", description: 'Variante de disposition' },
                            { name: 'notificationCount', type: 'number', description: 'Nombre de notifications (design2)' },
                            { name: 'subtitle', type: 'string', description: 'Sous-titre (design1)' },
                        ]}
                    >
                        <div className="space-y-4">
                            <ControlRow label="Variant">
                                <ControlButton active={headerVariant === 'design1'} onClick={() => setHeaderVariant('design1')}>design1</ControlButton>
                                <ControlButton active={headerVariant === 'design2'} onClick={() => setHeaderVariant('design2')}>design2</ControlButton>
                            </ControlRow>
                            <div className="bg-[#FDF6F0] rounded-[24px] p-6">
                                <Header name="Marie" variant={headerVariant} notificationCount={3} subtitle="Résumé quotidien" />
                            </div>
                        </div>
                    </ComponentDoc>

                    {/* MoodRow */}
                    <ComponentDoc
                        id="mood-row"
                        name="MoodRow"
                        description="Barre d'humeur composée avec titre, 6 MoodButtons, et sélection interactive."
                        props={[]}
                    >
                        <MoodRow />
                    </ComponentDoc>

                    {/* ProgressCard */}
                    <ComponentDoc
                        id="progress-card"
                        name="ProgressCard"
                        description="Carte de progression avec grand pourcentage + grille de points. 2 tailles : hero (64px) et compact (48px)."
                        props={[
                            { name: 'percentage', type: 'number', description: 'Pourcentage 0-100' },
                            { name: 'variant', type: "'hero' | 'compact'", default: "'hero'", description: 'Taille de la carte' },
                            { name: 'label', type: 'string', description: 'Texte de description' },
                        ]}
                    >
                        <div className="space-y-4">
                            <ControlRow label="Variant">
                                <ControlButton active={progressVariant === 'hero'} onClick={() => setProgressVariant('hero')}>hero</ControlButton>
                                <ControlButton active={progressVariant === 'compact'} onClick={() => setProgressVariant('compact')}>compact</ControlButton>
                            </ControlRow>
                            <ProgressCard percentage={89} variant={progressVariant} />
                        </div>
                    </ComponentDoc>

                    {/* HeroCard — Carte thème de vie (le vrai composant du dashboard) */}
                    <ComponentDoc
                        id="hero-card"
                        name="HeroCard"
                        description="La carte thème de vie utilisée sur le dashboard. Chaque domaine de vulnérabilité (Santé, Social, Famille, Administratif, Médical) est représenté par une carte avec couleur, tag, titre, description courte, cible et nombre d'actions."
                        props={[
                            { name: 'domain', type: 'VulnerabilityDomain', description: 'Domaine : R (Social), A (Administratif), S (Santé), F (Famille), M (Médical)' },
                            { name: 'title', type: 'string', description: 'Titre du thème de vie' },
                            { name: 'subtitle', type: 'string', description: 'Description courte' },
                            { name: 'targetPerson', type: 'string', description: 'Pour qui (ex: Francine, Vous)' },
                            { name: 'taskCount', type: 'number', description: 'Nombre d\'actions dans ce thème' },
                        ]}
                    >
                        <div className="space-y-4">
                            <ControlRow label="Domaine">
                                {(['S', 'R', 'F', 'A', 'M'] as VulnerabilityDomain[]).map(d => (
                                    <ControlButton key={d} active={heroDomain === d} onClick={() => setHeroDomain(d)}>
                                        {d}
                                    </ControlButton>
                                ))}
                            </ControlRow>
                            <HeroCard
                                domain={heroDomain}
                                title={{
                                    S: 'Prendre soin de vous',
                                    R: 'Votre vie sociale',
                                    F: 'Vie familiale & proche',
                                    A: 'Vos démarches',
                                    M: 'Parcours de soins',
                                }[heroDomain]}
                                subtitle={{
                                    S: 'Votre santé physique et mentale face à la charge quotidienne.',
                                    R: 'Maintenir le lien social malgré la charge d\'aidant.',
                                    F: 'Équilibre familial et relation avec votre proche.',
                                    A: 'Démarches administratives, droits et aides.',
                                    M: 'Suivi médical et coordination des soins.',
                                }[heroDomain]}
                                targetPerson={heroDomain === 'S' ? 'Vous' : 'Francine'}
                                taskCount={{ S: 15, R: 8, F: 12, A: 6, M: 9 }[heroDomain]}
                            />
                        </div>
                    </ComponentDoc>

                    {/* TabPills */}
                    <ComponentDoc
                        id="tab-pills"
                        name="TabPills"
                        description="Onglets en forme de pilules. Onglet actif = dark, inactif = blanc avec hover."
                        props={[
                            { name: 'tabs', type: 'string[]', description: 'Labels des onglets' },
                            { name: 'activeIndex', type: 'number', description: 'Index actif' },
                            { name: 'onTabChange', type: '(index: number) => void', description: 'Handler de changement' },
                        ]}
                    >
                        <TabPills
                            tabs={['Mes Aides', 'Contacts', 'Questionnaire', 'Historique']}
                            activeIndex={activeTab}
                            onTabChange={setActiveTab}
                        />
                    </ComponentDoc>

                    {/* StatsBubbles */}
                    <ComponentDoc
                        id="stats-bubbles"
                        name="StatsBubbles"
                        description="Graphique en bulles d'émotions. 5 bulles positionnées avec labels et tailles différentes. Gratitude pulse."
                        props={[]}
                    >
                        <StatsBubbles />
                    </ComponentDoc>

                    {/* WeekChart */}
                    <ComponentDoc
                        id="week-chart"
                        name="WeekChart"
                        description="Diagramme en barres 7 jours avec sélecteur de période. Barre active en couleur accent, inactives en pastel."
                        props={[
                            { name: 'data', type: '{ day: string; value: number }[]', description: 'Données des 7 jours' },
                            { name: 'activeDay', type: 'number', default: '3', description: 'Index du jour actif' },
                            { name: 'accentColor', type: 'string', default: "'#8F6B22'", description: 'Couleur barre active' },
                            { name: 'barColor', type: 'string', default: "'#FAE0A8'", description: 'Couleur barres inactives' },
                        ]}
                    >
                        <WeekChart />
                    </ComponentDoc>

                    {/* StatCard */}
                    <ComponentDoc
                        id="stat-card"
                        name="StatCard"
                        description="Carte métrique avec icône Phosphor, valeur, et indicateur de tendance (↑ vert, ↓ rouge, = gold). Utilisée en grille 2 colonnes."
                        props={[
                            { name: 'icon', type: 'ReactNode', description: 'Icône Phosphor' },
                            { name: 'title', type: 'string', description: 'Label de la métrique' },
                            { name: 'value', type: 'string', description: 'Valeur affichée' },
                            { name: 'trend', type: "'up' | 'down' | 'stable'", description: 'Direction de la tendance' },
                            { name: 'trendValue', type: 'string', description: 'Texte de la tendance' },
                        ]}
                    >
                        <div className="grid grid-cols-2 gap-4">
                            <StatCard icon={<UsersIcon size={24} weight="bold" />} title="Interactions" value="12/sem" trend="up" trendValue="+15%" />
                            <StatCard icon={<Heart size={24} weight="bold" />} title="Qualité" value="Bonne" trend="stable" trendValue="Stable" />
                            <StatCard icon={<Lightning size={24} weight="bold" />} title="Activité" value="87%" trend="up" trendValue="+8%" />
                            <StatCard title="Stress" value="Faible" trend="down" trendValue="-12%" />
                        </div>
                    </ComponentDoc>

                    {/* RecoCard */}
                    <ComponentDoc
                        id="reco-card"
                        name="RecoCard"
                        description="Carte de recommandation simplifiée. Bord gauche = couleur du domaine. Affiche badge d'urgence, label thème, titre, et chevron. Pas de jauge — l'ASR vit au niveau du MP (TaskCard)."
                        props={[
                            { name: 'title', type: 'string', description: 'Titre de la recommandation' },
                            { name: 'domain', type: "'R'|'A'|'S'|'F'|'M'", description: 'Domaine de vulnérabilité — détermine la couleur' },
                            { name: 'urgency', type: "'critical'|'ccc'|'standard'|'prevention'", description: 'Niveau de criticité — badge affiché' },
                            { name: 'onClick', type: '() => void', description: 'Navigation vers le détail' },
                        ]}
                    >
                        <div className="space-y-3">
                            <p className="text-xs font-bold text-[#8C8C8C] uppercase tracking-wide mb-2">Vie sociale — Urgent</p>
                            <RecoCard title="Se faire accompagner" domain="R" urgency="critical" />
                            <p className="text-xs font-bold text-[#8C8C8C] uppercase tracking-wide mb-2 mt-4">Démarches — Important</p>
                            <RecoCard title="Faire la demande d'APA" domain="A" urgency="ccc" />
                            <p className="text-xs font-bold text-[#8C8C8C] uppercase tracking-wide mb-2 mt-4">Santé — Standard</p>
                            <RecoCard title="Faire le point avec votre médecin" domain="S" urgency="standard" />
                            <p className="text-xs font-bold text-[#8C8C8C] uppercase tracking-wide mb-2 mt-4">Proche — Prévention</p>
                            <RecoCard title="Trouver un médecin référent" domain="F" urgency="prevention" />
                        </div>
                    </ComponentDoc>

                    {/* SettingsRow */}
                    <ComponentDoc
                        id="settings-row"
                        name="SettingsRow"
                        description="Ligne de paramètre avec icône dans carré coloré, label, et 3 types d'action : chevron (navigation), toggle (switch), label (texte)."
                        props={[
                            { name: 'icon', type: 'ReactNode', description: 'Icône Phosphor' },
                            { name: 'iconBg', type: 'string', description: 'Couleur fond icône' },
                            { name: 'label', type: 'string', description: 'Label de la ligne' },
                            { name: 'action', type: "'chevron' | 'toggle' | 'label'", default: "'chevron'", description: 'Type d\'action' },
                            { name: 'checked', type: 'boolean', description: 'État toggle (si action=toggle)' },
                            { name: 'actionLabel', type: 'string', description: 'Texte (si action=label)' },
                        ]}
                    >
                        <SettingsSection title="Préférences">
                            <SettingsRow
                                icon={<Bell size={22} weight="bold" className="text-[#3C4A6B]" />}
                                iconBg="#E4E9F4"
                                label="Notifications"
                                action="chevron"
                                isFirst
                            />
                            <SettingsRow
                                icon={<Moon size={22} weight="bold" className="text-[#8F6B22]" />}
                                iconBg="#FDF3D8"
                                label="Mode Sombre"
                                action="toggle"
                                checked={darkModeDemo}
                                onCheckedChange={setDarkModeDemo}
                            />
                            <SettingsRow
                                icon={<Eye size={22} weight="bold" className="text-[#165C38]" />}
                                iconBg="#E0F5E9"
                                label="Accessibilité"
                                action="label"
                                actionLabel="Standard"
                                isLast
                            />
                        </SettingsSection>
                    </ComponentDoc>

                    {/* ProfileCard */}
                    <ComponentDoc
                        id="profile-card"
                        name="ProfileCard"
                        description="Carte profil utilisateur avec avatar (fallback via ui-avatars.com), badge edit, nom et email."
                        props={[
                            { name: 'name', type: 'string', description: 'Nom complet' },
                            { name: 'email', type: 'string', description: 'Email' },
                            { name: 'avatarUrl', type: 'string', description: 'URL avatar (optionnel)' },
                        ]}
                    >
                        <div className="max-w-sm">
                            <ProfileCard name="Marie Dupont" email="marie.d@email.com" />
                        </div>
                    </ComponentDoc>

                    {/* PageHeader */}
                    <ComponentDoc
                        id="page-header"
                        name="PageHeader"
                        description="En-tête de page détail avec bouton retour, badge central, et bouton action (share). Fond transparent."
                        props={[
                            { name: 'badge', type: 'ReactNode', description: 'Contenu central (badge, titre...)' },
                            { name: 'onBack', type: '() => void', description: 'Handler retour' },
                            { name: 'onAction', type: '() => void', description: 'Handler action' },
                            { name: 'actionIcon', type: 'ReactNode', description: 'Icône action custom' },
                        ]}
                    >
                        <div className="bg-[#FFEAC2] rounded-[24px] overflow-hidden">
                            <PageHeader badge={<Badge variant="vigilance" />} />
                        </div>
                    </ComponentDoc>

                    {/* PricingCard */}
                    <ComponentDoc
                        id="pricing-card"
                        name="PricingCard"
                        description="Carte de pricing pour les offres Monka. Variante standard (fond blanc) et populaire (fond dark #1A1A2E). Aligné sur les packs de la landing page."
                        props={[
                            { name: 'plan', type: 'PricingPlan', description: 'Objet plan complet' },
                            { name: 'plan.name', type: 'string', description: 'Nom du pack (Découverte, Essentiel, Sérénité)' },
                            { name: 'plan.price', type: 'string', description: 'Prix affiché (0€, 6,99€…)' },
                            { name: 'plan.period', type: 'string', description: 'Période (mois)' },
                            { name: 'plan.subtitle', type: 'string', description: 'Ligne de description sous le prix' },
                            { name: 'plan.features', type: 'string[]', description: 'Liste des features incluses' },
                            { name: 'plan.popular', type: 'boolean', default: 'false', description: 'Variante dark avec pill "Populaire"' },
                            { name: 'plan.cta', type: 'string', description: 'Label du bouton CTA' },
                        ]}
                    >
                        <div className="space-y-6">
                            {/* Full Section — 3 cards */}
                            <div>
                                <p className="text-xs font-bold text-[#8C8C8C] uppercase tracking-wide mb-3">3 packs — Section complète</p>
                                <PricingSection />
                            </div>

                            {/* Single card — popular */}
                            <div>
                                <p className="text-xs font-bold text-[#8C8C8C] uppercase tracking-wide mb-3">Carte isolée — Popular</p>
                                <div className="max-w-[200px]">
                                    <PricingCard plan={MONKA_PLANS[1]} />
                                </div>
                            </div>
                        </div>
                    </ComponentDoc>

                    {/* ═══════ NAVIGATION ═══════ */}

                    {/* BottomNavDark */}
                    <ComponentDoc
                        id="bottom-nav-dark"
                        name="BottomNavDark"
                        description="Barre de navigation flottante sombre. Fond #1A1A1A, rounded-[32px], 4 icônes SVG. Active = blanc, inactive = gris."
                        props={[]}
                    >
                        <div className="relative rounded-[24px] overflow-hidden bg-[#F3EAE3]" style={{ height: '120px' }}>
                            <BottomNavDark />
                        </div>
                    </ComponentDoc>

                    {/* BottomNavGlass */}
                    <ComponentDoc
                        id="bottom-nav-glass"
                        name="BottomNavGlass"
                        description="Barre de navigation en verre avec gradient de fondu. Fond blanc/blur, active = button dark avec shadow."
                        props={[]}
                    >
                        <div className="relative rounded-[24px] overflow-hidden bg-[#FDF6F0]" style={{ height: '140px' }}>
                            <BottomNavGlass />
                        </div>
                    </ComponentDoc>

                    {/* BottomNavPill */}
                    <ComponentDoc
                        id="bottom-nav-pill"
                        name="BottomNavPill"
                        description="Nav pill 5 onglets avec icônes Phosphor. Glass blur, notification dot, active = dark circle. Réplique exacte de react-app-3/4."
                        props={[
                            { name: 'activeTab', type: 'string', default: "'home'", description: 'ID de l\'onglet actif' },
                            { name: 'onTabChange', type: '(tab: string) => void', description: 'Handler de changement' },
                        ]}
                    >
                        <div className="space-y-4">
                            <ControlRow label="Tab active">
                                {['home', 'clipboard', 'chat', 'community', 'settings'].map((t) => (
                                    <ControlButton key={t} active={activeNavTab === t} onClick={() => setActiveNavTab(t)}>{t}</ControlButton>
                                ))}
                            </ControlRow>
                            <div className="relative rounded-[24px] overflow-hidden bg-[#F3EAE3]" style={{ height: '100px' }}>
                                <BottomNavPill activeTab={activeNavTab} onTabChange={setActiveNavTab} />
                            </div>
                        </div>
                    </ComponentDoc>

                    {/* ═══════════════════════════════════════════
                       🏗️ ARCHITECTURE KERNEL — 4 Couches
                    ═══════════════════════════════════════════ */}

                    {/* ── C1 — Thème de vie (HeroCard) ── */}
                    <ComponentDoc
                        id="k-c1-herocard"
                        name="C1 — Thème de vie (HeroCard)"
                        description="Couche 1 du kernel. Chaque vulnérabilité = un thème de vie. Sa jauge affiche le nombre de micro-parcours actifs / total (pas le nombre d'actions)."
                        props={[
                            { name: 'domain', type: 'VulnerabilityDomain', description: 'R | A | S | F | M' },
                            { name: 'title', type: 'string', description: 'Titre du thème' },
                            { name: 'subtitle', type: 'string', description: 'Description courte' },
                            { name: 'activeMP', type: 'number', description: '🆕 Nb de MP actifs' },
                            { name: 'totalMP', type: 'number', description: '🆕 Nb total de MP' },
                            { name: 'taskCount', type: 'number', description: 'Ancien: nb d\'actions (rétrocompat)' },
                        ]}
                    >
                        <div className="space-y-4">
                            <ControlRow label="Domaine">
                                {(['R', 'S', 'F', 'A', 'M'] as VulnerabilityDomain[]).map(d => (
                                    <ControlButton key={d} active={kDomain === d} onClick={() => setKDomain(d)}>{d}</ControlButton>
                                ))}
                            </ControlRow>
                            <p className="text-[10px] font-bold text-[#8C8C8C] uppercase tracking-wide">Avec jauge MP (nouveau) :</p>
                            <HeroCard
                                domain={kDomain}
                                title={{
                                    R: 'Votre vie sociale',
                                    S: 'Prendre soin de vous',
                                    F: 'Vie familiale & proche',
                                    A: 'Vos démarches',
                                    M: 'Parcours de soins',
                                }[kDomain]}
                                subtitle={{
                                    R: 'Maintenir le lien social malgré la charge.',
                                    S: 'Votre santé physique et mentale.',
                                    F: 'Équilibre familial et relation avec votre proche.',
                                    A: 'Démarches administratives, droits et aides.',
                                    M: 'Suivi médical et coordination des soins.',
                                }[kDomain]}
                                targetPerson={kDomain === 'S' ? 'Vous' : 'Francine'}
                                activeMP={{ R: 2, S: 1, F: 2, A: 1, M: 1 }[kDomain]}
                                totalMP={{ R: 4, S: 4, F: 6, A: 4, M: 6 }[kDomain]}
                            />
                            <p className="text-[10px] font-bold text-[#8C8C8C] uppercase tracking-wide mt-4">Ancien (taskCount, rétrocompat) :</p>
                            <HeroCard
                                domain={kDomain}
                                title={{
                                    R: 'Votre vie sociale',
                                    S: 'Prendre soin de vous',
                                    F: 'Vie familiale & proche',
                                    A: 'Vos démarches',
                                    M: 'Parcours de soins',
                                }[kDomain]}
                                taskCount={{ R: 8, S: 15, F: 12, A: 6, M: 9 }[kDomain]}
                            />
                        </div>
                    </ComponentDoc>

                    {/* ── C2 — Programme (TaskCard) ── */}
                    <ComponentDoc
                        id="k-c2-taskcard"
                        name="C2 — Programme (TaskCard)"
                        description="Couche 2 du kernel. Chaque micro-parcours = un programme. Sa jauge affiche le nombre de MT contributives (asrDone/asrTotal) + la barre ASR. Variante prévention : MP non activé = grisé, non cliquable, 'Objectif atteint — parcours sécurisé'."
                        props={[
                            { name: 'criticality', type: 'Criticality', description: 'critical | ccc | standard | prevention' },
                            { name: 'recoCount', type: 'number', description: '🆕 Nb de recos actives' },
                            { name: 'recoTotal', type: 'number', description: '🆕 Nb total de recos' },
                            { name: 'asrProgress', type: 'number', description: '🆕 Progression ASR (0-100)' },
                            { name: 'isActivated', type: 'boolean', default: 'true', description: '🆕 false = variante prévention' },
                        ]}
                    >
                        <div className="space-y-4">
                            <ControlRow label="Criticité">
                                {(['critical', 'ccc', 'standard'] as Criticality[]).map(c => (
                                    <ControlButton key={c} active={kCriticality === c} onClick={() => setKCriticality(c)}>
                                        {c === 'critical' ? '🔴' : c === 'ccc' ? '🟠' : '🟢'} {c}
                                    </ControlButton>
                                ))}
                            </ControlRow>
                            <ControlRow label="Domaine">
                                {(['R', 'S', 'F', 'A', 'M'] as VulnerabilityDomain[]).map(d => (
                                    <ControlButton key={d} active={kDomain === d} onClick={() => setKDomain(d)}>{d}</ControlButton>
                                ))}
                            </ControlRow>
                            <ControlRow label="État">
                                <ControlButton active={kActivated} onClick={() => setKActivated(true)}>Activé</ControlButton>
                                <ControlButton active={!kActivated} onClick={() => setKActivated(false)}>Prévention ⚪</ControlButton>
                            </ControlRow>

                            <p className="text-[10px] font-bold text-[#8C8C8C] uppercase tracking-wide">Carte programme {kActivated ? '(activé)' : '(prévention)'} :</p>
                            <TaskCard
                                title={kActivated ? 'Retrouver du répit' : 'Anticiper les démarches futures'}
                                description={kActivated ? 'Des pistes concrètes pour souffler un peu au quotidien.' : 'Se préparer à d\'éventuelles évolutions.'}
                                criticality={kActivated ? kCriticality : 'prevention'}
                                domain={kDomain}
                                asrDone={kActivated ? 1 : undefined}
                                asrTotal={kActivated ? 3 : undefined}
                                asrProgress={kActivated ? 33 : undefined}
                                isActivated={kActivated}
                            />

                            <p className="text-[10px] font-bold text-[#8C8C8C] uppercase tracking-wide mt-4">Comparaison activé vs prévention :</p>
                            <div className="space-y-3">
                                <TaskCard
                                    title="Retrouver du répit"
                                    description="Des pistes concrètes pour souffler un peu."
                                    criticality="ccc"
                                    domain={kDomain}
                                    asrDone={1}
                                    asrTotal={3}
                                    asrProgress={33}
                                    isActivated={true}
                                />
                                <TaskCard
                                    title="Anticiper les démarches futures"
                                    description="Se préparer à d'éventuelles évolutions."
                                    criticality="prevention"
                                    domain={kDomain}
                                    isActivated={false}
                                />
                            </div>
                        </div>
                    </ComponentDoc>

                    <ComponentDoc
                        id="k-c3-recocard"
                        name="C3 — Recommandation (RecoCard)"
                        description="Couche 3 du kernel. Pas de jauge — l'ASR vit au niveau du MP (C2). La RecoCard est un conteneur simple : badge de criticité + titre + chevron. Au clic, elle déplie la liste des MT triées (contributives d'abord)."
                        props={[
                            { name: 'title', type: 'string', description: 'Titre de la recommandation' },
                            { name: 'domain', type: 'VulnerabilityDomain', description: 'Domaine — couleur du bord gauche' },
                            { name: 'urgency', type: 'Criticality', description: 'critical | ccc | standard | prevention' },
                            { name: 'onClick', type: '() => void', description: 'Déplie / navigue' },
                        ]}
                    >
                        <div className="space-y-4">
                            <ControlRow label="Criticité">
                                {(['critical', 'ccc', 'standard', 'prevention'] as Criticality[]).map(c => (
                                    <ControlButton key={c} active={kCriticality === c} onClick={() => setKCriticality(c)}>
                                        {c === 'critical' ? '🔴' : c === 'ccc' ? '🟠' : c === 'standard' ? '🟢' : '⚪'} {c}
                                    </ControlButton>
                                ))}
                            </ControlRow>

                            <p className="text-[10px] font-bold text-[#8C8C8C] uppercase tracking-wide">Badge + titre + chevron (pas de jauge) :</p>
                            <RecoCard
                                title="Se faire accompagner"
                                domain={kDomain}
                                urgency={kCriticality}
                            />

                            <p className="text-[10px] font-bold text-[#8C8C8C] uppercase tracking-wide mt-4">Toutes les criticités :</p>
                            <div className="space-y-3">
                                <RecoCard title="Faire le point avec votre médecin" domain={kDomain} urgency="critical" />
                                <RecoCard title="Se faire accompagner" domain={kDomain} urgency="ccc" />
                                <RecoCard title="Aménager votre temps" domain={kDomain} urgency="standard" />
                                <RecoCard title="Anticiper les démarches" domain={kDomain} urgency="prevention" />
                            </div>
                        </div>
                    </ComponentDoc>

                    <ComponentDoc
                        id="k-c4-microtask"
                        name="C4 — Micro-Tâche (MicroTaskItem)"
                        description="Couche 4 du kernel. Action concrète. Deux catégories : 📍 'Pour sécuriser votre situation' (contributive = remplit la jauge ASR du MP parent) et 🌿 'Pour votre bien-être' (non-contributive = info utile, ne bloque pas l'ASR). Couleurs légèrement distinctes."
                        props={[
                            { name: 'task.isContributive', type: 'boolean', description: 'true = 📍 sécurisation (STRUC/SEC/MED), false = 🌿 bien-être (INFO/ORGA)' },
                            { name: 'task.isCompleted', type: 'boolean', description: 'Checkbox état' },
                            { name: 'task.type', type: 'MicroTaskType', description: 'STRUC | SEC | MED | INFO | ORGA' },
                        ]}
                    >
                        <div className="space-y-4">
                            <ControlRow label="État checkbox">
                                <ControlButton active={!kMtCompleted} onClick={() => setKMtCompleted(false)}>À faire</ControlButton>
                                <ControlButton active={kMtCompleted} onClick={() => setKMtCompleted(true)}>Fait ✅</ControlButton>
                            </ControlRow>

                            <p className="text-[10px] font-bold text-[#8C8C8C] uppercase tracking-wide">📍 Pour sécuriser votre situation (contributive → remplit ASR) :</p>
                            <MicroTaskItem
                                task={{
                                    id: 'demo-1',
                                    text: 'Contacter l\'assistante sociale de votre secteur',
                                    type: 'SEC',
                                    isContributive: true,
                                    isCompleted: kMtCompleted,
                                    actor: 'Aidant',
                                }}
                                onToggle={() => setKMtCompleted(p => !p)}
                            />

                            <p className="text-[10px] font-bold text-[#8C8C8C] uppercase tracking-wide mt-4">🌿 Pour votre bien-être (non-contributive → info utile) :</p>
                            <MicroTaskItem
                                task={{
                                    id: 'demo-2',
                                    text: 'Se renseigner sur les aides disponibles près de chez vous',
                                    type: 'INFO',
                                    isContributive: false,
                                    isCompleted: false,
                                    actor: 'Aidant',
                                }}
                            />

                            <p className="text-[10px] font-bold text-[#8C8C8C] uppercase tracking-wide mt-4">Tous les états :</p>
                            <div className="space-y-2">
                                <MicroTaskItem task={{ id: 'd3', text: 'Préparer les documents pour votre dossier', type: 'STRUC', isContributive: true, isCompleted: false }} />
                                <MicroTaskItem task={{ id: 'd4', text: 'Contacter l\'AS de votre secteur', type: 'SEC', isContributive: true, isCompleted: true }} />
                                <MicroTaskItem task={{ id: 'd5', text: 'Découvrir le congé de proche aidant', type: 'INFO', isContributive: false, isCompleted: false }} />
                                <MicroTaskItem task={{ id: 'd6', text: 'Repérer les signaux quand vous avez besoin de souffler', type: 'ORGA', isContributive: false, isCompleted: true }} />
                            </div>

                            <p className="text-[10px] font-bold text-[#8C8C8C] uppercase tracking-wide mt-6">📋 Avec guide intégré (cliquez &quot;Voir le guide&quot; pour déplier) :</p>
                            <MicroTaskItem
                                task={{
                                    id: 'demo-guide',
                                    text: "Demander l'APA pour votre proche",
                                    type: 'STRUC',
                                    isContributive: true,
                                    isCompleted: false,
                                    actor: 'Aidant',
                                }}
                                guidedAction={actionableAdvices[0]}
                            />
                        </div>
                    </ComponentDoc>

                    {/* ── End ── */}
                    <div className="text-center py-16">
                        <p className="text-sm text-[#8C8C8C]">Fin du storybook</p>
                        <p className="text-[10px] text-[#D4D4D4] mt-2 uppercase tracking-[0.15em]">Monka Design System · v2.0 · 28 composants</p>
                    </div>
                </div>
            </main >
        </div >
    );
}
