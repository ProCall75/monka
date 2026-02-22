/* ExportButton — Reusable export/print button for document views.
   Triggers window.print() with a clean print layout. */

import { Printer, FileDown } from 'lucide-react'

interface ExportButtonProps {
    label?: string
    variant?: 'primary' | 'subtle'
}

export function ExportButton({ label = 'Exporter PDF', variant = 'primary' }: ExportButtonProps) {
    return (
        <button
            onClick={() => window.print()}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors no-print ${variant === 'primary'
                    ? 'text-white bg-monka-primary hover:bg-monka-primary-dark'
                    : 'text-gray-600 bg-gray-100 hover:bg-gray-200'
                }`}
        >
            {variant === 'primary' ? <FileDown className="w-3.5 h-3.5" /> : <Printer className="w-3.5 h-3.5" />}
            {label}
        </button>
    )
}
