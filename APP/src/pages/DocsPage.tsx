import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    BookOpen,
    FileText,
    Package,
    ArrowLeft,
    ExternalLink,
    Search,
    Shield,
    BarChart3,
} from 'lucide-react'

// === VALIDATION_MP Template definitions ===

type VKey = 'V1' | 'V2' | 'V3' | 'V4' | 'V5'

interface MPTemplate {
    id: string        // e.g. 'R1', 'A1', 'S1'
    nom: string       // Human-readable name
    vulnId: VKey
    file: string      // Path relative to KERNEL/VALIDATION_MP/Vx/
}

const mpTemplates: MPTemplate[] = [
    // V1 — Social et relationnel
    { id: 'R1', nom: 'Impact sur la vie personnelle et professionnelle', vulnId: 'V1', file: 'R1.md' },
    { id: 'R2', nom: "Soutien de l'entourage et partage de l'aide", vulnId: 'V1', file: 'R2.md' },
    { id: 'R3', nom: 'Isolement social de la personne aidée', vulnId: 'V1', file: 'R3.md' },
    { id: 'R4', nom: "Relation aidant / proche et acceptation de l'aide", vulnId: 'V1', file: 'R4.md' },
    // V2 — Administrative
    { id: 'A1', nom: 'Couverture santé et protections juridiques', vulnId: 'V2', file: 'A1.md' },
    { id: 'A2', nom: 'Droits, aides et évaluation dépendance', vulnId: 'V2', file: 'A2.md' },
    { id: 'A3', nom: 'Charge et complexité des démarches', vulnId: 'V2', file: 'A3.md' },
    { id: 'A4', nom: 'Situation scolaire/professionnelle et budget', vulnId: 'V2', file: 'A4.md' },
    // V3 — Santé physique et psychologique
    { id: 'S1', nom: "Charge, fatigue et risque d'épuisement", vulnId: 'V3', file: 'S1.md' },
    { id: 'S2', nom: 'Inquiétudes pour la sécurité', vulnId: 'V3', file: 'S2.md' },
    { id: 'S3', nom: 'Santé physique et renoncement aux soins', vulnId: 'V3', file: 'S3.md' },
    { id: 'S4', nom: 'Hygiène de vie (activité et sommeil)', vulnId: 'V3', file: 'S4.md' },
    // V4 — Fragilité du proche
    { id: 'F1', nom: 'Vie quotidienne, budget et entourage du proche', vulnId: 'V4', file: 'F1.md' },
    { id: 'F2', nom: 'Autonomie, aide humaine et présence nécessaire', vulnId: 'V4', file: 'F2.md' },
    { id: 'F3', nom: 'Mémoire, comportement et risques', vulnId: 'V4', file: 'F3.md' },
    { id: 'F4', nom: 'Douleur, fatigue, sommeil et état général', vulnId: 'V4', file: 'F4.md' },
    { id: 'F5', nom: 'Dépendance, handicap, addictions et épisodes aigus', vulnId: 'V4', file: 'F5.md' },
    { id: 'F6', nom: 'Autonomie fonctionnelle, chutes et aides techniques', vulnId: 'V4', file: 'F6.md' },
    // V5 — Parcours médical du proche
    { id: 'M1', nom: 'Compréhension du diagnostic et de la maladie', vulnId: 'V5', file: 'M1.md' },
    { id: 'M2', nom: 'Accès aux soins et aux professionnels', vulnId: 'V5', file: 'M2.md' },
    { id: 'M3', nom: 'Urgences, hospitalisations et continuité', vulnId: 'V5', file: 'M3.md' },
    { id: 'M4', nom: 'Troubles psychiques, addictions et suivi', vulnId: 'V5', file: 'M4.md' },
    { id: 'M5', nom: 'Coordination des soins', vulnId: 'V5', file: 'M5.md' },
    { id: 'M6', nom: 'Plan de soins, évaluations et inquiétudes', vulnId: 'V5', file: 'M6.md' },
]

// === SCORING docs ===
const scoringDocs = [
    { id: 'SCORING_V1', nom: 'Scoring V1 — Social et relationnel', file: 'SCORING/SCORING_V1.md' },
    { id: 'SCORING_V2', nom: 'Scoring V2 — Administrative', file: 'SCORING/SCORING_V2.md' },
    { id: 'SCORING_V3', nom: 'Scoring V3 — Santé physique et psychologique', file: 'SCORING/SCORING_V3.md' },
    { id: 'SCORING_V4', nom: 'Scoring V4 — Fragilité du proche', file: 'SCORING/SCORING_V4.md' },
    { id: 'SCORING_V5', nom: 'Scoring V5 — Parcours médical du proche', file: 'SCORING/SCORING_V5.md' },
]

const deliverables: { id: string; name: string; file: string; description: string }[] = [
    { id: 'kernel_v5', name: 'KERNEL V5 — Référentiel Clinique Complet', file: 'KERNEL_V5.md', description: 'Document maître du référentiel clinique Monka — vulnérabilités, micro-parcours, catégories, recommandations et micro-tâches.' },
    { id: 'methodologie_scoring', name: 'Méthodologie de Scoring', file: 'METHODOLOGIE_SCORING.md', description: 'Méthodologie complète du scoring de vulnérabilité — principes, pondération, seuils et interprétation des résultats.' },
]

const vLabels: Record<VKey, string> = {
    V1: 'Social et relationnel',
    V2: 'Administrative',
    V3: 'Santé physique et psychologique',
    V4: 'Fragilité du proche',
    V5: 'Parcours médical du proche',
}

const vColors: Record<VKey, string> = {
    V1: '#58BF94',
    V2: '#86C0CF',
    V3: '#F5A623',
    V4: '#EF4444',
    V5: '#7748F6',
}

const vFolders: Record<VKey, string> = {
    V1: 'V1',
    V2: 'V2',
    V3: 'V3',
    V4: 'V4',
    V5: 'V5',
}

// Group templates by vulnerability
const templatesByVuln = (['V1', 'V2', 'V3', 'V4', 'V5'] as VKey[]).map(v => ({
    vulnId: v,
    label: vLabels[v],
    color: vColors[v],
    mps: mpTemplates.filter(t => t.vulnId === v),
}))

// === Simple Markdown renderer ===

function renderMarkdownLine(line: string, i: number) {
    if (line.startsWith('# ')) return <h1 key={i} className="text-xl font-bold text-monka-heading mb-3 mt-6 first:mt-0">{line.slice(2)}</h1>
    if (line.startsWith('## ')) return <h2 key={i} className="text-lg font-bold text-monka-heading mb-2 mt-5 border-b border-monka-border pb-1">{line.slice(3)}</h2>
    if (line.startsWith('### ')) return <h3 key={i} className="text-base font-semibold text-monka-heading mb-2 mt-4">{line.slice(4)}</h3>
    if (line.startsWith('#### ')) return <h4 key={i} className="text-sm font-semibold text-monka-heading mb-1 mt-3">{line.slice(5)}</h4>
    if (line.startsWith('---')) return <hr key={i} className="border-monka-border my-4" />
    if (line.startsWith('> ')) return <blockquote key={i} className="border-l-3 border-monka-primary pl-3 py-1 text-sm text-monka-muted italic my-2 bg-monka-primary/5 rounded-r-lg pr-3">{line.slice(2)}</blockquote>
    if (line.startsWith('| ')) {
        const cells = line.split('|').filter(c => c.trim()).map(c => c.trim())
        const isDelimiter = cells.every(c => /^[-:]+$/.test(c))
        if (isDelimiter) return null
        return (
            <tr key={i} className="border-b border-monka-border/50">
                {cells.map((cell, j) => (
                    <td key={j} className="px-3 py-1.5 text-xs text-monka-text">{renderInline(cell)}</td>
                ))}
            </tr>
        )
    }
    if (line.startsWith('- ') || line.startsWith('* ')) return <li key={i} className="text-sm text-monka-text ml-4 list-disc my-0.5">{renderInline(line.slice(2))}</li>
    if (line.match(/^\d+\. /)) return <li key={i} className="text-sm text-monka-text ml-4 list-decimal my-0.5">{renderInline(line.replace(/^\d+\. /, ''))}</li>
    if (line.trim() === '') return <div key={i} className="h-2" />
    return <p key={i} className="text-sm text-monka-text my-1 leading-relaxed">{renderInline(line)}</p>
}

function renderInline(text: string) {
    // Simple bold / code / italic
    return text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/`(.*?)`/g, '<code class="bg-monka-dark/5 text-monka-primary px-1 py-0.5 rounded text-[11px] font-mono">$1</code>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .split(/(<[^>]+>)/g)
        .map((part, i) => {
            if (part.startsWith('<strong>')) return <strong key={i}>{part.replace(/<\/?strong>/g, '')}</strong>
            if (part.startsWith('<code')) return <code key={i} className="bg-monka-dark/5 text-monka-primary px-1 py-0.5 rounded text-[11px] font-mono">{part.replace(/<\/?code[^>]*>/g, '')}</code>
            if (part.startsWith('<em>')) return <em key={i}>{part.replace(/<\/?em>/g, '')}</em>
            return part
        })
}

// Group table rows together
function renderMarkdown(content: string) {
    const lines = content.split('\n')
    const elements: JSX.Element[] = []
    let tableRows: JSX.Element[] = []
    let inTable = false

    lines.forEach((line, i) => {
        const isTableLine = line.startsWith('| ')
        if (isTableLine) {
            const rendered = renderMarkdownLine(line, i)
            if (rendered) {
                if (!inTable) inTable = true
                tableRows.push(rendered)
            }
        } else {
            if (inTable) {
                elements.push(
                    <table key={`table-${i}`} className="w-full border-collapse mb-4 text-xs">
                        <tbody>{tableRows}</tbody>
                    </table>
                )
                tableRows = []
                inTable = false
            }
            const rendered = renderMarkdownLine(line, i)
            if (rendered) elements.push(rendered)
        }
    })

    if (inTable && tableRows.length > 0) {
        elements.push(
            <table key="table-final" className="w-full border-collapse mb-4 text-xs">
                <tbody>{tableRows}</tbody>
            </table>
        )
    }

    return elements
}

// === Main Component ===

export default function DocsPage() {
    const [activeTab, setActiveTab] = useState<'templates' | 'deliverables'>('templates')
    const [viewingDoc, setViewingDoc] = useState<{ title: string; path: string } | null>(null)
    const [docContent, setDocContent] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')

    const loadDocument = useCallback(async (path: string, title: string) => {
        setViewingDoc({ title, path })
        setDocContent(null)
        setLoading(true)
        try {
            const res = await fetch(path)
            if (!res.ok) throw new Error(`HTTP ${res.status}`)
            const text = await res.text()
            setDocContent(text)
        } catch (err) {
            console.error('Load error:', err)
            setDocContent(`# Erreur de chargement\n\nImpossible de charger le document : \`${path}\`\n\nVérifiez que le fichier existe dans le dossier KERNEL.`)
        } finally {
            setLoading(false)
        }
    }, [])

    // Document viewer mode
    if (viewingDoc) {
        return (
            <div className="max-w-[1200px] mx-auto">
                <button
                    onClick={() => { setViewingDoc(null); setDocContent(null) }}
                    className="flex items-center gap-2 text-sm text-monka-muted hover:text-monka-text mb-4 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Retour à la documentation
                </button>

                <div className="glass-card overflow-hidden">
                    <div className="px-8 py-4 border-b border-monka-border flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg gradient-monka flex items-center justify-center">
                                <FileText className="w-4 h-4 text-white" />
                            </div>
                            <div>
                                <h2 className="text-sm font-bold text-monka-heading">{viewingDoc.title}</h2>
                                <p className="text-[10px] text-monka-muted font-mono">{viewingDoc.path}</p>
                            </div>
                        </div>
                    </div>

                    <div className="px-8 py-6 max-h-[calc(100vh-220px)] overflow-y-auto">
                        {loading ? (
                            <div className="text-center py-16">
                                <div className="w-8 h-8 border-2 border-monka-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                                <p className="text-sm text-monka-muted">Chargement...</p>
                            </div>
                        ) : docContent ? (
                            <div className="prose prose-sm max-w-none">
                                {renderMarkdown(docContent)}
                            </div>
                        ) : (
                            <div className="text-center py-20 text-monka-muted text-sm">
                                Contenu non disponible
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }

    // Filter templates / deliverables by search
    const filteredTemplatesByVuln = templatesByVuln.map(group => ({
        ...group,
        mps: group.mps.filter(mp =>
            searchQuery === '' || mp.nom.toLowerCase().includes(searchQuery.toLowerCase()) || mp.id.toLowerCase().includes(searchQuery.toLowerCase())
        ),
    })).filter(group => group.mps.length > 0)
    const filteredDeliverables = deliverables.filter(d =>
        searchQuery === '' || d.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    const totalFilteredTemplates = filteredTemplatesByVuln.reduce((s, g) => s + g.mps.length, 0)

    return (
        <div className="max-w-[1200px] mx-auto">
            <div className="mb-6">
                <h1 className="text-xl font-bold text-monka-heading">Documentation</h1>
                <p className="text-sm text-monka-muted mt-1">Templates KERNEL et livrables d'audit clinique</p>
            </div>

            {/* Search */}
            <div className="glass-card px-4 py-3 mb-5 flex items-center gap-3">
                <Search className="w-4 h-4 text-monka-muted" />
                <input
                    type="text"
                    placeholder="Rechercher un template ou livrable..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 bg-transparent outline-none text-sm text-monka-text placeholder:text-monka-muted"
                />
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-5">
                <button
                    onClick={() => setActiveTab('templates')}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-all
            ${activeTab === 'templates' ? 'bg-monka-primary text-white' : 'bg-white/60 text-monka-text/60 hover:bg-white/80'}`}
                >
                    <BookOpen className="w-4 h-4" />
                    Templates
                    <span className="ml-1 text-xs bg-white/20 px-1.5 py-0.5 rounded-full">{mpTemplates.length + scoringDocs.length}</span>
                </button>
                <button
                    onClick={() => setActiveTab('deliverables')}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-all
            ${activeTab === 'deliverables' ? 'bg-monka-primary text-white' : 'bg-white/60 text-monka-text/60 hover:bg-white/80'}`}
                >
                    <Package className="w-4 h-4" />
                    Livrables
                    <span className="ml-1 text-xs bg-white/20 px-1.5 py-0.5 rounded-full">{deliverables.length}</span>
                </button>
            </div>

            <AnimatePresence mode="wait">
                {activeTab === 'templates' && (
                    <motion.div
                        key="templates"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.15 }}
                        className="space-y-4"
                    >
                        {totalFilteredTemplates === 0 ? (
                            <div className="glass-card p-12 text-center">
                                <BookOpen className="w-10 h-10 text-monka-muted/40 mx-auto mb-3" />
                                <p className="text-sm text-monka-muted">Aucun template trouvé</p>
                                <p className="text-xs text-monka-muted/60 mt-1">Essayez de modifier votre recherche.</p>
                            </div>
                        ) : (
                            filteredTemplatesByVuln.map((group) => (
                                <div key={group.vulnId} className="glass-card overflow-hidden">
                                    {/* Vulnerability header */}
                                    <div className="px-5 py-3 flex items-center gap-3 border-b border-monka-border/50" style={{ backgroundColor: `${group.color}08` }}>
                                        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: group.color }}>
                                            <Shield className="w-4 h-4 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs font-bold text-white px-2 py-0.5 rounded" style={{ backgroundColor: group.color }}>{group.vulnId}</span>
                                                <h3 className="text-sm font-bold text-monka-heading">{group.label}</h3>
                                            </div>
                                        </div>
                                        <span className="text-[10px] font-bold text-monka-muted bg-monka-dark/5 px-2 py-0.5 rounded-full">
                                            {group.mps.length} MP{group.mps.length > 1 ? 's' : ''}
                                        </span>
                                    </div>

                                    {/* MP cards grid */}
                                    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        {group.mps.map(mp => (
                                            <button
                                                key={mp.id}
                                                onClick={() => {
                                                    const path = `/kernel/VALIDATION_MP/${vFolders[mp.vulnId]}/${mp.file}`
                                                    loadDocument(path, `${mp.id} — ${mp.nom}`)
                                                }}
                                                className="flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 hover:shadow-md group"
                                                style={{ backgroundColor: `${group.color}08` }}
                                            >
                                                <span className="text-xs font-bold text-white px-2 py-1 rounded-lg flex-shrink-0" style={{ backgroundColor: group.color }}>
                                                    {mp.id}
                                                </span>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-xs font-semibold text-monka-heading truncate group-hover:text-monka-primary transition-colors">{mp.nom}</p>
                                                    <p className="text-[10px] text-monka-muted font-mono mt-0.5">VALIDATION_MP/{vFolders[mp.vulnId]}/{mp.file}</p>
                                                </div>
                                                <ExternalLink className="w-3.5 h-3.5 text-monka-muted/40 group-hover:text-monka-primary transition-colors flex-shrink-0" />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))
                        )}

                        {/* SCORING docs section */}
                        {(() => {
                            const filteredScoring = scoringDocs.filter(d =>
                                searchQuery === '' || d.nom.toLowerCase().includes(searchQuery.toLowerCase()) || d.id.toLowerCase().includes(searchQuery.toLowerCase())
                            )
                            if (filteredScoring.length === 0) return null
                            return (
                                <div className="glass-card overflow-hidden">
                                    <div className="px-5 py-3 flex items-center gap-3 border-b border-monka-border/50" style={{ backgroundColor: '#7748F608' }}>
                                        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
                                            <BarChart3 className="w-4 h-4 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-sm font-bold text-monka-heading">Scoring</h3>
                                            <p className="text-[10px] text-monka-muted">Matrices de scoring par vulnérabilité</p>
                                        </div>
                                        <span className="text-[10px] font-bold text-monka-muted bg-monka-dark/5 px-2 py-0.5 rounded-full">
                                            {filteredScoring.length} doc{filteredScoring.length > 1 ? 's' : ''}
                                        </span>
                                    </div>
                                    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        {filteredScoring.map(doc => (
                                            <button
                                                key={doc.id}
                                                onClick={() => loadDocument(`/kernel/${doc.file}`, doc.nom)}
                                                className="flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 hover:shadow-md group bg-indigo-50/50"
                                            >
                                                <span className="text-xs font-bold text-white px-2 py-1 rounded-lg flex-shrink-0 bg-gradient-to-br from-indigo-500 to-purple-600">
                                                    {doc.id.replace('SCORING_', '')}
                                                </span>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-xs font-semibold text-monka-heading truncate group-hover:text-monka-primary transition-colors">{doc.nom}</p>
                                                    <p className="text-[10px] text-monka-muted font-mono mt-0.5">{doc.file}</p>
                                                </div>
                                                <ExternalLink className="w-3.5 h-3.5 text-monka-muted/40 group-hover:text-monka-primary transition-colors flex-shrink-0" />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )
                        })()}
                    </motion.div>
                )}

                {activeTab === 'deliverables' && (
                    <motion.div
                        key="deliverables"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.15 }}
                        className="space-y-2"
                    >
                        {filteredDeliverables.length === 0 ? (
                            <div className="glass-card p-12 text-center">
                                <Package className="w-10 h-10 text-monka-muted/40 mx-auto mb-3" />
                                <p className="text-sm text-monka-muted">Aucun livrable disponible</p>
                                <p className="text-xs text-monka-muted/60 mt-1">Les livrables d'audit clinique seront ajoutés prochainement.</p>
                            </div>
                        ) : (
                            filteredDeliverables.map((d) => (
                                <button
                                    key={d.id}
                                    onClick={() => {
                                        loadDocument(`/kernel/${d.file}`, d.name)
                                    }}
                                    className="w-full glass-card px-5 py-4 flex items-center gap-3 text-left hover:bg-white/60 transition-all duration-200 group"
                                >
                                    <div className="w-9 h-9 rounded-lg bg-monka-primary/10 flex items-center justify-center group-hover:bg-monka-primary/15 transition-colors">
                                        <FileText className="w-4 h-4 text-monka-primary" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-sm font-semibold text-monka-heading">{d.name}</h4>
                                        <p className="text-[10px] text-monka-muted">{d.description}</p>
                                    </div>
                                    <ExternalLink className="w-4 h-4 text-monka-muted group-hover:text-monka-primary transition-colors" />
                                </button>
                            ))
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
