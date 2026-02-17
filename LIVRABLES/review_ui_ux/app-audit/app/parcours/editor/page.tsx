'use client';

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import Link from 'next/link';
import {
    ArrowLeft,
    DotsSixVertical,
    X,
    DownloadSimple,
    MagnifyingGlass,
    Funnel,
    Eye,
    Warning,
    XCircle,
    CheckCircle,
    Trash,
    Copy,
    ArrowRight,
    Plus,
    ArrowsDownUp,
    ListNumbers,
    ChatDots,
} from '@phosphor-icons/react';
import {
    ALL_VERBATIMS,
    ALL_SCREENSHOTS,
    THEME_COLORS,
    SEVERITY_COLORS,
    DEFAULT_PARCOURS,
    type Verbatim,
    type Severity,
    type Parcours,
} from '../parcours-data';

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */
interface Assignment {
    screenshotImg: string;
    verbatimIds: string[];
}

type EditorMode = 'verbatims' | 'parcours';

/* ─────────────────────────────────────────────
   Editor Page
───────────────────────────────────────────── */
export default function EditorPage() {
    // ── Editor mode toggle ──
    const [editorMode, setEditorMode] = useState<EditorMode>('parcours');

    // ── Verbatim assignments (existing) ──
    const [assignments, setAssignments] = useState<Assignment[]>(() => {
        if (typeof window !== 'undefined') {
            try {
                const saved = localStorage.getItem('monka-editor-assignments');
                if (saved) {
                    const parsed: Assignment[] = JSON.parse(saved);
                    const savedMap = new Map(parsed.map((a) => [a.screenshotImg, a]));
                    return ALL_SCREENSHOTS.map((s) =>
                        savedMap.get(s.img) || { screenshotImg: s.img, verbatimIds: [] }
                    );
                }
            } catch (e) { /* ignore */ }
        }
        return ALL_SCREENSHOTS.map((s) => ({ screenshotImg: s.img, verbatimIds: [] }));
    });

    useEffect(() => {
        localStorage.setItem('monka-editor-assignments', JSON.stringify(assignments));
    }, [assignments]);

    // ── Parcours state (persisted) ──
    const [parcoursList, setParcoursList] = useState<Parcours[]>(() => {
        if (typeof window !== 'undefined') {
            try {
                const saved = localStorage.getItem('monka-editor-parcours');
                if (saved) return JSON.parse(saved);
            } catch (e) { /* ignore */ }
        }
        return DEFAULT_PARCOURS;
    });

    useEffect(() => {
        localStorage.setItem('monka-editor-parcours', JSON.stringify(parcoursList));
    }, [parcoursList]);

    const [selectedParcoursId, setSelectedParcoursId] = useState<string | null>(
        () => DEFAULT_PARCOURS[0]?.id || null
    );
    const [deletingParcoursId, setDeletingParcoursId] = useState<string | null>(null);
    const [newParcoursName, setNewParcoursName] = useState('');
    const [showNewParcoursForm, setShowNewParcoursForm] = useState(false);
    const [draggedScreenshotIdx, setDraggedScreenshotIdx] = useState<number | null>(null);
    const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);
    const [draggedPoolImg, setDraggedPoolImg] = useState<string | null>(null);

    // ── Common state ──
    const [selectedScreenshot, setSelectedScreenshot] = useState<string | null>(null);
    const [selectedVerbatimId, setSelectedVerbatimId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterTheme, setFilterTheme] = useState<string | null>(null);
    const [filterSeverity, setFilterSeverity] = useState<Severity | null>(null);
    const [previewScreenshot, setPreviewScreenshot] = useState<string | null>(null);
    const [draggedVerbatimId, setDraggedVerbatimId] = useState<string | null>(null);
    const [dragOverScreenshot, setDragOverScreenshot] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    // ── Parcours helpers ──
    const selectedParcours = useMemo(
        () => parcoursList.find((p) => p.id === selectedParcoursId) || null,
        [parcoursList, selectedParcoursId]
    );

    const unassignedScreenshots = useMemo(() => {
        const assigned = new Set(parcoursList.flatMap((p) => p.screenshotImgs));
        return ALL_SCREENSHOTS.filter((s) => !assigned.has(s.img));
    }, [parcoursList]);

    const createParcours = useCallback((name: string) => {
        const id = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        const colors = ['#F59E0B', '#8B5CF6', '#EC4899', '#14B8A6', '#F97316', '#06B6D4'];
        const color = colors[parcoursList.length % colors.length];
        setParcoursList((prev) => [...prev, { id, name, description: '', color, screenshotImgs: [] }]);
        setSelectedParcoursId(id);
        setShowNewParcoursForm(false);
        setNewParcoursName('');
    }, [parcoursList.length]);

    const deleteParcours = useCallback((id: string) => {
        setParcoursList((prev) => prev.filter((p) => p.id !== id));
        if (selectedParcoursId === id) {
            setSelectedParcoursId(parcoursList.find((p) => p.id !== id)?.id || null);
        }
        setDeletingParcoursId(null);
    }, [selectedParcoursId, parcoursList]);

    const addScreenshotToParcours = useCallback((parcoursId: string, img: string) => {
        setParcoursList((prev) =>
            prev.map((p) => {
                if (p.id !== parcoursId) return p;
                if (p.screenshotImgs.includes(img)) return p;
                return { ...p, screenshotImgs: [...p.screenshotImgs, img] };
            })
        );
    }, []);

    const removeScreenshotFromParcours = useCallback((parcoursId: string, img: string) => {
        setParcoursList((prev) =>
            prev.map((p) => {
                if (p.id !== parcoursId) return p;
                return { ...p, screenshotImgs: p.screenshotImgs.filter((i) => i !== img) };
            })
        );
    }, []);

    const reorderScreenshotInParcours = useCallback((parcoursId: string, fromIdx: number, toIdx: number) => {
        setParcoursList((prev) =>
            prev.map((p) => {
                if (p.id !== parcoursId) return p;
                const imgs = [...p.screenshotImgs];
                const [moved] = imgs.splice(fromIdx, 1);
                imgs.splice(toIdx, 0, moved);
                return { ...p, screenshotImgs: imgs };
            })
        );
    }, []);

    // Count how many screenshots each verbatim is assigned to
    const verbatimAssignmentCount = useMemo(() => {
        const counts = new Map<string, number>();
        assignments.forEach((a) => a.verbatimIds.forEach((id) => {
            counts.set(id, (counts.get(id) || 0) + 1);
        }));
        return counts;
    }, [assignments]);

    // All verbatims are always shown (multi-assignment allowed)
    const displayedVerbatims = ALL_VERBATIMS;

    // Filtered verbatims (all verbatims, filtered by search/theme/severity)
    const filteredVerbatims = useMemo(() => {
        let list: Verbatim[] = [...displayedVerbatims];
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            list = list.filter(
                (v) =>
                    v.id.toLowerCase().includes(q) ||
                    v.text.toLowerCase().includes(q) ||
                    v.summary.toLowerCase().includes(q)
            );
        }
        if (filterTheme) {
            list = list.filter((v) => v.theme === filterTheme);
        }
        if (filterSeverity) {
            list = list.filter((v) => v.severity === filterSeverity);
        }
        return list;
    }, [displayedVerbatims, searchQuery, filterTheme, filterSeverity]);

    // Get verbatims for a screenshot
    const getVerbatimsForScreenshot = useCallback(
        (img: string) => {
            const a = assignments.find((a) => a.screenshotImg === img);
            if (!a) return [];
            return a.verbatimIds.map((id) => ALL_VERBATIMS.find((v) => v.id === id)!).filter(Boolean);
        },
        [assignments]
    );

    // Get screenshots for a verbatim
    const getScreenshotsForVerbatim = useCallback(
        (verbatimId: string) => {
            return assignments
                .filter((a) => a.verbatimIds.includes(verbatimId))
                .map((a) => ALL_SCREENSHOTS.find((s) => s.img === a.screenshotImg)!)
                .filter(Boolean);
        },
        [assignments]
    );

    // Assign verbatim to screenshot (multi-assignment: keeps on other screenshots)
    const assignVerbatim = useCallback((verbatimId: string, screenshotImg: string) => {
        setAssignments((prev) =>
            prev.map((a) => {
                if (a.screenshotImg === screenshotImg) {
                    if (a.verbatimIds.includes(verbatimId)) return a;
                    return { ...a, verbatimIds: [...a.verbatimIds, verbatimId] };
                }
                return a;
            })
        );
    }, []);

    // Remove verbatim from screenshot
    const removeVerbatim = useCallback((verbatimId: string, screenshotImg: string) => {
        setAssignments((prev) =>
            prev.map((a) => {
                if (a.screenshotImg === screenshotImg) {
                    return { ...a, verbatimIds: a.verbatimIds.filter((id) => id !== verbatimId) };
                }
                return a;
            })
        );
    }, []);

    // Export as JSON
    const exportJSON = useCallback(() => {
        const data = assignments
            .filter((a) => a.verbatimIds.length > 0)
            .map((a) => {
                const screenshot = ALL_SCREENSHOTS.find((s) => s.img === a.screenshotImg);
                return {
                    screenshot: a.screenshotImg,
                    label: screenshot?.defaultLabel || '',
                    verbatims: a.verbatimIds.map((id) => {
                        const v = ALL_VERBATIMS.find((v) => v.id === id);
                        return v
                            ? {
                                id: v.id,
                                theme: v.theme,
                                text: v.text,
                                severity: v.severity,
                                summary: v.summary,
                            }
                            : null;
                    }).filter(Boolean),
                };
            });

        const json = JSON.stringify(data, null, 2);
        navigator.clipboard.writeText(json).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    }, [assignments]);

    // Stats
    const stats = useMemo(() => {
        const total = ALL_VERBATIMS.length;
        const assigned = verbatimAssignmentCount.size;
        const totalAssignments = Array.from(verbatimAssignmentCount.values()).reduce((sum, c) => sum + c, 0);
        const screenshotsWithAssignments = assignments.filter((a) => a.verbatimIds.length > 0).length;
        return { total, assigned, remaining: total - assigned, screenshotsWithAssignments, totalAssignments };
    }, [assignments, verbatimAssignmentCount]);

    const themes = useMemo(() => [...new Set(ALL_VERBATIMS.map((v) => v.theme))], []);

    return (
        <div
            style={{
                width: '100vw',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                background: '#0F172A',
                fontFamily: "'Outfit', sans-serif",
                overflow: 'hidden',
            }}
        >
            {/* ── Top Bar ── */}
            <div
                style={{
                    padding: '12px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    background: 'linear-gradient(180deg, #1E293B, #0F172A)',
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                    flexShrink: 0,
                }}
            >
                <Link
                    href="/parcours"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        color: '#94A3B8',
                        textDecoration: 'none',
                        fontSize: 13,
                        fontWeight: 500,
                    }}
                >
                    <ArrowLeft size={16} />
                    Parcours
                </Link>

                <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.1)' }} />

                {/* Mode Toggle */}
                <div style={{ display: 'flex', gap: 2, background: 'rgba(255,255,255,0.05)', borderRadius: 10, padding: 2 }}>
                    <button
                        onClick={() => setEditorMode('parcours')}
                        style={{
                            padding: '6px 14px',
                            borderRadius: 8,
                            border: 'none',
                            background: editorMode === 'parcours' ? 'rgba(16,185,129,0.2)' : 'transparent',
                            color: editorMode === 'parcours' ? '#6EE7B7' : '#64748B',
                            cursor: 'pointer',
                            fontSize: 12,
                            fontWeight: 700,
                            fontFamily: "'Outfit', sans-serif",
                            display: 'flex',
                            alignItems: 'center',
                            gap: 6,
                            transition: 'all 0.15s',
                        }}
                    >
                        <ListNumbers size={14} /> Parcours
                    </button>
                    <button
                        onClick={() => setEditorMode('verbatims')}
                        style={{
                            padding: '6px 14px',
                            borderRadius: 8,
                            border: 'none',
                            background: editorMode === 'verbatims' ? 'rgba(99,102,241,0.2)' : 'transparent',
                            color: editorMode === 'verbatims' ? '#A5B4FC' : '#64748B',
                            cursor: 'pointer',
                            fontSize: 12,
                            fontWeight: 700,
                            fontFamily: "'Outfit', sans-serif",
                            display: 'flex',
                            alignItems: 'center',
                            gap: 6,
                            transition: 'all 0.15s',
                        }}
                    >
                        <ChatDots size={14} /> Verbatims
                    </button>
                </div>

                <div style={{ flex: 1 }} />

                {/* Stats */}
                {editorMode === 'verbatims' && (
                    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                        <span
                            style={{
                                padding: '4px 12px',
                                borderRadius: 20,
                                background: stats.remaining === 0 ? 'rgba(5,150,105,0.15)' : 'rgba(234,179,8,0.15)',
                                color: stats.remaining === 0 ? '#6EE7B7' : '#FCD34D',
                                fontSize: 11,
                                fontWeight: 700,
                            }}
                        >
                            {stats.assigned}/{stats.total} assignés
                        </span>
                        <span
                            style={{
                                padding: '4px 12px',
                                borderRadius: 20,
                                background: 'rgba(99,102,241,0.15)',
                                color: '#A5B4FC',
                                fontSize: 11,
                                fontWeight: 700,
                            }}
                        >
                            {stats.screenshotsWithAssignments} screenshots
                        </span>
                    </div>
                )}
                {editorMode === 'parcours' && (
                    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                        <span
                            style={{
                                padding: '4px 12px',
                                borderRadius: 20,
                                background: 'rgba(16,185,129,0.15)',
                                color: '#6EE7B7',
                                fontSize: 11,
                                fontWeight: 700,
                            }}
                        >
                            {parcoursList.length} parcours
                        </span>
                        <span
                            style={{
                                padding: '4px 12px',
                                borderRadius: 20,
                                background: 'rgba(245,158,11,0.15)',
                                color: '#FCD34D',
                                fontSize: 11,
                                fontWeight: 700,
                            }}
                        >
                            {unassignedScreenshots.length} non assigné{unassignedScreenshots.length > 1 ? 's' : ''}
                        </span>
                    </div>
                )}

                {/* Export */}
                <button
                    onClick={exportJSON}
                    style={{
                        padding: '8px 16px',
                        borderRadius: 10,
                        border: '1px solid rgba(99,102,241,0.3)',
                        background: 'rgba(99,102,241,0.1)',
                        color: '#A5B4FC',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        fontSize: 12,
                        fontWeight: 600,
                        fontFamily: "'Outfit', sans-serif",
                        transition: 'all 0.2s',
                    }}
                >
                    {copied ? (
                        <>
                            <CheckCircle size={14} weight="fill" color="#6EE7B7" /> Copié !
                        </>
                    ) : (
                        <>
                            <Copy size={14} /> Exporter JSON
                        </>
                    )}
                </button>
            </div>

            {/* ── Main Layout ── */}
            {editorMode === 'verbatims' && (
                <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
                    {/* ── LEFT: Verbatims Panel ── */}
                    <div
                        style={{
                            width: 380,
                            flexShrink: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            background: '#1E293B',
                            borderRight: '1px solid rgba(255,255,255,0.06)',
                        }}
                    >
                        {/* Header */}
                        <div style={{ padding: '14px 16px 10px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                            <div style={{ color: '#E2E8F0', fontSize: 13, fontWeight: 700, marginBottom: 10 }}>
                                💬 Verbatims ({ALL_VERBATIMS.length}) — {stats.assigned} assignés ({stats.totalAssignments} liens)
                            </div>

                            {/* Search */}
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 8,
                                    padding: '6px 10px',
                                    borderRadius: 8,
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.08)',
                                    marginBottom: 10,
                                }}
                            >
                                <MagnifyingGlass size={14} color="#64748B" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Chercher un verbatim..."
                                    style={{
                                        flex: 1,
                                        background: 'none',
                                        border: 'none',
                                        outline: 'none',
                                        color: '#E2E8F0',
                                        fontSize: 12,
                                        fontFamily: "'Outfit', sans-serif",
                                    }}
                                />
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery('')}
                                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                                    >
                                        <X size={12} color="#64748B" />
                                    </button>
                                )}
                            </div>

                            {/* Filters */}
                            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                                <button
                                    onClick={() => setFilterTheme(null)}
                                    style={{
                                        padding: '3px 8px',
                                        borderRadius: 6,
                                        border: !filterTheme ? '1px solid #6366F1' : '1px solid rgba(255,255,255,0.08)',
                                        background: !filterTheme ? 'rgba(99,102,241,0.15)' : 'transparent',
                                        color: !filterTheme ? '#A5B4FC' : '#64748B',
                                        cursor: 'pointer',
                                        fontSize: 10,
                                        fontWeight: 600,
                                        fontFamily: "'Outfit', sans-serif",
                                    }}
                                >
                                    Tous
                                </button>
                                {themes.map((t) => {
                                    const tc = THEME_COLORS[t] || { bg: '#333', text: '#fff', border: '#555' };
                                    const isActive = filterTheme === t;
                                    return (
                                        <button
                                            key={t}
                                            onClick={() => setFilterTheme(isActive ? null : t)}
                                            style={{
                                                padding: '3px 8px',
                                                borderRadius: 6,
                                                border: `1px solid ${isActive ? tc.border : 'rgba(255,255,255,0.08)'}`,
                                                background: isActive ? tc.bg + '33' : 'transparent',
                                                color: isActive ? tc.text : '#64748B',
                                                cursor: 'pointer',
                                                fontSize: 10,
                                                fontWeight: 600,
                                                fontFamily: "'Outfit', sans-serif",
                                            }}
                                        >
                                            {t}
                                        </button>
                                    );
                                })}
                            </div>
                            <div style={{ display: 'flex', gap: 4, marginTop: 6 }}>
                                {(['bloquant', 'majeur', 'mineur'] as Severity[]).map((s) => {
                                    const sc = SEVERITY_COLORS[s];
                                    const isActive = filterSeverity === s;
                                    return (
                                        <button
                                            key={s}
                                            onClick={() => setFilterSeverity(isActive ? null : s)}
                                            style={{
                                                padding: '3px 8px',
                                                borderRadius: 6,
                                                border: `1px solid ${isActive ? sc.border : 'rgba(255,255,255,0.08)'}`,
                                                background: isActive ? sc.bg + '33' : 'transparent',
                                                color: isActive ? sc.text : '#64748B',
                                                cursor: 'pointer',
                                                fontSize: 10,
                                                fontWeight: 600,
                                                fontFamily: "'Outfit', sans-serif",
                                            }}
                                        >
                                            {sc.label}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Verbatim list */}
                        <div style={{ flex: 1, overflowY: 'auto', padding: '8px' }}>
                            {filteredVerbatims.length === 0 ? (
                                <div
                                    style={{
                                        padding: 40,
                                        textAlign: 'center',
                                        color: '#64748B',
                                        fontSize: 12,
                                    }}
                                >
                                    Aucun verbatim ne correspond aux filtres
                                </div>
                            ) : (
                                filteredVerbatims.map((v) => {
                                    const tc = THEME_COLORS[v.theme] || { bg: '#333', text: '#fff', border: '#555' };
                                    const sc = SEVERITY_COLORS[v.severity];
                                    const isDragging = draggedVerbatimId === v.id;
                                    return (
                                        <div
                                            key={v.id}
                                            draggable
                                            onDragStart={(e) => {
                                                setDraggedVerbatimId(v.id);
                                                e.dataTransfer.effectAllowed = 'copy';
                                                e.dataTransfer.setData('text/plain', v.id);
                                            }}
                                            onDragEnd={() => setDraggedVerbatimId(null)}
                                            onClick={() => {
                                                setSelectedVerbatimId(selectedVerbatimId === v.id ? null : v.id);
                                                setSelectedScreenshot(null);
                                            }}
                                            style={{
                                                padding: '10px 12px',
                                                marginBottom: 6,
                                                borderRadius: 10,
                                                background: isDragging
                                                    ? 'rgba(99,102,241,0.15)'
                                                    : selectedVerbatimId === v.id
                                                        ? 'rgba(234,179,8,0.15)'
                                                        : (verbatimAssignmentCount.get(v.id) || 0) > 0
                                                            ? 'rgba(99,102,241,0.06)'
                                                            : 'rgba(255,255,255,0.02)',
                                                border: isDragging
                                                    ? '1.5px solid #6366F1'
                                                    : selectedVerbatimId === v.id
                                                        ? '1.5px solid #EAB308'
                                                        : (verbatimAssignmentCount.get(v.id) || 0) > 0
                                                            ? '1.5px solid rgba(99,102,241,0.2)'
                                                            : '1.5px solid rgba(255,255,255,0.04)',
                                                cursor: 'grab',
                                                opacity: isDragging ? 0.5 : 1,
                                                transition: 'all 0.15s ease',
                                                userSelect: 'none',
                                            }}
                                            onMouseEnter={(e) => {
                                                if (!isDragging && selectedVerbatimId !== v.id) e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                                            }}
                                            onMouseLeave={(e) => {
                                                if (!isDragging && selectedVerbatimId !== v.id) {
                                                    e.currentTarget.style.background = (verbatimAssignmentCount.get(v.id) || 0) > 0
                                                        ? 'rgba(99,102,241,0.06)'
                                                        : 'rgba(255,255,255,0.02)';
                                                }
                                            }}
                                        >
                                            {/* Top row: ID + Theme + Severity */}
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 6,
                                                    marginBottom: 6,
                                                }}
                                            >
                                                <DotsSixVertical size={12} color="#475569" />
                                                <span
                                                    style={{
                                                        fontWeight: 800,
                                                        fontSize: 11,
                                                        color: '#E2E8F0',
                                                        fontFamily: "'JetBrains Mono', monospace",
                                                    }}
                                                >
                                                    {v.id}
                                                </span>
                                                <span
                                                    style={{
                                                        padding: '1px 6px',
                                                        borderRadius: 4,
                                                        background: tc.bg + '44',
                                                        color: tc.text,
                                                        fontSize: 9,
                                                        fontWeight: 600,
                                                        border: `1px solid ${tc.border}44`,
                                                    }}
                                                >
                                                    {v.theme}
                                                </span>
                                                <span
                                                    style={{
                                                        padding: '1px 6px',
                                                        borderRadius: 4,
                                                        background: sc.bg + '44',
                                                        color: sc.text,
                                                        fontSize: 9,
                                                        fontWeight: 600,
                                                        border: `1px solid ${sc.border}44`,
                                                    }}
                                                >
                                                    {v.severity}
                                                </span>
                                                {(verbatimAssignmentCount.get(v.id) || 0) > 0 && (
                                                    <span
                                                        style={{
                                                            marginLeft: 'auto',
                                                            padding: '1px 6px',
                                                            borderRadius: 4,
                                                            background: 'rgba(99,102,241,0.2)',
                                                            color: '#A5B4FC',
                                                            fontSize: 9,
                                                            fontWeight: 700,
                                                        }}
                                                    >
                                                        📌 {verbatimAssignmentCount.get(v.id)} screen{(verbatimAssignmentCount.get(v.id) || 0) > 1 ? 's' : ''}
                                                    </span>
                                                )}
                                            </div>
                                            {/* Summary */}
                                            <div
                                                style={{
                                                    color: '#CBD5E1',
                                                    fontSize: 11,
                                                    fontWeight: 600,
                                                    marginBottom: 4,
                                                    lineHeight: 1.3,
                                                }}
                                            >
                                                {v.summary}
                                            </div>
                                            {/* Quote */}
                                            <div
                                                style={{
                                                    color: '#94A3B8',
                                                    fontSize: 10,
                                                    fontStyle: 'italic',
                                                    lineHeight: 1.4,
                                                    paddingLeft: 8,
                                                    borderLeft: '2px solid rgba(255,255,255,0.08)',
                                                }}
                                            >
                                                « {v.text} »
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>

                        {/* Bottom hint */}
                        <div
                            style={{
                                padding: '10px 16px',
                                borderTop: '1px solid rgba(255,255,255,0.06)',
                                color: '#64748B',
                                fontSize: 10,
                                textAlign: 'center',
                            }}
                        >
                            ← Glissez un verbatim sur un screenshot →
                        </div>
                    </div>

                    {/* ── CENTER: Screenshots Grid ── */}
                    <div style={{ flex: 1, overflowY: 'auto', padding: 20 }}>
                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                                gap: 16,
                            }}
                        >
                            {ALL_SCREENSHOTS.map((screen) => {
                                const screenshotVerbatims = getVerbatimsForScreenshot(screen.img);
                                const isSelected = selectedScreenshot === screen.img;
                                const isDragTarget = dragOverScreenshot === screen.img;
                                const hasAssignments = screenshotVerbatims.length > 0;
                                const isLinkedToSelectedVerbatim = selectedVerbatimId
                                    ? screenshotVerbatims.some((v) => v.id === selectedVerbatimId)
                                    : false;

                                return (
                                    <div
                                        key={screen.img}
                                        onClick={() => {
                                            setSelectedScreenshot(isSelected ? null : screen.img);
                                            setSelectedVerbatimId(null);
                                        }}
                                        onDragOver={(e) => {
                                            e.preventDefault();
                                            e.dataTransfer.dropEffect = 'copy';
                                            setDragOverScreenshot(screen.img);
                                        }}
                                        onDragLeave={() => {
                                            if (dragOverScreenshot === screen.img) setDragOverScreenshot(null);
                                        }}
                                        onDrop={(e) => {
                                            e.preventDefault();
                                            const verbatimId = e.dataTransfer.getData('text/plain');
                                            if (verbatimId) {
                                                assignVerbatim(verbatimId, screen.img);
                                            }
                                            setDragOverScreenshot(null);
                                            setDraggedVerbatimId(null);
                                        }}
                                        style={{
                                            borderRadius: 16,
                                            background: isDragTarget
                                                ? 'rgba(99,102,241,0.12)'
                                                : isLinkedToSelectedVerbatim
                                                    ? 'rgba(234,179,8,0.1)'
                                                    : isSelected
                                                        ? 'rgba(99,102,241,0.08)'
                                                        : 'rgba(255,255,255,0.03)',
                                            border: isDragTarget
                                                ? '2px dashed #6366F1'
                                                : isLinkedToSelectedVerbatim
                                                    ? '2px solid #EAB308'
                                                    : isSelected
                                                        ? '2px solid #6366F1'
                                                        : hasAssignments
                                                            ? '2px solid rgba(99,102,241,0.25)'
                                                            : '2px solid rgba(255,255,255,0.06)',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease',
                                            overflow: 'hidden',
                                            position: 'relative',
                                        }}
                                    >
                                        {/* Badge count */}
                                        {hasAssignments && (
                                            <div
                                                style={{
                                                    position: 'absolute',
                                                    top: 8,
                                                    right: 8,
                                                    width: 22,
                                                    height: 22,
                                                    borderRadius: '50%',
                                                    background: '#6366F1',
                                                    color: '#fff',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    fontSize: 10,
                                                    fontWeight: 800,
                                                    zIndex: 2,
                                                    boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                                                }}
                                            >
                                                {screenshotVerbatims.length}
                                            </div>
                                        )}

                                        {/* Preview button */}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setPreviewScreenshot(screen.img);
                                            }}
                                            style={{
                                                position: 'absolute',
                                                top: 8,
                                                left: 8,
                                                width: 24,
                                                height: 24,
                                                borderRadius: 6,
                                                background: 'rgba(0,0,0,0.6)',
                                                border: 'none',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                zIndex: 2,
                                                opacity: 0.7,
                                                transition: 'opacity 0.2s',
                                            }}
                                            onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                                            onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.7')}
                                        >
                                            <Eye size={12} color="#fff" />
                                        </button>

                                        {/* Screenshot image */}
                                        <div
                                            style={{
                                                height: 400,
                                                background: '#0F172A',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <img
                                                src={`/screenshots/${screen.img}.PNG`}
                                                alt={screen.defaultLabel}
                                                style={{
                                                    maxWidth: '100%',
                                                    maxHeight: '100%',
                                                    objectFit: 'contain',
                                                }}
                                                draggable={false}
                                            />
                                        </div>

                                        {/* Info */}
                                        <div style={{ padding: '10px 12px' }}>
                                            <div
                                                style={{
                                                    color: '#CBD5E1',
                                                    fontSize: 11,
                                                    fontWeight: 600,
                                                    marginBottom: 2,
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                }}
                                            >
                                                {screen.defaultLabel}
                                            </div>
                                            <div style={{ color: '#475569', fontSize: 9, fontFamily: "'JetBrains Mono', monospace" }}>
                                                {screen.img}
                                            </div>

                                            {/* Assigned verbatim pills */}
                                            {screenshotVerbatims.length > 0 && (
                                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 8 }}>
                                                    {screenshotVerbatims.map((v) => {
                                                        const tc = THEME_COLORS[v.theme] || { bg: '#333', text: '#fff', border: '#555' };
                                                        return (
                                                            <span
                                                                key={v.id}
                                                                style={{
                                                                    display: 'inline-flex',
                                                                    alignItems: 'center',
                                                                    gap: 4,
                                                                    padding: '2px 6px',
                                                                    borderRadius: 5,
                                                                    background: tc.bg + '44',
                                                                    color: tc.text,
                                                                    fontSize: 9,
                                                                    fontWeight: 700,
                                                                    border: `1px solid ${tc.border}44`,
                                                                }}
                                                            >
                                                                {v.id}
                                                                <button
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        removeVerbatim(v.id, screen.img);
                                                                    }}
                                                                    style={{
                                                                        background: 'none',
                                                                        border: 'none',
                                                                        cursor: 'pointer',
                                                                        padding: 0,
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                    }}
                                                                >
                                                                    <X size={8} color={tc.text} />
                                                                </button>
                                                            </span>
                                                        );
                                                    })}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* ── RIGHT: Selected Screenshot Detail ── */}
                    {selectedScreenshot && (
                        <div
                            style={{
                                width: 340,
                                flexShrink: 0,
                                background: '#1E293B',
                                borderLeft: '1px solid rgba(255,255,255,0.06)',
                                display: 'flex',
                                flexDirection: 'column',
                                overflow: 'hidden',
                            }}
                        >
                            {/* Close */}
                            <div
                                style={{
                                    padding: '12px 16px',
                                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <span style={{ color: '#E2E8F0', fontSize: 13, fontWeight: 700 }}>
                                    📌 {ALL_SCREENSHOTS.find((s) => s.img === selectedScreenshot)?.defaultLabel}
                                </span>
                                <button
                                    onClick={() => setSelectedScreenshot(null)}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        color: '#64748B',
                                    }}
                                >
                                    <X size={16} />
                                </button>
                            </div>

                            {/* Preview */}
                            <div
                                style={{
                                    height: 280,
                                    background: '#0F172A',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: 12,
                                    flexShrink: 0,
                                }}
                            >
                                <img
                                    src={`/screenshots/${selectedScreenshot}.PNG`}
                                    alt=""
                                    style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: 12 }}
                                />
                            </div>

                            {/* Assigned verbatims */}
                            <div
                                style={{
                                    padding: '12px 16px 8px',
                                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                                    color: '#94A3B8',
                                    fontSize: 11,
                                    fontWeight: 600,
                                }}
                            >
                                Verbatims assignés ({getVerbatimsForScreenshot(selectedScreenshot).length})
                            </div>
                            <div
                                style={{ flex: 1, overflowY: 'auto', padding: 8 }}
                                onDragOver={(e) => {
                                    e.preventDefault();
                                    e.dataTransfer.dropEffect = 'copy';
                                    setDragOverScreenshot(selectedScreenshot);
                                }}
                                onDrop={(e) => {
                                    e.preventDefault();
                                    const verbatimId = e.dataTransfer.getData('text/plain');
                                    if (verbatimId) {
                                        assignVerbatim(verbatimId, selectedScreenshot);
                                    }
                                    setDragOverScreenshot(null);
                                    setDraggedVerbatimId(null);
                                }}
                            >
                                {getVerbatimsForScreenshot(selectedScreenshot).length === 0 ? (
                                    <div
                                        style={{
                                            padding: 30,
                                            textAlign: 'center',
                                            color: '#475569',
                                            fontSize: 11,
                                            border: '2px dashed rgba(255,255,255,0.08)',
                                            borderRadius: 12,
                                            margin: 8,
                                        }}
                                    >
                                        Glissez un verbatim ici
                                    </div>
                                ) : (
                                    getVerbatimsForScreenshot(selectedScreenshot).map((v) => {
                                        const tc = THEME_COLORS[v.theme] || { bg: '#333', text: '#fff', border: '#555' };
                                        const sc = SEVERITY_COLORS[v.severity];
                                        return (
                                            <div
                                                key={v.id}
                                                style={{
                                                    padding: '10px 12px',
                                                    marginBottom: 6,
                                                    borderRadius: 10,
                                                    background: 'rgba(255,255,255,0.02)',
                                                    border: '1px solid rgba(255,255,255,0.06)',
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 6,
                                                        marginBottom: 6,
                                                    }}
                                                >
                                                    <span
                                                        style={{
                                                            fontWeight: 800,
                                                            fontSize: 11,
                                                            color: '#E2E8F0',
                                                            fontFamily: "'JetBrains Mono', monospace",
                                                        }}
                                                    >
                                                        {v.id}
                                                    </span>
                                                    <span
                                                        style={{
                                                            padding: '1px 5px',
                                                            borderRadius: 4,
                                                            background: tc.bg + '44',
                                                            color: tc.text,
                                                            fontSize: 9,
                                                            fontWeight: 600,
                                                        }}
                                                    >
                                                        {v.theme}
                                                    </span>
                                                    <span
                                                        style={{
                                                            padding: '1px 5px',
                                                            borderRadius: 4,
                                                            background: sc.bg + '44',
                                                            color: sc.text,
                                                            fontSize: 9,
                                                            fontWeight: 600,
                                                        }}
                                                    >
                                                        {v.severity}
                                                    </span>
                                                    <div style={{ flex: 1 }} />
                                                    <button
                                                        onClick={() => removeVerbatim(v.id, selectedScreenshot)}
                                                        style={{
                                                            background: 'rgba(220,38,38,0.1)',
                                                            border: '1px solid rgba(220,38,38,0.2)',
                                                            borderRadius: 4,
                                                            cursor: 'pointer',
                                                            padding: '2px 4px',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                        }}
                                                    >
                                                        <Trash size={10} color="#FCA5A5" />
                                                    </button>
                                                </div>
                                                <div
                                                    style={{
                                                        color: '#94A3B8',
                                                        fontSize: 10,
                                                        fontStyle: 'italic',
                                                        lineHeight: 1.4,
                                                    }}
                                                >
                                                    « {v.text} »
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    )}

                    {/* ── RIGHT: Selected Verbatim Detail ── */}
                    {selectedVerbatimId && !selectedScreenshot && (() => {
                        const verbatim = ALL_VERBATIMS.find((v) => v.id === selectedVerbatimId);
                        const linkedScreenshots = getScreenshotsForVerbatim(selectedVerbatimId);
                        if (!verbatim) return null;
                        const tc = THEME_COLORS[verbatim.theme] || { bg: '#333', text: '#fff', border: '#555' };
                        const sc = SEVERITY_COLORS[verbatim.severity];
                        return (
                            <div
                                style={{
                                    width: 360,
                                    flexShrink: 0,
                                    background: '#1E293B',
                                    borderLeft: '1px solid rgba(255,255,255,0.06)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    overflow: 'hidden',
                                }}
                            >
                                {/* Header */}
                                <div
                                    style={{
                                        padding: '12px 16px',
                                        borderBottom: '1px solid rgba(255,255,255,0.06)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <span style={{ color: '#EAB308', fontSize: 13, fontWeight: 800, fontFamily: "'JetBrains Mono', monospace" }}>
                                            {verbatim.id}
                                        </span>
                                        <span
                                            style={{
                                                padding: '2px 6px',
                                                borderRadius: 4,
                                                background: tc.bg + '44',
                                                color: tc.text,
                                                fontSize: 9,
                                                fontWeight: 600,
                                            }}
                                        >
                                            {verbatim.theme}
                                        </span>
                                        <span
                                            style={{
                                                padding: '2px 6px',
                                                borderRadius: 4,
                                                background: sc.bg + '44',
                                                color: sc.text,
                                                fontSize: 9,
                                                fontWeight: 600,
                                            }}
                                        >
                                            {verbatim.severity}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => setSelectedVerbatimId(null)}
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            cursor: 'pointer',
                                            color: '#64748B',
                                        }}
                                    >
                                        <X size={16} />
                                    </button>
                                </div>

                                {/* Verbatim content */}
                                <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                                    <div style={{ color: '#E2E8F0', fontSize: 12, fontWeight: 600, marginBottom: 6, lineHeight: 1.3 }}>
                                        {verbatim.summary}
                                    </div>
                                    <div
                                        style={{
                                            color: '#94A3B8',
                                            fontSize: 10,
                                            fontStyle: 'italic',
                                            lineHeight: 1.4,
                                            paddingLeft: 8,
                                            borderLeft: '2px solid rgba(234,179,8,0.3)',
                                        }}
                                    >
                                        « {verbatim.text} »
                                    </div>
                                </div>

                                {/* Associated screenshots */}
                                <div
                                    style={{
                                        padding: '10px 16px 6px',
                                        color: '#94A3B8',
                                        fontSize: 11,
                                        fontWeight: 600,
                                        borderBottom: '1px solid rgba(255,255,255,0.06)',
                                    }}
                                >
                                    📸 Screenshots associés ({linkedScreenshots.length})
                                </div>

                                <div style={{ flex: 1, overflowY: 'auto', padding: 8 }}>
                                    {linkedScreenshots.length === 0 ? (
                                        <div
                                            style={{
                                                padding: 30,
                                                textAlign: 'center',
                                                color: '#475569',
                                                fontSize: 11,
                                                border: '2px dashed rgba(255,255,255,0.08)',
                                                borderRadius: 12,
                                                margin: 8,
                                            }}
                                        >
                                            Aucun screenshot associé — glissez ce verbatim sur un screenshot
                                        </div>
                                    ) : (
                                        linkedScreenshots.map((screen) => (
                                            <div
                                                key={screen.img}
                                                style={{
                                                    display: 'flex',
                                                    gap: 10,
                                                    padding: '8px 10px',
                                                    marginBottom: 6,
                                                    borderRadius: 10,
                                                    background: 'rgba(255,255,255,0.02)',
                                                    border: '1px solid rgba(234,179,8,0.15)',
                                                    alignItems: 'center',
                                                    cursor: 'pointer',
                                                }}
                                                onClick={() => {
                                                    setSelectedScreenshot(screen.img);
                                                    setSelectedVerbatimId(null);
                                                }}
                                            >
                                                {/* Mini preview */}
                                                <div
                                                    style={{
                                                        width: 50,
                                                        height: 90,
                                                        borderRadius: 6,
                                                        overflow: 'hidden',
                                                        background: '#0F172A',
                                                        flexShrink: 0,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                    }}
                                                >
                                                    <img
                                                        src={`/screenshots/${screen.img}.PNG`}
                                                        alt=""
                                                        style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                                                        draggable={false}
                                                    />
                                                </div>
                                                {/* Info */}
                                                <div style={{ flex: 1, minWidth: 0 }}>
                                                    <div
                                                        style={{
                                                            color: '#CBD5E1',
                                                            fontSize: 11,
                                                            fontWeight: 600,
                                                            marginBottom: 2,
                                                            lineHeight: 1.3,
                                                        }}
                                                    >
                                                        {screen.defaultLabel}
                                                    </div>
                                                    <div style={{ color: '#475569', fontSize: 9, fontFamily: "'JetBrains Mono', monospace" }}>
                                                        {screen.img}
                                                    </div>
                                                </div>
                                                {/* Remove */}
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        removeVerbatim(selectedVerbatimId, screen.img);
                                                    }}
                                                    style={{
                                                        background: 'rgba(220,38,38,0.1)',
                                                        border: '1px solid rgba(220,38,38,0.2)',
                                                        borderRadius: 4,
                                                        cursor: 'pointer',
                                                        padding: '4px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        flexShrink: 0,
                                                    }}
                                                >
                                                    <Trash size={10} color="#FCA5A5" />
                                                </button>
                                            </div>
                                        ))
                                    )}
                                </div>

                                {/* Preview button */}
                                <div
                                    style={{
                                        padding: '10px 16px',
                                        borderTop: '1px solid rgba(255,255,255,0.06)',
                                        color: '#64748B',
                                        fontSize: 10,
                                        textAlign: 'center',
                                    }}
                                >
                                    Cliquez un screenshot pour voir son détail
                                </div>
                            </div>
                        );
                    })()}
                </div>
            )}

            {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            {/* ── PARCOURS MODE ── */}
            {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
            {editorMode === 'parcours' && (
                <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
                    {/* ── LEFT: Parcours List ── */}
                    <div
                        style={{
                            width: 280,
                            flexShrink: 0,
                            background: '#1E293B',
                            borderRight: '1px solid rgba(255,255,255,0.06)',
                            display: 'flex',
                            flexDirection: 'column',
                            overflow: 'hidden',
                        }}
                    >
                        <div
                            style={{
                                padding: '14px 16px 10px',
                                borderBottom: '1px solid rgba(255,255,255,0.06)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}
                        >
                            <span style={{ color: '#E2E8F0', fontSize: 13, fontWeight: 700 }}>
                                📋 Parcours ({parcoursList.length})
                            </span>
                            <button
                                onClick={() => setShowNewParcoursForm(true)}
                                style={{
                                    background: 'rgba(16,185,129,0.15)',
                                    border: '1px solid rgba(16,185,129,0.3)',
                                    borderRadius: 6,
                                    cursor: 'pointer',
                                    padding: '4px 8px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 4,
                                    color: '#6EE7B7',
                                    fontSize: 11,
                                    fontWeight: 600,
                                    fontFamily: "'Outfit', sans-serif",
                                }}
                            >
                                <Plus size={12} weight="bold" /> Nouveau
                            </button>
                        </div>

                        {/* New parcours form */}
                        {showNewParcoursForm && (
                            <div style={{ padding: '8px 12px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: 6 }}>
                                <input
                                    autoFocus
                                    value={newParcoursName}
                                    onChange={(e) => setNewParcoursName(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && newParcoursName.trim()) createParcours(newParcoursName.trim());
                                        if (e.key === 'Escape') { setShowNewParcoursForm(false); setNewParcoursName(''); }
                                    }}
                                    placeholder="Nom du parcours…"
                                    style={{
                                        flex: 1,
                                        padding: '6px 10px',
                                        borderRadius: 6,
                                        border: '1px solid rgba(16,185,129,0.3)',
                                        background: 'rgba(0,0,0,0.3)',
                                        color: '#E2E8F0',
                                        fontSize: 12,
                                        fontFamily: "'Outfit', sans-serif",
                                        outline: 'none',
                                    }}
                                />
                                <button
                                    onClick={() => { if (newParcoursName.trim()) createParcours(newParcoursName.trim()); }}
                                    disabled={!newParcoursName.trim()}
                                    style={{
                                        background: newParcoursName.trim() ? 'rgba(16,185,129,0.2)' : 'rgba(255,255,255,0.03)',
                                        border: 'none',
                                        borderRadius: 6,
                                        cursor: newParcoursName.trim() ? 'pointer' : 'default',
                                        padding: '6px 10px',
                                        color: newParcoursName.trim() ? '#6EE7B7' : '#475569',
                                        fontSize: 11,
                                        fontWeight: 600,
                                        fontFamily: "'Outfit', sans-serif",
                                    }}
                                >
                                    Créer
                                </button>
                                <button
                                    onClick={() => { setShowNewParcoursForm(false); setNewParcoursName(''); }}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        color: '#64748B',
                                        padding: '4px',
                                    }}
                                >
                                    <X size={14} />
                                </button>
                            </div>
                        )}

                        {/* Parcours list */}
                        <div style={{ flex: 1, overflowY: 'auto', padding: 8 }}>
                            {parcoursList.map((p) => (
                                <div
                                    key={p.id}
                                    onClick={() => setSelectedParcoursId(p.id)}
                                    style={{
                                        padding: '10px 12px',
                                        marginBottom: 4,
                                        borderRadius: 10,
                                        background: selectedParcoursId === p.id
                                            ? `${p.color}15`
                                            : 'transparent',
                                        border: selectedParcoursId === p.id
                                            ? `1px solid ${p.color}40`
                                            : '1px solid transparent',
                                        cursor: 'pointer',
                                        transition: 'all 0.15s',
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                                        <div
                                            style={{
                                                width: 8,
                                                height: 8,
                                                borderRadius: '50%',
                                                background: p.color,
                                                flexShrink: 0,
                                            }}
                                        />
                                        <span style={{ color: '#E2E8F0', fontSize: 12, fontWeight: 700, flex: 1 }}>
                                            {p.name}
                                        </span>
                                        <span
                                            style={{
                                                background: `${p.color}22`,
                                                color: p.color,
                                                padding: '1px 7px',
                                                borderRadius: 10,
                                                fontSize: 10,
                                                fontWeight: 700,
                                            }}
                                        >
                                            {p.screenshotImgs.length}
                                        </span>
                                        {/* Delete button */}
                                        {deletingParcoursId === p.id ? (
                                            <div style={{ display: 'flex', gap: 4 }}>
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); deleteParcours(p.id); }}
                                                    style={{
                                                        background: 'rgba(220,38,38,0.2)',
                                                        border: '1px solid rgba(220,38,38,0.4)',
                                                        borderRadius: 4,
                                                        cursor: 'pointer',
                                                        padding: '2px 6px',
                                                        color: '#FCA5A5',
                                                        fontSize: 9,
                                                        fontWeight: 700,
                                                        fontFamily: "'Outfit', sans-serif",
                                                    }}
                                                >
                                                    Oui
                                                </button>
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); setDeletingParcoursId(null); }}
                                                    style={{
                                                        background: 'rgba(255,255,255,0.05)',
                                                        border: '1px solid rgba(255,255,255,0.1)',
                                                        borderRadius: 4,
                                                        cursor: 'pointer',
                                                        padding: '2px 6px',
                                                        color: '#94A3B8',
                                                        fontSize: 9,
                                                        fontWeight: 700,
                                                        fontFamily: "'Outfit', sans-serif",
                                                    }}
                                                >
                                                    Non
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={(e) => { e.stopPropagation(); setDeletingParcoursId(p.id); }}
                                                style={{
                                                    background: 'none',
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                    color: '#475569',
                                                    padding: 2,
                                                    opacity: 0.5,
                                                    transition: 'opacity 0.15s',
                                                }}
                                                onMouseEnter={(e) => { (e.target as HTMLElement).style.opacity = '1'; }}
                                                onMouseLeave={(e) => { (e.target as HTMLElement).style.opacity = '0.5'; }}
                                            >
                                                <Trash size={12} />
                                            </button>
                                        )}
                                    </div>
                                    {p.description && (
                                        <div style={{ color: '#64748B', fontSize: 10, lineHeight: 1.3, paddingLeft: 16 }}>
                                            {p.description}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Unassigned pool */}
                        <div
                            style={{
                                borderTop: '1px solid rgba(255,255,255,0.06)',
                                padding: '10px 12px 6px',
                                background: 'rgba(0,0,0,0.15)',
                            }}
                        >
                            <div style={{ color: '#94A3B8', fontSize: 11, fontWeight: 600, marginBottom: 6 }}>
                                📦 Non assignés ({unassignedScreenshots.length})
                            </div>
                            <div style={{ maxHeight: 200, overflowY: 'auto' }}>
                                {unassignedScreenshots.map((s) => (
                                    <div
                                        key={s.img}
                                        draggable
                                        onDragStart={() => setDraggedPoolImg(s.img)}
                                        onDragEnd={() => setDraggedPoolImg(null)}
                                        style={{
                                            padding: '5px 8px',
                                            marginBottom: 2,
                                            borderRadius: 6,
                                            background: 'rgba(255,255,255,0.02)',
                                            border: '1px solid rgba(255,255,255,0.04)',
                                            cursor: 'grab',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 6,
                                        }}
                                    >
                                        <DotsSixVertical size={10} color="#475569" />
                                        <span style={{ color: '#94A3B8', fontSize: 10, fontFamily: "'JetBrains Mono', monospace" }}>
                                            {s.img}
                                        </span>
                                        <span style={{ color: '#64748B', fontSize: 9, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            {s.defaultLabel.split('—')[0]?.trim()}
                                        </span>
                                    </div>
                                ))}
                                {unassignedScreenshots.length === 0 && (
                                    <div style={{ color: '#475569', fontSize: 10, textAlign: 'center', padding: 10 }}>
                                        ✅ Tous les screenshots sont assignés
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* ── CENTER: Ordered Screenshots Grid for selected parcours ── */}
                    <div
                        style={{
                            flex: 1,
                            overflowY: 'auto',
                            padding: 20,
                            background: '#0F172A',
                        }}
                        onDragOver={(e) => {
                            if (draggedPoolImg && selectedParcoursId) {
                                e.preventDefault();
                                e.dataTransfer.dropEffect = 'copy';
                            }
                        }}
                        onDrop={(e) => {
                            if (draggedPoolImg && selectedParcoursId) {
                                e.preventDefault();
                                addScreenshotToParcours(selectedParcoursId, draggedPoolImg);
                                setDraggedPoolImg(null);
                            }
                        }}
                    >
                        {selectedParcours ? (
                            <>
                                {/* Parcours header */}
                                <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
                                    <div
                                        style={{
                                            width: 12,
                                            height: 12,
                                            borderRadius: '50%',
                                            background: selectedParcours.color,
                                        }}
                                    />
                                    <h2 style={{ color: '#F1F5F9', fontSize: 18, fontWeight: 800, margin: 0 }}>
                                        {selectedParcours.name}
                                    </h2>
                                    <span style={{ color: '#64748B', fontSize: 12 }}>
                                        {selectedParcours.screenshotImgs.length} écrans
                                    </span>
                                </div>
                                {selectedParcours.description && (
                                    <div style={{ color: '#94A3B8', fontSize: 12, marginBottom: 20, lineHeight: 1.4 }}>
                                        {selectedParcours.description}
                                    </div>
                                )}

                                {/* Screenshot flow */}
                                {selectedParcours.screenshotImgs.length === 0 ? (
                                    <div
                                        style={{
                                            padding: 60,
                                            textAlign: 'center',
                                            border: '2px dashed rgba(255,255,255,0.08)',
                                            borderRadius: 16,
                                            color: '#475569',
                                            fontSize: 13,
                                        }}
                                    >
                                        Glissez des screenshots depuis le panneau gauche
                                    </div>
                                ) : (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                        {selectedParcours.screenshotImgs.map((img, idx) => {
                                            const info = ALL_SCREENSHOTS.find((s) => s.img === img);
                                            return (
                                                <div
                                                    key={`${img}-${idx}`}
                                                    draggable
                                                    onDragStart={() => setDraggedScreenshotIdx(idx)}
                                                    onDragEnd={() => { setDraggedScreenshotIdx(null); setDragOverIdx(null); }}
                                                    onDragOver={(e) => {
                                                        e.preventDefault();
                                                        if (draggedScreenshotIdx !== null) {
                                                            setDragOverIdx(idx);
                                                        }
                                                    }}
                                                    onDrop={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        if (draggedScreenshotIdx !== null && draggedScreenshotIdx !== idx && selectedParcoursId) {
                                                            reorderScreenshotInParcours(selectedParcoursId, draggedScreenshotIdx, idx);
                                                        }
                                                        if (draggedPoolImg && selectedParcoursId) {
                                                            addScreenshotToParcours(selectedParcoursId, draggedPoolImg);
                                                            setDraggedPoolImg(null);
                                                        }
                                                        setDraggedScreenshotIdx(null);
                                                        setDragOverIdx(null);
                                                    }}
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 12,
                                                        padding: '8px 12px',
                                                        borderRadius: 12,
                                                        background: dragOverIdx === idx
                                                            ? `${selectedParcours.color}15`
                                                            : 'rgba(255,255,255,0.02)',
                                                        border: dragOverIdx === idx
                                                            ? `2px dashed ${selectedParcours.color}60`
                                                            : '1px solid rgba(255,255,255,0.04)',
                                                        cursor: 'grab',
                                                        transition: 'all 0.15s',
                                                    }}
                                                >
                                                    {/* Drag handle */}
                                                    <DotsSixVertical size={16} color="#475569" />

                                                    {/* Step number */}
                                                    <div
                                                        style={{
                                                            width: 28,
                                                            height: 28,
                                                            borderRadius: '50%',
                                                            background: `${selectedParcours.color}22`,
                                                            color: selectedParcours.color,
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            fontSize: 11,
                                                            fontWeight: 800,
                                                            flexShrink: 0,
                                                        }}
                                                    >
                                                        {idx + 1}
                                                    </div>

                                                    {/* Thumbnail */}
                                                    <div
                                                        style={{
                                                            width: 45,
                                                            height: 80,
                                                            borderRadius: 8,
                                                            overflow: 'hidden',
                                                            background: '#000',
                                                            flexShrink: 0,
                                                            cursor: 'pointer',
                                                        }}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setPreviewScreenshot(img);
                                                        }}
                                                    >
                                                        <img
                                                            src={`/screenshots/${img}.PNG`}
                                                            alt=""
                                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                            draggable={false}
                                                        />
                                                    </div>

                                                    {/* Info */}
                                                    <div style={{ flex: 1, minWidth: 0 }}>
                                                        <div style={{ color: '#CBD5E1', fontSize: 12, fontWeight: 600, lineHeight: 1.3 }}>
                                                            {info?.defaultLabel || img}
                                                        </div>
                                                        <div style={{ color: '#475569', fontSize: 10, fontFamily: "'JetBrains Mono', monospace", marginTop: 2 }}>
                                                            {img}
                                                        </div>
                                                    </div>

                                                    {/* Preview */}
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setPreviewScreenshot(img);
                                                        }}
                                                        style={{
                                                            background: 'none',
                                                            border: 'none',
                                                            cursor: 'pointer',
                                                            color: '#475569',
                                                            padding: 4,
                                                        }}
                                                    >
                                                        <Eye size={14} />
                                                    </button>

                                                    {/* Remove from parcours */}
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            if (selectedParcoursId) removeScreenshotFromParcours(selectedParcoursId, img);
                                                        }}
                                                        style={{
                                                            background: 'rgba(220,38,38,0.08)',
                                                            border: '1px solid rgba(220,38,38,0.15)',
                                                            borderRadius: 6,
                                                            cursor: 'pointer',
                                                            padding: '4px 6px',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                        }}
                                                    >
                                                        <X size={12} color="#FCA5A5" />
                                                    </button>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </>
                        ) : (
                            <div
                                style={{
                                    flex: 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#475569',
                                    fontSize: 14,
                                }}
                            >
                                ← Sélectionnez un parcours
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* ── Full-screen preview modal ── */}
            {previewScreenshot && (
                <div
                    onClick={() => setPreviewScreenshot(null)}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        background: 'rgba(0,0,0,0.85)',
                        backdropFilter: 'blur(8px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1000,
                        cursor: 'zoom-out',
                    }}
                >
                    <img
                        src={`/screenshots/${previewScreenshot}.PNG`}
                        alt=""
                        style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain', borderRadius: 16 }}
                    />
                    <div
                        style={{
                            position: 'absolute',
                            bottom: 30,
                            color: '#94A3B8',
                            fontSize: 12,
                            fontWeight: 600,
                        }}
                    >
                        {previewScreenshot} — Cliquez pour fermer
                    </div>
                </div>
            )}
        </div>
    );
}
