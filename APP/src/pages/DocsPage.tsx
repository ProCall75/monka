/* DocsPage — Documentation hub.
   Currently empty: documents will be re-uploaded from FINAL after sprint completion.
   Architecture: < 100L, no hardcoded content. */

import { motion } from 'framer-motion'
import { BookOpen, Upload } from 'lucide-react'

export default function DocsPage() {
    return (
        <div className="max-w-[1200px] mx-auto">
            <div className="mb-6">
                <h1 className="text-xl font-bold text-monka-heading">Documentation</h1>
                <p className="text-sm text-monka-muted mt-1">Templates KERNEL et livrables d&apos;audit clinique</p>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-16 text-center"
            >
                <div className="w-16 h-16 rounded-2xl bg-monka-primary/10 flex items-center justify-center mx-auto mb-5">
                    <BookOpen className="w-8 h-8 text-monka-primary/60" />
                </div>
                <h2 className="text-base font-bold text-monka-heading mb-2">
                    Documentation en cours de mise à jour
                </h2>
                <p className="text-sm text-monka-muted max-w-md mx-auto leading-relaxed mb-6">
                    Les documents seront rechargés depuis le dossier <code className="bg-monka-dark/5 text-monka-primary px-1.5 py-0.5 rounded text-xs font-mono">FINAL/</code> à la fin du sprint en cours.
                </p>
                <div className="flex items-center justify-center gap-2 text-[11px] text-monka-muted/60">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Les nouveaux templates, scoring et livrables seront disponibles prochainement.</span>
                </div>
            </motion.div>
        </div>
    )
}
