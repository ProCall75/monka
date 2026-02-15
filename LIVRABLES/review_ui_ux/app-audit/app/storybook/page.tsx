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

// ── Molecules ──
import { Header } from '../components/molecules/Header';
import { MoodRow } from '../components/molecules/MoodRow';
import { ProgressCard } from '../components/molecules/ProgressCard';
import { VulnerabilityCard } from '../components/molecules/VulnerabilityCard';
import { TabPills } from '../components/molecules/TabPills';
import { StatsBubbles } from '../components/molecules/StatsBubbles';
import { WeekChart } from '../components/molecules/WeekChart';
import { StatCard } from '../components/molecules/StatCard';
import { RecoCard } from '../components/molecules/RecoCard';
import { SettingsRow, SettingsSection } from '../components/molecules/SettingsRow';
import { ProfileCard } from '../components/molecules/ProfileCard';
import { PageHeader } from '../components/molecules/PageHeader';

// ── Nav ──
import { BottomNavDark, BottomNavGlass } from '../components/nav/BottomNav';
import { BottomNavPill } from '../components/nav/BottomNavPill';

/* ═══════════════════════════════════════════
   STORYBOOK LAYOUT COMPONENTS
═══════════════════════════════════════════ */

const COMPONENT_GROUPS = [
    {
        id: 'atoms',
        label: 'Atomes',
        items: [
            { id: 'badge', label: 'Badge' },
            { id: 'mood-button', label: 'MoodButton' },
            { id: 'dot-grid', label: 'DotGrid' },
            { id: 'reflection-input', label: 'ReflectionInput' },
            { id: 'score-ring', label: 'ScoreRing' },
            { id: 'toggle-switch', label: 'ToggleSwitch' },
            { id: 'danger-action', label: 'DangerAction' },
        ],
    },
    {
        id: 'molecules',
        label: 'Molécules',
        items: [
            { id: 'header', label: 'Header' },
            { id: 'mood-row', label: 'MoodRow' },
            { id: 'progress-card', label: 'ProgressCard' },
            { id: 'vulnerability-card', label: 'VulnerabilityCard' },
            { id: 'tab-pills', label: 'TabPills' },
            { id: 'stats-bubbles', label: 'StatsBubbles' },
            { id: 'week-chart', label: 'WeekChart' },
            { id: 'stat-card', label: 'StatCard' },
            { id: 'reco-card', label: 'RecoCard' },
            { id: 'settings-row', label: 'SettingsRow' },
            { id: 'profile-card', label: 'ProfileCard' },
            { id: 'page-header', label: 'PageHeader' },
        ],
    },
    {
        id: 'nav',
        label: 'Navigation',
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
    const [vulnVariant, setVulnVariant] = useState<'design1' | 'design2'>('design2');
    const [vulnScheme, setVulnScheme] = useState<string>('critique');
    const [activeTab, setActiveTab] = useState(0);
    const [activeNavTab, setActiveNavTab] = useState('home');
    const [inputVariant, setInputVariant] = useState<'warm' | 'cream'>('warm');
    const [darkModeDemo, setDarkModeDemo] = useState(false);
    const [dotFilled, setDotFilled] = useState(16);

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
                        24 composants · Monka
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
                        <span>24 composants</span>
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

                    {/* ═══════ MOLECULES ═══════ */}

                    {/* Header */}
                    <ComponentDoc
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

                    {/* VulnerabilityCard */}
                    <ComponentDoc
                        id="vulnerability-card"
                        name="VulnerabilityCard"
                        description="Carte de vulnérabilité richement stylisée. 6 schémas couleur × 2 layouts = 12 combinaisons. Design1 : large + blobs + score. Design2 : compact + progress bar."
                        props={[
                            { name: 'title', type: 'string', description: 'Nom du thème' },
                            { name: 'description', type: 'string', description: 'Description courte' },
                            { name: 'score', type: 'number', description: 'Score 0-100' },
                            { name: 'scheme', type: 'string', description: 'Schéma couleur (critique, vigilance, standard, vigilance-blue, critique-salmon, standard-mint)' },
                            { name: 'variant', type: "'design1' | 'design2'", description: 'Layout' },
                        ]}
                    >
                        <div className="space-y-4">
                            <ControlRow label="Layout">
                                <ControlButton active={vulnVariant === 'design2'} onClick={() => setVulnVariant('design2')}>Compact</ControlButton>
                                <ControlButton active={vulnVariant === 'design1'} onClick={() => setVulnVariant('design1')}>Large</ControlButton>
                            </ControlRow>
                            <ControlRow label="Couleur">
                                {['critique', 'vigilance', 'standard', 'vigilance-blue', 'critique-salmon', 'standard-mint'].map((s) => (
                                    <ControlButton key={s} active={vulnScheme === s} onClick={() => setVulnScheme(s)}>
                                        {s.split('-')[0]}
                                    </ControlButton>
                                ))}
                            </ControlRow>
                            <VulnerabilityCard
                                title="Santé de l'aidant"
                                description="Votre santé physique et mentale face à la charge quotidienne."
                                score={scoreValue}
                                scheme={vulnScheme}
                                variant={vulnVariant}
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
                        description="Carte de recommandation avec icône colorée, texte explicatif, et bouton toggle ✓/+. Feedback tactile (active:scale)."
                        props={[
                            { name: 'icon', type: 'ReactNode', description: 'Icône dans le cercle coloré' },
                            { name: 'iconBg', type: 'string', default: "'#FDF3D8'", description: 'Couleur fond icône' },
                            { name: 'title', type: 'string', description: 'Titre de la recommandation' },
                            { name: 'description', type: 'string', description: 'Description' },
                            { name: 'defaultAdded', type: 'boolean', default: 'false', description: 'État initial' },
                        ]}
                    >
                        <div className="space-y-3">
                            <RecoCard
                                icon={<Coffee size={24} weight="fill" className="text-[#8F6B22]" />}
                                iconBg="#FDF3D8"
                                title="Micro-pause sociale"
                                description="Appelez un ami pendant 10 minutes aujourd'hui pour rompre l'isolement."
                            />
                            <RecoCard
                                icon={<Leaf size={24} weight="fill" className="text-[#165C38]" />}
                                iconBg="#E0F5E9"
                                title="Sortie au grand air"
                                description="Une promenade de 20 min dans un lieu fréquenté stimule le moral."
                                defaultAdded
                            />
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

                    {/* ── End ── */}
                    <div className="text-center py-16">
                        <p className="text-sm text-[#8C8C8C]">Fin du storybook</p>
                        <p className="text-[10px] text-[#D4D4D4] mt-2 uppercase tracking-[0.15em]">Monka Design System · v2.0 · 24 composants</p>
                    </div>
                </div>
            </main>
        </div>
    );
}
