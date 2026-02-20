/* =============================================
   Tooltip — Hover/Focus Tooltip
   
   Lightweight tooltip for clinical explanations,
   sens_clinique, and contextual help.
   ============================================= */

import { useState, useRef, useEffect, type ReactNode } from 'react'

interface TooltipProps {
    /** Content to show in the tooltip */
    content: string | ReactNode
    /** The trigger element */
    children: ReactNode
    /** Position preference */
    position?: 'top' | 'bottom' | 'left' | 'right'
    /** Max width of the tooltip */
    maxWidth?: number
}

/**
 * Tooltip — Shows contextual information on hover/focus.
 *
 * Usage:
 *   <Tooltip content="Sens clinique: L'aidant montre des signes d'épuisement">
 *     <button>?</button>
 *   </Tooltip>
 */
export function Tooltip({
    content,
    children,
    position = 'top',
    maxWidth = 300,
}: TooltipProps) {
    const [isVisible, setIsVisible] = useState(false)
    const triggerRef = useRef<HTMLDivElement>(null)
    const tooltipRef = useRef<HTMLDivElement>(null)
    const timeoutRef = useRef<ReturnType<typeof setTimeout>>()

    const showTooltip = () => {
        clearTimeout(timeoutRef.current)
        setIsVisible(true)
    }

    const hideTooltip = () => {
        timeoutRef.current = setTimeout(() => setIsVisible(false), 150)
    }

    useEffect(() => {
        return () => clearTimeout(timeoutRef.current)
    }, [])

    const positionClasses: Record<string, string> = {
        top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
        bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
        left: 'right-full top-1/2 -translate-y-1/2 mr-2',
        right: 'left-full top-1/2 -translate-y-1/2 ml-2',
    }

    return (
        <div
            ref={triggerRef}
            className="relative inline-flex"
            onMouseEnter={showTooltip}
            onMouseLeave={hideTooltip}
            onFocus={showTooltip}
            onBlur={hideTooltip}
        >
            {children}
            {isVisible && (
                <div
                    ref={tooltipRef}
                    role="tooltip"
                    className={`
                        absolute z-50 ${positionClasses[position]}
                        px-3 py-2 rounded-lg
                        bg-slate-800 text-white text-sm
                        shadow-lg
                        animate-in fade-in duration-200
                        pointer-events-none
                    `.trim()}
                    style={{ maxWidth }}
                >
                    {content}
                </div>
            )}
        </div>
    )
}
