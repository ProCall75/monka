import React, { useState, useEffect, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { loadAllMPs } from './utils/parseMarkdown';
import { supabase } from './supabaseClient';
import type { Annotation, MPData, TodoItem } from './types';

const ACCESS_CODE = 'monka2026';
const ALL_MPs = loadAllMPs();

// Group MPs by vulnerability
const MP_BY_VULN: Record<string, MPData[]> = {};
ALL_MPs.forEach((mp) => {
    if (!MP_BY_VULN[mp.vulnerability]) MP_BY_VULN[mp.vulnerability] = [];
    MP_BY_VULN[mp.vulnerability].push(mp);
});

const VULN_META: Record<string, { label: string; icon: string; color: string }> = {
    V1: { label: 'Social & Relationnel', icon: '🤝', color: '#6C5CE7' },
    V2: { label: 'Administrative', icon: '📋', color: '#fdcb6e' },
    V3: { label: 'Santé de l\'Aidant', icon: '❤️', color: '#e17055' },
    V4: { label: 'Fragilité du Proche', icon: '🧓', color: '#00b894' },
    V5: { label: 'Parcours Médical', icon: '🏥', color: '#74b9ff' },
};

const MP_ICONS: Record<string, string> = {
    R1: '🏠', R2: '🤝', R3: '👤', R4: '💬',
    A1: '🏥', A2: '📑', A3: '⚙️', A4: '🎓',
    S1: '😰', S2: '🔒', S3: '🩺', S4: '🏃',
    F1: '🏡', F2: '🧑‍🤝‍🧑', F3: '🧠', F4: '💊', F5: '♿', F6: '🦽',
    M1: '🔬', M2: '🏥', M3: '🚑', M4: '🧠', M5: '🔗', M6: '🗺️',
};

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

// ─── Decision Widget (Improved UX) ───
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
    const [editing, setEditing] = useState(false);
    const [showComment, setShowComment] = useState(false);
    const [comment, setComment] = useState(annotation?.comment || '');
    const status = annotation?.status || 'pending';
    const isResolved = status === 'validated' || status === 'rejected';

    useEffect(() => {
        setComment(annotation?.comment || '');
    }, [annotation?.comment]);

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
        setEditing(false);
        setShowComment(false);
    };

    const handleComment = () => {
        onSave({
            mp_id: mpId,
            section_id: sectionId,
            item_id: itemId,
            status: status === 'pending' ? 'comment' : status,
            comment,
            reviewer: 'dr_monka',
        });
        setShowComment(false);
    };

    // ─── Resolved state: show badge + pencil ───
    if (isResolved && !editing) {
        return (
            <div className={`decision-widget ${status}`}>
                <div className="decision-header">
                    <span className="decision-label">{label}</span>
                    <div className="decision-actions">
                        <span className={`decision-resolved-badge ${status}`}>
                            {status === 'validated' ? '✅ Validé' : '❌ Rejeté'}
                        </span>
                        <button
                            className="decision-btn edit-btn"
                            onClick={() => setEditing(true)}
                            title="Modifier la décision"
                        >
                            ✏️
                        </button>
                    </div>
                </div>
                {annotation?.comment && (
                    <div className="saved-comment">
                        💬 {annotation.comment}
                        <button
                            className="edit-comment-btn"
                            onClick={() => { setEditing(true); setShowComment(true); }}
                            title="Modifier le commentaire"
                        >
                            ✏️
                        </button>
                    </div>
                )}
            </div>
        );
    }

    // ─── Pending / editing state: show action buttons ───
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
                    {editing && (
                        <button
                            className="decision-btn reset-btn"
                            onClick={() => {
                                onSave({
                                    mp_id: mpId,
                                    section_id: sectionId,
                                    item_id: itemId,
                                    status: 'pending',
                                    comment: comment || undefined,
                                    reviewer: 'dr_monka',
                                });
                                setEditing(false);
                            }}
                            title="Remettre à valider"
                        >
                            🔄 À valider
                        </button>
                    )}
                    <button
                        className="decision-btn comment-btn"
                        onClick={() => setShowComment(!showComment)}
                        title="Commenter"
                    >
                        💬
                    </button>
                    {editing && (
                        <button
                            className="decision-btn cancel-btn"
                            onClick={() => setEditing(false)}
                            title="Annuler"
                        >
                            ✕
                        </button>
                    )}
                </div>
            </div>
            {(showComment || (editing && annotation?.comment)) && (
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

    // Check for "Dr. Monka" decision blocks in content
    const drMonkaBlocks = section.content.match(/\*\*Décision Dr\. Monka\*\*/g);
    const hasDrMonkaDecisions = drMonkaBlocks && drMonkaBlocks.length > 0;

    // Check for wording tables with 💡
    const wordingItems = section.content.match(/\|\s*💡\s*\|/g);
    const hasWordingItems = wordingItems && wordingItems.length > 0;

    const needsReview = hasDrMonkaDecisions || hasWordingItems;

    // Calculate resolved status for badge
    const relatedAnnotations = sectionAnnotations.filter(
        (a) => a.item_id?.startsWith(section.id)
    );
    const allResolved = relatedAnnotations.length > 0 &&
        relatedAnnotations.every((a) => a.status === 'validated' || a.status === 'rejected');
    const hasRejected = relatedAnnotations.some((a) => a.status === 'rejected');

    let badgeClass = 'badge-pending';
    let badgeText = 'À valider';
    if (allResolved && !hasRejected) {
        badgeClass = 'badge-done';
        badgeText = '✅ Validé';
    } else if (allResolved && hasRejected) {
        badgeClass = 'badge-rejected';
        badgeText = '❌ Rejeté';
    } else if (relatedAnnotations.length > 0) {
        badgeClass = 'badge-progress';
        badgeText = 'En cours';
    }

    return (
        <div className="section-block">
            <div className="section-header" onClick={() => setOpen(!open)}>
                <div className="section-header-left">
                    <span className={`section-chevron ${open ? 'open' : ''}`}>▶</span>
                    <span className="section-title">{section.title}</span>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    {needsReview && (
                        <span className={`section-badge ${badgeClass}`}>
                            {badgeText}
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
    const rejectedCount = mpAnnotations.filter((a) => a.status === 'rejected').length;
    const totalDecisions = mpAnnotations.length;
    const validatedDecisions = mpAnnotations.filter((a) => a.status === 'validated').length;
    const progressPct = totalDecisions > 0 ? (validatedDecisions / totalDecisions) * 100 : 0;
    const vulnMeta = VULN_META[mp.vulnerability] || VULN_META.V1;

    return (
        <div>
            <div className="mp-header">
                <h1>
                    <span>{mp.title}</span> — {mp.subtitle}
                </h1>
                <p className="mp-header-sub">{mp.vulnerability} — {vulnMeta.label}</p>
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

// ─── Todo Page ───
function TodoPage({
    todos,
    onToggle,
    annotations,
}: {
    todos: TodoItem[];
    onToggle: (id: string, checked: boolean) => void;
    annotations: Annotation[];
}) {
    const vulns = [...new Set(todos.map((t) => t.vulnerability))].sort();

    return (
        <div>
            <div className="mp-header">
                <h1>
                    <span>À faire</span> — Checklist de validation
                </h1>
                <p className="mp-header-sub">
                    Cochez chaque section une fois relue. Antonin suit votre avancée en temps réel.
                </p>
            </div>

            {/* Global progress */}
            {todos.length > 0 && (
                <div className="progress-bar-container">
                    <div className="progress-bar-header">
                        <span className="progress-bar-label">Progression globale</span>
                        <span className="progress-bar-count">
                            {todos.filter((t) => t.checked).length}/{todos.length} cochés
                        </span>
                    </div>
                    <div className="progress-bar-track">
                        <div
                            className="progress-bar-fill"
                            style={{
                                width: `${(todos.filter((t) => t.checked).length / todos.length) * 100}%`,
                            }}
                        />
                    </div>
                </div>
            )}

            {vulns.map((vuln) => {
                const vulnTodos = todos.filter((t) => t.vulnerability === vuln);
                const vulnMeta = VULN_META[vuln] || VULN_META.V1;
                const mps = [...new Set(vulnTodos.map((t) => t.mp_id))].sort();
                const checkedCount = vulnTodos.filter((t) => t.checked).length;

                return (
                    <div key={vuln} className="todo-vuln-group">
                        <div className="todo-vuln-header">
                            <div className="todo-vuln-title">
                                <span className="todo-vuln-icon">{vulnMeta.icon}</span>
                                <span>{vuln} — {vulnMeta.label}</span>
                            </div>
                            <span className={`section-badge ${checkedCount === vulnTodos.length ? 'badge-done' : 'badge-progress'}`}>
                                {checkedCount}/{vulnTodos.length}
                            </span>
                        </div>

                        {mps.map((mp) => {
                            const mpTodos = vulnTodos.filter((t) => t.mp_id === mp);
                            const mpAnnotations = annotations.filter((a) => a.mp_id === mp);
                            const mpChecked = mpTodos.filter((t) => t.checked).length;
                            const mpData = ALL_MPs.find((m) => m.id === mp);

                            return (
                                <div key={mp} className="todo-mp-group">
                                    <div className="todo-mp-header">
                                        <span className="todo-mp-icon">{MP_ICONS[mp] || '📄'}</span>
                                        <span className="todo-mp-title">{mp}</span>
                                        <span className="todo-mp-subtitle">{mpData?.subtitle || ''}</span>
                                        <span className={`sidebar-item-badge ${mpChecked === mpTodos.length ? 'badge-done' : mpChecked > 0 ? 'badge-progress' : 'badge-pending'}`}>
                                            {mpChecked}/{mpTodos.length}
                                        </span>
                                    </div>
                                    <div className="todo-items">
                                        {mpTodos.map((todo) => {
                                            // Check if section has annotations
                                            const sectionAnns = mpAnnotations.filter((a) =>
                                                a.section_id?.includes(todo.section_id) || a.item_id?.includes(todo.section_id)
                                            );
                                            const hasValidated = sectionAnns.some((a) => a.status === 'validated');
                                            const hasRejected = sectionAnns.some((a) => a.status === 'rejected');

                                            return (
                                                <label key={todo.id} className={`todo-item ${todo.checked ? 'checked' : ''}`}>
                                                    <input
                                                        type="checkbox"
                                                        checked={todo.checked}
                                                        onChange={(e) => onToggle(todo.id, e.target.checked)}
                                                    />
                                                    <span className="todo-checkbox-custom" />
                                                    <span className="todo-label">{todo.label}</span>
                                                    {hasValidated && <span className="todo-annotation-dot validated" title="Décision validée">✅</span>}
                                                    {hasRejected && <span className="todo-annotation-dot rejected" title="Décision rejetée">❌</span>}
                                                    {todo.checked && todo.checked_at && (
                                                        <span className="todo-timestamp">
                                                            {new Date(todo.checked_at).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}
                                                        </span>
                                                    )}
                                                </label>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
}

// ─── Dashboard (Improved) ───
function Dashboard({
    annotations,
    todos,
}: {
    annotations: Annotation[];
    todos: TodoItem[];
}) {
    const vulns = Object.keys(VULN_META).filter(
        (v) => MP_BY_VULN[v] && MP_BY_VULN[v].length > 0
    );

    const totalTodos = todos.length;
    const checkedTodos = todos.filter((t) => t.checked).length;
    const totalAnnotations = annotations.length;
    const totalValidated = annotations.filter((a) => a.status === 'validated').length;
    const totalRejected = annotations.filter((a) => a.status === 'rejected').length;

    const recentAnnotations = [...annotations]
        .sort(
            (a, b) =>
                new Date(b.updated_at || '').getTime() -
                new Date(a.updated_at || '').getTime()
        )
        .slice(0, 15);

    return (
        <div>
            <div className="mp-header">
                <h1>
                    <span>Dashboard</span> — Vue consolidée
                </h1>
                <p className="mp-header-sub">
                    Suivi en temps réel des retours de Dr. Monka
                </p>
            </div>

            {/* Global stats */}
            <div className="dashboard-global-stats">
                <div className="dashboard-global-stat">
                    <div className="dgs-value">{checkedTodos}</div>
                    <div className="dgs-label">Sections relues</div>
                    <div className="dgs-sub">sur {totalTodos}</div>
                </div>
                <div className="dashboard-global-stat">
                    <div className="dgs-value" style={{ color: 'var(--green)' }}>{totalValidated}</div>
                    <div className="dgs-label">Décisions validées</div>
                    <div className="dgs-sub">sur {totalAnnotations} annotations</div>
                </div>
                <div className="dashboard-global-stat">
                    <div className="dgs-value" style={{ color: 'var(--red)' }}>{totalRejected}</div>
                    <div className="dgs-label">Points rejetés</div>
                    <div className="dgs-sub">à corriger</div>
                </div>
                <div className="dashboard-global-stat">
                    <div className="dgs-value" style={{ color: 'var(--yellow)' }}>
                        {totalTodos - checkedTodos}
                    </div>
                    <div className="dgs-label">Sections restantes</div>
                    <div className="dgs-sub">à relire</div>
                </div>
            </div>

            {/* Per-vulnerability progress */}
            <h3 style={{ margin: '1.5rem 0 1rem', fontSize: '1rem' }}>Avancée par vulnérabilité</h3>
            {vulns.map((vuln) => {
                const vulnMeta = VULN_META[vuln];
                const mps = MP_BY_VULN[vuln] || [];
                const vulnTodos = todos.filter((t) => t.vulnerability === vuln);
                const vulnChecked = vulnTodos.filter((t) => t.checked).length;
                const vulnAnnotations = annotations.filter((a) =>
                    mps.some((mp) => mp.id === a.mp_id)
                );
                const vulnValidated = vulnAnnotations.filter((a) => a.status === 'validated').length;
                const vulnRejected = vulnAnnotations.filter((a) => a.status === 'rejected').length;

                return (
                    <div key={vuln} className="dashboard-vuln-card">
                        <div className="dvc-header">
                            <span className="dvc-icon">{vulnMeta.icon}</span>
                            <div className="dvc-info">
                                <div className="dvc-title">{vuln} — {vulnMeta.label}</div>
                                <div className="dvc-progress-track">
                                    <div
                                        className="dvc-progress-fill"
                                        style={{
                                            width: `${vulnTodos.length > 0 ? (vulnChecked / vulnTodos.length) * 100 : 0}%`,
                                            background: vulnMeta.color,
                                        }}
                                    />
                                </div>
                            </div>
                            <span className={`section-badge ${vulnChecked === vulnTodos.length && vulnTodos.length > 0 ? 'badge-done' : 'badge-progress'}`}>
                                {vulnChecked}/{vulnTodos.length}
                            </span>
                        </div>
                        <div className="dvc-mps">
                            {mps.map((mp) => {
                                const mpTodos = vulnTodos.filter((t) => t.mp_id === mp.id);
                                const mpChecked = mpTodos.filter((t) => t.checked).length;
                                const mpAnns = vulnAnnotations.filter((a) => a.mp_id === mp.id);
                                const mpValidated = mpAnns.filter((a) => a.status === 'validated').length;
                                const mpRejected = mpAnns.filter((a) => a.status === 'rejected').length;

                                return (
                                    <div key={mp.id} className="dvc-mp-row">
                                        <span className="dvc-mp-icon">{MP_ICONS[mp.id] || '📄'}</span>
                                        <span className="dvc-mp-name">{mp.id}</span>
                                        <span className="dvc-mp-subtitle">{mp.subtitle.slice(0, 30)}</span>
                                        <div className="dvc-mp-badges">
                                            <span className="dvc-mp-badge todo">{mpChecked}/{mpTodos.length} relu</span>
                                            {mpValidated > 0 && <span className="dvc-mp-badge ok">✅ {mpValidated}</span>}
                                            {mpRejected > 0 && <span className="dvc-mp-badge ko">❌ {mpRejected}</span>}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}

            {/* Recent annotations */}
            <h3 style={{ margin: '1.5rem 0 1rem', fontSize: '1rem' }}>
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
                                {a.section_id.replace(/_/g, ' ').replace(/section \d+/, (m) => {
                                    const num = parseInt(m.split(' ')[1]);
                                    const section = ALL_MPs.find((mp) => mp.id === a.mp_id)?.sections[num];
                                    return section ? section.title.slice(0, 40) : m;
                                })}
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
    const [activeView, setActiveView] = useState<'review' | 'dashboard' | 'todo'>('review');
    const [annotations, setAnnotations] = useState<Annotation[]>([]);
    const [todos, setTodos] = useState<TodoItem[]>([]);
    const [expandedVulns, setExpandedVulns] = useState<Record<string, boolean>>({ V1: true, V2: true, V3: true });
    const [toast, setToast] = useState<{ message: string; visible: boolean }>({
        message: '',
        visible: false,
    });

    // Load data from Supabase
    const loadData = useCallback(async () => {
        const [annResult, todoResult] = await Promise.all([
            supabase.from('mp_annotations').select('*').order('updated_at', { ascending: false }),
            supabase.from('mp_todos').select('*').order('created_at', { ascending: true }),
        ]);
        if (annResult.data) setAnnotations(annResult.data);
        if (todoResult.data) setTodos(todoResult.data);
    }, []);

    useEffect(() => {
        if (authed) loadData();
    }, [authed, loadData]);

    // Save annotation
    const handleSave = async (partial: Partial<Annotation>) => {
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

    // Toggle todo
    const handleToggleTodo = async (id: string, checked: boolean) => {
        const now = new Date().toISOString();
        const { error } = await supabase
            .from('mp_todos')
            .update({
                checked,
                checked_at: checked ? now : null,
                checked_by: checked ? 'dr_monka' : null,
            })
            .eq('id', id);

        if (!error) {
            setTodos((prev) =>
                prev.map((t) =>
                    t.id === id
                        ? { ...t, checked, checked_at: checked ? now : undefined, checked_by: checked ? 'dr_monka' : undefined }
                        : t
                )
            );
            showToast(checked ? 'Section cochée ✅' : 'Section décochée');
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
    const todosChecked = todos.filter((t) => t.checked).length;

    return (
        <div className="app-layout">
            <div className="sidebar">
                <div className="sidebar-logo">📋 Monka Validation</div>

                <div className="sidebar-subtitle">Navigation</div>
                <div
                    className={`sidebar-nav-link ${activeView === 'dashboard' ? 'active' : ''}`}
                    onClick={() => setActiveView('dashboard')}
                >
                    📊 Dashboard
                </div>
                <div
                    className={`sidebar-nav-link ${activeView === 'todo' ? 'active' : ''}`}
                    onClick={() => setActiveView('todo')}
                >
                    ☑️ À faire
                    {todos.length > 0 && (
                        <span className={`sidebar-todo-badge ${todosChecked === todos.length ? 'done' : ''}`}>
                            {todosChecked}/{todos.length}
                        </span>
                    )}
                </div>

                {/* Templates grouped by vulnerability */}
                {Object.entries(MP_BY_VULN).map(([vuln, mps]) => {
                    const vulnMeta = VULN_META[vuln] || VULN_META.V1;
                    const isExpanded = expandedVulns[vuln] ?? false;
                    const vulnTodos = todos.filter((t) => mps.some((m) => m.id === t.mp_id));
                    const vulnChecked = vulnTodos.filter((t) => t.checked).length;
                    const vulnTotal = vulnTodos.length;
                    return (
                        <div key={vuln} className="sidebar-vuln-group">
                            <div
                                className="sidebar-vuln-header"
                                onClick={() =>
                                    setExpandedVulns((prev) => ({ ...prev, [vuln]: !prev[vuln] }))
                                }
                            >
                                <div className="sidebar-vuln-left">
                                    <span className={`sidebar-vuln-chevron ${isExpanded ? 'expanded' : ''}`}>▶</span>
                                    <span>{vulnMeta.icon}</span>
                                    <span className="sidebar-vuln-id">{vuln}</span>
                                    <span className="sidebar-vuln-name">{vulnMeta.label}</span>
                                </div>
                                {vulnTotal > 0 && (
                                    <span className={`sidebar-item-badge ${vulnChecked === vulnTotal ? 'badge-done' : 'badge-progress'}`}>
                                        {vulnChecked}/{vulnTotal}
                                    </span>
                                )}
                            </div>
                            {isExpanded && (
                                <div className="sidebar-vuln-items">
                                    {mps.map((mp) => {
                                        const mpTodos = todos.filter((t) => t.mp_id === mp.id);
                                        const checked = mpTodos.filter((t) => t.checked).length;
                                        const total = mpTodos.length;

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
                                                    {MP_ICONS[mp.id] || '📄'}
                                                </span>
                                                <div className="sidebar-item-info">
                                                    <div className="sidebar-item-title">{mp.id}</div>
                                                    <div className="sidebar-item-sub">{mp.subtitle}</div>
                                                </div>
                                                {total > 0 && (
                                                    <span
                                                        className={`sidebar-item-badge ${checked === total ? 'badge-done' : 'badge-progress'
                                                            }`}
                                                    >
                                                        {checked}/{total}
                                                    </span>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            <div className="main-content">
                {activeView === 'dashboard' ? (
                    <Dashboard annotations={annotations} todos={todos} />
                ) : activeView === 'todo' ? (
                    <TodoPage todos={todos} onToggle={handleToggleTodo} annotations={annotations} />
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
