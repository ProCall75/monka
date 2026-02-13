import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    BookOpen,
    FileText,
    Package,
    ArrowLeft,
    ExternalLink,
    Search,
    Zap,
    Star,
    CheckSquare,
    BarChart3,
    ClipboardList,
} from 'lucide-react'

// === Template definitions ===

type TemplateId = 'A' | 'B' | 'C' | 'D' | 'E'
type VKey = 'V1' | 'V2' | 'V3' | 'V4' | 'V5'

interface TemplateInfo {
    id: TemplateId
    name: string
    description: string
    icon: typeof Zap
    file: string // filename in KERNEL folder (e.g. A_activation.md)
    availableV: VKey[]
}

const templates: TemplateInfo[] = [
    { id: 'A', name: 'Activation', description: "Règles d'activation des micro-parcours", icon: Zap, file: 'A_activation.md', availableV: ['V1', 'V2', 'V3', 'V4', 'V5'] },
    { id: 'B', name: 'Recommandations', description: 'Variations par niveau et MP', icon: Star, file: 'B_recos_variations.md', availableV: ['V1', 'V2', 'V3', 'V4', 'V5'] },
    { id: 'C', name: 'Micro-tâches / ASR', description: 'MT typées + signatures ASR', icon: CheckSquare, file: 'C_master_mt_asr.md', availableV: ['V1', 'V2', 'V3', 'V4', 'V5'] },
    { id: 'D', name: 'Suivi', description: 'Questions de suivi dynamique', icon: ClipboardList, file: 'D_suivi.md', availableV: ['V1', 'V2', 'V3', 'V4', 'V5'] },
    { id: 'E', name: 'Scoring', description: 'Barèmes, pondérations et seuils', icon: BarChart3, file: 'E_scoring.md', availableV: ['V1', 'V2', 'V3', 'V4', 'V5'] },
]

const deliverables = [
    { id: 'todoValidation', name: '📋 TODO Validation Dr. Monka', file: 'TODO_VALIDATION_DR_MONKA.md', description: 'Checklist de validation V par V' },
    { id: 'recapEvolutions', name: '🔄 Évolutions Post-Fondation', file: 'RECAP_EVOLUTIONS_POST_KERNEL.md', description: 'Tout ce qui a changé depuis le 07/02' },
    { id: 'recapFondation', name: '📖 Récap Fondation Monka', file: 'RECAP_FONDATION_MONKA.md', description: 'Les 13 règles du KERNEL (K1-K13)' },
    { id: 'globalScoring', name: '📊 Scoring Global', file: 'E_GLOBAL_scoring.md', description: 'Scoring inter-vulnérabilités' },
    { id: 'triggers', name: '🎯 Triggers & Personas', file: 'TRIGGERS_ET_PERSONAS.md', description: '15 triggers + 10 personas' },
    { id: 'raisonnement', name: '🤖 Raisonnement Enrichissements IA', file: 'RAISONNEMENT_ENRICHISSEMENT_IA.md', description: '621 propositions IA documentées' },
    { id: 'guideValidation', name: '📝 Guide Validation Dr. Monka', file: 'GUIDE_VALIDATION_DR_MONKA.md', description: 'Mode d\'emploi par type de validation' },
    { id: 'roadmapValid', name: '🗺️ Roadmap Validation', file: 'ROADMAP_VALIDATION.md', description: 'Plan de validation en 4 phases' },
    { id: 'schema', name: '🗄️ Schéma Supabase', file: 'SCHEMA_SUPABASE.md', description: 'Architecture de la base de données' },
    { id: 'understanding', name: '📚 Glossaire KERNEL', file: 'UNDERSTANDING.md', description: 'Glossaire aligné KERNEL v4' },
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
    const filteredTemplates = templates.filter(t =>
        searchQuery === '' || t.name.toLowerCase().includes(searchQuery.toLowerCase()) || t.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    const filteredDeliverables = deliverables.filter(d =>
        searchQuery === '' || d.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

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
                    <span className="ml-1 text-xs bg-white/20 px-1.5 py-0.5 rounded-full">{templates.length * 5}</span>
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
                        {filteredTemplates.map((template) => {
                            const TIcon = template.icon
                            return (
                                <div key={template.id} className="glass-card p-5">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 rounded-xl gradient-monka flex items-center justify-center">
                                            <TIcon className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] font-bold bg-monka-primary/10 text-monka-primary px-2 py-0.5 rounded-md">
                                                    Template {template.id}
                                                </span>
                                                <h3 className="text-base font-bold text-monka-heading">{template.name}</h3>
                                            </div>
                                            <p className="text-xs text-monka-muted">{template.description}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-5 gap-2">
                                        {(['V1', 'V2', 'V3', 'V4', 'V5'] as VKey[]).map(v => {
                                            const available = template.availableV.includes(v)
                                            return (
                                                <button
                                                    key={v}
                                                    disabled={!available}
                                                    onClick={() => {
                                                        const path = `/kernel/${vFolders[v]}/${template.file}`
                                                        loadDocument(path, `Template ${template.id} — ${template.name} — ${v} ${vLabels[v]}`)
                                                    }}
                                                    className={`
                            flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold transition-all duration-200
                            ${available
                                                            ? 'hover:shadow-md cursor-pointer'
                                                            : 'opacity-30 cursor-not-allowed'
                                                        }
                          `}
                                                    style={available ? { backgroundColor: `${vColors[v]}15`, color: vColors[v] } : {}}
                                                >
                                                    <span>{v}</span>
                                                    {available && <ExternalLink className="w-3 h-3" />}
                                                </button>
                                            )
                                        })}
                                    </div>
                                </div>
                            )
                        })}
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
                        {filteredDeliverables.map((d) => (
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
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
