import React, { useState, useEffect, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { loadAllMPs } from './utils/parseMarkdown';
import { supabase } from './supabaseClient';
import type { Annotation, MPData } from './types';

const ACCESS_CODE = 'monka2026';
const ALL_MPs = loadAllMPs();

// ─── Toast Component ───
function Toast({ message, visible }: { message: string; visible: boolean }) {
    if (!visible) return null;
    return <div className="toast">✅ {message}</div>;
}

// ─── Login Screen ───
function LoginScreen({ onLogin }: { onLogin: () => void }) {
    const [code, setCode] = useState('');
    const [error, setError] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (code === ACCESS_CODE) {
            localStorage.setItem('monka_auth', 'true');
            onLogin();
        } else {
            setError(true);
            setTimeout(() => setError(false), 1000);
        }
    };

    return (
        <div className="login-screen">
            <form className="login-card" onSubmit={handleSubmit}>
                <h1>📋 Monka Validation</h1>
                <p>Entrez le code d'accès pour continuer</p>
                <input
                    type="password"
                    className={`login-input ${error ? 'error' : ''}`}
                    placeholder="Code d'accès"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    autoFocus
                />
                <button type="submit" className="login-btn">
                    Accéder
                </button>
            </form>
        </div>
    );
}

// ─── Decision Widget ───
function DecisionWidget({
    mpId,
    sectionId,
    itemId,
    label,
    annotation,
    onSave,
}: {
    mpId: string;
    sectionId: string;
    itemId: string;
    label: string;
    annotation?: Annotation;
    onSave: (a: Partial<Annotation>) => void;
}) {
    const [showComment, setShowComment] = useState(false);
    const [comment, setComment] = useState(annotation?.comment || '');
    const status = annotation?.status || 'pending';

    const handleAction = (newStatus: 'validated' | 'rejected') => {
        if (newStatus === 'rejected' && !showComment) {
            setShowComment(true);
            return;
        }
        onSave({
            mp_id: mpId,
            section_id: sectionId,
            item_id: itemId,
            status: newStatus,
            comment: comment || undefined,
            reviewer: 'dr_monka',
        });
    };

    const handleComment = () => {
        onSave({
            mp_id: mpId,
            section_id: sectionId,
            item_id: itemId,
            status: 'comment',
            comment,
            reviewer: 'dr_monka',
        });
        setShowComment(false);
    };

    return (
        <div className={`decision-widget ${status}`}>
            <div className="decision-header">
                <span className="decision-label">{label}</span>
                <div className="decision-actions">
                    <button
                        className={`decision-btn validate ${status === 'validated' ? 'active' : ''}`}
                        onClick={() => handleAction('validated')}
                        title="Valider"
                    >
                        ✅ Valider
                    </button>
                    <button
                        className={`decision-btn reject ${status === 'rejected' ? 'active' : ''}`}
                        onClick={() => handleAction('rejected')}
                        title="Rejeter"
                    >
                        ❌ Rejeter
                    </button>
                    <button
                        className="decision-btn comment-btn"
                        onClick={() => setShowComment(!showComment)}
                        title="Commenter"
                    >
                        💬
                    </button>
                </div>
            </div>
            {(showComment || annotation?.comment) && (
                <div className="decision-comment">
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Ajoutez votre commentaire ici..."
                    />
                    <div className="decision-comment-actions">
                        <button className="decision-save-btn" onClick={handleComment}>
                            Enregistrer le commentaire
                        </button>
                    </div>
                </div>
            )}
            {annotation?.comment && !showComment && (
                <div className="saved-comment">💬 {annotation.comment}</div>
            )}
        </div>
    );
}

// ─── Section Block ───
function SectionBlock({
    section,
    mpId,
    annotations,
    onSave,
    defaultOpen,
}: {
    section: MPData['sections'][0];
    mpId: string;
    annotations: Annotation[];
    onSave: (a: Partial<Annotation>) => void;
    defaultOpen?: boolean;
}) {
    const [open, setOpen] = useState(defaultOpen || false);

    const sectionAnnotations = annotations.filter(
        (a) => a.section_id === section.id
    );
    const totalItems = section.decisionItems.length;
    const validatedItems = sectionAnnotations.filter(
        (a) => a.status === 'validated'
    ).length;
    const rejectedItems = sectionAnnotations.filter(
        (a) => a.status === 'rejected'
    ).length;

    // Also check for "Dr. Monka" decision blocks in content
    const drMonkaBlocks = section.content.match(/\*\*Décision Dr\. Monka\*\*/g);
    const hasDrMonkaDecisions = drMonkaBlocks && drMonkaBlocks.length > 0;

    // Check for wording tables with 💡
    const wordingItems = section.content.match(/\|\s*💡\s*\|/g);
    const hasWordingItems = wordingItems && wordingItems.length > 0;

    const needsReview = hasDrMonkaDecisions || hasWordingItems;

    return (
        <div className="section-block">
            <div className="section-header" onClick={() => setOpen(!open)}>
                <div className="section-header-left">
                    <span className={`section-chevron ${open ? 'open' : ''}`}>▶</span>
                    <span className="section-title">{section.title}</span>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    {needsReview && (
                        <span className="section-badge badge-progress">
                            À valider
                        </span>
                    )}
                    {totalItems > 0 && (
                        <span
                            className={`section-badge ${validatedItems === totalItems && totalItems > 0
                                    ? 'badge-done'
                                    : rejectedItems > 0
                                        ? 'badge-progress'
                                        : 'badge-pending'
                                }`}
                        >
                            {validatedItems}/{totalItems}
                        </span>
                    )}
                </div>
            </div>
            {open && (
                <div className="section-body">
                    <div className="md-content">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {section.content}
                        </ReactMarkdown>
                    </div>
                    {/* Decision widgets for Dr. Monka items */}
                    {needsReview && (
                        <>
                            <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '1.5rem 0' }} />
                            <h4 style={{ color: 'var(--primary-light)', marginBottom: '0.75rem', fontSize: '0.9rem' }}>
                                🎯 Points de décision — Dr. Monka
                            </h4>
                            {hasDrMonkaDecisions && (
                                <DecisionWidget
                                    mpId={mpId}
                                    sectionId={section.id}
                                    itemId={`${section.id}_global`}
                                    label={`Validation globale de la section "${section.title}"`}
                                    annotation={sectionAnnotations.find(
                                        (a) => a.item_id === `${section.id}_global`
                                    )}
                                    onSave={onSave}
                                />
                            )}
                            {hasWordingItems && (
                                <DecisionWidget
                                    mpId={mpId}
                                    sectionId={section.id}
                                    itemId={`${section.id}_wording`}
                                    label="Validation du wording (IDEC + Utilisateur)"
                                    annotation={sectionAnnotations.find(
                                        (a) => a.item_id === `${section.id}_wording`
                                    )}
                                    onSave={onSave}
                                />
                            )}
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

// ─── MP Viewer ───
function MPViewer({
    mp,
    annotations,
    onSave,
}: {
    mp: MPData;
    annotations: Annotation[];
    onSave: (a: Partial<Annotation>) => void;
}) {
    const mpAnnotations = annotations.filter((a) => a.mp_id === mp.id);
    const totalSections = mp.sections.filter(
        (s) =>
            s.content.includes('**Décision Dr. Monka**') ||
            s.content.includes('| 💡 |')
    ).length;
    const validatedSections = mp.sections.filter((s) => {
        const sectionAnns = mpAnnotations.filter((a) => a.section_id === s.id);
        return sectionAnns.length > 0 && sectionAnns.every((a) => a.status === 'validated');
    }).length;
    const rejectedCount = mpAnnotations.filter((a) => a.status === 'rejected').length;

    const totalDecisions = mpAnnotations.length;
    const validatedDecisions = mpAnnotations.filter((a) => a.status === 'validated').length;
    const progressPct = totalDecisions > 0 ? (validatedDecisions / totalDecisions) * 100 : 0;

    return (
        <div>
            <div className="mp-header">
                <h1>
                    <span>{mp.title}</span> — {mp.subtitle}
                </h1>
                <p className="mp-header-sub">V1 — Social & Relationnel</p>
                <div className="mp-stats">
                    <div className="mp-stat">
                        <span className="mp-stat-value">{mp.questions}</span>
                        <span className="mp-stat-label">questions</span>
                    </div>
                    <div className="mp-stat">
                        <span className="mp-stat-value">{mp.categories}</span>
                        <span className="mp-stat-label">catégories</span>
                    </div>
                    <div className="mp-stat">
                        <span className="mp-stat-value">{mp.rules}</span>
                        <span className="mp-stat-label">règles</span>
                    </div>
                    <div className="mp-stat">
                        <span className="mp-stat-value">{mp.microTasks}</span>
                        <span className="mp-stat-label">micro-tâches</span>
                    </div>
                </div>
            </div>

            {totalDecisions > 0 && (
                <div className="progress-bar-container">
                    <div className="progress-bar-header">
                        <span className="progress-bar-label">Progression de la validation</span>
                        <span className="progress-bar-count">
                            {validatedDecisions}/{totalDecisions} validés
                        </span>
                    </div>
                    <div className="progress-bar-track">
                        <div
                            className="progress-bar-fill"
                            style={{ width: `${progressPct}%` }}
                        />
                    </div>
                    <div className="progress-stats">
                        <div className="progress-stat">
                            <div className="progress-dot validated" />
                            {validatedDecisions} validés
                        </div>
                        <div className="progress-stat">
                            <div className="progress-dot rejected" />
                            {rejectedCount} rejetés
                        </div>
                        <div className="progress-stat">
                            <div className="progress-dot pending" />
                            {totalDecisions - validatedDecisions - rejectedCount} en attente
                        </div>
                    </div>
                </div>
            )}

            {mp.sections.map((section, i) => (
                <SectionBlock
                    key={section.id}
                    section={section}
                    mpId={mp.id}
                    annotations={mpAnnotations}
                    onSave={onSave}
                    defaultOpen={i === 0}
                />
            ))}
        </div>
    );
}

// ─── Dashboard ───
function Dashboard({ annotations }: { annotations: Annotation[] }) {
    const mpStats = ALL_MPs.map((mp) => {
        const mpAnns = annotations.filter((a) => a.mp_id === mp.id);
        const validated = mpAnns.filter((a) => a.status === 'validated').length;
        const rejected = mpAnns.filter((a) => a.status === 'rejected').length;
        const comments = mpAnns.filter((a) => a.status === 'comment').length;
        return { mp, total: mpAnns.length, validated, rejected, comments };
    });

    const totalAnnotations = annotations.length;
    const totalValidated = annotations.filter((a) => a.status === 'validated').length;
    const totalRejected = annotations.filter((a) => a.status === 'rejected').length;

    const recentAnnotations = [...annotations]
        .sort(
            (a, b) =>
                new Date(b.updated_at || '').getTime() -
                new Date(a.updated_at || '').getTime()
        )
        .slice(0, 20);

    return (
        <div>
            <div className="mp-header">
                <h1>
                    <span>Dashboard</span> — Vue consolidée
                </h1>
                <p className="mp-header-sub">
                    Suivi des annotations de Dr. Monka sur les templates V1
                </p>
            </div>

            {totalAnnotations > 0 && (
                <div className="progress-bar-container">
                    <div className="progress-bar-header">
                        <span className="progress-bar-label">Progression globale</span>
                        <span className="progress-bar-count">
                            {totalValidated}/{totalAnnotations}
                        </span>
                    </div>
                    <div className="progress-bar-track">
                        <div
                            className="progress-bar-fill"
                            style={{
                                width: `${totalAnnotations > 0
                                        ? (totalValidated / totalAnnotations) * 100
                                        : 0
                                    }%`,
                            }}
                        />
                    </div>
                </div>
            )}

            <div className="dashboard-grid">
                {mpStats.map(({ mp, total, validated, rejected, comments }) => (
                    <div key={mp.id} className="dashboard-card">
                        <h3>
                            {mp.id} — {mp.subtitle}
                        </h3>
                        <div className="dashboard-stat-row">
                            <span className="dashboard-stat-label">Annotations</span>
                            <span className="dashboard-stat-value">{total}</span>
                        </div>
                        <div className="dashboard-stat-row">
                            <span className="dashboard-stat-label">✅ Validés</span>
                            <span className="dashboard-stat-value" style={{ color: 'var(--green)' }}>
                                {validated}
                            </span>
                        </div>
                        <div className="dashboard-stat-row">
                            <span className="dashboard-stat-label">❌ Rejetés</span>
                            <span className="dashboard-stat-value" style={{ color: 'var(--red)' }}>
                                {rejected}
                            </span>
                        </div>
                        <div className="dashboard-stat-row">
                            <span className="dashboard-stat-label">💬 Commentaires</span>
                            <span className="dashboard-stat-value" style={{ color: 'var(--blue)' }}>
                                {comments}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <h3 style={{ marginBottom: '1rem', fontSize: '1rem' }}>
                Annotations récentes
            </h3>
            {recentAnnotations.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-state-icon">📭</div>
                    <p>Aucune annotation pour le moment</p>
                </div>
            ) : (
                <div className="annotations-list">
                    {recentAnnotations.map((a) => (
                        <div key={a.id} className="annotation-row">
                            <span className="status-icon">
                                {a.status === 'validated'
                                    ? '✅'
                                    : a.status === 'rejected'
                                        ? '❌'
                                        : '💬'}
                            </span>
                            <span className="mp-label">{a.mp_id}</span>
                            <span className="section-label">
                                {a.section_id.replace(/_/g, ' ')}
                            </span>
                            {a.comment && (
                                <span className="comment-preview">{a.comment}</span>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

// ─── Main App ───
export default function App() {
    const [authed, setAuthed] = useState(
        localStorage.getItem('monka_auth') === 'true'
    );
    const [activeMp, setActiveMp] = useState<string>('R1');
    const [activeView, setActiveView] = useState<'review' | 'dashboard'>('review');
    const [annotations, setAnnotations] = useState<Annotation[]>([]);
    const [toast, setToast] = useState<{ message: string; visible: boolean }>({
        message: '',
        visible: false,
    });

    // Load annotations from Supabase
    const loadAnnotations = useCallback(async () => {
        const { data, error } = await supabase
            .from('mp_annotations')
            .select('*')
            .order('updated_at', { ascending: false });
        if (data && !error) {
            setAnnotations(data);
        }
    }, []);

    useEffect(() => {
        if (authed) {
            loadAnnotations();
        }
    }, [authed, loadAnnotations]);

    // Save annotation
    const handleSave = async (partial: Partial<Annotation>) => {
        // Check if exists
        const existing = annotations.find(
            (a) =>
                a.mp_id === partial.mp_id &&
                a.section_id === partial.section_id &&
                a.item_id === partial.item_id
        );

        if (existing) {
            const { error } = await supabase
                .from('mp_annotations')
                .update({
                    status: partial.status,
                    comment: partial.comment,
                    updated_at: new Date().toISOString(),
                })
                .eq('id', existing.id);

            if (!error) {
                setAnnotations((prev) =>
                    prev.map((a) =>
                        a.id === existing.id
                            ? { ...a, status: partial.status!, comment: partial.comment, updated_at: new Date().toISOString() }
                            : a
                    )
                );
                showToast('Annotation enregistrée');
            }
        } else {
            const { data, error } = await supabase
                .from('mp_annotations')
                .insert(partial)
                .select()
                .single();

            if (data && !error) {
                setAnnotations((prev) => [data, ...prev]);
                showToast('Annotation créée');
            }
        }
    };

    const showToast = (message: string) => {
        setToast({ message, visible: true });
        setTimeout(() => setToast({ message: '', visible: false }), 2500);
    };

    if (!authed) {
        return <LoginScreen onLogin={() => setAuthed(true)} />;
    }

    const currentMp = ALL_MPs.find((mp) => mp.id === activeMp);

    return (
        <div className="app-layout">
            <div className="sidebar">
                <div className="sidebar-logo">📋 Monka Validation</div>

                <div className="sidebar-subtitle">Navigation</div>
                <div
                    className={`sidebar-nav-link ${activeView === 'review' ? 'active' : ''}`}
                    onClick={() => setActiveView('review')}
                >
                    📄 Revue des templates
                </div>
                <div
                    className={`sidebar-nav-link ${activeView === 'dashboard' ? 'active' : ''}`}
                    onClick={() => setActiveView('dashboard')}
                >
                    📊 Dashboard
                </div>

                <div className="sidebar-subtitle">Templates V1</div>
                {ALL_MPs.map((mp) => {
                    const mpAnns = annotations.filter((a) => a.mp_id === mp.id);
                    const validated = mpAnns.filter((a) => a.status === 'validated').length;
                    const total = mpAnns.length;

                    return (
                        <div
                            key={mp.id}
                            className={`sidebar-item ${activeView === 'review' && activeMp === mp.id ? 'active' : ''
                                }`}
                            onClick={() => {
                                setActiveMp(mp.id);
                                setActiveView('review');
                            }}
                        >
                            <span className="sidebar-item-icon">
                                {mp.id === 'R1'
                                    ? '🏠'
                                    : mp.id === 'R2'
                                        ? '🤝'
                                        : mp.id === 'R3'
                                            ? '👤'
                                            : '💬'}
                            </span>
                            <div className="sidebar-item-info">
                                <div className="sidebar-item-title">{mp.id}</div>
                                <div className="sidebar-item-sub">{mp.subtitle}</div>
                            </div>
                            {total > 0 && (
                                <span
                                    className={`sidebar-item-badge ${validated === total ? 'badge-done' : 'badge-progress'
                                        }`}
                                >
                                    {validated}/{total}
                                </span>
                            )}
                        </div>
                    );
                })}
            </div>

            <div className="main-content">
                {activeView === 'dashboard' ? (
                    <Dashboard annotations={annotations} />
                ) : currentMp ? (
                    <MPViewer
                        mp={currentMp}
                        annotations={annotations}
                        onSave={handleSave}
                    />
                ) : null}
            </div>

            <Toast message={toast.message} visible={toast.visible} />
        </div>
    );
}
